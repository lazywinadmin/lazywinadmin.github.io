---
layout: single
title: Scripting Games 2013 - Advanced Event 2 - An Inventory Intervention
excerpt: 
permalink: /2013/05/scripting-games-2013-advanced-event-2.html
tags: 
- 2013 scripting games
- inventory
- powershell 3.0
- psh2013
- scripting games
- wmi
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/PowerShell-Scripting-Games-Logo__613157146__-300x350.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="200" src="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/PowerShell-Scripting-Games-Logo__1295564477__-171x200.png" width="171" /></a>Now that event 2 is closed for new entries. Here is the solution I proposed.

<b>Instruction</b>
<a href="https://skydrive.live.com/redir?resid=60886DE0176E604A!9966&amp;authkey=!ABapUFHwm9UPuyQ" style="background-color: white; color: #da1f00; font-family: Verdana, Geneva, sans-serif; font-size: 13.333333969116211px; line-height: 20px; text-decoration: none;" target="_blank">Download the instruction here [skydrive]</a>

<blockquote class="tr_bq"><i>Dr. Scripto finally has the budget to buy a few new virtualization host servers, but he needs to make some room in the data center to accommodate them. He thinks it makes sense to get rid of his lowest-powered old servers first... but he needs to figure out which ones those are.</i><i>
</i><i>This is just the first wave, too – there's more budget on the horizon so it's possible he'll need to run this little report a few times. Better make a reusable tool.</i><i>
</i><i>
</i><i>All of the virtualization hosts run Windows Server, but some of them don't have Windows PowerShell installed, and they're all running different OS versions. The oldest OS version is Windows 2000 Server (he knows, and he's embarrassed but he's just been so darn busy). The good news is that they all belong to the same domain, and that you can rely on having a Domain Admin account to work with.</i><i>
</i><i>
</i><i>The good Doctor has asked you to write a PowerShell tool that can show him each server's name, installed version of Windows, amount of installed physical memory, and number of installed processors.</i><i>
</i><i>For processors, he'll be happy getting a count of cores, or sockets, or even both – whatever you can reliably provide across all these different versions of Windows. He has a few text files with computer names – he'd like to pipe the computer names, as strings, to you tool, and have your tool query those computers.</i></blockquote>
<b>Key Points</b>


* Some Remote Server don't have PowerShell

* Different OS versions (oldest is Window Server 2000)

* Domain Environment, Domain Admin credential.

* Output of the script: ServerName, Version of Windows, Amount of Physical Memory, Processors Count, Sockets Count, Cores Count.

* Script can receive ComputerName injected via the pipeline


<b>Steps to my solution</b>
Using WMI you can retrieve most of the information on remote machines (WMI Service is present since Windows 2000, Assuming WMI Service is running.. of course...)

Why not CIM ?
I could had play with <a href="http://technet.microsoft.com/en-us/library/jj590758(v=wps.620).aspx" target="_blank">Get-CIMInstance</a> (which use WSman in the background by default), but for my old servers without PowerShell and WSman, I would had to create an Explicit session with DCOM protocol, then use this session with Get-CimInstance.... I think it is a bit heavy to do this... so I stick to <a href="http://technet.microsoft.com/en-us/library/hh849824.aspx" target="_blank">Get-WmiObject</a>.

<b>Operating System Name</b> (<span style="font-family: Courier New, Courier, monospace;">Caption Property), <b>Operating System Version</b> (<span style="font-family: Courier New, Courier, monospace;">Version property) and <b>ComputerName</b>(Properties: <span style="font-family: Courier New, Courier, monospace;">PSComputerName, <span style="font-family: Courier New, Courier, monospace;">__SERVER or <span style="font-family: Courier New, Courier, monospace;">CSName) were all in the WMI class<a href="http://msdn.microsoft.com/en-ca/library/windows/desktop/aa394239(v=vs.85).aspx" target="_blank">Win32_OperatingSystem</a>.

