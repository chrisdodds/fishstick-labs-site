---
title: "Hype Isn't a Use Case"
description: "Chasing the newest tech you read about this morning is how production ends up on fire. For the stuff that has to stay up, pick the boring tools you can count on."
pubDate: 2017-10-18T04:18:48
author: "Chris Dodds"
---

A few months ago, a recruiter sent me a LinkedIn message with a link to a recruitment video. I've been seeing more of these lately, but this one was particularly impressive at how quickly it turned me off from the company.

It described their idea of a tech utopia, a place where developers could use whatever technology they desired.

"Read a blog post about something new in the morning. Deploy it to prod in the afternoon," said a developer vibrating from over-caffeination.

"Pick the tools and languages you want. Every team is using something different."

"We're on the cutting edge, innovating like crazy, using tech you won't see anywhere else."

It was meant to sound like freedom. What I heard was "God help their on-call rotation." Every one of those sentences is also a description of a system that no single person can reason about at 2am.

There's a pattern here, and most of us have been the person in it at some point: picking tools based on the most exciting thing we read this week. It's a genuinely fun way to work. It's also how you end up maintaining something fragile that only made sense the afternoon you built it.

With a little structure — a team norm, a manager who asks the right questions — that same enthusiasm is exactly what drives real innovation and gets people thinking differently. Left completely unchecked, it tends to end with the building on fire. Granted, it may be a spectacular fire.

Sometimes the shiny-penny chasing is actively encouraged, as it was at the company in that video. Those are places where leadership has confused *tooling* innovation with *business* innovation. No one ever asks "Will rewriting our entire app in Haskell give us a competitive advantage?" (The answer is almost always no.)

Nor do they ask:

  * Who else is using this?
  * Where would we get support?
  * Is it well documented?
  * Does this actually do what we think it will do?

I'm not arguing people shouldn't get excited about new technology — I get excited about new technology. Just that there has to be some prudence about where it lands. It's better to innovate in the business, the product, and the process than in the tooling.

For the business to succeed (and for you to keep your weekends), it's better to use proven technologies that have had time to bake, develop community support, and let the early adopters discover the production landmines first. "Well-documented and supported" beats "shiny" almost every time.

So does "right." An established, heavily hyped tool that doesn't fit your problem is just as dangerous as a brand-new one.

If you're working with or managing someone who's all-in on the newest thing, the move isn't to shut them down — it's to ask the questions alongside them. Walk together from "I just read about MongoDB and it's awesome, we should use Mongo!" to "All of our data is relational, so we probably shouldn't."

Help each other think like a carpenter. Using an old hammer doesn't keep you from building an incredible house. Tools you know and trust are what let you take risks *elsewhere* — you can push boundaries in one place precisely because everything else is solid and boring.

So play with new tech. I'd argue you should carve out real time for it — sprint time to test things, break things, and learn. Keep pushing forward. Just be deliberate about what graduates into production, and let the bar be "the stuff I'd trust at 2am."

Resources like [Thoughtworks' Tech Radar](https://www.thoughtworks.com/radar) are useful for finding technologies in the sweet spot: new enough to matter, established enough that you won't be stranded on an island. If you're in the enterprise space, something like Gartner helps too.

Choosing technology responsibly isn't sexy or exciting, but it's wise — and wisdom gets discounted far too often. More than that, it's a kindness to your teammates: they're the ones who'll live with the downstream effects of what you decide today.
