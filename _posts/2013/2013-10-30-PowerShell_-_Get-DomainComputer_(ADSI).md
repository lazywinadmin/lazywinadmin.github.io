---
layout: single
title: PowerShell - Get-DomainComputer (ADSI)
excerpt:
permalink: /2013/10/powershell-get-domaincomputer-adsi.html
tags:
- active directory
- adsi
- computer object
- credentials
- powershell
published: true
comments: true
toc: true
toc_label: "Table of content"
toc_sticky: true
toc_icon: "terminal"
classes: wide
---

**Note:** FYI, more ADSI functions are available in the ADSIPS PowerShell module here: https://github.com/lazywinadmin/adsips
{: .notice--info}

<a href="{{ site.url }}/images/2013/20131030_PowerShell_-_Get-DomainComputer_(ADSI)/Config-Tools__1125592699__-128x128.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20131030_PowerShell_-_Get-DomainComputer_(ADSI)/Config-Tools__1125592699__-128x128.png" /></a>
The following function use ADSI to query Computer objects from the Active Directory. Optionally an alternate credentials and/or a different domain can be specified.

Once in a while, everyone "enjoy" doing Auditing at work...,ok maybe not everyone :-).... so last week, an colleague of mine needed to get the name of the <u>Primary user</u> of each workstations that connect to one of their critical application.

Lucky for me, <u>first</u> he had the <b>list of workstations</b> and <u>second</u> we have the name of the <b>primary user</b> information in the Active Directory located in the <b>description property</b> ! :-) (This is added when the computer is built and joined to the domain the first time).

So he asked me if I could help and get this information somehow. My answer was obviously ... <b>PowerShell!</b>
This could be done very easily using the ActiveDirectory Module but unfortunately RSAT (Remote Server Administrator Tools) feature was not installed on his computer. Why not use ADSI then ? :-)

If you follow my blog, in my previous posts I wrote about a small PowerShell function <a href="{{ site.url }}/2013/10/powershell-get-domainuser.html" target="_blank">Get-DomainUser</a> that use ADSI to get some information out of a Active Directory User Object and about <a href="{{ site.url }}/2013/10/powershell-using-adsi-with-alternate.html" target="_blank">Using alternate credential for ADSI query</a>.

Today we will use the same techniques to get information from Active Directory Computer Object(s).

## SOLUTION #1: The Lazy way

### Code

This is the small function I originally sent him, nothing fancy but it does the work.

```powershell
Function Get-Computer {
  [CmdletBinding()]
  PARAM(
    [Parameter(
      ValueFromPipelineByPropertyName=$true,
      ValueFromPipeline=$true,
      Mandatory=$true)]
    [String[]]$ComputerName)
  PROCESS{
    FOREACH ($item in $ComputerName){
      $Search = [adsisearcher]"(&(objectCategory=Computer)(name=$item))"
      FOREACH ($Computer in $($Search.FindAll())){
        New-Object -TypeName PSObject -Property @{
          "Name" = $($Computer.properties.name)
          "DNShostName"    = $($Computer.properties.dnshostname)
          "Description" = $($Computer.properties.description)}
      }#foreach ($Computer in $($Search.FindAll
    }#FOREACH ($item in $ComputerName){
  }#PROCESS{
}#function Get-Computer
```

<b><u>[ADSISearcher]</u></b>
Basically, I'm creating a `[ADSISearcher]` object with a filter which contains the two following conditions:

* `(objectCategory=Computer)` which only show the Computer object
* `ComputerName` parameter specified by the user

Notice the `&` logical operator which can be translated to an `AND` operator, means the following conditions must be met.
The execution of the search will not be perform until you actually use the FindOne() or FindAll() methods

```
   TypeName: System.DirectoryServices.DirectorySearcher

Name    MemberType Definition
----    ---------- ----------
FindAll Method     System.DirectoryServices.SearchResultCollection FindAll()
FindOne Method     System.DirectoryServices.SearchResult FindOne()
```


```powershell
PS C:\> $Search = [adsisearcher]"(&(objectCategory=Computer)(name=DHCP1))"
PS C:\> $Search.findall()

Path                                              Properties
----                                              ----------
LDAP://CN=DHCP1,CN=Computers,DC=FX,DC=LAB         {logoncount, codepage, objectcategory, descrip...
```

