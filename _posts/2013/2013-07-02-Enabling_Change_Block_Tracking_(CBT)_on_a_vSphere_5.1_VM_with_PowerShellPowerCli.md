---
layout: single
title: Enabling Change Block Tracking (CBT) on a vSphere 5.1 VM with PowerShell/PowerCli
excerpt: 
permalink: /2013/07/enabling-change-block-tracking-cbt-on.html
tags: 
- cbt
- change block tracking
- function
- powercli
- powershell 3.0
- vmware
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20130702_Enabling_Change_Block_Tracking_(CBT)_on_a_vSphere_5.1_VM_with_PowerShellPowerCli/document-application-icon__975977080__-128x128.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130702_Enabling_Change_Block_Tracking_(CBT)_on_a_vSphere_5.1_VM_with_PowerShellPowerCli/document-application-icon__975977080__-128x128.png" /></a>In <a href="{{ site.url }}/2013/07/how-to-enable-copypaste-operations.html" target="_blank">one of my previous post</a>, I created two PowerShell functions to enable Copy/Paste operations on VMware vSphere 5.1 between a Guest OS and the vSphere Client remote console.
Today we'll use a very similar piece of code to Enable Change Block Tracking (CBT) on one or more Virtual Machines.

I <a href="{{ site.url }}/2013/01/enabling-change-block-tracking-cbt-on.html" target="_blank">already talked about CBT in the past</a>, but I just wanted to create re-usable PowerShell functions that will help me when I need it.



<span style="font-size: x-large;"><b>What is Change Block Tracking again?</b>

Changed Block Tracking (CBT) is a feature from VMware used for Virtual Machine incremental backup.
Similar to snapshot differentials or delta differencing, Change Block Tracking backs up only the blocks that have changed, rather than backing up every block of every VM in the infrastructure.

<u>CBT requires :</u>

* VMware ESX/ESXi hosts at version 4.0 at least or newer,

* Virtual Machine(s) must be at the virtual hardware version 7 or newer,

* Input/Output (I/O) operations go through the ESX/ESXi storage stack:

* NFS <b>Supported</b>

* VMFS <b>Supported</b> (Local disk, SAN or iSCSI)

* RDM in <u>virtual</u> compatibility mode <b>Supported</b>

* RDM in <u>physical</u> compatibility mode <b>NOT Supported</b>

* CBT must be enable for the Virtual Machine,

* Virtual Machine storage must not be (persistent or non-persistent) independent disk (unaffected by snapshots),

* Finally the Virtual Machine must go through a <b>stun-unstun</b> cycle (power on, resume after suspend, migrate, or snapshot create/delete/revert) before the reconfiguration takes effect.

<u>For CBT to identify disk sectors in use with the special "*" change ID, the following are required:</u>

* The virtual disk must be located on a VMFS volume, backed by SAN, iSCSI, or local disk. <u>RDM is not VMFS,</u>

* The virtual machine must have zero snapshot when CBT is enabled.

<u>Other Important points about CBT:</u>

By default the Change Block Tracking (CBT) is <b>disabled</b>.

Administrators can enable CBT and some backup tools enable it automatically (It was the case for me using Symantec NetBackup). If any blocks were changed since the last backup, Changed Block Tracking tags them and stores the information in a CTK file in the Virtual Machine folder by default. CBT tells the vSphere or third-party backup tool to copy these changed blocks, avoiding copies of the entire VM. This reduces the amount of data undergoing backup.