<a href="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/wmi__182847684__-893x659.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="472" src="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/wmi__1570869439__-640x472.png" width="640" /></a>
<a href="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/wmi2__1560202913__-893x311.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="220" src="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/wmi2__1849721761__-640x223.png" width="640" /></a>
For the <b>Memory installed</b>... I based my script on <a href="http://msdn.microsoft.com/en-ca/library/windows/desktop/aa394102(v=vs.85).aspx" target="_blank">Win32_ComputerSystem</a> with the property <span style="font-family: Courier New, Courier, monospace;">TotalPhysicalMemory

However, I noticed that some other competitor were using the class <a href="http://msdn.microsoft.com/en-us/library/windows/desktop/aa394347(v=vs.85).aspx" target="_blank">Win32_PhysicalMemory</a>, doing a SUM on the <span style="font-family: Courier New, Courier, monospace;">Capacity properties outputted. I Chose to show the value in GB.

<a href="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/TotalPhysicalMemory__2136895007__-788x244.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="198" src="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/TotalPhysicalMemory__330482499__-640x198.png" width="640" /></a>

<b>Processors</b>
I used the classes <a href="http://msdn.microsoft.com/en-ca/library/windows/desktop/aa394102(v=vs.85).aspx" target="_blank">Win32_ComputerSystem</a> and <a href="http://msdn.microsoft.com/en-us/library/windows/desktop/aa394373(v=vs.85).aspx" target="_blank">Win32_Processor</a>

For Windows Server 2008 and above, you can get some information about the Processor(s) and the Core(s) using the properties <span style="font-family: Courier New, Courier, monospace;">NumberOfLogicalProcessors and <span style="font-family: Courier New, Courier, monospace;">NumberOfProcessors
<a href="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/win32_computersystem__1520782253__-788x196.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="158" src="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/win32_computersystem__714690566__-640x159.png" width="640" /></a>
However if I query Windows Server 2000 or 2003 I only get the property <span style="font-family: Courier New, Courier, monospace;">NumberOfProcessors

<a href="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/win32_computersystem_w2000__1628568995__-652x73.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="70" src="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/win32_computersystem_w2000__1318361596__-640x72.png" width="640" /></a><a href="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/win32_computersystem_w2003__1590244694__-662x73.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="70" src="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/win32_computersystem_w2003__203946842__-640x71.png" width="640" /></a>
<b>Sockets</b>and<b>Cores</b>
For this part, I looked at the property <span style="font-family: Courier New, Courier, monospace;">SocketDesignation in the <a href="http://msdn.microsoft.com/en-us/library/windows/desktop/aa394373(v=vs.85).aspx" target="_blank">Win32_processor</a> class.

<a href="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/win32_processor__1194456043__-767x244.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="202" src="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/win32_processor__938126303__-640x204.png" width="640" /></a>
I used the following code to count my sockets and cores:


```
FOREACH ($Proc in $Processors){
    IF($Proc.numberofcores -eq $null){
        IF ($Proc.SocketDesignation -ne $null){$Sockets++}
        $Cores++
    }ELSE {
        $Sockets++
        $Cores += $proc.numberofcores
    }#ELSE
}#FOREACH $Proc in $Processors
```

```


```
```

```
<u style="font-weight: bold;">Note:</u>For the Processor part, I think Mike F Robbins got a betterapproached, Check his post <a href="http://mikefrobbins.com/2013/05/07/2013-powershell-scripting-games-advanced-event-2-attention-to-detail-is-everything/" target="_blank">here.</a>


Vote for me! And Comment!
Please vote for me and let me know what you liked or not. I'm still learning and want to improve my code.
Thank you!
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://scriptinggames.org/entrylist.php?entryid=537" imageanchor="1" style="margin-left: auto; margin-right: auto;" target="_blank"><img border="0" height="120" src="{{ site.url }}/images/2013/20130507_Scripting_Games_2013_-_Advanced_Event_2_-_An_Inventory_Intervention/voting__1862195796__-400x123.png" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><b>You will need to be Logged On first on [http://scriptinggames.org](http://scriptinggames.org/)</b></td></tr></tbody></table>
<div class="separator" style="clear: both; text-align: left;">
Script

