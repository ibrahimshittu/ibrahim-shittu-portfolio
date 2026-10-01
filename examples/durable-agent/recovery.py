"""Offline checkpoint experiment: real child-process exits, fixture source calls."""
import json
import os
from pathlib import Path
import sqlite3
import subprocess
import sys
import tempfile
from datetime import datetime, timezone

SCENARIOS = {
    "baseline": "Uninterrupted run",
    "after_fetch": "Stop after the source returns",
    "after_save": "Stop after saving evidence",
    "after_finding": "Stop after saving a finding",
    "duplicate": "Deliver completed work again",
    "provider": "Provider unavailable, then resume",
    "clarification": "Ask for input, then resume",
}
PASSAGE = "Company A identifies supplier concentration as a business risk."


def event(root, message):
    with (root / "events.jsonl").open("a") as stream:
        stream.write(json.dumps(message) + "\n")


def worker(root, fault):
    db = sqlite3.connect(root / "state.db")
    event(root, "Worker opened saved state")
    if db.execute("SELECT value FROM state WHERE key='status'").fetchone()[0] == "complete":
        event(root, "Completed work skipped")
        db.close()
        return
    if fault in {"provider", "clarification"}:
        status = "paused" if fault == "provider" else "waiting"
        with db:
            db.execute("UPDATE state SET value=? WHERE key='status'", (status,))
            if status == "waiting":
                db.execute("INSERT OR REPLACE INTO state VALUES ('question', 'Which reporting period?')")
        event(root, f"Saved {status} state")
        db.close()
        return
    if db.execute("SELECT value FROM state WHERE key='question'").fetchone():
        answer = db.execute("SELECT value FROM state WHERE key='answer'").fetchone()
        if not answer:
            raise RuntimeError("Cannot resume without the requested input")
        event(root, f"Restored clarification: {answer[0]}")
    row = db.execute("SELECT quote FROM evidence WHERE id='passage-1'").fetchone()
    if row is None:
        # A separate ledger represents the provider's record, outside our transaction.
        with (root / "calls.jsonl").open("a") as stream:
            stream.write(json.dumps({"operation": "fetch-passage-1"}) + "\n")
        event(root, "Fixture source returned a passage")
        if fault == "after_fetch":
            os._exit(17)
        with db:
            db.execute("INSERT INTO evidence VALUES ('passage-1', ?)", (PASSAGE,))
        event(root, "Evidence committed")
        if fault == "after_save":
            os._exit(17)
    else:
        event(root, "Saved evidence reused")
    with db:
        inserted = db.execute(
            "INSERT OR IGNORE INTO findings VALUES (?, ?, ?)",
            ("finding-1", "passage-1", "Supplier concentration is disclosed as a risk."),
        ).rowcount
    event(root, "Finding committed" if inserted else "Saved finding reused")
    if fault == "after_finding":
        os._exit(17)
    with db:
        db.execute("UPDATE state SET value='complete' WHERE key='status'")
    event(root, "Completion committed")
    db.close()


def snapshot(root):
    with sqlite3.connect(root / "state.db") as db:
        return {
            "evidence": db.execute("SELECT count(*) FROM evidence").fetchone()[0],
            "findings": db.execute("SELECT count(*) FROM findings").fetchone()[0],
            "status": db.execute("SELECT value FROM state WHERE key='status'").fetchone()[0],
        }


def experiment(name):
    with tempfile.TemporaryDirectory() as directory:
        root = Path(directory)
        with sqlite3.connect(root / "state.db") as db:
            db.executescript("""
                CREATE TABLE state (key TEXT PRIMARY KEY, value TEXT);
                INSERT INTO state VALUES ('status', 'running');
                CREATE TABLE evidence (id TEXT PRIMARY KEY, quote TEXT);
                CREATE TABLE findings (id TEXT PRIMARY KEY, source TEXT, claim TEXT);
            """)
        fault = "none" if name in {"baseline", "duplicate"} else name
        first = subprocess.run([sys.executable, __file__, "worker", str(root), fault])
        expected_exit = 17 if name.startswith("after_") else 0
        assert first.returncode == expected_exit, (name, first.returncode)
        before = snapshot(root)
        expected_before = {
            "baseline": (1, 1, "complete"), "duplicate": (1, 1, "complete"),
            "after_fetch": (0, 0, "running"), "after_save": (1, 0, "running"),
            "after_finding": (1, 1, "running"), "provider": (0, 0, "paused"),
            "clarification": (0, 0, "waiting"),
        }[name]
        assert (before["evidence"], before["findings"], before["status"]) == expected_before, before
        if name != "baseline":
            if name == "clarification":
                with sqlite3.connect(root / "state.db") as db:
                    db.execute("INSERT INTO state VALUES ('answer', '2025')")
                event(root, "User answer committed: 2025")
            subprocess.run([sys.executable, __file__, "worker", str(root), "none"], check=True)
        after = snapshot(root)
        calls = len((root / "calls.jsonl").read_text().splitlines())
        expected_calls = 2 if name == "after_fetch" else 1
        assert calls == expected_calls, (name, calls)
        assert after == {"evidence": 1, "findings": 1, "status": "complete"}, after
        with sqlite3.connect(root / "state.db") as db:
            assert db.execute("SELECT quote FROM evidence").fetchall() == [(PASSAGE,)]
            assert db.execute("SELECT source, claim FROM findings").fetchall() == [
                ("passage-1", "Supplier concentration is disclosed as a risk.")
            ]
        events = [json.loads(line) for line in (root / "events.jsonl").read_text().splitlines()]
        if name == "clarification":
            assert "Restored clarification: 2025" in events
        if name == "after_finding":
            assert "Saved finding reused" in events
        return {
            "id": name, "label": SCENARIOS[name], "attempts": 1 if name == "baseline" else 2,
            "sourceCalls": calls, "before": before, "after": after,
            "events": events,
        }


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "worker":
        worker(Path(sys.argv[2]), sys.argv[3])
    else:
        results = {"runDate": datetime.now(timezone.utc).isoformat(),
                   "method": "Python subprocesses and SQLite; deterministic fixtures; no model or network calls",
                   "scenarios": [experiment(name) for name in SCENARIOS]}
        destination = Path(__file__).resolve().parents[2] / "public/blog/durable-agent/results.json"
        destination.write_text(json.dumps(results, indent=2) + "\n")
        print(f"Passed {len(results['scenarios'])} recovery scenarios; saved {destination}")
