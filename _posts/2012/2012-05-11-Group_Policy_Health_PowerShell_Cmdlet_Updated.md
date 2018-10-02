---
layout: single
title: Group Policy Health PowerShell Cmdlet Updated
excerpt: 
permalink: /2012/05/group-policy-health-powershell-cmdlet.html
tags: 
- active directory
- gpo
- group policy
- module
- powershell
published: true
comments: true
---
SDM Software just updated their Group Policy Health Powershell Cmdlet to version 1.2

Once Download and Install, all you need to do is:

<b>Import-Module SDM-GPHealth</b>

<a href="{{ site.url }}/images/2012/20120511_Group_Policy_Health_PowerShell_Cmdlet_Updated/SDM-GPOHealth_module__1580249737__-451x308.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2012/20120511_Group_Policy_Health_PowerShell_Cmdlet_Updated/SDM-GPOHealth_module__1580249737__-451x308.png" /></a>
Here is the only cmdlet available for this module <b>Get-SDMGPHealth</b>, this is the full help.

<pre class="brush: powershell; ruler: true; first-line: 1;gutter: true;">NAME
    Get-SDMGPHealth
    
SYNOPSIS
    Retrieves Group Policy Processing Health on local or remote Windows systems.
    
SYNTAX
    Get-SDMGPHealth [-ComputerName] <string> [-Credentials <pscredential>] [-OutputbyXml] [-NoComputer] [-NoUser] [-NoG
    PO] [-NoCSE] [<commonparameters>]
    
    Get-SDMGPHealth [-OU] <string> [-Credentials <pscredential>] [-OutputbyXml] [-NoComputer] [-NoUser] [-NoGPO] [-NoCS
    E] [<commonparameters>]
    
    Get-SDMGPHealth [-DomainName] <string> [-Credentials <pscredential>] [-OutputbyXml] [-NoComputer] [-NoUser] [-NoGPO
    ] [-NoCSE] [<commonparameters>]
    
    
DESCRIPTION
    This cmdlet leverages in-depth knowledge of Group Policy processing to return overall health as well as detailed in
    formation on three main areas of Group Policy processing. The first is general information, which provides informat
    ion such as host OS version, whether loopback was detected, fast logon optimization, etc. The second area is a list
     of GPOs currently processed by computer and user. The third is a list of CSEs run by computer and user, and what G
    POs ran for each CSE. An OverallStatus property is also returned which provides a quick "red or green" status of GP
     processing on the target system, based on whether either Core or CSE processing failed for the client
    

PARAMETERS
    -ComputerName <string>
        This parameter is used for targeting a single system and expects the hostname of the machine in question.
        
        Required?                    true
        Position?                    1
        Default value                
        Accept pipeline input?       true (ByValue, ByPropertyName)
        Accept wildcard characters?  false
        
    -Credentials <pscredential>
        This parameter is expecting a PSCredential object containing a username and password that will be used when mak
        ing a connection to the target(s). You can create such an object by call get-credential and assigning it to a v
        ariable, then passing that variable into this parameter. Note that this cmdlet requires the ability to remotely
         query a system via WMI. As such, any credentials passed must have this ability.
        
        Required?                    false
        Position?                    named
        Default value                
        Accept pipeline input?       true (ByValue)
        Accept wildcard characters?  false
        
    -OutputbyXml
        If this optional parameter is used, the results of the GPHealth call will be logged to an XMLDocument object. T
        his object contains the more detail than the default output format, and should be used to if more detail is req
        uired or you need a structured data model to import into a database.
        
        Required?                    false
        Position?                    named
        Default value                
        Accept pipeline input?       false
        Accept wildcard characters?  false
        
    -NoComputer
        Use this optional parameter if you want to exclude per-computer status from the health report.
        
        Required?                    false
        Position?                    named
        Default value                
        Accept pipeline input?       false
        Accept wildcard characters?  false
        
    -NoUser
        Use this optional parameter if you want to exclude per-user status from the health report.
        
        Required?                    false
        Position?                    named
        Default value                
        Accept pipeline input?       false
        Accept wildcard characters?  false
        
    -NoGPO
        Use this optional parameter if you want to exclude GPO status from the health report. No GPO details will be pr
        ovided in this case.
        
        Required?                    false
        Position?                    named
        Default value                
        Accept pipeline input?       false
        Accept wildcard characters?  false
        
    -NoCSE
        Use this optional parameter if you want to exclude CSE status from the health report. No CSE details will be pr
        ovided in this case.
        
        Required?                    false
        Position?                    named
        Default value                
        Accept pipeline input?       false
        Accept wildcard characters?  false
        
    -OU <string>
        This parameter would be used in place of -ComputerName. If you specify this parameter and supply the DN of an O
        U in AD domain, then that OU is searched for all computer objects and those computer objects are used as target
        s for the health cmdlet. The cmdlet runs against each computer in turn and outputs the results to the console. 
        For example, -OU "OU=Marketing,DC=cpandl,DC=com"
        
        Required?                    true
        Position?                    1
        Default value                
        Accept pipeline input?       true (ByValue, ByPropertyName)
        Accept wildcard characters?  false
        
    -DomainName <string>
        This parameter would be used in place of -ComputerName or -OU. If you specify this parameter and supply the DN 
        of an AD domain, then that entired domain is searched for all computer objects and those computer objects are u
        sed as targets for the health cmdlet. The cmdlet runs against each computer in turn and outputs the results to 
        the console. For example, -DomainName "DC=cpandl,DC=com"
        
        Required?                    true
        Position?                    1
        Default value                
        Accept pipeline input?       true (ByValue, ByPropertyName)
        Accept wildcard characters?  false
        
    <commonparameters>
        This cmdlet supports the common parameters: Verbose, Debug,
        ErrorAction, ErrorVariable, WarningAction, WarningVariable,
        OutBuffer and OutVariable. For more information, type,
        "get-help about_commonparameters".
    
