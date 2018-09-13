---
layout: single
title: PowerShell/SCSM - Get the Work Item parent of an Activity
excerpt: 
permalink: /2016/02/powershellscsm-get-work-item-parent-of.html
tags: 
- orchestrator
- powershell
- scorch
- scsm
- smlets
- system center 2012 orchestrator
- system center 2012 service manager r2
published: true
comments: true
---

 
 <a href="{{ site.url }}/images/2016/20160223_PowerShellSCSM_-_Get_the_Work_Item_parent_of_an_Activity/SCSM_128x128x32__859657984__-128x128.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2016/20160223_PowerShellSCSM_-_Get_the_Work_Item_parent_of_an_Activity/SCSM_128x128x32__109657511__-128x128.png" /></a>
In the last couple of months, I have been busy on some projects involving System Center Service Manager (SCSM), System Center Orchestrator (SCORCH) and Cireson Portal/Asset Management and I had to script a couple of repetitive tasks using PowerShell.

The following solution allows you to retrieve the parent Work Item of an Activity.

This is useful when you are using a Runbook Activity in your workflow that will invoke a Runbook inside System Center Orchestrator.

Example: In the case where you have a Work Item, a Service Request for instance, with bunch of activities (`Review Activity (RA)`, `Manual Activity (MA)`, `Runbook Activity (RBA)`, etc... ). You could have a `Runbook Activity (RBA)` calling a System Center Orchestrator runbook.


<img border="0" height="280" src="{{ site.url }}/images/2016/20160223_PowerShellSCSM_-_Get_the_Work_Item_parent_of_an_Activity/SCSM_ParentWorkItem2__184109716__-523x459.png" width="50%" />

From a SCORCH perspective it would be useful to find which Work Item the runbook activity belongs to if you want to perform some actions on the Work Item itself and other Activities.

Example:
* Edit the Work Item Title,
* Add a reviewer,
* Skip any Activities with a particular stage, etc...

Here is a PowerShell function that can just do this job for you: `Get-SCSMWorkItemParent`.





# Get-SCSMWorkItemParent

```powershell
# Load the function in your PS
. .\Get-SCSMWorkItemParent.ps1

# Or just copy the function in your powershell
```

<img border="0" src="{{ site.url }}/images/2016/20160223_PowerShellSCSM_-_Get_the_Work_Item_parent_of_an_Activity/Get-SCSMWorkItemParent01__1014006979__-774x260.png" />



# Find the Work Item parent from an SMObject
```powershell
# Get a Runbook Activity from SCSM
$RunbookActivity = Get-SCSMobject -Class (Get-SCSMClass -Name Microsoft.SystemCenter.Orchestrator.RunbookAutomationActivity$) -filter 'ID -eq RB12813'
# Get the RunbookActivity's WorkItem (parent)
Get-SCSMWorkItemParent -WorkItemObject $RunbookActivity
```

<img border="0" src="{{ site.url }}/images/2016/20160223_PowerShellSCSM_-_Get_the_Work_Item_parent_of_an_Activity/Get-SCSMWorkItemParent02__776952508__-776x362.png" />


# Find the Work Item parent from a GUID

```powershell
# Retrieve the runbook Activity GUID
$RunbookActivity.get_id()
# Get the RunbookActivity's WorkItem (Parent) from the object GUID
Get-SCSMWorkItemParent -WorkItemGUID $RunbookActivity.get_id()
```

<img border="0" src="{{ site.url }}/images/2016/20160223_PowerShellSCSM_-_Get_the_Work_Item_parent_of_an_Activity/Get-SCSMWorkItemParent03__774232314__-773x400.png" />



# Download on github

[Get-SCSMWorkItemParent on GitHub](https://github.com/lazywinadmin/PowerShell/tree/master/SCSM-Get-SCSMWorkItemParent)


# Resources

* <a href="{{ site.url }}/2014/09/powershell-scsm-install-and-config.html" target="_blank">PowerShell/SCSM - Install and Config the SMlets Module</a>
* <a href="{{ site.url }}/2014/08/powershell-scsm-my-first-steps.html" target="_blank">PowerShell/SCSM - Getting Started with Smlets</a>
* <a href="{{ site.url }}/2014/09/powershellscsm-finding-guid-of-object.html" target="_blank">PowerShell/SCSM - Finding the GUID of an object</a>