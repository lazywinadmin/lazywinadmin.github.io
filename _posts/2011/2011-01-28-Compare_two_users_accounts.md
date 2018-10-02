---
layout: single
title: Compare two users accounts
excerpt: 
permalink: /2011/01/compare-two-users-accounts.html
tags: 
- active directory
- powershell
- scripting
published: true
comments: true
---
<pre class="brush: powershell; ruler: true; first-line: 1; highlight: [2, 4, 6]">#
Add-PSSnapin Quest.ActiveRoles.ADManagement
function Compare-ADUserGroups
{
 #requires -pssnapin Quest.ActiveRoles.ADManagement
 param (
  [string] $FirstUser = $(Throw "SAMAccountName required."),
  [string] $SecondUser = $(Throw "SAMAccountName required.")
 )

 $a = (Get-QADUser $FirstUser).MemberOf
 $b = (Get-QADUser $SecondUser).MemberOf
 $c = Compare-Object -referenceObject $a -differenceObject $b
 $c
 
}


Compare-ADUserGroups -firstuser useraccount1 -SecondUser useraccount2|fl
#
#

```

