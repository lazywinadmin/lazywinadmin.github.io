---
layout: single
title: Simple RAID Cheat Sheet
description: "A quick reference table comparing RAID 0, RAID 1, RAID 5, RAID 10 and JBOD by redundancy, number of disks required, and read and write speed."
excerpt: 
permalink: /2010/02/simple-raid-cheat-sheet.html
tags:
- learning resources
- storage
published: true
comments: true
---

Note for self, here is a table of the different RAID Available.

|Level|Redundancy|Disk Required|Faster Reads|Faster Writes|
|---|---|---|---|---|
|RAID 0|No|N|Yes|Yes|
|RAID 1|Yes|2|Yes|No|
|RAID 5|Yes|N+1|Yes|No|
|RAID 10|Yes|N*2|Yes|Yes|
|JBOD|No|N/A|No|No|