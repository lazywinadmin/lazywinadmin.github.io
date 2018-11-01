---
layout: single
title: New version - LazyWinAdmin 0.3.20120220
excerpt: 
permalink: /2012/02/new-version-lazywinadmin-0320120220.html
tags: 
- gui
- lazywinadmin
- powershell
published: true
comments: true
---
LazyWinAdmin was created using ONLY Powershell scripting language
I used SAPIEN PrimalForms to create the GUI.
<span style="font-size: x-small;">

<div style="line-height: 13.5pt;"><span style="font-size: x-small;">This tool requires Powershell 2.0 and permissions on local or remote computers to be able to manage those.<div style="line-height: 13.5pt;"><span style="font-size: x-small;"><b style="background-color: white;"><u>LazyWinAdmin 0.3.20120220</u></b>

<span style="font-size: x-small;">Download
<iframe frameborder="0" height="120px" marginheight="0" marginwidth="0" scrolling="no" src="https://skydrive.live.com/embed?cid=60886DE0176E604A&amp;resid=60886DE0176E604A%21776&amp;authkey=AJ5LigZs9gcMXX8" style="background-color: #fcfcfc; padding: 0;" title="Preview" width="98px"></iframe>


<a href="{{ site.url }}/images/2012/20120220_New_version__LazyWinAdmin_0.3.20120220/LazyWinAdmin-0.3.20120220-Main_console__1433848672__-1089x648.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="379" src="{{ site.url }}/images/2012/20120220_New_version__LazyWinAdmin_0.3.20120220/LazyWinAdmin-0.3.20120220-Main_console__613029217__-640x381.png" width="640" /></a>
<a href="{{ site.url }}/images/2012/20120220_New_version__LazyWinAdmin_0.3.20120220/LazyWinAdmin-0.3.20120220-SYDI_Inventory__1633275298__-1089x648.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="380" src="{{ site.url }}/images/2012/20120220_New_version__LazyWinAdmin_0.3.20120220/LazyWinAdmin-0.3.20120220-SYDI_Inventory__1835416263__-640x381.png" width="640" /></a>
<a href="{{ site.url }}/images/2012/20120220_New_version__LazyWinAdmin_0.3.20120220/LazyWinAdmin-0.3.20120220-Localhost_tools__756683232__-603x656.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="640" src="{{ site.url }}/images/2012/20120220_New_version__LazyWinAdmin_0.3.20120220/LazyWinAdmin-0.3.20120220-Localhost_tools__574977501__-588x640.png" width="587" /></a>
<a href="{{ site.url }}/images/2012/20120220_New_version__LazyWinAdmin_0.3.20120220/LazyWinAdmin-0.3.20120220-Main_buttons__1588032078__-224x88.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2012/20120220_New_version__LazyWinAdmin_0.3.20120220/LazyWinAdmin-0.3.20120220-Main_buttons__1588032078__-224x88.png" /></a>

<span style="font-size: x-small;">-FIX some problem with Uptime Button
-FIX Modified The Service Query/start/stop
<span style="font-size: x-small;">-ADD Restart Service Button
<span style="font-size: x-small;">-ADD TextBox with AutoCompletion on some Services i added
<span style="font-size: x-small;">-ERROR AutoCompletion in the TEXTBOX of Services seems to make the thing crash :-(
<span style="font-size: x-small;">-REMOVE AutoCompletion in Service Tab, in ServiceName TextBox
<span style="font-size: x-small;">-ADD Get Local Hosts File (Menu: LocalHost/Hosts File)
<span style="font-size: x-small;">-ADD Get Remote Hosts File (in General Tab,need permission on remote c$)
<span style="font-size: x-small;">-REMOVE Computers.txt auto-completion, seems buggy :-(
<span style="font-size: x-small;">-FIX ENTER-PSSESSION button
<span style="font-size: x-small;">-REPLACED some function by button with icons below ComputerName textbox
<span style="font-size: x-small;">-MOVED the TEST-PSSESSION button to TOOL tab
<span style="font-size: x-small;">-ADD the TEST-PSSESSION inside the ENTER-PSSESSION button. (2 in 1 :)
<span style="font-size: x-small;">-MODIFY Inventory button and output (add more info)
<span style="font-size: x-small;">-MODIFY IpConfig to use the one from BSonPosh module
<span style="font-size: x-small;">-ADD button IPCONFIG, DISK USAGE
<span style="font-size: x-small;">-ADD START COMMANDS in General Tab
<span style="font-size: x-small;">-ADD SYDI option (dropdown) to choose DOC or XML format.
<span style="font-size: x-small;">-ADD Combobox in TOOLS Tab, and ADD the present tools in combobox
<span style="font-size: x-small;">-REMOVE Buttons in TOOLS tab (the ones placed in Combobox)
<span style="font-size: x-small;">-FIX the ContextMenuStrip on TextBox SERVERNAME.
<span style="font-size: x-small;">-ADD option of type for SYDI (DOC or XML)
<span style="font-size: x-small;">-FIX the names of all the variables (for Winforms controls only)
<span style="font-size: x-small;">-ADD Qwinsta and Rwinsta to contextmenu of computername textbox
<span style="font-size: x-small;">-FIX SYDI (DOC and XML now work) auto-save on Desktop of Current User and Open the folder
<span style="font-size: x-small;">-FIX "Installed Applications" show the full names of each application,vendors and versions.
<span style="font-size: x-small;">-ADD Connectivity Testing Button (Remote registry, ping, RPC, RDP, WsMan)
<span style="font-size: x-small;">-ADD more info to ipconfig button
