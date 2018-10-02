---
layout: single
title: Installing Microsoft System Center Orchestrator 2012 SP1
excerpt: 
permalink: /2013/06/installing-microsoft-system-center.html
tags: 
- automate
- automation
- orchestrator
- system center 2012
- system center 2012 orchestrator
published: true
comments: true
---
<div class="" style="clear: both; text-align: left;">In <a href="{{ site.url }}/2013/06/installing-microsoft-sql-server-2012.html" target="_blank">one of my last post</a> I installed a new SQL Server 2012 in my Home Lab. This was a requirement for a few incoming home lab projects. One of those projects is Microsoft System Center 2012 Orchestrator. I will have to install, configure and manage this product at my work and thought it would be nice to get familiar with it.<a href="{{ site.url }}/images/2013/20130627_Installing_Microsoft_System_Center_Orchestrator_2012_SP1/automate-all-the-things__567657884__-1600x1200.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="240" src="{{ site.url }}/images/2013/20130627_Installing_Microsoft_System_Center_Orchestrator_2012_SP1/automate-all-the-things__2061840701__-320x240.png" width="320" /></a><div class="" style="clear: both; text-align: left;">
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
<div class="" style="clear: both; text-align: left;">1 - Click on Install.<a href="http://3.bp.blogspot.com/-s1Jng9AyW7A/UceHSGnY9RI/AAAAAAABZ9k/_bLMxaF6Ysk/s1600/2013-06-23+6-10-20+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="613" src="http://3.bp.blogspot.com/-s1Jng9AyW7A/UceHSGnY9RI/AAAAAAABZ9k/_bLMxaF6Ysk/s640/2013-06-23+6-10-20+PM.png" width="640" /></a>If you did not install .Net Framework 3.5 yet, you'll get the following warning
<a href="http://1.bp.blogspot.com/-lcqBu_S8pow/UceHVA1DV5I/AAAAAAABZ9s/QokyQEZgMbE/s1600/2013-06-23+6-12-16+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-lcqBu_S8pow/UceHVA1DV5I/AAAAAAABZ9s/QokyQEZgMbE/s1600/2013-06-23+6-12-16+PM.png" /></a>
2 - Install the .Net Framework 3.5 Features in the Server Manager console.
<a href="http://1.bp.blogspot.com/-9hdFWstAQjg/UceHVdg-GYI/AAAAAAABZ90/zq2R3X3U_eM/s1600/2013-06-23+6-13-10+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="456" src="http://1.bp.blogspot.com/-9hdFWstAQjg/UceHVdg-GYI/AAAAAAABZ90/zq2R3X3U_eM/s640/2013-06-23+6-13-10+PM.png" width="640" /></a>
<a href="http://2.bp.blogspot.com/-yeQsgCz4JK8/UceHVD_ezTI/AAAAAAABZ9w/m_rsBcFDxak/s1600/2013-06-23+6-18-41+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="456" src="http://2.bp.blogspot.com/-yeQsgCz4JK8/UceHVD_ezTI/AAAAAAABZ9w/m_rsBcFDxak/s640/2013-06-23+6-18-41+PM.png" width="640" /></a>
<div class="separator" style="clear: both; text-align: left;">3 - In the next screen enter your information and Product Key (if you have one). Click <b>Next</b>.<a href="http://1.bp.blogspot.com/-ecdA60UsJKY/UceHYb9g2yI/AAAAAAABZ-E/srqGAgfNXOU/s1600/2013-06-23+6-19-54+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://1.bp.blogspot.com/-ecdA60UsJKY/UceHYb9g2yI/AAAAAAABZ-E/srqGAgfNXOU/s640/2013-06-23+6-19-54+PM.png" width="640" /></a>
<div class="separator" style="clear: both; text-align: left;">4 - Read and Accept the license terms.Click<b>Next</b>.<a href="http://4.bp.blogspot.com/-rW_7Va2rkw8/UceHcU-CTVI/AAAAAAABZ-M/DvccxaemXGE/s1600/2013-06-23+6-21-44+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://4.bp.blogspot.com/-rW_7Va2rkw8/UceHcU-CTVI/AAAAAAABZ-M/DvccxaemXGE/s640/2013-06-23+6-21-44+PM.png" width="640" /></a>
5 - Select the System Center 2012 Orchestrator features to install. Here I leave the default selection.Click<b>Next</b>.
<a href="http://3.bp.blogspot.com/-WPQM2xc6c7c/UceHcbLfj1I/AAAAAAABZ-c/EpvMHwqrETw/s1600/2013-06-23+6-22-16+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://3.bp.blogspot.com/-WPQM2xc6c7c/UceHcbLfj1I/AAAAAAABZ-c/EpvMHwqrETw/s640/2013-06-23+6-22-16+PM.png" width="640" /></a>

