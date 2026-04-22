---
title: My Data Science Journey at IIT Madras - From Curiosity to Competence
date: 2024-04-02
readTime: 15 min read
category: Education
author: Lokesh Tiwari
tags: [IIT, Data Science, Learning, University, Career, Skills]
slug: data-science-iit-madras
image: 🎓
---

## Prologue

When I arrived at IIT Madras in 2022, I didn't know what I didn't know. I'd done well in high school, had some coding experience, but Deep Learning felt like magic performed by people far smarter than me.

Four semesters in, I've built 4 ML projects, contributed to research, and most importantly, learned **how to learn**. This is my story.

## Before IIT: The Misconceptions

I had a few toxic beliefs:

**Belief 1: "You need a PhD to do real ML"**
- Reality: Plenty of impactful ML is done by undergrads with curiosity and time

**Belief 2: "Math talent is innate"**
- Reality: I struggled with linear algebra. It just took practice.

**Belief 3: "Good engineers write perfect code"**
- Reality: Good engineers write messy code, then refactor it. Repeatedly.

Shedding these beliefs was my real education.

## Year 1: The Fundamentals Phase

### Semester 1: Programming Foundations
Most students thought this course was boring. Honestly, it was where I started building intuition.

**Key learnings:**
- Data structures aren't abstract—they're tools for specific problems
- Time complexity matters in real systems
- Debugging is 90% of programming

I spent more time debugging my linked list implementation than writing it. That frustration? It was learning.

### Semester 2: Discrete Math & Linear Algebra
This is where people usually give up. Linear algebra especially seemed divorced from reality.

**The breakthrough**: Taking Andrew Ng's course in parallel. Suddenly, "eigenvectors" weren't math symbols—they were how neural networks learn.

**My approach to struggling subjects:**
1. Watch 3-5 different explanations (3Blue1Brown > most textbooks)
2. Implement from scratch (matrix multiplication by hand, then in code)
3. Apply immediately (use SVD for dimensionality reduction on real data)
4. Teach someone else (explaining forces clarity)

Took 2 months. Worth it.

## Year 1-2: The ML Discovery Phase

### First Project: Diabetes Prediction

**Context**: My first ML project in a coursework assignment. The problem was simple: predict diabetes from patient health metrics.

**What went wrong (a lot):**
- Forgot to normalize features (age on 0-80 scale vs glucose on 100-300 scale)
- Used 80% of data for training, 20% for testing (correct), but didn't have a validation set
- Assumed accuracy = good model (it was 85% accurate but had terrible recall on positive class)
- Didn't handle missing values (just deleted them—data loss!)

**What I learned:**
- **Data preprocessing is 80% of the work**: Not the sexy part, but the crucial part
- **Train/Validation/Test matters**: I built a leaky model and never knew it
- **Different metrics for different problems**: In medical diagnosis, missing a diabetic is worse than a false alarm

That project got a B+. I deserved a C. But my prof saw the potential and encouraged me to refine it.

### Self-Study Phase

I realized textbooks move too slow. But free resources are abundant:

**Resources that changed my learning:**
- **Andrew Ng's Coursera ML course**: Still the best introduction to ML intuition (not just math)
- **Fast.ai**: Practical deep learning. Code first, math second. Awesome.
- **3Blue1Brown's Essence series**: Linear algebra, calculus, neural networks visualized beautifully
- **Papers with Code**: See what's working in production, not just in academic papers
- **Kaggle competitions**: Real problems, real feedback, real urgency

**My learning pattern:**
- Spend 1-2 weeks on a topic
- Build a project immediately (not after the course)
- Write about it (blog posts cement understanding)
- Help others (answering questions in Discord/Reddit)

This cycle worked way better than passive learning.

## Year 2: The Project Exploration Phase

### Kaggle: Loan Payback Prediction

Kaggle was humbling. My first submission scored in the 60th percentile. I was ranked 3,500 out of 5,000.

**Lessons from the competition:**

1. **Simple models often win**: XGBoost with careful feature engineering beat my fancy neural network by 5%
2. **Feature engineering matters more than model selection**: Spending 3 days on features > 3 days on model architecture
3. **Ensemble methods are powerful**: Combining 3 models beat any individual model
4. **Leaderboard games teach bad lessons**: I started overfitting to the public leaderboard. Learning to ignore the leaderboard rankings was harder than the technical work.

**My final score**: 0.922 ROC-AUC (top 15%). Not winning, but credible.

**Most valuable skill learned**: How to validate properly without leaking target information.

### Research Direction: NLP & Deep Learning

By semester 3, I knew I wanted to specialize. Choices:
- Computer Vision (lots of people doing it)
- Reinforcement Learning (cool but niche)
- **NLP with Deep Learning** (languages fascinate me, Transformers are revolutionary)

I pitched a project to a professor: "*Can we detect extremism in social media posts using fine-tuned Transformers?*"

She said yes. That project became my portfolio centerpiece.

## Year 2-3: The Deep Expertise Phase

### Building My Extremism Detection System

This wasn't a homework assignment. There was no rubric. No grade. Just: "build something real."

**Challenges I faced:**

