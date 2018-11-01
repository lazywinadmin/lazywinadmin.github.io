---
layout: single
title: PowerShell - Get/Set the Network Level Authentication Remotely (RDP Setting)
excerpt: 
permalink: /2014/04/powershell-getset-network-level.html
tags: 
- cim
- powershell
- rdp
- remote
- remote desktop
- wmi
published: true
comments: true
toc: true
---

<a href="http://2.bp.blogspot.com/-6f6kXC7Moqo/UzyIUkTdV4I/AAAAAAABj9A/G0B0bwNpM_c/s1600/Network-Remote-Desktop-icon+(1).png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="https://2.bp.blogspot.com/-6f6kXC7Moqo/UzyIUkTdV4I/AAAAAAABj9A/G0B0bwNpM_c/s1600/Network-Remote-Desktop-icon+(1).png" /></a>A few days ago I was in a training class out of the office with one of my work colleague. During the class he tried to connect to work using our Citrix (SRA) portal when he realized that his computer at work (freshly re-installed with Windows 8.1) was not allowing him to connect because of the Network Level Authentication.

> **Error message:**<i>The remote computer that you are trying to connect to requires Network Level Authentication (NLA), but your Windows domain controller cannot be contacted to perform NLA. If you are an administrator on the remote computer, you can disable NLA by using the options on the Remote tab of the System Properties dialog box."</i>

<a href="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/NLA__180582049__-583x182.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/NLA__1667311512__-583x182.png" /></a>
Before I talk about the workaround and the PowerShell script we used to fix that, let's investigate in order to understand the problem.

## What is Network Level Authentication ?

Network Level Authentication is a technology used in Remote Desktop Services (RDP Server) or Remote Desktop Connection (RDP Client) that requires the connecting user to authenticate themselves before a session is established with the server.

Originally, if you opened a RDP (remote desktop) session to a server it would load the login screen from the server for you. NLA delegates the user's credentials from the client through a client side Security Support Provider and prompts the user to authenticate before establishing a session on the server. This is a more secure authentication method that can help protect the remote computer from malicious users and malicious software.

Network Level Authentication was introduced in RDP 6.0 and supported initially in Windows Vista. It uses the new Security Support Provider, CredSSP, which is available through SSPI since Windows Vista.

<a href="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/NLA_RDP_Supported__911042635__-346x226.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="209" src="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/NLA_RDP_Supported__1565359304__-346x226.png" width="320" /></a>

The advantages of Network Level Authentication are:

* It requires fewer remote computer resources initially. The remote computer uses a limited number of resources before authenticating the user, rather than starting a full remote desktop connection as in previous versions.
* It can help provide better security by reducing the risk of denial-of-service attacks.

## Requirements of Network Level Authentication

* The client computer must be using at least Remote Desktop Connection 6.0.
* The client computer must be using an operating system, such as Windows 8.1, Windows 8, Windows 7, Windows Vista, or Windows XP with Service Pack 3, that supports the Credential Security Support Provider (CredSSP) protocol.
* The Remote Desktop Session Host "server" must be running
* Windows Client: Vista or newer (Vista, 7, 8, 8.1)
* Windows Server: 2008 R1 or newer (2008R1, 2008R2, W2012R1, W2012R2)

## Workaround using the UI

Go to <b>Control Panel / System and Security / System</b> and select<b> Remote Settings</b>
<a href="http://3.bp.blogspot.com/-Z_KPOcbZ4_s/UzD0JawY7II/AAAAAAABj4k/lVoMsPLh2gs/s1600/2014-03-24+11-10-43+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="209" src="https://3.bp.blogspot.com/-Z_KPOcbZ4_s/UzD0JawY7II/AAAAAAABj4k/lVoMsPLh2gs/s1600/2014-03-24+11-10-43+PM.png" width="320" /></a>

