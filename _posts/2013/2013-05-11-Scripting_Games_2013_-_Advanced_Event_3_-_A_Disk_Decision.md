---
layout: single
title: Scripting Games 2013 - Advanced Event 3 - A Disk Decision
excerpt: 
permalink: /2013/05/scripting-games-2013-advanced-event-3.html
tags: 
- 2013 scripting games
- powershell
- powershell 3.0
- psh2013
- scripting games
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/PowerShell-Scripting-Games-Logo__143756490__-300x350.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="200" src="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/PowerShell-Scripting-Games-Logo__1909618663__-171x200.png" width="171" /></a>This is my solution for the Advanced Event #3.
Unfortunately I don't expect a very high score in the Leader board since I did not submit the good version of my script... Shame.... But anyway I learned a bit from this event and wanted to share my solution. Hope this help someone out-there.

<b style="font-size: x-large;">Instruction</b>
<a href="http://sdrv.ms/10N73hY" target="_blank">Download</a> [SkyDrive]


<blockquote class="tr_bq"><i>Dr. Scripto has been fielding a lot of calls from the Help Desk lately. They've been asking him to look up information about the local hard drives in various servers – mainly size and free space information. He doesn't mind helping, but all the requests have been getting in the way of his naps. He's asked you to write a tool comand that can get the information for the help desk – and theywants the output in an HTML file. The HTML file should look something like this:</i><i>
</i></blockquote><a href="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/instruction__1927095938__-661x424.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="256" src="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/instruction__5237119__-400x257.png" width="400" /></a><blockquote class="tr_bq"><i></i><i>The Doctor says you should parameterize your command – he wants to be able to pipe in one or more computer names as strings.The resulting HTML does need to go into an HTML file on disk someplace, and that file should have the computer name (e.g., the computer SERVER1 should have Server1.html, SERVER2 should have server2.html, and so on). A parameter should let him indicate the path (directory) to write the files to. Also, he wants you to pay special attention to the following:</i>

* <i>The browser displays "Disk Free Space Report" in the page tab when viewing the report.</i>

* <i>"Local Fixed Disk Report" is in the H2 ("Heading 2") HTML style.If you can actually add the computer name to that – bonus!</i>

* <i>The report ends with an HTML horizontal rule and the date and time that the report was generated.</i>

* <i>The size and free space values are shown as gigabytes (GB) and megabytes (MB) respectively, each to two decimal places.</i>
<i>The command you write can assume that both WMI and CIM are available on the remote computers, and that all the necessary firewall rules and authentication have already been taken care of.</i></blockquote>
<b>Solution</b>

<b>Finding the disk information</b>
We'll have to use WMI/CIM to get this information on the remote computers.
To find which class to use, I typed the following commands:

<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">Get-CimClass *disk*

```
<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">Get-CimClass *disk* -PropertyName *size*
```




<a href="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Get-CimClass__1020437012__-1013x843.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="531" src="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Get-CimClass__2008017616__-640x533.png" width="640" /></a>
Since we just want the logical disk information, here we can use Win32_LogicalDisk or CIM_LogicalDisk


<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">Get-CimInstance -ClassName Win32_LogicalDisk

```


<a href="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Win32_logicalDisk__316438210__-1013x269.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="168" src="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Win32_logicalDisk__86458016__-640x170.png" width="640" /></a>
Note that FileSystem disk has the "Drive Type" = '3'. We will want to filter our query on this property.

<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">Get-CimInstance -ClassName Win32_LogicalDisk -filter "DriveType = '3'"
```

<a href="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Win32_logicalDisk_filter__1682305068__-884x69.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="49" src="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Win32_logicalDisk_filter__1736385386__-640x50.png" width="640" /></a>
Now we don't need all the extra properties so we can add an extra filter using the parameter "-Property"

