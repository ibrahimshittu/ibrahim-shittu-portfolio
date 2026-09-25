---
title: "Building AI Agents for Legal Tech: Harness Design, Evidence, and Evaluation"
excerpt: "A technical walkthrough of a legal-agent harness: scoped retrieval, verifiable citations, typed proposals, evaluation datasets, durable execution, and human approval."
date: "2025-06-15"
readTime: "15 min read"
image: "https://res.cloudinary.com/ibrahimshittu/image/upload/v1761403648/ibrahim-shittu-portfolio/blog/building-ai-agents-for-legal-tech.png"
tags: ["AI Agents", "Legal Tech", "System Design", "Evaluation"]
---

Suppose a source document says, “Management expects the programme to reduce operating costs next year.” The agent writes, “The programme reduced operating costs this year,” and attaches a citation to that document.

The citation resolves. The quotation exists. The answer is still wrong: an expectation has become a reported result, and the period has changed.

Building AI for legal work has made this distinction hard to ignore. Generating a paragraph is one problem; giving a lawyer enough evidence to defend it is another. The engineering work sits between those two: retrieving the right material, preserving what it says, checking the output, and keeping document changes under the reviewer's control.

This article works through a disclosure-comparison task to show how to build that surrounding system—the **agent harness**. The architecture is illustrative, and the Python examples are small enough to run offline. They demonstrate source checks and scoring, not a production benchmark or our internal implementation.

## Start with a specific task

Consider this request:

> Compare the selected risk-factor section with two peer filings. Preserve exact peer wording in the comparison, identify missing information, and propose a revision for review.

The application supplies the target document version, section, company, reporting period, and selected peers. The server determines which documents that user may access. The model must not invent those permissions or expand them through a tool argument.

The response needs four parts:

| Object | Required information | Purpose |
| --- | --- | --- |
| Source passage | Document identity, version, offsets, exact text | Make the evidence inspectable |
| Comparison finding | Target passage, peer passage, interpretation | Explain a difference without treating peer facts as target facts |
| Proposed revision | Base document version, replacement text, evidence references | Present a concrete change for review |
| Open question | Missing fact, why it matters, requested input | Continue when evidence is insufficient |

This separation prevents a common failure: copying another company's disclosure into a target-company draft as though the underlying facts were interchangeable. A peer passage establishes what the peer disclosed. It does not establish that the target company has the same exposure, controls, or financial position.

A fixed pipeline is sufficient when the request always follows the same steps. An agent loop becomes useful when retrieved evidence determines whether to read more, ask a question, or propose a revision. Keep the permissions and output contract fixed even when the model chooses the route through them.

## What the harness needs to do

![Illustrative legal-agent harness with task scope, context assembly, bounded model and tool execution, validation, human review, and version-checked writes.](/blog/legal-agent-harness/harness.svg)

*The harness owns authorization, execution limits, durable state, and approval. The model operates within those boundaries.*

The harness is the application code around the model. It assembles context, executes tools, saves progress, checks results, and presents work for review. For this task, the model needs to find passages, read them, ask for missing information, and propose a change. It does not need unrestricted document access or permission to edit the original.

Give each tool a clear input, result, and effect:

| Tool | Input | Result | Effect |
| --- | --- | --- | --- |
| `search_passages` | Query, approved company and period filters | Ranked passage handles | Read |
| `read_passage` | Handle returned by retrieval | Text and source metadata | Read |
| `ask_clarification` | Missing fact and focused question | Suspended task awaiting input | State change |
| `propose_revision` | Base version, text, evidence handles | Reviewable proposal | Creates artifact |

Applying the revision is a separate action controlled by the application after approval. The model can propose a change without gaining permission to apply it.

A minimal control loop can be expressed as pseudocode:

```text
load task checkpoint
while task is runnable:
    enforce remaining step, time and cost budgets
    assemble scoped context and available tool schemas
    request one next action from the model
    validate its schema, tool permission and arguments
    execute the action under authenticated scope
    persist its result and the next checkpoint
    if clarification or review is required: suspend
```

This is control flow, not a complete durable runner. In particular, a tool effect and its checkpoint are not automatically atomic. Writes need the separate recovery protocol discussed below.

Bound repairs as well as ordinary tool calls. An invalid citation should produce a specific validation result that the model can address. After the repair allowance is exhausted, retain the partial artifact and surface the unresolved failure. An unlimited “critic fixes generator” loop creates unpredictable latency and cost without establishing correctness.

