---
layout: single
title: "Using $$, $^, $?"
excerpt: "As requested by some of the User Group members, here are some of the variables that store state information for PowerShell. These variables are created and maintained by PowerShell."
permalink:
tags: 
  - powershell
  - exitcode
categories:
  - powershell
published: true
comments: true
author_profile: false
header:
  teaserlogo: ''
  teaser: ''
  image: images/headers/Code02_1920x500.jpg
  caption: ''
gallery:
  - image_path: ''
    url: ''
    title: ''
---

As requested by some of the attendees of my user group, here are some example on how to use `$$`, `$^`, `$?`

## $$

Contains the last token in the last line received by the current session.

```powershell
Get-ChildItem -path "c:\windows\" -filter "*.log"

$$
```

Returns: `*.log`

## $^
Contains the first token in the last line received by the session.

```powershell
Get-ChildItem -path "c:\windows\" -filter "*.log"

$^
```

Returns: `Get-ChildItem`

## $?

Contains the execution status of the last operation. It contains `TRUE` if the last operation succeeded and `FALSE` if it failed.

```powershell
Get-ChildItem -path "c:\windows\" -filter "*.log"

$?
```

Returns: `True`