---
layout: single
title: WS2012 Storage - Creating a Storage Pool and a Storage Space (aka Virtual Disk) using PowerShell
excerpt: 
permalink: /2013/08/ws2012-storage-creating-storage-pool.html
tags: 
- datastore
- homelab
- lab
- lun
- powershell
- powershell 3.0
- raid
- storage
- storage pool
- virtual disk
- windows server 2012
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20130815_WS2012_Storage_-_Creating_a_Storage_Pool_and_a_Storage_Space_(aka_Virtual_Disk)_using_PowerShell/Top-10-Cloud-Storage-Services-in-2013__1913321047__-256x256.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="200" src="{{ site.url }}/images/2013/20130815_WS2012_Storage_-_Creating_a_Storage_Pool_and_a_Storage_Space_(aka_Virtual_Disk)_using_PowerShell/Top-10-Cloud-Storage-Services-in-2013__371380604__-200x200.png" width="200" /></a>In my previous posts I talked about how to use NFS and iSCSI technologies hosted on Windows Server 2012 and how to deploy those to my Home Lab ESXi servers.

* <a href="{{ site.url }}/2013/07/create-iscsi-target-using-powershell-on.html" target="_blank">WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell</a>

* <a href="{{ site.url }}/2013/07/configuring-iscsi-initiator-on-vmware.html" target="_blank">WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1</a>

* <a href="{{ site.url }}/2013/01/configure-windows-server-2012-nfs.html" target="_blank">WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1</a>

<u>One point I did not covered was:</u> <b>How to do the Initial setup with the physical disk, Storage pooling and the creating the Virtual Disk(s) ?</b>

The cost to acquire and manage highly available and reliable storage can represent a significant part of the IT budget. Windows Server 2012 addresses this issue by delivering a sophisticated virtualized storage feature called Storage Spaces as part of the WS2012 Storage platform. This provides an alternative option for companies that require advanced storage capabilities at lower price point.




### <span style="font-size: x-large;">Overview


* <b>Terminology</b>

* <b>Storage Virtualization Concept</b>

* <b>Deployment Model of a Storage Space</b>

* <b>Quick look at Storage Management under Windows Server 2012</b>

* Server Manager - Volumes

* PowerShell - Module Storage

* <b>Identifying the physical disk(s)</b>

* <b>Creating the Storage Pool</b>

* <b>Creating the Virtual Disk</b>

* <b>Initializing the Virtual Disk</b>

* <b>Partitioning and Formating</b>




### <span style="font-size: x-large;">Terminology

<b>Storage Pool:</b>Abstraction of multiple physical disks into a logical construct with specified capacity
Group of physical disks into a container, the so-called storage pool, such that the total capacity collectively presented by those associated physical disks can appear and become manageable as a single and seemingly continuous space.

There are two primary types of pools which are used in conjunction with Storage Spaces, as well as the management API in Windows Server 2012: Primordial Pool and Concrete Pool.

<b>Primordial Pool:</b>The Primordial pool represents all of the disks that Storage Spaces is able to enumerate, regardless of whether they are currently being used for a concrete pool. Physical Disks in the Primordial pool have a property named CanPool equal to "True" when they meet the requirements to create a concrete pool.

<b>Concrete Pool:</b>A Concrete pool is a specific collection of Physical Disks that was formed by the user to allow creating Storage Spaces (aka Virtual Disks).

<b>Storage Space:</b>Virtual disks with associated attibutes that include a desired level of resiliency, thin of fixed provisioning, automatic or controlled allocation on diverse storage media, and precise administrative control.



### <span style="font-size: x-large;">Storage Virtualization Concept

<div class="separator" style="clear: both; text-align: left;">This diagram from Yung Chou shows nicely how the different parts of Windows Server 2012 Storage work together.<a href="http://2.bp.blogspot.com/-3u0jVvsGAWs/UfCLSh62xMI/AAAAAAABbWA/xX_iUKliiRQ/s1600/8738.image_2+(1).png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-3u0jVvsGAWs/UfCLSh62xMI/AAAAAAABbWA/xX_iUKliiRQ/s1600/8738.image_2+(1).png" /></a>


### <span style="font-size: x-large;">Deployment Model of a Storage Space (Virtual Disk)


In order to understand the deployment model of a Storage Space, I created the following diagram. Hopefully helpful!