The full list of properties is available by doing the following

```
PS C:\> ($Search.findall()).properties

Name                           Value
----                           -----
logoncount                     {17}
codepage                       {0}
objectcategory                 {CN=Computer,CN=Schema,CN=Configuration,DC=FX,DC=LAB}
description                    {DHCP Server}
operatingsystem                {Windows Server 2012 Standard}
usnchanged                     {229459}
instancetype                   {4}
name                           {DHCP1}
badpasswordtime                {0}
pwdlastset                     {130209415121221390}
serviceprincipalname           {WSMAN/DHCP1.FX.LAB, RestrictedKrbHost/DHCP1.FX.LAB, HOST/DHCP1.F...
objectclass                    {top, person, organizationalPerson, user...}
badpwdcount                    {0}
samaccounttype                 {805306369}
lastlogontimestamp             {130209414908434960}
usncreated                     {74657}
objectguid                     {83 104 21 241 9 61 235 78 147 246 91 68 225 41 192 76}
localpolicyflags               {0}
whencreated                    {6/1/2013 5:09:45 PM}
adspath                        {LDAP://CN=DHCP1,CN=Computers,DC=FX,DC=LAB}
useraccountcontrol             {4096}
cn                             {DHCP1}
countrycode                    {0}
primarygroupid                 {515}
whenchanged                    {10/24/2013 6:03:03 AM}
operatingsystemversion         {6.2 (9200)}
dnshostname                    {DHCP1.FX.LAB}
dscorepropagationdata          {1/1/1601 12:00:00 AM}
lastlogon                      {130209599754010756}
distinguishedname              {CN=DHCP1,CN=Computers,DC=FX,DC=LAB}
msds-supportedencryptiontypes  {28}
iscriticalsystemobject         {False}
samaccountname                 {DHCP1$}
objectsid                      {1 5 0 0 0 0 0 5 21 0 0 0 180 190 60 92 74 161 105 103 20 195 233...
lastlogoff                     {0}
displayname                    {DHCP1$}
accountexpires                 {9223372036854775807}
```


### Output

This function will just return the `Name`, `DNSHostName` and the `Description`.

```powershell
# Querying a specific machine
PS C:\> Get-Computer -ComputerName "LAB1DC01"

DNShostName                Description                Name
-----------                -----------                ----
LAB1DC01.FX.LAB            Domain Controller of FX... LAB1DC01


# Querying multiple machines

PS C:\> Get-Computer -ComputerName WORKSTATION01, WORKSTATION02, WORKSTATION03, WORKSTATION04

DNShostName                       Description                      Name
-----------                       -----------                      ----
WORKSTATION01.fx.lab              Bob Smith                        WORKSTATION01
WORKSTATION02.fx.lab              Jean Dupont                      WORKSTATION02
WORKSTATION03.fx.lab              F-Xavier Cat                     WORKSTATION03
WORKSTATION04.fx.lab              Jeanne St-Croix                  WORKSTATION04


# Using a ComputerName pattern

PS C:\> Get-Computer -ComputerName WORKSTATION*

DNShostName                       Description                      Name
-----------                       -----------                      ----
WORKSTATION01.fx.lab              Bob Smith                        WORKSTATION01
WORKSTATION02.fx.lab              Jean Dupont                      WORKSTATION02
WORKSTATION03.fx.lab              F-Xavier Cat                     WORKSTATION03
WORKSTATION04.fx.lab              Jeanne St-Croix                  WORKSTATION04


# Using a list of workstations instead

PS C:\> Get-Content -Path .\computers.txt | Get-Computer

DNShostName                       Description                      Name
-----------                       -----------                      ----
WORKSTATION01.fx.lab              Bob Smith                        WORKSTATION01
WORKSTATION02.fx.lab              Jean Dupont                      WORKSTATION02
WORKSTATION03.fx.lab              F-Xavier Cat                     WORKSTATION03
WORKSTATION04.fx.lab              Jeanne St-Croix                  WORKSTATION04
```

