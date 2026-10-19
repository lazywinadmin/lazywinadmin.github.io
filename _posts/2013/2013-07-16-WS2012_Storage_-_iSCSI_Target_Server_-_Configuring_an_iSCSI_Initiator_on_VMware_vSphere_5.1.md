---
description: "I recently switched the backend storage of my VMware vSphere 5.1 Home Lab from FreeNas (OS based on UNIX) to iSCSI (Windows Server 2012 Storage Feature)."
layout: single
title: WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1
seo_title: "WS2012 iSCSI Target: Configure a vSphere 5.1 iSCSI Initiator"
excerpt: 
permalink: /2013/07/configuring-iscsi-initiator-on-vmware.html
tags: 
- datastore
- homelab
- iscsi
- lab
- lun
- powercli
- powershell
- storage
- vmware
- vsphere 5.1
- windows server 2012
published: true
comments: true
---

<a href="{{ site.url }}/images/2013/20130716_WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5.1/1374031693_data-center-px-png__1670533526__-128x128.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img alt="Image from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/20130716_WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5.1/1374031693_data-center-px-png__1670533526__-128x128.png" /></a>I recently switched the backend storage of my VMware vSphere 5.1 Home Lab from FreeNas (OS based on UNIX) to iSCSI (Windows Server 2012 Storage Feature). The reason is that I wanted to play with the PowerShell iSCSI modules and do some tests with SMB v3.0.

In a previous post I showed <a href="{{ site.url }}/2013/07/create-iscsi-target-using-powershell-on.html" target="_blank">how to create an iSCSI target using PowerShell on Windows Server 2012</a>. Today I will demonstrate how I set the VMware vSphere 5.1 Software iSCSI Adapter using PowerCli and create the datastore using the LUN<a href="{{ site.url }}/2013/07/create-iscsi-target-using-powershell-on.html" target="_blank">created in my previous post</a>. I won't cover how to assign the iSCSI traffic to a dedicated PortGroup and dedicated NICs.





### <span style="font-size: x-large;">Overview

In the following post I will cover the following points:

* <b>Terminology</b>

* <b><u style="background-color: white;">PowerCli</u></b>

* <b>Configuring the iSCSI Initiator on VMware vSphere 5.1</b>

* Turn On the iSCSI Initiator

* Add a new iSCSI Target Address

* Refresh HBA / Rescan Datastores

* <b>Creating a new Datastore using the presented iSCSI Lun</b>

* Find the lun Canonical Name

* Create the new Datastore

* Note on creating small LUN (<1GB)

* <b><u>GUI/VMware vSphere Client</u></b>

* <b>Configuring the iSCSI Initiator on VMware vSphere 5.1</b> (step by step)

* <b>Creating a new Datastore using the presented iSCSI Lun</b>(step by step)
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-16_7-27-00_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img loading="lazy" decoding="async" alt="iSCSI Target Initiator" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-16_7-27-00_PM.png" title="iSCSI Architecture" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><i>Quick overview of my iSCSI Lab architecture</i></td></tr></tbody></table>



### <span style="font-size: x-large;">Terminology

<b>
</b><b>iSCSI</b> <b>Target</b>/<b>Initiator</b>/<b>IQN</b>... : Please check my<a href="{{ site.url }}/2013/07/create-iscsi-target-using-powershell-on.html" target="_blank">previous post</a>.

<b>HBA</b>:A <b>H</b>ost <b>B</b>us <b>A</b>dapter (HBA) is a circuit board and/or integrated circuit adapter that provides input/output (I/O) processing and physical connectivity between a server and a storage device.
<a href="{{ site.url }}/images/2013/20130716_WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5.1/c01319958__160352555__-400x400.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 2 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" height="320" src="{{ site.url }}/images/2013/20130716_WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5.1/c01319958__1117159064__-320x320.jpg" width="320" /></a>