In the <b>Remote</b> tab, in the remote <b>Remote Desktop</b> group you will have to uncheck "<b><i>Allow remote connections only from computers running Remote Desktop with Network Level Authentication (recommended)</i></b>"

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://2.bp.blogspot.com/-f0ptXhFCdP0/UzD0Nb70NuI/AAAAAAABj4s/fPNrQLKyHI0/s1600/2014-03-24+10-49-42+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="320" src="https://2.bp.blogspot.com/-f0ptXhFCdP0/UzD0Nb70NuI/AAAAAAABj4s/fPNrQLKyHI0/s1600/2014-03-24+10-49-42+PM.png" width="288" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Windows 8/8.1/2012 <u>Remote</u> tab</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://1.bp.blogspot.com/-xWUA9CJEGFI/UzyvOgWlURI/AAAAAAABj9Q/hC6mslU0Sjo/s1600/system+properties.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="320" src="https://1.bp.blogspot.com/-xWUA9CJEGFI/UzyvOgWlURI/AAAAAAABj9Q/hC6mslU0Sjo/s1600/system+properties.png" width="289" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Windows Vista/7/2008 <u>Remote</u> Tab</td></tr></tbody></table>

The user will then be able to connect to the server or workstation.

## Using PowerShell One-Liners

We used the class<a href="http://msdn.microsoft.com/en-us/library/aa383799%28v=vs.85%29.aspx" target="_blank">Win32_TSGeneralSetting</a>to get the information of the current NLA setting.

<b><u>Quick answer</u></b>, you can do this using the following commands:

```powershell
$ComputerName = "SERVER01"

# Getting the NLA information
(Get-WmiObject -class "Win32_TSGeneralSetting" -Namespace root\cimv2\terminalservices -ComputerName $ComputerName -Filter "TerminalName='RDP-tcp'").UserAuthenticationRequired

# Setting the NLA information to Disabled
(Get-WmiObject -class "Win32_TSGeneralSetting" -Namespace root\cimv2\terminalservices -ComputerName $ComputerName -Filter "TerminalName='RDP-tcp'").SetUserAuthenticationRequired(0)

# Setting the NLA information to Enabled
(Get-WmiObject -class "Win32_TSGeneralSetting" -Namespace root\cimv2\terminalservices -ComputerName $ComputerName -Filter "TerminalName='RDP-tcp'").SetUserAuthenticationRequired(1)
```

## Using PowerShell Advanced Functions (re-usable tools)

I created two re-usable advanced functions for this purpose

* <b>Get-NetworkLevelAuthentication</b>
* <b>Set-NetworkLevelAuthentication</b>

<a href="http://gallery.technet.microsoft.com/Get-and-Set-NetworkLevelAut-fc8b6361" target="_blank">You can download those from the Technet Gallery.</a>

<b><u>Running the functions</u></b>

First import the functions using the Dot Sourcing method

```powershell
. .\Get-Set-NetworkLevelAuthentication.ps1
```

Use the function Get-NetworkLevelAuthentication to retrieve the current setting.

```powershell
Get-NetworkLevelAuthentication
```

Use the function Set-NetworkLevelAuthentication to change the NLA setting

```powershell
Set-NetworkLevelAuthentication -EnableNLA $true
```

<a href="http://4.bp.blogspot.com/-tQvUGQdzo1c/Uz3H2tg6FeI/AAAAAAABj-g/ggNs4JpsSHM/s1600/4-3-2014+4-40-17+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="https://4.bp.blogspot.com/-tQvUGQdzo1c/Uz3H2tg6FeI/AAAAAAABj-g/ggNs4JpsSHM/s1600/4-3-2014+4-40-17+PM.png" /></a>
Use the function Get-NetworkLevelAuthentication with a list of computers:

```powershell
Get-NetworkLevelAuthentication -ComputerName (Get-Content -Path d:\ServersList.txt)
```

## Building the functions

