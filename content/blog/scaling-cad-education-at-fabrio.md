---
title: "My Journey Building Fabrio: From First Engineering Hire to Serving World-Class Universities"
excerpt: "My personal journey as the first engineering hire at Fabrio, rebuilding the platform from scratch and scaling it to serve prestigious institutions like UCL and Imperial College London."
date: "2025-4-20"
readTime: "12 min read"
image: "https://res.cloudinary.com/ibrahimshittu/image/upload/v1754483726/ibrahim-shittu-portfolio/scaling-cad-education-at-fabrio.png"
tags:
  [
    "Education Tech",
    "Startup",
    "CAD",
    "Career",
    "Engineering",
    "Personal Journey",
  ]
---

Looking back at my time as the first engineering hire at Fabrio, I'm amazed at how far we've come. What started as a bold vision to revolutionize CAD education became a platform trusted by world-renowned institutions like University College London (UCL) and Imperial College London, and has expanded to serve educational institutions across the globe, from universities in the United States, Europe and Asia to innovative programs like F1 in Schools that inspire the next generation of engineers worldwide. This is the story of my journey, the challenges we faced, and the lessons I learned building a product that truly transforms how engineering students learn across continents.

## How I Joined Fabrio

I discovered Fabrio through a job posting that immediately caught my attention. But when I read about their mission to revolutionize Computer-Aided Design (CAD) education, I knew this wasn't just another job opportunity, this was something I had to be part of. Coming from my civil engineering background, I understood firsthand how crucial CAD skills are for engineers, and how outdated most educational approaches were.

I didn't just apply once and wait. I was so excited about the opportunity that I took a multi-channel approach: I filled out the application on the job board where I first found it, then headed to LinkedIn to research the company more deeply. After learning more about their vision, I messaged the CEO, Jay, directly on LinkedIn, sent a follow-up email, and also completed the application form they'd shared on their LinkedIn page. Some might call it overkill, but when you find a company whose mission resonates with your core beliefs about education and technology, you don't leave anything to chance.

The opportunity to join a very early-stage startup that had just raised pre-seed funding as the first engineering hire was both exciting and daunting. There was a minimal proof-of-concept that needed to become a real product, no established patterns, no engineering culture - everything had to be built from scratch. We were starting from absolute zero with very tight deadlines to meet and every technical decision needed to happen fast. The pressure was immense, we had potential university clients waiting and investor milestones to hit. But that's exactly what made it great. The chance to shape the entire technical foundation and engineering culture of something transformative from day one, under real market pressure, was an opportunity most engineers never get.

## Building the Plane While Flying

When I joined Fabrio, the challenge was laid out: we had 120 days to completely rebuild the platform before our first major pilot. The existing proof-of-concept had shown the vision was possible, but we needed production-ready software that could serve thousands of students reliably.

#### The 120-Day Sprint

The scope was overwhelming. We needed to build an entire CAD education platform - from user authentication to content delivery, from real-time collaboration to automated assessments. Every single component needed to be built with scalability and reliability in mind. While we stuck with part of the tech stack from the proof-of-concept, we built out a comprehensive AWS architecture: Cognito for authentication, AppSync for our GraphQL API, Lambda functions for business logic, EventBridge for cron jobs and scheduled tasks, DynamoDB for data storage, S3 for file handling, and deployed on AWS Amplify. The biggest gamble? Going all-in on AWS serverless architecture.

#### The Learning Curve Was Vertical

But here's what made it even more challenging: I'd worked with AWS before, but AppSync was entirely new territory. The first week, I spent more time reading AWS documentation than writing code. GraphQL subscriptions for real-time updates? Had to figure it out. VTL resolvers? Learned them on the fly. DynamoDB single-table design? Deep dives into documentation and tutorials until the early hours. There's no course that prepares you for learning an entire ecosystem while building production software simultaneously.

I developed a philosophy: build it right enough. Not perfect, but solid. Not hacky, but pragmatic. Every component had to work today but be ready to scale tomorrow. This philosophy guided every decision.

Some pragmatic choices that saved us:

- Used managed services wherever possible instead of building from scratch
- Chose boring, proven patterns over cutting-edge solutions
- Documented decisions, not code - why mattered more than how

### Reinforcements Arrive

About six weeks in, I got the best news possible: we were bringing on another engineer. When Evander (Ev) joined, everything changed. Suddenly I wasn't carrying the entire technical weight alone. We could divide and conquer, review each other's code, and bounce ideas off each other at 9 PM when we hit a wall.

Ev brought fresh energy and different perspectives. While I focused on the core platform architecture and backend systems, Ev was floating between the Fusion plug-in and the platform. We developed a rhythm - frequent sync-ups, shared documentation, and a simple rule: if you're stuck for more than 30 minutes, ask for help.

