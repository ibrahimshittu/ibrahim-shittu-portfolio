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

Ev brought fresh energy and different perspectives. While I focused on the core platform architecture and backend systems, Ev tackled the complex UI interactions and vice versa. We developed a rhythm - frequent sync-ups, shared documentation, and a simple rule: if you're stuck for more than 30 minutes, ask for help.

Working with Ev taught me that even in the most intense sprints, investing time in knowledge transfer pays off. Those hours I spent walking Ev through the codebase and architecture decisions came back tenfold in productivity. We could now parallelize work, and more importantly, we had someone to sanity-check decisions when exhaustion clouded judgment.

### The Jay Effect

Here's the thing about Jay, the man could sell ice to penguins. And honestly? That's exactly what you want in a startup CEO. The only catch? Every client call seemed to magically add three new "must-have" features to our backlog. Our feature list grew faster than we could code, but hey, at least we were never bored!

"Oh, and I told them we'd have real-time collaboration in X weeks" Jay would casually mention during standup, while Ev and I exchanged smiles that roughly translated to "he said WHAT now?"

My favorite was when Jay started selling CAD Assist, a feature that existed more in his imagination than in our codebase. He'd just put it out there like it was already live, talking about it with such confidence you'd think we'd been shipping it for months. Meanwhile, Ev and Dr. Rob had to work their magic, building something from basically nothing was both terrifying and incredible.

Eventually, we had to sit down and figure out better communication. It wasn't really an intervention, more like a reality check for all of us. We needed to get better at setting realistic timelines and managing expectations. The conversation helped us understand each other better: Jay learned to check with engineering before making commitments, and we learned to appreciate his vision while helping shape it into something achievable.

We started having regular alignment meetings where Jay and Ani would share everything - what clients were asking for, upcoming investor meetings, company-wide updates, the whole picture. We'd work together to figure out realistic timelines and make sure engineering priorities aligned with business needs. It wasn't perfect, but it was a huge improvement. Instead of panic, we had productive discussions about trade-offs and priorities.

### The Final Push

The last two weeks before launch were unlike anything I'd experienced. Jay had secured our first pilot university, and they were expecting a working platform for the new semester. No pressure.

The days blurred together. Morning stand-ups with Jay to align on priorities. Coding through lunch. Testing in the evenings. Pushing commits late at night. EV and I were practically living in Slack, sharing screens, debugging together, and keeping each other motivated. Weekends became just another two days to get closer to the deadline. It wasn't sustainable, but it wasn't meant to be. This was our one shot to prove Fabrio could deliver.

Critical decisions had to be made fast. Which features were truly essential for launch? What could we push to v1.1? We created a "launch blocker" label and ruthlessly prioritized. Everything else went into the backlog. Perfect became the enemy of good enough, and good enough was what would get us across the finish line.

## Serving World-Class Institutions

### The UCL Breakthrough

Landing University College London as one of our first major clients was a pivotal moment. UCL's engineering department had specific requirements:

- Integration with their existing learning management system
- Support for their unique assessment workflows
- Compliance with UK data protection regulations
- Scalability for thousands of concurrent users during exam periods

Working with UCL taught me the importance of understanding not just the technical requirements, but the educational context. We had to think like educators, not just engineers.

### Imperial College London and Beyond

Imperial College London brought different challenges. Their mechanical engineering program required:

- Advanced 3D modeling capabilities
- Real-time collaboration features for group projects
- Integration with industry-standard CAD tools
- Sophisticated assessment algorithms for complex geometric designs

Each institution taught us something new about the diverse needs in engineering education.

## Personal Growth and Career Lessons

### From Solo Developer to Technical Leader

Starting as the first engineering hire meant wearing every hat:

- **Architect**: Designing scalable systems
- **Developer**: Writing production code
- **DevOps Engineer**: Setting up CI/CD and monitoring
- **Product Manager**: Translating educational needs into technical requirements
- **Support Engineer**: Debugging issues for stressed students during exams

This experience taught me the value of T-shaped skills - being deep in one area while having broad knowledge across multiple domains.

### Building for Education vs. Consumer Products

Working in EdTech taught me unique lessons:

**Reliability is Non-Negotiable**: When students have assignment deadlines, our platform cannot go down. Ever.

**User Empathy**: Students using our platform are often stressed, learning complex concepts under time pressure. Every UX decision had to account for cognitive load.

**Seasonal Traffic**: University semesters create massive traffic spikes. Our architecture had to handle 10x normal load during exam periods.

**Data Sensitivity**: Student work and grades require the highest levels of security and privacy protection.

## Lessons Learned

### Technical Lessons

**Start Simple, Scale Smart**: Our initial architecture was much simpler than what we ended up with. The key was building with future scaling in mind without over-engineering early.

**Observability is Everything**: When serving critical educational workflows, you need to know about problems before your users do. We invested heavily in monitoring, logging, and alerting.

**Database Design Matters**: CAD projects create complex relational data. Poor database design decisions early on caused performance problems that took months to fix.

**API Design for the Long Term**: Our APIs needed to evolve without breaking existing integrations with university systems. Versioning and backward compatibility became crucial.

### Career Lessons

**Domain Expertise is a Superpower**: Understanding education, CAD workflows, and university operations made me a better technologist than pure coding skills alone.

**Communication Across Domains**: Being able to translate between technical and educational language became one of my most valuable skills.

**Ownership Mindset**: As the first engineer, everything was my responsibility. This taught me to think like an owner, not just an employee.

**Learning Never Stops**: From CAD file formats to educational psychology, working at Fabrio required constant learning across diverse fields.

### Business Lessons

**Product-Market Fit is Obvious**: When we found it with universities like UCL and Imperial, adoption accelerated rapidly. Before that, every sale was a struggle.

**Enterprise Sales are Different**: Selling to universities requires understanding procurement processes, academic calendars, and institutional decision-making.

**References Matter**: Success with prestigious institutions like UCL and Imperial opened doors to other world-class universities globally.

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
