"use client";

import { useId, useState } from "react";
import recorded from "@/public/blog/durable-agent/results.json";
import styles from "./durable-agent-explorer.module.css";

export default function DurableAgentExplorer({ mode = "boundary" }: { mode?: "boundary" | "traces" }) {
  const id = useId();
  const [selected, setSelected] = useState(mode === "boundary" ? "after_fetch" : "baseline");
  const [restarted, setRestarted] = useState(false);
  const scenarios = mode === "boundary" ? recorded.scenarios.filter(s => s.id.startsWith("after_")) : recorded.scenarios;
  const scenario = scenarios.find(s => s.id === selected) || scenarios[0];
  const snapshot = restarted || mode === "traces" ? scenario.after : scenario.before;
  return (
    <section className={styles.explorer} aria-label={mode === "boundary" ? "Explore checkpoint boundaries" : "Recorded recovery experiment"}>
      <div className={styles.eyebrow}>{mode === "boundary" ? "Recovery checkpoints" : "Execution traces"}</div>
      <label htmlFor={id}>{mode === "boundary" ? "Choose a restart point" : "Choose an execution scenario"}</label>
      <select id={id} value={scenario.id} onChange={e => { setSelected(e.target.value); setRestarted(false); }}>
        {scenarios.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
      </select>
      {mode === "boundary" && <ol className={styles.sequence} aria-label="Execution order">
        {["Fetch passage", "Save evidence", "Save finding"].map((step, i) => (
          <li key={step} className={i === scenarios.indexOf(scenario) ? styles.active : ""}>
            <span>0{i + 1}</span>{step}{i === scenarios.indexOf(scenario) && <small>Interrupted here</small>}
          </li>
        ))}
      </ol>}
      {mode === "boundary" && <div className={styles.views} aria-label="Checkpoint view">
        <button type="button" aria-pressed={!restarted} onClick={() => setRestarted(false)}>At interruption</button>
        <button type="button" aria-pressed={restarted} onClick={() => setRestarted(true)}>After restart</button>
      </div>}
      <div aria-live="polite" aria-atomic="true">
        <dl className={styles.metrics}>
          <div><dt>Stored passages</dt><dd>{snapshot.evidence}</dd></div>
          <div><dt>Stored findings</dt><dd>{snapshot.findings}</dd></div>
          <div><dt>Run status</dt><dd>{snapshot.status}</dd></div>
        </dl>
        {(restarted || mode === "traces") && <p className={styles.note}>{scenario.attempts} worker {scenario.attempts === 1 ? "invocation" : "invocations"} · {scenario.sourceCalls} source {scenario.sourceCalls === 1 ? "call" : "calls"} · {scenario.after.findings} final {scenario.after.findings === 1 ? "finding" : "findings"}</p>}
        {mode === "boundary" && <p className={styles.explanation}>{scenario.id === "after_fetch" ? "The provider returned a passage, but no evidence was committed. Restarting repeats the source call." : scenario.id === "after_save" ? "The passage is committed. The new process reuses it and creates the finding." : "The evidence and finding are committed. Restarting reuses the evidence; the stable finding ID prevents a second stored finding."}</p>}
      </div>
      {mode === "traces" && <ol className={styles.events}>{scenario.events.map((event, i) => <li key={`${scenario.id}-${i}`}><span className={styles.eventNumber} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><span>{event}</span></li>)}</ol>}
    </section>
  );
}
