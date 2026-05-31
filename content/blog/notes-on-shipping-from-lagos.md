---
title: "Notes on shipping from Lagos"
excerpt: "Notes on competing at the frontier from the other side of the map. The hours, the standards, the craft — built from a desk most of my collaborators have never seen."
date: "2026-04-19"
readTime: "14 min read"
tags:
  - Career
  - Engineering
  - Personal Journey
  - Startup
  - Lagos
  - Shipping
---

In the last eight years, my code has processed mobile payments in Northern Nigeria, graded CAD work at UCL and Imperial College London, carried a pandemic-era edtech across Nigerian universities, and — as of this year — driven the AI agents that prep SEC filings out of San Francisco.

I've done all of that from Lagos.

Today's calendar: a design review with London at 2pm, docs written for a collaborator in New York that he'll open before I wake, a 6pm product call with the team in SF. A normal Tuesday.

This post is about what it took to get here. The hours, the standards, the craft — built from a desk most of the people I work with have never seen. Fifteen notes on competing at the frontier from the other side of the map.

## 1. You compete with the best, not the nearest.

My reference set was never other engineers in Lagos. It was whoever wrote the libraries I imported.

That wasn't ambition for its own sake. It was arithmetic. If I wanted to work with Imperial College London or a team in SF, my code had to clear _their_ bar — not the bar of the friend two tables over at the co-working space. The day I understood that, I stopped comparing myself to the nearest engineer and started comparing myself to the best engineer I could name.

The practical version: I don't trust myself to use a tool I can't explain the design of. Before I wrote a line of production LangGraph at Finiti, I spent a week reading the graph executor's source. Before I shipped Fabrio's grading engine on AWS AppSync, I read the VTL runtime end to end — twice, because the first pass didn't stick.

That isn't optional. If you want to compete globally, you have to be honest about the gap between you and the best person in your field. Then you close it. Then you do it again with the next gap.

Lagos didn't make that harder. Lagos made it mandatory. There was no senior engineer down the hall to carry the slack.

## 2. Proof of work before permission.

Nobody in London or SF was going to discover me by accident.

Every opportunity I've taken came from something I'd already built — side projects someone could actually run, open PRs with my name on them, blog posts that showed how I think, LinkedIn messages that landed because the work attached to them spoke louder than the pitch.

Fabrio happened because I could point to code. When I messaged the CEO on LinkedIn, I wasn't asking to be considered — I was showing what I'd already done. The email, the follow-up, the application form I filled out three different ways weren't desperation. They were a signal: I'd move mountains to do this work, and here's the proof I already can.

Finiti happened the same way. By the time I showed up, I'd published on legal-tech AI, shipped a multi-agent test framework as a side project, and written more about LangGraph than most of the people hiring for it. The work was the resume.

The pattern is simple: wherever you live, the internet is your hallway. Ship things in public — code, posts, demos, anything that runs — and the doors start opening on their own. If you're waiting to be found, you're not competing.

## 3. Relationships are the compounding asset.

Every job I've had came from someone who believed in me before there was evidence. Not from the CV alone. Not from a cold application. From a relationship.

Jay at Fabrio gave me a founding-engineer role on the strength of a few LinkedIn exchanges and an instinct that I'd show up. The Finiti opportunity started because someone I'd worked with at LiveClasses remembered me six years later. The Crust role came through a referral from an engineer I'd helped debug a React Native issue one weekend, for free, because he'd asked nicely.

This isn't a networking strategy. Real relationships compound because you actually care about the other person — not because you're tracking what they can do for you. I've spent hours helping engineers in Lagos get their first overseas roles because I remember being them. I've written unpaid reference letters, jumped on calls, reviewed side projects that had no bearing on my own work. None of it was strategic. All of it came back.

Across distance, relationships matter even more. You don't get to see someone in the office, so the memory has to hold. People remember if you were generous when you had nothing to gain. They also remember if you weren't.

The best thing I did in my first five years of coding was treat every interaction as a long game. Every engineer I helped, every founder I introduced, every PR I reviewed for someone who didn't owe me anything — those are the people who opened doors a decade later. They still do.

Build relationships, not contacts. The difference is everything.

## 4. Learning at the speed of light.

