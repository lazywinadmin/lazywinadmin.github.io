---
layout: single
title: "Creating a PowerShell Remoting session in PowerShell v2"
excerpt: "The following method allows you to create a PowerShell remoting session in v2 even if the remote host is running v3+"
permalink:
tags: 
- powershell
- powershell-remoting
categories:
- powershell
published: true
comments: true
author_profile: false
header:
  image: images/headers/Code01_1920x500.jpg
  caption: ""
  teaserlogo: images/2017/2017-03-29-RegisterPowerShellv2session/coding.png
---

I recently wanted to test copying file over a PSSession where the remote host would be PowerShell v2 with PowerShell Remoting enabled.

I did not have any handy machine with only PS2 installed so I had to register a new PowerShell Configuration to use that context.

```powershell
# Create a new PowerShell Session Configuration named 'PS2'
Register-PSSessionConfiguration -Name PS2 -PSVersion 2
```

To access to this PSSession Configuration remotly, you would do the following

```powershell
# Access the PSSession configuration created above remotely
Enter-PSSession -Computer RemoteServer -Configuration PS2
```