6 - The Setup wizard will check if you have all the prerequisites.Click<b>Next</b>.
<a href="http://3.bp.blogspot.com/-DXgEouXOUmQ/UceHcX-EVgI/AAAAAAABZ-Q/POgNGS23cfQ/s1600/2013-06-23+6-22-35+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://3.bp.blogspot.com/-DXgEouXOUmQ/UceHcX-EVgI/AAAAAAABZ-Q/POgNGS23cfQ/s640/2013-06-23+6-22-35+PM.png" width="640" /></a>
<div class="separator" style="clear: both; text-align: left;">7 - If one <b>Prerequisite</b>is missing you'll get the following display. Tick the "<i>Enable IIS Role</i>" and click on <b>Next.</b> SCO Setup will automatically install the missing role or feature.<a href="http://3.bp.blogspot.com/-IWBaUxj0WCY/UceHjtbM_fI/AAAAAAABZ-k/b6ad2lrU2-w/s1600/2013-06-23+6-23-22+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://3.bp.blogspot.com/-IWBaUxj0WCY/UceHjtbM_fI/AAAAAAABZ-k/b6ad2lrU2-w/s640/2013-06-23+6-23-22+PM.png" width="640" /></a><a href="http://1.bp.blogspot.com/-wwsbYfBb0Hg/UceHocvgiJI/AAAAAAABZ-s/7LLrJZcdd3A/s1600/2013-06-23+6-24-00+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://1.bp.blogspot.com/-wwsbYfBb0Hg/UceHocvgiJI/AAAAAAABZ-s/7LLrJZcdd3A/s640/2013-06-23+6-24-00+PM.png" width="640" /></a>
<a href="http://4.bp.blogspot.com/-3hU2PB023qY/UceHondE90I/AAAAAAABZ-w/yip6tumvj08/s1600/2013-06-23+6-24-52+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://4.bp.blogspot.com/-3hU2PB023qY/UceHondE90I/AAAAAAABZ-w/yip6tumvj08/s640/2013-06-23+6-24-52+PM.png" width="640" /></a>

8 - Once installed, you'll have to specify the <b>Service account</b> for System Center Orchestrator.
Ensure this is a success and click <b>Next</b>.
<a href="http://2.bp.blogspot.com/-AOX6f3xIR9c/UceHomAd3UI/AAAAAAABZ-0/EtpXsna5Y7w/s1600/2013-06-23+6-28-27+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://2.bp.blogspot.com/-AOX6f3xIR9c/UceHomAd3UI/AAAAAAABZ-0/EtpXsna5Y7w/s640/2013-06-23+6-28-27+PM.png" width="640" /></a>
9 - <b>Configure the database server</b> connection, Type the local computer name if you installed SQL on this server or provide a remote SQL server (and instance if using a named instance) to which you have the System Administrator (SA) Rights in order to create the System Center Orchestrator database and assign permissions to it. Test the database connection and click <b>Next</b>.

<a href="http://4.bp.blogspot.com/-Nx3fQZQBFUk/UceHo_eafPI/AAAAAAABZ_E/t2ias3h9wUA/s1600/2013-06-23+7-15-28+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://4.bp.blogspot.com/-Nx3fQZQBFUk/UceHo_eafPI/AAAAAAABZ_E/t2ias3h9wUA/s640/2013-06-23+7-15-28+PM.png" width="640" /></a>
<div class="separator" style="clear: both; text-align: left;">10 - <b>Configure Orchestrator Users Group</b>. Browse Active Directory and select the domain global group created <i>ScorchUsers</i>. Click <b>Next.</b><a href="http://2.bp.blogspot.com/-EoYncMBfcHE/UceHyM3FzMI/AAAAAAABZ_Y/ocbvuAmnP9s/s1600/2013-06-23+7-18-06+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://2.bp.blogspot.com/-EoYncMBfcHE/UceHyM3FzMI/AAAAAAABZ_Y/ocbvuAmnP9s/s640/2013-06-23+7-18-06+PM.png" width="640" /></a>

