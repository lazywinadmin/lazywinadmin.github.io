---
description: "In one of my last post I installed a new SQL Server 2012 in my Home Lab. This was a requirement for a few incoming home lab projects."
layout: single
title: Installing Microsoft System Center Orchestrator 2012 SP1
excerpt: 
permalink: /2013/06/installing-microsoft-system-center.html
tags:
- automation
- orchestrator
published: true
comments: true
---
<div class="" style="clear: both; text-align: left;">In <a href="{{ site.url }}/2013/06/installing-microsoft-sql-server-2012.html" target="_blank">one of my last post</a> I installed a new SQL Server 2012 in my Home Lab. This was a requirement for a few incoming home lab projects. One of those projects is Microsoft System Center 2012 Orchestrator. I will have to install, configure and manage this product at my work and thought it would be nice to get familiar with it.<a href="{{ site.url }}/images/2013/20130627_Installing_Microsoft_System_Center_Orchestrator_2012_SP1/automate-all-the-things__567657884__-1600x1200.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="automate all the things" loading="lazy" decoding="async" border="0" height="240" src="{{ site.url }}/images/2013/20130627_Installing_Microsoft_System_Center_Orchestrator_2012_SP1/automate-all-the-things__2061840701__-320x240.png" width="320" /></a><div class="" style="clear: both; text-align: left;">
<div class="" style="clear: both; text-align: left;">In 2009, Microsoft bought a company called Opalis that offers an automation platform for orchestrating and integrating IT tools to decrease the cost of datacenter operations while improving the reliability of IT processes. It enables IT organizations to automate best practices, such as those found in Microsoft Operations Framework (MOF) and Information Technology Infrastructure Library (ITIL). Opalis operates through workflow processes that coordinate System Center and other management tools to automate incident response, change and compliance, and service-lifecycle management processes.<div class="" style="clear: both; text-align: left;">
<div class="" style="clear: both; text-align: left;">Opalis was recently renamed Orchestrator and integrated into the System Center suite.<div class="" style="clear: both; text-align: left;">
<div class="" style="clear: both; text-align: left;">The following procedure will cover a basic/generic install of System Center Orchestrator 2012. This is to be used as a template or POC only.<div class="" style="clear: both; text-align: left;">

<div class="" style="clear: both; text-align: left;"><b><span style="font-size: x-large;">Resources</b><div class="" style="clear: both; text-align: left;">
* <a href="http://technet.microsoft.com/en-us/library/hh237242.aspx" target="_blank">Technet Documentation</a>

* <a href="http://technet.microsoft.com/en-US/evalcenter/hh505660.aspx?wt.mc_id=TEC_103_1_5" target="_blank">Download</a>

* VIDEO:<a href="http://channel9.msdn.com/Events/TechEd/NorthAmerica/2013/MDC-B201#fbid=o7rk9O5rx58" target="_blank">Microsoft System Center 2012 - Orchestrator: Crash Course</a>

* VIDEO:<a href="http://channel9.msdn.com/Events/MMS/2013/SD-B202" target="_blank">What's New with Orchestrator Integration Packs for System Center and SP1</a>

* VIDEO:<a href="http://channel9.msdn.com/Shows/Edge/Edge-Show-39-Orchestrator-Enhancements-in-System-Center-2012-SP1#time=4m25s" target="_blank">Edge Show 39 - Orchestrator Enhancements in System Center 2012 SP1</a>

* VIDEO:<a href="http://channel9.msdn.com/Events/MMS/2013/SD-B317" target="_blank">Best Practices For Runbook Authoring and Managing Orchestrator</a>

* VIDEO:<a href="http://channel9.msdn.com/Events/MMS/2013/SD-B318" target="_blank">Orchestrator Best Practices: Lessons Learned at Cargill</a>

* VIDEO:<a href="http://channel9.msdn.com/Events/TechEd/NorthAmerica/2013/MDC-B204#fbid=o7rk9O5rx58" target="_blank">Microsoft System Center 2012 - Orchestrator: Integration Packs</a>

* VIDEO:<a href="http://channel9.msdn.com/Events/MMS/2013/UD-B342" target="_blank">Pairing Configuration Manager 2012 and Orchestrator 2012</a>