I did a civil engineering degree. My first "production" code was a spreadsheet of VBA macros for structural load calculations. Every line of software I've written since has been self-taught.

That sounds romantic. It isn't. It's years of reading docs in bad light, writing code that didn't work, refactoring code that did, and shipping anyway because the deadline didn't care about my learning curve.

When I joined Fabrio, I'd worked with AWS before, but AppSync was new. GraphQL subscriptions for real-time updates? VTL resolvers? DynamoDB single-table design? I learned them at the pace the product needed — not the pace the textbook recommended. First week, I read more AWS docs than I wrote code. By month three, I was explaining them to the next engineer.

Same pattern at Finiti this year. LangGraph, Pydantic AI, evaluation over millions of SEC filings — none of it was in my head the day I signed. All of it is in my muscle memory now.

The frontier tools aren't gated by geography. They're gated by attention. What Lagos teaches you is that there's no one coming to teach you: you open the docs, you read until something clicks, you build the smallest thing that works, you ship it. Then you do it again.

## 5. I said yes to scope I wasn't ready for.

Every serious step in my career came from agreeing to something that scared me.

At Fabrio, I said yes to rebuilding the platform end-to-end in 120 days before our first university pilot. I had never led a rebuild. I had never written a line of AppSync. I said yes anyway, because the alternative was waiting until I felt "ready" — a feeling that, in my experience, doesn't arrive.

At Finiti, I said yes to owning the agent layer before I'd shipped a production LangGraph graph. At LiveClasses before that, yes to being the only engineer through our first ten thousand users. At Crust, yes to a React Native codebase I'd never written a line of when the offer came.

The work rises to meet you if you let it. What made the difference wasn't talent — it was the willingness to spend the next ninety days getting uncomfortable in public. Readiness is the reward for doing the thing, not a prerequisite.

The engineers I trust most all share this. They take on scope that looks slightly too big, and then they grow into it. That is how a career compounds. Saying no is safe. Saying yes is how you end up somewhere you couldn't have mapped in advance.

## 6. Every role is a founding role.

If "that's not my department" is on your lips, you're in the wrong role.

I've never had a job where the boundaries were clean. At LiveClasses I wrote the frontend, the backend, the infra, the docs, and most of the product decisions. At Crust I was frontend lead on paper, but I debugged the payment reconciliation pipeline at 3am because the reconciliation engineer was asleep and customers couldn't send money.

At Fabrio the pattern continued. First engineering hire — which in startup terms means you are also the DevOps team, the QA team, the oncall rotation, the person writing the runbook at 4am because there is no runbook and no one else to write it. I didn't wait to be asked. The thing needed doing. I did it.

This quality travels. Global companies hiring into small teams are looking for people who treat ownership as the default — who move through the whole stack when the product needs them to, who don't defer to someone else's Jira ticket when something is broken in front of them.

Lagos teaches you this early, because the teams are small and the titles don't protect anyone. The discipline that made me useful at a YC-backed Nigerian bank is the same discipline that makes me useful at an SF capital-markets startup.

## 7. Obsession is the unfair advantage.

Most good engineers stop at "it works." The ones I want to hire keep going.

They reread the diff before pushing, even when no one is reviewing. They write the test they secretly don't need because the feature is trivial. They document the edge case nobody has hit yet, because nobody has hit it _yet_. They rename the variable after the PR is approved, because they know they'll read it in three months and the old name wouldn't have made sense.

I spend more hours on this than I should admit. I've refactored Finiti's retrieval pipeline three times since shipping it — not because it was broken, but because I could see a cleaner shape and I didn't want to live with a shape I knew was wrong. I've thrown away entire modules of Fabrio code two weeks after they landed, because a better pattern emerged and the cost of replacing it was less than the cost of living with it.

This is obsession, and it is free. Nobody charges extra for caring. But it compounds in a way raw talent doesn't: every pass raises the floor on what you think "done" means. After a few years, your ceiling is somebody else's unreachable standard.

The engineers I've watched out-compete brighter peers all had this. Without it, technique is just decoration.

## 8. The extra mile is the differentiator.

Everyone works. Very few go one step beyond.

