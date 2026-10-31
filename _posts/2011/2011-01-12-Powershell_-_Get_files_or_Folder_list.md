---
layout: single
title: Powershell - Get files or Folder list
description: "How to list only files or only folders recursively in PowerShell, with the PowerShell v2 approach and the -File and -Directory parameters of v3+."
excerpt: 
permalink: /2011/01/powershell-get-files-or-folder-list.html
tags:
- powershell
- tips
categories:
- powershell
published: true
comments: true
---

>Update: PowerShell version 3 now have a parameter `-File` and `-Directory`

Here is quick tip if you want to retrieve recursive either files or folder in PowerShell"

## Directories

### PowerShell version 2

```powershell
Get-childitem -Path c:\ -recurse | 
    Where-Object -FilterScript {
        $_.PsIsContainer
    }
```

### PowerShell version 3+

```powershell
Get-childitem -Path c:\ -recurse -Directory
```

## Files

### PowerShell version 2

```powershell
Get-childitem -Path c:\ -recurse | 
    Where-Object -FilterScript {
        -not $_.PsIsContainer
    }
```

### PowerShell version 3+

```powershell
Get-childitem -Path c:\ -recurse -File
```