First we investigate the class `Win32_TsGeneralSetting` using the cmdlet `Get-WMIObject`. The property `UserAuthenticationRequired` is the value that control the NLA setting.

```powershell
Get-WmiObject -Class Win32_TSGeneralSetting -Namespace root\cimv2\terminalservices
```

<a href="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/2014-04-02_21-44-36__968688984__-692x778.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/2014-04-02_21-44-36__2015979677__-692x778.png" /></a>

**Finding the methods** We can retrieve the methods available using `Get-Member`.Here we are interested at the method `SetUserAuthenticationRequired`.

```powershell
Get-WmiObject -Class Win32_TSGeneralSetting -Namespace root\cimv2\terminalservices | Get-Member -Type Methods
```

<a href="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/2014-04-02_21-47-35__1249747839__-692x330.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/2014-04-02_21-47-35__1889517893__-692x330.png" /></a>

**Using CIM cmdlets** However in my functions I decided to use CIM Cmdlets, you can retrieve the same information using the following:

```powershell
Get-Ciminstance -Class Win32_TSGeneralSetting -Namespace root\cimv2\terminalservices
```

<a href="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/2014-04-02_21-50-18__210592771__-692x570.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/2014-04-02_21-50-18__1509479296__-692x570.png" /></a>

However when you check the methods, you will notice the same methods are not available.

```powershell
Get-Ciminstance -Class Win32_TSGeneralSetting -Namespace root\cimv2\terminalservices | Get-Member -Type Method
```

<a href="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/2014-04-02_21-51-55__1969548964__-692x410.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/2014-04-02_21-51-55__664197085__-692x410.png" /></a>

**Find CIM Methods** Cim Cmdlets don’t work the same way, we need to use `Get-CimClass` cmdlets instead with the property `cimclassmethods`.

```powershell
(Get-Cimclass -Class Win32_TSGeneralSetting -Namespace root\cimv2\terminalservices).cimclassmethods
```

<a href="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/2014-04-02_22-09-37__125149504__-692x442.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/2014-04-02_22-09-37__1699464907__-692x442.png" /></a>

**Invoking CIM Method** We use the cmdlet `Invoke-CimMethod` to call this method. With this method you need to pass the arguments using a hash table.

```powershell
Invoke-CimMethod -MethodName SetUserAuthenticationRequired -Arguments @{ UserAuthenticationRequired = $EnableNLA }
```

The <a href="http://msdn.microsoft.com/en-us/library/aa383441%28v=vs.85%29.aspx" target="_blank">MSDN page</a> of this method show us how to use it:

<a href="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/2014-04-04_20-01-37__1265536478__-970x905.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="298" src="{{ site.url }}/images/2014/20140404_PowerShell_-_GetSet_the_Network_Level_Authentication_Remotely_(RDP_Setting)/2014-04-04_20-01-37__238174237__-970x905.png" width="320" /></a>

## Download

* <a href="http://gallery.technet.microsoft.com/Get-and-Set-NetworkLevelAut-fc8b6361" target="_blank">Technet Repository</a>
* Github - <a href="https://github.com/lazywinadmin/PowerShell/tree/master/TOOL-Get-NetworkLevelAuthentication" target="_blank">Get-NetworkLevelAuthentication</a>
* Github - <a href="https://github.com/lazywinadmin/PowerShell/tree/master/TOOL-Set-NetworkLevelAuthentication" target="_blank">Set-NetworkLevelAuthentication</a>

## References

* <a href="http://blogs.msdn.com/b/powershell/archive/2012/08/24/introduction-to-cim-cmdlets.aspx" target="_blank">PowerShell Team Blog - Introduction to CIM Cmdlets</a>
* <a href="http://blogs.technet.com/b/heyscriptingguy/archive/2014/01/30/invoking-cim-methods-with-powershell.aspx" target="_blank">Scripting Guy Blog -Invoking CIM Methods with PowerShell</a>