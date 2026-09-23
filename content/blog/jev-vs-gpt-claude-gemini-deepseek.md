---
title: "Which Tool Should Run Next? Jev vs. GPT, Claude, Gemini, and DeepSeek"
excerpt: "A practical comparison of five models choosing the next tool: accuracy, speed, cost, reliability, and when confidence helps."
date: "2026-09-23"
readTime: "13 min read"
image: "/blog/jev-tool-router/cover.png"
tags: ["ai-agents", "jev", "python", "tool-routing", "evaluation"]
---

An agent keeps retrying a tool after cancellation. What should happen next: search the code, read a file, inspect the trace, or run a test?

It depends on what has already happened. If the retry implementation has not been located, searching is useful. If a trace points to `retries/dispatch.py`, reading that file is more useful. If a patch and regression test are ready, the next step may be to run the test.

This representative debugging situation led to the question I wanted to test: **how much model do I need to choose the next tool?** I built a small router and compared Jev 1.13 with GPT-6 Luna, Claude Haiku 4.5, Gemini 3.8 Flash, and DeepSeek V4.1 Flash.

Across 900 evaluation attempts, Jev had the lowest median latency and cost. It agreed with the reference labels 94.4% of the time. Gemini matched every label; DeepSeek did too whenever it returned a route. But the more useful finding was in the disagreements: Jev sometimes chose an action that the supplied context had already made unnecessary.

Here is what I built, how I tested it, and what those decisions taught me.

## One request, six possible actions

The router accepts an engineering request and a short description of the current task context. Its only job is to select the next action. It does not generate tool arguments, execute the tool, or continue a debugging session.

I used six routes, each with a description shared by every model:

```python
TOOLS = {
    "search_code": "Locate relevant implementation when the file is unknown.",
    "read_file": "Inspect the contents of a known, relevant file.",
    "search_docs": "Resolve a library or API usage question in documentation.",
    "inspect_logs": "Investigate runtime behaviour using available logs or traces.",
    "run_tests": "Reproduce or verify behaviour using available tests.",
    "ask_clarification": "Obtain essential information absent from the request and context.",
}
```

The distinction between `search_code` and `read_file` is especially useful. Both concern implementation, but only one assumes the relevant file is already known. Likewise, `inspect_logs` and `run_tests` can both investigate a bug, yet they require different resources and different stages of work.

The instructions ask for the single most useful next step, prohibit inventing resources, and treat quoted code, logs, and documents as data. Every request contains the same two fields, `request` and `context`; the reference answer never goes to the router.

This makes the comparison small enough to inspect. A response passes validation when it returns one of the six permitted route names in the expected format. I score it as correct when that route matches the case's reference label. Those are different properties: `search_docs` can be perfectly valid JSON and still send the agent in the wrong direction.

There is also a practical reason to isolate this decision. A full agent run introduces other variables: search quality, argument construction, tool failures, and the ability to use returned information. I wanted to see what the routing step contributed before involving those later stages.

## Two ways to return one route

