---
title: "Building AI Agents That Survive Restarts: Durable Execution in Practice"
excerpt: "What survives when an agent worker dies? Checkpoint boundaries, repeated tool calls, context reconstruction, and seven executable recovery scenarios."
date: "2026-08-23"
readTime: "16 min read"
tags: ["AI Agents", "Durable Execution", "Python", "System Design"]
---

An agent has searched three filings, found relevant passages, and started comparing them. The worker process stops before the answer is ready. A replacement worker receives the task.

The replacement needs to know which passages were saved, which findings were completed, and what remains unresolved. Conversation history alone cannot tell it whether a tool result reached the database.

A research task can outlive a browser tab, a provider connection, or a deployment. Saving its progress lets another worker continue without repeating every search.

In my research implementation, durable scheduling starts a saved research segment. The worker restores evidence and builds the model's next input from retained findings, unresolved questions, and user input. Those are two distinct responsibilities: getting work executed, and making the resumed work useful.

The example is a comparison of public-company filings. I tested the recovery paths with Python child processes, SQLite checkpoints, and a fixed source response, terminating workers between operations. The saved results show which work survives and which calls repeat.

## The task outlives the worker

Consider this request:

> Compare how three public companies describe supplier concentration risk. Explain the differences and support each finding with a passage from the relevant filing.

The agent may start with broad searches, inspect a promising document, discover that a passage belongs to the wrong reporting period, and search again. The sequence depends on what it finds. We want to preserve that flexibility while making completed work available to a replacement process.

Start by separating three identities:

| Identity | What it represents | When it changes |
| --- | --- | --- |
| Run | The user's research task | A new task starts |
| Segment | A resumable episode of that task | The task is explicitly continued with new input or another work allowance |
| Attempt | A worker invocation processing the segment | Execution is delivered or retried |

An attempt can disappear without ending the run. A segment can pause while its findings remain useful. A user can return later with the missing reporting period and continue the same research task.

The browser should therefore read persisted run status and artifacts. A dropped connection means the browser needs to reconnect; it does not establish that the research failed. Equally, a connected progress stream does not establish that every displayed result has been committed.

{{durable-architecture-diagram}}

The restore path connects saved state to the replacement worker. Without it, a queue makes the task asynchronous but does not tell a replacement worker what the earlier attempt accomplished.

## What durable execution restores

A durable workflow engine records execution history so orchestration can recover after a process stops. In Microsoft's Durable Task model, an orchestrator replays its code and consults that history to recover recorded activity results. The orchestration must be deterministic; external work belongs in activities. See the [Durable Task orchestration documentation](https://learn.microsoft.com/en-us/azure/durable-task/common/durable-task-orchestrations).

An activity can contain considerable work: a model call, several searches, passage extraction, and a draft. If the entire research episode is one activity, the workflow engine does not automatically know which individual passages inside it were saved.

That is why the research implementation has an application checkpoint as well as a durable scheduler. The scheduler receives identifiers for a saved segment. The activity loads the run, checks that the segment is current, restores evidence, and enters the research loop. If the model call is interrupted, a later invocation constructs a new input from the saved research state.

These are different guarantees. Recorded activity results can be replayed by the engine. An unfinished activity may execute again. Within that activity, only the work explicitly persisted by the research code is available for application-level recovery.

A saved checkpoint also does not preserve the model's unfinished response or hidden reasoning. If generation stopped halfway through a finding, that finding may need to be generated again. Committed evidence and accepted findings remain available to the next attempt.

## Save artifacts the next attempt can use

A transcript is useful context, but it is a poor substitute for explicit research records. It can mix tentative claims, rejected searches, tool errors, and final findings without indicating which are authoritative.

Separate the task's state into a few concrete objects:

| Record | Contents | Recovery purpose |
| --- | --- | --- |
| Run | Request, current status, segment, scope | Identify the work and whether it can proceed |
| Evidence | Source identity, document version, location, exact passage | Reuse retrieved material and resolve references |
| Finding | Claim and supporting evidence IDs | Preserve accepted research output |
| Checkpoint | Current phase, gaps, next searches, pending question | Construct the next useful step |
| Event | Attempt, operation, outcome, sequence | Explain execution after the fact |

A finding can reference several passages. A document can contribute several different passages. Using the document ID as the identity of every finding would collapse distinct observations into one record.

In a real document store, a passage identity can include the document version and location or a normalized quotation hash. A finding needs its own identity because two interpretations can cite the same passage. For a fixed single-passage fixture, the experiment uses explicit IDs to keep that distinction visible:

```python
CREATE_EVIDENCE = """
CREATE TABLE evidence (
    id TEXT PRIMARY KEY,
    quote TEXT
)
"""
CREATE_FINDINGS = """
CREATE TABLE findings (
    id TEXT PRIMARY KEY,
    source TEXT,
    claim TEXT
)
"""
```

The experiment uses one immutable passage and sequential worker invocations. A document store would also need source versions and concurrency handling.

