---
description: "For my Virtual Machines needs, some LUNS are presented to my VMware vSphere 5.1 Servers and until now,my labstorage was handle byFreeNas using iSCSI.For…"
layout: single
title: WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell
seo_title: "WS2012: Create an iSCSI Target Using PowerShell"
excerpt: 
permalink: /2013/07/create-iscsi-target-using-powershell-on.html
tags:
- storage
- homelab
- powershell
- vmware
- windows server
published: true
comments: true
tldr: "Uses the PowerShell iSCSI modules on Windows Server 2012 to replace FreeNAS as the iSCSI storage for a VMware vSphere 5.1 home lab. It covers iSCSI terminology, installing the iSCSI Target Server feature, creating an iSCSI virtual disk (LUN), creating a target for one or more initiators, finding the initiator IQN with the vSphere Client or PowerCLI, and mapping the LUN to the target."
---
<a href="{{ site.url }}/images/2013/20130711_WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/Ethernet-Cable-icon__744673510__-256x256.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img alt="Ethernet Cable icon" loading="lazy" decoding="async" border="0" height="110" src="{{ site.url }}/images/2013/20130711_WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/Ethernet-Cable-icon__1284204291__-200x200.png" width="110" /></a>For my Virtual Machines needs, some LUNS are presented to my VMware vSphere 5.1 Servers and until now,<a href="{% post_url 2012/2012-12-07-My_Home_Lab_! %}">my lab</a>storage was handle by<a href="{{ site.url }}/2012/12/freenas-83-creating-raid-volume-and.html" target="_blank">FreeNas using iSCSI</a>.
For tests purposes, I replaced this FreeNas by Windows Server 2012 to take care of that part.

<u>Note:</u> Before writing this post, I grouped my physical disks together into a container called <b>storage pools</b>to manage those disks as a single storage space. Afterwards, in these storage pools, I created <b>virtual disks </b>(aka LUN)on which I specify a layout, ... which is simply a raid level.



### <span style="font-size: x-large;">Overview

In the following post I will talk about the following points:

* <b>Quick iSCSI Terminology</b>

* <b>Quick look at iSCSI Target Management</b> (GUI and PowerShell iSCSI Modules)<b>
</b>

* <b>Installing the Windows Feature iSCSI Server Target</b> (PowerShell) 

* <b>Creating a iSCSI Virtual Disk (aka LUN)</b> (PowerShell)

* <b>Creating a iSCSI Target and assigning it to one or more initiator(s) </b>(PowerShell)

* <b>Finding the </b><b><span style="white-space: pre-wrap;">iSCSI Qualified Name (IQN)</b> (vSphere Client and PowerCLI) 

* <b>Assigning a iSCSI Virtual Disk (LUN) to a iSCSI Target</b> (PowerShell) 



### <span style="font-size: x-large;">Terminology

<u>
</u><u>Note:</u> The iSCSI protocol is fully documented by <a href="http://www.ietf.org/rfc/rfc3720.txt" target="_blank">the RFC 3720</a>and <a href="http://tools.ietf.org/html/rfc3721" target="_blank">RFC 3721</a>
<b>
</b><b>iSCSI:</b>iSCSI stands for<b>Internet Small Computer System Interface</b>.
It's an Internet Protocol (IP)-based storage networking standard for linking data storage facilities.
iSCSI is used to facilitate data transfers over a network (LAN, WAN or Internet) and transferring data by carrying SCSI commands over IP networks. iSCSI leverages the Ethernet network and does not require any specialized hardware

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130711_WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/4265.image_30150E08__1566633119__-699x243.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="4265.image" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/20130711_WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/4265.image_30150E08__1566633119__-699x243.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">source:[http://blogs.technet.com/b/filecab/](http://blogs.technet.com/b/filecab/)</td></tr></tbody></table>
<b>iSCSI Target Server:</b> is the server that shares the storage, it runs the iSCSI Target. The server (machine) consumes the storage is called iSCSI initiator.

<b>iSCSI Initiator:</b>Typically, it is an application server. For example, iSCSI Target provides storage to a SQL server, the SQL server will be the iSCSI initiator in this deployment.

