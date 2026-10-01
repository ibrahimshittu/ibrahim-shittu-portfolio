import type { ReactNode } from "react";
import styles from "./article-diagrams.module.css";

function Node({ title, children, accent = false }: { title: string; children: ReactNode; accent?: boolean }) {
  return <div className={`${styles.node} ${accent ? styles.accent : ""}`}>
    <strong>{title}</strong><span>{children}</span>
  </div>;
}

function Arrow({ label }: { label: string }) {
  return <div className={styles.connector}><span>{label}</span><span className={styles.arrow} aria-hidden="true">→</span></div>;
}

function Diagram({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return <figure className={styles.figure} aria-label={title}>
    <div className={styles.canvas}>
      <div className={styles.title}>{title}</div>
      {children}
    </div>
    <figcaption>{caption}</figcaption>
  </figure>;
}

export function AgentHarnessDiagram() {
  return <Diagram title="The agent loop" caption="Context and saved progress inform each decision. Tool results and checks feed back into the loop.">
    <div className={styles.context}><span className={styles.kicker}>Input</span><strong>Task + context</strong><span>Documents · instructions · company · period</span></div>
    <div className={styles.down} aria-hidden="true">↓</div>
    <div className={styles.loop}>
      <Node title="Model" accent>Choose the next step</Node>
      <div className={styles.exchange}>
        <span>action <span aria-hidden="true">→</span></span>
        <span><span aria-hidden="true">←</span> result</span>
      </div>
      <Node title="Tools">Search · read · edit</Node>
    </div>
    <div className={styles.support}>
      <div><span className={styles.kicker}>Available to the model</span><strong>Memory</strong><span>Read and save progress</span></div>
      <div><span className={styles.kicker}>Returned to the model</span><strong>Feedback</strong><span>Checks and tool results</span></div>
    </div>
    <div className={styles.output}><span className={styles.kicker}>When finished</span><strong>Artifact</strong><span>Draft + supporting sources</span></div>
  </Diagram>;
}

export function AgentEvaluationDiagram() {
  return <Diagram title="From test cases to useful feedback" caption="Run the same cases against each configuration, grade the outputs, and compare the outcomes.">
    <div className={styles.pipeline}>
      <div><span className={styles.step}>01 / Cases</span><Node title="Same inputs">Documents + expected result</Node></div>
      <Arrow label="execute" />
      <div><span className={styles.step}>02 / Runs</span><Node title="Configurations">Baseline + candidate</Node></div>
      <Arrow label="assess" />
      <div><span className={styles.step}>03 / Graders</span><Node title="Output quality">Support + completeness</Node></div>
    </div>
    <div className={styles.down} aria-hidden="true">↓</div>
    <div className={styles.comparison}><strong>Compare outcomes</strong><div><span>Failures</span><span>Consistency</span><span>Time</span><span>Cost</span></div></div>
  </Diagram>;
}

export function DurableArchitectureDiagram() {
  return <Diagram title="Research state survives the worker" caption="The worker restores saved research state. The interface reads the same persisted progress.">
    <div className={styles.flow}>
      <Node title="Scheduler">Run + segment identity</Node>
      <Arrow label="start" />
      <Node title="Worker attempt" accent>Model + source tools</Node>
    </div>
    <div className={styles.persistence}><span>Save <span aria-hidden="true">↓</span></span><span><span aria-hidden="true">↑</span> Restore</span></div>
    <Node title="Saved research state" accent>Evidence · findings · gaps · pending input</Node>
    <div className={styles.down} aria-hidden="true">↓</div>
    <div className={styles.context}><span className={styles.kicker}>Interface</span><strong>Read saved progress</strong><span>Reconnect without restarting the task</span></div>
  </Diagram>;
}