1. **Data annotation**: Getting quality labeled data took 4 weeks of recruiting friends, disagreement resolution, and re-annotation
2. **Baseline models**: Needed to understand why classical ML didn't work before jumping to Transformers
3. **Compute constraints**: BERT fine-tuning requires a GPU. I didn't have one initially
4. **Reproducibility**: My first version worked, but I couldn't replicate it (random seeds, library versions, etc.)
5. **The real problem**: Defining "extremism" was harder than building the model

**What I did differently:**
- Wrote detailed documentation (for me 6 months later, not for others)
- Version controlled everything (data preprocessing, model checkpoints, results)
- Kept detailed experiment logs (model architecture, hyperparameters, results)
- Built evaluation beyond accuracy (fairness, interpretability, limitations)

That project taught me **engineering**—not just ML, but shipping ML systems.

## Year 3: The Depth & Breadth Phase

### Lessons from Multiple Projects

By semester 5, I had built 4 meaningful projects. Patterns emerged:

**The 20/80 rule**: 20% of the effort gives 80% of the value
- 20%: Simple baseline, clear metric, basic data cleaning
- 80%: Feature engineering, model tuning, edge cases

**The importance of fundamentals**: Everyone wants to learn Transformers. But 90% of my value came from:
- Clean code practices
- Statistics (p-values, confidence intervals)
- Knowing when to use XGBoost vs neural networks
- Debugging skills

**The learning curve is not linear**: I hit a plateau at month 4 of deep learning. Thought I'd learned all the "big ideas." Then suddenly, by month 8, everything started connecting. Patience matters.

### Challenges I'm Still Facing

Honesty: There's a lot I still don't know.

**What's hard for me:**
- **Distributed systems**: Training models on massive data across clusters
- **Serving ML models**: Getting production systems to scale with 1000s of requests/second
- **Advanced research**: Following cutting-edge papers requires serious math depth
- **Product intuition**: Knowing what to build matters more than building it perfectly

**How I'm addressing this:**
- Taking an advanced course on distributed ML next semester
- Learning MLOps (MLflow, Docker, Kubernetes basics)
- Reading 1-2 papers per week, discussing in study groups
- Working on a real product project (parking management system)

## The Meta-Learning: How I Learned to Learn

After 3 years, I've gotten better at learning itself:

### 1. **Motivation > Discipline**
I don't motivate myself with "I must learn." Instead, I choose projects that excite me. A 2-month focused sprint on something I love > 6 months of unmotivated grinding.

### 2. **Explain It to 5-Year-Olds**
If I can't explain a concept simply, I don't understand it. Trying to explain "attention mechanisms" forced me to understand them deeply.

### 3. **Do the Painful Thing First**
Math, theory, rigor—these are hard. I used to avoid them. Now, I do the hardest thing first (usually math). Easier to code after I understand the theory.

### 4. **Learn in Public**
Writing blog posts about my projects:
- Forces clarity (if I can't write it, I don't understand it)
- Gets feedback (people correct my mistakes)
- Builds network (others learning similar things find you)
- Looks good (portfolio building)

### 5. **Find Your Tribe**
The 3-4 friends I study with have made this 10x better. We:
- Discuss papers weekly
- Pair program challenging problems
- Give feedback on projects
- Keep each other accountable

## Semester 6: Where I Am Now

**Current CGPA**: 9.16/10

More importantly:
- **Projects**: 4 substantial ML projects in my portfolio
- **Skills**: Comfortable with PyTorch, Transformers, classical ML, MLOps basics
- **Research**: Contributing to a paper on fairness in content moderation
- **Direction**: Want to work on impactful ML systems, not just high-accuracy models

**What I'm grateful for:**
- Professors who encouraged experimentation over perfection
- Classmates who pushed me
- Online communities that made knowledge free
- The privilege to attend a top institution where failure is part of learning

## Advice for Those Starting This Journey

If you're entering data science/AI education:

1. **Build projects early**: Months 1-3, build something, anything. Mistakes teach faster than lectures.
2. **Learn the fundamentals deeply**: Linear algebra, probability, derivatives. Not optional.
3. **Read papers**: Start with summaries, move to full papers. Don't understand everything—that's fine.
4. **Teach others**: Explain concepts to friends, write blogs, make videos. Teaching is learning.
5. **Don't optimize for grades**: Optimize for understanding. Grades follow naturally.
6. **Pick depth over breadth**: One strong skill > scattered mediocrity.
7. **Build in public**: Put your work on GitHub. This becomes your portfolio.
8. **Be patient with yourself**: Deep learning is hard. It took me 6 months to feel competent. That's normal.

## Conclusion

IIT Madras has been incredible, but here's the truth: **the institution mattered less than my choices**.

The resources are freely available online (YouTube, Coursera, arXiv, GitHub). What I paid for at IIT:
- Accountability (homework, exams forcing me to stay on track)
- Mentors (professors who gave feedback, guidance)
- Peers (people as motivated as me, pushing together)
- Time (the privilege to study 8 hours/day without earning money)

**The real value**: Learning how to learn, building competence through iteration, and developing the confidence that hard things are just things that take time.

If I can go from confused student to building real ML systems in 3 years, so can you. The path isn't as mystical as it seems.

---

**What's your learning journey? What helped you most in mastering data science? I'd love to hear your story in the comments.**