Once enabled, the three following entries will appear in the "<b>Configuration Parameters</b>" values of the Virtual Machine.
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130702_Enabling_Change_Block_Tracking_(CBT)_on_a_vSphere_5.1_VM_with_PowerShellPowerCli/CBT01__848606007__-209x37.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130702_Enabling_Change_Block_Tracking_(CBT)_on_a_vSphere_5.1_VM_with_PowerShellPowerCli/CBT01__848606007__-209x37.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><span style="background-color: white; color: #010101; font-family: 'Droid Sans'; font-size: 12.222222328186035px; line-height: 18.88888931274414px;">This enable CBT on your VM.
<b style="background-color: white; color: #010101; font-family: 'Droid Sans'; font-size: 12.222222328186035px; line-height: 18.88888931274414px;">ctkEnabled</b><span style="background-color: white; color: #010101; font-family: 'Droid Sans'; font-size: 12.222222328186035px; line-height: 18.88888931274414px;">= true</td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130702_Enabling_Change_Block_Tracking_(CBT)_on_a_vSphere_5.1_VM_with_PowerShellPowerCli/CBT02__1264100792__-322x106.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130702_Enabling_Change_Block_Tracking_(CBT)_on_a_vSphere_5.1_VM_with_PowerShellPowerCli/CBT02__1264100792__-322x106.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><span style="background-color: white; color: #010101; font-family: 'Droid Sans'; font-size: 12.222222328186035px; line-height: 18.88888931274414px;">Additionally, you will have an entry for each disk. (in this example I had two virtual disks)
<b style="background-color: white; color: #010101; font-family: 'Droid Sans'; font-size: 12.222222328186035px; line-height: 18.88888931274414px;">scsi0:0.ctkEnabled</b><span style="background-color: white; color: #010101; font-family: 'Droid Sans'; font-size: 12.222222328186035px; line-height: 18.88888931274414px;">= true
<b style="background-color: white; color: #010101; font-family: 'Droid Sans'; font-size: 12.222222328186035px; line-height: 18.88888931274414px;">scsi0:1.ctkEnabled</b><span style="background-color: white; color: #010101; font-family: 'Droid Sans'; font-size: 12.222222328186035px; line-height: 18.88888931274414px;">= true</td></tr></tbody></table>VMware acknowledges that CBT could reset or lose track of incremental changes in the event of a power failure or hard shutdown. In vSphere 4.1 and prior, Cold Migration (but not Storage vMotion) could reset but not disable CBT. In vSphere 5.x, Storage vMotion will reset CBT.



<span style="font-size: x-large;"><b>PowerShell</b>
Obviously you will need VMware PowerCli ; Here I used PowerCli version 5.1 with PowerShell 3.0.
<a href="https://my.vmware.com/web/vmware/details?productId=285&amp;downloadGroup=VSP510-PCLI-510" target="_blank">Download VMware PowerCli</a>
<a href="http://www.microsoft.com/en-ca/download/details.aspx?id=34595" target="_blank">Download PowerShell 3.0</a>

<b>Set-VMChangeBlockTracking</b>
<script src="https://gist.github.com/lazyadmin/800ef5dd742dd8701152.js"></script> 

Here is the small piece of the script that actually does the change (download the full script a bit below)


```
PROCESS{
    TRY{
        foreach ($item in $vm){
            Write-Verbose -Message "$item - Setting the Change Block Tracking Setting to $Enable..."
            $CurrentVM = Get-vm $item | get-view
            $vmConfigSpec = New-Object VMware.Vim.VirtualMachineConfigSpec
            $vmConfigSpec.changeTrackingEnabled = $true
            $CurrentVM.reconfigVM($vmConfigSpec)
        }#foreach
    }# TRY Block
     
    CATCH{
        Write-Warning -Message "Wow Something went wrong with $item"
    }#CATCH Block
}#PROCESS Block
```


<a href="{{ site.url }}/images/2013/20130702_Enabling_Change_Block_Tracking_(CBT)_on_a_vSphere_5.1_VM_with_PowerShellPowerCli/completed__1437540245__-430x52.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130702_Enabling_Change_Block_Tracking_(CBT)_on_a_vSphere_5.1_VM_with_PowerShellPowerCli/completed__1053027354__-430x52.png" /></a>




Again, Once your enabled CBT, your VM will need to go through a<b>stun-unstun</b>cycle (power on, resume after suspend, migrate, or snapshot create/delete/revert) before the reconfiguration takes effect.


<span style="font-size: x-large;"><b>Download</b>
<a href="http://gallery.technet.microsoft.com/Set-VMChangeBlockTracking-b422af9a" target="_blank">Technet Repository </a>


<span style="font-size: x-large;"><b>Resources</b>


* VMware:<a href="http://kb.vmware.com/selfservice/documentLinkInt.do?micrositeID=&amp;popup=true&amp;languageId=&amp;externalID=1031873" target="_blank">Enabling Changed Block Tracking (CBT) on virtual machines (1031873)</a>

* LazyWinAdmin:<a href="{{ site.url }}/2013/01/enabling-change-block-tracking-cbt-on.html" target="_blank">Enabling Change Block Tracking (CBT) on a Virtual Machine (VMware vSphere 5.1)</a>




