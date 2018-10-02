---
layout: single
title: PowerShell SCCM 2007 Module - My contribution
excerpt: 
permalink: /2013/06/powershell-sccm-2007-module-my.html
tags: 
- performance
- powershell
- powershell module
- sccm
- sccm2007
- wmi
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20130628_PowerShell_SCCM_2007_Module_-_My_contribution/1372280949_iEngrenages__804235352__-256x256.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="200" src="{{ site.url }}/images/2013/20130628_PowerShell_SCCM_2007_Module_-_My_contribution/1372280949_iEngrenages__1760613103__-200x200.png" width="200" /></a>I recently contributed to a PowerShell module called <b>SCCM Automation</b> created by <a href="https://github.com/andrebocchini" target="_blank">Andre Bocchini</a>. (SCCM stands for <b>S</b>ystem <b>C</b>enter <b>C</b>onfiguration <b>M</b>anager)

Take a look at it on GitHub here:[https://github.com/andrebocchini/sccm-powershell-automation-module](https://github.com/andrebocchini/sccm-powershell-automation-module)Andre really did an awesome job on this module!

This Module for SCCM 2007 (which does not come with a set of PowerShell Cmdlets) allows you to query Computers, Collections, Advertisements etc... (<a href="https://github.com/lazyadmin/sccm-powershell-automation-module" target="_blank">Check the Full list of Cmdlets</a>)

However against <u>big SCCM environment</u> I notice some functions queries were <u>very slow</u> to report object.
After inspecting the code, I tweaked some parts of the code, especially on the<span style="font-family: Courier New, Courier, monospace;">Get-WmiObject queries.
Those modifications are now part of the module.



<u><span style="font-size: x-large;">Here is an example :</u>

```
# In the module we have the following query 
#  (I had Backtick to fit in my blog, don't do this at home! ;-) )
$computer =  Get-WMIObject `
                  -ComputerName $siteProvider `
                  -Namespace "root\sms\site_$siteCode" `
                  -Class "SMS_R_System" | Where { $_.ResourceID -eq $resourceId }
  
# Let's measure our command on a big environment (+6000 computers)
#  Note that I replaced some values, you need to specify the SiteProvider, SiteCode and 
#  ResourceID.
Measure-Command {Get-WMIObject`
                    -ComputerName <SiteProvider> `
                    -Namespace "root\sms\site_<SITECODE>" `
                    -Class "SMS_R_System" | where-object { $_.ResourceID -eq <ResourceID> }}


Days              : 0
Hours             : 0
Minutes           : 0
Seconds           : 42
Milliseconds      : 273
Ticks             : 422735527
TotalDays         : 0.000489277230324074
TotalHours        : 0.0117426535277778
TotalMinutes      : 0.704559211666667
TotalSeconds      : 42.2735527
TotalMilliseconds : 42273.5527
```
<b>It took 42 seconds to finish this command</b>, that's pretty long... 
Basically the command has to gather ALLLLLL the objects from the class <span style="font-family: Courier New, Courier, monospace;">SMS_R_Systemand then send it throught the pipe to <span style="font-family: Courier New, Courier, monospace;">Where-Object to filter on the <span style="font-family: Courier New, Courier, monospace;">ResourceID property.

<u><span style="font-size: x-large;">Let's try to improve this and use some filtering! </u>

```

# Let's measure our command on a big environment (+6000 computers) with some filtering
#  Note that I replaced some values, you need to specify the SiteProvider, SiteCode and 
#  ResourceID.
Measure-Command {Get-WMIObject`
                    -ComputerName <SiteProvider> `
                    -Namespace "root\sms\site_<SITECODE>" `
                    -Query "Select * From SMS_R_System WHERE ResourceID='<ResourceID>'"}
                    
Days              : 0
Hours             : 0
Minutes           : 0
Seconds           : 0
Milliseconds      : 202
Ticks             : 2026858
TotalDays         : 2.34590046296296E-06
TotalHours        : 5.63016111111111E-05
TotalMinutes      : 0.00337809666666667
TotalSeconds      : 0.2026858
TotalMilliseconds : 202.6858

```
WOW! This time <b>Only 200 Milliseconds!!</b> Pretty Awesome! Filtering is definitely the way to go! ;-)  
All I did is really filtering on the <span style="font-family: Courier New, Courier, monospace;">ResourceID property with <span style="font-family: Courier New, Courier, monospace;">Get-WmiObject, I don't need to retrieve all the data.
<a href="{{ site.url }}/images/2013/20130628_PowerShell_SCCM_2007_Module_-_My_contribution/Apps-preferences-system-performance-icon__2062179201__-128x128.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130628_PowerShell_SCCM_2007_Module_-_My_contribution/Apps-preferences-system-performance-icon__2062179201__-128x128.png" /></a>

<b>In Powershell you should <u>Always Always Always ALWAYSS</u>try to filter before sending the output to the pipeline, and this apply to all the Cmdlets...</b>
<b>
</b>This was well resumed by the Scripting Guy, Ed Wilson [<a href="http://blogs.technet.com/b/heyscriptingguy/archive/2012/06/18/the-top-ten-powershell-best-practices-for-it-pros.aspx" target="_blank">Top Ten PowerShell Best Practices</a>]:
<blockquote class="tr_bq"><i>Filter on the left. It is more efficient to filter returning data as close to the source of data as possible. For example, you do not want to return the entire contents of the system event log across the network to your work station, and then filter events for a specific event ID. Instead, you want to filter the system event log on the server, and then return the data.</i></blockquote><a href="{{ site.url }}/images/2013/20130628_PowerShell_SCCM_2007_Module_-_My_contribution/Speed-and-Performance__1452023694__-800x528.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="420" src="{{ site.url }}/images/2013/20130628_PowerShell_SCCM_2007_Module_-_My_contribution/Speed-and-Performance__801324726__-640x422.png" width="640" /></a>
<span style="font-size: x-large;"><b>Resources</b>


* <b><a href="http://www.ravichaganti.com/blog/?p=1979" target="_blank">WMI Query Language via PowerShell</a></b>(<a class="g-profile" href="http://plus.google.com/110564367450021986559" target="_blank">+Ravikanth Chaganti</a><a class="g-profile" href="http://plus.google.com/104294620073200035587" target="_blank">+Shay Levy</a><a class="g-profile" href="http://plus.google.com/113697802432095788357" target="_blank">+Aleksandar Nikolic</a><a class="g-profile" href="http://plus.google.com/116565701834959931553" target="_blank">+Philip LaVoie</a>and Robert Robelo) Free Ebook, If you are learning PowerShell This is a must read !! Those guys did an awesome work

* <a href="http://msdn.microsoft.com/en-us/library/cc145334.aspx" target="_blank"><b>System Center Configuration Manager Software Development Kit</b></a>




