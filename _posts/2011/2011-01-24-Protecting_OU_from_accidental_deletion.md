---
layout: single
title: Protecting OU from accidental deletion
excerpt: 
permalink: /2011/01/protecting-ou-from-accidental-deletion.html
tags: 
- active directory
- powershell
published: true
comments: true
categories:
- powershell
---

When you create new Organizational Units in Active Directory Users And Computers (ADUC) in Server 2008 (or with RSAT on 2003 domains), ADUC gives you the option to protect the OU from accidental deletion.

![image-center]({{ site.url }}/images/2011/20110124_Protecting_OU_from_accidental_deletion/ou_thumb_43BA9F4B__774877284__-426x363.png){: .align-center}

When this option is selected, ADUC updates the security descriptor of the object and, potentially, its parent, with Deny ACE for the Everyone domain group, which denies all administrators or users of this domain and domain controller the ability to delete this object.

![image-center]({{ site.url }}/images/2011/20110124_Protecting_OU_from_accidental_deletion/deny_thumb_6B316BB5__1853938117__-583x161.png){: .align-center}

**Note:** This setting does not provide protection against accidental deletion of a subtree that contains the protected object. Therefore, it is recommend that you enable this setting for all the protected object's containers up to the domain naming context head. If you try to delete the OU you'll get the following dialog:

![image-center]({{ site.url }}/images/2011/20110124_Protecting_OU_from_accidental_deletion/outest_thumb_683C0702__756729131__-447x160.png){: .align-center}

To unprotect a container uncheck the value from the object's *Object* tab in ADUC. The *Object* tab is visible only when*Advanced Features *is selected on the *View* menu.

![image-center]({{ site.url }}/images/2011/20110124_Protecting_OU_from_accidental_deletion/object_thumb_5A894AFA__1822522698__-384x426.png){: .align-center}

With [PowerShell](http://www.microsoft.com/powershell) and [Quest AD cmdlets](http://www.quest.com/powershell/activeroles-server.aspx) we can enable or disable OU protection with a single line of code!

## Enable OU protection on all OUs

```powershell
Get-QADObject –SizeLimit 0 -Type OrganizationalUnit |
Add-QADPermission `
 -Deny `
 -Account Everyone `
 -ApplyTo ThisObjectOnly `
 -Rights DeleteTree,Delete 
```

## Enable protection for specific OU

```powershell
Add-QADPermission `
 -Identity 'DistinguishedNameOfTheOU' `
 -Deny `
 -Account Everyone `
 -ApplyTo ThisObjectOnly `
 -Rights DeleteTree,Delete
```

## Remove protection for specific OU

```powershell
Get-QADPermission `
 -Identity 'DistinguishedNameOfTheOU' `
 -Deny `
 -Account Everyone `
 -ApplyTo ThisObjectOnly |
Remove-QADPermission
```