<a href="{{ site.url }}/images/2013/20130815_WS2012_Storage_-_Creating_a_Storage_Pool_and_a_Storage_Space_(aka_Virtual_Disk)_using_PowerShell/WS2012_Storage_Workflow__1252811681__-1125x1600.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="640" src="{{ site.url }}/images/2013/20130815_WS2012_Storage_-_Creating_a_Storage_Pool_and_a_Storage_Space_(aka_Virtual_Disk)_using_PowerShell/WS2012_Storage_Workflow__849051994__-450x640.png" width="450" /></a>

### <div style="font-size: medium; font-weight: normal;">




### <span style="font-size: x-large;">Quick look at the Storage Management on WS2012


<u><b>Using The GUI</b></u>
With the conventional <b>Server Manager</b>, under <b>File and Storage Services</b>, youcan browse our Volumes, Physical disks, Storage Pool and Virtual Disk. This is just to show you where to go if you need to use the GUI, this post will not cover this part.
<a href="http://3.bp.blogspot.com/-v-K5ru63rCo/Ue9ArpK2EAI/AAAAAAABbRk/EnW6wGD2jDc/s1600/2013-07-23+9-50-02+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="388" src="http://3.bp.blogspot.com/-v-K5ru63rCo/Ue9ArpK2EAI/AAAAAAABbRk/EnW6wGD2jDc/s640/2013-07-23+9-50-02+PM.png" width="640" /></a>
<b><u>Using PowerShell - Module Storage</u></b>
Microsoft Windows Server 2012 is delivered with a really awesome PowerShell Storage module.
Use the Cmdlet<span style="font-family: Courier New, Courier, monospace;"> Get-Command to retrieve the full list of Cmdlets available in this module.
```
Get-Command -Module Storage | Select-Object Name
```

<u>Note:</u> You need to import the <span style="font-family: Courier New, Courier, monospace;">Storage module in order to be able those. If it's not the case, juste use <span style="font-family: Courier New, Courier, monospace;">Import-Module.
```
Import-Module Storage
```

<a href="http://4.bp.blogspot.com/-H7E00TjKq6g/Ue9At5iuMDI/AAAAAAABbRs/Boq9IGuShwc/s1600/2013-07-23+7-20-44+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="640" src="http://4.bp.blogspot.com/-H7E00TjKq6g/Ue9At5iuMDI/AAAAAAABbRs/Boq9IGuShwc/s640/2013-07-23+7-20-44+PM.png" width="420" /></a>
Here is the full list of Cmdlets for the Storage Module.
```
Get-Command -Module Storage | Select-Object Name
```

<pre class="brush: powershell;collapse:true;highlight:5;toolbar:false; ruler: true; first-line: 1;gutter: true;">Name
----
Initialize-Volume
Add-InitiatorIdToMaskingSet
Add-PartitionAccessPath
Add-PhysicalDisk
Add-TargetPortToMaskingSet
Add-VirtualDiskToMaskingSet
Clear-Disk
Connect-VirtualDisk
Disable-PhysicalDiskIndication
Disconnect-VirtualDisk
Dismount-DiskImage
Enable-PhysicalDiskIndication
Format-Volume
Get-Disk
Get-DiskImage
Get-FileIntegrity
Get-InitiatorId
Get-InitiatorPort
Get-MaskingSet
Get-OffloadDataTransferSetting
Get-Partition
Get-PartitionSupportedSize
Get-PhysicalDisk
Get-ResiliencySetting
Get-StorageJob
Get-StoragePool
Get-StorageProvider
Get-StorageReliabilityCounter
Get-StorageSetting
Get-StorageSubSystem
Get-SupportedClusterSizes
Get-SupportedFileSystems
Get-TargetPort
Get-TargetPortal
Get-VirtualDisk
Get-VirtualDiskSupportedSize
Get-Volume
Get-VolumeCorruptionCount
Get-VolumeScrubPolicy
Hide-VirtualDisk
Initialize-Disk
Mount-DiskImage
New-MaskingSet
New-Partition
New-StoragePool
New-StorageSubsystemVirtualDisk
New-VirtualDisk
New-VirtualDiskClone
New-VirtualDiskSnapshot
Optimize-Volume
Remove-InitiatorId
Remove-InitiatorIdFromMaskingSet
Remove-MaskingSet
Remove-Partition
Remove-PartitionAccessPath
Remove-PhysicalDisk
Remove-StoragePool
Remove-TargetPortFromMaskingSet
Remove-VirtualDisk
Remove-VirtualDiskFromMaskingSet
Rename-MaskingSet
Repair-FileIntegrity
Repair-VirtualDisk
Repair-Volume
Reset-PhysicalDisk
Reset-StorageReliabilityCounter
Resize-Partition
Resize-VirtualDisk
Set-Disk
Set-FileIntegrity
Set-InitiatorPort
Set-Partition
Set-PhysicalDisk
Set-ResiliencySetting
Set-StoragePool
Set-StorageSetting
Set-StorageSubSystem
Set-VirtualDisk
Set-Volume
Set-VolumeScrubPolicy
Show-VirtualDisk
Update-Disk
Update-HostStorageCache
Update-StorageProviderCache

