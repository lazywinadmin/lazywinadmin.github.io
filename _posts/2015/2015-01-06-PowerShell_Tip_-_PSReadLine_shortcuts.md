---
layout: single
title: PowerShell Tip - PSReadLine shortcuts
excerpt: 
permalink: /2015/01/powershell-tip-psreadline-shortcuts.html
tags: 
- powershell
- powershell tip
- psreadline
- tip
published: true
comments: true
---

 
 <a href="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/windows_powershell_icon__1771894770__-256x256.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/windows_powershell_icon__1771894770__-256x256.png" height="150" width="150" /></a>If you are using PowerShell everyday like me, you probably started to populate you profile with some neat tools that make you like easier. In my case It's loading some modules or add some functions such as <a href="{{ site.url }}/2014/07/powershell-handy-function-to-connect-to.html" target="_blank">Connect-Office365</a> or <a href="http://tommymaynard.com/ql-clear-host-without-clearning-the-host/" target="_blank">Clx</a>.

PSReadLine is one of the module I've been using for a while now and I can't work without it anymore!!!!


> <b><u>What is the PSReadLine module ?</u></b>
This PowerShell module has been created by one of the PowerShell team members - Jason Shirk.
This module replaces the command line editing experience in PowerShell.exe.

It provides:

* Syntax coloring
* Simple syntax error notification
* A good multi-line experience (both editing and history)
* Customizable key bindings
* Cmd and emacs modes (neither are fully implemented yet, but both are usable)
* Many configuration options
* Bash style completion (optional in Cmd mode, default in Emacs mode)
* Bash/zsh style interactive history search (CTRL-R)
* Emacs yank/kill ring
* PowerShell token based "word" movement and kill
* Undo/redo
* Automatic saving of history, including sharing history across live sessions
* "Menu" completion (somewhat like Intellisense, select completion with arrows) via Ctrl+Space

<b><a href="https://github.com/lzybkr/PSReadLine/releases" target="_blank">Download on Github</a></b>


### CTRL+SPACE

Other than the Syntax coloring and the Error Notification, one of the coolest trick in this module is the Ctrl+Space which list the possible completions! This is just awesome!

<u>Here are some examples:</u>
Using Get-Help and Show-Command, you can see all the parameters available to you by pressing the ctrl+space after the dash "-". You'll then be able to select a parameter.

<a href="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/PowerShell_PSReadLine_CtrlSpace_Get-Help__710720814__-692x186.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/PowerShell_PSReadLine_CtrlSpace_Get-Help__710720814__-692x186.png" /></a><a href="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/PowerShell_PSReadLine_CtrlSpace_Show-Command__1447939043__-692x186.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/PowerShell_PSReadLine_CtrlSpace_Show-Command__1447939043__-692x186.png" /></a>

It is also work with Accelerators and Net Classes:

<a href="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/PowerShell_PSReadLine_CtrlSpace_NetFramework__1113359674__-692x138.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/PowerShell_PSReadLine_CtrlSpace_NetFramework__1113359674__-692x138.png" /></a>
<a href="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/PowerShell_PSReadLine_CtrlSpace_Regex__1640005701__-692x170.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/PowerShell_PSReadLine_CtrlSpace_Regex__1640005701__-692x170.png" /></a>

Also work if you are looking for a properties with Select-Object,  <span style="font-family: 'Courier New', Courier, monospace; font-size: large;">Where-Object,  <span style="font-family: 'Courier New', Courier, monospace; font-size: large;">Foreach-Object,  <span style="font-family: 'Courier New', Courier, monospace; font-size: large;">Group-Object, ... Obviously in this case it will only show Properties and not methods.


<a href="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/2015-01-06_20-50-20__1222405251__-692x906.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/2015-01-06_20-50-20__1222405251__-692x906.png" /></a>
<div class="separator" style="clear: both; text-align: left;">Methods will only show where it make sense, where you can actually use them, here for example GetType(), ToString()are available.<a href="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/2015-01-06_21-03-57__1115254386__-692x522.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/2015-01-06_21-03-57__1115254386__-692x522.png" /></a>

# Other Shortcuts

You can easily access the list of other shortcuts using Get-PSReadLineKeyHandler.

<a href="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/2015-01-06_20-44-48__535851003__-1008x1046.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150106_PowerShell_Tip_-_PSReadLine_shortcuts/2015-01-06_20-44-48__535851003__-1008x1046.png" height="640" width="616" /></a>



