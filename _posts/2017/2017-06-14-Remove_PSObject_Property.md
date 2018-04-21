---
layout: single
title: "Remove a PowerShell Object property"
excerpt: "In this article we'll see how to remove a property from a Powershell Object"
permalink:
tags: 
  - powershell
categories:
  - powershell
published: true
comments: true
author_profile: false
header:
  teaserlogo: ''
  teaser: ''
  image: images/headers/Code01_1920x500.jpg
  caption: ''
gallery:
  - image_path: ''
    url: ''
    title: ''
---

Someone at work was recently asking me about the following: <i>How to remove a property from a PowerShell Object ?</i>

Here is how you can achieve that.
<br><br>
# Create a PowerShell Object
```powershell
$MyObject = New-Object -Typename PSCustomObject -Property @{
    ComputerName = $env:ComputerName
    MacAddress = '00:11:22:33:44:55'
    Description = 'My Computer'
}
```

`$MyObject` returns:

```
ComputerName    Description MacAddress
------------    ----------- ----------
DESKTOP-HPHHRC5 My Computer 00:11:22:33:44:55
```
<br>

# Remove the property

```powershell
$MyObject.PSObject.properties.remove('Description')
```

`$MyObject` returns:

```
ComputerName    MacAddress
------------    ----------
DESKTOP-HPHHRC5 00:11:22:33:44:55
```