```


### <span style="font-size: x-large;">Identifying the physical disk(s)

The first thing we will need is to identify which physical disk I will be using for my Storage Pool(s).

<a href="{{ site.url }}/images/2013/20130815_WS2012_Storage_-_Creating_a_Storage_Pool_and_a_Storage_Space_(aka_Virtual_Disk)_using_PowerShell/Drawing2__2105661421__-332x140.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130815_WS2012_Storage_-_Creating_a_Storage_Pool_and_a_Storage_Space_(aka_Virtual_Disk)_using_PowerShell/Drawing2__2105661421__-332x140.png" /></a>

In the example below, I'm using the Get-PhysicalDisk cmdlet to list all of the Physical Disks that are present on the system:
```
Get-PhysicalDisk -CanPool $true
```

<a href="http://1.bp.blogspot.com/-ZT8bQhzKqpU/Ue9CQy4tSII/AAAAAAABbR8/cPS3vS8xc0g/s1600/2013-07-23+10-52-28+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-ZT8bQhzKqpU/Ue9CQy4tSII/AAAAAAABbR8/cPS3vS8xc0g/s1600/2013-07-23+10-52-28+PM.png" /></a>

### <span style="font-size: x-large;">Creating the Storage Pool



In the example below I use <a href="http://technet.microsoft.com/en-us/library/hh848689.aspx" target="_blank">New-StoragePool</a> Cmdlet to show the creation of a Storage Pool named "LUN-1TB", using all of the Physical Disks which are currently available for pooling.

<a href="{{ site.url }}/images/2013/20130815_WS2012_Storage_-_Creating_a_Storage_Pool_and_a_Storage_Space_(aka_Virtual_Disk)_using_PowerShell/Drawing2_2__212364170__-332x140.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130815_WS2012_Storage_-_Creating_a_Storage_Pool_and_a_Storage_Space_(aka_Virtual_Disk)_using_PowerShell/Drawing2_2__212364170__-332x140.png" /></a>

```
New-StoragePool -FriendlyName "LUN-1TB" `
-StorageSubSystemUniqueId (Get-StorageSubSystem -FriendlyName "*Space*").uniqueID `
-PhysicalDisks (Get-PhysicalDisk -CanPool $true)
```

<a href="http://2.bp.blogspot.com/-e6SrSq4qTH8/Ue9KXTaxXHI/AAAAAAABbSM/m07bCQLF1a4/s1600/2013-07-23+11-29-26+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-e6SrSq4qTH8/Ue9KXTaxXHI/AAAAAAABbSM/m07bCQLF1a4/s1600/2013-07-23+11-29-26+PM.png" /></a>

### <span style="font-size: x-large;">Creating the Virtual Disk (aka LUN/Storage Space)

A Storage Space is created from an existing Storage pool. The Storage Space (also known as a Virtual Disk) is also exposed as a Windows disk, visible in Windows applications. Additionally, Storage Spaces may be configured in a variety of methods to provide either increased performance or resilient configurations (or combinations of both).

Creating a Storage Space requires the following information:

* The <b><span style="font-family: Courier New, Courier, monospace;">Name, <span style="font-family: Courier New, Courier, monospace;">UniqueID or <span style="font-family: Courier New, Courier, monospace;">FriendlyName</b>of the Storage Pool that was created, here "<b>LUN-1TB</b>"

* A <b><span style="font-family: Courier New, Courier, monospace;">FriendlyName</b> to use for the Storage Space to create

* The <b><span style="font-family: Courier New, Courier, monospace;">Size</b> of the Storage Space to create (you can also use the <span style="font-family: Courier New, Courier, monospace;">-<b>UseMaximumSize</b> parameter)

* <i>(Optionally)</i> Use of advanced settings when creating the Storage Space, such as

* Number of Physical Disks to use for a specific Storage Space,

* Utilizing specific resiliency setting

* Provisioning Type.
For more information on using advanced settings for the creation of a Storage Space, please refer to the <span style="font-family: Courier New, Courier, monospace;">New-VirtualDisk help using <span style="font-family: Courier New, Courier, monospace;">Get-Help or on the <a href="http://technet.microsoft.com/en-us/library/hh848643.aspx" target="_blank">TechNet page online</a>.


The following example shows the creation of a Storage Space that is 200GB in size, named "<b>DataStore01</b>", using the pool named "<b>LUN-1TB</b>"

```
New-VirtualDisk -FriendlyName "Datastore01" `
-StoragePoolFriendlyName "LUN-1TB" -Size 200GB `
-ProvisioningType Thin -ResiliencySettingName Mirror
```


<a href="http://2.bp.blogspot.com/-3lKnuAHREHs/Ue9MN5XwvRI/AAAAAAABbSc/GaUDWUdCiKc/s1600/2013-07-23+11-38-08+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-3lKnuAHREHs/Ue9MN5XwvRI/AAAAAAABbSc/GaUDWUdCiKc/s1600/2013-07-23+11-38-08+PM.png" /></a>
<div class="separator" style="clear: both; text-align: left;"><span style="background-color: yellow;">Another example using <span style="font-family: Courier New, Courier, monospace;"><b>-UseMaximumSize</b><div class="separator" style="clear: both; text-align: left;"><span style="font-family: Courier New, Courier, monospace;">
<div class="separator" style="clear: both; text-align: left;"><span style="color: blue; font-family: monospace; font-weight: bold; white-space: pre;">New-VirtualDisk<span style="color: black; font-family: monospace; white-space: pre;"> <span style="color: #3399ff; font-family: monospace; white-space: pre;">-FriendlyName<span style="color: black; font-family: monospace; white-space: pre;"> <span style="color: red; font-family: monospace; white-space: pre;">"Datastore01"<span style="color: black; font-family: monospace; white-space: pre;"> <span style="color: #3399ff; font-family: monospace; white-space: pre;">`<div class="separator" style="clear: both; text-align: left;"><span style="color: #3399ff; font-family: monospace; white-space: pre;">-StoragePoolFriendlyName<span style="color: black; font-family: monospace; white-space: pre;"> <span style="color: red; font-family: monospace; white-space: pre;">"LUN-1TB"<span style="color: black; font-family: monospace; white-space: pre;"> <span style="color: #3399ff; font-family: monospace; white-space: pre;">-UseMaximumSize<span style="color: black; font-family: monospace; white-space: pre;"> <span style="color: #3399ff; font-family: monospace; white-space: pre;">`<div class="separator" style="clear: both; text-align: left;"><span style="color: #3399ff; font-family: monospace; white-space: pre;">-ProvisioningType<span style="color: black; font-family: monospace; white-space: pre;"> Thin <span style="color: #3399ff; font-family: monospace; white-space: pre;">-ResiliencySettingName<span style="color: black; font-family: monospace; white-space: pre;"> Mirror<div class="separator" style="clear: both; text-align: left;"><span style="color: black; font-family: monospace; white-space: pre;">
<a href="http://3.bp.blogspot.com/-EmJ4hsa80jY/Ue9NDdDFtfI/AAAAAAABbSo/hR22ociG6C0/s1600/2013-07-23+11-41-33+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-EmJ4hsa80jY/Ue9NDdDFtfI/AAAAAAABbSo/hR22ociG6C0/s1600/2013-07-23+11-41-33+PM.png" /></a>

### <span style="font-size: x-large;">Initializing the Virtual Disk


### <span style="font-size: small;"><span style="font-weight: normal;">Now the Storage Space (Virtual Disk) is created, we need to locate the disk that corresponds with the Storage Space named "DataStore01<span style="font-weight: normal;">" and initialize it:


### <span style="font-size: small; font-weight: normal;">Locating the disk, this can be done by <span style="font-family: Courier New, Courier, monospace;">Get-VirtualDisk and <span style="font-family: Courier New, Courier, monospace;">Get-Disk cmdlets as shown below:


```
Get-VirtualDisk -FriendlyName "Datastore01" | Get-Disk
```

### 
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-FURDaAFOzB0/Ue9O19IbkMI/AAAAAAABbTA/xq0UeLR1d6M/s1600/2013-07-23+11-45-04+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://3.bp.blogspot.com/-FURDaAFOzB0/Ue9O19IbkMI/AAAAAAABbTA/xq0UeLR1d6M/s1600/2013-07-23+11-45-04+PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">As you can see my virtual disk has the Number 5</td></tr></tbody></table>


The next step is to use the <span style="font-family: Courier New, Courier, monospace;">Initialize-Disk cmdlet to initialize the disk:
In the preceding example, we determined that the disk we need to initialize is disk number 5, so I would use the <span style="font-family: Courier New, Courier, monospace;">Initialize-Disk cmdlet as shown below:

<a href="http://4.bp.blogspot.com/-jKQRAIJV8tA/Ue9P7PV2vLI/AAAAAAABbTM/I3dMyj1oBZA/s1600/2013-07-23+11-51-24+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-jKQRAIJV8tA/Ue9P7PV2vLI/AAAAAAABbTM/I3dMyj1oBZA/s1600/2013-07-23+11-51-24+PM.png" /></a>
<div class="separator" style="clear: both; text-align: left;">

### <span style="font-size: x-large;">Partitioningand Formating

<div class="separator" style="clear: both; text-align: left;">Now that disk 5 is initialized, the next step is to create a partition on the Storage Space, which can be done via the <span style="font-family: Courier New, Courier, monospace;">New-Partition cmdlet.<div class="separator" style="clear: both; text-align: left;">
```
New-Partition -DiskNumber 5 -UseMaximumSize -AssignDriveLetter
```
```


