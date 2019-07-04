---
layout: single
title: PowerShell - Check the GPO Replication accross your domain
excerpt: 
permalink: /2014/10/powershell-check-gpo-replication.html
tags: 
- activedirectory
- activedirectory module
- group policy object
- powershell
published: true
comments: true
---


<a href="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/Active_Directory_GPO_Replication__1735484773__-144x118.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/Active_Directory_GPO_Replication__1735484773__-144x118.png" /></a>A couple of days ago we had to troubleshoot some SYSVOL replication issues throughout the domain. I wanted to check the version of the GPO that was modified recently and make sure it was replicated on all the Domain Controllers.

I created a small function called `Get-ADGPOReplication` to easily compare the versions of each Group Policy Objects (User and Computer Configurations) on each Domain Controllers in the Domain.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/Get-ADGPOReplication_OutGridView__788289059__-777x301.png" imageanchor="1" style="margin-left: auto; margin-right: auto; text-align: center;"><img border="0" src="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/Get-ADGPOReplication_OutGridView__788289059__-777x301.png" height="153" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Get-ADGPOReplication sent to Out-Gridview</td></tr></tbody></table>

# Retrieving the GPO Version and SysVol Version

As you probably know, you'll find 2 types of configurations inside each GPO: User and Computer.
The Cmdlet [`Get-GPO`](http://technet.microsoft.com/en-us/library/ee461059.aspx) (From the module [GroupPolicy]("http://technet.microsoft.com/en-us/library/ee461027.aspx)) give us some great details on the versions number and the SysVol versions of those configurations.

```powershell
Get-GPO -Name AZE_Test
```

<a href="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/Get-GPO_AZE_Test__1886206204__-772x358.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/Get-GPO_AZE_Test__1886206204__-772x358.png" /></a>
From this output, we can notice the properties <b>UserVersion</b> and <b>ComputerVersion</b>that give information about the GPO Version and SysVol Version. Those properties which are generated and available in the default view won't show if you look at all the properties/methods available (using Get-Member).

You'll have to dig into the property<b>Computer</b>and<b>User</b>to get the versions details.

```powershell
Get-GPO -Name AZE_Test | Get-Member
```

<a href="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/Get-GPO_GetMember__700589454__-772x738.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/Get-GPO_GetMember__700589454__-772x738.png" /></a>

```powershell
(Get-GPO -Name AZE_Test).Computer | Get-Member
```

<a href="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/GPO_Computer_GetMember__816801375__-772x398.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/GPO_Computer_GetMember__816801375__-772x398.png" /></a>
You need to inspect the property Computer to finally find the versions information.

```powershell
(Get-GPO -Name AZE_Test).Computer
```

<a href="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/9-30-2014%252B1-17-57%252BPM__690915297__-772x238.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/9-30-2014%252B1-17-57%252BPM__690915297__-772x238.png" /></a>
Same information is available for the User Configuration.

<a href="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/User_Computer_GetMember__1676378068__-772x398.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/User_Computer_GetMember__1676378068__-772x398.png" /></a>

# Function Get-ADGPOReplication

`Get-ADGPOReplication` is retrieving the GPO version and Sysvol version accross the domain for one or more Group Policy objects. This can especially helps you troubleshooting replication issues.

This small function is taking advantage of the module <b>ActiveDirectory</b> to retrieve the list of all Domain Controllers and the module <b>GroupPolicy</b> to query one or more Group Policy objects.

For each GPO, It will then retrieve the version of the User/Computer configurations and the Sysvol Version.

Getting the list of Domain Controllers

```powershell
$DomainControllers= ((Get-ADDomainController -filter *).hostname)
```

Processing each Group Policy Object, against each Domain controllers

```powershell
Foreach ($GPOItem in $GPOName)
{
    $GPO = Get-GPO -Name $GPOItem -Server $DomainController -ErrorAction Stop

    [pscustomobject][ordered] @{
        GroupPolicyName = $GPOItem
        DomainController = $DomainController
        UserVersion = $GPO.User.DSVersion
        UserSysVolVersion = $GPO.User.SysvolVersion
        ComputerVersion = $GPO.Computer.DSVersion
        ComputerSysVolVersion = $GPO.Computer.SysvolVersion
    }#PSObject
}#Foreach ($GPOItem in $GPOName)
```

Here is the output you should expect
<a href="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/Get-ADGPOReplication__745571006__-465x396.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/Get-ADGPOReplication__745571006__-465x396.png" /></a>

Using the function against <u>one</u> GPO:

```powershell
Get-ADGPOReplication -GPOName "AZE_Test"
```

Using the function against <u>multiple</u> GPO:

```powershell
Get-ADGPOReplication -GPOName "AZE_Test", "AZE_Test2"
```

Using the function against <u>All</u> GPO:

```powershell
Get-ADGPOReplication -All
```

Optionally you can <u>send the output to Out-Gridview</u> which will give you a very nice view on all your GPO versions.

```powershell
Get-ADGPOReplication -GPOName AZE_Test | Out-GridView -Title "AZE_Test $(Get-Date)"
```

<a href="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/Get-ADGPOReplication_OutGridView__788289059__-777x301.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141001_PowerShell_-_Check_the_GPO_Replication_accross_your_domain/Get-ADGPOReplication_OutGridView__788289059__-777x301.png" /></a>

<b>Download on <a href="https://github.com/lazywinadmin/PowerShell/tree/master/AD-GPO-Get-ADGPOReplication" target="_blank">GitHub</a></b>
<b>Download on <a href="http://gallery.technet.microsoft.com/Get-GPO-Replication-4db47c83" target="_blank">Technet Gallery</a></b>