<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">Get-CimInstance -ClassName Win32_LogicalDisk -filter "DriveType = '3'" -property DeviceId, Size, Freespace
```

<a href="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Win32_logicalDisk_property__1423735931__-899x675.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="480" src="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Win32_logicalDisk_property__587499439__-640x481.png" width="640" /></a>

Actually, while writing this post I wassurprised to see that using the Property Parameter is actually slower than using the Pipeline and sending the output to Select-Object...!!

<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">(Measure-Command {Get-CimInstance -ClassName Win32_logicaldisk -filter "DriveType = '3'" -Property DeviceID,Size,Freespace}).milliseconds
(Measure-Command {Get-CimInstance -ClassName Win32_logicaldisk -filter "DriveType = '3'" | select-object -property DeviceID,Size,Freespace}).milliseconds

```

<a href="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Win32_logicalDisk_Measure__587114782__-680x99.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Win32_logicalDisk_Measure__587114782__-680x99.png" /></a>


<b>Connecting to the Remote Computers</b>

I decided to add the parameter Credential to allow alternative username/password.
<a class="g-profile" href="http://plus.google.com/100797865397105871021" target="_blank">+Boe Prox</a>posted a nice article last year during the Scripting Games 2012 (<a href="http://learn-powershell.net/2012/05/10/speedy-network-information-query-using-powershell/" target="_blank">Speedy Network Information Query Using PowerShell</a>) Check out his blog for more details.


```
[Alias("RunAs")]
[System.Management.Automation.Credential()]$Credential = [System.Management.Automation.PSCredential]::Empty,
```

I decided to use CIMSession since I did not get to work with those that much since PowerShell v3.0 has been released...
At the PowerShell Summit I learned that CIMSession uses WSMan by default. However you can also specify to CIMSession to use the protocol DCOM using the Cmdlet <a href="http://technet.microsoft.com/en-us/library/jj590764(v=wps.620).aspx" target="_blank">New-CimSessionOption</a>
I liked the approach of<a class="g-profile" href="http://plus.google.com/110276222213807732733" target="_blank">+Mike Robbins</a>on this in the Event 2 for this part and I decided to do my own from it.

<pre class="brush: powershell;toolbar:false;highlight: [2, 11, 15, 18, 28];ruler: true; first-line: 1;gutter: true;"># Building Splatting for CIM Sessions
$CIMSessionParams = @{
    ComputerName  = $Computer
    ErrorAction   = 'Stop'
    ErrorVariable = 'ProcessError'}

TRY {
    $Everything_is_OK = $true

    # Credential
    IF ($PSBoundParameters['Credential']) {$CIMSessionParams.credential = $Credential}
    
    # Connectivity Test
    Write-Verbose -Message "$Computer - Testing Connection..."
    Test-Connection -ComputerName $Computer -count 1 -Quiet -ErrorAction Stop | Out-Null

    # WSMan Connection
    IF ((Test-WSMan -ComputerName $Computer -ErrorAction SilentlyContinue).productversion -match 'Stack: 3.0'){
        Write-Verbose -Message "$Computer - WSMAN is responsive"
        $CimSession = New-CimSession @CIMSessionParams
        $CimProtocol = $CimSession.protocol
        Write-Verbose -message "$Computer - [$CimProtocol] CIM SESSION - Opened"
        $LogicalDiskInfo = Get-CimInstance -CimSession $CimSession -ClassName win32_LogicalDisk -Filter "DriveType='3'" -Property DeviceID,Size,Freespace,systemname
 
    }ELSE {
        # Trying with DCOM protocol
        Write-Verbose -Message "$Computer - Trying to connect via DCOM protocol"
        $CIMSessionParams.SessionOption = New-CimSessionOption -Protocol Dcom
        $CimSession = New-CimSession @CIMSessionParams
        $CimProtocol = $CimSession.protocol
        Write-Verbose -message "$Computer - [$CimProtocol] CIM SESSION - Opened"
        $LogicalDiskInfo = Get-CimInstance -CimSession $CimSession -ClassName win32_LogicalDisk -Filter "DriveType='3'" -Property DeviceID,Size,Freespace,systemname
    }
}

