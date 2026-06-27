---
title: "Design for Recovery, Not Prevention"
description: "There are two ways to read 'how do we make sure this never happens again?' At cloud scale, stop chasing 100% prevention and design for fast recovery instead."
pubDate: 2017-08-16T04:06:51
author: "Chris Dodds"
---

You're walking everyone through the postmortem for last night's outage. You've described the issue, you've detailed the root cause and remediation, and the team is about to talk through lessons learned and action items.

Someone (probably your manager) asks, "How can we make sure this never happens again?"

Pause here before you respond. There are, at a minimum, two ways to interpret this question:

  1. **The literal interpretation** — How can we prevent this specific failure from reoccurring?
  2. **The pessimistic interpretation** — How can we prevent the *impact* of this failure from reoccurring?

Each interpretation requires a different answer and approach.

The **literal interpretation** is what I would call the "[TSA](https://en.wikipedia.org/wiki/Transportation_Security_Administration) Strategy." You'll be front-loading all your counter-measures in an attempt at preventing the very specific failure that's just occurred from reoccurring. It's a rigid approach that doesn't adapt easily and tends to sprawl, but it may pacify some questioners. "No one will bring a shoe bomb through security ever again! Or at least very rarely!"

The **pessimistic interpretation** is more in line with the "[NASA](https://en.wikipedia.org/wiki/NASA) Strategy." It assumes some level of failure instead of trying to achieve 100% prevention. You'll be implementing counter-measures that are more focused on recovery than prevention. Because of that, this approach is adaptable to many different situations, but it may make people uncomfortable. "The rocket engine may stall, but it recovers quickly."

These approaches also focus on different metrics. The literal interpretation should track mean time between failures ([MTBF](https://en.wikipedia.org/wiki/Mean_time_between_failures)). In turn, the pessimistic interpretation should track mean time to recovery ([MTTR](https://en.wikipedia.org/wiki/Mean_time_to_recovery)).

## Which interpretation are you going with?

If you're an NT4 sysadmin in 1997, option 1 all the way! The systems you manage may be large, but they're not necessarily that complex. Server clustering tech is fairly new, so you're likely not running any clusters, and your network probably isn't even connected to the internet. There's a technological limit to how complex your systems can be.

If you're an engineer trying to manage cloud-scale infrastructure and applications, the literal interpretation of your co-worker's question simply doesn't work. The systems you manage are too complex to keep piling on preventative measures — you'll never be able to wrap your arms around it all. There are too many variables to account for.

So you need to be pessimistic. You need to assume that anything and everything can and will fail. Get comfortable with that idea and change your approach to failure.

## Pre-requisites

First, you need to work on building an organizational, or at a minimum, a team consensus that trying to prevent all failure in your systems is insane. Trying to do this all on your lonesome will be crazy-making. So start the internal sales-pitch as quick as you can.

Second, identify what the "impact" of a system or component failure means. Does it mean 404s for the end-user? Missing transactions? Data loss? What is it you are actually trying to prevent?

Third, you need better visibility into your systems and applications than you likely already have, because the required toolsets have only recently become available (unless you work somewhere that is big enough that you've built your own tooling for this). Products like [New Relic Insights](https://newrelic.com/insights) and [Honeycomb](https://honeycomb.io/) are purpose-built for the analysis of complex systems.

Traditional logging and metrics only track the failure conditions you know about. The newer generation of tooling is built around data discovery and anomaly detection, helping you find patterns you wouldn't have seen otherwise and build mitigating controls and automated adaptations.

Fourth, if you're not already comfortable with automation (and coding), you need to get there. The infrastructure of complex systems needs to monitor itself and self-heal, but it also needs to be somewhat aware of the applications that are running on top of it so that it can help them self-heal as well. You likely won't be able to achieve this fully with only the parts that come in the box.

Now that you've at least got these things in flight…

## An example

If you've shifted your thinking from "How do we prevent a 404 from ever occurring?" to "How should the system respond when it begins to detect 404s?", you're on the right track. Let's keep going with this simple scenario.

  * Maybe your system steers users to healthy nodes where 404s aren't occurring and spins up replacement capacity.
  * Maybe the system detects something downstream is overloaded so it throttles API calls while the downstream component recovers.
  * Maybe the system knows the last version of code deployed wasn't generating 404s, so it rolls back to that version and sends an alert.
  * Maybe the system sheds load until it recovers as a whole.

As your org matures in this approach, it might make sense to leverage chaos engineering and intentionally introduce failures into your systems to observe how the system reacts and build preventative and reactive controls to address what you find. "Do we get 404s if we take this service offline? No? Well, it's the core Nginx router, so that's weird."

Note that some of these failure responses are just extensions of traditional *prevention* tactics. And, to be clear, preventative measures are still needed — they've just become more foundational. There should be a base-level of redundancy, but not a never-ending tower of it, which is what most legacy IT departments are currently trying to manage.

There's a tipping point in systems complexity where reactive measures are a lot more practical and effective than prevention. This has always been true, it's just that cloud-scale has forced people to actually acknowledge it.
