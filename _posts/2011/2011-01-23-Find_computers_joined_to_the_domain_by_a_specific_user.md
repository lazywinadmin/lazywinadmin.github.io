---
layout: single
title: Find computers joined to the domain by a specific user
excerpt:
permalink: /2011/01/find-computers-joined-to-domain-by.html
tags:
- powershell
categories:
- powershell
published: true
comments: true
---

Here is a quick PowerShell tip to retrieve the computers created in Active Directory by a specific user

## With ADSI (no module required)

```powershell
# Find user SID
$UserFQDN = 'myaccount@mydomain.local'
$UserObj = New-Object System.Security.Principal.NTAccount($UserFQDN)
$strSID = $UserObj.Translate([System.Security.Principal.SecurityIdentifier])
$UserSID = $strSID.Value

# Find Computer(s) joined to the domain by a specific user
$Searcher = New-Object -TypeName System.DirectoryServices.DirectorySearcher
$Searcher.Filter = "(&(objectcategory=computer)(mS-DS-CreatorSid=$UserSID)"
$Searcher.FindAll()
```

## With ActiveDirectory PowerShell module

```powershell
# Find computers joined to the domain by a specific user
$UserName = Read-Host -Prompt "Enter username"
$UserSID = (Get-ADUser $UserName -Property objectsid).objectsid
Get-ADComputer -SizeLimit 0 -LdapFilter "(&(objectcategory=computer)(mS-DS-CreatorSid=$UserSID)"
```

## With Quest Active Directory PowerShell snappin

```powershell
# Find computers joined to the domain by a specific user
$UserName = Read-Host -Prompt "Enter username"
$UserSID = (Get-QADUser -Identity $UserName -IncludeAllProperties).objectsid
Get-QADComputer -SizeLimit 0 -LdapFilter "(&(objectcategory=computer)(mS-DS-CreatorSid=$UserSID)"
```