<b>Target:</b> It is an object which allows the iSCSI initiator to make a connection. The Target keeps track of the initiators which are allowed to be connected to it. The Target also keeps track of the iSCSI virtual disks which are associated with it. Once the initiator establishes the connection to the Target, all the iSCSI virtual disks associated with the Target will be accessible by the initiator.

<b>iSCSI Virtual Disk:</b> It also referred to as <b>iSCSI LUN</b>. It is the object which can be mounted by the iSCSI initiator. On Windows Server 2012, the iSCSI virtual disk is backed by the VHD file.

<b>iSCSI Connection:</b> iSCSI initiator makes a connection to the iSCSI Target Server by logging on to a Target. There could be multiple Targets on the iSCSI Target Server, each Target can be accessed by a defined list of initiators. Multiple initiators can make connections to the same Target. However, this type of configuration is only supported with clustering. Because when multiple initiators connects to the same Target, all the initiators can read/write to the same set of iSCSI virtual disks, if there is no clustering (or equivalent process) to govern the disk access, corruption will occur. With Clustering, only one machine is allowed to access the iSCSI virtual disk at one time.

<b>IQN:</b><span style="white-space: pre-wrap;">iSCSI Qualified Name. It is a unique identifier of the Target or Initiator. The Target IQN is shown when it is created on the Server. The initiator IQN can be found by typing a simple "<span style="font-family: Courier New, Courier, monospace;">iscsicli" cmd in the command window or using <span style="font-family: Courier New, Courier, monospace;">Get-InitiatorPort in PowerShell

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-06_5-36-23_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 3 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-06_5-36-23_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Using <b>iscsicli</b></td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_9-57-20_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 4 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_9-57-20_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Using <b>PowerShell (</b>module <b>iSCSI</b>) with the Cmdlet <span style="font-family: Courier New, Courier, monospace;">Get-InitiatorPort</td></tr></tbody></table>

<u>Briefly, the fields are:</u>

* The string "<b>iqn.</b>", used to distinguish these names from "eui." formatted names.

* A <b>date</b> code, in yyyy-mm format that the naming authority took ownership of the domain

* The <b>reversed domain name</b> of the naming authority (person or organization) creating this iSCSI name. (com.lazywinadmin, com.example, com.google)

* An optional, <b>colon</b> (<b>:</b>) prefixing a storage target name specified by the owner of the domain name deems appropriate.
<u>Information from the RFC:</u>
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_9-49-12_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 5 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_9-49-12_PM.png" /></a>
<b>Loopback:</b> There are cases where you want to run the initiator and Target on the same machine; it is referred as "loopback". In Windows Server 2012, it is a supported configuration. In loopback configuration, you can provide the local machine name to the initiator for discovery, and it will list all the Targets which the initiator can connect to. Once connected, the iSCSI virtual disk will be presented to the local machine as a new disk mounted. There will be performance impact to the IO, since it will travel through the iSCSI initiator and Target software stack when comparing to other local IOs. One use case of this configuration is to have initiators writing data to the iSCSI virtual disk, then mount those disks on the Target server (using loopback) to check the data in read mode.




### <span style="font-size: x-large;">Quick look at iSCSI Target Management


<h4>

<h4>The UI integrated to Service Manager

Once you installed the Windows Feature for iSCSI Target Server you will see a new menu under <b>File and Storage Services</b>
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-10_7-36-47_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 6 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-10_7-36-47_PM.png" /></a>
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-06_5-49-41_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 7 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-06_5-49-41_PM.png" /></a>
<h4>PowerShell Cmdlets

Windows Server 2012 comes with a complete set of PowerShell cmdlets for iSCSI. By combining the iSCSI target, iSCSI initiator, and storage cmdlets, you can automate pretty much all management tasks.Here is the list of Cmdlets available to you:

<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-06_1-30-50_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 8 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-06_1-30-50_PM.png" /></a>
The module<b>iSCSI</b>is used for all iSCSI<u>Initiator-specific Cmdlets</u>and the<b>iSCSITarget</b>for all iSCSI<u>target service-specific cmdlets</u>.
<u>More Info:</u>
<a href="http://technet.microsoft.com/en-us/library/hh826099.aspx" target="_blank">iSCSI Cmdlets in Windows PowerShell</a><a href="https://learn.microsoft.com/en-us/powershell/module/iscsitarget/" target="_blank">iSCSI Target Cmdlets in Windows PowerShell</a>