<pre class="brush: powershell;collapse:true;highlight:3; ruler: true; first-line: 1;gutter: true;">#requires -Version 3

function Get-ComputerInfo
{

<#
.SYNOPSIS
   This function query some basic Operating System and Hardware Information from
   a local or remote machine.

.DESCRIPTION
   This function query some basic Operating System and Hardware Information from
   a local or remote machine.
   It requires PowerShell version 3 for the Ordered Hashtable.

   The properties returned are the Computer Name (ComputerName),the Operating 
   System Name (OSName), Operating System Version (OSVersion), Memory Installed 
   on the Computer in GigaBytes (MemoryGB), the Number of 
   Processor(s) (NumberOfProcessors), Number of Socket(s) (NumberOfSockets),
   and Number of Core(s) (NumberOfCores).

   This function as been tested against Windows Server 2000, 2003, 2008 and 2012

.PARAMETER ComputerName
   Specify a ComputerName or IP Address. Default is Localhost.

.PARAMETER ErrorLog
   Specify the full path of the Error log file. Default is .\Errors.log.

.EXAMPLE
   Get-ComputerInfo

   ComputerName       : XAVIER
   OSName             : Microsoft Windows 8 Pro
   OSVersion          : 6.2.9200
   MemoryGB           : 4
   NumberOfProcessors : 1
   NumberOfSockets    : 1
   NumberOfCores      : 4

   This example return information about the localhost. By Default, if you don't
   specify a ComputerName, the function will run against the localhost.

.EXAMPLE
   Get-ComputerInfo -ComputerName SERVER01

   ComputerName       : SERVER01
   OSName             : Microsoft Windows Server 2012
   OSVersion          : 6.2.9200
   MemoryGB           : 4
   NumberOfProcessors : 1
   NumberOfSockets    : 1
   NumberOfCores      : 4

   This example return information about the remote computer SERVER01.

.EXAMPLE
   Get-Content c:\ServersList.txt | Get-ComputerInfo
    
   ComputerName       : DC
   OSName             : Microsoft Windows Server 2012
   OSVersion          : 6.2.9200
   MemoryGB           : 8
   NumberOfProcessors : 1
   NumberOfSockets    : 1
   NumberOfCores      : 4

   ComputerName       : FILESERVER
   OSName             : Microsoft Windows Server 2008 R2 Standard 
   OSVersion          : 6.1.7601
   MemoryGB           : 2
   NumberOfProcessors : 1
   NumberOfSockets    : 1
   NumberOfCores      : 1

   ComputerName       : SHAREPOINT
   OSName             : Microsoft(R) Windows(R) Server 2003 Standard x64 Edition
   OSVersion          : 5.2.3790
   MemoryGB           : 8
   NumberOfProcessors : 8
   NumberOfSockets    : 8
   NumberOfCores      : 8

   ComputerName       : FTP
   OSName             : Microsoft Windows 2000 Server
   OSVersion          : 5.0.2195
   MemoryGB           : 4
   NumberOfProcessors : 2
   NumberOfSockets    : 2
   NumberOfCores      : 2

   This example show how to use the function Get-ComputerInfo in a Pipeline.
   Get-Content Cmdlet Gather the content of the ServersList.txt and send the
   output to Get-ComputerInfo via the Pipeline.

.EXAMPLE
   Get-ComputerInfo -ComputerName FILESERVER,SHAREPOINT -ErrorLog d:\MyErrors.log.

   ComputerName       : FILESERVER
   OSName             : Microsoft Windows Server 2008 R2 Standard 
   OSVersion          : 6.1.7601
   MemoryGB           : 2
   NumberOfProcessors : 1
   NumberOfSockets    : 1
   NumberOfCores      : 1

   ComputerName       : SHAREPOINT
   OSName             : Microsoft(R) Windows(R) Server 2003 Standard x64 Edition
   OSVersion          : 5.2.3790
   MemoryGB           : 8
   NumberOfProcessors : 8
   NumberOfSockets    : 8
   NumberOfCores      : 8

   This example show how to use the function Get-ComputerInfo against multiple
   Computers. Using the ErrorLog Parameter, we send the potential errors in the
   file d:\Myerrors.log.

.INPUTS
   System.String

.OUTPUTS
   System.Management.Automation.PSCustomObject

.NOTES
   Scripting Games 2013 - Advanced Event #2
#>

 [CmdletBinding()]

 PARAM(
  [Parameter(ValueFromPipeline=$true)]
  [String[]]$ComputerName = "LocalHost",

  [String]$ErrorLog = ".\Errors.log"
    )

    BEGIN {}#PROCESS BEGIN

    PROCESS{
        FOREACH ($Computer in $ComputerName) {
            Write-Verbose -Message "PROCESS - Querying $Computer ..."
                
            TRY{
                $Everything_is_OK = $true
                Write-Verbose -Message "PROCESS - $Computer - Testing Connection"
                Test-Connection -Count 1 -ComputerName $Computer -ErrorAction Stop -ErrorVariable ProcessError | Out-Null

                # Query WMI class Win32_OperatingSystem
                Write-Verbose -Message "PROCESS - $Computer - WMI:Win32_OperatingSystem"
                $OperatingSystem = Get-WmiObject -Class Win32_OperatingSystem -ComputerName $Computer -ErrorAction Stop -ErrorVariable ProcessError
                    
                # Query WMI class Win32_ComputerSystem
                Write-Verbose -Message "PROCESS - $Computer - WMI:Win32_ComputerSystem"
                $ComputerSystem = Get-WmiObject -Class win32_ComputerSystem -ComputerName $Computer -ErrorAction Stop -ErrorVariable ProcessError

                # Query WMI class Win32_Processor
                Write-Verbose -Message "PROCESS - $Computer - WMI:Win32_Processor"
                $Processors = Get-WmiObject -Class win32_Processor -ComputerName $Computer -ErrorAction Stop -ErrorVariable ProcessError

                # Processors - Determine the number of Socket(s) and core(s)
                # The following code is required for some old Operating System where the
                # property NumberOfCores does not exist.
                Write-Verbose -Message "PROCESS - $Computer - Determine the number of Socket(s)/Core(s)"
                $Cores = 0
                $Sockets = 0
                FOREACH ($Proc in $Processors){
                    IF($Proc.numberofcores -eq $null){
                        IF ($Proc.SocketDesignation -ne $null){$Sockets++}
                        $Cores++
                    }ELSE {
                        $Sockets++
                        $Cores += $proc.numberofcores
                    }#ELSE
                }#FOREACH $Proc in $Processors

            }CATCH{
                $Everything_is_OK = $false
                Write-Warning -Message "Error on $Computer"
                $Computer | Out-file -FilePath $ErrorLog -Append -ErrorAction Continue
                $ProcessError | Out-file -FilePath $ErrorLog -Append -ErrorAction Continue
                Write-Warning -Message "Logged in $ErrorLog"

            }#CATCH


            IF ($Everything_is_OK){
                Write-Verbose -Message "PROCESS - $Computer - Building the Output Information"
                $Info = [ordered]@{
                    "ComputerName" = $OperatingSystem.__Server;
                    "OSName" = $OperatingSystem.Caption;
                    "OSVersion" = $OperatingSystem.version;
                    "MemoryGB" = $ComputerSystem.TotalPhysicalMemory/1GB -as [int];
                    "NumberOfProcessors" = $ComputerSystem.NumberOfProcessors;
                    "NumberOfSockets" = $Sockets;
                    "NumberOfCores" = $Cores}

                $output = New-Object -TypeName PSObject -Property $Info
                $output
            } #end IF Everything_is_OK
        }#end Foreach $Computer in $ComputerName
    }#PROCESS BLOCK
    END{
        # Cleanup
        Write-Verbose -Message "END - Cleanup Variables"
        Remove-Variable -Name output,info,ProcessError,Sockets,Cores,OperatingSystem,ComputerSystem,Processors,
        ComputerName, ComputerName, Computer, Everything_is_OK -ErrorAction SilentlyContinue
        
        # End
        Write-Verbose -Message "END - Script End !"
    }#END BLOCK
}#function


```