Working with Ev taught me that even in the most intense sprints, investing time in knowledge transfer pays off. Those hours I spent walking Ev through the codebase and architecture decisions came back tenfold in productivity. We could now parallelize work, and more importantly, we had someone to sanity-check decisions when exhaustion clouded judgment. From that point, the team kept growing, what started as just me coding alone in those first weeks evolved into a diverse engineering team.

### The Jay Effect

Here's the thing about Jay, he could sell ice to penguins and that wasn't what made him great. Jay genuinely cared about transforming education, that passion was infectious. When you have a CEO who truly believes in the mission, it makes those long nights feel worthwhile. The only catch? His enthusiasm meant our backlogs grew faster than we could code, but hey, at least we were never bored!

"Oh, and I told them we'd have real-time collaboration in X weeks" Jay would casually mention during standup, while Ev and I exchanged smiles that roughly translated to "he said WHAT now?"

My favorite was when Jay started selling CAD Assist, a feature that existed more in his imagination than in our codebase. Ev and Rob had to work their magic, building something from basically nothing was both terrifying and incredible.

Eventually, we had to sit down and figure out better communication. It wasn't really an intervention, more like a reality check for all of us. We needed to get better at setting realistic timelines and make sure engineering priorities aligned with business needs.

We started having regular alignment meetings where Jay and Ani would share everything - what clients were asking for, upcoming investor meetings, company-wide updates, the whole picture. It was a huge improvement. Instead of panic, we had productive discussions about trade-offs and priorities.

### Building With Brilliant Misfits

Looking back, I realize that the initial team at a startup doesn't just build the product - they become the company's DNA. Every early hire brings their quirks, their work style, their values, and somehow it all melds into this unique culture that defines everything that comes after. At Fabrio, we had this incredible mix of academics, visionaries, and builders who somehow made magic happen.

#### Ani - More Than a COO

Anirudh (Ani) was our COO and Head of Product, but those titles don't capture what he meant to the team. Ani was the bridge between our wants and reality, turning wishlist items into our goals without losing the core value. He's a superstar!

What I appreciated most about Ani was how he looked out for people. When the pressure was crushing, he'd check in - not just about deadlines, but about how we were doing as humans. For an engineer navigating the chaos of an early-stage startup, having someone like Ani in your corner made all the difference.

#### The PhD Duo: Rob and Fabio

Then there were Dr. Rob and Fabio, two PhD holders who chose the startup grind over academia. They were building Fabrio's Fusion plug-in, which was essentially the bridge between our platform and the actual CAD software students used.

The mix of their theoretical depth with our practical urgency created this perfect balance. We'd learn from their systematic approach, and they'd adapt to our "ship it now, perfect it later" mentality. It was symbiotic in the best way.

#### The Culture We Built

The culture was defined by mutual respect, shared ownership, and this understanding that we were all in it together. When someone had a win, we all celebrated. When someone made a mistake, we learned from it together.

That's the thing about early-stage startups, the team isn't just important, it's everything. The first ten people you hire will determine whether your company becomes a place where people do their best work or just another job. We were lucky. We had people who cared about the product, about the mission, and about each other.

## Serving World-Class Institutions

### The UCL Breakthrough

UCL's engineering professors were overwhelmed, imagine marking over 2000 individual CAD files every semester, with students anxiously waiting weeks for feedback. We solved this by directly integrating into Autodesk's Fusion, providing instant automated assessment that saved professors hundreds of marking hours.

**The engineering challenge was intense**: we had to ensure our add-in could handle thousands of concurrent users during submission deadlines, handle thousands of 3D models being rendered and accessed simultaneously, sync massive amounts of data across the backend, web dashboard, and Fusion add-in in real-time, and give professors live visibility into student progress through their dashboard. All of this while maintaining sub-second response times during peak submission deadlines when thousands of students were working concurrently.

Working around the clock to meet UCL's semester start deadline, we delivered a platform that transformed how their students learned CAD - from waiting weeks for grades to getting instant feedback at every checkpoint. Having UCL trust us with their engineering program changed everything. We went from "who's Fabrio?" to "the platform trusted by UCL."

### From UCL to Global Expansion

Imperial College London came next, bringing its own mix of challenges and opportunities. From there, we rapidly expanded - serving universities like the University of Surrey and the University of Birmingham in the UK, and eventually served over a hundred educational institutions across the UK, Italy, USA, and Hong Kong.

One of our biggest wins came when we scaled to serve the US's Co-op Academies Trust with their 34 schools and thousands of students. Our platform helped standardize CAD teaching across all their schools, giving teachers the confidence they needed and enabling students to complete independent projects that exceeded expectations.

