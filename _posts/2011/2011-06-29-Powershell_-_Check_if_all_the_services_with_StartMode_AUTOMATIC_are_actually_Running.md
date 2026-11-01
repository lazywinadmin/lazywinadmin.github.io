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

*Originally published on PoshCode (now offline); [archived copy](https://web.archive.org/web/20151020070254/http://poshcode.org/2759).*
