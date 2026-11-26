---
description: "A PowerShell script that checks whether all Windows services set to start automatically are actually running, locally or remotely."
layout: single
title: Powershell - Check if all the services with StartMode AUTOMATIC are actually Running
seo_title: "PowerShell: Check That All Automatic Services Are Running"
excerpt: 
permalink: /2011/06/powershell-check-if-all-services-with.html
tags:
- powershell
- windows server
published: true
comments: true
---
Check if all the services with StartMode AUTOMATIC are actually Running:

```powershell
Get-WmiObject Win32_Service -ComputerName . |`
	where 	{($_.startmode -like "*auto*") -and `
		($_.state -notlike "*running*")}|`
	select DisplayName,Name,StartMode,State|ft -AutoSize
```

{% capture wmicimupdate %}
**Update 2026/11:** `Get-WmiObject` was removed in PowerShell 6 and later. The sample above is unchanged. `-ComputerName .` is the local computer; `Get-CimInstance` uses `-ClassName` and can omit `-ComputerName` when querying locally. `DisplayName`, `Name`, `StartMode`, and `State` are the same properties on `Win32_Service`.
{% endcapture %}
{{wmicimupdate}}{: .notice--info}

```powershell
Get-CimInstance -ClassName Win32_Service |
	Where-Object {($_.StartMode -like "*auto*") -and `
		($_.State -notlike "*running*")}|`
	Select-Object DisplayName,Name,StartMode,State | Format-Table -AutoSize
```

*Originally published on PoshCode (now offline); [archived copy](https://web.archive.org/web/20151020070254/http://poshcode.org/2759).*