The engineers I watch out-compete brighter peers don't do it with raw IQ. They do it with what I call the extra pass — the thing you do _after_ you've already done the work. You fixed the bug? Now write the test that would have caught it. You shipped the feature? Now write the doc for the teammate who'll maintain it next year. You wrote the PR? Now write a three-line summary of the trade-offs, not because anyone asked, but because your reviewer's time is also the company's time.

At Fabrio, the extra mile was showing up to a UCL demo with a working backup plan in case the primary stack failed. At Finiti, it's rereading the agent output log one more time before I call a session done. At Crust, it was testing the app on three more low-end devices than the spec required — because "testing on a Pixel" and "testing for our users" are not the same thing.

Most people stop at "good enough." The extra mile is the gap between good-enough and excellent — and the people you admire at global companies live in that gap. It's not talent. It's a choice, made every time, on every task.

That choice is the differentiator.

## 9. Find the 20% that moves the other 80%.

Not all effort is equal. Some of it compounds. Most of it doesn't.

The Pareto cut — 20% of the work producing 80% of the outcome — isn't a slogan. It's a real diagnostic you can run on any week. What are the two or three things I'm working on that actually move the product? What are the eight or ten things I'm doing that, if I stopped, nobody would notice for a month?

I run this honestly, often. At Finiti, 20% of the agent pipeline accounts for 80% of the user value — the retrieval layer and the planning loop. I put the majority of my attention there and let the rest coast. At Fabrio, 20% of the code paths handled 80% of student submissions at deadline peaks. I hardened those until they were boring, and left the rest alone.

The mistake most engineers make is to treat all the code equally. They spend the same care on the login screen as on the payments flow. They review the same way whether the change is a rename or a rewrite. Over a career, this is catastrophic leverage loss.

The 20% isn't obvious. You have to look for it. Ask: if I only did three things this week, which three matter? Then do those — really well — and ignore the rest until they start to matter.

Leverage is a learnable skill. It's the closest thing there is to a career cheat code.

## 10. Follow-through is the work.

The meeting ends. The Slack thread goes quiet. The document gets a thumbs-up emoji and then nothing happens.

For years I noticed that the person who made the next thing happen was the one who got credit — not the one with the best idea in the meeting. The bottleneck in most organizations is not thinking. It's finishing. Most ideas die between "that sounds great" and anyone actually doing it.

So I made follow-through my default. If I agreed in a meeting to ship a spec, the spec was in the shared drive by end of day. If I agreed to unblock someone, they were unblocked before the next standup. If I said I'd look into something, the answer showed up in their inbox within 24 hours — even if the answer was "I looked, here's what I found, here's what I still don't know."

This isn't glamorous. It's mostly writing things down, closing loops, and refusing to let momentum dissipate. But it's the quality that earns you trust across distance. When your collaborators are in different time zones and can't watch you work, the only signal they have is: did the thing you said you'd do actually happen, on time, without nagging?

That signal is everything. It's how you build a reputation across continents before anyone has met you in a room.

## 11. The long hours that didn't look like hours.

What looks like talent is usually accumulated time.

Early career, I read docs on the bus. I debugged in notebooks at 2am because the power was out and home was quieter anyway. Weekends weren't rest — they were the block of time where nobody needed me and I could go deeper on something I'd been chipping at during the week. I didn't frame it as suffering. It was the price of admission, and I was willing to pay it.

Some of this was necessity. A self-taught engineer in Lagos doesn't get a free CS degree worth of background; you make it up by outworking the gap. But most of it was compounding. Every hour I spent on something that didn't ship was still an hour on the clock of understanding, and that clock doesn't reset.

The weekends I spent dismantling other people's code — Stripe's SDK, Vercel's build output, early LangChain internals — are the reason I can read a new library in a day now. The 2am sessions on AppSync at Fabrio are why I shipped LangGraph at Finiti without panicking.

Hours aren't the whole game. But they're the table stakes. You don't get to "being the best" on inherited talent. You get there because you put in a decade of hours most people weren't willing to put in.

## 12. Standards are what you hold when nobody's watching.

Anyone can write good code when their senior is reviewing it.

The line between "senior" and everyone else is the code you write at 1am when nobody will look until morning. Whether the function still has a meaningful name. Whether the test was written. Whether the commit message would make sense to a stranger. Whether the edge case you spotted — and could have quietly ignored — got handled.