## SOLUTION #2: The Advanced way

I spent a bit more time on this one to polish the code :

* Comments based help,
* Verbose,
* Alternate credentials
* Error handling
* etc ...

### Code

This is just a part of the function that is creating a ADSI searcher object to look for a computer matching a name or a pattern specified by the user. Another part (not showed here) is taking care of listing all the Computer Objects.

```powershell
[CmdletBinding()]
PARAM(
  [Parameter(
    ValueFromPipelineByPropertyName=$true,
    ValueFromPipeline=$true)]
  [Alias("Computer")]
  [String[]]$ComputerName,

  [Alias("ResultLimit","Limit")]
  [int]$SizeLimit='100',

  [Parameter(ValueFromPipelineByPropertyName=$true)]
  [Alias("Domain")]
  [String]$DomainDN=$(([adsisearcher]"").Searchroot.path),

  [Alias("RunAs")]
  [System.Management.Automation.Credential()]
  $Credential = [System.Management.Automation.PSCredential]::Empty

  )#PARAM

  PROCESS{
  IF ($ComputerName){FOREACH ($item in $ComputerName){
  TRY{
    # Building the basic search object with some parameters
    Write-Verbose -Message "COMPUTERNAME: $item"
    $Searcher = New-Object -TypeName System.DirectoryServices.DirectorySearcher `
                  -ErrorAction 'Stop' -ErrorVariable ErrProcessNewObjectSearcher
    $Searcher.Filter = "(&(objectCategory=Computer)(name=$item))"
    $Searcher.SizeLimit = $SizeLimit
    $Searcher.SearchRoot = $DomainDN

    # Specify a different domain to query
    IF ($PSBoundParameters['DomainDN']){
      IF ($DomainDN -notlike "LDAP://*") {$DomainDN = "LDAP://$DomainDN"}#IF
      Write-Verbose -Message "Different Domain specified: $DomainDN"
      $Searcher.SearchRoot = $DomainDN}#IF ($PSBoundParameters['DomainDN'])

    # Alternate Credentials
    IF ($PSBoundParameters['Credential']) {
      Write-Verbose -Message "Different Credential specified: $($Credential.UserName)"
      $Domain = New-Object -TypeName System.DirectoryServices.DirectoryEntry `
        -ArgumentList $DomainDN,$($Credential.UserName),$($Credential.GetNetworkCredential().password) `
        -ErrorAction 'Stop' -ErrorVariable ErrProcessNewObjectCred
      $Searcher.SearchRoot = $Domain}#IF ($PSBoundParameters['Credential'])

    # Querying the Active Directory
    Write-Verbose -Message "Starting the ADSI Search..."
    FOREACH ($Computer in $($Searcher.FindAll())){
      Write-Verbose -Message "$($Computer.properties.name)"
      New-Object -TypeName PSObject -ErrorAction 'Continue' `
        -ErrorVariable ErrProcessNewObjectOutput -Property @{
        "Name" = $($Computer.properties.name)
        "DNShostName"    = $($Computer.properties.dnshostname)
        "Description" = $($Computer.properties.description)
        "OperatingSystem"=$($Computer.Properties.operatingsystem)
        "WhenCreated" = $($Computer.properties.whencreated)
        "DistinguishedName" = $($Computer.properties.distinguishedname)}#New-Object
    }#FOREACH $Computer

    Write-Verbose -Message "ADSI Search completed"
  }#TRY
  CATCH{
    Write-Warning -Message ('{0}: {1}' -f $item, $_.Exception.Message)

    IF ($ErrProcessNewObjectSearcher){
      Write-Warning -Message "PROCESS BLOCK - Error during the creation of the searcher object"}
    IF ($ErrProcessNewObjectCred){
      Write-Warning -Message "PROCESS BLOCK - Error during the creation of the alternate credential object"}
    IF ($ErrProcessNewObjectOutput){
      Write-Warning -Message "PROCESS BLOCK - Error during the creation of the output object"}
  }#CATCH
}#FOREACH $item
```

<u>Note:</u> I had to use backtick ` to be able to fit the code in my blog. Backticks are not present in the final script.

To resume we added the following items :

* <b>Error Handling</b>
  * `TRY{"do tasks"} CATCH{"Oups Error"}`
* <b>Verbose</b>
  * `[cmdletbinding()]`
  * `Write-Verbose`
* <b>Support for Multiple ComputerName query</b>
  * `[string[]]$ComputerName`
  * `FOREACH ($item in $ComputerName)`
* <b>Support for Alternative Credential</b>
  * `[System.Management.Automation.Credential()]$Credential = [System.Management.Automation.PSCredential]::Empty`
  * `IF ($PSBoundParameters['Credential'])`
  * `New-Object -TypeName System.DirectoryServices.DirectoryEntry-ArgumentList $DomainDN,$($Credential.UserName),$($Credential.GetNetworkCredential().password)`
* <b>Support for different Domain</b>
  * `IF ($PSBoundParameters['DomainDN'])`
  * `$Searcher.SearchRoot = $DomainDN`
  * `New-Object -TypeName System.DirectoryServices.DirectoryEntry-ArgumentList $DomainDN,$($Credential.UserName),$($Credential.GetNetworkCredential().password)`

### Output

The function generate the following output

```powershell
PS C:\> Get-DomainComputer -ComputerName "lab1*"
```

![image-center](../images/2013/../../../images/2013/20131030_PowerShell_-_Get-DomainComputer_(ADSI)/example.png)


```
Name              : LAB1DC01
WhenCreated       : 3/7/2013 2:19:48 AM
Description       : Domain Controller of FX.LAB
OperatingSystem   : Windows Server 2012 Standard
DNShostName       : LAB1DC01.FX.LAB
DistinguishedName : CN=LAB1DC01,OU=Domain Controllers,DC=FX,DC=LAB

Name              : LAB1VC01
WhenCreated       : 4/7/2013 5:19:17 AM
Description       : lab1vc01.fx.lab
OperatingSystem   : SLES
DNShostName       : lab1vc01.fx.lab
DistinguishedName : CN=LAB1VC01,CN=Computers,DC=FX,DC=LAB

Name              : LAB1VH02
WhenCreated       : 4/7/2013 5:33:27 AM
Description       : LAB1VH02
OperatingSystem   : unknown
DNShostName       : lab1vh02.fx.lab
DistinguishedName : CN=LAB1VH02,CN=Computers,DC=FX,DC=LAB

Name              : LAB1VH01
WhenCreated       : 4/7/2013 5:38:54 AM
Description       : LAB1VH01
OperatingSystem   : unknown
DNShostName       : lab1vh01.fx.lab
DistinguishedName : CN=LAB1VH01,CN=Computers,DC=FX,DC=LAB

Name              : LAB1SQL01
WhenCreated       : 6/23/2013 7:40:18 PM
Description       : SQL2012
OperatingSystem   : Windows Server 2012 Standard
DNShostName       : LAB1SQL01.FX.LAB
DistinguishedName : CN=LAB1SQL01,CN=Computers,DC=FX,DC=LAB

Name              : LAB1CM01
WhenCreated       : 6/23/2013 8:05:58 PM
Description       : SCCM2012
OperatingSystem   : Windows Server 2012 Standard
DNShostName       : LAB1CM01.FX.LAB
DistinguishedName : CN=LAB1CM01,CN=Computers,DC=FX,DC=LAB

Name              : LAB1OR01
WhenCreated       : 6/23/2013 9:58:41 PM
Description       : SCORCH2012
OperatingSystem   : Windows Server 2012 Standard
DNShostName       : LAB1OR01.FX.LAB
DistinguishedName : CN=LAB1OR01,CN=Computers,DC=FX,DC=LAB

Name              : LAB1VC02
WhenCreated       : 6/23/2013 10:00:28 PM
Description       : VMware vCenter
OperatingSystem   : Windows Server 2012 Standard
DNShostName       : LAB1VC02.FX.LAB
DistinguishedName : CN=LAB1VC02,CN=Computers,DC=FX,DC=LAB

```


### Help

Can't built a function without help! :-)

```powershell
<#
PS C:\> Get-Help Get-DomainComputer -full

NAME
  Get-DomainComputer

SYNOPSIS
  The Get-DomainComputer function allows you to get information from an Active Directory
  Computer object using ADSI.

SYNTAX
  Get-DomainComputer [[-ComputerName] <String[]>] [[-SizeLimit] <Int32>] [[-DomainDN]
  <String>] [[-Credential] <Object>] [<CommonParameters>]


DESCRIPTION
  The Get-DomainComputer function allows you to get information from an Active Directory
  Computer object using ADSI.
  You can specify: how many result you want to see, which credentials to use and/or
  which domain to query.


PARAMETERS
  -ComputerName <String[]>
      Specifies the name(s) of the Computer(s) to query

      Required?                    false
      Position?                    1
      Default value
      Accept pipeline input?       true (ByValue, ByPropertyName)
      Accept wildcard characters?  false

  -SizeLimit <Int32>
      Specifies the number of objects to output. Default is 100.

      Required?                    false
      Position?                    2
      Default value                100
      Accept pipeline input?       false
      Accept wildcard characters?  false

  -DomainDN <String>
      Specifies the path of the Domain to query.
      Examples:     "FX.LAB"
                  "DC=FX,DC=LAB"
                  "Ldap://FX.LAB"
                  "Ldap://DC=FX,DC=LAB"

      Required?                    false
      Position?                    3
      Default value                $(([adsisearcher]"").Searchroot.path)
      Accept pipeline input?       true (ByPropertyName)
      Accept wildcard characters?  false

  -Credential <Object>
      Specifies the alternate credentials to use.

      Required?                    false
      Position?                    4
      Default value                [System.Management.Automation.PSCredential]::Empty
      Accept pipeline input?       false
      Accept wildcard characters?  false

  <CommonParameters>
      This cmdlet supports the common parameters: Verbose, Debug,
      ErrorAction, ErrorVariable, WarningAction, WarningVariable,
      OutBuffer and OutVariable. For more information, see
      about_CommonParameters (http://go.microsoft.com/fwlink/?LinkID=113216).

INPUTS

OUTPUTS

NOTES

  NAME:    FUNCT-AD-COMPUTER-Get-DomainComputer.ps1
  AUTHOR:    Francois-Xavier CAT
  DATE:    2013/10/26
  EMAIL:    info@lazywinadmin.com
  WWW:    www.lazywinadmin.com
  TWITTER:@lazywinadmin

  VERSION HISTORY:
  1.0 2013.10.26
      Initial Version

    -------------------------- EXAMPLE 1 --------------------------

    C:\PS>Get-DomainComputer


    This will show all the computers in the current domain





    -------------------------- EXAMPLE 2 --------------------------

    C:\PS>Get-DomainComputer -ComputerName "Workstation001"


    This will query information for the computer Workstation001.





    -------------------------- EXAMPLE 3 --------------------------

    C:\PS>Get-DomainComputer -ComputerName "Workstation001","Workstation002"


    This will query information for the computers Workstation001 and Workstation002.





    -------------------------- EXAMPLE 4 --------------------------

    C:\PS>Get-Content -Path c:\WorkstationsList.txt | Get-DomainComputer


    This will query information for all the workstations listed inside the
    WorkstationsList.txt file.





    -------------------------- EXAMPLE 5 --------------------------

    C:\PS>Get-DomainComputer -ComputerName "Workstation0*" -SizeLimit 10 -Verbose


    This will query information for computers starting with 'Workstation0', but only show
    10 results max.
    The Verbose parameter allow you to track the progression of the script.





    -------------------------- EXAMPLE 6 --------------------------

    C:\PS>Get-DomainComputer -ComputerName "Workstation0*" -SizeLimit 10 -Verbose
    -DomainDN "DC=FX,DC=LAB" -Credential (Get-Credential -Credential FX\Administrator)


    This will query information for computers starting with 'Workstation0' from the domain
    FX.LAB with the account FX\Administrator.
    Only show 10 results max and the Verbose parameter allows you to track the progression
    of the script.
#>
```

### Download

Script can be found [here](https://github.com/lazywinadmin/PowerShell/blob/master/AD-COMPUTER-Get-DomainComputer/Get-DomainComputer.ps1)