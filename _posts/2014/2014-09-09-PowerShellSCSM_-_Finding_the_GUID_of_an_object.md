---
layout: single
title: PowerShell/SCSM - Finding the GUID of an object
excerpt: 
permalink: /2014/09/powershellscsm-finding-guid-of-object.html
tags: 
- powershell
- scsm
- smlets
- system center 2012 r2
- system center 2012 service manager r2
published: true
comments: true
---

 
 <a href="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/SCSM_128x128x32__115304754__-128x128.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/SCSM_128x128x32__115304754__-128x128.png" /></a>Retrieving the GUID of an object in SCSM using PowerShell is sometime a bit challenging. For the WorkItems, this piece of information is not present in any Property available, you have to invoke the get_id method to retrieve it.

There is an 'ID' property which is misleading, it contains the number of the request, for example IR123456.

And for some other type of objects, such as the DomainUser or Enumeration objects the GUID is the..... ID property.


<u>Note</u>: I'm using the module SMlets, available here: <a href="https://smlets.codeplex.com/" target="_blank">https://smlets.codeplex.com/</a>

# Getting the GUID for a WorkItem

If you look at the property of an Incident for example, you will notice that there is no property that contains the GUID

<a href="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B12-30-26%252BAM__2126266851__-772x298.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B12-30-26%252BAM__2126266851__-772x298.png" /></a>
You will have to use the method get_id() to retrieve this information

<a href="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B12-01-56%252BAM__2133589236__-772x418.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B12-01-56%252BAM__2133589236__-772x418.png" /></a>

<b><u>Incident Request</u></b>

```
# Get a specific Incident Request
$IncidentRequest = Get-SCSMObject -Class (Get-SCSMClass -Name System.WorkItem.Incident$) -filter "ID -eq IR31437"

# Getting the GUID of this Work Item
$IncidentRequest.get_id()

```
<a href="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B12-29-01%252BAM__2017127624__-772x278.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B12-29-01%252BAM__2017127624__-772x278.png" /></a>



<b><u>Service Request</u></b>

```
# Get a specific Service Request
$ServiceRequest = Get-SCSMObject -Class (Get-SCSMClass -Name System.WorkItem.ServiceRequest$) -filter "ID -eq SR31467"

# Getting the GUID of this Work Item
$ServiceRequest.get_id()
```

<a href="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B12-44-23%252BAM__1266271804__-772x278.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B12-44-23%252BAM__1266271804__-772x278.png" /></a>

<b><u>Review Activity</u></b>

```
# Get a specific review activity
$ReviewActivity = Get-SCSMObject -Class (Get-SCSMClass -Name System.WorkItem.Activity.ReviewActivity$) -filter "ID -eq RA31724"

# Get the GUID of this Work Item
$ReviewActivity.get_id()
```

<a href="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B10-40-30%252BPM__1790051538__-772x278.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B10-40-30%252BPM__1790051538__-772x278.png" /></a>

<b><u>ManualActivity</u></b>

```
# Get a specific manual activity
$ManualActivity = Get-SCSMObject -Class (Get-SCSMClass -Name System.WorkItem.Activity.ManualActivity$) -filter "ID -eq MA45345"

# Get the GUID of this Work Item
$ManualActivity.get_id()
```



<b><u>Runbook Activity</u></b>

```
# Get a Runbook Activity
$RunbookActivity = Get-SCSMObject -Class (Get-SCSMClass -Name Microsoft.SystemCenter.Orchestrator.RunbookAutomationActivity$) -filter 'ID -eq RB30579'

# Retrieve the ID property
$RunbookActivity.id

# Retrieve the GUID
$RunbookActivity.get_id()
```

<a href="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B11-27-10%252BPM__1914218625__-772x278.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B11-27-10%252BPM__1914218625__-772x278.png" /></a>




# Getting the GUID for other objects


<b><u>Domain User</u></b>

```
# Query a Domain User from the CMDB
$DomainUser = Get-SCSMObject -Class (Get-SCSMClass -Name Microsoft.AD.User$) -Filter "LastName -eq Cat"

# Get the GUID of this CI
$DomainUser.id
```

<a href="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B12-55-54%252BAM__483067059__-772x418.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B12-55-54%252BAM__483067059__-772x418.png" /></a>

<b><u>Domain Computer</u></b>

```
# Get a computer object from the CMDB
$ComputerObject = Get-SCSMObject -Class (Get-SCSMClass -Name Microsoft.Windows.Computer$) -Filter "Displayname -eq MTLLAP8500"

# Retrieve the ID
$ComputerObject.id

# Retrieve the ID using the Get_ID() method.
$ComputerObject.get_id()
```

<a href="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B11-13-56%252BPM__481123987__-772x378.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140909_PowerShellSCSM_-_Finding_the_GUID_of_an_object/9-9-2014%252B11-13-56%252BPM__481123987__-772x378.png" /></a>