### <span style="font-size: x-large;">Installation of iSCSI Target Server


In order to be able to use the Storage Features related to iSCSI, you will need to install the iSCSI Target Server Feature. This can be perform via the <i>Server Manager Console</i> but here I will only focus on PowerShell. You can find the UI procedure<a href="http://cavarpe.wordpress.com/2012/09/04/configure-windows-server-2012-as-a-iscsi-storage-server/" target="_blank">here</a>


```
# Import the ServerManager PowerShell Module
Import-Module-Name ServerManager
```

```


```

```
# Add the Windows Feature iSCSI Target Server
Add-WindowsFeature-Name FS-iSCSITarget-Server
```

```


```
<u style="background-color: yellow;">Optionally</u>
You might also want to install the iSCSITarget-VSS-VDS WindowsFeature too to be able to manage older application(s) that need <b>VDS</b> (Virtual Disk Service) and <b>VSS</b> (Volume Snapshot Service) to create volume shadow copies of data on iSCSI virtual disks. VSS is also used by some backup solutions. (<a href="http://blogs.technet.com/b/filecab/archive/2012/10/08/iscsi-target-storage-vds-vss-provider.aspx" target="_blank">more info</a>)


```
# Add the Windows Feature iSCSI VDS/VSS
Add-WindowsFeature-Name FS-iSCSITarget-VSS-VDS
```




### 


### 


### <span style="font-size: x-large;">Configuration of iSCSI Target Server


Again, here I'll use only PowerShell Cmdlets. You can find the UI procedure <a href="http://cavarpe.wordpress.com/2012/09/04/configure-windows-server-2012-as-a-iscsi-storage-server/" target="_blank">here</a>

<h4>

<h4>Overview

* 
* Load the PowerShell iSCSI Module

* Create a iSCSI LUN (aka iSCSI Virtual Disk, a VHD file)

* Create a Target

* Assign the iSCSI LUN to the Target.


<h4>1 - Load the PowerShell iSCSI Module

This Module provides all iSCSI target service-specific cmdlets (see the list of Cmdlets in the screenshot above)```

```

```
# Import the PowerShell Module iSCSITarget
Import-Module-Name iSCSITarget
```
<h4>2 - Create iSCSI LUN

Here we create a new iSCSI virtual hard disk (VHD) object with the specified file <span style="font-family: Courier New, Courier, monospace;">Path and <span style="font-family: Courier New, Courier, monospace;">Size.

```
# Create a 1GB iSCSI Virtual Disk
New-IscsiVirtualDisk -Path c:\test\LUN1.vhd -Size 1GB
```

<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_7-10-05_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 9 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_7-10-05_PM.png" /></a><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_7-55-04_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 10 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_7-55-04_PM.png" /></a><h4>3 - Create a Target

Here we create a new iSCSI target object with the name "TestTarget1" specified by the<span style="font-family: Courier New, Courier, monospace;">-TargetNameparameter. The <span style="font-family: Courier New, Courier, monospace;">-InitiatorIdsparameter stores the initiators which can connect to the Target.

```
# Creating a iSCSI Target. I specify the IPAddresses of the Initiator Hosts (192.168.1.101 and 192.168.1.102) which are VMware vSphere Hosts.
New-IscsiServerTarget -TargetName TestTarget1 -InitiatorId IPAddress:192.168.1.101,IPAddress:192.168.1.102
```

```

```
<span style="white-space: normal;"><u style="background-color: yellow;">Optionally:</u><span style="background-color: white;">Instead of the iSCSI Initiator's IPAddress you can also specify the IQN:
```
New-IscsiServerTarget -TargetName TestTarget1 -InitiatorId "IQN:iqn.1998-01.com.vmware:LAB1VH01-675d7f45"
```
```

```
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_7-15-17_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 11 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_7-15-17_PM.png" /></a>
<h4>Finding the IQN of your iSCSI Initator


<u>UsingVMware vSphere Client:</u>You can find the <b>IQN</b> in the properties of your <b>iSCSI Software Adapter</b>.