### Skills supply procedure; code enforces boundaries

A skill can specify that comparison output must quote peer passages exactly, distinguish precedent from target-company evidence, and ask for material facts absent from the supplied documents. It should describe a reusable procedure rather than enumerate answers to individual evaluation cases.

The harness enforces properties the model cannot waive: document authorization, valid tool names, execution budgets, and the requirement for human approval before a write. Retrieved document text is evidence, not an instruction channel. A sentence in a filing cannot grant a new tool or alter the task's permissions.

I have found it easy to fix a failing example by adding an instruction, only to break a similar request. Before adding another exception, investigate where the failure occurred. Missing source text is an extraction problem. Wrong company scope is a retrieval or context problem. Unsupported interpretation needs semantic evaluation. They should not all become instructions appended to the same system prompt.

## Keep the source attached to the claim

Extraction should produce a stored text representation with a stable document identifier and version. This is the canonical text against which references will be checked. Preserve company, filing type, reporting period, section identity, and source location alongside it. A number without its table header or period is incomplete evidence even if the digits were extracted correctly.

Search operates over these records. Lexical retrieval can help with exact phrases and identifiers; semantic retrieval can help when wording varies. A hybrid implementation can merge candidates before reranking. Evaluate those choices on evidence needed for the task rather than assuming a more elaborate retriever is better.

Filter retrieval by permissions and the selected task, then keep a registry of the passages returned. Each passage gets a handle: an identifier the model can use in subsequent tool calls. Resolve those handles on the server. Accepting an arbitrary document ID from model output would allow it to reference material the run never retrieved.

A reference can carry the source version, the quoted text, and its position:

```python
from dataclasses import dataclass
from hashlib import sha256


def digest(text: str) -> str:
    return sha256(text.encode("utf-8")).hexdigest()


@dataclass(frozen=True)
class Evidence:
    source_id: str
    content_hash: str
    start: int
    end: int
    quote: str
```

The hash identifies the exact canonical text used by this example. Offsets are half-open Python string indices into that text, not PDF coordinates or UTF-8 byte offsets. A real extraction pipeline needs a separate mapping from canonical spans to page locations or bounding boxes, with the extraction version retained.

The following check establishes that a quotation matches the registered source version:

```python
def verify_evidence(ref: Evidence, sources: dict[str, str]) -> bool:
    text = sources.get(ref.source_id)
    if text is None or digest(text) != ref.content_hash:
        return False
    if not 0 <= ref.start < ref.end <= len(text):
        return False
    return text[ref.start:ref.end] == ref.quote
```

The `sources` mapping must come from the server's authorized run registry. A caller-controlled mapping would defeat that boundary. Python dataclasses also do not validate incoming JSON types; parse and validate untrusted input before constructing these internal objects. This distinction follows the [Python dataclass contract](https://docs.python.org/3/library/dataclasses.html).

The opening example would pass this check if it attached the source quotation correctly. The check verifies the quotation, while the error is in the generated claim. Assessing support requires comparing the claim with the passage: did the draft preserve the time period, uncertainty, entity, and meaning? That is the job of a semantic grader, discussed below.

Preserve this distinction in the interface too: source text, interpretation, and proposed wording should remain separately inspectable. An unresolved reference should render a visible failure rather than silently disappear.

## Tie each proposed edit to a document version

A proposal should name the document version it was prepared against. The following simplified example represents replacement of the selected section:

```python
@dataclass(frozen=True)
class Proposal:
    base_version: str
    replacement: str
    evidence: tuple[Evidence, ...]


def ready_for_review(proposal: Proposal, current_version: str,
                     sources: dict[str, str]) -> bool:
    return (
        proposal.base_version == current_version
        and bool(proposal.replacement.strip())
        and bool(proposal.evidence)
        and all(verify_evidence(ref, sources) for ref in proposal.evidence)
    )
```

`ready_for_review` checks only that the proposal is nonempty, uses the current document version, and has verifiable references. It does not establish that every sentence is supported, that the revision is legally sufficient, or that the user has approved it. A larger proposal can associate references with individual claims, making sentence-level support assessment possible.

Approval should bind to the exact proposal content and its base version. Store the reviewer identity and decision separately from model output. Before applying the change, compare the current version again. If someone edited the document during review, the earlier check is stale: regenerate or rebase the proposal and obtain review of the changed result.

