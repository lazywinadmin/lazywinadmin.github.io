---
layout: single
title: PowerShell - Report the AD Missing Subnets from the NETLOGON.log
excerpt: 
permalink: /2013/10/powershell-report-ad-missing-subnets.html
tags: 
- .net
- active directory
- automation
- log
- missing subnet
- netlogon
- powershell
- regex
- report
- subnet
published: true
comments: true
toc: true
toc_sticky: true
---
Today I will share with you a script that report the Missing Subnets detected in the NetLogon file(s) of your Active Directory Domain Controller(s).

**Update** See [my Github repository](https://github.com/lazywinadmin/PowerShell/blob/master/AD-SITE-Find_Missing_Subnets/AD-Find_missing_subnets_in_ActiveDirectory.ps1) for the most recent version
{: .notice--info}

# Missing Subnets

When a computer is joined to a domain It knows for sure of which AD domain it is a member. However once the computer is joined to the domain, It may or may not know which AD site it belongs to. Even if it thinks it knows the AD site, it may not even be in the correct AD site (e.g. because it was moved, AD site was renamed, Subnet not declared, Subnet was removed from a site and add to another...etc.).

## Fixing this issue

In the Active Directory Sites and Services console, your need to associate create all of your subnets inthese subnets with the appropriate site(s). It is important to note that with Windows Server 2012 R2 some new cmdlets are available with the Active Directory module to manage the Site subnets:

* [Get-ADReplicationSubnet](http://technet.microsoft.com/en-us/library/hh852246.aspx)
* [New-ADReplicationSubnet](http://technet.microsoft.com/en-us/library/hh852206.aspx)
* [Set-ADReplicationSubnet](http://technet.microsoft.com/en-us/library/hh852195.aspx)
* [Remove-ADReplicationSubnet](http://technet.microsoft.com/en-us/library/hh852303.aspx)

# NETLOGON.log

If some subnets are not declared in your Active Directory and/or not assigned to Site, you might start to see those kind of message in your NetLogon.log file.

Path of the NETLOGON.log file on a Domain Controller:
<b><i style="background-color: yellow;">\\<dcname>\admin$\debug\netlogon.log

<u>Missing subnets errors in NetLogon.log</u>

```
10/02 10:02:32 FX: NO_CLIENT_SITE: WORKSTATION01 10.126.76.146
10/02 10:02:32 FX: NO_CLIENT_SITE: WORKSTATION02 172.16.32.16
10/02 10:03:07 FX: NO_CLIENT_SITE: WORKSTATION03 1.2.3.4

```

A NetLogon.log exists on all the Domain Controllers of your domain, so you need to check every single of them to have the full list of subnets to add.

# PowerShell Reporting

So I created a PowerShell script to handle this task and report all the Missing subnets automatically (every month in my case). Here is a screenshot of the final report. In my opinion, this does not need to run everyday or every week.

![image-center](http://3.bp.blogspot.com/-EPI7odaA76w/UmNYbF7QVKI/AAAAAAABeLw/Ug9v4f60law/s1600/2013-10-15+12-33-20+AM.png){: .align-center}

# How the script work

![image-center](/images/2013/20131020_PowerShell_-_Report_the_AD_Missing_Subnets_from_the_NETLOGON.log/AD-Site-Report_missing_subnets__158952238__-1600x1380.png){: .align-center}

1. Get the list of Domain Controllers in the Domain using .NET
1. Get the Last 200 Lines from the NETLOGON.log on each Domain controllers (200 is default)
1. Process Logs and Compile in one list and keep one entry per IP
1. Export the AD Missing Subnet to a CSV file locally
1. Exported in: $scriptPathOutput\$DateFormat-AD-SITE-MissingSubnets.csv
1. Send an Email Report.

<u>The report will contains:</u>

* One table with the Missings Subnets from all the Domain Controllers
* The other error(s) found in the last 200 lines of each NETLOGON.log on each Domain Controllers(200 is default)

![image-center](http://4.bp.blogspot.com/-Zo09Rn47Uzw/UmSHnbNj_2I/AAAAAAABeNU/AqdNqcD2i-U/s1600/2013-10-20+9-36-27+PM.png){: .align-center}

# Requirement

1. A Task scheduler to execute the script every x weeks
1. Permission to Read `\\DC\admin$`, a basic account without specific rights will do it
1. Permission to write locally in the Output folder ($ScriptPath\Output)

# Running the script

```powershell
PS C:\User\Francois-Xavier> ./TOOL-AD-SITE-Report_Missing_Subnets.ps1 -Verbose -EmailServer mail.fx.lab -EmailTo "catfx@fx.lab" -EmailFrom Reporting@fx.lab -EmailSubject "AD - MIssing Subnets"
```

```text
VERBOSE: Domain: FX.LAB
VERBOSE: Getting all Domain Controllers from FX.LAB ...
VERBOSE: Gathering Logs from Domain controllers
VERBOSE: Gathering Logs from DC: LAB1DC01.FX.LAB
VERBOSE: LAB1DC01.FX.LAB - NETLOGON.LOG - Copying...
VERBOSE: LAB1DC01.FX.LAB - NETLOGON.LOG - Copied
VERBOSE: Importing exported data to a CSV format...
VERBOSE: Missing Subnet(s) Found: 6
VERBOSE: Other Error(s) Found: 11
VERBOSE: Building the HTML Report
VERBOSE: CSV file (backup) - Exporting...
VERBOSE: CSV file (backup) - Exported to: 20131010_031517-AD-SITE-MissingSubnets.csv
VERBOSE: Preparing the Email
VERBOSE: Email Sent!
VERBOSE: Cleanup txt and log files...
VERBOSE: Script Completed
```

This will generate the report inserted at the beginning of this article.

## Validating the Email Addresses

```powershell
[Parameter(Mandatory=$true,HelpMessage="You must specify the Sender Email Address")]
[ValidatePattern("[a-z0-9!#\$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#\$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]
[String]$EmailFrom,
[Parameter(Mandatory=$true,HelpMessage="You must specify the Destination Email Address")]
[ValidatePattern("[a-z0-9!#\$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#\$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]
[String[]]$EmailTo,
```

For the email addresses validation, at first I wanted to use the `[mailaddress]` class, but this only work since PowerShell v3.0 so I decided to add the previous regex so it is supported on PowerShell v2.0 too.

Note that I also use the `[ValidatePattern]` attribute declaration, which is super useful! Jeffery Hicks wrote [a great article](http://jdhitsolutions.com/blog/2012/04/powershell-scripting-with-validatepattern) about it last year.

## Gathering the info from Netlogon.log files

```powershell
# NETLOGON.LOG path for the current Domain Controller
$path = "\\$DCName\admin`$\debug\netlogon.log"

# Testing the $path
IF ((Test-Path -Path $path) -and ((Get-Item -Path $path).Length -ne $null))
{
    IF ((Get-Content -Path $path | Measure-Object -Line).lines -gt 0){
        #Copy the NETLOGON.log locally for the current DC
        Write-Verbose -Message "$DCName - NETLOGON.LOG - Copying..."
        Copy-Item -Path $path -Destination $ScriptPathOutput\$($dc.Name)-$DateFormat-netlogon.log 
        
        #Export the $LogsLines last lines of the NETLOGON.log and send it to a file
        ((Get-Content -Path $ScriptPathOutput\$DCName-$DateFormat-netlogon.log -ErrorAction Continue)[$LogsLines .. -1]) | 
            Out-File -FilePath "$ScriptPathOutput\$DCName.txt" -ErrorAction 'Continue' -ErrorVariable ErrorOutFileNetLogon
        Write-Verbose -Message "$DCName - NETLOGON.LOG - Copied"
    }#IF
    ELSE {Write-Verbose -Message "File Empty"}
}ELSE{Write-Warning -Message "$DCName NETLOGON.log is not reachable"}
```

## Combining the logs

```powershell
# Combine all the TXT file in one
$FilesToCombine = Get-Content -Path $ScriptPathOutput\*.txt -ErrorAction SilentlyContinue
if ($FilesToCombine){
    $FilesToCombine| Out-File -FilePath $ScriptPathOutput\$dateformat-All_Export.txt

    # Convert the TXT file to a CSV format
    Write-Verbose -Message "Importing exported data to a CSV format..."
    $importString = Import-Csv -Path $scriptpathOutput\$dateformat-All_Export.txt -Delimiter ' ' -Header Date,Time,Domain,Error,Name,IPAddress
    
    #  Get Only the entries for the Missing Subnets
    $MissingSubnets = $importString | Where-Object {$_.Error -like "*NO_CLIENT_SITE*"}
    Write-Verbose -Message "Missing Subnet(s) Found: $($MissingSubnets.count)"
    #  Get the other errors from the log
    $OtherErrors    = Get-Content $scriptpathOutput\$dateformat-All_Export.txt | Where-Object {$_ -notlike "*NO_CLIENT_SITE*"} | Sort-Object -Unique
    Write-Verbose -Message "Other Error(s) Found: $($OtherErrors.count)"
```

## Comment based Help

```powershell
PS C:\LazyWinAdmin> Get-help .\AD-Find_missing_subnets_in_ActiveDirectory.ps1 -full
```

```text
NAME
    C:\LazyWinAdmin\AD-Find_missing_subnets_in_ActiveDirectory_20131020.ps1

SYNOPSIS
    This script goal is to get all the missing subnets from the
    NETLOGON.LOG file from each Domain Controllers in the Active Directory.
    It will copy all the NETLOGON.LOG locally and parse them.

SYNTAX
    C:\LazyWinAdmin\AD-Find_missing_subnets_in_ActiveDirectory_20131020.ps1
    [-EmailFrom] <String> [-EmailTo] <String[]> [-EmailServer]<String>
    [[-EmailSubject] <String>] [[-LogsLines] <Int32>] [<CommonParameters>]


DESCRIPTION
    This script goal is to get all the missing subnets from the
    NETLOGON.LOG file from each Domain Controllers in the Active Directory.
    It will copy all the NETLOGON.LOG locally and parse them.


PARAMETERS
    -EmailFrom <String>
        Specifies the Email Address of the Sender

        Required?                    true
        Position?                    1
        Default value
        Accept pipeline input?       false
        Accept wildcard characters?  false

    -EmailTo <String[]>
        Specifies the Email Address(es) of the Destination

        Required?                    true
        Position?                    2
        Default value
        Accept pipeline input?       false
        Accept wildcard characters?  false

    -EmailServer <String>
        Specifies the Email Server IPAddress/FQDN

        Required?                    true
        Position?                    3
        Default value
        Accept pipeline input?       false
        Accept wildcard characters?  false

    -EmailSubject <String>
        Specifies the Email Subject

        Required?                    false
        Position?                    4
        Default value                Report - Active Directory - SITE - Missing Subnets
        Accept pipeline input?       false
        Accept wildcard characters?  false

    -LogsLines <Int32>
        Specifies the number of Lines to check in the NETLOGON.LOG files
        Default is '-200'.
        This number is negative, so the script check the last x lines (newest entry).
        If you put a positive number it will check the first lines (oldest entry).

        Required?                    false
        Position?                    5
        Default value                -200
        Accept pipeline input?       false
        Accept wildcard characters?  false

    <CommonParameters>
        This cmdlet supports the common parameters: Verbose, Debug,
        ErrorAction, ErrorVariable, WarningAction, WarningVariable,
        OutBuffer, PipelineVariable, and OutVariable. For more information, see
        about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

INPUTS

OUTPUTS

NOTES


        NAME:    TOOL-AD-SITE-Report_Missing_Subnets.ps1
        AUTHOR:  Francois-Xavier CAT
        DATE:    2011.10.11
        EMAIL:   info@lazywinadmin.com

        REQUIREMENTS:
        -A Task scheduler to execute the script every x weeks
        -Permission to Read \\DC\admin$, a basic account without specific rights will do it
        -Permission to write locally in the Output folder ($ScriptPath\Output)

        VERSION HISTORY:
        1.0 2011.10.11
            Initial Version.
        1.1 2011.11.12
            FIX System.OutOfMemoryException Error when too many logs to process
                Now the script will copy the file locally.
        1.2 2012.09.22
            UPDATE Code to report via CSV/Email
        1.3 2013.10.14
            UPDATE the syntax of the script
        1.4 2013.10.20
            ADD ValidatePattern on Email parameters, instead of [mailaddress] which is only supported on PS v3

    -------------------------- EXAMPLE 1 --------------------------

    C:\PS>./TOOL-AD-SITE-Report_Missing_Subnets.ps1 -Verbose -EmailServer mail.fx.local -EmailTo
    "Contact1@fx.local","Contact2@fx.local" -EmailFrom ADREPORT@fx.local -EmailSubject "Report - AD - Missing Subnets"


    This example will query all the Domain Controllers in the Active Directory and get the last 200 lines (Default) of
    each NETLOGON.log files. It will then send an email report to Contact1@fx.local and Contact2@fx.local.






RELATED LINKS
```

# Download

* [Technet](http://gallery.technet.microsoft.com/Report-Active-Directory-008cd9eb)
* [Github Repository (Most updated version)](https://github.com/lazywinadmin/PowerShell/blob/master/AD-SITE-Find_Missing_Subnets/AD-Find_missing_subnets_in_ActiveDirectory.ps1)

# Resources

* [TechNet -Get-ADReplicationSubnet (Windows 8.1/W2012R2)](http://technet.microsoft.com/en-us/library/hh852246.aspx)
* [TechNet - New-ADReplicationSubnet (Windows 8.1/W2012R2)](http://technet.microsoft.com/en-us/library/hh852206.aspx)
* [TechNet - Set-ADReplicationSubnet (Windows 8.1/W2012R2)](http://technet.microsoft.com/en-us/library/hh852195.aspx)
* [TechNet - Remove-ADReplicationSubnet (Windows 8.1/W2012R2)](http://technet.microsoft.com/en-us/library/hh852303.aspx)
* [Using Catch-All Subnets in Active Directory](http://technet.microsoft.com/en-us/magazine/2009.06.subnets.aspx)
* [DC Locator – What Does "NO_CLIENT_SITE" Mean In Netlogon.log](http://jorgequestforknowledge.wordpress.com/2011/01/27/dc-locator-what-does-quot-no-client-site-quot-mean-in-netlogon-log/)
* [Ask the Directory Services Team - Sites Sites Everywhere...](http://blogs.technet.com/b/askds/archive/2011/04/29/sites-sites-everywhere.aspx)
* [How Domain Controllers Are Located in Windows XP](http://support.microsoft.com/kb/314861/en-us)
* [Enabling Clients to Locate the Next Closest Domain Controller (W2008/W2008R2/W2012)](http://technet.microsoft.com/en-us/library/cc733142(v=ws.10).aspx)
