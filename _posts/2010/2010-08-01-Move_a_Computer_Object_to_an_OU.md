---
layout: single
title: Move a Computer Object to another Organizational Unit (OU) using DSMove
excerpt: 
permalink: /2010/12/how-to-find-computer-serial-number.html
tags: 
- active directory
- scripting
- vbscript
categories:
- powershell
published: true
comments: true
---

I’m currently configuring HP Rapid Deployment Pack (RDP) and needed a way to automatically move a Computer object in a specific Organizational Unit(OU).

My logic is based on the Server name itself.

As an example we use the following naming convention:

Server Name: `MTL1ASTT01`

* `MTL` is the city name
* `1` is the site number
* `A` for application
* `STT` custom info
* `01` number of the server

On the Active Directory side, we organize the servers (computer objects) this way:

DOMAIN.local > GLOBAL > **%SITENAME%** > SERVERS

So if want to get the **SITENAME** and the SITENUMBER from the SERVERNAME i would use the code below, it will select

```vb
echo. Getting Sitename from the Computer name ...
Set SITENAME=%COMPUTERNAME%:0,4%
echo. SITENAME is %SITENAME%
dsmove "CN=%COMPUTERNAME%,OU=COMPUTERS,DC=DOMAIN,DC=LOCAL" -newparent OU=Servers,OU=%SITENAME%,OU=GLOBAL,DC=DOMAIN,DC=LOCAL
```

More information about DSMOVE