The interface should show the proposed diff, its evidence, and unresolved questions together. A benchmarking form can collect company, section, and peers; the agent then asks only about uncertainty remaining after inspecting that context. “What period?” is unnecessary if the selected filing already supplies it.

## Evaluate what the agent was supposed to do

![Evaluation pipeline from frozen task cases through repeated trials, separate integrity and semantic graders, and paired comparison of candidate and baseline.](/blog/legal-agent-harness/evaluation.svg)

*Save both the artifact and the execution trace. Grade evidence support, useful completeness, and task behavior separately.*

A legal-agent evaluation case needs more than a prompt and an example answer. It needs input documents, authorized scope, expected content, acceptable clarification behavior, and forbidden actions. Record the relevant source spans so a grader can distinguish a missing fact from failed retrieval.

Here is the metadata for an illustrative test case. The source document would be stored alongside it:

```json
{
  "case_id": "comparison-amount-present",
  "request": "Draft the selected disclosure using supplied evidence.",
  "required_facts": ["amount", "reporting_period"],
  "answerable": true,
  "expected_behavior": "propose_for_review",
  "forbidden_behavior": ["apply_without_approval"],
  "source_fixture": "synthetic-company-v1"
}
```

Create a paired case that removes the amount from all available documents. Its expected behavior becomes a partial draft and a focused request for the amount. This tests whether the system responds to evidence availability, rather than always drafting or always asking questions.

Keep related variants together when splitting development and held-out cases. Otherwise a near-copy of a development example can make the evaluation look more general than it is. Freeze labels before viewing predictions; when reviewing ambiguous labels, document the change and rescore all compared configurations.

### Separate three kinds of grader

**Integrity graders** check schema validity, resolvable references, exact quotations, document versions, and forbidden tool effects. These are deterministic checks against recorded state.

**Semantic graders** assess whether evidence supports a claim, whether source meaning was preserved, and whether important facts were omitted. Human review defines the standard. A model judge can assist, but disagreement with expert annotations should be measured on a reviewed subset. Treat source text and candidate output as data inside the grader, not instructions it should follow.

**Task graders** inspect the artifact and behavior together: did the agent complete what was answerable, ask for what was missing, and stop at the review boundary? A fluent artifact does not compensate for reading outside its scope or applying an unapproved edit.

