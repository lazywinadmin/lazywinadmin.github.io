---
description: "I just started to play with a Microsoft Office 365 environment (Azure Active Directory, Lync Online and Exchange Online) and I thought I would make it…"
layout: single
title: PowerShell - Handy function to connect to Office365 services
excerpt: 
permalink: /2014/07/powershell-handy-function-to-connect-to.html
tags:
- active directory
- azure
- office 365
- powershell
- productivity
published: true
comments: true
tldr: "A Connect-Office365 function for your PowerShell profile that connects to Azure Active Directory, Exchange Online and Lync Online in one go, instead of loading modules and signing in to each one. Exchange uses implicit remoting. SharePoint Online wasn't tested and isn't included."
---

 
 
<a href="{{ site.url }}/images/2014/20140701_PowerShell_-_Handy_function_to_connect_to_Office365_services/office-365-cloud__582500915__-281x172.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img alt="office 365 cloud" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/20140701_PowerShell_-_Handy_function_to_connect_to_Office365_services/office-365-cloud__582500915__-281x172.png" height="97.6" width="160" /></a>I just started to play with a Microsoft Office 365 environment (Azure Active Directory, Lync Online and Exchange Online) and I thought I would make it through PowerShell obviously :-)

But when you start your PowerShell console... you need to load modules, connect to each services, enter your credentials...yada yada yada...

With Office 365 you can administer <u>the following services using PowerShell:</u>
<ul>
* Azure Active Directory

* Exchange Online PowerShell

* SharePoint Online PowerShell

* Lync Online PowerShell
</ul><u></u>
<u>
</u><u>Note:</u> However I was not able to test the SharePoint part, so this is not included in the function below yet.

Here is a very handy function that you can include to your PowerShell Profil to connect to all the service at once.


<b><u>Requirements</u></b>

<ul>
* <b>Azure Active Directory</b><a href="http://technet.microsoft.com/en-us/library/jj151815.aspx#BKMK_Requirements" target="_blank">Download</a>

* <b>Exchange Online PowerShell</b>(no download needed, the function will create an implicit remoting module)

* <b>SharePoint Online PowerShell</b>(no download needed, the function will create an implicit remoting module)

* <b>Lync Online PowerShell</b><a href="http://www.microsoft.com/en-us/download/details.aspx?id=39366" target="_blank">Download</a>
</ul>



<b><u>PowerShell Function Connect-Office365</u></b>



```powershell
function Connect-Office365
{
<#
.SYNOPSIS
    This function will prompt for credentials, load module MSOLservice,
    load implicit modules for Office 365 Services (AD, Lync, Exchange) using PSSession.
.DESCRIPTION
    This function will prompt for credentials, load module MSOLservice,
    load implicit modules for Office 365 Services (AD, Lync, Exchange) using PSSession.
.EXAMPLE
    Connect-Office365
   
    This will prompt for your credentials and connect to the Office365 services
.EXAMPLE
    Connect-Office365 -verbose
   
    This will prompt for your credentials and connect to the Office365 services.
    Additionally you will see verbose messages on the screen to follow what is happening in the background
.NOTES
    Francois-Xavier Cat
    lazywinadmin.com
    @lazywinadmin
#>
    [CmdletBinding()]
    PARAM ()
    BEGIN
    {
        TRY
        {
            #Modules
            IF (-not (Get-Module -Name MSOnline -ListAvailable))
            {
                Write-Verbose -Message "BEGIN - Import module Azure Active Directory"
                Import-Module -Name MSOnline -ErrorAction Stop -ErrorVariable ErrorBeginIpmoMSOnline
            }
            
            IF (-not (Get-Module -Name LyncOnlineConnector -ListAvailable))
            {
                Write-Verbose -Message "BEGIN - Import module Lync Online"
                Import-Module -Name LyncOnlineConnector -ErrorAction Stop -ErrorVariable ErrorBeginIpmoLyncOnline
            }
        }
        CATCH
        {
            Write-Warning -Message "BEGIN - Something went wrong!"
            IF ($ErrorBeginIpmoMSOnline)
            {
                Write-Warning -Message "BEGIN - Error while importing MSOnline module"
            }
            IF ($ErrorBeginIpmoLyncOnline)
            {
                Write-Warning -Message "BEGIN - Error while importing LyncOnlineConnector module"
            }
            
            Write-Warning -Message $error[0].exception.message
        }
    }
    PROCESS
    {
        TRY
        {
            
            # CREDENTIAL
            Write-Verbose -Message "PROCESS - Ask for Office365 Credential"
            $O365cred = Get-Credential -ErrorAction Stop -ErrorVariable ErrorCredential
            
            # AZURE ACTIVE DIRECTORY (MSOnline)
            Write-Verbose -Message "PROCESS - Connect to Azure Active Directory"
            Connect-MsolService -Credential $O365cred -ErrorAction Stop -ErrorVariable ErrorConnectMSOL
            
            # EXCHANGE ONLINE (Implicit Remoting module)
            Write-Verbose -Message "PROCESS - Create session to Exchange online"
            $ExchangeURL = "https://ps.outlook.com/powershell/"
            $O365PS = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri $ExchangeURL -Credential $O365cred -Authentication Basic -AllowRedirection -ErrorAction Stop -ErrorVariable ErrorConnectExchange
            
            Write-Verbose -Message "PROCESS - Open session to Exchange online (Prefix: Cloud)"
            Import-PSSession -Session $O365PS –Prefix ExchCloud
            
            # LYNC ONLINE (LyncOnlineConnector)
            Write-Verbose -Message "PROCESS - Create session to Lync online"
            $lyncsession = New-CsOnlineSession –Credential $O365cred -ErrorAction Stop -ErrorVariable ErrorConnectExchange
            Import-PSSession -Session $lyncsession -Prefix LyncCloud
            
            # SHAREPOINT ONLINE (Implicit Remoting module)
            #Connect-SPOService -Url https://contoso-admin.sharepoint.com –credential $O365cred
        }
        CATCH
        {
            Write-Warning -Message "PROCESS - Something went wrong!"
            IF ($ErrorCredential)
            {
                Write-Warning -Message "PROCESS - Error while gathering credential"
            }
            IF ($ErrorConnectMSOL)
            {
                Write-Warning -Message "PROCESS - Error while connecting to Azure AD"
            }
            IF ($ErrorConnectExchange)
            {
                Write-Warning -Message "PROCESS - Error while connecting to Exchange Online"
            }
            IF ($ErrorConnectLync)
            {
                Write-Warning -Message "PROCESS - Error while connecting to Lync Online"
            }
            
            Write-Warning -Message $error[0].exception.message
        }
    }
}

```