An activity log serves a different purpose. “Search completed” helps diagnose a run. It cannot replace the returned passage if that passage was never stored. Conversely, stored evidence can support recovery even when an event stream disconnects.

## Put the checkpoint where repetition matters

Imagine the worker performing three operations:

```text
Fetch passage → save evidence → save finding
```

There are two important gaps. The source may return before its response is saved. The evidence may be saved before the model produces a finding. Those interruptions should lead to different recovery behaviour.

In the offline experiment, the source operation appends to a separate call ledger. SQLite stores the evidence and finding. The separate ledger represents something the worker's database transaction cannot undo: the provider has already handled the request.

The critical sequence is short:

```python
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
```

`os._exit` ends the child process without normal Python cleanup. The parent then starts another process against the same database. This tests process interruption, not a simulated power failure or storage corruption.

Explore the saved state on either side of those boundaries:

{{durable-agent-boundary}}

The saved status can still say `running` after a process exits: the worker stopped before writing another status. A production interface needs a worker heartbeat or lease expiry to distinguish an active attempt from stale state.

Stopping after the source returns causes another source call on restart because the database contains no evidence to reuse. Stopping after the evidence commit preserves the passage; the new process reads it and continues to the finding.

Frequent checkpoints reduce repeated work but add storage operations and intermediate states. Saving retrieved passages and accepted findings gives the next attempt reusable artifacts without persisting every generated token.

The choice should follow the cost of repetition. An inexpensive classification can often be recomputed. A slow document extraction or an expensive batch of searches deserves an earlier durable result. An external write needs a stronger duplicate-handling strategy than either read operation.

## Handle retries without duplicating writes

Duplicate scheduling, duplicate records, and repeated external calls need different handling.

A deterministic scheduling ID, combined with the scheduler's duplicate-instance policy, can stop repeated requests from creating separate scheduled instances for the same segment. A segment check can reject work that was superseded before it started. A unique finding ID can prevent duplicate stored rows. None of those proves that an external tool ran only once.

The fixture experiment demonstrates this directly: after a crash between source response and evidence persistence, there are two source calls but one stored passage and one final finding.

For the immutable fixture, inserting the finding uses a stable identity:

```python
with db:
    db.execute(
        "INSERT OR IGNORE INTO findings VALUES (?, ?, ?)",
        (
            "finding-1",
            "passage-1",
            "Supplier concentration is disclosed as a risk.",
        ),
    )
```

The uniqueness constraint protects the stored result. It does not refund a repeated API call. It also deliberately preserves the existing fixture finding. For editable findings, silently ignoring a conflicting value would be inappropriate: the write should distinguish a repeat of the same operation from a new revision.

External writes introduce a more consequential version of the same gap. Suppose a document service applies a revision, then the worker loses the response. Retrying with a fresh operation ID could apply the revision again. If the service supports idempotency keys, reuse a stable key for that logical edit. Otherwise, reconcile against an operation receipt or the expected document version before deciding what to do next.

For each operation, identify the effect that could repeat and the system that can detect it: the scheduler, the database, or the destination API.

Concurrency is another boundary. Reading “this is the current segment” at startup does not stop two workers from reading the same state simultaneously. A production implementation that permits overlapping attempts needs a claim, lease, or conditional write at the shared store. A process-local lock only orders writes inside that process. The sequential experiment below does not test distributed exclusion.

## Reconstruct context, then let the agent continue

The next model call needs the recovered evidence and findings in its input, or a tool that can retrieve them.

The research runner restores saved evidence into its source-reference registry, then builds the next episode's input from the original request, source scope, retained findings, gaps, planned searches, and user input. It does not depend on recovering an unfinished provider response.

A simplified context shape makes the intended relationship clear:

```python
def resume_context(run, findings, gaps, pending_searches):
    return {
        "question": run["original_request"],
        "source_scope": run["source_scope"],
        "prior_findings": findings,
        "unresolved_gaps": gaps,
        "next_searches": pending_searches,
        "user_input": run.get("clarification_answer"),
    }
```

Each retained finding must still resolve to saved evidence. Passing a claim with an unavailable reference gives the next model a conclusion it cannot inspect. The source registry and finding store need to agree about which identifiers exist.

For long investigations, context selection becomes its own engineering problem. Supplying every historical finding can crowd out the current question. Supplying only the newest findings can hide an earlier contradiction. Useful selection can prioritize findings relevant to the current gap while keeping the full evidence store available through tools.

The checkpoint should preserve what is known and what remains unresolved. It should not dictate a search merely because the previous attempt proposed one. New user input or newly recovered evidence can make a different next action appropriate.

Persisting a prompt version, model identifier, and source version alongside each attempt also helps explain changes across resumptions. If a run continues after a deployment, differences may come from changed instructions or updated documents rather than the recovery mechanism itself.

## Retry, pause, and clarification are different transitions

A malformed model response, a provider outage, and a missing reporting period are all reasons a run might stop. They need different next actions.