<b>LUN:</b>A Logical Unit Number (LUN) is a unique identifier used to designate individual or collections of hard disk devices for address by a protocol associated with a SCSI, iSCSI, Fibre Channel (FC) or similar interface. LUNs are central to the management of block storage arrays shared over a storage area network (SAN).
<a href="{{ site.url }}/images/2013/20130716_WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5.1/1374031479_storage_4__7001916__-256x256.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" target=""><img loading="lazy" decoding="async" alt="LUN" border="0" height="200" src="{{ site.url }}/images/2013/20130716_WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5.1/1374031479_storage_4__1547374468__-200x200.png" title="Logical Unit Number" width="200" /></a>
<b>VMFS</b>:<b></b>VMwareÂ® vStorage<b>V</b>irtual<b>M</b>achine<b>F</b>ile<b>S</b>ystem (VMFS) is a high-performance cluster file system that provides storage virtualization optimized for virtual machines.It is a prerequisite when you wish build your virtual infrastructure using vmware, as default storing system for virtual machine files on shared storage as Fibre Channel and iSCSI SAN disks and partitions. The current version of VMFS is VMFS 5.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130716_WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5.1/VMFS-image-body2__962670580__-868x786.jpg" imageanchor="1" style="margin-left: auto; margin-right: auto;" target=""><img loading="lazy" decoding="async" alt="VMFS" border="0" height="361" src="{{ site.url }}/images/2013/20130716_WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5.1/VMFS-image-body2__1961390__-400x362.jpg" title="VMFS Virtual Machine File System" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><a href="https://web.archive.org/web/20130703073511/http://www.vmware.com/products/datacenter-virtualization/vsphere/vmfs.html" target="_blank">source</a></td></tr></tbody></table>

<span style="font-size: x-large;">

<span style="font-size: x-large;">

### <span style="font-size: x-large;"><u>Using POWERCLI</u>


### <span style="font-size: x-large;">Configuring the iSCSI Initiator on VMware vSphere 5.1<span style="font-weight: normal;"> (PowerCli)

<h4>Pre-requisites

In order to work with the PowerCli cmdlets, you will need to load the PowerShell Snapin <b>VMware.VimAutomation.Core.</b>

```
# Load PowerCli Cmdlets
Add-PSSnapin VMware.VimAutomation.Core

# Connect to my VMware vCenter or your VMware host
# I will get prompted for Credential
Connect-VIServer lab1vh02.fx.lab -Credential (Get-Credential)



```
```
<h4 style="font-family: 'Times New Roman'; white-space: normal;">

Turn On the iSCSI Initiator


<span style="font-family: 'Times New Roman'; white-space: normal;">To be able to connect to the iSCSI Target Server and see the target, you will need to enable the iSCSI Software Adapter on each of your host



```

```
# Turn on the iSCSI Initiator on my VMware vSphere host (lab1vh02.fx.lab)
Get-VMHostStorage -VMHost lab1vh02.fx.lab | Set-VMHostStorage -SoftwareIScsiEnabled $True
```
```

```
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_8-49-53_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 3 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_8-49-53_PM.png" /></a>
```


```
```
<h4 style="font-family: 'Times New Roman'; white-space: normal;">

Add a new iSCSI Target Address


<span style="font-family: 'Times New Roman'; white-space: normal;">Then set the IP Address of the iSCSI Target Server to be able to connect to the iSCSI Targets

```
```
<span style="font-family: 'Times New Roman'; white-space: normal;">

```

```
# Set the iSCSI Target Server (192.168.1.10) on my VMware vSphere Host (lab1vh02.fx.lab)
Get-VMHostHba -VMHost lab1vh02.fx.lab -Type iScsi | 
    New-IScsiHbaTarget -Address 192.168.1.10

```
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_8-49-12_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 4 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_8-49-12_PM.png" /></a>
```


```
```
<h4 style="font-family: 'Times New Roman'; white-space: normal;">

Refresh HBA / Rescan Datastore


<span style="font-family: 'Times New Roman'; white-space: normal;">Finally you will need to rescan the HBA and VMFS volumes in order to be able to add the new datastore(s).
```

