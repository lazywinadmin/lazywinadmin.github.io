---
layout: single
title: PowerShell - PowerShell v5 "Preview" available
excerpt: 
permalink: /2014/04/powershell-powershell-v5-preview.html
tags: 
- dsc
- module
- networkswitch module
- oneget module
- powershell
- powershell 5.0
- wmf 5
published: true
comments: true
---

 
 <a href="{{ site.url }}/images/2014/20140406_PowerShell_-_PowerShell_v5_Preview_available/2014-04-04_22-04-15__926260955__-154x111.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140406_PowerShell_-_PowerShell_v5_Preview_available/2014-04-04_22-04-15__926260955__-154x111.png" /></a>
Wow that was really fast!! In case you missed it last week,<b>PowerShell 5.0</b> <span style="background-color: yellow;">"Preview" has been released by Microsoft part of Windows Management Framework 5.0 (WMF 5.0) <u>Preview</u>. The release of the version 4 <a href="{{ site.url }}/2013/10/powershell-40-is-now-available.html" target="_blank">was not so long ago (October 2013)</a>, Microsoft is definitely increasing the pace of releases.

DownloadWMF v5<a href="http://www.microsoft.com/en-us/download/details.aspx?id=42316" target="_blank">here</a>.




# <b>What's New?</b>

This preview release brings the following update/features:<ul>
* <b>Update of PowerShell Desired State Configuration</b>: performance improvements +bug fixes,

* Module<b>OneGet</b>to manage lists of software repositories, search/acquire/install/uninstall packages

* Module<b>NetworkSwitch</b>. to manage Windows network switches
</ul>
In my opinion, the coolest feature is the module<b><u>OneGet</u></b>which allows you manage/install/uninstall packages, (Linux world has something similar called<b>Apt-Get</b>for a very long time). I think this is a very good news and it will had more flexibility to the sysadmin work.

Once installed, <span style="font-family: Courier New, Courier, monospace;">$PSVersionTablewill report the following result :-) <span style="font-family: Courier New, Courier, monospace;">PSVersion: 5.0.9701.0



<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/20140406_PowerShell_-_PowerShell_v5_Preview_available/2014-04-04_22-29-18__886812005__-692x298.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2014/20140406_PowerShell_-_PowerShell_v5_Preview_available/2014-04-04_22-29-18__886812005__-692x298.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Upgraded :-)</td></tr></tbody></table>




# New Module: NetworkSwitch

I really like what Microsoft is doing ... Interoperability, pushing for a better ecosystem, ... Microsoft is embracing standards-based management to accelerate the process, Windows PowerShell will now allow us to manage Switches very easily. However your switch will need to be "Certified for Windows Program" and able to support CIM /WSMAN standards. Not sure this will be compatible with my lab Switch Cisco SG300-20 but I will investigate :-)<blockquote class="tr_bq"><b>Jeffrey Snover</b> - "<i>In Windows Server 2012 R2, Microsoft worked with the industry and DMTF (Distributed Management Task Force) to standardize the schema and protocol for managing network switches. We published the Windows Server Logo certification program to ensure interoperability. This effort was part of the Data Center Abstraction (DAL) vision which was led by Microsoft working closely with industry leaders in this space such as: Arista, Cisco and Huawei. Using Windows Server 2012 R2, network switches that pass the Certified for Windows program can now be managed natively by System Center Virtual Machine Manager 2012 R2 (SCVMM) without the need to write custom plugins. You can learn more here</i><i>In July of 2013 we published the blog DAL in action: Managing network switches using PowerShell and CIM which described how to manage the network switch via PowerShell by using the CIM cmdlets.</i><i>In this release, we have added a set of L2 Layer NetworkSwitch management PowerShell cmdlets to manage Certified for Windows network switches.</i>" <a href="http://blogs.technet.com/b/windowsserver/archive/2014/04/03/windows-management-framework-v5-preview.aspx" target="_blank">Source</a></blockquote>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/20140406_PowerShell_-_PowerShell_v5_Preview_available/IC666259__278754328__-557x313.jpg" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2014/20140406_PowerShell_-_PowerShell_v5_Preview_available/IC666259__278754328__-557x313.jpg" height="223" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Datacenter Abstraction Layer (DAL) Overview - <a href="http://technet.microsoft.com/en-us/library/dn265975.aspx" target="_blank">Technet</a></td></tr></tbody></table>


