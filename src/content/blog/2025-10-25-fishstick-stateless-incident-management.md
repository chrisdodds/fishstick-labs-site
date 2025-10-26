---
title: "Fish Stick: A Stateless Incident Management Bot for Slack"
description: "No database. No web UI. Just Slack. A new take on incident management that sits in the sweet spot between too simple and too complex."
pubDate: 2025-10-25T22:10:00
---

I just released [Fish Stick](https://github.com/chrisdodds/fishstick), a stateless incident management bot for Slack. I've built this bot six+ times at different jobs, so figured it was time to stop recreating it and share it with the world.

**The pitch:** Most incident management tools are either too simple (basic Slack workflows) or too complex (enterprise platforms with a million knobs). Fish Stick sits in the middle—more powerful than workflows, simpler than enterprise tools.

<div style="margin: 2em 0; text-align: center; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw;">
  <img src="https://raw.githubusercontent.com/chrisdodds/fishstick/main/docs/demo.gif" alt="Fish Stick Demo" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);" />
</div>

### Key features:

- Random channel names (`incident_furious_chicken`, `incident_brave_penguin`)
- Timeline logging with timestamps
- Threaded team updates to stakeholders
- Incident commander tracking and handoffs
- Auto-generated timeline reports from channel history
- Private incident support
- Test mode for game days

The interesting part: **it's completely stateless**. No database. No web interface. No OAuth flow. For this use case and this niche, Slack as DB is good enough.

All incident data lives in Slack:

- Incident metadata → channel properties and pinned messages
- Timeline → messages in the incident channel
- Summary → pinned message

You can restart the bot anytime without losing anything. This keeps deployment dead simple.

Built it in TypeScript with the Slack Bolt framework. Supports Socket Mode for local dev (no public URL needed) and HTTP mode for production. Takes about 5 minutes to set up if you use the app manifest.

I've pared down the features quite a bit from what I have in other versions of the bot to keep things simple, but will be adding back some things like webhooks over time.

It's MIT licensed. If you run incidents in Slack and want something between "too basic" and "too much," check it out: [github.com/chrisdodds/fishstick](https://github.com/chrisdodds/fishstick)
