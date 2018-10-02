---
layout: single
title: Find computers joined to the domain by a specific user
excerpt: 
permalink: /2011/01/find-computers-joined-to-domain-by.html
tags: 
published: true
comments: true
---
<pre class="brush: powershell; ruler: true; first-line: 1; highlight: [2, 4, 6]">##
## Find computers joined to the domain by a specific user

$UserName = Read-Host -Prompt "Enter username"
$UserSID = (Get-QADUser -Identity $UserName -IncludeAllProperties).objectsid

Get-QADComputer -SizeLimit 0 | Where-Object {$_.'mS-DS-CreatorSid' -eq $UserSID} | `
ft Name
#
#

```


salut
