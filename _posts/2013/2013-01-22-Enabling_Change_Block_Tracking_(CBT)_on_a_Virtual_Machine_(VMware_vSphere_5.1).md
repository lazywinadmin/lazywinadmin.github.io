---
layout: single
title: Enabling Change Block Tracking (CBT) on a Virtual Machine (VMware vSphere 5.1)
excerpt: 
permalink: /2013/01/enabling-change-block-tracking-cbt-on.html
tags: 
- backup
- cbt
- powercli
- powershell
- vmware
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/images__1605460790__-213x236.jpg" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/images__1605460790__-213x236.jpg" height="180" width="162" /></a><b><u>Update:</u> <a href="{{ site.url }}/2013/07/enabling-change-block-tracking-cbt-on.html" target="_blank">2013/07/02 I wrote another post about CBT and create a re-usable PowerShell function </a></b>

I recently had to enable CBT in my VMware vSphere environment, on a good amount of Virtual Machines.

What is Change Block Tracking (CBT) ? If you are not familiar with CBT, checkout the following articles:

* Eric Siebert:<a href="http://itknowledgeexchange.techtarget.com/virtualization-pro/what-is-changed-block-tracking-in-vsphere" target="_blank">What is Change Block Tracking (CBT) ?</a>

* VMware KB:<a href="http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&amp;cmd=displayKC&amp;externalId=1020128" target="_blank">Changed Block Tracking (CBT) on virtual machines</a>

* VMware Documentation: <a href="http://pubs.vmware.com/vsphere-50/index.jsp?topic=%2Fcom.vmware.vddk.pg.doc_50%2FvddkBkupVadp.9.3.html" target="_blank">Low Level Backup Procedures</a>


<b>How to implement CBT, what do you need ?</b>


* VM version 7 at least,

* No snapshot on your VM

* Enable CBT,

* Finally the VM must go through a <u>stun-unstun cycle</u>(power on, resume after suspend, migrate, or snapshot create/delete/revert) before the reconfiguration takes effect.

<b>How to Enable CBT on your VM ? (GUI)</b>

<u><b>Note:</b></u> When the VM is Powered ON you <u>won't be able</u> to access those settings.
However, <u>It is possible to do it via PowerShell even when the VM is started</u>. :-) (see below)

Navigate to Configuration Parameters and add the following Entries.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/CBT06__1727045094__-700x620.png" imageanchor="1" style="margin-left: auto; margin-right: auto; text-align: center;"><img border="0" src="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/CBT06__1727045094__-700x620.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Right click on your VM, select<b> Edit Settings/Options </b><i>Tab</i><b>/Advanced/General</b>.
Click on <b><u>Configuration Parameters</u></b> and add the following entries</td></tr></tbody></table>



<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/CBT01__1644295293__-209x37.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/CBT01__1644295293__-209x37.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">This enable CBT on your VM.
<b>ctkEnabled</b> = true</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/CBT02__384841638__-322x106.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/CBT02__384841638__-322x106.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Additionally, you need to add an entry for each disk. (in this example I had two virtual disks)
<b>scsi0:0.ctkEnabled</b> = true
<b>scsi0:1.ctkEnabled</b>= true</td></tr></tbody></table><b>How to Enable CBT on your VM ? (PowerShell/PowerCli)</b>

You can do the following even if your VM is Powered ON.


```
# Check and Add the PowerCli Snaping if not already present
if(-not(Get-PSSnapin -Registered -Name "VMware.VimAutomation.Core"){
    Add-PSSnapin -Name VMware.VimAutomation.Core}

# Connect to my Vcenter
Connect-VIServer -Server vcenter.fx.lab

#Here is aRunning the script on TESTSERVER04 to enable CBT
$vmtest = Get-vm TESTSERVER04 | get-view
$vmConfigSpec = New-Object VMware.Vim.VirtualMachineConfigSpec
$vmConfigSpec.changeTrackingEnabled = $true
$vmtest.reconfigVM($vmConfigSpec)
```

<b>How to Apply this CBT configuration ?</b>

Once you enable CBT, the VM must go through a<u>stun-unstun cycle</u>(power on, resume after suspend, migrate, or snapshot create/delete/revert) before the reconfiguration takes effect.

In my case i will create/delete a snapshot since I don't want any downtime to occur.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/CBT03__1159762334__-880x393.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/CBT03__1021103101__-640x286.png" height="285" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">State of my the VM files, <u>before the Snapshot,</u></td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/CBT04__1634044912__-920x481.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/CBT04__912293933__-640x335.png" height="334" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">State of my VM files,<u> after the creation of the Snapshot.</u></td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/CBT05__1550283340__-946x415.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130122_Enabling_Change_Block_Tracking_(CBT)_on_a_Virtual_Machine_(VMware_vSphere_5.1)/CBT05__1760106700__-640x281.png" height="280" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">State of my VM Files, <u>after the deletion of the Snapshot.</u></td></tr></tbody></table>

CBT is now enabled on this VM.


<b>How to Check if CBT is enabled on your VM (PowerShell/PowerCli)</b>


```
# Check if your VM has (Change Block Tracking) enabled or not
(Get-VM -Name TESTSERVER04).ExtensionData.Config.ChangeTrackingEnabled

# Find VMs where CBT (Change Block Tracking) is Enabled
Get-VM| Where-Object{$_.ExtensionData.Config.ChangeTrackingEnabled -eq $true}
```

```


```

```


```

```


```