```

<b>Line 2</b> - First I create the parameter to use for the current Computer using Splatting.
<b>Line 11</b> - If Credentials are specified by the user when using the function those are inserted in the $CIMSessionParams
<b>Lines 15,18,28</b> The function tests the connectivity to the remote host and opens a CIMSession using WSMan or DCOM.

And finally we query the disk information against the computer using the established CIMSession, see $LogicalDiskInfo

<b>Output the Data and Build the HTML Report</b>
<b>
</b>Now that the hardest part of the work is done, all we need is to output the data as requested.
In the scenario they request to have only 3 properties DRIVE which is the DeviceID property, SIZE(GB) which is Size (default is in Bytes) converted to GB with 2 decimals and finally the FREESPACE(MB) which is Freespace (default is in Bytes) converted to MB with 2 decimals as well.

<a href="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/formatting__678769728__-523x237.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="289" src="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/formatting__2130112522__-523x237.png" width="640" /></a>

<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">$Report = $LogicalDiskInfo | Select-Object @{Label="Drive";Expression={$_.DeviceID}},
    @{Label="Size(GB)";Expression={"{0:N2}" -f ($_.Size/1GB)}},
    @{Label="FreeSpace(MB)";Expression={"{0:N2}" -f ($_.FreeSpace/1MB)}}| 
    ConvertTo-Html -Fragment
```


Here we convert our final Output to HTML using <a href="http://technet.microsoft.com/en-us/library/hh849944.aspx" target="_blank">ConvertTo-Html</a>.
We also use the parameter Fragment that generates only an HTML table. The HTML, HEAD, TITLE, and BODY tags are omitted in that case.

Finally there are some requirements for the HTML Report:



* The browser displays "Disk Free Space Report" in the page tab when viewing the report.

* "Local Fixed Disk Report" is in the H2 ("Heading 2") HTML style.If you can actually add the computer name to that – bonus!

* The report ends with an HTML horizontal rule and the date and time that the report was generated.



<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;"># Building Splatting for the HTML Report Sessions
$HTMLParams = @{
    Head  = "<title>Disk Free Space Report</title><h2>$Computer - Local Fixed Disk Report</h2>"
    As    = "Table"
    PostContent = "$Report<br><hr><br>$(Get-Date)"
}

ConvertTo-Html @htmlparams | Out-File -FilePath $Directory\$COMPUTER.html
```


Here again we use Splatting to specify our ConvertTo-Html parameters. Note that we inject the disk report $report with the requirements of Dr. Scripto inside the PostContent parameter.



<b>Testing the function</b>

Against a Windows Server 2000 and a fake server (to verify errorhandling)
<a href="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Test-W2000__2146064434__-679x224.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Test-W2000__2146064434__-679x224.png" /></a>
With a Windows Server 2012 (WsMan Enabled)
<a href="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Test-W2012__591643752__-622x171.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="174" src="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/Test-W2012__1672090311__-622x171.png" width="640" /></a>


<b>Final Report</b>

<a href="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/report__1930977008__-556x350.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130511_Scripting_Games_2013_-_Advanced_Event_3_-_A_Disk_Decision/report__1930977008__-556x350.png" /></a>

Script


```
#requires -Version 3