```

# Performs a Rescan on all HBAs and VMFS volumes
Get-VMHostStorage -VMHost lab1vh02.fx.lab -RescanAllHba
Get-VMHostStorage -VMHost lab1vh02.fx.lab -RescanVmfs


```


### <span style="font-size: x-large;">Creating a new Datastore on the presented iSCSI LUN (PowerCli)

<h4>Find the Lun Canonical Name

```
<span style="font-family: 'Times New Roman'; white-space: normal;">To create a datastore using the <span style="white-space: normal;"><span style="font-family: Courier New, Courier, monospace;">New-Datastore<span style="font-family: 'Times New Roman'; white-space: normal;"> cmdlet you will need to get the <span style="white-space: normal;"><span style="font-family: Courier New, Courier, monospace;">CanonicalName<span style="font-family: 'Times New Roman'; white-space: normal;"> property from the Lun you want to use.
```
```
<span style="font-family: 'Times New Roman'; white-space: normal;">

```

```
# Get the iSCSI LUN presented to this server where Microsoft is the vendor
Get-ScsiLun | Where-Object Vendor -like "MSFT"
```


<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-15_10-09-01_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 5 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-15_10-09-01_PM.png" /></a>

```
# Get only the Lun and store it in the $lun variable
$lun = Get-ScsiLun | Where-Object {(($_.Vendor -like "MSFT") -and ($_.CapacityGB -eq 10))}
```

```


```
```
<h4 style="font-family: 'Times New Roman'; white-space: normal;">
Create the new Datastore



# Finally create the datastore using the Lun 

```
```
New-Datastore -Vmfs -Path $lun.CanonicalName -Name Lun1
```

<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-15_10-10-04_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 6 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-15_10-10-04_PM.png" /></a><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-15_10-10-30_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 7 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-15_10-10-30_PM.png" /></a>