```
<div class="separator" style="clear: both; text-align: left;">To create a volume on the Storage Space, I will now format the volume associated with DriveLetter D which was assigned in the previous step.<div class="separator" style="clear: both; text-align: left;">
```
Format-Volume -DriveLetter D -FileSystem NTFS -NewFileSystemLabel "DataStore01"
```
<div class="separator" style="clear: both; text-align: left;">
<a href="http://2.bp.blogspot.com/-VPPv1u2Rd_M/Ue9RI_DetpI/AAAAAAABbTc/a6f2sDNSWIk/s1600/2013-07-23+11-58-15+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-VPPv1u2Rd_M/Ue9RI_DetpI/AAAAAAABbTc/a6f2sDNSWIk/s1600/2013-07-23+11-58-15+PM.png" /></a>

And you done...
Where to go from here ? Check out my previous storage posts:

* <a href="{{ site.url }}/2013/07/create-iscsi-target-using-powershell-on.html" target="_blank">WS2012 Storage - iSCSI Target Server - Create an iSCSI target using PowerShell</a>

* <a href="{{ site.url }}/2013/07/configuring-iscsi-initiator-on-vmware.html" target="_blank">WS2012 Storage - iSCSI Target Server - Configuring an iSCSI Initiator on VMware vSphere 5.1</a>

* <a href="{{ site.url }}/2013/01/configure-windows-server-2012-nfs.html" target="_blank">WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1</a>



<span style="font-size: x-large;">Resources

<a href="http://technet.microsoft.com/en-us/evalcenter/hh670538.aspx" target="_blank">Download - Windows Server 2012</a>
<a href="http://technet.microsoft.com/en-us/evalcenter/dn205286.aspx" target="_blank">Download - Windows Server 2012 R2 Preview</a><a href="http://blogs.technet.com/b/yungchou/archive/2012/08/31/windows-server-2012-storage-virtualization-explained.aspx" target="_blank">TechNet - Windows Server 2012 Storage Virtualization Explained</a><a href="http://download.microsoft.com/download/A/B/E/ABE02B78-BEC7-42B0-8504-C880A1144EE1/WS%202012%20White%20Paper_Storage.pdf" target="_blank">Download - Windows Server 2012 White Paper Storage.pdf</a>
<a href="http://blogs.msdn.com/b/san/archive/2012/06/26/an-introduction-to-storage-management-in-windows-server-2012.aspx" target="_blank">MSDN - An Introduction to Storage Management in Windows Server 2012</a>
<a href="http://www.microsoft.com/en-us/download/details.aspx?id=30125" target="_blank">Download - Deploy and Manage Storage Spaces with PowerShell.docx</a>
<a href="http://www.techrepublic.com/blog/data-center/diy-san-windows-server-2012-storage-spaces-and-iscsi-target/" target="_blank">TechRepublic - DIY SAN: Windows Server 2012 Storage Spaces and iSCSI target</a>
<a href="http://social.technet.microsoft.com/wiki/contents/articles/7807.windows-server-2012-test-lab-guides.aspx" target="_blank">TechNet - Windows Server 2012 Test Lab Guides</a>



