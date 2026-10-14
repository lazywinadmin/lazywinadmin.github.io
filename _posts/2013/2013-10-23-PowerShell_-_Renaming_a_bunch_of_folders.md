---
layout: single
title: PowerShell - Renaming a bunch of folders
excerpt: 
permalink: /2013/10/powershell-renaming-bunch-of-folders.html
tags: 
- directory
- folder
- powershell
- rename
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/PowerShell_-_Renaming_a_bunch_of_folders/2013-10-22_9-23-52_PM.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/PowerShell_-_Renaming_a_bunch_of_folders/2013-10-22_9-23-52_PM.png" /></a>
<a href="{{ site.url }}/2013/10/powershell-organizing-my-scripts.html" target="_blank">In my previous post</a> I talked about Organizing my script directory, naming convention, preferences and bottlenecks... Today let's reorganize some of those script folders.


### Renaming a bunch of folders

At my work, all the scripts related to VMware are named ESX-<Category>-<Explicit Title>. And I use the same naming convention at home for my own scripts. So let's say I want to rename all those *ESX* folders by VMWARE instead.
Something like this:<span style="font-family: Courier New, Courier, monospace;">VMWARE-<Category>-<Explicit Title>



First, we start by listing the directories which contain "ESX"

```
PS C:\LazyWinAdmin\POSH> Get-ChildItem -Path *ESX* -Directory
```

```
    Directory: C:\LazyWinAdmin\POSH


Mode                LastWriteTime     Length Name
----                -------------     ------ ----
da---        2013-10-22   9:05 PM            ESX-DATASTORE-MultiPathing_Enforce
da---        2013-10-22   9:05 PM            ESX-HOST-AutoDeploy
da---        2013-10-22   9:04 PM            ESX-HOST-Resources_Report
da---        2013-10-22   9:05 PM            ESX-NETWORK-Migrate_VM
da---        2013-10-22   9:05 PM            ESX-VM-Information_Report
da---        2013-10-22   9:05 PM            ESX-VM-Snapshot_Report
da---        2013-10-22   9:04 PM            FUNCT-ESX-VM-Disable-CopyPaste
da---        2013-10-22   9:04 PM            FUNCT-ESX-VM-Enable-CopyPaste

```


We take a look at the Help of Rename-Item using ShowWindow, just to make sure we type the right parameters.

```
PS C:\LazyWinAdmin\POSH> Get-Help -Name Rename-Item -ShowWindow
```

<a href="{{ site.url }}/images/2013/PowerShell_-_Renaming_a_bunch_of_folders/2013-10-22_9-26-41_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/PowerShell_-_Renaming_a_bunch_of_folders/2013-10-22_9-26-41_PM.png" /></a>
We will need to use the<span style="font-family: Courier New, Courier, monospace;"><b>Path</b>and the<span style="font-family: Courier New, Courier, monospace;"><b>NewName</b>parameters to specify the <b>current name</b>(path) and the <b>new name</b>. I end up with the following line, let's try it using WhatIf switch


```
PS C:\LazyWinAdmin\POSH> Get-ChildItem -Path *ESX* -Directory | ForEach-Object -Process {Rename-item -Path $_.Name -NewName ($_.name -replace "ESX","VMWARE") -WhatIf}
```
This line can be translated to: Get me all the folder that contains


