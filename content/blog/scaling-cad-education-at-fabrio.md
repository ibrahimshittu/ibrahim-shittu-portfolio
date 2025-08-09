---
title: "My Journey Building Fabrio: From First Engineering Hire to Serving World-Class Universities"
excerpt: "My personal journey as the first engineering hire at Fabrio, rebuilding the platform from scratch and scaling it to serve prestigious institutions like UCL and Imperial College London."
date: "2024-12-20"
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

## The First 90 Days: Rebuilding Everything From Scratch

When I joined Fabrio, the challenge was laid out: we had 90 days to completely rebuild the platform before our first major university pilot. The existing proof-of-concept had shown the vision was possible, but we needed production-ready software that could serve thousands of students reliably.

### 90 days. To rebuild everything. From scratch

The scope was overwhelming. We needed to build an entire learning management platform - from user authentication to content delivery, from real-time collaboration to automated assessments. Every single component needed to be built with scalability and reliability in mind. We chose NextJS for the frontend, AWS AppSync for our GraphQL API, Lambda functions for business logic, and deployed everything on AWS Amplify.

But here's what made it even more challenging: I wasn't just building features, I was figuring out the entire AWS ecosystem, learning GraphQL patterns, establishing deployment pipelines, and trying to maintain engineering best practices - all while racing against an impossible deadline.

My commit history from those early days tells the story. July 21st: "Authentication UI/Code" - building the entire auth flow from scratch. August 2nd: still perfecting authentication with state management. August 10th: "Step Page" - the core learning interface. August 12th: "Lesson page" and "Quiz Modal" - two major features in a single day. Every commit represented not just code, but decisions that would impact thousands of students.

The hardest part wasn't the technical complexity - it was the mental load of knowing that every decision mattered. Should we optimize for speed or scalability? Build perfect code or ship fast? Document everything or focus on features? As the sole engineer, these weren't theoretical debates. They were daily choices that determined whether we'd meet our deadline.

I developed a philosophy: build it right enough. Not perfect, but solid. Not hacky, but pragmatic. Every component had to work today but be ready to scale tomorrow. Authentication needed to be secure but implementation couldn't take three weeks. The quiz system had to be robust but we couldn't spend a month on edge cases.

The days blurred together. Morning stand-ups with Jay to align on priorities. Coding through lunch. Testing in the evenings. Pushing commits late at night. Weekends became just another two days to get closer to the deadline. It wasn't sustainable, but it wasn't meant to be. This was our one shot to prove Fabrio could deliver.

By early September, we had done it. A complete learning management system built from the ground up. Authentication, course management, content delivery, assessments, progress tracking - everything a university needed to run CAD courses online. Was it perfect? No. Was it ready? Yes.

Looking back, those 90 days taught me what I was truly capable of. Not just as a coder, but as an engineer who could take ownership of an entire product. The platform we built in those three months became the foundation that would eventually serve UCL, Imperial College, and institutions worldwide.

The lesson? Sometimes the best way to learn is to be thrown into the deep end with a deadline that doesn't care about your comfort zone. You either figure it out or you don't. We figured it out.

## The Technical Foundation Challenge

### Starting from Scratch

When I joined, we essentially had a proof of concept that needed to become an enterprise-ready platform. The technical decisions I made in those early days would impact everything that followed.

### Technology Stack Decisions

Choosing TypeScript and NextJS wasn't just about following trends - it was about building for the future:

**TypeScript**: With complex CAD workflows and educational interfaces, type safety was crucial. We couldn't afford runtime errors when students were working on critical assignments.

**NextJS**: The server-side rendering capabilities were essential for SEO and initial load performance, especially important when universities were evaluating our platform.

**AWS Infrastructure**: We designed for scale from day one:

- **ECS**: Containerized services that could scale horizontally
- **S3**: Reliable storage for large CAD files and project assets
- **RDS + DynamoDB**: Hybrid database approach for different data patterns
- **CloudFront**: Global CDN to serve universities worldwide with low latency

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

## Technical Challenges and Solutions

### The CAD File Processing Nightmare

CAD files are notoriously large and complex. A single student project could be hundreds of megabytes, and we needed to support thousands of students uploading simultaneously.

**Challenge**: How do you handle massive file uploads without breaking the bank on storage and processing costs?

**Solution**: We built a sophisticated file processing pipeline:

`Student Upload → Validation → Compression → Background Processing → Optimized Storage`

- **Progressive Upload**: Breaking large files into chunks
- **Smart Compression**: Reducing file sizes without quality loss
- **Background Processing**: Converting files to web-friendly formats
- **Caching Strategy**: Serving processed files from edge locations

### Real-Time Collaboration

Engineering students often work in teams, and they needed to collaborate on CAD projects in real-time.

**Challenge**: How do you synchronize complex 3D model changes across multiple users without conflicts?

**Solution**: We implemented operational transformation for CAD data:

- **Live Cursors**: Students could see where teammates were working
- **Conflict Resolution**: Automatic merging of simultaneous changes
- **Version History**: Complete audit trail of project evolution
- **Optimistic Updates**: Immediate feedback while changes sync

### Automated Assessment System

Perhaps our biggest technical challenge was building an AI system that could grade CAD assignments.

**Challenge**: How do you automatically evaluate the correctness and quality of 3D designs?

**Solution**: We developed sophisticated geometric analysis algorithms:

- **Dimensional Accuracy**: Checking measurements against specifications
- **Geometric Relationships**: Validating assemblies and constraints
- **Design Intent Recognition**: Understanding what the student was trying to achieve
- **Partial Credit Systems**: Nuanced scoring for complex assignments

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

## Scaling Challenges

### The Infrastructure Evolution

As we grew from serving hundreds to thousands of students, our infrastructure had to evolve:

**Year 1**: Single server with manual deployments
**Year 2**: Auto-scaling groups with basic monitoring
**Year 3**: Microservices architecture with comprehensive observability
**Year 4**: Multi-region deployment serving global universities

Each phase brought new challenges and learning opportunities.

### Team Building

Growing from one engineer to a full development team required new skills:

- **Hiring**: Finding engineers who understood both technology and education
- **Mentoring**: Helping new team members understand our complex domain
- **Process**: Implementing code review, testing, and deployment practices
- **Culture**: Maintaining startup agility while ensuring enterprise reliability

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
