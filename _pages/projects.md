---
title: "Scripts/Projects"
layout: single
permalink: /p/scripts.html
toc: true
---

**Important!** This list is not up to date. Most of my projects are now hosted [on Github](https://github.com/lazywinadmin?tab=repositories)! 🕵
{: .notice--info}

<ul>
<li><b>Graphical User Interface (GUI) PowerShell Script</b></li>
<ul>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#ADUserUnlocker">Active Directory User Unlocker</a>(WinForm)</li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#LazyTs">LazyTS </a>(WinForm)</li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#LazyWinAdmin">LazyWinAdmin Tool</a>(WinForm)</li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#TutorialCreatingaBasicGUI">Tutorial -Creating a GUI</a>(WinForm)</li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#TutorialToolMaking">Tutorial - ToolMaking</a>(WinForm)</li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#TutorialListViewControl">Tutorial - ListView Control- Fill my second column</a>(WinForm)</li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#TutorialDataGridViewSorting">Tutorial - DataGridView Control- Sorting</a>(WinForm)</li>
</ul>
<li><b><u>Modules</u></b></li>
<ul>
<li><a href="https://github.com/lazywinadmin/AdsiPS" target="_blank">AdsiPS Module</a></li>
<li><a href="https://github.com/lazywinadmin/WinFormPS" target="_blank">WinFormPS Module</a></li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#NetBackupPSModule">NetBackupPS Module</a></li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#SCCMAutomationModule">SCCMAutomation Module</a></li>
</ul>
<li><b>PowerShell Script</b></li>
<ul>
<li>Active Directory</li>
<ul>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#Add-ADSubnet">Add-ADSubnet</a> (ADSI Function)</li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#Get-ADGPOReplication">Get-ADGPOReplication</a></li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#Get-DomainComputer">Get-DomainComputer</a> (ADSI Function)</li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#MonitorADGroup">Monitor Active Directory Group membership change</a></li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#ReportActiveDirectoryMissingsubnets">Report Active Directory Missing subnets</a></li>
</ul>
<li>VMware</li>
<ul>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#Disable-VMCopyPaste">Disable-VMCopyPaste</a></li>
</ul>
<ul>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#Enable-VMCopyPaste">Enable-VMCopyPaste</a></li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#Set-VMChangeBlockTracking">Set-VMChangeBlockTracking</a></li>
</ul>
<li>Windows OS</li>
<ul>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#Get-ComputerInfo">Get-ComputerInfo</a></li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#Get-DiskSizeInfo">Get-DiskSizeInfo</a></li>
</ul>
<ul>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#GetLocalGroupAllMembers">Get-LocalGroupAllMembers</a></li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#GetLocalGroupMembership">Get-LocalGroupMembership</a></li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#Get-NetStat">Get-NetStat</a></li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#Get-NetStatConvertFrom-String">Get-NetStat Using ConvertFrom-String</a></li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#Get-NetStatConvertFrom-StringTemplateFile">Get-NetStat Using ConvertFrom-String -TemplateFile</a></li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#Get-NetworkLevelAuthentication">Get-NetworkLevelAuthentication (NLA)</a></li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#ReadExcelFileCOM">Read Excel File</a> (Using COM)</li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#ListServiceswhereStartModeisAUTOMATICandNOTrunning">Services where StartMode is AUTOMATIC and NOT running</a></li>
<li><a href="http://www.lazywinadmin.com/p/scripts.html#Set-NetworkLevelAuthentication">Set-NetworkLevelAuthentication (NLA)</a></li>
</ul>
</ul>
<ul>
</ul>
<li><b><u>Other Scripts Repositories</u></b></li>
<ul>
<li><a href="http://gallery.technet.microsoft.com/site/search?f%5B0%5D.Type=User&amp;f%5B0%5D.Value=Fran%C3%A7ois-Xavier%20Cat" target="_blank">Technet Script Repository</a></li>
<li><a href="https://github.com/lazywinadmin/PowerShell" target="_blank">GitHub</a></li>
<li><a href="http://poshcode.org/?lang=&amp;q=lazywinadmin" target="_blank">Poshcode</a></li>
</ul>
</ul>
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<div>
<h1 id="ADUserUnlocker">
Active Directory User Unlocker</h1>
<u>Description:</u>



The following script will show how to Unlock Active Directory User account using PowerShell The goal is to do something simple and functional, no fancy GUI... No need of Active Directory Module or Quest Active Directory Snapin, in my case I used ADSI: [ADSISearcher]<br />
<u>Blog post(s):</u>2013/04/02<a href="http://www.lazywinadmin.com/2013/04/powershellwinform-active-directory-user.html" target="_blank">PowerShell/WinForm - Active Directory User Unlocker</a><br />
<br />
<u>Download:</u><a href="https://gallery.technet.microsoft.com/WinForm-Active-Directory-a3771370" target="_blank">Technet</a><br />
<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-2qsyjP1QLyY/UVUsp0fv_FI/AAAAAAABW5o/ZzxSyyh_R04/s1600/AD-USER-Unlocker-02.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="283" src="https://2.bp.blogspot.com/-2qsyjP1QLyY/UVUsp0fv_FI/AAAAAAABW5o/ZzxSyyh_R04/s1600/AD-USER-Unlocker-02.png" width="400" /></a></div>
<br />
<br />
<h1 id="Add-ADSubnet">
Add-ADSubnet (ADSI Function)</h1>
<br />
<u>Description:</u>This function allow you to add a subnet object in your active directory using ADSI<br />
<u>Blog post(s):</u> 2013/11/11<a href="http://www.lazywinadmin.com/2013/11/powershell-add-ad-site-subnet.html" target="_blank">PowerShell - Add AD Site Subnet</a><br />
<br />
<u>Download:</u> <a href="http://gallery.technet.microsoft.com/Add-ADSISubnet-ADSI-d3f86e90" target="_blank">Technet</a><br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://gallery.technet.microsoft.com/site/view/file/100977/1/2013-11-11%2012-33-41%20AM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://gallery.technet.microsoft.com/site/view/file/100977/1/2013-11-11%2012-33-41%20AM.png" height="207" width="400" /></a></div>
<br />
<br />
<h1 id="Disable-VMCopyPaste">
Disable-VMCopyPaste</h1>
<br />
<u>Description:</u>This function allows you to DISABLE Copy Paste operation between a Virtual Machine and your local machine.<br />
<u>Blog post(s):</u>2013/07/01<a href="http://www.lazywinadmin.com/2013/07/how-to-enable-copypaste-operations.html" target="_blank">How to Enable Copy/Paste Operations Between GuestOS and Remote Console on vSphere 5.1 (GUI and PowerCli)</a><br />
<br />
<u>Download:</u><a href="http://gallery.technet.microsoft.com/Disable-VMCopyPaste-b7e770b6" target="_blank">Technet</a><br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-EuL9JmA_wSM/UcyS5VL38HI/AAAAAAABaMs/GePuiubx3TY/s1600/2013-06-26+10-03-32+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="194" src="https://2.bp.blogspot.com/-EuL9JmA_wSM/UcyS5VL38HI/AAAAAAABaMs/GePuiubx3TY/s1600/2013-06-26+10-03-32+PM.png" width="400" /></a></div>
<br />
<h1 id="Enable-VMCopyPaste">
Enable-VMCopyPaste</h1>
<br />
<u>Description:</u> This function allows you to ENABLE Copy Paste operation between a Virtual Machine and your local machine.<br />
<u>Blog post(s):</u>2013/07/01<a href="http://www.lazywinadmin.com/2013/07/how-to-enable-copypaste-operations.html" target="_blank">How to Enable Copy/Paste Operations Between GuestOS and Remote Console on vSphere 5.1 (GUI and PowerCli)</a><br />
<br />
<u>Download:</u> <a href="http://gallery.technet.microsoft.com/Enable-VMCopyPaste-39d785a4" target="_blank">Technet</a><br />
<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-Pe27nmJNmMc/UcyS19Z69qI/AAAAAAABaMk/9H59_oTU9mw/s709/2013-06-26+10-01-55+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="137" src="https://4.bp.blogspot.com/-Pe27nmJNmMc/UcyS19Z69qI/AAAAAAABaMk/9H59_oTU9mw/s709/2013-06-26+10-01-55+PM.png" width="400" /></a></div>
<br />
<h1 id="Get-ADGPOReplication">
Get-ADGPOReplication</h1>
<br />
<u>Description:</u>Get-ADGPOReplication is retrieving the GPO version and Sysvol version accross the domain for one ore more Group Policy. This can help you troubleshoot replication issues.<br />
<u>Blog post(s):</u> 2014/10/01<a href="http://www.lazywinadmin.com/2014/10/powershell-check-gpo-replication.html" target="_blank">PowerShell - Check the GPO Replication accross your domain</a><br />
<br />
<u>Download:</u> <a href="http://gallery.technet.microsoft.com/Get-GPO-Replication-4db47c83" target="_blank">Technet</a> / <a href="https://github.com/lazywinadmin/PowerShell/tree/master/AD-GPO-Get-ADGPOReplication" target="_blank">GitHub</a><br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-fIRNH9A9_jo/VCTbfSWr7wI/AAAAAAABoTc/lz8_TSOHWz8/s1600/Get-ADGPOReplication.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="340" src="https://2.bp.blogspot.com/-fIRNH9A9_jo/VCTbfSWr7wI/AAAAAAABoTc/lz8_TSOHWz8/s1600/Get-ADGPOReplication.png" width="400" /></a></div>
<br />
<br />
<h1 id="Get-ComputerInfo">
Get-ComputerInfo</h1>
<br />
<br />
Description:This small function will return information about: Operating System Name Operating System Version Memory (GB) Number of Processors Number of Sockets Number of Cores<br />
<u>Blog post(s):</u> 2013/05/08<a href="http://www.lazywinadmin.com/2013/05/scripting-games-2013-advanced-event-2.html" target="_blank">Scripting Games 2013 - Advanced Event 2 - An Inventory Intervention</a><br />
<br />
<u>Download:</u> <a href="http://gallery.technet.microsoft.com/Get-ComputerInformation-ecaa5cc9" target="_blank">Technet</a><br />
<br />
<br />
<h1 id="Get-DiskSizeInfo">
Get-DiskSizeInfo</h1>
<u>Description:</u>Winter Scripting Games - Practice Event #1 - Sizing up the Disks - You have been asked to create a Windows PowerShell advanced function named Get-DiskSizeInfo. It must accept one or more computer names, and use WMI or CIM to query each computer...<br />
<u>Blog post(s):</u>2013/02/10<a href="http://www.lazywinadmin.com/2013/02/winter-scripting-games-2013-practice.html" target="_blank">Winter Scripting Games 2013 - Practice Event 1</a><br />
<u><br /></u>
<u>Download:</u> <a href="http://gallery.technet.microsoft.com/Get-DiskSizeInfo-d60eed65" target="_blank">Technet</a><br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-NXRPhF9hXpA/URf5xW2ic9I/AAAAAAABVuo/6cPniqihGZc/s1600/WinterScriptingGames-Event1-03.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="212" src="https://4.bp.blogspot.com/-NXRPhF9hXpA/URf5xW2ic9I/AAAAAAABVuo/6cPniqihGZc/s1600/WinterScriptingGames-Event1-03.png" width="400" /></a></div>
<br />
<br />
<br />
<h1 id="Get-DomainComputer">
Get-DomainComputer (ADSI Function)</h1>
<u>Description:</u>The following function use ADSI to query Computer objects from the Active Directory. You can specify one or multiple names/patterns to search.<br />
Optionally you can specify a different domain to query and alternate credentials to use.<br />
<u>Blog post(s):</u>2013/10/31<a href="http://www.lazywinadmin.com/2013/10/powershell-get-domaincomputer-adsi.html" target="_blank">PowerShell - Get-DomainComputer (ADSI)</a><br />
<u><br /></u><u>Download:</u><a href="http://gallery.technet.microsoft.com/Get-DomainComputer-ADSI-3d531db7" target="_blank">Technet</a><br />
<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://gallery.technet.microsoft.com/site/view/file/100530/1/2013-10-30%209-45-56%20PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://gallery.technet.microsoft.com/site/view/file/100530/1/2013-10-30%209-45-56%20PM.png" height="640" width="372" /></a></div>
<br />
<br />
<h1 id="GetLocalGroupAllMembers">
Get-LocalGroupAllMembers</h1>
<u>Description:</u>The following functions query a localgroup on the localhost or a remote computer, and gather all the local and domain members (direct and nested,users and groups).<br />
<u>Blog post(s):</u>2013/01/07<a href="http://www.lazywinadmin.com/2013/01/get-localgroupallmembers.html" target="_blank">Get-LocalGroupAllMembers</a><br />
<u>Download:</u><a href="http://gallery.technet.microsoft.com/Get-LocalGroupAllMembers-835c67cd" target="_blank">Technet</a><br />
<br />
<h1 id="GetLocalGroupMembership">
Get-LocalGroupMembership</h1>
<u>Description:</u>This function get the local group membership on a local or remote computer using ADSI/WinNT.<br />
<u>Blog post(s):</u>2012/12/31<a href="http://www.lazywinadmin.com/2012/12/get-localgroupmembership-using-adsiwinnt.html" target="_blank">Get-LocalGroupMembership (Using ADSI/WinNT)</a><br />
<u><br /></u>
<u>Download:</u> <a href="http://gallery.technet.microsoft.com/Get-LocalGroupMembership-87d10dd8" target="_blank">Technet</a><br />
<br />
<h1 id="Get-NetStat">
Get-NetStat</h1>
<u>Description:</u>This function parse the output of the tool NETSTAT.EXE. The purpose of this function is to show how to parse standard tools to allow usage inside Powershell.<br />
<u>Blog post(s):</u>2014/08/17 <a href="http://www.lazywinadmin.com/2014/08/powershell-parse-this-netstatexe.html" target="_blank">PowerShell - Parse this: NetStat.exe</a><br />
<br />
<u>Download:</u> <a href="http://gallery.technet.microsoft.com/Get-NetStat-872e0776" target="_blank">Technet</a><br />
<br />
<a href="https://www.blogger.com/null" name="raptors"></a>

<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://gallery.technet.microsoft.com/site/view/file/123905/1/2014-08-14_23-31-39.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://gallery.technet.microsoft.com/site/view/file/123905/1/2014-08-14_23-31-39.png" height="320" width="302" /></a></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<h1 id="Get-NetStatConvertFrom-String">
Get-NetStat Using ConvertFrom-String</h1>
<u>Description:</u>This show how to parse the output of the tool NETSTAT.EXE using the new awesome cmdlet ConvertFrom-String<br />
<u>Blog post(s):</u>2014/09/05<a href="http://www.lazywinadmin.com/2014/09/powershell-playing-with-new-convertfrom.html" target="_blank">PowerShell - Playing with the new ConvertFrom-String cmdlet</a><br />
<br />
<u>Download:</u>See blog post<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-Aj6HiLsNI_8/VAkqr9sFuoI/AAAAAAABn8I/eV7CreT17E0/s1600/2014-09-04_23-02-37.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="218" src="https://4.bp.blogspot.com/-Aj6HiLsNI_8/VAkqr9sFuoI/AAAAAAABn8I/eV7CreT17E0/s1600/2014-09-04_23-02-37.png" width="320" /></a></div>
<br />
<h1 id="Get-NetStatConvertFrom-StringTemplateFile">
Get-NetStat Using ConvertFrom-String -TemplateFile</h1>
<u>Description:</u>This show how to parse the output of the tool NETSTAT.EXE using the new awesome cmdlet ConvertFrom-String and the parameter -TemplateFile which allows you to specify the pattern that you are looking for.<br />
<u>Blog post(s):</u>2014/09/06<a href="http://www.lazywinadmin.com/2014/09/powershell-convertfrom-string-and.html" target="_blank">PowerShell - ConvertFrom-String and the TemplateFile parameter</a><br />
<br />
<u>Download:</u> See blog post<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-4ooyAOB4NGo/VAq2izE5LuI/AAAAAAABn-Q/J6ej6kVaI6E/s1600/2014-09-06_3-23-30.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="320" src="https://1.bp.blogspot.com/-4ooyAOB4NGo/VAq2izE5LuI/AAAAAAABn-Q/J6ej6kVaI6E/s1600/2014-09-06_3-23-30.png" width="201" /></a></div>
<br />
<div class="separator" style="clear: both; text-align: center;">
<br /></div>
<h1>
</h1>
<h1 id="Get-NetworkLevelAuthentication">
Get-NetworkLevelAuthentication (NLA)</h1>
<u>Description:</u>Get the Network Level Authentication setting on one or more computers using CIM Cmldets/WMI (DCOM or WSMAN protocol)<br />
<u>Blog post(s):</u>2014/04/04<a href="http://www.lazywinadmin.com/2014/04/powershell-getset-network-level.html" target="_blank">PowerShell - Get/Set the Network Level Authentication Remotely (RDP Setting)</a><br />
<u>Download:</u><a href="http://gallery.technet.microsoft.com/Get-and-Set-NetworkLevelAut-fc8b6361" target="_blank">Technet</a><br />
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-tQvUGQdzo1c/Uz3H2tg6FeI/AAAAAAABj-g/ggNs4JpsSHM/s1600/4-3-2014+4-40-17+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="320" src="https://4.bp.blogspot.com/-tQvUGQdzo1c/Uz3H2tg6FeI/AAAAAAABj-g/ggNs4JpsSHM/s1600/4-3-2014+4-40-17+PM.png" width="244" /></a></div>
<div>
<br />
<br />
<h1 id="LazyTs">
LazyTS</h1>
<br />
<u>Description</u>: LazyTS is a PowerShell script to manage Sessions and Processes on local or remote machines. It also allows you to Disconnect/Stop sessions and Send Interactive message to one or more sessions.<br />
<br />
This tool is using the module PSTerminalService which relies on the Cassia .NET Library.I used Sapien PowerShell Studio 2014 to which make life easier if you want to start building WinForms tools and add PowerShell code.<br />
<br />
<u>Dedicated Page</u>: <a href="http://www.lazywinadmin.com/p/lazyts.html" target="_blank">LazyTS</a><br />
<u>Blog post(s)</u>: 2014/10/04 <a href="http://www.lazywinadmin.com/2014/10/powershell-gui-lazyts-terminal-services.html" target="_blank">PowerShell GUI - LazyTS (Terminal Services Management)</a><br />
<br />
<u>Download</u>: <a href="http://gallery.technet.microsoft.com/LazyTS-d426e01d" target="_blank">Technet Gallery</a> / <a href="https://github.com/lazywinadmin/LazyTS/releases" target="_blank">GitHub</a>/ <a href="http://lazywinadmin.github.io/LazyTS/" target="_blank">GitHubPage</a><br />
<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-NPXOQcAw34s/VDBunkEZI-I/AAAAAAABojM/UWT2Cbq4Fc8/s1600/LazyTS.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="https://2.bp.blogspot.com/-NPXOQcAw34s/VDBunkEZI-I/AAAAAAABojM/UWT2Cbq4Fc8/s1600/LazyTS.png" /></a></div>
<br /></div>
<h1>
<a href="http://www.lazywinadmin.com/p/lazywinadmin-04.html" id="LazyWinAdmin" target="_blank">LazyWinAdmin</a></h1>
<u>Description:</u>LazyWinAdmin is a PowerShell Script that generates a GUI/WinForms loaded with tons of functions.<br />
<u>Source/Contribution</u>:<a href="https://github.com/lazywinadmin/LazyWinAdmin_GUI">https://github.com/lazywinadmin/LazyWinAdmin_GUI</a><br />
<u>Dedicated Page:</u><a href="http://www.lazywinadmin.com/p/lazywinadmin-04.html" target="_blank">LazyWinAdmin</a><br />
<u>Blog post(s):</u><br />
<ul>
<li><a href="http://www.lazywinadmin.com/2012/06/lazywinadmin-v04-released.html" target="_blank">LazyWinAdmin v0.4 released</a></li>
<li><a href="http://www.lazywinadmin.com/2012/06/lazywinadmin-v04-sneak-peek.html" target="_blank">LazyWinAdmin v0.4 - Sneak Peek</a></li>
<li><a href="http://www.lazywinadmin.com/2012/02/new-version-lazywinadmin-0320120220.html" target="_blank">LazyWinAdmin v0.3.20120220</a></li>
<li><a href="http://www.lazywinadmin.com/2011/10/lazywinadmin-update-20111002.html" target="_blank">LazyWinAdmin v0.3.20111002</a></li>
<li><a href="http://www.lazywinadmin.com/2011/05/lazywinadmin-02.html" target="_blank">LazyWinAdmin v0.2</a></li>
</ul>
<u>Download:</u><a href="http://gallery.technet.microsoft.com/LazyWinAdmin-04-9da94d7f" target="_blank">Technet</a><br />
<u>Screenshot(s):</u><br />
<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-aht5gyzq-5A/T9a3W9cIDZI/AAAAAAABO5U/BPCWTx716_4/s1600/lwa-v0.4-main01.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="255" src="https://3.bp.blogspot.com/-aht5gyzq-5A/T9a3W9cIDZI/AAAAAAABO5U/BPCWTx716_4/s1600/lwa-v0.4-main01.png" width="400" /></a></div>
<div>
<br /></div>
<h1>
<a href="http://www.lazywinadmin.com/p/monitor-active-directory-group.html" id="MonitorADGroup" target="_blank">Monitor Active Directory Group membership change</a></h1>
<u>Description:</u>This Powershell script can monitor one or more Groups Membership in Active Directory, using the PsSnapin from Quest and send an email when someone is added or removed from this/those group(s).<br />
<u>Dedicated Page:</u><a href="http://www.lazywinadmin.com/p/monitor-active-directory-group.html" target="_blank">Monitor Active Directory Group membership change</a><br />
<u>Blog post(s):</u><br />
<ul>
<li>2013/11/27<a href="http://www.lazywinadmin.com/2013/11/update-powershell-monitor-and-report.html" target="_blank">PowerShell - Monitor and Report Active Directory Group Membership Change</a></li>
<li>2013/10/13<a href="http://www.lazywinadmin.com/2013/10/powershell-monitor-and-report-active.html" target="_blank">PowerShell - Monitor and Report Active Directory Group Membership Change</a></li>
<li>2012/03/14<a href="http://www.lazywinadmin.com/2012/03/powershell-monitor-membership-change-to.html" target="_blank">Powershell - Monitor Active Directory Groups membership change</a></li>
</ul>
<u>Download:</u><a href="http://gallery.technet.microsoft.com/Monitor-Active-Directory-4c4e04c7" target="_blank">Technet</a><br />
<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-SRc7VpBPh5Y/UpLyGWLnsMI/AAAAAAABe88/wRx9fVryM8M/s1600/2013-11-25+1-45-27+AM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="400" src="https://4.bp.blogspot.com/-SRc7VpBPh5Y/UpLyGWLnsMI/AAAAAAABe88/wRx9fVryM8M/s1600/2013-11-25+1-45-27+AM.png" width="362" /></a></div>
<br />
<br />
<h1 id="NetBackupPSModule">
NetBackupPS Module</h1>
<u>Description:</u>PowerShell module for Symantec NetBackup.<br />
This module contains cmdlets that parse the output of regular CLI tools.<br />
<u>Blog post(s)</u>: 2014/09/21<a href="http://www.lazywinadmin.com/2014/09/powershell-netbackupps-module-for.html" target="_blank">PowerShell - NetBackupPS: Module for Symantec NetBackup</a><br />
<br />
<u>Download:</u><a href="https://github.com/lazywinadmin/NetBackupPS" target="_blank">GitHub</a><br />
<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://2.bp.blogspot.com/-VvYGeSMxaW0/VB5XhWRHiGI/AAAAAAABoNo/c3_92LEStPc/s1600/Get-Command_NetBackupPS.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="130" src="https://2.bp.blogspot.com/-VvYGeSMxaW0/VB5XhWRHiGI/AAAAAAABoNo/c3_92LEStPc/s1600/Get-Command_NetBackupPS.png" width="320" /></a></div>
<br />
<h1 id="ReadExcelFileCOM">
Read Excel File (Using COM)</h1>
<u>Description:</u>This is a sample file that show how to use PowerShell and COM Interface to read an Excel file. Note that the machine that will run the script need Excel installed.<br />
<u>Blog post(s)</u>: 2014/03/23<a href="http://www.lazywinadmin.com/2014/03/powershell-read-excel-file-using-com.html" target="_blank">PowerShell - Read an Excel file using COM Interface</a><br />
<br />
<u>Download:</u> <a href="http://gallery.technet.microsoft.com/Read-Excel-File-using-COM-809deb32" target="_blank">Technet</a><br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-0X6m94skkjo/Uy41tyg933I/AAAAAAABj14/ANHlIsQtoa0/s1600/2014-03-22+9-14-51+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="172" src="https://3.bp.blogspot.com/-0X6m94skkjo/Uy41tyg933I/AAAAAAABj14/ANHlIsQtoa0/s1600/2014-03-22+9-14-51+PM.png" width="320" /></a></div>
<br />
<h1 id="ReportActiveDirectoryMissingsubnets">
Report Active Directory Missing subnets</h1>
<u>Description:</u>This script report the Active Directory Missing Subnets detected in the NetLogon file(s) of each Domain Controller(s)<br />
<u>Blog post(s):</u> 2013/10/21<a href="http://www.lazywinadmin.com/2013/10/powershell-report-ad-missing-subnets.html" target="_blank">PowerShell - Report the AD Missing Subnets from the NETLOGON.log</a><br />
<br />
<u>Download:</u> <a href="http://gallery.technet.microsoft.com/Report-Active-Directory-008cd9eb" target="_blank">Technet</a><br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://3.bp.blogspot.com/-EPI7odaA76w/UmNYbF7QVKI/AAAAAAABeLw/Ug9v4f60law/s1600/2013-10-15+12-33-20+AM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="400" src="https://3.bp.blogspot.com/-EPI7odaA76w/UmNYbF7QVKI/AAAAAAABeLw/Ug9v4f60law/s1600/2013-10-15+12-33-20+AM.png" width="347" /></a></div>
<br />
<br />
<br />
<h1 id="SCCMAutomationModule">
SCCMAutomation Module</h1>
<u>Description:</u>"<i>This Powershell module contains a collection of functions gathered from an assortment of scripts I use to automate SCCM software distribution. After spending way too many hours cutting and pasting from old scripts in order to automate a new task, I decided I needed to aggregate all of the bits of code from my collection of scripts into a reusable kit. This is the result of that decision</i>."<br />
-Andre Bocchini-<br />
<u>Blog post(s):</u>2013/06/28<a href="http://www.lazywinadmin.com/2013/06/powershell-sccm-2007-module-my.html" target="_blank">PowerShell SCCM 2007 Module - My contribution</a><br />
<u><br /></u>
<u>Download:</u> <a href="https://github.com/andrebocchini/sccm-powershell-automation-module" target="_blank">GitHub</a><br />
<br />
<br />
<h1 id="Set-VMChangeBlockTracking">
Set-VMChangeBlockTracking</h1>
<u>Description:</u>The function Set-VMChangeBlockTracking allows you to set the Change Block Tracking setting on each VM you specify It can be run against one or more computers. It requires PowerShell version 3 (for #requires)<br />
Changed Block Tracking (CBT) is a VMware feature that helps perform incremental backups. VMware Data Recovery uses this technology, and so can developers of backup and recovery software.<br />
<u>Blog post(s):</u>2013/07/02<a href="http://www.lazywinadmin.com/2013/07/enabling-change-block-tracking-cbt-on.html" target="_blank">Enabling Change Block Tracking (CBT) on a vSphere 5.1 VM with PowerShell/PowerCli</a><br />
<br />
<u>Download:</u><a href="http://gallery.technet.microsoft.com/Set-VMChangeBlockTracking-b422af9a" target="_blank">Technet</a><br />
<br />
<h1 id="ListServiceswhereStartModeisAUTOMATICandNOTrunning">
Services where StartMode is AUTOMATIC and NOT running</h1>
<u>Description:</u>This Powershell script will list all the services from a local or remote computer where the StartMode property is set to "Automatic" and where the state property is different from "RUNNING" (so mostly where the state is NOT RUNNING).<br />
<u>Blog post(s):</u>n/a<br />
<u><br /></u><u>Download:</u><a href="http://gallery.technet.microsoft.com/dba0a313-5a74-464a-a98a-fac57ed28105" target="_blank">Technet</a><br />
<br />
<h1 id="Set-NetworkLevelAuthentication">
Set-NetworkLevelAuthentication (NLA)</h1>
<u>Description:</u>Set the Network Level Authentication setting on one or more computers using CIM Cmldets/WMI (DCOM or WSMAN protocol)<br />
<u>Blog post(s):</u>2014/04/04<a href="http://www.lazywinadmin.com/2014/04/powershell-getset-network-level.html" target="_blank">PowerShell - Get/Set the Network Level Authentication Remotely (RDP Setting)</a><br />
<u>Download:</u><a href="http://gallery.technet.microsoft.com/Get-and-Set-NetworkLevelAut-fc8b6361" target="_blank">Technet</a><br />
<div>
<br /></div>
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-tQvUGQdzo1c/Uz3H2tg6FeI/AAAAAAABj-g/ggNs4JpsSHM/s1600/4-3-2014+4-40-17+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="320" src="https://4.bp.blogspot.com/-tQvUGQdzo1c/Uz3H2tg6FeI/AAAAAAABj-g/ggNs4JpsSHM/s1600/4-3-2014+4-40-17+PM.png" width="244" /></a></div>
<div>
<br /></div>
<br />
<h1 id="TutorialCreatingaBasicGUI">
Tutorial - Creating a Basic GUI</h1>
<div style="font-size: medium; font-weight: normal;">
<u>Description:</u>This script demos how to create a basic Graphical User Interface with SAPIEN PowerShell Studio 2012.We will simply add a couple of controls (Buttons and a Richtextbox) and add a few events to write in the Richtextbox when pressing the buttons.</div>
<div style="font-size: medium; font-weight: normal;">
<u>Blog post(s):</u>2013/10/06<a href="http://www.lazywinadmin.com/2013/10/powershell-studio-2012-winforms.html" target="_blank">PowerShell Studio 2012 - WinForms - Creating a basic GUI (Video)</a></div>
<div style="font-size: medium; font-weight: normal;">
<u>Video:</u><a href="http://www.youtube.com/watch?feature=player_embedded&amp;v=UeYGapCK78g" target="_blank">Youtube</a></div>
<div style="font-size: medium; font-weight: normal;">
<br /></div>
<div style="font-size: medium; font-weight: normal;">
<u>Download:</u><a href="http://gallery.technet.microsoft.com/PowerShell-Studio-2012-ee07484d" target="_blank">Technet</a></div>
<div style="font-size: medium; font-weight: normal;">
<br /></div>
<div style="font-size: medium; font-weight: normal;">
<br /></div>
<div class="separator" style="clear: both; font-size: medium; font-weight: normal; text-align: center;">
<a href="http://3.bp.blogspot.com/-UnYK_kzbpas/UgQmud321OI/AAAAAAABbm0/yiIrykB74HA/s1600/2013-08-08+7-06-17+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="236" src="https://3.bp.blogspot.com/-UnYK_kzbpas/UgQmud321OI/AAAAAAABbm0/yiIrykB74HA/s1600/2013-08-08+7-06-17+PM.png" width="400" /></a></div>
<br />
<br />
<h1 id="TutorialDataGridViewSorting">
Tutorial - DataGridView Control- Add Sorting
</h1>
<br />
<div style="font-size: medium; font-weight: normal;">
<u>Description:</u>This sample script show how to sort columns using WinForm DataGridView control and PowerShell scripting.</div>
<div style="font-size: medium; font-weight: normal;">
<u>Blog post(s):</u><a href="http://www.lazywinadmin.com/2015/01/powershell-studio-2014-datagridview.html" target="_blank">PowerShell Studio 2014 - DataGridView Sorting</a></div>
<div style="font-size: medium; font-weight: normal;">
<u>Download:</u><a href="https://gallery.technet.microsoft.com/Winforms-DataGridView-28f9b521" target="_blank">Technet</a>/ <a href="https://github.com/lazywinadmin/PowerShellGUI/tree/master/_Examples/DataGridView/DataGridView_ColumnHeader_Sorting" target="_blank">GitHub</a></div>
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://4.bp.blogspot.com/-FF683wc4laE/VLHRufeoG5I/AAAAAAABrBg/luqrHrouQ8o/s1600/Datagridview_Sorting_GIF.gif" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="https://4.bp.blogspot.com/-FF683wc4laE/VLHRufeoG5I/AAAAAAABrBg/luqrHrouQ8o/s1600/Datagridview_Sorting_GIF.gif" /></a></div>
<br />
<h1 id="TutorialListViewControl">
Tutorial - ListView Control- Fill my second column</h1>
<br />
<div style="font-size: medium; font-weight: normal;">
<u>Description:</u>This sample script show how to fill a second column using WinForm ListView Control and PowerShell scripting.</div>
<div style="font-size: medium; font-weight: normal;">
<u>Blog post(s):</u>n/a</div>
<div style="font-size: medium; font-weight: normal;">
<u>Download:</u><a href="http://gallery.technet.microsoft.com/WinForm-ListView-Control-995fa0eb" target="_blank">Technet</a></div>
<div style="font-size: medium; font-weight: normal;">
<br /></div>
<h1 id="TutorialToolMaking">
Tutorial - ToolMaking (Winform)</h1>
<u>Description:</u>The script demos how to create a tool using Sapien PowerShell Studio 2012 to query some information from a remote computer.<br />
<u>Blog post(s):</u>2013/10/11<a href="http://www.lazywinadmin.com/2013/10/PowerShellStudio2012ToolMaking.html" target="_blank">PowerShell Studio 2012 - WinForms - GUI ToolMaking</a><br />
<u>Video:</u><a href="http://www.youtube.com/watch?v=HmcWucxQeQE" target="_blank">Youtube</a><br />
<br />
<u>Download:</u><a href="http://gallery.technet.microsoft.com/PowerShell-Studio-2012-40694250" target="_blank">Technet</a><br />
<u><br /></u>
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-W3J8czlT9N4/UlhdeW-8f7I/AAAAAAABd60/JAWeiJKmt74/s1600/2013-10-11+4-19-47+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="362" src="https://1.bp.blogspot.com/-W3J8czlT9N4/UlhdeW-8f7I/AAAAAAABd60/JAWeiJKmt74/s1600/2013-10-11+4-19-47+PM.png" width="400" /></a></div>
</div>
<br />
<h1 id="NetBackupPSModule">
WinFormPS Module</h1>
<u>Description:</u>PowerShell module to interact with Windows Form Controls.<br />
<u>Blog post(s)</u>:<br />
<br />
<u>Download:</u><a href="https://github.com/lazywinadmin/WinFormPS" target="_blank">GitHub</a><br />
<br />
<div class="separator" style="clear: both; text-align: center;">
<a href="http://1.bp.blogspot.com/-q5gopArKelY/VN144vHGYOI/AAAAAAABrq8/OHMRhUJD48E/s1600/datagridview2.gif" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="https://1.bp.blogspot.com/-q5gopArKelY/VN144vHGYOI/AAAAAAABrq8/OHMRhUJD48E/s1600/datagridview2.gif" /></a></div>
<br />
<div class="separator" style="clear: both; text-align: center;">
</div>