<b><u style="background-color: yellow;">Note:</u></b> Using the GUI you cannot create datastore smaller than 1.3 GB (You'll see the error a bit later in this post). <b>However with PowerCli YOU CAN !!!</b>
<b>
</b>Anyway it's kind of useless to have a datastore as small as 1GB...

<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-16_8-28-28_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 8 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-16_8-28-28_PM.png" /></a>
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-16_8-12-02_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 9 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-16_8-12-02_PM.png" /></a>


### <span style="font-size: x-large;"><u>Using the GUI/VMware vSphere Client</u>


### <span style="font-size: x-large;">Configuring the iSCSI Initiator on VMware vSphere 5.1<span style="font-weight: normal;">

<div class="separator" style="clear: both;">1 - On your VMware Host, select the tab <b>Configuration</b>, <b>Storage Adapters</b> and click on <b>Add...</b><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-20-04_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 10 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-20-04_PM.png" /></a>
2 - Here leave the "<b>Add Software iSCSI Adapter</b>" option and click <b>OK</b>
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-20-33_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 11 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-20-33_PM.png" /></a>3 - A warning message will show, click <b>OK</b> :
"<i>A new software iSCSI adapter will be added to the Storage Adapters list. After it had been added, select the software iSCSI adapter in the list and click on Properties to complete the configuration.</i>"
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-21-00_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 12 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-21-00_PM.png" /></a>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-21-25_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 13 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-21-25_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">You'll see the following message while the Software iSCSI Adapter is being added...</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-22-10_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 14 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-22-10_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Once added, you'll see the iSCSI Software Adapter with the iSCSI IQN of this server</td></tr></tbody></table>4 - Right click on it and select <b>Properties</b>
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-22-34_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 15 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-22-34_PM.png" /></a>5 - You'll see the message "A rescan of the host bus adapter is recommended for this configuration change. Rescan the adapter?". Click <b>Yes</b>
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-24-37_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 16 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-24-37_PM.png" /></a><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-25-57_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 17 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-25-57_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">You'll see the above activities in the vsphere client activities window.</td></tr></tbody></table>

6 - Select the <b>Dynamnic Discovery</b> <i>tab</i> and click <b>Add...</b> in the <b>Send Targets</b> area.
Enter the <b>iSCSI Server</b> (which is my Windows Server 2012 Server (192.168.1.10) in my case) and leave the default <b>Port</b> 3260. Click <b>OK</b> and click <b>Close</b> to continue.
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-27-28_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 18 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" height="400" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-27-28_PM_s400.png" width="377" /></a>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-26-18_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 19 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" height="216" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-26-18_PM_s640.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">In the detail window, you will see the LUN we created on Windows Server 2012.</td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-27-39_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 20 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" height="28" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-27-39_PM_s640.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Note: When we created the Virtual Disk/LUN, we could specify a LUN ID, this would show here.




</td></tr></tbody></table>
### <span style="font-size: x-large;">Creating a new Datastore on the presented iSCSI LUN


In my previous post I created a 1GB Lun which was too small for the following procedure.
If you do, you'll get the following error message on the final step. <b><u>To</u></b><b style="background-color: white;"><u>work-around this problem, use PowerCli ! Refer to "Creating a new datastore" above in this post.</u></b>

<div style="text-align: center;"><i><b>Error: The Capacity value must be at least 1.3 GB. Enter another value.</b></i>

<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-47-15_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 21 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-47-15_PM.png" /></a>
So I used a 10GB LUN for the following steps...

1 - In the <b>Configuration</b> tab of your VMware host, select <b>Storage</b> and Click on <b>Add Storage</b>

<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-28-51_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 22 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-07_7-28-51_PM.png" /></a>


2 - In the <i><b>Add Storage</b></i> Wizard, select <b>Disk/Lun </b>and click<b> Next</b>
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-38-38_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 23 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" height="312" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-38-38_PM_s400.png" width="400" /></a>


3 - Select a Disk/LUN to create a datastore, here I select my 10GB lun. Click <b>Next</b>.
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-46-56_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 24 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" height="312" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-46-56_PM_s400.png" width="400" /></a>

4 - Specify the version of the VMFS for the datastore. Select <b>VMFS-5</b> and click <b>Next</b>.
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-47-34_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 25 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" height="312" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-47-34_PM_s400.png" width="400" /></a>
<b>Note</b>: The table below depicts the most significant architectural changes for VMFS-5 in comparison to VMFS-3.
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-16_6-39-58_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img loading="lazy" decoding="async" alt="VMFS" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-16_6-39-58_PM.png" title="VMFS3 versus VMFS5" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><a href="https://web.archive.org/web/20130703073511/http://www.vmware.com/products/datacenter-virtualization/vsphere/vmfs.html" target="_blank">Source</a></td></tr></tbody></table>

5 - Review the current disk layout. Click <b>Next</b>.
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-47-44_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 26 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" height="312" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-47-44_PM_s400.png" width="400" /></a>
6 - Specify the datastore name. Click <b>Next</b>.
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-48-09_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 27 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" height="312" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-48-09_PM_s400.png" width="400" /></a>
7 - Specify the maximum file size and capacity of the datastore. Here select the <b>Maximum available space</b>. click <b>Next</b>.
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-48-26_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 28 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" height="312" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-48-26_PM_s400.png" width="400" /></a>
8 - Final step, review the disk layout and click <b>Finish</b> to end the Add Storage wizard.
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-48-42_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 29 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" height="312" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-48-42_PM_s400.png" width="400" /></a>

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-49-03_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 30 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-14_10-49-03_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Activity window show the creation of the VMFS datastore.</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-15_9-51-32_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 31 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-15_9-51-32_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Once created, the lun will be available in "<b>Storage</b>"</td></tr></tbody></table>
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-15_9-52-38_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 32 from the post &quot;WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Configuring_an_iSCSI_Initiator_on_VMware_vSphere_5_1/2013-07-15_9-52-38_PM.png" /></a>


### <span style="font-size: x-large;">References



* <b>VMFS -</b>[http://www.vmware.com/files/pdf/VMware-vStorage-VMFS-DS-EN.pd](http://www.vmware.com/files/pdf/VMware-vStorage-VMFS-DS-EN.pdf)



