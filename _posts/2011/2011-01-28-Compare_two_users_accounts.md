---
layout: single
title: PowerShell/Active Directory - Compare two users accounts membership
excerpt: 
permalink: /2011/01/compare-two-users-accounts.html
tags: 
- active directory
- powershell
- scripting
categories:
- powershell
published: true
comments: true
---

Here is a PowerShell Tip to compare 2 Active Directory user account membership

## Using ActiveDirectory module

```powershell
# Import ActiveDirectory Module
Import-Module ActiveDirectory

function Compare-ADUserGroups
{
 param (
  [string] $FirstUser = $(Throw "SAMAccountName required."),
  [string] $SecondUser = $(Throw "SAMAccountName required.")
 )

 $a = (Get-ADUser $FirstUser).MemberOf
 $b = (Get-ADUser $SecondUser).MemberOf
 Compare-Object -referenceObject $a -differenceObject $b
}

Compare-ADUserGroups -firstuser useraccount1 -SecondUser useraccount2
```

## Using Quest Active Directory

```powershell
# Load Quest snapin
Add-PSSnapin Quest.ActiveRoles.ADManagement

function Compare-ADUserGroups
{
 param (
  [string] $FirstUser = $(Throw "SAMAccountName required."),
  [string] $SecondUser = $(Throw "SAMAccountName required.")
 )

 $a = (Get-QADUser $FirstUser).MemberOf
 $b = (Get-QADUser $SecondUser).MemberOf
 Compare-Object -referenceObject $a -differenceObject $b
}

Compare-ADUserGroups -firstuser useraccount1 -SecondUser useraccount2
```

