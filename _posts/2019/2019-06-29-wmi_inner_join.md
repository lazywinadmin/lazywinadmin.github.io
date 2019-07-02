---
layout: single
title: "PowerShell - Joining WMI Classes in a query"
excerpt: "Recently a friend asked how to list the IPAddresses of machines present in a specific SCCM Collection"
permalink:
tags: 
  - powershell
  - sccm
  - wmi
categories:
  - powershell
published: true
header:
  teaserlogo:
  teaser: ''
  image: images/headers/Code04_1920x500.jpg
  caption: 'unsplash.com'
gallery:
  - image_path: ''
    url: ''
    title: ''
toc: true
toc_label: "Table of content"
---

## Quick tip - How to do a JOIN between two WMI classes ?

Having done a ton of WMI work around SCCM/SCSM in the past, my friend [@stephanevg](https://twitter.com/stephanevg) asked how to retrieve the IP Addresses information of a Device Collection members efficiently.

*(As far as I know, it's a bit less efficient to do this with the SCCM Module. 2 queries: Query Collection Members Then Query Device information)*

You can accomplish this by using the `INNER JOIN` operator and specifying the common property on which the classes will be joined.

```powershell
# Our Environment variables
$SCCMServer = "MySCCMServer"
$SCCMSiteCode = "MySCCMServer"
$SCCMCollectionID = "SMS00001"

# Define parameters
$Param = @{
    ComputerName    = $SCCMServer
    NameSpace       = "root\sms\site_$SCCMSiteCode"
}

# Query WMI
Get-WmiObject @Param -Query "
    SELECT * FROM sms_fullcollectionmembership
    INNER JOIN sms_r_system
    ON sys.resourceid=sms_fullcollectionmembership.resourceid
    WHERE sms_collectionmembership.collectionid='$SCCMCollectionID'"
```

This will return the entries for each device in the collection.

But as you can see the data is not very explicit.

```text
__GENUS                       : 2
__CLASS                       : __GENERIC
__SUPERCLASS                  :
__DYNASTY                     : __GENERIC
__RELPATH                     :
__PROPERTY_COUNT              : 2
__DERIVATION                  : {}
__SERVER                      : MySCCMServer
__NAMESPACE                   : root\sms\site_ABC
__PATH                        :
sms_fullcollectionmembership  : System.Management.ManagementBaseObject
sms_r_system                  : System.Management.ManagementBaseObject
PSComputerName                : MySCCMServer

__GENUS                       : 2
__CLASS                       : __GENERIC
__SUPERCLASS                  :
__DYNASTY                     : __GENERIC
__RELPATH                     :
__PROPERTY_COUNT              : 2
__DERIVATION                  : {}
__SERVER                      : MySCCMServer
__NAMESPACE                   : root\sms\site_ABC
__PATH                        :
sms_fullcollectionmembership  : System.Management.ManagementBaseObject
sms_r_system                  : System.Management.ManagementBaseObject
PSComputerName                : MySCCMServer

__GENUS                       : 2
__CLASS                       : __GENERIC
__SUPERCLASS                  :
__DYNASTY                     : __GENERIC
__RELPATH                     :
__PROPERTY_COUNT              : 2
__DERIVATION                  : {}
__SERVER                      : MySCCMServer
__NAMESPACE                   : root\sms\site_ABC
__PATH                        :
sms_fullcollectionmembership  : System.Management.ManagementBaseObject
sms_r_system                  : System.Management.ManagementBaseObject
PSComputerName                : MySCCMServer
```

However you'll notice the output contains the 2 WMI classes present in our query

* **sms_r_system** : Represent the device information
* **sms_fullcollectionmembership** : Represent the collection member information

We can easily drill into the device data by expanding the property `sms_r_system`

```powershell
# Query WMI
Get-WmiObject @Param -Query "
    SELECT * FROM sms_fullcollectionmembership
    INNER JOIN sms_r_system
    ON sys.resourceid=sms_fullcollectionmembership.resourceid
    WHERE sms_collectionmembership.collectionid='$SCCMCollectionID'" |
    Select-Object -Expand sms_r_system
```

This will contains all the information about the device such as `IPAddresses`, `MacAddresses`, `ResourceID`, ...

ℹ️ **Note**: Yes I'm aware the `CIM` module should be used here instead of *wmiObject* cmdlets, just needed a quick query 🚀

If you want to learn more about Using WMI with PowerShell, I highly recommend the free book written by Ravikanth Chaganti [WMI Query Language via PowerShell](https://www.ravichaganti.com/blog/ebook-wmi-query-language-via-powershell/)
