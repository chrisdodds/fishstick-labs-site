---
title: "Adventures in S3 Cost Optimization"
description: "Digging in to S3 to find some spare change."
pubDate: 2026-03-13
---

I recently worked on a project to dial down the burn on an AWS bill. There was the standard stuff like purchasing savings plans/RIs and getting rid of orphaned EBS volumes (all those lonely EBS orphans wandering the streets), but S3 was where a big chunk of savings lived.

There were three main levers there: finding a bunch of uncompressed logs, crafting some storage tiering for things that could roll off of Standard access, and setting up an [S3 gateway endpoint](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html) for the VPC.

## .gz was a lie

The biggest bucket was a log bucket -- many terabytes. Spot checking the log files, they all had gzip extensions, but seemed larger than I'd expect given the logging config (dozens of MBs vs single digits). When I pulled one down to open it, gzip choked on it.

Long story, short, I looked at the encoding and figured out it was actually raw JSON. womp. womp. `compress gzip` was missing from the fluentd config for the application, but `.gz` was specified in the file name template.

The fix? Caveman brain said "we could run a local script to loop through all the files and zip them", but my wiser angels knew that there were millions of files and that would take forever. [S3 Batch Operations](https://docs.aws.amazon.com/AmazonS3/latest/userguide/batch-ops.html) to the rescue. I Lambda-ized the script I would have written for local and had the Batch Operation process the bucket: find unzipped files, gzip them, write new objects, then a day later a lifecycle rule expired the originals.

**Result: ~$10k in annual savings**

## What do we use this stuff for?

The next thing I looked at was [Lifecycle rules](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html) and storage tiering. Everything: logs, FE assets, customer uploads -- was in Standard tier. I looked at turning on [Intelligent-Tiering](https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering.html), but given the size of the buckets, it would have eaten a big chunk of the cost savings I just found. So I did a one-time [Storage Class Analysis](https://docs.aws.amazon.com/AmazonS3/latest/userguide/analytics-storage-class.html) instead and waited a day for the results.

As I expected, the log bucket was never accessed (or we'd have known logs weren't gzipped). And the other large buckets had a predictable drop off. After 180 days, access dropped almost to zero for most objects.

I knew we were going to want to work with logs more, so didn't want to toss them into [Standard-IA (Infrequent Access)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-standard_ia) by default -- even though actual use would still likely be infrequent, so I opted for a hedge. Everything older than a year goes to IA.

In writing the Lifecycle rule to handle rotation, I came across a little tidbit I hadn't known about before: [All the IA tiers have a minimum object charge of 128 KB per object](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html#sc-compare)—so buckets with lots of small objects get hit hardest. For the log buckets, this was fine; they were all big boys. But it didn't make sense for all the other buckets.

For the non-log buckets, I implemented a Lifecycle rule that rotated objects to IA after 180 days, but only if they were larger than 128 KB; otherwise, in most cases it was cheaper for them to stay in Standard tier.

**Result: Another ~$15k in annual savings**

Finally, I dug into my least favorite AWS billing line item: EC2-Other. It's just a grab bag of often nearly invisible costs that can sometimes add up to quite a lot. No one ever really owns it and the line item descriptions tend to be... not helpful.

Hmm... why is `Amazon Elastic Compute Cloud NatGateway` nearly $2k a month? That seemed high relative to the overall compute bill. I suspected it might be S3 but wanted to confirm. I used [VPC Flow Logs](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html) via [Athena](https://docs.aws.amazon.com/athena/) to confirm. If you've got flow logs in S3, you can point Athena at them (or use "Create table from Flow Logs" in the VPC console) and run something like this to see where the NAT bytes went—filter by your NAT gateway's ENI as `interface_id`:

```sql
SELECT dstaddr, SUM(bytes) AS total_bytes
FROM vpc_flow_logs
WHERE interface_id = 'eni-xxxxxxxx'   -- NAT gateway ENI from the VPC console
  AND date BETWEEN '2025-01-01' AND '2025-12-31'
GROUP BY dstaddr
ORDER BY total_bytes DESC
LIMIT 20;
```

Top destinations by volume; cross-reference the IPs with [AWS IP ranges](https://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html) (or just look up the big ones) and you'll see S3/ECR prefixes.

Sure enough, most of the NAT traffic was hairpinning right back into AWS for S3 and ECR.

The fix here is simple: VPC endpoints. I added an [S3 gateway endpoint](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html) and [ECR interface endpoints](https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html) and associated them with the route tables (S3) or subnets (ECR) for the app. The ECR proportion was only 10% of the overall NAT traffic, but at that volume the interface endpoint paid for itself. (Gateway endpoints are free.)

**Result: ~$18k in annual savings**

## The tally

$43k in savings isn't bad for a few hours' work spread across a couple of days. I think that's part of the reason I've always enjoyed cost optimization. The impact is usually really quick and meaningful. There's often a decent amount of low hanging (if somewhat obscure) fruit that is satisfying to pluck. As Bluey's mum says: sometimes boring stuff is important too.
