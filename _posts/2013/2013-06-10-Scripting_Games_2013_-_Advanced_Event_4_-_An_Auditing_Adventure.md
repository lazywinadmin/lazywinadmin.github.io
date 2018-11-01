---
layout: single
title: Scripting Games 2013 - Advanced Event 4 - An Auditing Adventure
excerpt: 
permalink: /2013/06/scripting-games-2013-advanced-event-4.html
tags: 
- 2013 scripting games
- active directory
- adsi
- audit
- function
- html
- module
- powershell
- scripting games
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/PowerShell-Scripting-Games-Logo__304526018__-300x350.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="200" src="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/PowerShell-Scripting-Games-Logo__744805917__-171x200.png" width="171" /></a>This is my solution for the Advanced Event 4 of the Scripting Games 2013.
This event was a bit challenging for me... In the past, I played with Quest Active Directory snap-in to create a bunch of Monitoring tools and some other small automation tasks, but that's about it. (Example<a href="{{ site.url }}/2012/03/powershell-monitor-membership-change-to.html" target="_blank">Monitor Active Directory Groups membership change</a>).

Let's see how I solved it.

<a href="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/report2__1380945527__-600x261.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/report2__1380945527__-600x261.png" /></a>



<b>Instruction</b>
<a href="http://sdrv.ms/13DgigU" target="_blank">Download</a> [Skydrive]

<blockquote class="tr_bq"><i>Dr. Scripto isn't saying he dislikes auditors, but they do seem to show up at the most inconvenient times, and with the oddest requests. So he's tossing this particular auditor request over to you.

This auditor would like a report that shows 20 randomly selected (well, as random as you can get) users from Active Directory. For each user, the auditor wants to see their user name, their department and title, and the last time they logged in. You also need to show the date their password was last changed, and whether or not the account is disabled or locked out. So that's seven pieces of information total. You're to put that information into an HTML-based report ï¬le, and the ï¬le must show the date and time that the report was generated. Please make sure that all of the dates are normal looking, human-readable dates and times.

Auditors being like they are, that "20 randomly" selected number will probably change in the future â€” so you'd better build this as a reusable tool. Have a parameter that speciï¬es the number of users to pull, and default it to 20. Also parameterize the output HTML ï¬lename. Oh, but if the speciï¬ed ï¬lename doesn't end in ".html" or  reject it. Get PowerShell to do as much of that validation as possible â€” Dr. Scripto has to review your code, and doesn't want to read a lot of manual validation script.

A Domain Admin will always run the command (on behalf of the auditor), and the resulting HTML ï¬le will be manually e-mailed to the requesting auditor.</i></blockquote>
<b>Solution</b>
<b>
</b><b>Dr. Scripto Requirements</b>

* Random Active Directory User account(s)

* AD User Object properties :

* UserName

* Department

* Title

* Last time the user logged in

* When the Password was changed

* Is the account disabled

* Is the account locked-out

* HTML Report

* Show the date and time generated

* Human readable Format

* Reusable Tool

* Parameter for the number of users to pull (default should be 20)

* Parameter HTML Filename

* HTM and HTML extension only, other should be rejected.

* Validations

* Assume Domain Admin will always run it

Dr Scripto mentioned a last point about emailing the report to the auditor.This could be part of our Function too, but I decided not to.


<b>Querying the Active Directory</b>These are some of the ways to query AD (from what I know)
* <a href="http://msdn.microsoft.com/en-us/library/windows/desktop/aa772170(v=vs.85).aspx" target="_blank">ADSI</a>(which stands for Active Directory Service Interfaces)

* <a href="http://msdn.microsoft.com/en-us/library/system.directoryservices.aspx" target="_blank">Net Framework</a>(viaSystem.DirectoryServices Namespace)

* <a href="http://technet.microsoft.com/en-us/library/dd378937(v=ws.10).aspx" target="_blank">Active Directory Module</a>

* <a href="http://www.quest.com/powershell/activeroles-server.aspx" rel="" target="_blank">Quest Active Directory Snapin</a>

<u>ADSI</u>
It has clearly an advantage here since it does not require any installation or to be loaded, and It's really super fast. The only problem with this one is the usage. I feel that I need to spend a lot of time to figuring out how the language works...
I found some nice resources here: <a href="http://www.selfadsi.org/user-attributes.htm" target="_blank">SelfADSI</a>

<u>Active Directory ModuleQuest Active Directory Snap-in</u>, youwill need to install and load them prior calling their respective Cmdlets.