I've tried to hold this line for eight years. It costs more some days than others. But the work you do unsupervised is the work that _is_ you — everything else is performance. When the code gets merged and someone in another time zone opens it six months later, the only thing they see is what you did when nobody was watching.

That private standard is also the one that travels. Nobody at a remote company is standing behind your chair. Your codebase is your signature, and it shows up without you. If the standard you hold alone is lower than the standard of the team you want to join, the gap shows up on day one and compounds from there.

The bar you set when unwatched is your real bar. It's also the hardest to raise, because there's no external force raising it for you. That's on you.

## 13. Your calendar is your values.

How you spend Monday morning and Saturday night is the real signal.

Everyone has intentions. Most people's intentions evaporate the moment the calendar fills up — with meetings that didn't need to happen, Slack threads that pulled them off the work, a culture of _looking_ busy rather than being useful. I've watched more careers stall on calendar entropy than on lack of talent.

The correction is boring and unglamorous: guard the hours, all the time. I block deep-work sessions the way I block calls. I say no to recurring meetings that don't move anything. I kill my own standups the moment they stop being useful. At Finiti, the hours I've spent in meetings are a small fraction of the hours I've spent building — and that ratio is not accidental. It's the result of hundreds of small refusals.

Saturday night is the same. If you claim you want to compete globally but spend every weekend decompressing, the claim and the calendar don't match. At some point you have to pick. I picked early. The hours I put in on weekends aren't what I do after the real work. They _are_ the real work — the part of the week nobody can interrupt.

Your week is a receipt. Read it honestly.

## 14. Writing is how you cross borders.

If you want the world to find you, write something it can read.

Everything legible about me to someone in SF, London, or New York got there through text. Blog posts. LinkedIn essays. A Tribune feature that got republished because the narrative had shape. Tweets that landed because they were specific and earned. Every interview I've ever been invited to started with someone reading something I'd written.

This is doubly true from Lagos. I don't get the hallway conversations, the happy-hour introductions, the "my friend is hiring" grapevine that moves engineers around in SF and London. What I have is the internet. What I put on it is the entire surface area of me that most of my collaborators will ever see.

So I've treated writing as engineering work. I write to understand things — I couldn't explain a concept, so I wrote a post until I could. I write to leave a trail, so a year from now someone Googling a problem I've solved lands on my page instead of nobody's. I write to be legible across distance — because the alternative is to be invisible.

The piece you're reading is itself the claim. If you're shipping from somewhere the map calls "far," write. Not later, when you're "ready." Now. The writing is the room you walk into.

## 15. You don't need permission to start.

Waiting to be invited is the single most common reason careers don't compound.

Every piece of work that ever changed my trajectory, I started before anyone asked. Tunnel AI — the multi-agent testing framework I built last year — exists because I wanted to understand LangGraph deeply and nobody was paying me to. The blog posts that got me invited to judge LegalHack 2025 exist because I'd been publishing on legal tech for a year without a single commission. The rebuild proposal that shaped my first 120 days at Fabrio was a document I wrote on my own time, the weekend after I got the offer, because I wanted to show up on day one with a plan instead of waiting for one.

The pattern is universal. The people who shape their own careers are the ones who start things before they've been authorized. Write the doc nobody asked for. Ship the prototype the roadmap doesn't have. Open-source the tool you had to build for yourself. Draft the memo your manager was going to ask you to draft.

Nobody has ever said no to work that was already done. And the small signal of "this person moves before being pushed" is, in my experience, the strongest career asset you can build.

You don't need permission. You need a laptop and a Saturday.

## Close

Ten years ago I was a civil engineering student in Lagos writing VBA macros I didn't know would lead anywhere. I'm now writing AI agents for San Francisco from the same city, the same desk, more or less the same posture. What changed wasn't the location. It was everything else.

The notes above are what "everything else" actually was. Not a secret, not a hack. Just a decade of choosing the harder version of each day, holding a standard nobody in the room could see, and trusting that the work — if done well enough — would speak.

If you're shipping from somewhere the map calls "far": the distance is smaller than it looks. You close it one standard, one commit, one shipped thing at a time.

The postcode doesn't matter. The work does.
