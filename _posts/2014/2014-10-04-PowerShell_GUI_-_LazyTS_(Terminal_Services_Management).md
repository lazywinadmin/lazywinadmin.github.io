---
layout: single
title: PowerShell GUI - LazyTS (Terminal Services Management)
excerpt: 
permalink: /2014/10/powershell-gui-lazyts-terminal-services.html
tags: 
- gui
- powershell
- qwinsta
- sapien powershell studio 2014
- terminal process
- terminal services manager
- terminal session
- winform
published: true
comments: true
---


<a href="{{ site.url }}/images/2014/20141004_PowerShell_GUI_-_LazyTS_(Terminal_Services_Management)/LazyTS__2139063917__-665x378.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141004_PowerShell_GUI_-_LazyTS_(Terminal_Services_Management)/LazyTS__2139063917__-665x378.png" height="113" style="cursor: move;" width="200" /></a><b>LazyTS</b> is a PowerShell script to manage <u>Sessions</u> and <u>Processes</u>on local or remote machines. It allows you to <b>Query/Disconnect/Stop session(s)</b>, <b>Query/Stop process(es)</b> and<b>Send Interactive message</b> to one or more sessions.

This tool is using the module PSTerminalService which relies on the Cassia .NET Library.I used <a href="http://www.sapien.com/software/powershell_studio" target="_blank">Sapien PowerShell Studio 2014</a>to which make life easier if you want to start building WinForms tools and add PowerShell code.

# Legacy Tools

Once in a while I need to disconnect or close one or more Terminal Sessions on a Windows Server in order to be able to connect via Remote Desktop Protocol or free up a session for someone else.
You would most likely use handy legacy tools such as<a href="http://technet.microsoft.com/en-us/library/cc731503.aspx" target="_blank">Qwinsta</a>/<a href="http://technet.microsoft.com/en-us/library/cc754785.aspx" target="_blank">Rwinsta</a>,<a href="http://technet.microsoft.com/en-us/library/cc785434.aspx" target="_blank">Query</a>/<a href="http://technet.microsoft.com/en-us/library/cc754256.aspx" target="_blank">Reset Session</a>or<a href="http://technet.microsoft.com/en-us/library/cc754583.aspx" target="_blank">Quser</a>.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/20141004_PowerShell_GUI_-_LazyTS_(Terminal_Services_Management)/Quser_Query_Session_Qwinsta_legacy_tools__1513406131__-692x378.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2014/20141004_PowerShell_GUI_-_LazyTS_(Terminal_Services_Management)/Quser_Query_Session_Qwinsta_legacy_tools__1513406131__-692x378.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Legacy tools: Qwinsta/Query Session/Quser</td></tr></tbody></table>


# PowerShell Way

<b><u>PSTerminalServices Module</u></b>

While those legacy tools are great, I was looking for a PowerShell way to deal with what the command line tools had to offer and there was nothing around. Finally I found something very interesting called "<a href="http://psterminalservices.codeplex.com/" target="_blank">PSTerminalServices</a>", a module created by the <b>PowerShell MVP Shay Levy</b>.

This module is based on a<a href="https://code.google.com/p/cassia/" target="_blank">.NET library called Cassia</a>which focus on Terminal Session (Remote Desktop) Management Tasks. So basically Shay created some wrappers around it in the form of advanced functions.

Here is a list of the main feature of this module:

<u>Terminal Session Management Tasks:</u>

* Enumerating terminal sessions and reporting session information including connection state, user name, client name, client display details, client-reported IP address, and client build number.
* Logging off a session
* Disconnecting a session.
* Displaying a message box in a session.
* Enumerating all processes or processes for a specified session.
* Killing a process.

<u>PSTerminalServices cmdlets:</u>

* <b>Disconnect-TSSession</b> - Disconnects any attached user from the session.
* <b>Get-TSCurrentSession</b> - Provides information about the session in which the current process is running.
* <b>Get-TSServers</b> - Enumerates all terminal servers in a given domain.
* <b>Get-TSProcess</b> - Gets a list of processes running in a specific session or in all sessions.
* <b>Get-TSSession</b> - Lists the sessions on a given terminal server.
* <b>Send-TSMessage</b> - Displays a message box in the specified session ID.
* <b>Stop-TSProcess</b> - Terminates the process running in a specific session or in all sessions.
* <b>Stop-TSSession</b> - Logs the session off, disconnecting any user that might be connected.

# LazyTS

<b>LazyTS</b>is a PowerShell script to manage Terminal Services<u>Sessions</u>and<u>Processes</u>on local or remote machines. It also allows you to<u>Disconnect/Stop sessions</u>and<u>Send Interactive message</u>to one or more sessions.

<a href="{{ site.url }}/images/2014/20141004_PowerShell_GUI_-_LazyTS_(Terminal_Services_Management)/LazyTS__2139063917__-665x378.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141004_PowerShell_GUI_-_LazyTS_(Terminal_Services_Management)/LazyTS__2139063917__-665x378.png" /></a>


# Version

* <b>1.0 Initial version</b>
* Features
* Session Management: Query/Disconnect
* Stop
* Processes Management: Query/Stop
* Message : Send message to Session(s)

# Requirements

* <b>PowerShell 3.0</b>
* <b>Cassia Library (included in the download)</b>

LazyTS is relying on the Cassia .NET Library (A DLL file). This file need to be present in the same directory as the script (Either when you use the PS1 or EXE file)

Of course you also need the appropriate permission on the remote machine to be able to manage it.

If the Cassia.dll is not present, the script won't start:
<a href="{{ site.url }}/images/2014/20141004_PowerShell_GUI_-_LazyTS_(Terminal_Services_Management)/Cassia.dll_required__1075941985__-692x166.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141004_PowerShell_GUI_-_LazyTS_(Terminal_Services_Management)/Cassia.dll_required__1075941985__-692x166.png" /></a>


# Download and Details

* <b><a href="{{ site.url }}/p/lazyts.html" target="_blank">LazyTS Page</a></b>