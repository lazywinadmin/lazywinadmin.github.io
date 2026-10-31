---
layout: single
title: WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab
description: "How to set up an NFS server on Windows Server 2012 as storage for a VMware vSphere 5.1 home lab, using PowerShell or the GUI, and add the NFS datastore."
seo_title: "WS2012 NFS Server: Configure NFS for a vSphere 5.1 Lab"
excerpt: 
permalink: /2013/01/configure-windows-server-2012-nfs.html
tags:
- storage
- homelab
- powershell
- vmware
- windows server
published: true
comments: true
tldr: "Sets up a Windows Server 2012 NFS server as backend storage for a VMware vSphere 5.1 home lab. It covers both PowerShell (Add-WindowsFeature FS-NFS-Service) and the GUI: adding the Server for NFS role, creating the share, setting the NFS permissions, and adding the NFS datastore in vSphere."
---

<a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/1374031693_data-center-px-png__1246874727__-128x128.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img alt="Image from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/1374031693_data-center-px-png__1246874727__-128x128.png" /></a>The following procedure show how to setup aNFS Server hosted on <u>Windows Server 2012</u> forbackend storage of my<a href="{% post_url 2012/2012-12-07-My_Home_Lab_! %}">VMware vSphere Server 5.1 Home Lab</a>.

You can also check my post on<a href="{{ site.url }}/2013/07/create-iscsi-target-using-powershell-on.html" target="_blank">Creating an iSCSI Target Server on Windows Server 2012</a>.

### <span style="font-size: x-large;">Overview

In the following post I will talk about the following points:

*Terminology
*Using PowerShell
*Add the Role NFS Server Feature on Microsoft Windows Server 2012
* <b style="font-family: inherit;">Create the Share and Set the NFS permissions
*Add the NFS datastore to VMware vSphere 5.1
*Using the GUI (Graphical User Interface)
*Add the Role NFS Server Feature on Microsoft Windows Server 2012
* <b style="font-family: inherit;">Create the Share and<b style="font-family: inherit;">Set the NFS permissions

*Add the NFS datastore to VMware vSphere 5.1

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5_1_Home_Lab/2013-07-17_10-25-33_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img loading="lazy" decoding="async" alt="NFS Storage" border="0" src="{{ site.url }}/images/2013/WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5_1_Home_Lab/2013-07-17_10-25-33_PM.png" title="WS2012 NFS Server with VMware ESXi" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><i>
Quick overview of my NFS Service architecture in my Home Lab</i></td></tr></tbody></table>

### <span style="font-size: x-large;">Terminology

Before I start, if you are not familiar with NFS, W2012or vSphere 5.1, please check the following links:

* NFS stands fo Networ FileSystem <a href="http://en.wikipedia.org/wiki/Network_File_System" target="_blank">Wikipedia</a>
* <a href="https://web.archive.org/web/20160112031001/http://blogs.technet.com/b/filecab/archive/2012/09/14/server-for-nfs-in-windows-server-2012.aspx" target="_blank">Windows Server 2012 - Server for NFS</a>
* <a href="https://web.archive.org/web/20130808151150/http://www.vmware.com/files/pdf/techpaper/Whats-New-VMware-vSphere-51-Storage-Technical-Whitepaper.pdf" target="_blank">What's New in vSphere 5.1 - Storage</a>

### Using PowerShell
Adding the "Server for NFS" Role on Windows Server 2012

First you will need to add the Windows Feature to handle the NFS Service and shares.
Launch PowerShell as Administrator and run:

```powershell
Add-WindowsFeature "FS-NFS-Service"
```

<i>(<a href="http://technet.microsoft.com/en-us/library/ee662309.aspx" target="_blank">Add-WindowsFeature</a>on technet)</i>

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td><a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS-PowerShell03__2094578633__-877x269.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" height="196" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS-PowerShell03__1590823609__-640x196.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="font-size: 13px;">
</td></tr></tbody></table>

```powershell
# Get a list of all the Cmdlets available for this module
Get-Command -Module NFS
```

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td><a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS-PowerShell04__757600232__-733x746.webp" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS-PowerShell04__757600232__-733x746.webp" /></a></td></tr><tr><td class="tr-caption" style="font-size: 13px;">Windows Server 2012 was delivered with PowerShell 3.0.
This new version comes along with a dedicated NFS Module!! Find above the Cmdlets available.</td></tr></tbody></table>