* VIDEO:Orchestrator Architecture Overview with SC 2012 SP1 Orchestrator <a href="http://technet.microsoft.com/en-us/video/microsoft-virtual-academy-system-center-2012-sp1-automation-part-2-orchestrator-architecture-overview-with-system-center-2012-sp1-orchestrator-part-1" target="_blank">Part 1</a> <a href="http://technet.microsoft.com/en-us/video/microsoft-virtual-academy-system-center-2012-sp1-automation-part-2-orchestrator-architecture-overview-with-system-center-2012-sp1-orchestrator-part-2.aspx" target="_blank">Part 2</a>

* VIDEO:<a href="http://www.youtube.com/user/charlesjoyMS" target="_blank">Charles Joy - Youtube channel</a>

* LAB:<a href="http://channel9.msdn.com/Events/TechEd/NorthAmerica/2013/MDC-H315#fbid=o7rk9O5rx58" target="_blank">Microsoft System Center 2012 - Orchestrator: Overview and Automation of IT Process</a>

* LAB:<a href="http://www.microsoftvirtualacademy.com/training-courses/system-center-2012-orchestrator-service-manager" target="_blank">System Center 2012: Orchestrator (SCO) &amp; Service Manager (SCSM)</a>

* CODEPLEX: <a href="http://orchestrator.codeplex.com/" target="_blank">System Center 2012 Orchestrator Community Releases</a>

* CODEPLEX:<a href="http://scorch.codeplex.com/" target="_blank">Community Project for System Center Orchestrator (SCORCH) Integration Packs and Utilities</a>
<div class="" style="clear: both; text-align: left;"><b><span style="font-size: x-large;">
</b><div class="" style="clear: both; text-align: left;"><b><span style="font-size: x-large;">Deployment</b><div class="" style="clear: both;"><u>
</u><div class="" style="clear: both;"><u>Server Names and Roles:</u><div class="" style="clear: both;"><b>LAB1OR01</b>- System Center 2012 Orchestrator SP1<div class="" style="clear: both;">Operating System : Windows Server 2012 Standard<div class="" style="clear: both;">Joined to Domain<div class="" style="clear: both;">
* Orchestrator Roles:

* Management Server

* RunBook Server

* Orchestrator Web Service Server

* RunBook Designer client application

<div class="" style="clear: both;"><b>LAB1SQL01</b>- Microsoft SQL Server 2012 SP1 Standard Edition<div class="" style="clear: both;">Operating System : Windows Server 2012 Standard<div class="" style="clear: both;">Joined to Domain<div class="" style="clear: both;">
<div class="" style="clear: both;"><u>Process:</u><div class="" style="clear: both;">* 
* Active Directory, Create the following accounts and groups
* 
* DOMAIN\svc-scorch  (SCO Management, RunBook and Monitor Account)

* DOMAIN\ScorchUsers  (SCO Users with permissions/ this is Domain Global Group)


* Add the domain users that need access to SCO in the group ScorchUsers.

* Install Prerequisites

* Install System Center Orchestrator Server

<u>
</u><u>Prerequisites</u>
<div class="" style="clear: both; text-align: left;">* 
* Mimimum of 1GB of RAM

* .Net 3.5 SP1

* IIS Role

* Add DOMAIN\svc-scorch and DOMAIN\ScorchUsers to the Local Administrators Group.


<div class="" style="clear: both; text-align: left;"><b><span style="font-size: x-large;">Installation</b><div class="" style="clear: both; text-align: left;">
<div class="" style="clear: both; text-align: left;">
<div class="" style="clear: both; text-align: left;">1 - Click on Install.<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-10-20_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 2 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="613" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-10-20_PM_s640.png" width="640" /></a>If you did not install .Net Framework 3.5 yet, you'll get the following warning
<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-12-16_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 3 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-12-16_PM.png" /></a>
2 - Install the .Net Framework 3.5 Features in the Server Manager console.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-13-10_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 4 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="456" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-13-10_PM_s640.png" width="640" /></a>
<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-18-41_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 5 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="456" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-18-41_PM_s640.png" width="640" /></a>
<div class="separator" style="clear: both; text-align: left;">3 - In the next screen enter your information and Product Key (if you have one). Click <b>Next</b>.<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-19-54_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 6 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-19-54_PM_s640.png" width="640" /></a>
<div class="separator" style="clear: both; text-align: left;">4 - Read and Accept the license terms.Click<b>Next</b>.<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-21-44_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 7 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-21-44_PM_s640.webp" width="640" /></a>
5 - Select the System Center 2012 Orchestrator features to install. Here I leave the default selection.Click<b>Next</b>.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-22-16_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 8 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-22-16_PM_s640.png" width="640" /></a>

