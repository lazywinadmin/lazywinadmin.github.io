---
layout: single
title: Windows Management Framework (WMF) 5.0 RTM released (again)
excerpt: 
permalink: /2016/02/windows-management-framework-wmf-50-rtm.html
tags: 
- microsoft
- powershell
- powershell 5.0
- powershell team
published: true
comments: true
---

 
<img imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;" border="0" src="{{ site.url }}/images/2016/20160224_Windows_Management_Framework_(WMF)_5.0_RTM_released_(again)/powershell_logo__2124756278__-144x109.png" /> Microsoft just re-released the new version of Windows Management Framework (WMF) 5.0 RTM for Windows Server 2012 R2, Windows Server 2012, Windows 2008 R2 SP1, Windows 8.1, and Windows 7 SP1.

The PowerShell Team previously released WMF 5.0 RTM two months ago but it was pulled-back mainly because of the <a href="https://windowsserver.uservoice.com/forums/301869-powershell/suggestions/11148471-bug-wmf5-rtm-psmodulepath" target="_blank">$PSmodulePath issue</a>.

[Download WMF5]("https://www.microsoft.com/en-us/download/details.aspx?id=50395")

# ChangeLog
> ### Changes in the republished packages
> * The KB numbers of these packages (KB3134758, KB3134759, and KB3134760) are different than previously released WMF 5.0 RTM packages (KB3094174, KB3094175, and KB3094176).
> * These packages have fixes only for the PSModulePath issue compared to the previously released WMF 5.0 RTM packages.
> ### Uninstall previously released WMF 5.0 RTM packages
> You must uninstall previously released WMF 5.0 RTM (KB3094174, KB3094175, and KB3094176) packages.
> ### No impact to Windows 10 and Windows Server 2016 Technical Preview builds
> Windows 10 and Windows Server 2016 Technical Previews builds are not impacted by the above mentioned PSModulePath issue. This issue was only impacting down-level systems where WMF 5.0 RTM can be installed.
> ### To install WMF 5.0 by using Command Prompt
> 1. After you have downloaded the correct package for your computer's architecture, open a Command Prompt window with elevated user rights (Run as Administrator). On the Server Core installation options of Windows Server 2012 R2 or Windows Server 2012 or Windows Server 2008 R2 SP1, Command Prompt opens with elevated user rights by default.
> 1. Change directories to the folder into which you have downloaded or copied the WMF 5.0 installation package.
> 1. Run one of the following commands.
> > * On computers that are running <b>Windows Server 2012 R2</b> or <b>Windows 8.1 x64</b>, run `Win7AndW2K8R2-KB3134760-x64.msu /quiet`
> > * On computers that are running <b>Windows Server 2012</b>, run `W2K12-KB3134759-x64.msu /quiet`
> > * On computers that are running <b>Windows Server 2008 R2 SP1</b> or <b>Windows 7 SP1 x64</b>, run `Win7AndW2K8R2-KB3134760-x64.msu /quiet`
> > * On computers that are running <b>Windows 8.1 x86</b>, run `Win8.1-KB3134758-x86.msu /quiet`
* On computers that are running <b>Windows 7 SP1 x86</b>, run `Win7-KB3134760-x86.msu /quiet`



# Overview of all scenarios enabled by WMF 5.0

* New and updated cmdlets based on community feedback
* Generate Windows PowerShell cmdlets based on an OData endpoint with ODataUtils
* Manage `.ZIP` archives through new cmdlets
* Interact with symbolic links using improved Item cmdlets
* Network Switch management with Windows PowerShell
* DSC authoring improvements in Windows PowerShell ISE
* 32-bit support for the configuration keyword in DSC
* Audit Windows PowerShell usage by transcription and logging
* Extract and parse structured object out of string content
* Configure DSC's Local Configuration Manager with the meta-configuration attribute
* Configure piece by piece with partial configurations in DSC
* Manage with cross-computer dependencies in DSC
* More control over configurations in DSC
* Find more detail about configuration status in DSC
* Support for `-?` during DSC configuration compilation
* Support for DSC `RunAsCredential`
* Rich information for DSC LCM State
* Side-by-Side installation of DSC Resources
* PSDesiredStateConfiguration Module version updated to 1.1
* Discover and install software with PackageManagement
* Discover modules and DSC resources with PowerShellGet
* Develop with classes in Windows PowerShell
* More control and remoting in Windows PowerShell Debugging
* Report configuration status from DSC to a central location
* Software Inventory Logging.


# Resources
* [PowerShell Team Blog Article](https://blogs.msdn.microsoft.com/powershell/2016/02/24/windows-management-framework-wmf-5-0-rtm-packages-has-been-republished/)

* [Get WMF5 on Microsoft Download](https://www.microsoft.com/en-us/download/details.aspx?id=50395)

* [MSDN Documentation WMF 5.0 RTM Release Notes Overview](https://msdn.microsoft.com/en-us/powershell/wmf/releasenotes)

<img border="0" src="{{ site.url }}/images/2016/20160224_Windows_Management_Framework_(WMF)_5.0_RTM_released_(again)/WMF5RTM_01__1094346790__-844x349.jpg"  />