INPUTS
    System.String
     
    
OUTPUTS
    Sdmsoftware.SDMGPHealthResult, System.XML
     
    
NOTES
    
    
        
    
    --------------  Example 1 --------------
    
    C:\PS>get-SDMGPHealth -ComputerName xp3
    
    
    Returns GP Health information for a host named XP3
    
    
    OverallStatus            : red
    TimeLogged               : 6/18/2008 1:34:09 AM
    HostName                 : xp3
    Domain                   : cpandl.com
    OSVersion                : Microsoft Windows XP Professional, Service Pack 2
    ComputerCoreStatus       : The operation completed successfully
    UserCoreStatus           : The operation completed successfully
    FastLogonEnabled         : False
    ComputerSlowLinkDetected : False
    Loopback                 : None
    DCUsed                   : \\sdm2.cpandl.com
    ComputerElapsedTime      : 00:00:04
    CurrentLoggedOnUser      : CPANDL\test
    UserSlowLinkDetected     : False
    UserElapsedTime          : 00:00:01
    ComputerGPOsProcessed    : {Local Group Policy, Default Domain Policy, Scripts TEst, Windows Update Test...}
    UserGPOsProcessed        : {Local Group Policy, Default Domain Policy, Scripts TEst, Windows Update Test...}
    ComputerCSEsProcessed    : {Registry, Scripts, Internet Explorer Zonemapping, Security...}
    UserCSEsProcessed        : {Folder Redirection, Registry, Scripts, Internet Explorer Zonemapping...}
    
    
    --------------  Example 2 --------------
    
    C:\PS>get-SDMGPHealth -ComputerName XP3 -NoCSE
    
    
    Returns GP Health information for a host named XP3 without Client Side Extension (CSE) information
    
    
    OverallStatus            : green
    TimeLogged               : 6/18/2008 1:36:58 AM
    HostName                 : xp3
    Domain                   : cpandl.com
    OSVersion                : Microsoft Windows XP Professional, Service Pack 2
    ComputerCoreStatus       : The operation completed successfully
    UserCoreStatus           : The operation completed successfully
    FastLogonEnabled         : False
    ComputerSlowLinkDetected : False
    Loopback                 : None
    DCUsed                   : \\sdm2.cpandl.com
    ComputerElapsedTime      : 00:00:04
    CurrentLoggedOnUser      : CPANDL\test
    UserSlowLinkDetected     : False
    UserElapsedTime          : 00:00:01
    ComputerGPOsProcessed    : {Local Group Policy, Default Domain Policy, Scripts TEst, Windows Update Test...}
    UserGPOsProcessed        : {Local Group Policy, Default Domain Policy, Scripts TEst, Windows Update Test...}
    ComputerCSEsProcessed    :
    UserCSEsProcessed        :
    
    
    --------------  Example 3 --------------
    
    C:\PS>(Import-Csv hosts.csv | Get-SDMGPHealth | ft HostName, OverallStatus) 2>errors.txt
    
    
    This example leverages the import-csv cmdlet to pass a list of hostnames to the GP Health cmdlet. Then, the output 
    is piped into a format-table cmdlet that only returns the hostname and overall status. If any hosts return an error
    , the error is redirected to a file called errors.txt
    
    
    HostName                                                    OverallStatus
    --------                                                    -------------
    xp3                                                         red
    sdm1                                                        red
    sdm2                                                        green
    xp2                                                         green
    member100                                                   green
    
    
    --------------  Example 4 --------------
    
    C:\PS>$creds= Get-Credential ; Get-SDMGPHealth -ComputerName child1 -Credentials $creds
    
    
    These two commands first assign the call to get-Credential to a variable called $creds, and then then use that to p
    ass alternate credentials to the Health cmdlet using the -Credentials parameter
    
    
    cmdlet Get-Credential at command pipeline position 1
    Supply values for the following parameters:
    Credential
    
    
    OverallStatus            : green
    TimeLogged               : 6/18/2008 2:12:50 AM
    HostName                 : child1
    Domain                   : west.cpandl.com
    OSVersion                : Microsoft(R) Windows(R) Server 2003, Standard Edition, Service Pack 1
    ComputerCoreStatus       : The operation completed successfully
    UserCoreStatus           : The operation completed successfully
    FastLogonEnabled         : False
    ComputerSlowLinkDetected : False
    Loopback                 : None
    DCUsed                   : \\child1.west.cpandl.com
    ComputerElapsedTime      : 00:00:00
    CurrentLoggedOnUser      :
    UserSlowLinkDetected     : False
    UserElapsedTime          : 00:00:00
    ComputerGPOsProcessed    : {Local Group Policy, Default Domain Policy, Default Domain Controllers Policy}
    UserGPOsProcessed        : {}
    ComputerCSEsProcessed    : {Registry, Security, EFS recovery}
    UserCSEsProcessed        : {}
    
    
    --------------  Example 5 --------------
    
    C:\PS>(Get-SDMGPHealth -ComputerName xp3 -OutputbyXml).Save(".\output.xml")
    
    
    This example leverages the OutputbyXML parameter to dump the contents of the Health cmdlet to an XML file called ou
    tput.xml. It uses the fact that the output type of the call to this cmdlet with this parameter is an XMLDocument ob
    ject, which contains the Save() method to save the contents to an XML file.
    

RELATED LINKS
    http://www.sdmsoftware.com/group_policy_scripting 




</commonparameters></string></string></pscredential></string></commonparameters></pscredential></string></commonparameters></pscredential></string></commonparameters></pscredential></string>
```

