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

export function ClaimSupportDiagram() {
  return <Diagram title="A valid citation can still support a wrong claim" caption="Synthetic example. Reference integrity passes, but the claim changes both uncertainty and time. Each verdict answers a different question.">
    <div className={styles.evidencePair}>
      <div><span className={styles.kicker}>Source passage</span><p>Management <strong>expects</strong> the programme to reduce operating costs <strong>next year</strong>.</p></div>
      <div><span className={styles.kicker}>Generated claim</span><p>The programme <strong>reduced</strong> operating costs <strong>this year</strong>.</p></div>
    </div>
    <div className={styles.verdicts}>
      <div><span className={styles.kicker}>Integrity</span><strong>Pass</strong><span>The exact quote resolves to the registered source.</span></div>
      <div><span className={styles.kicker}>Semantic support</span><strong>Fail</strong><span>A forecast became a result; the period changed.</span></div>
      <div><span className={styles.kicker}>Task outcome</span><strong>Fail</strong><span>The proposed wording needs correction before review.</span></div>
    </div>
  </Diagram>;
}

export function EvidenceAvailabilityDiagram() {
  return <Diagram title="Change the evidence, change the expected behavior" caption="Paired synthetic cases use the same request. Correct behavior depends on what the available documents establish.">
    <div className={styles.context}><span className={styles.kicker}>Same request</span><strong>Draft the revenue disclosure for review</strong><span>Required facts: revenue amount + reporting period</span></div>
    <div className={styles.down} aria-hidden="true">↓</div>
    <div className={styles.evidencePair}>
      <div><span className={styles.kicker}>Case A / Amount present</span><p>“Revenue was £12 million for 2025.”</p><div className={styles.caseOutcome}><strong>Propose the supported draft</strong><span>Include the amount and period; attach the source; await review.</span></div></div>
      <div><span className={styles.kicker}>Case B / Amount absent</span><p>“Reporting period: 2025.” No amount appears in any available document.</p><div className={styles.caseOutcome}><strong>Draft partially + ask</strong><span>Preserve the period. Ask for the 2025 revenue amount; leave it unresolved.</span></div></div>
    </div>
    <div className={styles.diagramNote}>Failure in A: asking for an amount already supplied. Failure in B: inventing an amount or copying it from a peer.</div>
  </Diagram>;
}

export function SupportCoverageDiagram() {
  return <Diagram title="Support and completeness answer different questions" caption="Conceptual quadrants, not measured results. Support asks whether claims are grounded; coverage asks whether required answerable facts are included.">
    <div className={styles.matrixAxis}>Required-fact coverage →</div>
    <div className={styles.matrixLayout}>
      <div className={styles.matrixVertical}>Claim support ↑</div>
      <div className={styles.matrix}>
        <div><span className={styles.kicker}>High support / Low coverage</span><strong>Correct but incomplete</strong><p>Quotes one fact accurately and omits another required fact.</p></div>
        <div><span className={styles.kicker}>High support / High coverage</span><strong>Grounded and complete</strong><p>Covers required facts with claims supported by the evidence.</p></div>
        <div><span className={styles.kicker}>Low support / Low coverage</span><strong>Wrong and incomplete</strong><p>Changes the meaning and misses required information.</p></div>
        <div><span className={styles.kicker}>Low support / High coverage</span><strong>Complete with extra errors</strong><p>Covers required facts correctly, then adds unsupported claims.</p></div>
      </div>
    </div>
    <div className={styles.diagramNote}>An empty answer sits outside this matrix: support is undefined; coverage is zero when required facts exist. High scores still do not establish permission to apply an edit.</div>
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
