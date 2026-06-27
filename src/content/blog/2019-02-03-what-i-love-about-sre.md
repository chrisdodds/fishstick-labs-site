---
title: "What I Love About SRE"
description: "A childhood soaked in science, and how site reliability engineering scratches the same itch: 'What do we think is true, and how would we know we're wrong?'"
pubDate: 2019-02-03T22:04:05
author: "Chris Dodds"
---

My childhood was soaked in science. As I learned the alphabet and how to tie my shoes, my dad spent his days taking water samples and caring for the fish that made up the research cohort for the aquaculture study he ran. We lived at a research site on the lake and I toddled along through three hot summers, staring into the eyes of whiskered catfish and witnessing the hard, mundane work of science interwoven through our daily lives.

I did a search recently and the only monument to that time I can find is an [eight-page document](/aquaculture-study.pdf) that basically says "meh".

One morning, years later, I sat in my dad's lab injecting [nematodes](https://en.wikipedia.org/wiki/Nematode) into hundreds of tiny, clear Dixie cups full of dirt samples, some of which would later be paired with marigold extracts. It wasn't the most exciting "Take your son to work" Day, but once I developed a cadence there was a calming quality to it and time melted away.

It was more interesting to me as an adult, when I learned this type of research, as boring and un-sexy as it is, impacts whether millions of people get enough to eat.

Our living room and porch were filled with hybridization experiment rejects — peppers, squash, and random erosion-control plants in an assortment that would in no way be considered normal by anyone who actually raised house plants. They were misfits that didn't have the right taste, shape, structure, or hardiness to make it to the next round, and the smell of their potting soil and green of their leaves transformed our house into a primordial jungle. For all of my dad's commitment to the logic of science, a bit of animism also threaded through his work. He'd feel bad if he had tilled these plants back into the dirt or tossed them into an incinerator.

These "failures" were each data points and lessons. Some of those lessons were "don't touch this and then rub your eyes".

All of these objects and experiences embedded a system of discovery in me (some might call it a method 😜): make a guess → try to prove your guess wrong and measure the results → analyze and iterate. This method is a tool that helps reveal the fabric of reality. It's the best thing humans have ever come up with.

Growing up surrounded by the practices of science taught me to find interest and beauty in the outwardly mundane, that there was opportunity, even in the most boring-seeming places, to discover something that no one else in the whole world knows — at least for a brief moment.

This kind of childhood inspired me to be curious and persistent. Other aspects of growing up weren't great, but this part of growing up was as close to perfect as I can imagine and I am grateful for it.

My career has meandered its way not into the biological or physical sciences, but into something we're currently calling [site reliability engineering](https://sre.google/sre-book/introduction/) — a strange amalgam of systems administration, performance management, software development, quality control, and the crafting of antifragility, a practice I don't really know what to call other than "applied statistics". In the narrowest view, SRE can be limited to a fancier name for release management, but in most organizations there is runway to make it much more.

As with any maturing discipline, people find different areas of focus, but the aspects of SRE that appeal most to me are those that mirror what I saw growing up, areas where the scientific method can be leveraged to chip away at problems that have, up until very recent history, only been attacked with intuition and business process consultations.

SRE doesn't hold a monopoly on this approach. Anyone can start challenging assumptions with "What do we think is true and how would we know we're wrong?" questions, but there are some unique, SRE-specific opportunities for experimentation at scale and within the distributed systems that SREs manage. And because of its inherent technical nature and practitioners' comfort with data, SRE (along with data engineering and finance) provides a good beach head for science to wiggle its way into the rest of a business.

Science manifests itself in SRE in expressions as simple as "How do we measure and increase reliability? When and where do we encounter diminishing returns?" That's a good place to start, but not where anyone should stop. Continuing the line of questioning of "What matters to us and how do we keep ourselves honest?" provides a lot of opportunities to provide value and make interesting discoveries.

Questions you ask could lead you to dig into cloud provider bills, or analyze access patterns to blob storage, or purposefully inject failure into systems to find their weaknesses. Managing servers is part of the job in a similar way to my dad having to feed the fish he was studying. It's a base requirement, but it's not the point.

The really interesting opportunities in SRE present themselves when you open yourself up to a broader definition for your role, what questions you should be asking and to whom. Thinking more broadly than what you need to do to address the bottom tiers of Maslow's hierarchy of needs for systems operations allows you to affect change and make useful discoveries. This is where I thrive and find the things I love about doing SRE work — having real things to measure, make decisions about, and improve through a methodology that requires you to be honest about the world you live and work within.
