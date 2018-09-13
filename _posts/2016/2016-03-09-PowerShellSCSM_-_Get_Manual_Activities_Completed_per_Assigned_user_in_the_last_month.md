---
layout: single
title: PowerShell/SCSM - Get Manual Activities Completed per Assigned user in the last month
excerpt: 
permalink: /2016/03/powershellscsm-get-manual-activities_9.html
tags: 
- powershell
- scsm
- smlets
- system center 2012 service manager r2
published: true
comments: true
---

 
 <img imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;" border="0" src="{{ site.url }}/images/2016/20160309_PowerShellSCSM_-_Get_Manual_Activities_Completed_per_Assigned_user_in_the_last_month/SCSM_128x128x32__1666586661__-128x128.png" /> I wanted to expend a bit on [the previous post]({{ site.url }}/2016/03/powershellscsm-get-manual-activities.html) which retrieved all the Manual Activities completed in the last month.

I want to go a step further and get the top Users who closed the most Manual Activities in that period.


```powershell
# Smlets Module
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

# AssignedUser RelationshipClass
$RelationshipClass_AssignedUser = Get-SCSMRelationshipClass -Name System.WorkItemAssignedToUser$

# Search for Manual Activities, show the Ticket ID and the AssignedTo User's displayname
# Group per AssignedTo User and sort per Count
Get-SCSMObject -criteria $CriteriaObject|
    Select-Object -property Name, @{
        Label="AssignedTo";
        E={
            (Get-ScsmRelatedObject -SMObject $_ -Relationship $RelationshipClass_AssignedUser).displayname
        }
    }|
    Group-Object -Property AssignedTo |
    Sort-Object -Property Count -Descending
```



<i>This gives me the top users who closed Manual Activities</i>

<img border="0" src="{{ site.url }}/images/2016/20160309_PowerShellSCSM_-_Get_Manual_Activities_Completed_per_Assigned_user_in_the_last_month/SCSM-RA_Completed_Count_Per_AssignedUser_Last30Days__1509159500__-772x438.png" />