Here is a list of the cmdlets available to us
```
Get-Command -Module NetworkSwitch
```


```
CommandType     Name                                               Source
-----------     ----                                               ------
Function        Disable-NetworkSwitchEthernetPort                  NetworkSwitch
Function        Disable-NetworkSwitchFeature                       NetworkSwitch
Function        Disable-NetworkSwitchVlan                          NetworkSwitch
Function        Enable-NetworkSwitchEthernetPort                   NetworkSwitch
Function        Enable-NetworkSwitchFeature                        NetworkSwitch
Function        Enable-NetworkSwitchVlan                           NetworkSwitch
Function        Get-NetworkSwitchEthernetPort                      NetworkSwitch
Function        Get-NetworkSwitchFeature                           NetworkSwitch
Function        Get-NetworkSwitchGlobalData                        NetworkSwitch
Function        Get-NetworkSwitchVlan                              NetworkSwitch
Function        New-NetworkSwitchVlan                              NetworkSwitch
Function        Remove-NetworkSwitchEthernetPortIPAddress          NetworkSwitch
Function        Remove-NetworkSwitchVlan                           NetworkSwitch
Function        Restore-NetworkSwitchConfiguration                 NetworkSwitch
Function        Save-NetworkSwitchConfiguration                    NetworkSwitch
Function        Set-NetworkSwitchEthernetPortIPAddress             NetworkSwitch
Function        Set-NetworkSwitchPortMode                          NetworkSwitch
Function        Set-NetworkSwitchPortProperty                      NetworkSwitch
Function        Set-NetworkSwitchVlanProperty                      NetworkSwitch
```

```

```


# New Module: Windows PowerShell OneGet

The coolest news in my opinion is the module OneGet which allow you to install and uninstall packages.<blockquote class="tr_bq"><b>Jeffrey Snover</b> - "... <i>introduces Windows PowerShell OneGet to dramatically simplify finding and installing software on your machines. OneGet works with the community-based software repository called Chocolatey which has over 1,700 unique software packages. Step by step, we are delivering the technologies you need to simplify creating and operating your computing environment..</i>." <a href="http://blogs.technet.com/b/windowsserver/archive/2014/04/03/windows-management-framework-v5-preview.aspx" target="_blank">Source</a></blockquote>
Here is a list of the cmdlets available to us
```
Get-Command -Module OneGet
```


```
CommandType     Name                                               Source
-----------     ----                                               ------
Cmdlet          Add-PackageSource                                  OneGet
Cmdlet          Find-Package                                       OneGet
Cmdlet          Get-Package                                        OneGet
Cmdlet          Get-PackageSource                                  OneGet
Cmdlet          Install-Package                                    OneGet
Cmdlet          Remove-PackageSource                               OneGet
Cmdlet          Uninstall-Package                                  OneGet

```

The packages available in this module are the ones from Chocolatey repository.
<a href="https://chocolatey.org/packages">https://chocolatey.org/packages</a>

<a href="{{ site.url }}/images/2014/20140406_PowerShell_-_PowerShell_v5_Preview_available/2014-04-04_21-55-52__1628079001__-1024x1034.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140406_PowerShell_-_PowerShell_v5_Preview_available/2014-04-04_21-55-52__1628079001__-1024x1034.png" height="400" width="395" /></a>
There is no documentation so far. But some PowerShellers out there already found a way to define their own repository. <a class="g-profile" href="https://plus.google.com/100797865397105871021" target="_blank">+Boe Prox</a>and<a class="g-profile" href="https://plus.google.com/116113824901529664420" target="_blank">+Eric Courville</a>are already working on that :-) ! Can't wait to see what they come with.


<center><blockquote class="twitter-tweet" lang="en">I have a working internal nuget server that works great with <a href="https://twitter.com/search?q=%23OneGet&amp;src=hash">#OneGet</a>. <a href="https://twitter.com/search?q=%23PowerShell&amp;src=hash">#PowerShell</a> /cc <a href="https://twitter.com/jsnover">@jsnover</a> <a href="https://twitter.com/_organicit">@_organicit</a> <a href="http://t.co/PgOp6YrTZ4">pic.twitter.com/PgOp6YrTZ4</a>
â€” Boe Prox (@proxb) <a href="https://twitter.com/proxb/statuses/452295588432711681">April 5, 2014</a></blockquote><script async="" charset="utf-8" src="//platform.twitter.com/widgets.js"></script></center>



