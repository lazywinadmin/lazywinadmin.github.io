---
layout: single
title: PowerShell - Working with SID
excerpt: 
permalink: /2011/02/working-with-sid.html
tags: 
- powershell
- scripting
published: true
comments: true
categories:
- powershell
toc: true
---

I recently had to write mutliple scripts that were using a few different methods to convert SID to name and vice versa for Local and Active Directory accounts.

Here
Here is a PowerShell tip to convert Active Directory account from Name to SID and vice versa

## Local Account

### Name to SID

**With PowerShell and .Net**

```powershell
$objUser = New-Object System.Security.Principal.NTAccount("LOCAL_USER_NAME")
$strSID = $objUser.Translate([System.Security.Principal.SecurityIdentifier])
$strSID.Value
```

**With WMI**

```
wmic useraccount where name='test_user' get sid
```

### SID to Name

**With PowerShell and .Net**

```powershell
$objSID = New-Object System.Security.Principal.SecurityIdentifier `
    ("S-1-5-21-1454471165-1004335555-1606985555-5555")
$objUser = $objSID.Translate( [System.Security.Principal.NTAccount])
$objUser.Value
```

**With WMI**

```
wmic useraccount where sid='S-1-3-12-12451234567-1234567890-1234567-1434' get name
```

## Domain Account
### Name to SID

**With PowerShell and .Net**

```powershell
$objUser = New-Object System.Security.Principal.NTAccount("MyDomain", "TestUserAccount")
$strSID = $objUser.Translate([System.Security.Principal.SecurityIdentifier])
$strSID.Value
```

**With LDAP/ActiveDirectory module**

```powershell
Get-ADUser -Identity 'TestUserAccount' |
select-Object -Property SID
```

### SID to Name

**With PowerShell and .Net**

```powershell
$objSID = New-Object System.Security.Principal.SecurityIdentifier `
    ("S-1-5-21-1454471165-1004335555-1606985555-5555")
$objUser = $objSID.Translate( [System.Security.Principal.NTAccount])
$objUser.Value
```

**With LDAP/ActiveDirectory module**

```powershell
Get-ADUser -Identity S-1-3-12-12451234567-1234567890-1234567-1434
```