11 - Accept the defaults Web Service ports 81 and 82. Click <b>Next</b>
<a href="http://2.bp.blogspot.com/-s8oOzoCp13k/UceHyC_msBI/AAAAAAABZ_U/b75cBUB7cus/s1600/2013-06-23+7-18-26+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://2.bp.blogspot.com/-s8oOzoCp13k/UceHyC_msBI/AAAAAAABZ_U/b75cBUB7cus/s640/2013-06-23+7-18-26+PM.png" width="640" /></a>
12 - Accept the default installation location. Click <b>Next</b>
<a href="http://3.bp.blogspot.com/-4Izan4ysgXQ/UceH7FZizqI/AAAAAAABaAM/HtSDuAeSCzQ/s1600/2013-06-23+7-18-49+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://3.bp.blogspot.com/-4Izan4ysgXQ/UceH7FZizqI/AAAAAAABaAM/HtSDuAeSCzQ/s640/2013-06-23+7-18-49+PM.png" width="640" /></a>
13 - Select the appropriate options for Microsoft Update and Customer Experience. Click <b>Next</b>
<a href="http://1.bp.blogspot.com/-q6tuVeFDX_4/UceH7enD1RI/AAAAAAABaAU/ifCDx-qlyPg/s1600/2013-06-23+7-19-32+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://1.bp.blogspot.com/-q6tuVeFDX_4/UceH7enD1RI/AAAAAAABaAU/ifCDx-qlyPg/s640/2013-06-23+7-19-32+PM.png" width="640" /></a>
<a href="http://1.bp.blogspot.com/-6V1ETu0yoqk/UceH70hibHI/AAAAAAABaAY/bMXGDn5pc9U/s1600/2013-06-23+7-19-57+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://1.bp.blogspot.com/-6V1ETu0yoqk/UceH70hibHI/AAAAAAABaAY/bMXGDn5pc9U/s640/2013-06-23+7-19-57+PM.png" width="640" /></a>
<div class="separator" style="clear: both; text-align: left;">14 - Finally click <b>Next</b> and the Installation will start. The setup will install all the roles and create the Orchestrator database. This process should be very quick.<a href="http://1.bp.blogspot.com/-Ke2HcL3JnAI/UceIHdzy7HI/AAAAAAABaAk/C5ujzYtNtvM/s1600/2013-06-23+7-22-25+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://1.bp.blogspot.com/-Ke2HcL3JnAI/UceIHdzy7HI/AAAAAAABaAk/C5ujzYtNtvM/s640/2013-06-23+7-22-25+PM.png" width="640" /></a>
15 - Once completed, you'll see the following display.Click<b>Close</b> when you are done.
<a href="http://4.bp.blogspot.com/-nw4Jo8PYnbQ/UceIH93gC8I/AAAAAAABaAo/zPPgKyqUosc/s1600/2013-06-23+7-24-43+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="488" src="http://4.bp.blogspot.com/-nw4Jo8PYnbQ/UceIH93gC8I/AAAAAAABaAo/zPPgKyqUosc/s640/2013-06-23+7-24-43+PM.png" width="640" /></a>

You can open SQL Management Console and see that the Orchestrator database has been created.
<a href="http://4.bp.blogspot.com/-6Bt_LzTlQY8/UceIIMtZN0I/AAAAAAABaA0/eLVSuRNPc9o/s1600/2013-06-23+7-25-28+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-6Bt_LzTlQY8/UceIIMtZN0I/AAAAAAABaA0/eLVSuRNPc9o/s1600/2013-06-23+7-25-28+PM.png" /></a>
16 - Verify your consoles open successfully.
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-kgvzojYuOp8/UceIISSCm7I/AAAAAAABaA8/iiEBcnUiMj4/s1600/2013-06-23+7-26-22+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="441" src="http://3.bp.blogspot.com/-kgvzojYuOp8/UceIISSCm7I/AAAAAAABaA8/iiEBcnUiMj4/s640/2013-06-23+7-26-22+PM.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Runbook Designer</td></tr></tbody></table>

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-kVhPOw8SK-k/UceKO_jbuQI/AAAAAAABaBw/kvyERzEaX70/s1600/2013-06-23+7-50-17+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://3.bp.blogspot.com/-kVhPOw8SK-k/UceKO_jbuQI/AAAAAAABaBw/kvyERzEaX70/s1600/2013-06-23+7-50-17+PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Orchestrator Console will require Microsoft Silverlight</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://2.bp.blogspot.com/-mRK6MiwWX7U/UceKPhJuyoI/AAAAAAABaB4/k8xY77bK-T8/s1600/2013-06-23+7-51-23+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="483" src="http://2.bp.blogspot.com/-mRK6MiwWX7U/UceKPhJuyoI/AAAAAAABaB4/k8xY77bK-T8/s640/2013-06-23+7-51-23+PM.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Orchestrator Console http://localhost:82</td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://2.bp.blogspot.com/-DkkFfecSb1o/Uch543V8zXI/AAAAAAABaF8/8FYOlc-2oDY/s1600/2013-06-24+12-51-35+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="440" src="http://2.bp.blogspot.com/-DkkFfecSb1o/Uch543V8zXI/AAAAAAABaF8/8FYOlc-2oDY/s640/2013-06-24+12-51-35+PM.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Deployment Manager</td></tr></tbody></table>

