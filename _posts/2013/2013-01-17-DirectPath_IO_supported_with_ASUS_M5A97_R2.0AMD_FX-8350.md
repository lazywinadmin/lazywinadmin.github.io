---
layout: single
title: DirectPath I/O supported with ASUS M5A97 R2.0/AMD FX-8350
excerpt: 
permalink: /2013/01/directpath-io-supported-with-asus.html
tags: 
- directpathio
- esxi
- homelab
- vmware
published: true
comments: true
---

Here is my [HomeLab]("{{ site.url }}/p/lab.html") configuration:

* MotherBoard: ASUS M5A97 R2.0
* CPU : AMD FX-8350 (8 Cores - 4.0Ghz)

## What is DirectPath IO ?

![image-center](/images/2013/20130117_DirectPath_IO_supported_with_ASUS_M5A97_R2.0AMD_FX-8350/3785268304_1ba845523e__879896625__-300x479.jpg){: .align-center}

## How to configure it with an ASUS M5A97 R2.0

1. Enter into the BIOS and navigate to the Advanced Settings (using `F7`)
1. Under North Bridge Configuration
1. `IOMMU` is set to "Disabled" by default, set it to "Enabled"

![image-center](/images/2013/20130117_DirectPath_IO_supported_with_ASUS_M5A97_R2.0AMD_FX-8350/1-17-2013 10-26-22 PM__975122703__-640x278.png){: .align-center}

Now save the configuration and boot under ESXi.

And you're done :slightly_smiling_face:

![image-center](/images/2013/20130117_DirectPath_IO_supported_with_ASUS_M5A97_R2.0AMD_FX-8350/DirectPathIO__17619342__-673x106.png){: .align-center}