<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_8-34-40_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 12 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_8-34-40_PM.png" /></a>
<u>Using PowerCli</u>
I found two ways to get this information with PowerCli ...
 1 - WithGet-View(Call to the NET Framework)

<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_10-35-41_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 13 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_10-35-41_PM.png" /></a>
```
   ((Get-view (Get-view -Id ((Get-VMhost lab1vh02.fx.lab).id)).config
manager.storagesystem).StorageDeviceInfo.HostBusAdapter).iscsiName
```

 2 - WithGet-EsxCli


```
   (Get-EsxCli -VMHost lab1vh02.fx.lab).iscsi.adapter.list()
```

```


```
<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_10-49-15_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 14 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_10-49-15_PM.png" /></a>```

```


<h4>4 - Assign the iSCSI LUN to the Target

Here we assign a virtual disk to an iSCSI target.


```
# Assigning the virtual disk to the iSCSI Target
Add-IscsiVirtualDiskTargetMapping -TargetName TestTarget1 -Path C:\test\Lun1.vhd
```
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_9-12-09_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 15 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_9-12-09_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">No output will be generated. 
There is no <span style="font-family: Courier New, Courier, monospace;"><b>Passthru</b> parameter either :-(</td></tr></tbody></table>
<u style="background-color: yellow;">Optionally:</u><span style="background-color: white;">You can specify the Logical Unit Number (LUN) associated with the virtual disk. By default, the lowest available LUN number will be assigned.


```
# Assigning the virtual disk to the iSCSI Target
Add-IscsiVirtualDiskTargetMapping -TargetName TestTarget1 -Path C:\test\Lun1.vhd -Lun 25
```

<a href="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_9-14-13_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 16 from the post &quot;WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_iSCSI_Target_Server_-_Create_an_iSCSI_target_using_PowerShell/2013-07-07_9-14-13_PM.png" /></a>
Once a virtual disk has been assigned to a target, and after the iSCSi initiator connects to that target, the iSCSI initiator can access the virtual disk. All of the virtual disks assigned to the same iSCSI target will be accessible by the connected iSCSI initiator.


<u>In my next post</u> I will explain how to configure the iSCSI Initiator on VMware vSphere using PowerCli




### 


### <span style="font-size: x-large;">References


* <a href="http://technet.microsoft.com/en-us/library/hh826099.aspx" target="_blank">iSCSI Cmdlets in Windows PowerShell</a>

* <a href="https://learn.microsoft.com/en-us/powershell/module/iscsitarget/" target="_blank">iSCSI Target Cmdlets in Windows PowerShell</a>

* <a href="https://web.archive.org/web/20130413020806/http://www.van-lieshout.com/2011/01/esxcli-powercli/" target="_blank">PowerCLI - Using Get-ESXCLI</a>

* <a href="http://blogs.technet.com/b/josebda/archive/2010/09/29/powershell-cmdlets-for-the-microsoft-iscsi-target-3-3-included-in-windows-storage-server-2008-r2.aspx" target="_blank">PowerShell Cmdlets for iSCSI Target</a>

* <a href="http://blogs.technet.com/b/filecab/archive/2012/05/21/introduction-of-iscsi-target-in-windows-server-2012.aspx" target="_blank">Introduction of iSCSI Target in Windows Server 2012</a>

* <a href="https://learn.microsoft.com/en-us/archive/blogs/san/managing-iscsi-initiator-connections-with-windows-powershell-on-windows-server-2012" target="_blank">Managing iSCSI Initiator connections with Windows PowerShell on Windows Server 2012</a>

* <a href="https://web.archive.org/web/20130616000203/http://www.itbully.com/articles/setting-windows-server-2012-storage-virtualization-software-raid-solution-or-more" target="_blank">Setting up windows server 2012 storage virtualization. A software RAID solution or more</a>

* <a href="http://cavarpe.wordpress.com/2012/09/04/configure-windows-server-2012-as-a-iscsi-storage-server/" target="_blank">Configure Windows Server 2012 as a ISCSI Storage Server</a>

* <a href="http://blogs.technet.com/b/storageserver/archive/2009/12/11/six-uses-for-the-microsoft-iscsi-software-target.aspx" target="_blank">Six Uses for the Microsoft iSCSI Software Target</a>



