---
description: "If you follow my blog, you might have noticed that I recently started to post about SCSM. We just finished to migrate to a new SCSM environment in Azure…"
layout: single
title: PowerShell/SCSM - Install and Config the SMlets Module
excerpt: 
permalink: /2014/09/powershell-scsm-install-and-config.html
tags:
- powershell
- orchestrator
- scsm
published: true
comments: true
---

 
 <a href="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/SCSM_128x128x32__630048673__-128x128.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img alt="SCSM 128x128x32" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/SCSM_128x128x32__630048673__-128x128.png" /></a>If you follow my blog, you might have noticed that I recently started to post <a href="{{ site.url }}/tags/#scsm" target="_blank">about SCSM</a>. We just finished to migrate to a new SCSM environment in Azure (Iaas) while using Cireson Portal as a front end.

Of course of lot of the automation part is handled by SCORCH in the background which rely on a lot of PowerShell :-) (We don't use SMA yet, but I will soon look into it)

Anyway I just wanted to post a quick article on how to configure SMlets on a workstation to be able to query SCSM.


<b><u>First, if you don't have the SCSM console installed locally, you'll need to install the SDK</u></b>
<u>
</u><u>Download:</u> http://msdn.microsoft.com/en-us/windows/desktop/bg162891.aspx

Make sure to select only the feature: .NET Framework 4.5.1 during the installation
<u>
</u>
<a href="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/Windows8.1_SDK__43774700__-775x575.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Windows8.1 SDK" loading="lazy" decoding="async" border="0" height="237" src="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/Windows8.1_SDK__1209726335__-320x238.png" width="320" /></a><u>
</u><u>
</u><u>Browse to one of the following locations</u>:
<span style="font-family: Courier New, Courier, monospace;">\\<i><SCSM_SERVERNAME></i>\c$\Program Files\Microsoft System Center\Service Manager 2010\SDK Binaries\

<b>or</b>

<span style="font-family: Courier New, Courier, monospace;">\\<SCSM_SERVERNAME>\c$\Program Files\Microsoft System Center 2012 R2\Service Manager\SDK Binaries\

<u>And copy the following files to the <b>C:\Windows\Assembly</b> directory</u>
<span style="font-family: Courier New, Courier, monospace;">Microsoft.EnterpriseManagement.Core.dll
<span style="font-family: Courier New, Courier, monospace;">Microsoft.EnterpriseManagement.ServiceManager.dll

You can use the following command (make sure to run powershell as admin)

```
Get-ChildItem *core*, *service* | Copy-Item -dest C:\Windows\assembly
```

<a href="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/smlets_copy_dll__992054084__-757x280.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="smlets copy dll" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/smlets_copy_dll__992054084__-757x280.png" /></a>

<u><b>Register the DLL</b></u>
<a href="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/Smlets_register_dlls__1557911730__-896x255.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Smlets register dlls" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/Smlets_register_dlls__1557911730__-896x255.png" /></a>

<b><u>Download and Install the SMlets module from the following link</u></b>:
<a href="https://smlets.codeplex.com/">https://smlets.codeplex.com/</a>

<b><u>Once installed, Edit the following file</u></b> (<b><i>make sure you do Run As Admin</i></b>)
<span style="background-color: yellow;">C:\Program Files\Common Files\SMLets\Smlets.psm1

<b><u>Comment the lines 4 to 6:</u></b>
<a href="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/9-8-2014%2B10-49-30%2BPM__2123744846__-775x613.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Screenshot from &quot;PowerShell/SCSM - Install and Config the SMlets Module&quot; (1)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/9-8-2014%2B10-49-30%2BPM__2123744846__-775x613.png" /></a>

<b><u>Comment the line 46 and add the following line</u></b>

```
$GLOBAL:smdefaultcomputer = "SCSM_SERVER_FQDN"
```
<a href="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/9-8-2014%2B10-50-10%2BPM__994127369__-775x613.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Screenshot from &quot;PowerShell/SCSM - Install and Config the SMlets Module&quot; (2)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/9-8-2014%2B10-50-10%2BPM__994127369__-775x613.png" /></a>


<b><u>Finally we can test to use the SMlets module</u></b>


```
# Import the SMlets Module
Import-Module -Name SMLets

# Query an Incident ticket
Get-SCSMObject -Class (Get-SCSMClass -Name System.WorkItem.Incident$) -filter "DisplayName -like 'IR31437*'"

```

<a href="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/9-8-2014%2B11-20-49%2BPM__1677607133__-772x318.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Screenshot from &quot;PowerShell/SCSM - Install and Config the SMlets Module&quot; (3)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/20140908_PowerShellSCSM_-_Install_and_Config_the_SMlets_Module/9-8-2014%2B11-20-49%2BPM__1677607133__-772x318.png" /></a>


