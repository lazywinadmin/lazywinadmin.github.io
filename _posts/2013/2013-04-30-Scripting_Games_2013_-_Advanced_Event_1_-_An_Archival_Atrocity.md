---
layout: single
title: Scripting Games 2013 - Advanced Event 1 - An Archival Atrocity
excerpt: 
permalink: /2013/04/scripting-games-2013-advanced-event-1.html
tags: 
- 2013 scripting games
- function
- powershell 3.0
- powershell summit 2013
- psh2013
- scripting games
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20130430_Scripting_Games_2013_-_Advanced_Event_1_-_An_Archival_Atrocity/PowerShell-Scripting-Games-Logo__1502568632__-300x350.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="200" src="{{ site.url }}/images/2013/20130430_Scripting_Games_2013_-_Advanced_Event_1_-_An_Archival_Atrocity/PowerShell-Scripting-Games-Logo__1155158921__-171x200.png" width="171" /></a>Last week I was one of the lucky PowerShell Summit attendees and had the chance to assist to the official launch of the Scripting Games 2013 !! (with a special video created by <a href="http://www.youtube.com/watch?v=H-b27safDVw&amp;feature=player_embedded" target="_blank">Sean</a> ;-)

Apart from the PowerShell stars like Ed Wilson, Don Jones, Bruce Payette, Alan Renouf, Lee Holmes, Richard Siddaway, Jeffery Snover.... I met some awesome people there and It was really cool to talk about our passion for PowerShell, How this amazing tool is saving our life each days!
<a href="{{ site.url }}/images/2013/20130430_Scripting_Games_2013_-_Advanced_Event_1_-_An_Archival_Atrocity/IMG_20130422_084939__1277293287__-1600x1200.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="300" src="{{ site.url }}/images/2013/20130430_Scripting_Games_2013_-_Advanced_Event_1_-_An_Archival_Atrocity/IMG_20130422_084939__1808215418__-400x300.jpg" width="400" /></a>
Scripting Games 2013 - Advanced Event #1 - An Archival Atrocity

For the first time, I decided this year to participate to the  Scripting Games 2013 organize and hosted by the PowerShell.org team.

I chose the Advanced Track and here is the first script I submitted yesterday.

Feel free to comment and send me your critics.



Instruction

<a href="https://skydrive.live.com/redir?resid=60886DE0176E604A!9966&amp;authkey=!ABapUFHwm9UPuyQ" target="_blank">Download the instruction here (skydrive)</a><u><b><a href="https://skydrive.live.com/redir?resid=60886DE0176E604A!9966&amp;authkey=!ABapUFHwm9UPuyQ" target="_blank"> </a></b></u>
<blockquote class="tr_bq"><i>Dr.Scripto is in a tizzy! It seems that someone has allowed a series of application log files to pile up for around two years, and they're starting to put the pinch on free disk space on a server. Your job is to help get the old files off to a new location.

Actually, this happened last week, too. You might as well create a tool to do the archiving.
The current sets of log files are located in C:\Application\Log. There are three applications that write logs here, and each uses its own subfolder.

For example:
* C:\Application\Log\App1,
* C:\Application\Log\OtherApp,
* C:\Application\Log\ThisAppAlso.

Within those subfolders, the filenames are random GUIDs with a .LOG filename extension.
Once created on disk, the files are never touched again by the applications.

Your goal is to grab all of the files older than 90 days and move them to \\NASServer\Archives - although that path will change from time to time. 

You need to maintain the subfolder structure, so that files from C:\Application\Log\App1 get moved to\\NASServer\Archives\App1, and so forth.

Make those paths parameters, so that Dr.Scripto can just run this tool with whatever paths are appropriate at the time. The 90-day period should be a parameter too.

You want to ensure that any errors that happen during the move are clearly displayed to whoever is running your command. If no errors occur, your command doesn't need to display any output - "no news is good news."</i></blockquote>
VOTE<b> :-)</b><u><b></b></u>
Anybody can vote even if you do not participate to the Scripting Games<u><b>
</b></u>
<a href="http://scriptinggames.org/entrylist.php?entryid=295" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;" target="_blank"><img border="0" src="{{ site.url }}/images/2013/20130430_Scripting_Games_2013_-_Advanced_Event_1_-_An_Archival_Atrocity/vote__1420710892__-120x116.png" /></a>







Annotations

* <b>Line 75</b> - Adding Support to Verbose/Debug...<b></b>

* <b>Line 76</b> - Adding Support to WhatIf/Confirm parameters

* <b>Line 85 and 92</b> - Adding Validation to verify that the path specified by the user  exist. I have to admit I could have gone a bit deeper on that :-/<b></b>

* <b>Line 110</b> - Bad Bad Baaaaad... I used the back tick! I know... I should had <a href="http://technet.microsoft.com/en-us/magazine/gg675931.aspx" target="_blank">use splatting</a> instead... I'm learning!

* <b>Line 125</b> - Here I use a small shortcut to get the parent folder name for the  current file (inside the foreach loop), then verify if this folder exist  in the Archive destination folder at the <b>line 131</b>

Script