This separation is consistent with the distinction between tasks, trials, graders, and outcomes in [Anthropic's agent-evaluation guide](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents). The legal-specific obligations still need to be defined for the workload being evaluated.

### Score support and completeness independently

Two useful measures are supported factual claims divided by assessed factual claims, and required facts correctly covered divided by required answerable facts. Neither should be collapsed into a single “accuracy” number without explaining what it measures.

```python
def score(assessed_claims: list[bool], covered: set[str],
          required: set[str]) -> dict[str, float | None]:
    return {
        "support_rate": (
            sum(assessed_claims) / len(assessed_claims)
            if assessed_claims else None
        ),
        "required_fact_coverage": (
            len(covered & required) / len(required) if required else None
        ),
    }
```

These inputs are grader labels, not assertions supplied by the generating model. `covered` contains requirement IDs judged correctly satisfied. All factual claims must be assessed, or the report must disclose assessment coverage and unresolved judgments. An empty answer receives undefined support, not a perfect score, and zero coverage when required facts exist.

For example, give the function three claim labels—two supported and one unsupported—and one correctly covered fact out of two required facts. It returns 66.7% support and 50% coverage. These numbers illustrate the calculation; they are not model results. An empty response covers neither fact, even though it makes no unsupported claims.

A fuller report should retain distinct denominators:

| Metric | Denominator or comparison | Failure it exposes |
| --- | --- | --- |
| Reference resolution | All emitted references | Invented or unavailable sources |
| Claim support | All assessed factual claims | Unsupported interpretation |
| Required-fact coverage | Required answerable facts | Unnecessary omissions |
| Clarification behavior | Cases with labeled information gaps | Guessing or needless questions |
| Task success | All attempted runs, including failures | Incomplete or invalid outcomes |
| Repeated-case success | Successful trials for each case | Instability hidden by an average |
| Latency and cost | Attempts, with failed runs separated | Operational expense and delay |
| Reviewer corrections | Reviewed artifacts with recorded edit effort | Work shifted back to the user |

Do not infer factual correctness from citation density. Likewise, an audit agent agreeing with a drafting agent is not independent ground truth. Its benefit must appear in reviewed outcomes, with its extra latency and cost included.

### Compare configurations, not isolated answers

Run a baseline and candidate on the same held-out cases, repeating trials to expose nondeterminism. Record model identifiers, settings, prompts, skill versions, tool versions, dataset version, and ordering. Keep unsuccessful API calls and exhausted repair loops in completion statistics.

For a model or harness change, report per-case differences alongside aggregate metrics. Repeated trials of one case measure stability; they are not new independent tasks. If estimating uncertainty across tasks, group trials by case rather than treating each call as an independent sample.

The accompanying offline checks cover two paths: accepting an intact proposal with known scoring inputs, and rejecting stale or unresolvable evidence. They make no model calls. They validate those small contracts, not retrieval quality, semantic support, or production durability.

## Save enough state to continue the work

A conversation may explain why a change was made, but it should not be the only place to find the current document, its evidence, or its approval status. Store those separately:

| State | Scope | Update rule |
| --- | --- | --- |
| User preference | User and relevant workspace | Explicit change or confirmed preference |
| Company convention | Company and document type or section | Retain supporting precedent and version |
| Task decision | Run and document version | Revise when assumptions or evidence change |
| Artifact | Document and version | Create a new revision |
| Execution checkpoint | Run and completed step | Persist after a recoverable unit of work |

This prevents a preference learned for one company or section from silently affecting another. It also prevents a provisional model conclusion from becoming an unquestioned “memory.” Retrieve only applicable state, and preserve whether an entry is user-supplied, inferred, or still unresolved.

For long-running work, persist the run ID, status, completed steps, source handles, artifact version, pending question or approval, and configuration versions. Store artifacts durably; use caches only to avoid repeated computation or retrieval. Expiring a cache should not erase the task's progress.

### Recover writes without blindly repeating them

The difficult recovery window is after a document edit succeeds but before the runner saves confirmation. A retry can duplicate the operation.

A write protocol should assign a stable action ID to the approved proposal and check the base version at the destination. If the destination supports idempotency, reuse that action ID on retry. Otherwise reconcile the destination's current state before deciding whether an uncertain operation can be attempted again.

```text
proposal + base version → reviewer approval
approval + stable action ID → write intent
conditional write → destination receipt → completed checkpoint
missing receipt → reconcile destination → resume or require review
```

An action ledger alone does not guarantee exactly-once effects in an external document system. Version checks also need to be atomic with the write where supported; checking first and writing later leaves a race. If the integration cannot enforce that condition, surface the limitation and stop for reconciliation rather than claim safe automatic replay.

This is why “durable task” is more specific than “background task.” The system must preserve enough information to resume safely, not merely keep a process running after the browser closes.

## Trace failures back to the step that caused them

A useful trace follows context assembly, retrieval, model calls, tool execution, validation, and artifact creation. These operations map naturally to parent and child spans in the [OpenTelemetry trace model](https://opentelemetry.io/docs/concepts/signals/traces/).

For a synthetic comparison run, the structure might be:

```text
run: comparison-example
  context.assemble       document_version=v3, skill_version=s2
  retrieval.search       candidates=8, selected=3
  model.propose          model=<recorded ID>, attempt=1
  evidence.validate      unresolved_refs=1
  model.repair           attempt=2
  artifact.create        status=awaiting_review
```

This is a trace shape, not a captured execution. Record actual durations, token usage, charges where available, and failures at each stage. Source handles and hashes can support debugging without copying every document into general-purpose telemetry; access to any retained sensitive payloads needs its own controls.

The trace should let an engineer locate the failing boundary. If retrieval returned the right source but the proposal ignored it, changing the search index may not help. If validation passed but the citation disappeared in the rendered artifact, the failure is downstream of generation. Observable execution data makes those distinctions possible without claiming access to hidden model reasoning.

## Re-evaluate the workflow when the model changes

A new model can change tool selection, clarification frequency, response structure, and repair behavior even when the prompt stays fixed. Evaluate it through the same harness before concluding that the workflow improved.

Start with one changed variable where practical: model, retrieval strategy, skill, or tool interface. Compare held-out outcomes, then inspect the traces behind regressions. Remove instructions that no longer serve a demonstrated purpose instead of accumulating compatibility prompts around every model generation.

Return to the sentence about operating costs. A better model may avoid that mistake more often. The application still needs to show the source, expose the difference between an expectation and a result, and give the reviewer control over the proposed edit. That is the standard the harness and its evaluations should make visible.