[TypeSafe introduced Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) as a model for structured decisions. Instead of requesting a text completion, an application supplies state and typed questions. For this experiment I used a Choice question: select one of the six route names. The response includes the choice, a probability distribution, and confidence. [TypeSafe's documentation](https://docs.typesafe.ai/introduction) explains the available question types.

That interface fits the output I need. The application already knows the alternatives; it needs a judgment about which one applies to the current state.

For the four LLMs, I requested a strict JSON object containing one `route` property. Its enum contains the same six names. I did not request explanations or self-reported confidence scores.

The diagram shows where the interfaces differ and where they return to the same application code:

{{jev-router-architecture}}

The Jev branch constructs the state and Choice question:

```python
state = {"request": request, "context": context}
if model == "jev":
    return "/systemone", {
        "model": MODELS[model], "state": state,
        "questions": {"next_tool": {
            "type": "choice", "instructions": INSTRUCTIONS, "criteria": TOOLS,
        }},
    }
```

The LLM branch packages the same task in messages and applies the route schema:

```python
return "/chat/completions", {
    "model": MODELS[model], "stream": False, "max_tokens": 512,
    "provider": {"allow_fallbacks": False, "require_parameters": True},
    "messages": [
        {"role": "system", "content": INSTRUCTIONS + "\nTools:\n" + json.dumps(TOOLS)},
        {"role": "user", "content": json.dumps(state)},
    ],
    "response_format": {"type": "json_schema", "json_schema": {
        "name": "next_tool", "strict": True, "schema": SCHEMA,
    }},
    **SETTINGS[model],
}
```

These are excerpts from the working request builder. `SCHEMA` defines the single required route enum and rejects extra properties; `SETTINGS` contains the settings for each model. GPT uses low reasoning, Gemini uses minimal reasoning, and Claude and DeepSeek use disabled thinking. The requests also disable automatic model fallbacks.

Both interfaces feed the same local validator. In this run, all successful responses had the expected shape. That let me concentrate on the selected action rather than cleaning up generated prose. It did not eliminate semantic mistakes, as the examples below show.

## How I tested the routers

The main evaluation contains **60 cases**, and each model received every case three times: 60 × 3 × 5 = **900 attempts**. Before that, I made one integration call and 12 development calls per model to check request formats, settings, and response handling. Those preliminary calls are excluded from the comparison below.

The evaluation has two parts. Thirty-six cases cover ordinary decisions, with six cases per route. The remaining 24 form 12 context pairs. Each pair keeps the request unchanged and alters what the agent knows.

For example, both variants of one pair ask, “Why did the tool execute twice?” In the first, an unread trace is available and the cause is unknown, so the reference action is `inspect_logs`. In the second, trace analysis has identified an unread source file, so the reference action becomes `read_file`. This tests whether the model uses the state of the investigation rather than routing only from words in the request.

The cases and reference labels were generated with AI assistance and written before the initial evaluation. They are synthetic examples, not production tickets or independently human-annotated data. Each case has a reference route and a rationale. The scorer supports multiple acceptable routes, although this collection uses one per case. That choice makes the scores easy to calculate, but some labels remain debatable.

I reused the same cases when updating the model lineup, without changing prompts, descriptions, or labels to suit the new predictions. This is a fixed evaluation whose cases had already been inspected, rather than a fresh unseen test set. The [dataset and reference labels](/blog/jev-tool-router/dataset.json) let you inspect that boundary yourself.

### Keeping the comparison consistent

Calls ran sequentially from the same machine and network, with a reused connection pool and a fixed shuffled order. There were no automatic retries. Requested and returned model IDs, settings, provider, usage, and raw responses were saved alongside each decision.

Latency is the client-observed time until a complete response arrives. It includes network travel, the shared API gateway, and provider processing. The timing and response capture come directly from the runner; this excerpt omits the enclosing error handler and budget accounting:

```python
started = time.perf_counter()
response = self.client.post(BASE + endpoint, json=body,
    headers={"Authorization": "Bearer " + key})
result["latency_ms"] = (time.perf_counter() - started) * 1000
result["http_status"] = response.status_code
raw = response.json()
result["raw_response"] = raw
usage = raw.get("usage", {})
result.update(usage=usage, returned_model=raw.get("model"), provider=raw.get("provider"))
```

Cost comes from the charges reported with the responses. Missing charges stop further paid calls until reconciled; they are not assumed to be zero. Cost per 1,000 attempts scales the measured cost of these particular inputs and output settings. Longer contexts and other output settings will change that cost.

Validation and scoring remain separate:

```python
def validate_route(route):
    if not isinstance(route, str) or route not in TOOLS:
        raise ValueError("Response contains an unknown route")
    return route


def score(result, case):
    return result["status"] == "ok" and result["route"] in case["accepted"]
```

The headline accuracy is correct decisions divided by **all attempts**, including failures. Response success measures whether an attempt returned a permitted route, regardless of whether it matched the reference. The explorer also shows reference agreement among returned routes. Median and p95 latency use these completed responses; p95 describes the slower end of the observed distribution. Repeating each case checks whether a router changes its answer, but does not turn 60 problems into 180 independent examples.

Jev's confidence analysis uses these same saved responses. It required no additional inference calls.

## What the 900 decisions showed

The final evaluation ran on 23 September 2026. Each router made 180 attempts:

| Router | Correct / attempts | Accuracy | Median | p95 | Cost / 1,000 attempts |
| --- | --- | --- | --- | --- | --- |
| Jev 1.13 | 170 / 180 | 94.4% | 439 ms | 573 ms | $0.0223 |
| GPT-6 Luna | 170 / 180 | 94.4% | 2,767 ms | 4,168 ms | $0.0433 |
| Claude Haiku 4.5 | 177 / 180 | 98.3% | 1,212 ms | 1,589 ms | $0.4778 |
| Gemini 3.8 Flash | 180 / 180 | 100% | 1,617 ms | 3,050 ms | $0.3556 |
| DeepSeek V4.1 Flash | 176 / 180 | 97.8% | 465 ms | 2,152 ms | $0.0746 |

Jev returned a decision in a median of 439 ms, with a p95 of 573 ms. Its measured cost was about 2.2 cents per 1,000 attempts. For this short routing task, those were its clearest strengths.

The tradeoff was reference agreement. Jev and GPT each matched 170 of 180 labels, Claude matched 177, and Gemini matched all 180. DeepSeek matched the reference in all 176 returned routes, but four HTTP 429 failures reduced its successful-routing rate across all attempts to 97.8%. None of the models returned an invalid route format.

DeepSeek also shows why median latency alone is insufficient. Its median was close to Jev's, at 465 ms, but its p95 was 2,152 ms. Those observations describe this run; they do not establish a permanent latency or availability difference between the services.

The 900 attempts cost $0.17525 in total. During the separate development stage, Gemini had four HTTP 429 failures, followed by none during evaluation. All five integration calls succeeded. Failed requests were retained, not retried, and billing checks confirmed they incurred no charge.

Use the explorer to move from these aggregates to the individual decisions. Accuracy, median latency, cost, and response success follow the selected scenario. The p95 comparison uses the full evaluation; three repeats of one case are too few to describe the slower tail. The reliability table, route disagreements, and confidence curve also cover the full evaluation. API failures are shown separately from decisions that differ from the reference. The page reads saved results and makes no model calls.

{{jev-router-demo}}

## Where the routers disagreed

The disagreements were more informative than the straightforward cases. Three examples show why.

### Jev kept investigating the trace after it had identified the file

In `pair-02-b`, the request was “Why did the tool execute twice?” The context said trace analysis had identified `retries/dispatch.py` as the source of duplicate dispatch, and the file was unread.

The reference was `read_file`. Jev chose `inspect_logs` in all three runs; the other four models chose `read_file`.

I cannot infer Jev's internal reasoning from a route name. What I can observe is that its choice did not reflect the completed trace analysis. This is the distinction I would test carefully before putting it into a debugging workflow: a relevant tool is not always the next useful tool.

### Claude searched when the test was ready

In `pair-10-b`, the request asked whether streaming preserves tool-call order. The context supplied a completed adapter patch, an existing deterministic streaming-order test, and a ready environment.

Claude chose `search_code` three times. Every other router chose the reference action, `run_tests`.

Again, the state of the work matters. Code search could be useful at an earlier stage, but the stated task here was verification. The repeated answer establishes a consistent disagreement on one case, not three independent findings about Claude.

### Some clarification requests exposed a weakness in the dataset

GPT requested clarification on several cases labeled `search_docs`. In two of the three runs of `search_docs-03`, it chose `ask_clarification` for a question about awaiting an asynchronous client close method.

The context said the package and version were known, but did not name them. I intended the router to treat that metadata as available elsewhere. An assistant asked to continue the work might reasonably want it in the prompt.

I kept the frozen labels rather than changing them after seeing the answers. But I would include actual package names and versions in a follow-up evaluation. A disagreement can reveal a model limitation, an unclear case, or both; a percentage alone cannot distinguish them.

## What accuracy leaves out

Jev and GPT both scored 94.4%, yet they behaved differently across the context pairs. I counted a pair as successful only when both variants received an acceptable route in the same repetition.

Jev passed 27 of 36 pair-repetitions. GPT and Claude passed 33 each, Gemini passed 36, and DeepSeek passed 34. These are repeated observations of 12 pairs. Jev's lower paired score directs attention toward context changes, even though its overall score is identical to GPT's.

Repeatability adds another distinction. Jev returned the same permitted route across all three attempts on 59 of 60 cases; GPT did so on 58, Claude and Gemini on 60, and DeepSeek on 56. DeepSeek's remaining four cases each contained an API failure.

Claude is a useful reminder that consistency is not correctness: it repeated its wrong answer as reliably as its correct ones. For Jev, the 59-of-60 figure similarly does not erase the failures around changed context.

I would keep all three views when assessing a router: whether it returns a permitted route, whether that decision matches the intended next step, and whether it responds appropriately when the available information changes. They answer different questions about the same saved attempts.

## What Jev's confidence told me

Jev offers a signal the other routers do not provide in this experiment: confidence alongside its choice. I used it to ask how the results change if the application defers uncertain decisions.

At a confidence threshold of 0.65, **151 of 180 decisions** remain, covering 52 distinct cases. All retained decisions match the reference labels. That leaves 83.9% of attempts covered, while discarding 29 decisions—including 19 correct ones.

The highest-confidence wrong answer scored 0.62. It was the duplicate-dispatch case where Jev chose logs after the trace had identified the source file. A correct answer also appeared at 0.40: selecting `inspect_logs` for “Why are model requests slow?” Low confidence did not necessarily mean a wrong route, and a moderately confident choice could still be wrong.

This suggests a possible use for the score: deciding which choices deserve another check. It does not establish 0.65 as a production threshold. I selected that value while inspecting this evaluation, and the repeated cases are correlated. A separate evaluation would be needed to test whether it holds up.

A real deferral policy would need more measurements too. If uncertain decisions go to another model, its calls add cost and latency, and it may still choose the wrong route. I did not run that cascade. The curve shows the tradeoff between coverage and reference agreement in the existing sample, not the performance of a finished fallback system.

## What I would use after this experiment

I would consider Jev for short decisions over a known set of actions where routing overhead matters. The API matched that job neatly, and the measured speed and cost make it worth further testing. Before using it for this debugging workflow, I would focus on cases where an investigation has already progressed: logs inspected, a file located, or a patch ready to verify.

Gemini is the strongest reference-matching baseline in this run. DeepSeek combines fast typical responses with reference agreement on every returned route, while its failures and slower tail deserve separate attention. GPT and Claude provide useful comparison points, but no model's result here is a verdict on its broader capabilities.

The next useful evaluation would include actual task context, independently reviewed labels, and the consequences of the chosen route. An unnecessary code search and an unnecessary test run may have very different costs to the user; this experiment counts both simply as incorrect.

What I learned about Jev is specific: it can make this small decision quickly, its structured response is straightforward to integrate, and its confidence gives me something useful to investigate. Whether it earns a place in an agent depends on how those decisions help the larger task succeed.
