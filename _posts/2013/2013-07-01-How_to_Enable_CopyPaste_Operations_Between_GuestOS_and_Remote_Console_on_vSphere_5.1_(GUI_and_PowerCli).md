---
layout: single
title: How to Enable Copy/Paste Operations Between GuestOS and Remote Console on vSphere 5.1 (GUI and PowerCli)
excerpt: 
permalink: /2013/07/how-to-enable-copypaste-operations.html
tags: 
- function
- powercli
- powershell
- powershell 3.0
- vmware
- vsphere 5.1
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20130701_How_to_Enable_CopyPaste_Operations_Between_GuestOS_and_Remote_Console_on_vSphere_5.1_(GUI_and_PowerCli)/copypaste__164375054__-256x256.jpeg" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="200" src="{{ site.url }}/images/2013/20130701_How_to_Enable_CopyPaste_Operations_Between_GuestOS_and_Remote_Console_on_vSphere_5.1_(GUI_and_PowerCli)/copypaste__405764048__-200x200.jpeg" width="200" /></a>In this blogpost I will explain how to enable Copy/Paste operations between the Guest Operating System and the Remote Console on VMware vSphere 5.1 <u>via the GUI</u> and <u>PowerCli</u> (PowerShell for VMware).

VMware does not recommend this manipulation to avoid and limit Exposure of Sensitive Data Copied to the Clipboard section.

Using the GUI this procedure requires the VM(s) to be powered off. Who wants to do that? Not me...

Check the second part of this procedure using <b>PowerCli</b>, this can be applied without powering off the VM. However you'll need to do a<b> stun/unstun</b> operation (i.e. power on/off, suspend/resume, create/delete snapshot/storage VMotion) to achieve the same thing.


<span style="font-size: x-large;"><b>Using the Graphical User Interface (GUI)</b>

Applying advanced settings to a VM can be a daunting task.
Doing this manipulation via the GUI is pretty heavy. When dealing with even a few VMs, this can be a very time consuming tasktime consuming...

The "<b>Configuration Parameters</b>" button is not available while the VM is Powered On.

1 - <b>Power down</b> your VM(s)

2 - Go into <b>Edit Setting</b>, under the <b>Option</b> tab, and select <b>General</b> under <b>Advanced</b>.
You'll see the <b>Configuration Parameters</b> button...
<a href="http://2.bp.blogspot.com/-_v6otuqqN-Y/UcuTin4XOZI/AAAAAAABaLM/vw9nbeOCW9g/s1600/2013-06-26+9-19-25+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-_v6otuqqN-Y/UcuTin4XOZI/AAAAAAABaLM/vw9nbeOCW9g/s1600/2013-06-26+9-19-25+PM.png" /></a>


<div class="separator" style="clear: both; text-align: left;">3 - Click on <b>Add Row</b> and enter the <b>Name</b> and <b>Value</b> for each of the following items:
* <b>isolation.tool.copy.disable = FALSE</b>

* <b>isolation.tool.paste.disable = FALSE</b>



<a href="{{ site.url }}/images/2013/20130701_How_to_Enable_CopyPaste_Operations_Between_GuestOS_and_Remote_Console_on_vSphere_5.1_(GUI_and_PowerCli)/04__1265593158__-608x492.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130701_How_to_Enable_CopyPaste_Operations_Between_GuestOS_and_Remote_Console_on_vSphere_5.1_(GUI_and_PowerCli)/04__1265593158__-608x492.png" /></a>

4 - <b>Power On</b> your VM.
and you are done! :-)


Now how to do this with PowerShell ? ...


<b><span style="font-size: x-large;">Using the PowerCli 5.1 (PowerShell with VMware Core PSSnapin) </b>

Now that's the fun part!! I created two functions to ease the work against multiple VMs.
Same thing here, we will edit the two following Advance settings

* <b>isolation.tool.copy.disable</b>

* <b>isolation.tool.paste.disable</b>

<b>Enable-VMCopyPaste </b>
<a href="http://gallery.technet.microsoft.com/Enable-VMCopyPaste-39d785a4" target="_blank">Download on Technet Repository</a>

<b>Disable-VMCopyPaste </b>
<a href="http://gallery.technet.microsoft.com/Disable-VMCopyPaste-b7e770b6" target="_blank">Download on Technet Repository</a>

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><div style="text-align: left;">Using the CmdletNew-AdvancedSettingwe create an Advanced Settings/Specifications that includes the values required for both copy and paste operations into the vSphere client. It then applies it to the VM.
I used <b>-Confirm:$false</b> to avoid the script to request confirmation and <b>-force:$true</b> to overwrite if a similar entry already exist.
After running the script, It must go through a <b>stun-unstun cycle</b> (power on, resume after suspend, migrate, or snapshot create/delete/revert) before the reconfiguration takes effect. In my case, I did a snapshot and deleted it, and that's it ... We are in business!!!
<a href="http://4.bp.blogspot.com/-Pe27nmJNmMc/UcyS19Z69qI/AAAAAAABaMk/9H59_oTU9mw/s709/2013-06-26+10-01-55+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://4.bp.blogspot.com/-Pe27nmJNmMc/UcyS19Z69qI/AAAAAAABaMk/9H59_oTU9mw/s1600/2013-06-26+10-01-55+PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Running<b> Enable-VMCopyPaste</b> against one VM with the Verbose parameter</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://2.bp.blogspot.com/-EuL9JmA_wSM/UcyS5VL38HI/AAAAAAABaMs/GePuiubx3TY/s733/2013-06-26+10-03-32+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://2.bp.blogspot.com/-EuL9JmA_wSM/UcyS5VL38HI/AAAAAAABaMs/GePuiubx3TY/s1600/2013-06-26+10-03-32+PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Running<b>Disable-VMCopyPaste</b>against two VMs with the Verbose parameter</td></tr></tbody></table><b><span style="font-size: x-large;">
</b><b><span style="font-size: x-large;">Resources</b>
You might want to check the following links


* <a href="{{ site.url }}/2013/01/enabling-change-block-tracking-cbt-on.html" target="_blank">Enabling Change Block Tracking (CBT) on a Virtual Machine (VMware vSphere 5.1)</a>

* <a href="http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&amp;cmd=displayKC&amp;externalId=1026437" target="_blank">Clipboard Copy and Paste does not work in vSphere Client 4.1 and later (1026437)</a>

* <a href="http://pubs.vmware.com/vsphere-51/topic/com.vmware.vsphere.security.doc/GUID-367D02C1-B71F-4AC3-AA05-85033136A667.html" target="_blank">Enable Copy and Paste Operations Between the Guest Operating System and Remote Console</a>