We also established a pioneering partnership with Autodesk, the world's largest CAD provider, which validated our approach to transforming CAD education. Our reach extended beyond traditional classrooms. The team presented at Autodesk University, showcasing our platform to industry leaders. We also presented at F1 in Schools at Silverstone, connecting with the next generation of engineers competing in one of the world's largest STEM competitions.

What started as a scramble to meet UCL's requirements evolved into something much bigger than any of us imagined. We weren't just building software anymore, we were transforming engineering education. Every late night, and every "impossible" deadline - it all led to thousands of students learning CAD more effectively and thousands of teachers reclaiming their time for what matters most: actually teaching. That's the kind of impact that makes startup chaos worth it.

## The Hard-Won Wisdom: What I Learned Building at Warp Speed

### The Evolution From Coder to Builder

When you're the first engineering hire, job titles become meaningless. One moment I'm architecting a serverless infrastructure, the next I'm debugging why a student's 3D model won't render at 2 AM because their assignment is due at 8 AM. I went from writing code in isolation to being the person professors called directly when something went wrong during exams.

This wasn't just career growth - it was career transformation. I learned that being a great engineer isn't about writing perfect code; it's about understanding the human problems behind the technical challenges. When a professor tells you they're spending 40 hours a week marking assignments, your job isn't to build a faster upload system - it's to reimagine the entire assessment workflow.

**Ship Fast, But Never Broken**: In startup land, everyone preaches "move fast and break things." But when your "things" are student grades and university assessments, breaking isn't an option. We learned to ship at startup speed while maintaining enterprise reliability. It's possible, but it requires a different mindset - every shortcut you take has to be deliberate, documented, and fixable.

**Your Users Aren't Who You Think They Are**: We thought we were building for students. Then we realized we were building for professors. Then we discovered we were actually building for entire institutions. Each level brought different requirements, different politics, and different definitions of success. The lesson? Always dig deeper into who's really using your product and why.

**The Best Code is Code You Don't Write**: We integrated with Autodesk's tools instead of building our own CAD viewer. We used AWS managed services instead of running our own infrastructure. Every line of code you don't write is a line you don't have to maintain, debug, or explain to the next engineer.

### The Mindset Shift

The biggest change wasn't in my technical skills - it was in how I approach problems. Before Fabrio, I optimized for elegant code. After Fabrio, I optimize for impact. Before, I built features. After, I solve problems. Before, I was an engineer. After, I became a builder.

This shift is subtle but profound. When Jay would come with his latest "small request" that would require rewriting half the codebase, instead of explaining why it was technically impossible, I learned to ask: "What problem are we trying to solve?" Often, there was a simpler solution that gave 90% of the value with 10% of the effort.

### What This Journey Taught Me About Startups

Joining a startup as the first engineering hire isn't just a job - it's choosing to tie your success directly to the company's success. There's no hiding behind process, no blaming other teams, no "that's not my department." Everything is your department.

But here's what they don't tell you: that total ownership, that pressure, that chaos - it's addictive. Once you've built something from nothing, once you've seen your code impact thousands of students, once you've transformed an industry workflow - regular jobs feel like playing with training wheels.

Would I do it again? Without hesitation. But maybe with better documentation this time.

## The Impact

### On Students

Seeing thousands of engineering students learn CAD more effectively was incredibly rewarding. We received emails from students who said our platform helped them grasp concepts they'd struggled with for months.

### On Educators

Professors could focus on teaching design principles instead of software mechanics. Our automated assessment tools gave them insights into student understanding they'd never had before.

### On My Career

Fabrio transformed me from a developer into a technical leader. The experience of building something from scratch, scaling it globally, and seeing it make a real difference in education was career-defining.

## Looking Forward

### What's Next for EdTech

The future of engineering education lies in personalized learning paths, AI tutoring, and immersive experiences. Fabrio laid the groundwork, but there's so much more to build.

### Advice for Early-Stage Engineers

If you're considering joining an early-stage startup:

**Choose Your Domain Carefully**: Pick something you're passionate about. You'll be living and breathing it for years.

**Embrace the Chaos**: Early-stage startups are messy. That's where the best learning happens.

**Build for Tomorrow**: Every technical decision compounds. Think about where you'll be in 2-3 years.

**Find Great Co-founders**: The people you work with matter more than the technology stack.

## Final Thoughts

Building Fabrio from the ground up was one of the most challenging and rewarding experiences of my career. From that first line of code to serving students at UCL and Imperial College London, every day brought new problems to solve and opportunities to make education better.

The combination of cutting-edge technology and meaningful impact on education created something special. It taught me that the best products don't just solve technical problems - they solve human problems.

_What challenges are you facing in EdTech or early-stage product development? I'd love to share more specific insights about building scalable educational platforms._
