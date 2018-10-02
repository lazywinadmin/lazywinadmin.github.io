---
layout: single
title: What's New in Windows PowerShell 4.0
excerpt: 
permalink: /2013/06/whats-new-in-windows-powershell-40.html
tags: 
- desired state configuration
- documentation
- powershell
- powershell 4.0
- technet
- windows server 2012
published: true
comments: true
---
Microsoft just updated the page "<a href="http://technet.microsoft.com/en-us/hh857339.aspx" target="_blank">What's New in PowerShell</a>" to include information about Windows PowerShell 4.0. They also added a page about <a href="http://technet.microsoft.com/en-us/dn249918" target="_blank">Desired State Configuration</a>.

You can try PowerShell 4.0 by either downloading the <a href="http://technet.microsoft.com/en-sg/evalcenter/dn205292.aspx" target="_blank">Windows Server 2012 R2 </a>Preview which has been release just a few hours ago, or by doing the <a href="http://channel9.msdn.com/Events/TechEd/NorthAmerica/2013/MDC-H310" target="_blank">Desired State Configuration Lab</a> from Channel9.

I highly encourage you to check-out this documentation. From my point of view, the following features are very interesting:

* <b>Windows PowerShell Desired State Configuration (DSC)</b> which is a new management system in Windows PowerShell 4.0 that enables the deployment and management of configuration data for software services, and the environment in which these services run. For more information about DSC, see <a href="http://technet.microsoft.com/en-us/dn249918" target="_blank">Get Started with Windows PowerShell Desired State Configuration</a>.

* VIDEO: <a href="http://channel9.msdn.com/%28A%28H0OfysEUzQEkAAAAYTU1NjNiYzItMTJlMi00MGU2LTlkZTctNmQyNjFiNDllOWQ5boZb8JPaYs0BqzTEXn8zWWaKcuM1%29%29/Events/TechEd/NorthAmerica/2013/MDC-B302#fbid=THgnlu93Qj3" target="_blank">Desired State Configuration in Windows Server 2012 R2 PowerShell</a>

* LAB: <a href="http://channel9.msdn.com/Events/TechEd/NorthAmerica/2013/MDC-H310" target="_blank">Desired State Configuration in Windows Server 2012 PowerShell</a>

* <a href="http://redmondmag.com/blogs/it-decision-maker/2013/06/desired-state-configuration.aspx" target="_blank">Article from Don Jones on Redmondmag.com </a>
<a href="{{ site.url }}/images/2013/20130626_What%27s_New_in_Windows_PowerShell_4.0/dsc01__993013490__-1081x615.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="363" src="{{ site.url }}/images/2013/20130626_What%27s_New_in_Windows_PowerShell_4.0/dsc01__1773073123__-640x364.png" width="640" /></a>


<a href="{{ site.url }}/images/2013/20130626_What%27s_New_in_Windows_PowerShell_4.0/dsc02__1308151124__-1079x615.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="364" src="{{ site.url }}/images/2013/20130626_What%27s_New_in_Windows_PowerShell_4.0/dsc02__618164306__-640x365.png" width="640" /></a>
<a href="{{ site.url }}/images/2013/20130626_What%27s_New_in_Windows_PowerShell_4.0/dsc03__2114821367__-1079x615.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="364" src="{{ site.url }}/images/2013/20130626_What%27s_New_in_Windows_PowerShell_4.0/dsc03__2097888369__-640x365.png" width="640" /></a>

* The default Execution Policy on Windows Server 2012 R2 Preview is <b>RemoteSigned</b>

* A new common parameter, <b>PipelineVariable </b>that lets you save the results of a piped command (or part of a piped command) as a variable that can be passed through the remainder of the pipeline.

* <b>#Requires</b> statements now let users require Administrator access rights, if needed.

* The <b>Import-Csv</b> cmdlet now ignores blank lines.

* A <b>UserName</b> property has been added to <b>Get-Process </b>output objects.

* <a href="http://technet.microsoft.com/en-us/hh857339.aspx" target="_blank">Check-out the Complete list...</a> 


