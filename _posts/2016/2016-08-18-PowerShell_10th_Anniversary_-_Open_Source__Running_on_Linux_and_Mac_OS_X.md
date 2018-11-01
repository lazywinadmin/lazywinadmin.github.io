---
layout: single
title: PowerShell 10th Anniversary - Open Source / Running on Linux and Mac OS X
excerpt: 
permalink: /2016/08/powershell-10th-anniversary-open-source.html
tags: 
- linux
- max os x
- open source
- powershell
published: true
comments: true
toc: true
toc_label: "Table of content"
---

<a href="{{ site.url }}/images/2016/20160818_PowerShell_10th_Anniversary_-_Open_Source__Running_on_Linux_and_Mac_OS_X/PowerShell_10thAnniversary__953515884__-249x254.jpg" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="120" src="{{ site.url }}/images/2016/20160818_PowerShell_10th_Anniversary_-_Open_Source__Running_on_Linux_and_Mac_OS_X/PowerShell_10thAnniversary__2008900208__-196x200.jpg" width="120" /></a>The PowerShell Team <a href="https://azure.microsoft.com/en-us/blog/powershell-is-open-sourced-and-is-available-on-linux/" target="_blank">just dropped a bombshell</a>!

Windows PowerShell is now a cross platform technology with the <b>availability of PowerShell on Linux and Mac</b> !! .... AND.... The PowerShell team is <b>Open Sourcing Windows PowerShell (.Net) and PowerShell Core (.Net Core) </b>!! This is so Cool !!!

Today (2016/08/18) also marks the 10th Anniversary of PowerShell ! Quite a surprise that the PowerShell team prepared for us :-) Given the recent changes in leadership and culture, It is really nice to see Microsoft taking that direction.


<a href="{{ site.url }}/images/2016/20160818_PowerShell_10th_Anniversary_-_Open_Source__Running_on_Linux_and_Mac_OS_X/Whats+new+today__1227934463__-1027x653.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="203" src="{{ site.url }}/images/2016/20160818_PowerShell_10th_Anniversary_-_Open_Source__Running_on_Linux_and_Mac_OS_X/Whats+new+today__1312684459__-320x204.png" width="320" /></a>


## PowerShell is now Open Source

Under the <a href="https://tldrlegal.com/license/mit-license" target="_blank">MIT License</a>, PowerShell is now an Open Source Software (OSS).

This was made possible with<a href="https://blogs.msdn.microsoft.com/dotnet/2016/06/27/announcing-net-core-1-0/" target="_blank">the release of the .NET Core Framework</a>,foundational libraries called CoreFX. A framework available on Windows, OS X and Linux! .NET Core is cross-platform and open source.

PowerShell Core is fairly recent and does not offer all the cmdlets available on PowerShell yet since they don't rely on the same Net Framework as Windows PowerShell (.NET). As a side note, Windows Server 2016 Nano Edition (aka Nano Server) is running on PowerShell Core.


## PowerShell is now a Cross Platform technology

In addition to Windows Client and Server, PowerShell is now available on the following operating systems:

* <b>Linux</b>
  * Ubuntu 14.04 \ 16.04
  * CentOs 7.1
  * RHEL 7
* <b>MAC OS X</b>
  * OS X 10.11

## Download / Test / Contribute

The source are located on Github on the following repository <a href="https://github.com/PowerShell/PowerShell">https://github.com/PowerShell/PowerShell</a>

It also worth to note that the PowerShell Team is also providing some nice examples/demos on their GitHub repository:<a href="https://github.com/PowerShell/PowerShell/tree/master/demos" target="_blank">https://github.com/PowerShell/PowerShell/tree/master/demos</a>

<u>Some of the examples available:</u>

* <a href="https://github.com/PowerShell/PowerShell/tree/master/demos/Apache" target="_blank"><b>Managing Apache</b></a>
* <b><a href="https://github.com/PowerShell/PowerShell/tree/master/demos/DSC" target="_blank">Desired State Configuration (DSC) to set an Apache web Server</a></b>
* <a href="https://github.com/Microsoft/PowerShell-DSC-for-Linux/releases" target="_blank">More information on DSC for Linux</a>
* <b><a href="https://github.com/PowerShell/PowerShell/blob/master/demos/Docker-PowerShell/Docker-PowerShell.ps1" target="_blank">Managing Docker</a></b>
* <a href="https://github.com/PowerShell/PowerShell/tree/master/demos/crontab" target="_blank"><b>Managing Cron jobs via CronTab</b></a>
* <a href="https://github.com/PowerShell/PowerShell/tree/master/demos/powershellget" target="_blank"><b>Using PowerShellGet</b></a>
* <b><a href="https://github.com/PowerShell/PowerShell/tree/master/demos/python" target="_blank">Using PowerShell and Python</a></b> including how to use <u>JSON</u> to exchange structured objects between Python and PowerShell.
* <a href="https://github.com/PowerShell/PowerShell/tree/master/demos/rest" target="_blank"><b>Invoke-WebRequest</b></a>
Some of those are also demoed in a video here:

<a href="https://www.youtube.com/watch?v=2WZwv7TxqZ0" target="_blank"><img border="0" height="169" src="{{ site.url }}/images/2016/20160818_PowerShell_10th_Anniversary_-_Open_Source__Running_on_Linux_and_Mac_OS_X/Youtube_Snover__1633438665__-320x169.png" width="320" /></a>


