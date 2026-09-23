"use client";

import { useEffect, useState } from "react";
import styles from "./jev-router-explorer.module.css";

type Model = "jev" | "gpt" | "claude" | "gemini" | "deepseek";
type Case = {
  id: string;
  request: string;
  context: string;
  accepted: string[];
  pair?: string;
};
type Result = {
  case_id: string;
  model: Model;
  repeat: number;
  route: string | null;
  status: string;
  correct: boolean;
  latency_ms: number;
  cost_usd: number | null;
  confidence?: number;
};
type Summary = {
  model: Model;
  label: string;
  attempts: number;
  correct: number;
  valid: number;
  median_ms: number | null;
  p95_ms: number | null;
  cost_per_1000: number | null;
  identical_repeat_cases: number;
  case_count: number;
  paired_both_correct: number;
  pair_repeats: number;
};
type Experiment = {
  date: string;
  cases: Case[];
  results: Result[];
  summary: Summary[];
};

function median(values: number[]) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

const milliseconds = (value: number | null) =>
  value === null ? "Unavailable" : `${Math.round(value).toLocaleString()} ms`;
const dollars = (value: number | null, digits: number) =>
  value === null ? "Unavailable" : `$${value.toFixed(digits)}`;

export default function JevRouterExplorer() {
  const [data, setData] = useState<Experiment | null>(null);
  const [error, setError] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [threshold, setThreshold] = useState(0);
  const [query, setQuery] = useState("");
  const [errorRoute, setErrorRoute] = useState("read_file");
  const [metric, setMetric] = useState<
    "accuracy" | "latency" | "cost" | "valid"
  >("accuracy");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/blog/jev-tool-router/explorer.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Results unavailable");
        return response.json();
      })
      .then(setData)
      .catch((error) => {
        if (error.name !== "AbortError") setError(true);
      });
    return () => controller.abort();
  }, []);

  if (error)
    return (
      <p role="status">
        The interactive results could not load. The measured results remain in
        the table above.
      </p>
    );
  if (!data) return <p role="status">Loading recorded experiment results…</p>;

  const selected = data.cases.find((item) => item.id === selectedId);
  const paired = selected?.pair
    ? data.cases.find(
        (item) => item.pair === selected.pair && item.id !== selected.id,
      )
    : undefined;

  return (
    <section
      className={styles.explorer}
      aria-label="Interactive routing comparison"
    >
      <div className={styles.heading}>
        <span className={styles.eyebrow}>Explore the experiment</span>
        <span className={styles.recorded}>
          Recorded API runs · {data.date.slice(0, 10)}
        </span>
      </div>
      <div className={styles.picker}>
        <label className={styles.label} htmlFor="jev-search">
          Find a scenario
        </label>
        <input
          id="jev-search"
          className={styles.select}
          type="search"
          placeholder="Search requests or context…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelectedId("");
          }}
        />
        <label className={styles.label} htmlFor="jev-scenario">
          Choose a debugging scenario
        </label>
        <select
          id="jev-scenario"
          className={styles.select}
          value={selectedId}
          onChange={(event) => setSelectedId(event.target.value)}
        >
          <option value="">
            All {data.cases.length} cases · overall comparison
          </option>
          {["Ordinary cases", "Context changes"].map((group) => (
            <optgroup key={group} label={group}>
              {data.cases
                .filter(
                  (item) =>
                    Boolean(item.pair) === (group === "Context changes") &&
                    `${item.request} ${item.context}`
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                )
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.request}
                    {item.pair
                      ? ` · context ${item.id.endsWith("a") ? "A" : "B"}`
                      : ""}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <p className={styles.pickerHint}>
          {
            data.cases.filter((item) =>
              `${item.request} ${item.context}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            ).length
          }{" "}
          matching cases · choose a case or view the full benchmark
        </p>
      </div>
      {selected ? (
        <div className={styles.scenario}>
          <p className={styles.request}>{selected.request}</p>
          <p>{selected.context}</p>
          <p className={styles.reference}>
            Reference action: <code>{selected.accepted.join(" or ")}</code>
          </p>
          {paired ? (
            <button
              className={styles.pairButton}
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedId(paired.id);
              }}
            >
              Same request, different context →
            </button>
          ) : null}
        </div>
      ) : (
        <p className={styles.explanation}>
          60 authored cases × 3 runs per model. Accuracy is agreement with the
          reference labels, including failed attempts in the denominator.
        </p>
      )}
      <div className={styles.chart} aria-label="Recorded benchmark chart">
        <div
          className={styles.chartControls}
          role="group"
          aria-label="Chart measurement"
        >
          {(["accuracy", "latency", "cost", "valid"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={metric === item}
              onClick={() => setMetric(item)}
            >
              {item === "accuracy"
                ? "Accuracy"
                : item === "latency"
                  ? "Latency"
                  : item === "cost"
                    ? "Cost"
                    : "Valid responses"}
            </button>
          ))}
        </div>
        <p className={styles.chartCaption}>
          {metric === "accuracy"
            ? "Reference agreement · higher is better"
            : metric === "latency"
              ? "Median response time · lower is faster"
              : metric === "cost"
                ? "Measured cost per 1,000 attempts · lower is cheaper"
                : "Valid route returned / all attempts · higher is better; not a correctness score"}
        </p>
        {(() => {
          const values = data.summary.map((item) => {
            const runs = selected
              ? data.results.filter(
                  (r) => r.case_id === selected.id && r.model === item.model,
                )
              : [];
            const value =
              metric === "valid"
                ? (selected
                    ? runs.filter((r) => r.status === "ok").length / runs.length
                    : item.valid / item.attempts) * 100
                : metric === "accuracy"
                  ? (selected
                      ? runs.filter((r) => r.correct).length / runs.length
                      : item.correct / item.attempts) * 100
                  : metric === "latency"
                    ? selected
                      ? median(
                          runs
                            .filter((r) => r.status === "ok")
                            .map((r) => r.latency_ms),
                        )
                      : item.median_ms
                    : selected
                      ? runs.length && runs.every((r) => r.cost_usd !== null)
                        ? (runs.reduce((sum, r) => sum + (r.cost_usd ?? 0), 0) /
                            runs.length) *
                          1000
                        : null
                      : item.cost_per_1000;
            return { ...item, value };
          });
          const maximum =
            metric === "accuracy" || metric === "valid"
              ? 100
              : Math.max(...values.map((item) => item.value ?? 0), 0.000001);
          return values.map((item) => (
            <div
              key={item.model}
              className={`${styles.chartRow} ${styles[item.model]}`}
            >
              <div className={styles.chartLabel}>
                <span>{item.label}</span>
                <strong>
                  {item.value === null
                    ? "Unavailable"
                    : metric === "accuracy" || metric === "valid"
                      ? `${item.value.toFixed(1)}%`
                      : metric === "latency"
                        ? milliseconds(item.value)
                        : dollars(item.value, 4)}
                </strong>
              </div>
              <div className={styles.track}>
                <div
                  className={styles.bar}
                  style={{
                    transform: `scaleX(${(item.value ?? 0) / maximum})`,
                  }}
                />
              </div>
            </div>
          ));
        })()}
      </div>
      <div className={styles.models} aria-live="polite">
        {data.summary.map((summary) => {
          const runs = selected
            ? data.results.filter(
                (r) => r.case_id === selected.id && r.model === summary.model,
              )
            : [];
          const correct = selected
            ? runs.filter((r) => r.correct).length
            : summary.correct;
          const attempts = selected ? runs.length : summary.attempts;
          const valid = selected
            ? runs.filter((r) => r.status === "ok").length
            : summary.valid;
          const latency = selected
            ? median(
                runs.filter((r) => r.status === "ok").map((r) => r.latency_ms),
              )
            : summary.median_ms;
          const cost = selected
            ? runs.length && runs.every((r) => r.cost_usd !== null)
              ? runs.reduce((sum, r) => sum + (r.cost_usd ?? 0), 0) /
                runs.length
              : null
            : summary.cost_per_1000;
          const routes = Array.from(
            new Set(runs.map((r) => r.route ?? r.status)),
          );
          return (
            <article
              key={summary.model}
              className={`${styles.model} ${styles[summary.model]}`}
            >
              <h3>{summary.label}</h3>
              {selected ? (
                <p className={styles.route}>{routes.join(" / ")}</p>
              ) : null}
              <dl className={styles.metrics}>
                <div>
                  <dt>Accuracy</dt>
                  <dd>
                    {attempts
                      ? `${((correct / attempts) * 100).toFixed(1)}%`
                      : "Not scored"}
                    <small>
                      {correct} / {attempts} correct
                    </small>
                  </dd>
                </div>
                <div>
                  <dt>Median latency</dt>
                  <dd>{milliseconds(latency)}</dd>
                </div>
                <div>
                  <dt>
                    {selected ? "Mean cost / attempt" : "Cost / 1,000 attempts"}
                  </dt>
                  <dd>{dollars(cost, selected ? 6 : 4)}</dd>
                </div>
              </dl>
              <p className={styles.tail}>
                {valid} / {attempts} valid responses ·{" "}
                {valid ? `${((correct / valid) * 100).toFixed(1)}%` : "N/A"}{" "}
                correct among valid
              </p>
              {selected ? (
                <details className={styles.details}>
                  <summary>Inspect the three runs</summary>
                  {runs
                    .sort((a, b) => a.repeat - b.repeat)
                    .map((run) => (
                      <p key={run.repeat}>
                        <strong>
                          Run {run.repeat + 1}:{" "}
                          {run.correct
                            ? "Correct"
                            : run.status === "ok"
                              ? "Different from reference"
                              : "Failed"}
                        </strong>
                        <br />
                        <code>{run.route ?? run.status}</code>
                        <br />
                        {milliseconds(run.latency_ms)} ·{" "}
                        {dollars(run.cost_usd, 6)}
                        {run.confidence !== undefined ? (
                          <>
                            <br />
                            Confidence: {run.confidence.toFixed(3)}
                          </>
                        ) : null}
                      </p>
                    ))}
                </details>
              ) : (
                <p className={styles.tail}>
                  p95 latency: {milliseconds(summary.p95_ms)}
                </p>
              )}
            </article>
          );
        })}
      </div>
      <section className={styles.method} aria-label="Routing reliability">
        <h3>Reliability across the full evaluation</h3>
        <p className={styles.explanation}>
          Consistency means all three runs returned the same valid route.
          Context sensitivity requires both variants of a pair to be correct in
          the same repetition. Consistency alone does not mean correctness.
        </p>
        <div className={styles.tableScroll}>
          <table className={styles.reliabilityTable}>
            <thead>
              <tr>
                <th>Model</th>
                <th>Consistent cases</th>
                <th>Both contexts correct</th>
                <th>Valid responses</th>
              </tr>
            </thead>
            <tbody>
              {data.summary.map((item) => (
                <tr key={item.model}>
                  <th scope="row">{item.label}</th>
                  <td>
                    {item.identical_repeat_cases} / {item.case_count}
                  </td>
                  <td>
                    {item.paired_both_correct} / {item.pair_repeats}
                  </td>
                  <td>
                    {item.valid} / {item.attempts}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className={styles.method} aria-label="Errors by expected tool">
        <h3>Errors across the full evaluation</h3>
        <label className={styles.label} htmlFor="jev-error-route">
          Expected next action
        </label>
        <select
          className={styles.select}
          id="jev-error-route"
          value={errorRoute}
          onChange={(event) => setErrorRoute(event.target.value)}
        >
          {[
            "search_code",
            "read_file",
            "search_docs",
            "inspect_logs",
            "run_tests",
            "ask_clarification",
          ].map((route) => (
            <option key={route} value={route}>
              {route.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        {data.summary.map((item) => {
          const caseIds = new Set(
            data.cases
              .filter((c) => c.accepted.includes(errorRoute))
              .map((c) => c.id),
          );
          const attempts = data.results.filter(
            (r) => r.model === item.model && caseIds.has(r.case_id),
          );
          const errors = attempts.filter((r) => !r.correct);
          const predictions = Array.from(
            new Set(errors.map((r) => r.route ?? r.status)),
          );
          return (
            <div
              className={`${styles.chartRow} ${styles[item.model]}`}
              key={item.model}
            >
              <div className={styles.chartLabel}>
                <span>{item.label}</span>
                <strong>
                  {errors.length} / {attempts.length} errors
                </strong>
              </div>
              <div className={styles.track}>
                <div
                  className={styles.bar}
                  style={{
                    transform: `scaleX(${attempts.length ? errors.length / attempts.length : 0})`,
                  }}
                />
              </div>
              {predictions.length ? (
                <p className={styles.pickerHint}>
                  Returned: {predictions.join(", ")}
                </p>
              ) : null}
            </div>
          );
        })}
      </section>
      <section
        className={styles.method}
        aria-label="Jev confidence and coverage"
      >
        <h3>Jev confidence across the full evaluation</h3>
        <p className={styles.explanation}>
          Move the threshold to retain only decisions with at least that
          confidence. This explores the saved sample; it does not validate a
          deployment threshold.
        </p>
        <label className={styles.label} htmlFor="jev-confidence">
          Minimum confidence: {threshold.toFixed(2)}
        </label>
        <input
          className={styles.slider}
          id="jev-confidence"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={threshold}
          onChange={(event) => setThreshold(Number(event.target.value))}
        />
        {(() => {
          const all = data.results.filter((r) => r.model === "jev");
          const retained = all.filter(
            (r) =>
              r.status === "ok" &&
              r.confidence !== undefined &&
              r.confidence >= threshold,
          );
          const correct = retained.filter((r) => r.correct).length;
          const curve = Array.from({ length: 21 }, (_, i) => {
            const kept = all.filter(
              (r) =>
                r.status === "ok" &&
                r.confidence !== undefined &&
                r.confidence >= i / 20,
            );
            return {
              coverage: (kept.length / all.length) * 100,
              accuracy: kept.length
                ? (kept.filter((r) => r.correct).length / kept.length) * 100
                : null,
            };
          }).filter((p) => p.accuracy !== null);
          const floor = Math.max(
            0,
            Math.floor(Math.min(...curve.map((p) => p.accuracy ?? 100)) / 10) *
              10 -
              10,
          );
          const x = (coverage: number) => 48 + coverage * 4.4;
          const y = (accuracy: number) =>
            170 - ((accuracy - floor) / (100 - floor)) * 140;
          return (
            <div aria-live="polite" className={styles.retention}>
              <p>
                <strong>
                  {retained.length
                    ? `${((correct / retained.length) * 100).toFixed(1)}%`
                    : "No decisions"}
                </strong>{" "}
                accuracy among retained decisions
              </p>
              <p>
                <strong>
                  {((retained.length / all.length) * 100).toFixed(1)}%
                </strong>{" "}
                coverage · {retained.length} / {all.length} retained ·{" "}
                {new Set(retained.map((r) => r.case_id)).size} unique cases
              </p>
              <svg
                className={`${styles.curve} ${styles.jev}`}
                viewBox="0 0 540 215"
                role="img"
                aria-label="Jev accuracy versus retained coverage; the highlighted point follows the confidence threshold"
              >
                {[floor, (floor + 100) / 2, 100].map((tick) => (
                  <g key={tick}>
                    <line
                      x1="48"
                      x2="488"
                      y1={y(tick)}
                      y2={y(tick)}
                      className={styles.gridLine}
                    />
                    <text x="39" y={y(tick) + 4} textAnchor="end">
                      {tick}%
                    </text>
                  </g>
                ))}
                {[0, 25, 50, 75, 100].map((tick) => (
                  <text key={tick} x={x(tick)} y="190" textAnchor="middle">
                    {tick}%
                  </text>
                ))}
                <text x="48" y="15">
                  Accuracy among retained decisions
                </text>
                <text x="268" y="212" textAnchor="middle">
                  Decision coverage
                </text>
                <polyline
                  points={curve
                    .map((p) => `${x(p.coverage)},${y(p.accuracy ?? 0)}`)
                    .join(" ")}
                  fill="none"
                  stroke="var(--model-color)"
                  strokeWidth="2.5"
                />
                {retained.length ? (
                  <circle
                    cx={x((retained.length / all.length) * 100)}
                    cy={y((correct / retained.length) * 100)}
                    r="5"
                    fill="var(--model-color)"
                    stroke="hsl(var(--background))"
                    strokeWidth="2"
                  />
                ) : null}
              </svg>
            </div>
          );
        })()}
      </section>
      <p className={styles.footnote}>
        These are saved measurements, not live calls. Selecting a scenario costs
        nothing. Confidence is not accuracy; three repeats of one case are not
        three independent examples.
      </p>
    </section>
  );
}

const diagramModels: { model: Model; label: string }[] = [
  { model: "jev", label: "Jev 1.13" },
  { model: "gpt", label: "GPT-6 Luna" },
  { model: "claude", label: "Claude Haiku 4.5" },
  { model: "gemini", label: "Gemini 3.8 Flash" },
  { model: "deepseek", label: "DeepSeek V4.1 Flash" },
];
export function RouterArchitecture() {
  const [activeModel, setActiveModel] = useState<Model>("jev");
  return (
    <section className={styles.method} aria-label="Router architecture">
      <h3>One request, five routers</h3>
      <div className={styles.flow}>
        <div>
          <span className={styles.step}>01 / SHARED INPUT</span>
          <strong>Request + task context</strong>
          <small>The same six available actions for every router</small>
        </div>
        <span className={styles.arrow} aria-hidden="true">
          ↓
        </span>
        <div>
          <span className={styles.step}>02 / SELECT A ROUTER</span>
          <div className={styles.routerButtons}>
            {diagramModels.map((item) => (
              <button
                type="button"
                key={item.model}
                aria-pressed={activeModel === item.model}
                onClick={() => setActiveModel(item.model)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <small>
            {activeModel === "jev"
              ? "One typed Choice question → route + probability distribution"
              : "One constrained JSON response → route enum"}
          </small>
        </div>
        <span className={styles.arrow} aria-hidden="true">
          ↓
        </span>
        <div>
          <span className={styles.step}>03 / MEASURE</span>
          <strong>Validate → score → record</strong>
          <small>
            Reference agreement · elapsed time · reported charge. No tools
            executed.
          </small>
        </div>
      </div>
    </section>
  );
}
