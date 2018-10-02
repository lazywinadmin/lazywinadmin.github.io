---
layout: single
title: PowerShell 4.0 is now available
excerpt: 
permalink: /2013/10/powershell-40-is-now-available.html
tags: 
- powershell
- powershell 4.0
published: true
comments: true
---
<b>PowerShell 4.0</b> has been released by Microsoft andis now available to download and install with the Windows Management Framework 4.0 (WMF 4.0).


### <b>Windows PowerShell</b>

Windows PowerShell is a task-based command-line shell and scripting language designed especially for system administration. Built on the .NET Framework, Windows PowerShell helps IT professionals and power users control and automate the administration of the Windows operating system and applications that run on Windows.

Windows PowerShell allows you to run scripts, functions, and modules of cmdlets. Cmdlets are simple verb-noun commands that help you automate management of roles and features that run on the Windows operating system.

After you install WMF 4.0, Windows PowerShell is upgraded to version 4.0.

<a href="http://www.microsoft.com/en-us/download/details.aspx?id=40855" target="_blank"><b>DOWNLOAD HERE</b></a>



Windows6.1-KB2819745-x64-MultiPkg.msu [18.4 MB]
Windows6.1-KB2819745-x86-MultiPkg.msu [14.1 MB]
Windows8-RT-KB2799888-x64.msu [17.5 MB]

<a href="http://3.bp.blogspot.com/-2diabf88qis/UmwRewTSHcI/AAAAAAABeVQ/J-PhMdX4y2o/s1600/2013-10-26+2-59-45+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="284" src="http://3.bp.blogspot.com/-2diabf88qis/UmwRewTSHcI/AAAAAAABeVQ/J-PhMdX4y2o/s640/2013-10-26+2-59-45+PM.png" width="640" /></a>

### <b>New Features, functionality and updates included in this new WMF 4.0</b>


* Windows PowerShell

* Windows PowerShell Integrated Scripting Environment (ISE)

* Windows PowerShell Web Services (Management OData IIS Extension)

* Windows Remote Management (WinRM)

* Windows Management Infrastructure (WMI)

* Windows PowerShell Desired State Configuration (DSC)


### <b>Supported Operating System</b>

<span style="background-color: yellow;"><b><u>IMPORTANT:</u> your system requires</b><a href="http://www.microsoft.com/en-us/download/details.aspx?id=30653" target="_blank"><b>.NET Framework 4.5</b></a>

* Windows 7 SP1

* x64: Windows6.1-KB2819745-x64-MultiPkg.msu

* x86: Windows6.1-KB2819745-x86.msu

* Windows Server 2008 R2 SP1

* x64: Windows6.1-KB2819745-x64-MultiPkg.msu

* Windows Server 2012

* x64: Windows8-RT-KB2799888-x64.msu

* and Windows Embedded 7


### <b>This package is <u>not compatible</u> with the following server applications</b>


* System Center 2012 Configuration Manager (not including SP1)

* System Center Virtual Machine Manager 2008 R2 (including SP1)

* Microsoft Exchange Server 2007, 2010 and 2013

* Microsoft SharePoint 2013 and Microsoft SharePoint 2010

* Windows Small Business Server 2011 Standard


### <b>Along with this package, the PowerShell team released a couple of interesting document</b>


* Windows Management Framework 4.0 Release Notes.docx [89KB]

* Desired State Configuration Quick Reference for Windows Management Framework 4.0.pdf[244KB]

* Desired State Configuration Quick Reference for Windows Management Framework 4.0.pptx[73KB]
<a href="http://3.bp.blogspot.com/-p87n5Yh5c4A/UmwZCG6h9QI/AAAAAAABeVo/oEzdiATV8TM/s1600/2013-10-26+3-32-41+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="225" src="http://3.bp.blogspot.com/-p87n5Yh5c4A/UmwZCG6h9QI/AAAAAAABeVo/oEzdiATV8TM/s400/2013-10-26+3-32-41+PM.png" width="400" /></a>

### <b>Some of the new features in <u>Windows PowerShell 4.0</u> include</b>



* Support for workflow and remote script debugging

* Improved workflow authoring experience to make it more consistent with script authoring

* Added PipelineVariable as a common parameter

* Better support for downloading updatable help by using Save-Help and Update-Help in offline scenarios

* Updated version from 3.0 to 4.0

* Several bug fixes and performance improvements


### <b>Windows PowerShell ISE in Windows Management Framework 4.0 introduces</b>



* Support for Windows PowerShell Workflow debugging

* Support for remote script debugging

* IntelliSense support for Windows PowerShell Desired State Configuration resources and configurations



### <b>Windows PowerShell Web Services</b> (<b>Management OData IIS Extension</b>)

enables an administrator to expose a set of Windows PowerShell cmdlets as a RESTful web endpoint accessible by using OData (Open Data Protocol). This provides remote access to run cmdlets from both Windows-based and non-Windows-based client computers or devices.


* Improved error messages in event logs

* Endpoint versioning support

* Autopopulation of OData dispatch schema fields

* Support for complex types

* Multilevel association support

* Ability to perform large binary stream transfers

* Support for non-Create/Read/Update/Delete (CRUD) actions

* Key-As-Segment URL syntax support

* Constrained resource operations



### <b>Windows PowerShell Desired State Configuration (DSC)</b>

Windows Management Framework 4.0 introduces <b>Windows PowerShell Desired State Configuration (DSC)</b>, with the following highlights:


* Local configuration manager for applying configurations on the local computer

* Windows PowerShell language extensions for authoring DSC documents

* PSDesiredStateConfiguration module and DSC-related cmdlets

* A set of built-in DSC configuration resources

* DSC service for distributed access to DSC resources


<span style="background-color: yellow;"><u>KNOWN ISSUE:</u><b>PARTIAL INSTALLATION WITHOUT .NET FRAMEWORK 4.5</b>

When you attempt to install WMF 4.0 on Windows 7 or Windows Server 2008 R2 without .NET Framework 4.5, only the prerequisite QFEs that are included in the package are installed. The installation process attempts to install WMF 4.0, but fails. The two prerequisite QFEs remain on the computer after WMF 4.0 installation fails.

To repair your WMF 4.0 installation after this failure, install .NET Framework 4.5, and then run the WMF 4.0 MSU installation package again to install WMF 4.0. The installation process skips the QFEs, and installs WMF 4.0.




### Finally... Don't forget to do Update-Help


```
Update-Help -Verbose -Force
```

<a href="{{ site.url }}/images/2013/20131026_PowerShell_4.0_is_now_available/updatehelp__843266470__-960x409.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="272" src="{{ site.url }}/images/2013/20131026_PowerShell_4.0_is_now_available/updatehelp__1562408430__-640x273.png" width="640" /></a>


