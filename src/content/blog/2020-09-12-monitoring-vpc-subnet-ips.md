---
title: "Monitor Available IPs with Lambda and CloudWatch"
description: "Building a custom monitoring solution for tracking VPC subnet IP availability in AWS EKS clusters when off-the-shelf tooling doesn't exist."
pubDate: 2020-09-12T19:48:02
author: "Chris Dodds"
---

I ran into a situation where I needed to keep track of available IPs related to an AWS EKS cluster and couldn't find any off-the-shelf tooling in AWS or otherwise to do so.

Tangential gripe: The reason I needed the monitor is because [EKS doesn't support adding subnets](https://github.com/aws/containers-roadmap/issues/170) to a cluster without re-creating it and the initial subnets that were used were a little too small due to reasons. I wanted to have a sense of how much runway I had pending AWS fixing the gap or me implementing a work around.

So, I cobbled together a Lambda function to pull the info and pipe it into CloudWatch.

[Gist here](https://gist.github.com/chrisdodds/123abc5cffee2b72b2d3f0356c58c8f6)

I'm using tags to scope the subnets I want to track, rather than piping in everything – since CloudWatch custom metrics cost money. But you could use whatever filters you wanted.

After getting the data into CloudWatch, I was quickly reminded that you can't alarm off of multiple metrics, so I used a math expression (MIN) to group them instead. This works for up to 10 metrics (this post should really be titled "The numerous, random limitations of AWS"), which luckily worked for me in this instance.

Then I setup an alarm for the threshold I wanted and tested it – it worked. Fun times.