## Installing PowerShell Core on Linux and Mac

Here is the documentation on how to proceed with the installation of PowerShell Core on Linux and Mac.<a href="https://github.com/PowerShell/PowerShell/blob/master/docs/installation">https://github.com/PowerShell/PowerShell/blob/master/docs/installation</a>

At the time I'm writing this, I only see documentation on how to install PowerShell Core on Linux


<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2016/20160818_PowerShell_10th_Anniversary_-_Open_Source__Running_on_Linux_and_Mac_OS_X/PowerShell_on_Linux__1129078568__-991x680.jpg" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="273" src="{{ site.url }}/images/2016/20160818_PowerShell_10th_Anniversary_-_Open_Source__Running_on_Linux_and_Mac_OS_X/PowerShell_on_Linux__42790099__-400x274.jpg" width="400" /></a></td></tr><tr><td class="tr-caption" style="font-size: 12.8px;">PowerShell Core on Linux

</td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2016/20160818_PowerShell_10th_Anniversary_-_Open_Source__Running_on_Linux_and_Mac_OS_X/PowerShell_on_Mac_OSX__56341299__-964x581.jpg" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="240" src="{{ site.url }}/images/2016/20160818_PowerShell_10th_Anniversary_-_Open_Source__Running_on_Linux_and_Mac_OS_X/PowerShell_on_Mac_OSX__1950227408__-400x241.jpg" width="400" /></a></td></tr><tr><td class="tr-caption" style="font-size: 12.8px;">PowerShell Core on MAC OS X

</td></tr></tbody></table>

## More information



* <a href="https://blogs.msdn.microsoft.com/powershell/2016/08/17/windows-powershell-is-now-powershell-an-open-source-project-with-linux-support-how-did-we-do-it/" target="_blank">Windows PowerShell is now an Open Source Project with Linux support "How did we do it?</a>- PowerShell Team Blog
* <a href="https://blogs.msdn.microsoft.com/powershell/2016/08/18/powershell-on-linux-and-open-source-2/" target="_blank">PowerShell on Linux and Open Source!</a>- PowerShell Team Blog
* <a href="https://azure.microsoft.com/en-us/blog/powershell-is-open-sourced-and-is-available-on-linux/" target="_blank">PowerShell is open sourced and is available on Linux</a>- Azure Team Blog
* <a href="https://www.youtube.com/watch?v=2WZwv7TxqZ0" target="_blank">PowerShell on Linux and Open Source</a> - Jeffery Snover (Video)
* <a href="https://www.youtube.com/watch?v=1uGyswOOPdA" target="_blank">PowerShell Open Sourcing Launch </a>- PowerShell Team (Video)
* <a href="http://www.powershellmagazine.com/2016/08/18/open-source-powershell-on-windows-linux-and-osx/" target="_blank">Open source PowerShell on Windows, Linux, and OS X!</a>- PowerShell Magazine
* <a href="https://powershell.org/2016/08/19/why-powershell-on-linux-is-such-an-accomplishment/" target="_blank">Why PowerShell on Linux is Such an Accomplishment ?</a>- PowerShell.org


## RECAP : 2006 PowerShell v1 > 2016 PowerShell v5

Here is a small recap of the previous version of powershell over the last 10 years with some of most important features introduced for each versions

> Source: Wikipedia (<a href="https://en.wikipedia.org/wiki/Windows_PowerShell">https://en.wikipedia.org/wiki/Windows_PowerShell</a>)


### PowerShell v1 (2006)

PowerShell 1.0 was released in November 2006 for Windows XP SP2, Windows Server 2003 and Windows Vista. It is an optional component of Windows Server 2008.

### PowerShell v2 (2008)

PowerShell 2.0 is integrated with Windows 7 and Windows Server 2008 R2 and is released for Windows XP with Service Pack 3, Windows Server 2003 with Service Pack 2, and Windows Vista with Service Pack 1.

PowerShell V2 includes changes to the scripting language and hosting API, in addition to including more than 240 new cmdlets.

Some of the features:

* PowerShell Remoting
* Background Jobs
* Transactions
* Modules
* Debugging
* Eventing
* PowerShell ISE
* ...

### PowerShell v3 (2012)

Some of the features:

* Scheduled Jobs
* Web Cmdlets
* AST
* Workflow
* CIM Cmdlets

### PowerShell v4 (2013)

Some of the features:

* Desired State Configuration (DSC)
* Save-Help
* Remote Debugging
* PowerShell Web Access (PWA)
* PSReadLine

### PowerShell v5 (2016)

Some of the features:

* PowerShell Classes
* Pester
* PowerShell JEA (Just Enought Administration)
* PacketManagement (OneGet)
* Debugging Runspaces in remote processes
* Debugging PowerShell Background jobs
* Desired State Configuration (DSC) Local Configuration Management (LCM) v2
* DSC Partial Configurations
* DSC LCM meta-Configuration
* Authoring DSC Resource
* Script Analyzer

### PowerShell v5.1 (2016)

Some of the features:

* PacketManagement (Support for proxies)
* PSReadline (VIMode)
* LocalAccount module