<b><u>Running the function</u></b>

<a href="{{ site.url }}/images/2014/20140701_PowerShell_-_Handy_function_to_connect_to_Office365_services/2014-07-01_21-19-49__362315941__-772x106.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Screenshot from &quot;PowerShell - Handy function to connect to Office365 services&quot; (1)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/20140701_PowerShell_-_Handy_function_to_connect_to_Office365_services/2014-07-01_21-19-49__362315941__-772x106.png" /></a>


Here the result in action

<a href="{{ site.url }}/images/2014/PowerShell_-_Handy_function_to_connect_to_Office365_services/7-2-2014_5-34-23_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Screenshot from &quot;PowerShell - Handy function to connect to Office365 services&quot; (2)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_-_Handy_function_to_connect_to_Office365_services/7-2-2014_5-34-23_PM.png" /></a>





<b><u>Adding the function to your PowerShell profile</u></b>

<a href="{{ site.url }}/images/2014/20140701_PowerShell_-_Handy_function_to_connect_to_Office365_services/2014-07-01_21-13-55__1698217232__-772x122.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Screenshot from &quot;PowerShell - Handy function to connect to Office365 services&quot; (3)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/20140701_PowerShell_-_Handy_function_to_connect_to_Office365_services/2014-07-01_21-13-55__1698217232__-772x122.png" /></a>

<a href="{{ site.url }}/images/2014/20140701_PowerShell_-_Handy_function_to_connect_to_Office365_services/2014-07-01_21-15-05__243530005__-740x458.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Screenshot from &quot;PowerShell - Handy function to connect to Office365 services&quot; (4)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/20140701_PowerShell_-_Handy_function_to_connect_to_Office365_services/2014-07-01_21-15-05__243530005__-740x458.png" /></a>
The next time you reload your PowerShell, the function<span style="font-family: Courier New, Courier, monospace;"> Connect-Office365 will be available to your PowerShell.

Finally we can see two implicit modules created for Lync and Exchange with a sample of cmdlets available. Those cmdlets contains the prefix we defined in the function ExchCloud and LyncCloud.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_-_Handy_function_to_connect_to_Office365_services/7-2-2014_5-40-04_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Screenshot from &quot;PowerShell - Handy function to connect to Office365 services&quot; (5)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_-_Handy_function_to_connect_to_Office365_services/7-2-2014_5-40-04_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Implicit remoting modules loaded start by a "tmp". You can see a sample of the Cmdlets available
with the prefix we included.</td></tr></tbody></table>


<b><u>Download</u></b>
<ul>
* <a href="https://github.com/lazywinadmin/PowerShell/blob/master/O365-Connect-Office365/Connect-Office365.ps1" target="_blank">Connect-Office365 on GitHub</a>
</ul>
<b><u>Space for improvements</u></b>
<ul>
* Check if PSsession already opened ? Same credential used?

* Parameters
<ul>
* [Switch]$AzureAD,

* [Switch]$LyncOnline,

* [Switch]$ExchangeOnline
</ul></ul>