<i style="background-color: white;">Finally</i>, I chose to use the Active Directory Module since it is easier to learn and widely used, available on most of Windows Client/Server versions.

<b>Working with Active Directory Module</b>
<u>Installation</u>
The Active Directory module can be installed as part of the RSAT feature from Windows 7 and 2008 R2 server (or by default, with the AD DS or AD LDS server roles.)

<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">Import-Module ServerManager
Add-WindowsFeature RSAT-AD-Tools

```

<u>Loading the module</u>
After the reboot, Load the Active Directory module from Windows Powershell using

<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">Import-Module ActiveDirectory

```

<b>
</b><b>Finding Active Directory User accounts</b>
<b>
</b>
<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;"># Find the command available to manage AD user accounts
Get-Command *user* -Module ActiveDirectory

```


<a href="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/Get-CommandADUser__1296630472__-675x144.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/Get-CommandADUser__1296630472__-675x144.png" /></a>
<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;"># Show the standard output of Get-ADUser
Get-ADUser -filter *

```

<a href="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/Get-ADUser_Filter__1118658123__-542x374.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/Get-ADUser_Filter__1118658123__-542x374.png" /></a>
<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;"># Using Get-Member we see that not all the properties are returned
Get-ADUser -filter * | Get-Member
```

<a href="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/Get-ADUser_Filter_GetMember__2067354034__-466x356.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/Get-ADUser_Filter_GetMember__2067354034__-466x356.png" /></a>

<span style="background-color: white;"><u>Why are we only seeing a few properties here ? :-/</u>

The documentation on Technet about<a href="http://technet.microsoft.com/en-us/library/ee617241.aspx" target="_blank">Get-ADUser</a>specify the following:
<blockquote class="tr_bq"><i>This cmdlet retrieves a default set of user object properties. <span style="background-color: #fff2cc;">To retrieve additional properties use the Properties parameter. For more information about the how to determine the properties for user objects, see the Properties parameter description.</i></blockquote>Properties parameter description:
<blockquote class="tr_bq"><i><b>Properties</b></i></blockquote><blockquote class="tr_bq"><i>Specifies the properties of the output object to retrieve from the server. Use this parameter to retrieve properties that are not included in the default set.</i></blockquote><blockquote class="tr_bq"><i>Specify properties for this parameter as a comma-separated list of names. <span style="background-color: #fff2cc;">To display all of the attributes that are set on the object, specify * (asterisk).</i></blockquote>
<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;"># Using the parameter properties with an asterisk
Get-ADUser -identify admcatfx -properties *
```

<a href="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/Get-ADUser_AllProperties__2074471089__-789x854.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="400" src="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/Get-ADUser_AllProperties__762608611__-370x400.png" width="368" /></a><i>
</i><b>Properties required by Dr Scripto</b>
From the default output, only UserName (via"<span style="font-family: Courier New, Courier, monospace;"><b style="background-color: lime;">SamAccountName</b>") and Disabled/Enabled information (via "<span style="font-family: Courier New, Courier, monospace;"><b style="background-color: lime;">Enabled</b>") can be retrieved. The other required property need to be specified.

<span style="background-color: yellow; font-family: Courier New, Courier, monospace;">Department
<span style="background-color: yellow; font-family: Courier New, Courier, monospace;">Title
<span style="background-color: yellow; font-family: Courier New, Courier, monospace;">LastLogonDate
<span style="background-color: yellow; font-family: Courier New, Courier, monospace;">PasswordLastSet
<span style="background-color: yellow; font-family: Courier New, Courier, monospace;">Enabled
<span style="background-color: yellow; font-family: Courier New, Courier, monospace;">LockedOut

<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">Get-ADUser -Identify xavierc -properties Department,Title,LastLogonDate,passwordlastset,lockedout
```
<i>
</i>
<a href="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/Properties__1360629870__-846x263.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="198" src="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/Properties__1699177367__-640x199.png" width="640" /></a>

<u>Note about LastLogon, LastLogonTimestamp or LastLogonDate property.</u>

<a href="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/Get-ADUser_LastLogon_Properties__291692481__-507x98.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/Get-ADUser_LastLogon_Properties__291692481__-507x98.png" /></a>
<a href="http://aducadmin.com/ad-attributes-last-logon-timestamp/" target="_blank">Article</a> about <span style="font-family: Courier New, Courier, monospace;">LastLogonTimeStamp and<span style="font-family: Courier New, Courier, monospace;"> LastLogon properties :
<blockquote class="tr_bq"><i>The reason why most people want to obtain these values is to find out if a user or computer object can be safely deleted. If you want to know when someone logged on to a computer in your network for the exact last time, search for the last logon value. If you want to know when someone last accessed a resource in your network (accessed webmail or one of your file systems etc), search for the last logon timestamp value. <b>If you want to know when someone last used any network resource, search for the most recent of both values.</b></i></blockquote><b style="font-size: x-large;">
</b><b style="font-size: x-large;">Random User</b>
PowerShell comes with a Cmdlet called <span style="font-family: Courier New, Courier, monospace;">Get-Randomsince the version 2.
Check more information here<a href="http://technet.microsoft.com/en-us/library/ff730929.aspx" target="_blank">Get-Random (TechNet)</a>and <a href="http://blogs.msdn.com/b/powershell/archive/2008/04/27/get-random.aspx" target="_blank">PowerShell Team Blog</a>.

This is exactly what I need!
<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">Get-ADUser -filter * | Get-Random -Count 5 
```