6 - The Setup wizard will check if you have all the prerequisites.Click<b>Next</b>.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-22-35_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 9 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-22-35_PM_s640.png" width="640" /></a>
<div class="separator" style="clear: both; text-align: left;">7 - If one <b>Prerequisite</b>is missing you'll get the following display. Tick the "<i>Enable IIS Role</i>" and click on <b>Next.</b> SCO Setup will automatically install the missing role or feature.<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-23-22_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 10 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-23-22_PM_s640.png" width="640" /></a><a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-24-00_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 11 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-24-00_PM_s640.png" width="640" /></a>
<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-24-52_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 12 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-24-52_PM_s640.png" width="640" /></a>

8 - Once installed, you'll have to specify the <b>Service account</b> for System Center Orchestrator.
Ensure this is a success and click <b>Next</b>.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-28-27_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 13 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_6-28-27_PM_s640.png" width="640" /></a>
9 - <b>Configure the database server</b> connection, Type the local computer name if you installed SQL on this server or provide a remote SQL server (and instance if using a named instance) to which you have the System Administrator (SA) Rights in order to create the System Center Orchestrator database and assign permissions to it. Test the database connection and click <b>Next</b>.

<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-15-28_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 14 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-15-28_PM_s640.png" width="640" /></a>
<div class="separator" style="clear: both; text-align: left;">10 - <b>Configure Orchestrator Users Group</b>. Browse Active Directory and select the domain global group created <i>ScorchUsers</i>. Click <b>Next.</b><a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-18-06_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 15 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-18-06_PM_s640.webp" width="640" /></a>

11 - Accept the defaults Web Service ports 81 and 82. Click <b>Next</b>
<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-18-26_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 16 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-18-26_PM_s640.png" width="640" /></a>
12 - Accept the default installation location. Click <b>Next</b>
<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-18-49_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 17 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-18-49_PM_s640.png" width="640" /></a>
13 - Select the appropriate options for Microsoft Update and Customer Experience. Click <b>Next</b>
<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-19-32_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 18 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-19-32_PM_s640.png" width="640" /></a>
<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-19-57_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 19 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-19-57_PM_s640.webp" width="640" /></a>
<div class="separator" style="clear: both; text-align: left;">14 - Finally click <b>Next</b> and the Installation will start. The setup will install all the roles and create the Orchestrator database. This process should be very quick.<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-22-25_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 20 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-22-25_PM_s640.png" width="640" /></a>
15 - Once completed, you'll see the following display.Click<b>Close</b> when you are done.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-24-43_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 21 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="488" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-24-43_PM_s640.png" width="640" /></a>

You can open SQL Management Console and see that the Orchestrator database has been created.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-25-28_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 22 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-25-28_PM.png" /></a>
16 - Verify your consoles open successfully.
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-26-22_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 23 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="441" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-26-22_PM_s640.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Runbook Designer</td></tr></tbody></table>

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-50-17_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 24 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-50-17_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Orchestrator Console will require Microsoft Silverlight</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-51-23_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 25 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="483" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-23_7-51-23_PM_s640.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Orchestrator Console http://localhost:82</td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-24_12-51-35_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 26 from the post &quot;Installing Microsoft System Center Orchestrator 2012 SP1&quot;" loading="lazy" decoding="async" border="0" height="440" src="{{ site.url }}/images/2013/Installing_Microsoft_System_Center_Orchestrator_2012_SP1/2013-06-24_12-51-35_PM_s640.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Deployment Manager</td></tr></tbody></table>

