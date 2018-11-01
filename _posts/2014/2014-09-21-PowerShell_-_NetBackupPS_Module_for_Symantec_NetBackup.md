---
layout: single
title: PowerShell - NetBackupPS - Module for Symantec NetBackup
excerpt: 
permalink: /2014/09/powershell-netbackupps-module-for.html
tags: 
- cli
- github
- module
- netbackupps
- parser
- parsing
- powershell
published: true
comments: true
---

 
 
<a href="{{ site.url }}/images/2014/20140921_PowerShell_-_NetBackupPS_Module_for_Symantec_NetBackup/9-20-2014%252B12-02-32%252BPM__1269134158__-122x137.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140921_PowerShell_-_NetBackupPS_Module_for_Symantec_NetBackup/9-20-2014%252B12-02-32%252BPM__1269134158__-122x137.png" /></a>In my previous job, we used Symantec NetBackup to handle backups and restores. To handle some of the reporting, the storage admins were using the Symantec CLI tools (bunch of Exe).
<u>Example of usages</u>: Find the scratch tapes in a particular robot... or in a particular site...

I wanted to parse the output and be able to reuse the information for other commands or to report information to the team. I realised that could be a good exercice to improve my parsing skills using PowerShell and decided to work on some more cmdlets and eventually a module.




# Module NetBackupPS

The module contains a few Cmdlets which are focus on reporting information from the system.
I still have some materials to work on but unfortunately,I don't have access to NetBackup anymore so I can't really test further from this point on.

Anyway, I thought sharing the code could be useful to other people.

It is available on the <a href="http://gallery.technet.microsoft.com/NetBackupPS-Module-for-7be565e5" target="_blank">Technet Gallery</a>.
I also push my last updates to a<a href="https://github.com/lazywinadmin/NetBackupPS/releases/latest" target="_blank">Github Repository</a>,<b>contributors are welcome</b>! so feel free to fork the repo :)

<div style="text-align: left;">

# Using the module


After <a href="https://github.com/lazywinadmin/NetBackupPS/releases/latest" target="_blank">downloading the last version from the repo</a>, unblock and extract the zip in the modules directory, most likely one of those directories:


```
$home\Documents\WindowsPowerShell\Modules
```

```
$pshome\Modules
```

Then load your module:
```
Import-Module -Name NetBackupPS
```



# Cmdlets available

<a href="{{ site.url }}/images/2014/20140921_PowerShell_-_NetBackupPS_Module_for_Symantec_NetBackup/Get-Command_NetBackupPS__345176186__-692x282.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140921_PowerShell_-_NetBackupPS_Module_for_Symantec_NetBackup/Get-Command_NetBackupPS__345176186__-692x282.png" /></a>

As an example, here is the help from Get-NetBackupVolume which retrieve volumes information.


# Get-NetBackupVolume