<a href="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/RandomUsers__1738084707__-549x733.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/RandomUsers__1738084707__-549x733.png" /></a>

<b style="font-size: x-large;">Building the function around the command</b>

<u>Function Format</u>
I like to build my function that way.
<span style="font-family: 'Times New Roman';">It got everything I need: Help, BEGIN/PROCESS/BLOCK and Error Handling.


<a href="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/function_sample__2440202__-418x637.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/function_sample__2440202__-418x637.png" /></a>```
<u style="font-family: 'Times New Roman'; white-space: normal;">Error Handling</u>
```
```
<u style="font-family: 'Times New Roman'; white-space: normal;">
</u>
```
<a href="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/function_explained__1325023819__-745x587.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/function_explained__1325023819__-745x587.png" /></a>
Help about <a href="http://technet.microsoft.com/en-us/library/hh847766.aspx" target="_blank">Throw</a> and <a href="http://technet.microsoft.com/en-us/library/hh847793.aspx" target="_blank">Try/Catch/Finally</a>
Article about Error Handling<a href="http://www.vexasoft.com/blogs/powershell/7255220-powershell-tutorial-try-catch-finally-and-error-handling-in-powershell" target="_blank">here</a>.
<b style="font-size: x-large;">
</b>
<b>What I missed ?</b>

