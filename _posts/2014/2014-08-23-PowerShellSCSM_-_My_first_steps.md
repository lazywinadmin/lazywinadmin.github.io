---
layout: single
title: PowerShell/SCSM - My first steps
excerpt: 
permalink: /2014/08/powershell-scsm-my-first-steps.html
tags: 
- powershell
- scsm
- scsm service request
- smlets
- system center 2012 service manager r2
published: true
comments: true
---

 
 <a href="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SCSM_128x128x32__1759738231__-128x128.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SCSM_128x128x32__1759738231__-128x128.png" /></a>I recently started to work with<a href="http://technet.microsoft.com/en-us/library/hh305220.aspx" target="_blank">System Center Service Manager 2012 R2</a>(also known as SCSM) which provides provides an integrated platform for automating and adapting an organization's IT service management best practices, such as those found in Microsoft Operations Framework (MOF) and Information Technology Infrastructure Library (ITIL). It provides built-in processes for incident and problem resolution, change control, and asset lifecycle management.



This platform can easily be integrated with the other products of the System Center suite. In my case we are using System Center Orchestrator at work (also known as SCO or SCORCH) to handle the background automation part.

I really started to play and learn about SCSM 2 months ago with the help of the consultants from<a href="http://www.prosum.com/" target="_blank">Prosum</a>(David Gibbons) and<a href="http://cireson.com/" target="_blank">Cireson</a>(<a href="http://systemcentersynergy.com/" target="_blank">Will Udovich</a>). Those guys also did a really awesome work and put in place some awesome processes using PowerShell Magic/SCSM and SCORCH, Thanks guys!




# Getting Started with SMLets to manage SCSM


Today I will show a few examples using the SMLets module that I learned in the past weeks.
SMLets download and documentation can be found here: <a href="https://smlets.codeplex.com/">https://smlets.codeplex.com/</a>

Before I start exploring some of the commands, I just wanted to point-out a very neat tool created by Dieter Gasser called <a href="http://gallery.technet.microsoft.com/SCSM-Entity-Explorer-68b86bd2" target="_blank">SCSM Entity Explorer</a>. This allow you to browse SCSM Classes and Enumerations. Because there is not a Smlets for everything, you can use the very flexible Get-SCSMObject and Get-SCSMClass to retrieve additional information.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/8-22-2014%252B10-03-43%252BPM__328577235__-953x487.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/8-22-2014%252B10-03-43%252BPM__328577235__-953x487.png" height="324" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">SCCM Entity Explorer</td></tr></tbody></table>
<span style="font-size: x-large;">Get the Service Requests objects


```
# Get List of all Service Request
Get-SCSMObject -Class (Get-SCSMClass -Name System.WorkItem.ServiceRequest$)
```
<a href="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/8-22-2014%252B9-52-29%252BPM__226504487__-772x778.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/8-22-2014%252B9-52-29%252BPM__226504487__-772x778.png" /></a>
<span style="font-size: x-large;">
<span style="font-size: x-large;">Get the Service Requests<u>created in the last 2 days</u>


```
# Get List of all Service Request modified in the last 2 days
Get-SCSMObject -Class (Get-SCSMClass -Name System.WorkItem.ServiceRequest$) -Filter "LastModified -gt $((Get-Date).Adddays(-2))"
```

<a href="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SCSM_SR_Last_two_days__451193997__-772x438.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SCSM_SR_Last_two_days__451193997__-772x438.png" /></a>

<span style="font-size: x-large;">Get the Service Requests <u>created in the last 2 days</u> with a status: <b>In Progress</b>

Here you can see how to filter on more than one criteria using the Get-SCSMObject.


```
# Get List of all Service Request modified in the last 2 days with an InProgress status
$ServiceRequestClass = Get-SCSMClass -Name System.WorkItem.ServiceRequest$
$ServiceRequestInProgressStatus = Get-SCSMEnumeration -Name ServiceRequestStatusEnum.InProgress$
$ServiceRequestInProgressStatusID = $ServiceRequestInProgressStatus.ID
$TwoDaysAgo = $((Get-Date).Adddays(-2))

Get-SCSMObject -Class $ServiceRequestClass -Filter "LastModified > '$TwoDaysAgo' AND Status = '$ServiceRequestInProgressStatusID'"
```

<a href="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SCSM_SR_InProgress_Modified_in_the_last_two_days__876218575__-772x338.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SCSM_SR_InProgress_Modified_in_the_last_two_days__876218575__-772x338.png" /></a>


<span style="font-size: x-large;">Get related object(s) of the Service Request



```
# Related Object of a Service request
$SRTicket = Get-SCSMObject -Class $ServiceRequestClass -Filter "LastModified > '$TwoDaysAgo' AND Status = '$ServiceRequestInProgressStatusID'" | Select-Object -Last 1
Get-SCSMRelatedObject -SMObject $SRTicket
```

<a href="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SR_RelatedObject__1223324536__-772x258.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SR_RelatedObject__1223324536__-772x258.png" /></a>
<span style="font-size: x-large;">
<span style="font-size: x-large;">Get r<span style="font-size: x-large;">elationship object(s)<span style="font-size: x-large;">of the Service Request


