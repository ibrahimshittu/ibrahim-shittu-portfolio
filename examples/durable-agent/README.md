# Checkpoint recovery experiment

Run `python3 examples/durable-agent/recovery.py` from the repository root.
Python's standard library is sufficient. No credentials, model calls, or network access are used.

The runner creates a temporary SQLite database for each scenario and starts separate
worker processes. Three scenarios terminate the process with `os._exit(17)` between
operations. Other scenarios exercise sequential duplicate delivery, persisted pause,
and clarification followed by resumption. Assertions check exit status, fixture call
counts, interruption snapshots, exact saved records, and clarification restoration. Results and event traces are written to
`public/blog/durable-agent/results.json`, which the article's interactive component imports.

The source-call ledger is independent of the state database to expose the
response-before-commit gap. This is a deterministic recovery demonstration, not an
LLM benchmark or a test of power-loss durability, concurrent workers, or a provider SDK.