```
NAME
    Get-NetBackupVolume

SYNOPSIS
    This function queries the EMM database for volume information (vmquery)

SYNTAX
    Get-NetBackupVolume -MediaID <String[]> [<CommonParameters>]

    Get-NetBackupVolume [-PoolName <String>] [-RobotNumber <Int32[]>]
    [<CommonParameters>]


DESCRIPTION
    This function queries the EMM database for volume information (vmquery)


PARAMETERS
    -PoolName <String>
        Specify the PoolName to query

        Required?                    false
        Position?                    named
        Default value
        Accept pipeline input?       false
        Accept wildcard characters?  false

    -RobotNumber <Int32[]>
        Specify the RobotNumber to query

        Required?                    false
        Position?                    named
        Default value
        Accept pipeline input?       false
        Accept wildcard characters?  false

    -MediaID <String[]>
        Specify the MediaID(s) to display

        Required?                    true
        Position?                    named
        Default value
        Accept pipeline input?       false
        Accept wildcard characters?  false

    <CommonParameters>
        This cmdlet supports the common parameters: Verbose, Debug,
        ErrorAction, ErrorVariable, WarningAction, WarningVariable,
        OutBuffer, PipelineVariable, and OutVariable. For more information, see
        about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

INPUTS

OUTPUTS

    -------------------------- EXAMPLE 1 --------------------------

    C:\PS>Get-NetBackupVolume -PoolName Scratch


    This will return all the volumes in the Pool named Scratch

    VaultName        : ---
    VaultSessionID   : ---
    MacMountsAllowed : ---
    AssignedDate     : ---
    LastMountedDate  : ---
    FirstMount       : ---
    VolumePool       : Scratch (4)
    MediaDescription : ---
    VaultSlot        : ---
    ExpirationDate   : ---
    NumberOfMounts   : 0
    VaultContainerID : -
    Created          : 18/12/2012 4
    Barcode          : WT0161L3
    VaultSentDate    : ---
    RobotType        : NONE - Not Robotic (0)
    VaultReturnDate  : ---
    VolumeGroup      : ---
    MediaType        : 1/2" cartridge tape 3 (24)
    MediaID          : WT0161

    VaultName        : ---
    VaultSessionID   : ---
    MacMountsAllowed : ---
    AssignedDate     : ---
    LastMountedDate  : ---
    FirstMount       : ---
    VolumePool       : Scratch (4)
    MediaDescription : ---
    VaultSlot        : ---
    ExpirationDate   : ---
    NumberOfMounts   : 0
    VaultContainerID : -
    Created          : 19/12/2012 4
    Barcode          : WT0166L3
    VaultSentDate    : ---
    RobotType        : NONE - Not Robotic (0)
    VaultReturnDate  : ---
    VolumeGroup      : ---
    MediaType        : 1/2" cartridge tape 3 (24)
    MediaID          : WT0166

    VaultName        : ---
    VaultSessionID   : ---
    MacMountsAllowed : ---
    AssignedDate     : ---
    LastMountedDate  : ---
    FirstMount       : ---
    VolumePool       : Scratch (4)
    MediaDescription : ---
    VaultSlot        : ---
    ExpirationDate   : ---
    NumberOfMounts   : 0
    VaultContainerID : -
    Created          : 16/04/2013 3
    Barcode          : WT0191L3
    VaultSentDate    : ---
    RobotType        : NONE - Not Robotic (0)
    VaultReturnDate  : ---
    VolumeGroup      : ---
    MediaType        : 1/2" cartridge tape 3 (24)
    MediaID          : WT0191





    -------------------------- EXAMPLE 2 --------------------------

    C:\PS>Get-NetBackupVolume -MediaID CC0002,DD0005


    This will display information for the tapes CC0002,DD0005

    VaultName        : fx1
    VaultSessionID   : 169
    MacMountsAllowed : ---
    AssignedDate     : ---
    LastMounted      : 30/03/2013 4
    VolumePool       : Scratch (4)
    MediaDescription : ---
    VaultSlot        : 34
    ExpirationDate   : ---
    NumberOfMounts   : 17
    VaultContainerID : -
    CreatedDate      : 10/01/2013 1
    Barcode          : CC0002L5
    VaultSentDate    : 02/04/2013 12
    RobotType        : NONE - Not Robotic (0)
    VaultReturnDate  : ---
    VolumeGroup      : fx1_offsite
    MediaType        : 1/2" cartridge tape 3 (24)
    FirstMount       : 15/01/2013 6
    MediaID          : CC0002

    VaultName        : tapedepot
    VaultSessionID   : 497
    MacMountsAllowed : ---
    AssignedDate     : ---
    LastMounted      : 08/01/2014 2
    VolumePool       : Scratch (4)
    MediaDescription : ---
    VaultSlot        : 341
    ExpirationDate   : ---
    NumberOfMounts   : 11
    VaultContainerID : -
    CreatedDate      : 09/10/2013 8
    Barcode          : DD0005L3
    VaultSentDate    : 08/01/2014 4
    RobotType        : NONE - Not Robotic (0)
    VaultReturnDate  : 22/02/2014 6
    VolumeGroup      : fx1_offsite
    MediaType        : 1/2" cartridge tape 3 (24)
    FirstMount       : 14/10/2013 2
    MediaID          : DD0005





    -------------------------- EXAMPLE 3 --------------------------

    C:\PS>Get-NetBackupVolume -RobotNumber 23 -Poolname Scratch


    This will return the volumes in the PoolName 'Scratch' for the RobotNumber 23.





    -------------------------- EXAMPLE 4 --------------------------

    C:\PS>Get-NetBackupVolume -RobotNumber 23,19 -Poolname Scratch -Verbose


    This will return the volumes in the PoolName 'Scratch' for the RobotNumber 23 and 19.
    It will additionally show the verbose messages/comments.






RELATED LINKS

```





