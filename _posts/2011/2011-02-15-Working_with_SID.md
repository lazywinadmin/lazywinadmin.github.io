---
layout: single
title: Working with SID
excerpt: 
permalink: /2011/02/working-with-sid.html
tags: 
- powershell
- scripting
published: true
comments: true
---
[technet more info](http://technet.microsoft.com/en-us/library/ff730940.aspx)

Account Name to SID

<pre class="brush: powershell; ruler: true; first-line: 1; highlight: [2, 4, 6]">#
#Get "fabrikam, kenmyer" to SID
$objUser = New-Object System.Security.Principal.NTAccount("fabrikam", "kenmyer")
$strSID = $objUser.Translate([System.Security.Principal.SecurityIdentifier])
$strSID.Value

```


SID to Account Name

<pre class="brush: powershell; ruler: true; first-line: 1; highlight: [2, 4, 6]">#
# translate "S-1-5-21-1454471165-1004335555-1606985555-5555" to Account Name
$objSID = New-Object System.Security.Principal.SecurityIdentifier `
    ("S-1-5-21-1454471165-1004335555-1606985555-5555")
$objUser = $objSID.Translate( [System.Security.Principal.NTAccount])
$objUser.Value

```

