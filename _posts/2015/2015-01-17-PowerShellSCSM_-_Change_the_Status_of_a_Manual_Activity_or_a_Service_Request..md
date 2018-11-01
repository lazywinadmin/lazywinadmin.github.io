---
layout: single
title: PowerShell/SCSM - Change the Status of a Manual Activity or a Service Request.
excerpt: 
permalink: /2015/01/powershellscsm-change-status-of-manual.html
tags: 
- powershell
- scsm
- smlets
- system center 2012
- system center 2012 service manager r2
published: true
comments: true
---


<a href="http://1.bp.blogspot.com/-8bFyb29nsMA/U_kuiKKDt8I/AAAAAAABnZw/ij11ovxajUc/s1600/SCSM_128x128x32.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-8bFyb29nsMA/U_kuiKKDt8I/AAAAAAABnZw/ij11ovxajUc/s1600/SCSM_128x128x32.png" /></a>Using the PowerShell module <a href="https://smlets.codeplex.com/" target="_blank">SMlets</a> you can easily change the Status of a Ticket inside System Center Service Manager.

Here are the small bits of code to change the Status of a Manual Activity and a Service Request.

```powershell
# Import the module
Import-Module -Name smlets

# Get a specific manual activity
$ManualActivity = Get-SCSMObject -Class (Get-SCSMClass -Name System.WorkItem.Activity.ManualActivity$) -filter "ID -eq MA51163"
# Change the status of the Manual Activity
Set-SCSMObject -SMObject $ManualActivity -Property Status -Value Completed

# Get a specific Service Request
$ServiceRequest = Get-SCSMObject -Class (Get-SCSMClass -Name System.WorkItem.ServiceRequest$) -filter "ID -eq SR51160"
# Change the status of the Service Request to Completed
Set-SCSMObject -SMObject $ServiceRequest -Property Status -Value Completed
```

## Status Enumerations

If you want to retrieve all the types of Enumerations and Classes, You can use a very neat tool called SCSM Entity Explorer <a href="https://gallery.technet.microsoft.com/SCSM-Entity-Explorer-68b86bd2" target="_blank">available on Technet</a> (for Free) created by <a href="http://blog.dietergasser.com/2014/05/08/scsm-entity-explorer/" target="_blank">Dieter Gasser</a>.

> <b><u>SCSM Entity Explorer</u></b> is a tool for System Center Service Manager (SCSM) administrators to help them browse and get information about the classes, enumerations and objects stored in the SCSM database.
<br><br>SCSM Entity Explorer allows you to browse classes and relationships in a easy to use tree view and to get all details about the entity types, such as properties and relationships. Using the built-in search, you can find classes and enums very quickly.<br><br>SCSM Entity Explorer allows you to retrieve a list of all instances of a class and to view the details of a class instance, including all its properties and related objects.  Last but not least you can open the Management Pack which defines your entity type in an XML editor of your choice with one single mouse-click. 

<a href="http://4.bp.blogspot.com/-h2M1GfTFaFg/VLnJHbhe3VI/AAAAAAABrC4/46NuVcSu8hQ/s1600/SCSM_Entity_Explorer.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-h2M1GfTFaFg/VLnJHbhe3VI/AAAAAAABrC4/46NuVcSu8hQ/s1600/SCSM_Entity_Explorer.png" height="475" width="640" /></a>

For example, here are the status available for an Activity based on the enumeration information I found in SCSM Entity Explorer.

Then you can retrieve the different status available using Get-SCSMEnumeration

```powershell
# Retrieve Activity Status
Get-SCSMEnumeration -Name ActivityStatusEnum
```

<a href="http://4.bp.blogspot.com/-ycI3BxF-erc/VLnJCSfPwqI/AAAAAAABrCw/v44QuhNHWlc/s1600/PowerShell_SCSM-Enumeration_Activity_Status.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-ycI3BxF-erc/VLnJCSfPwqI/AAAAAAABrCw/v44QuhNHWlc/s1600/PowerShell_SCSM-Enumeration_Activity_Status.png" /></a>

Same thing for the Service Request

```powershell
# Retrieve Service Request Status
Get-SCSMEnumeration -Name ServiceRequestStatusEnum
```

<a href="http://1.bp.blogspot.com/-qNh6Jlblfw4/VLnJOgNctII/AAAAAAABrDA/mSR718DiLNw/s1600/PowerShell_SCSM-Enumeration_ServiceRequest_Status.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-qNh6Jlblfw4/VLnJOgNctII/AAAAAAABrDA/mSR718DiLNw/s1600/PowerShell_SCSM-Enumeration_ServiceRequest_Status.png" /></a>