| Condition | Useful transition | Information to preserve |
| --- | --- | --- |
| Temporary provider failure | Retry after delay, or pause for later continuation | Failed operation, attempt count, retry timing, saved artifacts |
| Missing user input | Wait for an answer | Exact question and why it is needed |
| Structurally invalid output | Return specific feedback for repair | Validation result and available references |
| Worker interruption | Recover from committed state | Run identity, current segment, evidence and findings |
| Task completed | Return the saved artifact | Final answer and supporting references |

The research runner saves a paused state for provider failures and a waiting state when the research decision requests clarification. That makes the distinction visible to the user: one task needs another execution opportunity; the other needs information.

A waiting task should not keep a worker sleeping until the user returns. Save the question and end the attempt. When an answer arrives, save it before scheduling continuation. The replacement worker can then build context from both the earlier findings and the new input.

If saving that input succeeds but scheduling fails, the queued work needs a recovery path. A transactional outbox or a reconciliation job can bridge the database-to-scheduler gap. Adding another retry around the browser request alone does not make those two systems commit atomically.

Retries should also have a reason to succeed. Waiting after a rate limit may help. Sending the same malformed output back without a specific validation message may not. Repair feedback such as “reference 12 was not returned by retrieval” gives the model an actionable problem; “try again” gives it very little.

Record work already spent across attempts. Otherwise, repeatedly resuming a task can reset its visible counters while accumulating substantial provider usage. The purpose of those counters is to make progress and cost understandable, including when the user chooses to continue a difficult investigation.

## Interrupt the process and inspect the result

For the article's experiment, I ran seven scenarios against an isolated temporary SQLite database per scenario. Each worker invocation used a new Python process. Three scenarios exited immediately at an injected failure point; the provider and clarification scenarios returned after saving a paused or waiting state.

The fixture contains one passage and one expected finding. There are no network requests or model calls. This isolates the persistence behaviour so that a different generated answer cannot conceal whether recovery worked.

| Scenario | Worker invocations | Fixture source calls | Final findings |
| --- | --- | --- | --- |
| Uninterrupted | 1 | 1 | 1 |
| Stop after source response | 2 | 2 | 1 |
| Stop after evidence commit | 2 | 1 | 1 |
| Stop after finding commit | 2 | 1 | 1 |
| Deliver completed work again | 2 | 1 | 1 |
| Provider unavailable, then resume | 2 | 1 | 1 |
| Ask for input, then resume | 2 | 1 | 1 |

Every scenario reached the expected final state. The revealing result is the extra source call in the response-before-persistence case. The final artifact count alone would miss that repeated work.

The provider scenario injects an unavailable state before retrieval; it tests saving and resuming that state, not an SDK's HTTP retry behaviour. The clarification scenario saves a question, commits the answer, and checks that the next process reads it. Duplicate delivery is sequential, after completion, rather than a race between simultaneous workers.

{{durable-agent-traces}}

The experiment checks the child-process exit code, the saved state at interruption, the source-call count, and the final persisted records. It also checks that clarification reaches the replacement worker and that an existing finding is reused. The final-state assertions include:

```python
expected_calls = 2 if name == "after_fetch" else 1
assert calls == expected_calls, (name, calls)
assert after == {
    "evidence": 1,
    "findings": 1,
    "status": "complete",
}, after
```

Across these seven paths, the checks confirm that recovery preserves the expected records and exposes repeated source calls. Load, database failure, and model interpretation need separate tests.

For a live-model extension, measure repeated external calls and additional charged usage alongside completion. Separate time spent waiting for a user or provider from time spent executing. A run that completes after an hour-long clarification wait should not be presented as an hour of model latency.

## Recovering the answer is not evaluating the answer

An agent can reliably preserve a wrong finding. Durable execution gives that mistake a longer life unless answer quality is evaluated separately.

When comparing filings, evaluate whether the quoted evidence supports each claim, whether the company and reporting period are correct, and whether the answer covers the requested comparisons. Reference existence is a deterministic check. Whether a passage supports the whole claim requires examining meaning.

For example, “Company A identifies supplier concentration as a risk” does not establish that Company A suffered a supply interruption. A valid source ID and a successful restart do not make that stronger claim true.

Keep two evaluation tracks:

| Recovery evaluation | Research evaluation |
| --- | --- |
| Were committed artifacts preserved? | Are the retained claims supported? |
| Which source calls repeated? | Were relevant sources missed? |
| Did a repeated delivery duplicate output? | Does the comparison answer the request? |
| Was clarification restored? | Did the answer incorporate it correctly? |
| Did the run reach its expected state? | Are remaining gaps communicated accurately? |

Deterministic fixtures make the first track easier to diagnose. Curated research cases with inspectable passages make the second track meaningful. A model judge can assist review, but it should not replace checking the source passages when assessing a disputed claim.

For this research task, passages and supported findings are the records worth preserving. Give them stable identities, record repeated calls, and restore the evidence behind each finding before asking the model to continue.

Test recovery by stopping the worker between the source response, evidence commit, and finding commit. Inspect both the final records and the calls made along the way: a correct final count can still hide repeated work.