Creating a Share and Set the NFS Permissions

```powershell
# Now we need to create a new share and set the permission to allow client
# to connect to it. Here I used a folder I created E:\NFS_MOUNT 

New-NfsShare `
  -Name "NFS_MOUNT" `
  -Path "E:\NFS_MOUNT" `
  -AllowRootAccess $true `
  -Permission Readwrite `
  -Authentication all
```

(<a href="http://technet.microsoft.com/en-us/library/jj603091.aspx" target="_blank">New-NfsShare</a>on Technet)
<a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS-PowerShell05__1547897153__-878x175.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS-PowerShell05__1547897153__-878x175.png" /></a>
Add the NFS Share to your vSphere Lab

Finally we will need to add the new NFS share in our VMware vSphere host.

```powershell
$VMHOST = "192.168.1.202" # VMware vSphere host where to create the datastore

$NFSDatastore = "FILESERVER01-NFS_MOUNT"
# name that you want to give
$NFSServer = "FILESERVER01.fx.lab"
# ip of fqdn of the NFS Server
$NFSSharename = "NFS_MOUNT"
# Share created on the NFS Server
New-Datastore `
  -Nfs `
  -VMHost $VMHOST `
  -Name $NFSDatastore `
  -NfsHost $NFSServer `
  -path $NFSSharename
```

![VMware vSphere PowerCLI session running Get-VMHost piped to Get-Datastore, then New-Datastore -Nfs to mount an NFS datastore from FILESERVER01](/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS-PowerShell02__1916855805__-677x283.png){: .align-center}

### Using the User Interface

Adding the "Server for NFS" Role on Windows Server 2012
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS01__1507319904__-806x573.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 5 from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" height="454" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS01__444216165__-640x455.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Select the featureServer For NFS, undeFile and Storage Services / File and iSCSI Services</td></tr></tbody></table>

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS02__145977790__-436x434.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 6 from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS02__145977790__-436x434.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Once you click onServer For NFS, you will be prompted to add the required components,
Continue by clicking oAdd Features</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS03__1474783602__-806x573.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 7 from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" height="454" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS03__665733344__-640x455.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">SelectINSTALL on the review page.</td></tr></tbody></table>

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS04__1135917046__-806x573.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 8 from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" height="451" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS04__1754219263__-640x455.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">When the installation is completed, click onClose.</td></tr></tbody></table><u>
</u>Creating a Share and Set the NFS Permissions on Windows Server 2012(GUI)

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS05__89322280__-601x662.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 9 from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS05__89322280__-601x662.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Here I created a folder on the E: Drive calledNFS_MOUNT.
Right click on the folder and selectProperties, you will see a new tab calledNFS Sharing
Click onManage NFS Sharing</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS06__1089662780__-762x638.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 10 from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS06__1089662780__-762x638.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">On the <u>NFS Share Permission</u> windows, change the Type of access t READ-WRITE,
andCheck the <u>Allow root access</u>propertie.
ClickOK to complete.</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS07__318342633__-383x503.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 11 from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS07__318342633__-383x503.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">And you are done! Under the "<u>Services for NFS Sharing</u>" area 
you can find the information about your current NFS share.
In my case: FILESERVER01:/NFS_MOUNT</td></tr></tbody></table>

Add the NFS Share to your vSphere Lab (GUI)
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS08__1400009947__-752x588.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 12 from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" height="312" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS08__567690194__-400x313.png" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">In vSphere Client, (select your ESXi/Configuration/Storage), Select Add Storage, SelectNetwork File System</td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS09__328286526__-752x588.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 13 from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" height="312" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS09__397883019__-400x313.png" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Enter the information of the NFS Server.</td></tr></tbody></table>

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS10__24395070__-752x588.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 14 from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" height="312" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS10__934911955__-400x313.png" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Click onFinish to complete the task.</td></tr></tbody></table>
<a href="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS11__537310051__-705x411.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 15 from the post &quot;WS2012 Storage - NFS Server - Configure NFS for VMware vSphere 5.1 Home Lab&quot;" loading="lazy" decoding="async" border="0" height="232" src="{{ site.url }}/images/2013/20130120_WS2012_Storage_-_NFS_Server_-_Configure_NFS_for_VMware_vSphere_5.1_Home_Lab/NFS11__2019063378__-400x233.png" width="400" /></a>

And that's it... leave a comment if you have any question.