```
# Retrieve Relationship Object(s)
Get-SCSMRelationshipObject -BySource $SRTicket
```

<a href="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SR_RelationShipObject__80731515__-757x703.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SR_RelationShipObject__80731515__-757x703.png" /></a>


<span style="font-size: x-large;">Get r<span style="font-size: x-large;">elationship object(s) TargetObject and RelationshipID<span style="font-size: x-large;">of the Service Request


```
# Retrieve Relationship Object. Select the property TargetObject and RelationshipID
Get-SCSMRelationshipObject -BySource $SRTicket |
    Select-Object -Property TargetObject,RelationshipID
```

For the next step we will re-use the Active Directory Object type (ID:d96c8b59-8554-6e77-0aa7-f51448868b43)
<a href="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SR_RelationShipObject_targetobj_relationID__1573650665__-772x458.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SR_RelationShipObject_targetobj_relationID__1573650665__-772x458.png" /></a>


<span style="font-size: x-large;">Get r<span style="font-size: x-large;">elationship object(s) and filter on Active Directory objects
Those elements are queried to the CMDB of SCSM, not to ActiveDirectory.


```
# Retrieve Relationship Objects with a specific relationship (in this case AD objects(Computers, Users and Groups)).
Get-SCSMRelationshipObject -BySource $SRTicket -Filter "RelationshipID -eq 'd96c8b59-8554-6e77-0aa7-f51448868b43'"
```

<a href="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SR_RelationShipObject_filter_AD_Obj__352979738__-772x498.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140823_PowerShellSCSM_-_My_first_steps/SR_RelationShipObject_filter_AD_Obj__352979738__-772x498.png" /></a>


# Resources

<ul>
* <a href="http://technet.microsoft.com/en-us/library/hh305220.aspx" target="_blank">Technet Documentation</a>

* <a href="http://www.microsoft.com/en-ca/download/details.aspx?id=27850" target="_blank">Technical Documentation Download for SCSM2012</a>

* Technet Videos
<ul>
* <a href="http://blogs.technet.com/b/servicemanager/archive/2011/11/10/demo-automating-service-request-fulfillment-from-the-scsm-service-catalog-with-orchestrator-real-world-examples.aspx#3464611" target="_blank">Demo: Automating Service Request Fulfillment from the SCSM Service Catalog with Orchestrator–Real World Examples</a>
</ul>
* <a href="http://technet.microsoft.com/en-ca/virtuallabs/bb467605.aspx" target="_blank">Technet Virtual Labs</a> (Search for 'Service Manager')

* Microsoft Virtual Academy
<ul>
* <a href="http://www.microsoftvirtualacademy.com/training-courses/system-center-2012-orchestrator-service-manager" target="_blank">System Center 2012: Orchestrator (SCO) &amp; Service Manager (SCSM)</a>

* <a href="http://www.microsoftvirtualacademy.com/training-courses/automation-self-service-with-system-center-2012-r2" target="_blank">Automation &amp; Self-Service with System Center 2012 R2</a>
</ul>
* Technet Blog
<ul>
* <a href="http://blogs.technet.com/b/antoni/archive/2014/04/09/system-center-2012-service-manager-and-orchestrator-integration-example-walkthrough-start-to-finish-new-hire-provisioning-service-request.aspx" target="_blank">System Center 2012 Service Manager and Orchestrator Integration Example Walkthrough Start-to-Finish - New Hire Provisioning Service Request</a>

* <a href="http://blogs.technet.com/b/antoni/archive/2012/06/06/how-to-raise-an-incident-on-behalf-of-a-different-user.aspx" target="_blank">How to Raise an Incident on Behalf of a different person in the portal, using System Center 2012 Service Manager and Orchestrator</a>
</ul></ul>
# 


# Terminology

<a href="http://technet.microsoft.com/en-us/library/hh750212.aspx" target="_blank">See extensive SCSM Glossary (technet)</a>

<b>Configuration Item</b>
ITIL defines a configuration item (CI) as any component that needs to be managed in order to
deliver an IT Service. These could be a piece of hardware, software, documentation, a user
or group, location, or network.

<b>Work Item</b>
Incidents, change requests, and problems are represented as work items and stored in the
Service Manager database.

<b>Queue</b>
In Service Manager, a queue is a container that contains work items. When you change
the support group on an incident in Service Manager, you are sending the incident to
another queue.

<b>Class</b>
A named descriptor for a set of objects that share the same attributes, operations, methods, relationships, and behaviors. For example, all logical hard disks are members of the logical disk class.
Properties of the logical disk class include size, file system, and defrag level. Other
attributes members of a class can share are relationships and behaviors.

<b>Service Request</b>
A work item that is used to request an existing IT service that is being offered.

<b>Management Pack</b>
Management packs are eXtensible Markup Language (XML) files containing definitions
that define not only data models but also objects such as views for the Service
Manager console, workflows, groups, queues, tasks, forms, connectors, and so on. All
customizations are stored in MPs. For example, if you want to modify the incident form,
you save your modification from the Authoring Tool in an MP and then import it into
Service Manager.


