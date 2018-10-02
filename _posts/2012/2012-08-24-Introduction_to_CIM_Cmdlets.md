---
layout: single
title: Introduction to CIM Cmdlets
excerpt: 
permalink: /2012/08/introduction-to-cim-cmdlets.html
tags: 
- powershell 3.0
- windows 8
- windows server 2012
published: true
comments: true
---
Great article from the Powershell team blog:

<a href="http://blogs.msdn.com/b/powershell/archive/2012/08/24/introduction-to-cim-cmdlets.aspx" target="_blank">Introduction to CIM Cmdlets</a>

PowerShell 3.0 shipping with Windows server 2012 and Windows 8 brings a new set of Cmdlets to manage any server or device that complies with CIM and WS-Man standards defined by DMTF. In this blog post we will explore these new Cmdlets and how can they help IT Pros in managing a datacenter.
The list of new Cmdlets is given in the table below:    
<table border="1" cellpadding="0" cellspacing="0" style="width: 668px;"><tbody><tr>         <td valign="top" width="205"><b>Cmdlet</b></td>          <td valign="top" width="461"><b>Purpose</b></td>       </tr><tr>         <td valign="top" width="205">Get-CimInstance</td>          <td valign="top" width="461">Gets instances of a class.</td>       </tr><tr>         <td valign="top" width="205">New-CimInstance</td>          <td valign="top" width="461">Creates a new instance of a class.</td>       </tr><tr>         <td valign="top" width="205">Remove-CimInstance</td>          <td valign="top" width="461">Removes one of more instances of a class.</td>       </tr><tr>         <td valign="top" width="205">Set-CimInstance</td>          <td valign="top" width="461">Modifies one or more instances of a class.</td>       </tr><tr>         <td valign="top" width="205">Get-CimAssociatedInstance</td>          <td valign="top" width="461">Gets all the associated instances for a particular instance.</td>       </tr><tr>         <td valign="top" width="205">Invoke-CimMethod</td>          <td valign="top" width="461">Invokes instance or static method of a class.</td>       </tr><tr>         <td valign="top" width="205">Get-CimClass</td>          <td valign="top" width="461">Gets class schema of a CIM class.</td>       </tr><tr>         <td valign="top" width="205">Register-CimIndicationEvent</td>          <td valign="top" width="461">Helps subscribe to events.</td>       </tr><tr>         <td valign="top" width="205">New-CimSession</td>          <td valign="top" width="461">Creates a CIM Session with local or a remote machine</td>       </tr><tr>         <td valign="top" width="205">Get-CimSession</td>          <td valign="top" width="461">Gets a list of CIM Sessions that have been made.</td>       </tr><tr>         <td valign="top" width="205">Remove-CimSession</td>          <td valign="top" width="461">Removes CimSessions that are there on a machine.</td>       </tr><tr>         <td valign="top" width="205">New-CimSessionOption</td>          <td valign="top" width="461">Creates a set of options that can be used while creating a CIM session.</td></tr></tbody></table>

### Basic terminology

If you are already familiar with terms like WMI, CIM, WinRM and WS-Man, you can skip this section.
<b>CIM</b>: Common Information Model (CIM) is the DMTF standard [DSP0004] for describing the structure and behavior of managed resources such as storage, network, or software components.
<b>WMI</b>: Windows Management Instrumentation (WMI) is a CIM server that implements the CIM standard on Windows. 
<b>WS-Man</b>: WS-Management (WS-Man) protocol is a SOAP-based, firewall-friendly protocol for management clients to communicate with CIM servers.
<b>WinRM:</b> Windows Remote Management (WinRM) is the Microsoft implementation of the WS-Man protocol on Windows.


### <a href="http://blogs.msdn.com/b/powershell/archive/2012/08/24/introduction-to-cim-cmdlets.aspx" style="font-size: medium; font-weight: normal;" target="_blank">Introduction to CIM Cmdlets</a> 


