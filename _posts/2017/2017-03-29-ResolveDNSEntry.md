---
layout: single
title: "Resolve a DNS Entry with PowerShell"
excerpt: "Quick and dirty way to resolve a DNS entry"
permalink:
tags: 
- powershell
- powershelltip
categories:
- powershell
published: true
comments: true
author_profile: false
header:
  image: images/headers/Code01_1920x500.jpg
  caption: ""
  teaserlogo: images/2017/2017-03-29-ResolveDNSEntry/http.png
---

Here is one way to resolve a DNS Entry usng .NET

```powershell
[System.net.DNS]::resolve('SERVER')
```