```
What if: Performing the operation "Rename Directory" on target "Item: C:\LazyWinAdmin\POSH\ESX-DATAS
TORE-MultiPathing_Enforce Destination: C:\LazyWinAdmin\POSH\VMWARE-DATASTORE-MultiPathing_Enforce".
What if: Performing the operation "Rename Directory" on target "Item: C:\LazyWinAdmin\POSH\ESX-HOST-
AutoDeploy Destination: C:\LazyWinAdmin\POSH\VMWARE-HOST-AutoDeploy".
What if: Performing the operation "Rename Directory" on target "Item: C:\LazyWinAdmin\POSH\ESX-HOST-
Resources_Report Destination: C:\LazyWinAdmin\POSH\VMWARE-HOST-Resources_Report".
What if: Performing the operation "Rename Directory" on target "Item: C:\LazyWinAdmin\POSH\ESX-NETWO
RK-Migrate_VM Destination: C:\LazyWinAdmin\POSH\VMWARE-NETWORK-Migrate_VM".
What if: Performing the operation "Rename Directory" on target "Item: C:\LazyWinAdmin\POSH\ESX-VM-In
formation_Report Destination: C:\LazyWinAdmin\POSH\VMWARE-VM-Information_Report".
What if: Performing the operation "Rename Directory" on target "Item: C:\LazyWinAdmin\POSH\ESX-VM-Sn
apshot_Report Destination: C:\LazyWinAdmin\POSH\VMWARE-VM-Snapshot_Report".
What if: Performing the operation "Rename Directory" on target "Item: C:\LazyWinAdmin\POSH\FUNCT-ESX
-VM-Disable-CopyPaste Destination: C:\LazyWinAdmin\POSH\FUNCT-VMWARE-VM-Disable-CopyPaste".
What if: Performing the operation "Rename Directory" on target "Item: C:\LazyWinAdmin\POSH\FUNCT-ESX
-VM-Enable-CopyPaste Destination: C:\LazyWinAdmin\POSH\FUNCT-VMWARE-VM-Enable-CopyPaste".

```


Looks Good to me :-) ! let's try using Verbose!


```
PS C:\LazyWinAdmin\POSH> Get-ChildItem -Path *ESX* -Directory | ForEach-Object -Process {Rename-item
-Path $_.Name -NewName ($_.name -replace "ESX","VMWARE") -Verbose}
```

```
VERBOSE: Performing the operation "Rename Directory" on target "Item:
C:\LazyWinAdmin\POSH\ESX-DATASTORE-MultiPathing_Enforce Destination:
C:\LazyWinAdmin\POSH\VMWARE-DATASTORE-MultiPathing_Enforce".
VERBOSE: Performing the operation "Rename Directory" on target "Item:
C:\LazyWinAdmin\POSH\ESX-HOST-AutoDeploy Destination: C:\LazyWinAdmin\POSH\VMWARE-HOST-AutoDeploy".
VERBOSE: Performing the operation "Rename Directory" on target "Item:
C:\LazyWinAdmin\POSH\ESX-HOST-Resources_Report Destination:
C:\LazyWinAdmin\POSH\VMWARE-HOST-Resources_Report".
VERBOSE: Performing the operation "Rename Directory" on target "Item:
C:\LazyWinAdmin\POSH\ESX-NETWORK-Migrate_VM Destination:
C:\LazyWinAdmin\POSH\VMWARE-NETWORK-Migrate_VM".
VERBOSE: Performing the operation "Rename Directory" on target "Item:
C:\LazyWinAdmin\POSH\ESX-VM-Information_Report Destination:
C:\LazyWinAdmin\POSH\VMWARE-VM-Information_Report".
VERBOSE: Performing the operation "Rename Directory" on target "Item:
C:\LazyWinAdmin\POSH\ESX-VM-Snapshot_Report Destination:
C:\LazyWinAdmin\POSH\VMWARE-VM-Snapshot_Report".
VERBOSE: Performing the operation "Rename Directory" on target "Item:
C:\LazyWinAdmin\POSH\FUNCT-ESX-VM-Disable-CopyPaste Destination:
C:\LazyWinAdmin\POSH\FUNCT-VMWARE-VM-Disable-CopyPaste".
VERBOSE: Performing the operation "Rename Directory" on target "Item:
C:\LazyWinAdmin\POSH\FUNCT-ESX-VM-Enable-CopyPaste Destination:
C:\LazyWinAdmin\POSH\FUNCT-VMWARE-VM-Enable-CopyPaste".
```

<a href="{{ site.url }}/images/2013/PowerShell_-_Renaming_a_bunch_of_folders/2013-10-22_10-41-03_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/PowerShell_-_Renaming_a_bunch_of_folders/2013-10-22_10-41-03_PM.png" /></a>
Awesome! I love PowerShell!!!


