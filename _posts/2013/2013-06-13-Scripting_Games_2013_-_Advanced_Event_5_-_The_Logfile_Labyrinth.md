---
layout: single
title: Scripting Games 2013 - Advanced Event 5 - The Logfile Labyrinth
excerpt: 
permalink: /2013/06/scripting-games-2013-advanced-event-5.html
tags: 
- 2013 scripting games
- function
- iis
- log
- parser
- powershell
- scripting games
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/PowerShell-Scripting-Games-Logo__1922393941__-300x350.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="200" src="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/PowerShell-Scripting-Games-Logo__1639206210__-171x200.png" width="171" /></a>This is my solution for the Advanced Event 5.
I did not have much time to work on this event, but here is the script I submitted.

Instruction
<a href="https://skydrive.live.com/redir?resid=60886DE0176E604A!10056&amp;authkey=!AMr75bAbpcKJSxw" target="_blank">Download</a> [Skydrive]

<blockquote class="tr_bq"><i>Dr. Scripto finds himself in possession of a bunch of IIS log files, much like the one at</i>
<i><a href="http://morelunches.com/files/powershell3/LogFiles.zip" target="_blank">http://morelunches.com/files/powershell3/LogFiles.zip</a>, if you need one to practice with. He's keeping all of the log files in a folder, and he's left the log files with their default filenames, which he's given a .LOG filename extension. All of the files are for a single Web site, on a single Web server.</i>
<i></i>
<i>He'd like you to write a tool that accepts a path, and then simply scans through each file in that path somehow, generating a list of each unique client IP address that have been used to access the Web site. No IP address should appear more than once in your output, and you don't need to sort the output in any way.</i>
<i></i>
<i>Your tool should optionally accept an IP address mask like "192.0.1.*" and only display IP addresses that match the specified pattern. If run without a pattern, display all IP addresses.</i>
<i></i>
<i>Regardless of the addresses found in the sample file linked above, you should assume that any legal IP address may appear in the files Dr. Scripto needs to scan. Your command should scan all of the files in the folder (and the folder doesn't contain any other kind of file) and produce a single set of results. If an IP address appears in multiple log files and it's likely that will be the case then your final output should still only list that IP address.</i></blockquote>


<b style="font-size: x-large;">Solution</b>
<b>
</b><b>Dr Scripto requirements</b>


* Tool to scan IIS logs

* Parameter Path (to specify the location of the logs

* Parameter IP Address mask like "192.0.1.*" to filter the output on a specific pattern

* No pattern specified : Show all Unique client IP

* Output should show Unique Client IP Address that have been used to access the Website

* No IP should appear more than once in the output

* No Sorting

<b>IIS Log File formats overview</b>
In my script I only focused on the W3C format, but here is the list of formats supported by IIS
<blockquote class="tr_bq"><ul style="color: #666666; font-family: Calibri, 'Lucida Sans Unicode', Arial, sans-serif; font-size: 16px; line-height: 18px; list-style-image: initial; list-style-position: initial; margin: 0px 0px 9px 25px; padding: 0px;">
* <b>W3C (World Wide Web Consortium) Extended log file format</b>– This is the default log file format used by IIS. Its uses ASCII text format and the time are recorded as UTC. This is the only format where you can customize the properties there by you can limit the size of log files and obtain the detailed information. The properties written in the log files are separated by using spaces.
<ul style="color: #666666; font-family: Calibri, 'Lucida Sans Unicode', Arial, sans-serif; font-size: 16px; line-height: 18px; list-style-image: initial; list-style-position: initial; margin: 0px 0px 9px 25px; padding: 0px;">
* <b>IIS (Microsoft Internet Information Services) log file format</b>– This format also uses ASCII text format and uses fixed number of properties. IIS log file format is used when you don't need detailed information from the logs; it logs more information than NSCA common format but less than W3C format. It is a comma separated file and uses the local time.
<ul style="color: #666666; font-family: Calibri, 'Lucida Sans Unicode', Arial, sans-serif; font-size: 16px; line-height: 18px; list-style-image: initial; list-style-position: initial; margin: 0px 0px 9px 25px; padding: 0px;">
* <b>NCSA (National Center for Supercomputing Applications) log file format</b>– This format logs only the basic information. Similar to IIS log file format it uses fixed number of properties. It records the time using the local time and properties are separated by spaces. Note that NCSA log file format does not support FTP sites. Since the entries are small with this format, the storage space required for logging is comparatively less compared to other formats.
<ul style="color: #666666; font-family: Calibri, 'Lucida Sans Unicode', Arial, sans-serif; font-size: 16px; line-height: 18px; list-style-image: initial; list-style-position: initial; margin: 0px 0px 9px 25px; padding: 0px;">
* <b>Centralized Binary Logging</b>– Centralized binary logging is used when multiple web sites running on a server to write binary, unformatted log data to a single log file. Each web server running IIS creates one log file for all sites on that server. The IIS writes log files in binary format and uses a single file there by making it memory efficient. This type of logging is not supported at web site level.
<ul style="color: #666666; font-family: Calibri, 'Lucida Sans Unicode', Arial, sans-serif; font-size: 16px; line-height: 18px; list-style-image: initial; list-style-position: initial; margin: 0px 0px 9px 25px; padding: 0px;">
* <b>ODBC log file format</b>– This method is used when you want to log access information directly to a database. Enabling ODBC logging will disable the kernel-mode cache so this may affect the server performance. Only supported at site level.
</blockquote><blockquote class="tr_bq"><u>Source:</u>[http://www.surfray.com/blog/2009/08/11/iis-log-file-formats-overview/](http://www.surfray.com/blog/2009/08/11/iis-log-file-formats-overview/)</blockquote>
<b>Header</b>
The header of the W3C Log format stats by the "#fields: " pattern.
Let's use that to find our properties.
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/W3C_IISlog_format__1402478162__-795x292.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/W3C_IISlog_format__1402478162__-795x292.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">IIS Log - W3C Format</td></tr></tbody></table>
Using<span style="font-family: Courier New, Courier, monospace;"> Select-String, I find the line with the pattern '<span style="font-family: Courier New, Courier, monospace;">#fields: '. Then I use the <span style="font-family: Courier New, Courier, monospace;">SubString() Method to get the rest of the line. Finally I use <span style="font-family: Courier New, Courier, monospace;">-split to have all my different property names.

<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">((Select-String -path .\W3SVC1\u_ex120420.log -Pattern "#fields: " | 
 Select-Object -First 1).line.Substring("#Fields: ".Length) -split ' ')
```

<a href="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/headers__1380900729__-801x223.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/headers__1380900729__-801x223.png" /></a>

<b>Working with the Data</b>
After playing a bit with different Cmdlets to read the logs, I finally decided to use<span style="font-family: Courier New, Courier, monospace;">Import-CSV.
That's super lazy since this Cmdlet already has a "<span style="font-family: Courier New, Courier, monospace;">Delimiter" Parameter<b>:-)</b>! Exactly what I need!

In the following code, I use Import-Csv with the header previously determined and delimite the data on white space ' '. I also ignore any lines starting by "#"

<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">$header = ((Select-String -path .\W3SVC1\u_ex120420.log -Pattern "#fields: " | 
 Select-Object -First 1).line.Substring("#Fields: ".Length) -split ' ')

Import-Csv '.\W3SVC1\u_ex120420.log' -Header $header -Delimiter ' ' | 
 Where-Object { -not($_.Date.StartsWith('#'))}
```

<a href="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/split__79274484__-816x580.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/split__79274484__-816x580.png" /></a>
I repeat the same process for each file (using foreach) and store the information in an array. 
This technique has some limits and can't handle large file.
Check-out the references below,<b>Emin Atac </b>did an awesome work on this event. Especially this part.

<a href="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/code_explain__771152283__-896x444.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="317" src="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/code_explain__313833373__-640x317.png" width="640" /></a>

<b>Processing the final Data</b>
<a href="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/final_output__1959247186__-683x254.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/final_output__1959247186__-683x254.png" /></a>
<b>Outputting</b>
<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">Get-IISLogClientIPAddress -Path .\ -Pattern *55.2*
Get-IISLogClientIPAddress -Path .\

```
<b>
</b>
<a href="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/final_output2__243605261__-581x342.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130613_Scripting_Games_2013_-_Advanced_Event_5_-_The_Logfile_Labyrinth/final_output2__243605261__-581x342.png" /></a>
<b style="font-size: x-large;">What I Missed</b>
From the other entries I saw and the comments I got, my script miss the following points.

* Handling massive log files

* <span style="font-family: Courier New, Courier, monospace;">Test-Path with <span style="font-family: Courier New, Courier, monospace;">-container switch on the Path parameter ( in the <span style="font-family: Courier New, Courier, monospace;">PARAM() block)

* <span style="font-family: Courier New, Courier, monospace;">Try/Catch on the <span style="font-family: Courier New, Courier, monospace;">Out-File (in the <span style="font-family: Courier New, Courier, monospace;">Process{Catch{}} part)
<b style="font-size: x-large;">References</b>
Small list of the interesting blog articles/documentations I found.

* <a href="http://p0w3rsh3ll.wordpress.com/2013/05/28/2013-scripting-games-event-5/" target="_blank"><b>Emin Atac</b>who did an awesome job on this event</a>

* <u><a href="http://blogs.technet.com/b/heyscriptingguy/archive/2012/03/03/use-powershell-to-collect-store-and-parse-iis-log-data.aspx" target="_blank">Use PowerShell to Collect, Store, and Parse IIS Log Data<b> using SQL</b></a></u>

* <u><a href="http://www.w3.org/TR/WD-logfile.html" target="_blank">W3C Logging - W3.org</a></u>

* <u><a href="http://msdn.microsoft.com/en-us/library/windows/desktop/aa814385(v=vs.85).aspx" target="_blank">W3C Logging - MSDN</a></u>

* <a href="http://www.surfray.com/blog/2009/08/11/iis-log-file-formats-overview/" target="_blank">IIS Log format overview</a>

* <u><a href="http://poshcode.org/2574" target="_blank">Import-IIS-Log by Mark Shevchenko</a></u>

* <u><a href="http://stackoverflow.com/questions/11253184/powershell-iis-log-analasys" target="_blank">Powershell IIS Log Analasys<b>using Import-CSV</b></a></u>

* <u><a href="http://www.gfi.com/blog/windows-powershell-extracting-strings-using-regular-expressions/" target="_blank">Windows PowerShell: Extracting Strings Using Regular Expressions</a></u>

* <a href="http://technet.microsoft.com/en-us/magazine/2008.09.windowspowershell.aspx" target="_blank">Don Jones - Select-Strin</a>g

* <a href="http://stevenaskwith.com/2012/05/22/parse-iis-log-files-with-powershell/" target="_blank">Parse IIS log files with PowerShell <b>using System.IO.File</b></a>

* <a href="http://wingleungchan.blogspot.ca/2011/04/parsing-iis-logs-with-powershell.html" target="_blank">Parsing IIS logs with PowerShell <b>using System.Data.DataTable</b></a>
<b style="font-size: x-large;">Script</b>


```
function Get-IISLogClientIPAddress {
<#
.SYNOPSIS
   The function Get-IISLogClientIPAddress generates a list of each unique Client IP address that have been used to access the Website.
   The function is checking the IIS logs from the Path parameter specified by the user.

.DESCRIPTION
   The function Get-IISLogClientIPAddress generates a list of each unique Client IP address that have been used to access the Website.
   The function is checking the IIS logs from the Path parameter specified by the user.

.PARAMETER Path
   Specifies the Path to the files to be searched. Wildcards are permitted.

.PARAMETER Pattern
   Specifies the text to find.

.PARAMETER Delimiter
   Specifies the delimiter that separates the property values. Default value is ' '

.PARAMETER ErrorLog
   Specifies the full path of the Error log file.

.EXAMPLE
   Get-IISLogClientIPAddress -Path .\ -Pattern '10.211.55.*5'

    IPAddress
    ----
    10.211.55.25

   This example generate a list of IPaddress from the logs located in the current directory ".\" 
   with a pattern '10.211.55.*5'.

.EXAMPLE
   Get-IISLogClientIPAddress -Path .\ -Delimiter ' ' -Pattern '*.55.*'

    IPAddress
    ----
    10.211.55.25
    10.211.55.29 
    10.211.55.31 
    10.211.55.28 
    10.211.55.27 
    10.211.55.26 
    10.211.55.30  

   This example generate a list of IPaddress from the logs located in the current directory ".\"  
   with a pattern '*.55.*'

.EXAMPLE
    Get-IISLogClientIPAddress -Path c:\sysadmin\IISLog\W3SVC8 -Pattern "172.20.96.*" -ErrorLog Errors.log

    IPAddress
    ----
    172.20.96.9
    172.20.96.10
    172.20.96.18

   This example generate a list of IPaddress from the logs located in the directory c:\sysadmin\IISLog\W3SVC8
   with a pattern '172.20.96.*'. Errors will be logged in Errors.log.
  
.INPUTS
   String

.OUTPUTS
   Selected.System.Management.Automation.PSCustomObject

.NOTES
   Scripting Games 2013 - Advanced Event #5
#>
    
[CmdletBinding()]
    PARAM(
        [Parameter(Mandatory,HelpMessage = "FullPath to IIS Log files",Position=0,ValueFromPipeline)]
        [PSDefaultValue(Help='Specifies the Path to the IIS Log files')]
        [Alias("Directory")]        
        [ValidateScript({Test-Path -path $_})]
        [String]$Path="",
        
        [PSDefaultValue(Help='Specifies the IPAddress Pattern to search')]
        [String]$Pattern,
        
        [PSDefaultValue(Help='Specifies the Delimiter. Default is " "')]
        [String]$Delimiter=" ",
        
        [PSDefaultValue(Help='Specifies the FullPath to Error log file')]
        [ValidateScript({Test-path -Path $_ -IsValid})]
        [String]$ErrorLog
    )
    BEGIN{
        $info=@()
    }#BEGIN BLOCK

    PROCESS{

        TRY{
            $Everything_is_OK = $true

            Write-Verbose -Message "Listing and Searching in all *.LOG files in $Path"
            FOREACH ($LogFile in (Get-ChildItem -Path $Path -include *.log -ErrorAction Stop -Recurse -ErrorVariable GCIErrors)) {
                Write-Verbose -Message "$($Logfile.Name)"

                # HEADER, The #Fields directive lists a sequence of field identifiers specifying the information recorded in each entry
                Write-Verbose -Message "$($Logfile.Name) - Identifiying Header"
                $header = ((Select-String -path $LogFile -Pattern "#fields: " | 
                    Select-Object -First 1).line.Substring("#Fields: ".Length) -split ' ')

                # PARSING/IMPORTING as a CSV format.
                Write-Verbose -Message "$($Logfile.Name) - Importing Data as a CSV format"
                $csv = Import-Csv -path $LogFile -Header $Header -Delimiter $Delimiter -ErrorAction Stop -ErrorVariable ImportCSVErrors | 
                    Where-Object { -not($_.Date.StartsWith('#'))}
                
                # Outputting information to $info variable
                Write-Verbose -Message "$($Logfile.Name) - Sending data to final variable"
                $info += $csv

            }#FOREACH

        }#TRY

        CATCH{
            
            # ERROR HANDLING
            $Everything_is_OK = $false
            Write-Warning -Message "Wow! Something Went wrong !"
            Write-Warning -Message "$($_.Exception.Message)"

            IF ($PSBoundParameters['ErrorLog']) {
                $GCIErrors | Out-file -FilePath $ErrorLog -Append -ErrorAction Continue
                $ImportCSVErrors | Out-file -FilePath $ErrorLog -Append -ErrorAction Continue
                Write-Warning -Message "Logged in $ErrorLog"}

        }#CATCH

        IF ($Everything_is_OK){
            
            IF ($PSBoundParameters['Pattern']) {
                Write-Verbose -Message "Applying Pattern: $pattern and Outputting Final Result"
                $info | Select-Object -Property @{Label="IPAddress";Expression={$_.'c-ip'}} -Unique | 
     Where-Object {$_.IPAddress -like $Pattern}
            }ELSE {
                Write-Verbose -Message "Outputting Final Result (No Pattern Specified)"
                $info | 
     Select-Object -Property @{Label="IPAddress";Expression={$_.'c-ip'}} -Unique }
            }

    }#PROCESSBLOCK

    END{Write-Verbose -Message "Script completed"}#END BLOCK
}#function
```