function Get-LogicalDisk {
<#
.SYNOPSIS
   The function Get-LogicalDisk reports the disk capacity and freespace and output the result in an HTML.

.DESCRIPTION
   The function Get-LogicalDisk reports the disk capacity and freespace and output the result in an HTML.
   It can be run against one or more computers.
   It requires PowerShell version 3 (for CIM Cmdlets and ordered hashtable)

.PARAMETER ComputerName
   Specify a ComputerName or IP Address.
   Default is Localhost.

.PARAMETER ErrorLog
   Specify the full path of the Error log file.
   Default is .\Errors.log.

.PARAMETER Credential
   Specify the credential if different from the current user

.PARAMETER Directory
   Specify the full path of the directory where the HTML reports should be dropped.
   Default is C:\Scripts

.EXAMPLE
   Get-LogicalDisk

   This example report information about the logical localhost. By Default, if you don't specify
   a ComputerName, the function will run against the localhost.
   No Output will show on the screen, Output is sent to HTML file (default is C:\scripts)

.EXAMPLE
   Get-LogicalDisk -ComputerName SERVER01,SERVER02,SERVER03 -Credential (Get-Credential) -Directory C:\Scripts

   This example will report disk usage on SERVER01, SERVER02 and SERVER03.
   You will be prompted for Credential (see Get-Help Get-Credential)
   No Output will show on the screen, Output is sent to HTML file (default is C:\scripts)

.INPUTS
   System.String

.OUTPUTS
   HTML File

.NOTES
   Scripting Games 2013 - Advanced Event #3
#>

    [CmdletBinding()]

    PARAM(
        [Parameter(ValueFromPipeline)]
        [ValidateNotNullorEmpty()]
        [String[]]$ComputerName = $env:ComputerName,
        
        [String]$ErrorLog = ".\Errors.log",
        
        [Alias("RunAs")]
        [System.Management.Automation.Credential()]$Credential = [System.Management.Automation.PSCredential]::Empty,

        [Alias("Path")]        
        [ValidateScript({Test-Path -path $_})]
        [String]$Directory = "C:\scripts\"
        
    )#end Param

    BEGIN {}

    PROCESS{
        FOREACH ($Computer in $ComputerName) {

            # Building Splatting for CIM Sessions
            $CIMSessionParams = @{
                ComputerName  = $Computer
                ErrorAction   = 'Stop'
                ErrorVariable = 'ProcessError'}

            TRY {
                $Everything_is_OK = $true

                # Credential
                IF ($PSBoundParameters['Credential']) {$CIMSessionParams.credential = $Credential}
                
                # Connectivity Test
                Write-Verbose -Message "$Computer - Testing Connection..."
                Test-Connection -ComputerName $Computer -count 1 -Quiet -ErrorAction Stop | Out-Null

                # WSMan Connection
                IF ((Test-WSMan -ComputerName $Computer -ErrorAction SilentlyContinue).productversion -match 'Stack: 3.0'){
                    Write-Verbose -Message "$Computer - WSMAN is responsive"
                    $CimSession = New-CimSession @CIMSessionParams
                    $CimProtocol = $CimSession.protocol
                    Write-Verbose -message "$Computer - [$CimProtocol] CIM SESSION - Opened"
                    $LogicalDiskInfo = Get-CimInstance -CimSession $CimSession -ClassName win32_LogicalDisk -Filter "DriveType='3'" -Property DeviceID,Size,Freespace,systemname
                }ELSE {

                    # Trying with DCOM protocol
                    Write-Verbose -Message "$Computer - Trying to connect via DCOM protocol"
                    $CIMSessionParams.SessionOption = New-CimSessionOption -Protocol Dcom
                    $CimSession = New-CimSession @CIMSessionParams
                    $CimProtocol = $CimSession.protocol
                    Write-Verbose -message "$Computer - [$CimProtocol] CIM SESSION - Opened"
                    $LogicalDiskInfo = Get-CimInstance -CimSession $CimSession -ClassName win32_LogicalDisk -Filter "DriveType='3'" -Property DeviceID,Size,Freespace,systemname
                }
            }

            CATCH{

                $Everything_is_OK = $false
                Write-Warning -Message "Error on $Computer"
                $Computer | Out-file -FilePath $ErrorLog -Append -ErrorAction Continue
                $ProcessError | Out-file -FilePath $ErrorLog -Append -ErrorAction Continue
                Write-Warning -Message "Logged in $ErrorLog"
            }

            IF ($Everything_is_OK){

                Write-Verbose -Message "$Computer - Generating HTML Report"
                $Report = $LogicalDiskInfo | Select-Object @{Label="Drive";Expression={$_.DeviceID}},
                    @{Label="Size(GB)";Expression={"{0:N2}" -f ($_.Size/1GB)}},
                    @{Label="FreeSpace(MB)";Expression={"{0:N2}" -f ($_.FreeSpace/1MB)}}| 
                    ConvertTo-Html -Fragment
                
                # Building Splatting for the HTML Report Sessions
                $HTMLParams = @{
                    Head  = "<title>Disk Free Space Report</title><h2>$Computer - Local Fixed Disk Report</h2>"
                    As    = "Table"
                    PostContent = "$Report<br><hr><br>$(Get-Date)"
                }

               ConvertTo-Html @htmlparams | Out-File -FilePath $Directory\$COMPUTER.html
            }
        } # FOREACH
    }#PROCESS
}#Function



```


