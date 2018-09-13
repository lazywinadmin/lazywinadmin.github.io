---
layout: single
title: PowerShell/SCSM - Get Manual Activities Completed in the last month
excerpt: 
permalink: /2016/03/powershellscsm-get-manual-activities.html
tags: 
- powershell
- scsm
- smlets
- system center 2012 service manager r2
published: true
comments: true
---

 
<img imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;" border="0" src="{{ site.url }}/images/2016/20160308_PowerShellSCSM_-_Get_Manual_Activities_Completed_in_the_last_month/SCSM_128x128x32__596339289__-128x128.png" /> I got an interested question from a reader that asked how he could get all the Manual Activities completed in the last 30 days using one Filter.

I got some trouble working with ```Get-SCSMObject``` and multiple conditions in the ```-Filter``` parameter, but got it working using the ```-Criteria``` parameter. Hope this help!


```powershell
# Import Smlets Module
Import-module -name Smlets

# Get the Manual Activity Class
$MAClass = Get-SCSMClass -Name System.WorkItem.Activity.ManualActivity$

# Get the Manual Activity Completed Status Enumeration
$MAStatusCompleted = Get-SCSMEnumeration -Name ActivityStatusEnum.Completed$

# Get the starting date from where we are searching
$MAModifiedDay = (Get-date).Adddays(-30)

# Get the Criteria Class
$CriteriaClass = "Microsoft.EnterpriseManagement.Common.EnterpriseManagementObjectCriteria"

# Define the Filter
$Filter = "Status = '$($MAStatusCompleted.Id)' AND LastModified > '$MAModifiedDay'"

# Create de Criteria Object
$CriteriaObject = new-object $CriteriaClass $Filter, $MAClass

# Search for Manual Activities
Get-SCSMObject -criteria $CriteriaObject
```

<img border="0" src="{{ site.url }}/images/2016/20160308_PowerShellSCSM_-_Get_Manual_Activities_Completed_in_the_last_month/SCSM-MA_Completed_Last30Days__1591645324__-772x418.png" />


