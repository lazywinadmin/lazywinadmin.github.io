---
layout: single
title: Winter Scripting Games 2013 - Practice Event 1
excerpt: 
permalink: /2013/02/winter-scripting-games-2013-practice.html
tags: 
- 2013 winter scripting games
- function
- powershell
- scripting games
published: true
comments: true
---

![image-left](/images/2013/20130430_Scripting_Games_2013_-_Advanced_Event_1_-_An_Archival_Atrocity/PowerShell-Scripting-Games-Logo__1155158921__-171x200.png){: .align-left}
The Winter Scripting Games 2013 started last week with the first practice event.

Unfortunately for me, I was not able to post my script on time. The first Practice event was due on the Tuesday, 5th of February... 11:59 PM GMT! I assume I had until midnight my time..... (My timezone is East GMT-5) 😆

If you want to join the Winter Scripting Games, check the following <a href="http://thescriptinggames.com/" target="_blank">TheScriptingGames</a> website for more information and the<a href="http://powershell.org/games/Sg2013Guide.pdf" target="_blank">The Competitor Guide</a>.

## Summary: Practice Event 1 - Sizing up the Disks

> You have been asked to create a Windows PowerShell advanced function named Get-DiskSizeInfo. It must accept one or more computer names, and use WMI or CIM to query each computer. For each computer, it must display the percentage of free space, drive letter, total size in gigabytes, and free space in gigabytes. If a specified computer cannot be contacted, the function must log the computer name to C:\Errors.txt and display no error message.

* Minimum Requirements: n/a
* Optional Criteria
  * Display optional verbose output showing the computer name being contacted

## My code

```powershell
Function Get-DiskSizeInfo {
<#
.DESCRIPTION
Check the Disk(s) Size and remaining freespace.

.PARAMETER ComputerName
Specify the computername(s)

.INPUTS
System.String

.OUTPUTS
System.Management.Automation.PSObject

.EXAMPLE
Get-DiskSizeInfo

Get the drive(s), Disk(s) space, and the FreeSpace (GB and Percentage)

.EXAMPLE
Get-DiskSizeInfo -ComputerName SERVER01,SERVER02

Get the drive(s), Disk(s) space, and the FreeSpace (GB and Percentage)
on the Computers SERVER01 and SERVER02

.EXAMPLE
Get-Content Computers.txt | Get-DiskSizeInfo

Get the drive(s), Disk(s) space, and the FreeSpace (GB and Percentage)
for each computers listed in Computers.txt

.NOTES
NAME  : Get-DiskSizeInfo
AUTHOR: Francois-Xavier Cat
EMAIL : fxcat@LazyWinAdmin.com
DATE  : 2013/02/05 

.LINK
http://lazywinadmin.com
#>

[CmdletBinding()]
param(
    [Parameter(ValueFromPipeline=$True)]
    [string[]]$ComputerName = $env:COMPUTERNAME
)
BEGIN {# Setup
    }
PROCESS {
    Foreach ($Computer in $ComputerName) {

      Write-Verbose -Message "ComputerName: $Computer - Getting Disk(s) information..."
      try {
          # Set all the parameters required for our query
          $params = @{'ComputerName'=$Computer;
                      'Class'='Win32_LogicalDisk';
                      'Filter'="DriveType=3";
                      'ErrorAction'='SilentlyContinue'}
          $TryIsOK = $True

          # Run the query against the current $Computer    
          $Disks = Get-WmiObject @params
      }#Try

      Catch {
          "$Computer" | Out-File -Append -FilePath c:\Errors.txt
          $TryIsOK = $False
      }#Catch

      if ($TryIsOK) {
          Write-Verbose -Message "ComputerName: $Computer - Formating information for each disk(s)"
          foreach ($disk in $Disks) {

              # Prepare the Information output
              Write-Verbose -Message "ComputerName: $Computer - $($Disk.deviceid)"
              $output = @{
                  'ComputerName'=$computer;
                  'Drive'=$disk.deviceid;
                  'FreeSpace(GB)'=("{0:N2}" -f($disk.freespace/1GB));
                  'Size(GB)'=("{0:N2}" -f($disk.size/1GB));
                  'PercentFree'=("{0:P2}" -f(($disk.Freespace/1GB) / ($disk.Size/1GB)))}

              # Create a new PowerShell object for the output
              $object = New-Object -TypeName PSObject -Property $output
              $object.PSObject.TypeNames.Insert(0,'Report.DiskSizeInfo')

              # Output the disk information
              Write-Output -InputObject $object

          }#foreach ($disk in $disks)

      }#if ($TryIsOK)

  }#Foreach ($Computer in $ComputerName)

}#PROCESS
END {# Cleanup
    }
}#Function Get-DiskSizeInfo
```

## Using the function

By default, if you do not specify a computername, the function will query the localhost: $env:computername
![full](/images/2013/20130210_Winter_Scripting_Games_2013_-_Practice_Event_1/WinterScriptingGames-Event1-01__1207834562__-485x284.png)
{: .full}

### Getting some Help

```powershell
Get-Help Get-DiskSizeInfo -Full
```

The Function's help has been wrote between the <b>lines 2 and 39</b>.
More information on technet: <a href="http://technet.microsoft.com/library/hh847834.aspx" target="_blank">about_Comment_Based_Help</a>

![full](/images/2013/20130210_Winter_Scripting_Games_2013_-_Practice_Event_1/WinterScriptingGames-Event1-02__757978919__-685x1040.png)
{: .full}

### Use the Verbose switch</u></b>

```powershell
Get-DiskSizeInfo -ComputerName XAVIER -Verbose
```

![full](/images/2013/20130210_Winter_Scripting_Games_2013_-_Practice_Event_1/WinterScriptingGames-Event1-03__1499822209__-613x326.png)
{: .full}

The verbose switch is available since we use the `[CmdletBinding()]` at the line 41.
Check the nice article from the scripting guy: <a href="http://blogs.technet.com/b/heyscriptingguy/archive/2012/07/07/weekend-scripter-cmdletbinding-attribute-simplifies-powershell-functions.aspx" target="_blank">CmdletBinding Attribute Simplifies PowerShell Functions</a>