<u>Check if Active Directory module is installed</u>, I should add the following line
<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">#Requires -Modules ActiveDirectory
```
<u>
</u><u>Out-File Error Handling</u>
I got some comments on the fact that I did not put Error Handling on the Out-File Cmdlet, which is part of the error handling itself in my script...<span style="background-color: yellow;"><u>see below the part Highlighted</u>


```
TRY{...}
```

```
CATCH{
    
 # ERROR HANDLING
 $Everything_is_OK = $false
 Write-Warning -Message "Wow! Something Went wrong !"
 Write-Warning -Message "$($_.Exception.Message)"

 IF ($PSBoundParameters['ErrorLog']) {
  $GetADUserError | <span style="background-color: yellow;">Out-file -FilePath $ErrorLog -Append -ErrorAction Continue
  $GetRandomError | <span style="background-color: yellow;">Out-file -FilePath $ErrorLog -Append -ErrorAction Continue
  Write-Warning -Message "Logged in $ErrorLog"}

}#CATCH
```

I could add an extra layer...I guess...<span style="background-color: yellow;"><u>see below the part Highlighted</u>


```
TRY{...}
```

```
CATCH{

 # ERROR HANDLING
 $Everything_is_OK = $false
 Write-Warning -Message "Wow! Something Went wrong !"
 Write-Warning -Message "$($_.Exception.Message)"

 IF ($PSBoundParameters['ErrorLog']) {
  <span style="background-color: yellow; color: blue;">TRY<span style="background-color: yellow;">{
   $GetADUserError | Out-file -FilePath $ErrorLog -Append -ErrorAction Continue
   $GetRandomError | Out-file -FilePath $ErrorLog -Append -ErrorAction Continue
   Write-Warning -Message "Logged in $ErrorLog"
   <span style="background-color: yellow;">}
  <span style="background-color: yellow; color: blue;">CATCH<span style="background-color: yellow;">{
   <span style="background-color: yellow;">Write-Warning -Message "Couldn't write in $ErrorLog"
  <span style="background-color: yellow;">}#CATCH ErrorLog File
```

```
 }#IF PSBoundParameters ErrorLog
}#CATCH
```


<b>Final Output</b>
<b>
</b>
<a href="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/report_cmd__89472155__-372x32.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/report_cmd__89472155__-372x32.png" /></a><a href="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/report__1967434758__-604x287.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130610_Scripting_Games_2013_-_Advanced_Event_4_-_An_Auditing_Adventure/report__1967434758__-604x287.png" /></a>

<b>Script</b>

<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">#requires -Version 3

function Get-ADUserAudit {
<#
.SYNOPSIS
   The function Get-ADUserAudit reports random user account(s) from the current Active Directory to a HTML File.

.DESCRIPTION
   The function Get-ADUserAudit reports random user account(s) from the current Active Directory to a HTML File.
   Properties returned are SamAccountName (Renamed 'UserName' in the final output), Department, Title, 
   PasswordLastSet (Date Value reformatted in the final output), LockedOut, 
   lastlogonDate (Date Value reformatted in the final output) and Enabled (Renamed to 'Disabled' in the final report
   and reverse the output, this is to match the instruction requirements of Dr. Scripto)
   
   PowerShell version 3 is required to take advantage of PSDefaultValue.
   Function tested against a Domain Windows Server 2012 functional level.

.PARAMETER Count
   Specifies the number of user account(s) to return in the report
   Default is 20.

.PARAMETER HTMLfile
   Specifies the full path of the HTML Report file.
   The file must finish by the HTML or HTM extention.

.PARAMETER SearchBase
   Specifies the SearchBase, DistinguishedName of the Organizational Unit root where the search will start.
   Can be useful for large Active Directory Database and if your Auditors want a specific OU.

.PARAMETER ResultSetSize
   Specifies the maximum number of users to return for an Active Directory Domain Services query.
   Can be useful for large Active Directory Database.

.PARAMETER Credential
   Specifies the credential if different from the current user

.PARAMETER ErrorLog
   Specifies the full path of the Error log file.

.EXAMPLE
   Get-ADUserAudit -HTMLfile Report.htm

   This example report information about random user account(s) from the Active Directory. 
   By Default, 20 random user account(s) will be returned.
   The report will be Saved in the current directory.

.EXAMPLE
   Get-ADUserAudit -HTMLfile D:\Report.htm -SearchBase "OU=TEST,DC=FX,DC=lab"

   This example report information about random user account(s) from the Active Directory,
   from the Organizational Unit: TEST (Distinguished name: "OU=TEST,DC=FX,DC=lab").
   This will report also any user account(s) in the Child Organizational Units.
   By Default, 20 random user account(s) will be returned.
   In this example the report is saved under d:\report.htm using the parameter HTMLfile

.EXAMPLE
   Get-ADUserAudit -HTMLfile D:\Report.htm -SearchBase "OU=TEST,DC=FX,DC=lab" -ErrorLog ErrorsAudit.log

   This example report information about random user account(s) from the Active Directory,
   from the Organizational Unit: TEST (Distinguished name: "OU=TEST,DC=FX,DC=lab").
   This will report also any user account(s) in the Child Organizational Units.
   By Default, 20 random user account(s) will be returned.
   In this example the report is saved under d:\report.htm using the parameter HTMLfile

   Errors will be logged in ErrorsAudit.log in the current directory.

.EXAMPLE
   Get-ADUserAudit -count 10 -HTMLfile D:\Report.htm -ResultSetSize 30

   This example report information about 10 random user account(s) from the Active Directory,
   Note that the parameter ResultSetSize will limit the query to 30 user accounts.
   In this example the report is saved under d:\report.htm using the parameter HTMLfile.

.INPUTS
   String
   Int32
   PSCredential

.OUTPUTS
   HTML/HTM File

.NOTES
   Scripting Games 2013 - Advanced Event #4
#>
    
    [CmdletBinding()]

    PARAM(

        [PSDefaultValue(Help='Number of random Active Directory User Account(s) to output')]
        [Int]$Count = 20,

        [Parameter(Mandatory,HelpMessage = "FullPath to HTML file (must end by .HTML or .HTM else it will be rejected)")]
        [PSDefaultValue(Help='FullPath to HTML file. (Extension must be HTML or HTM')]
        [Alias("SaveAs")]
        [ValidateScript({($_ -like "*.html") -or ($_ -like "*.htm")} )]
        [String]$HTMLFile,

        [PSDefaultValue(Help='Enter the Active Directory DistinguishedName SearchBase of the Organizational Unit')] 
        [Alias("DN","DistinguishedName")] 
        [String]$SearchBase,

        [PSDefaultValue(Help='Specifies the maximum number of users to return for an Active Directory Domain Services query')] 
        [Alias("Max")] 
        [Int]$ResultSetSize,

        [Alias("RunAs")]
        [System.Management.Automation.Credential()]$Credential = [System.Management.Automation.PSCredential]::Empty,

        [PSDefaultValue(Help='FullPath to Error log file.')]
        [ValidateScript({Test-path -Path $_ -IsValid})]
        [String]$ErrorLog

    )#Param


    BEGIN{
        # Load the Active Directory module if not already loaded
        if (-not(Get-Module -Name ActiveDirectory)){
            Write-Verbose -Message "Loading ActiveDirectory Module..."
            Import-Module -Name ActiveDirectory -Force}
    }#BEGIN BLOCK
    

    PROCESS{

        TRY{
            $Everything_is_OK = $true
            
            # Get-AdUser Splatting Parameters
            $ADUserParams = @{
                Filter     = "*"
                Properties = "SamAccountName","Department","Title","PasswordLastSet","LockedOut","lastlogonDate","Enabled"
                ErrorAction= "Stop"
                ErrorVariable="GetADUserError"
            }

            # Get-AdUser Splatting Parameters - If Specified by the user, Adding the Credential to $ADUserParams
            IF ($PSBoundParameters['Credential']) {
               $ADUserParams.credential = $Credential}

            # Get-AdUser Splatting Parameters - If Specified by the user, Adding the SearchBase to $ADUserParams
            IF ($PSBoundParameters['SearchBase']) {
               $ADUserParams.SearchBase = $SearchBase}

            # Get-AdUser Splatting Parameters - If Specified by the user, Adding the ResultSetSize to $ADUserParams
            IF ($PSBoundParameters['ResultSetSize']) {
               $ADUserParams.ResultSetSize = $ResultSetSize}

            # Querying AD Users
            Write-Verbose -Message "Querying Active Directory Users and getting $Count random accounts"
            $RandomUsers = Get-ADUser @ADUserParams | Get-Random -Count $Count -ErrorAction Stop -ErrorVariable GetRandomError

        }#TRY



        CATCH{
            
            # ERROR HANDLING
            $Everything_is_OK = $false
            Write-Warning -Message "Wow! Something Went wrong !"
            Write-Warning -Message "$($_.Exception.Message)"

            IF ($PSBoundParameters['ErrorLog']) {
                $GetADUserError | Out-file -FilePath $ErrorLog -Append -ErrorAction Continue
                $GetRandomError | Out-file -FilePath $ErrorLog -Append -ErrorAction Continue
                Write-Warning -Message "Logged in $ErrorLog"}

        }#CATCH



        IF ($Everything_is_OK){

            # FORMATTING DATA
            Write-Verbose -Message "Formatting the data..."
            $report = $RandomUsers | Select-Object -Property @{Label="UserName";Expression={$_.SamAccountName}},
                    Department,
                    Title,
                    @{Label="LastLogonDate";Expression={'{0:yyyy/MM/dd H:mm:ss}' -f ($_.LastLogonDate)}},
                    @{Label="PasswordLastSet";Expression={'{0:yyyy/MM/dd H:mm:ss}' -f ($_.PasswordLastSet)}},
                    @{Label="Disabled";Expression={if($_.Enabled -eq $true){$false}else{$true}}},
                    LockedOut | 
                ConvertTo-Html -Fragment

            # HTML Style (using Here String)
            Write-Verbose -Message "Adding some HTML style..."
            $style = @"
<style>
body {
    color:#333333;
    font-family:Calibri,Tahoma;
    font-size: 10pt;
}
h1 {
    text-align:center;
}
h2 {
    border-top:1px solid #666666;
}

th {
    font-weight:bold;
    color:#eeeeee;
    background-color:#333333;
}
.odd  { background-color:#ffffff; }
.even { background-color:#dddddd; }
</style>
"@

            # HTML REPORT - Splatting information, inserting the HTML $Style and $report data.
            $HTMLParams = @{
                Head  = "<title>Active Directory Users Audit</title><h2>Random $Count Active Directory User Account(s)</h2>$style"
                As    = "Table"
                PostContent = "$Report<br><hr><br>Generated by $env:UserDomain\$env:UserName on $('{0:yyyy/MM/dd H:mm:ss}' -f (Get-Date))"
            }
            
            # GENERATING FINAL REPORT
            Write-Verbose -Message "Generating our final HTML report and outputting to: $HTMLFile"
            ConvertTo-Html @htmlparams | Out-File -FilePath $HTMLFile

        }#IF $Everything_is_OK

    }#PROCESS BLOCK
    

    END{
        Write-Verbose -Message "Script Completed!"
    }#END BLOCK

}# Function Get-ADUserAudit
```