<pre class="brush: powershell;collapse: true;highlight:[75, 76, 85, 92, 110, 125]; ruler: true; first-line: 1;gutter: true;">function Move-Log {
<#
 .SYNOPSIS
  Move logs between two specified locations.

 .DESCRIPTION
  Move logs between two specified locations
         Optionaly, you can specify the age in day(s) of the file(s) that need be 
  moved (default = 90) and their File Extention (default = *.log)
        
         If directories are present in the path, those will be re-created
  in the destination path.

 .PARAMETER  Path
  Location path where the logs are located. Default value is
  current folder (.\)

 .PARAMETER  Destination
  Location path where the logs will be moved.
 
 .PARAMETER  Type
  Type of File Extention that need to be moved. Default value is *.log

 .PARAMETER  OlderThan
  Age in Day(s) of the file(s) that need to be moved. Default value is 90.

 .EXAMPLE
  PS C:\> Move-Log -Path "c:\Applications" -Destination "\\Server\Share"
  
  This example shows how to call the Move-Log function with 
  Path and Destination parameters to move old logs from the local 
  directory C:\Applications to the remote share \\server\share.

 .EXAMPLE
  PS C:\> Move-Log -Path "c:\Applications" -Destination "x:\Backup\Apps\Archives"
  
  This example shows how to call the Move-Log function with Path and 
  Destination parameters to move old logs from C:\Applications to 
  x:\Backup\Apps\Archives

 .EXAMPLE
  PS C:\> Get-Location | Move-Log -Destination "\\Server\Share"

  This example shows how to call the Move-Log function with Path and
  Destination parameters, using the pipeline input for the Path parameter.

 .EXAMPLE
  PS C:\> "C:\Applications","D:\Applications" | Move-Log -Destination "\\Server\Share"

  This example shows how to call the Move-Log function with Path and
  Destination parameters, using the pipeline input for the Path parameter.

 .EXAMPLE
  PS C:\> Move-Log -Path "C:\Applications" -Destination "\\Server\Share" -OlderThan 90 -type *.log
  
  This example shows how to call the Move-Log function with Path, 
  Destination, OlderThan and type parameters. This will move logs with the
  extention *.log older than 90 days from c:\Application to the remote 
  share \\server\share.

 .INPUTS
  System.String

 .OUTPUTS
  None, only if Errors occure

 .NOTES
  NAME    : Move-Log.ps1
  AUTHOR  : Francois-Xavier Cat
  TWITTER : @lazywinadmin
  EMAIL   : fxcat@lazywinadmin.com
  WWW     : www.lazywinadmin.com
#>

 [CmdletBinding(
        SupportsShouldProcess=$true,
        ConfirmImpact="Medium")]

 param(

 [Parameter(Mandatory=$true,
   Position = 0,
   ValueFromPipeline=$true,
   HelpMessage="Enter the Path where your Application folders are located. Default is the current location")]
        [ValidateScript({Test-Path $_})]
        [alias("Source")]
  [System.String]
  $Path = ".\",
    
        [Parameter(Mandatory=$true,
          HelpMessage="Enter the Path where your logs will be moved")]
        [ValidateScript({Test-Path $_})]
        [string]
        $Destination,

        [Parameter(HelpMessage="Enter the file(s) extentions. Default value is `"*.log`"")]
        [string[]]
        $Type = "*.log",

        [Parameter(HelpMessage="Enter the age of the file(s) that need to be archive. Default value is 90 days")]
        [Int]
        $OlderThan = 90

 )

 PROCESS {
  try {
            # Get the Logs
            Write-Verbose "PROCESS - Looking for Logs older than $OlderThan days..."
            $Files= Get-ChildItem `
                            -Path $Path `
                            -include $Type `
                            -Recurse `
                            -File |
                        Where-Object {$_.LastWriteTime -lt (get-date).AddDays(-$OlderThan) }
            
            # If Logs are found
            if ($Files){

                foreach ($File in $Files){

     Write-Verbose "PROCESS - Logs found!"

                    # Get the Name of the Parent Folder
                    $ParentFolder = Split-Path -Path (Split-Path $File -Parent) -Leaf
                    
                    # Build the Destination Path for the current $file
                    $DestinationFolder = Join-Path -Path $Destination -ChildPath $ParentFolder

                    # Verify this Folder Name exist in the Destination Path
                    if (-not(Test-Path -Path $DestinationFolder)){
      
                        # Creating the Folder in the $destination if does not exist
                        Write-Verbose -Message "PROCESS - Creating folder in the Destination path: $ParentFolder"
                        New-Item -Name $ParentFolder -ItemType directory -Path $Destination | Out-Null

                    }#if

                    # Move the file
                    Write-Verbose -Message "PROCESS - Moving $File to $DestinationFolder"
                    Move-Item -Path $File.FullName -Destination $DestinationFolder -Force
                
                }#foreach ($file in $files)

            }#if($files)
            
   # If no old logs are found, do the following
   else{
                Write-Verbose -Message "PROCESS - No Logs to move"
                }#else
  }#try

  catch {
            Throw "An Error occured during the PROCESS Block"
  }#catch

 }#Process

}#function Move-Log


```

Thanks for reading! Feel free to contact me or leave me a comment below!

Twitter: @lazywinadmin
Email: fxcat@lazywinadmin.com
