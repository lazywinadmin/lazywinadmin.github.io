---
description: "function Get-USB { <# .Synopsis Gets USB devices attached to the system .Description Uses WMI to get the USB Devices attached to the system .Example Get-USB…"
layout: single
title: Powershell - Get-USB
excerpt: 
permalink: /2011/06/powershell-get-usb.html
tags:
- powershell
- inventory
published: true
comments: true
---

```powershell
function Get-USB {
    <#
    .Synopsis
        Gets USB devices attached to the system
    .Description
        Uses WMI to get the USB Devices attached to the system
    .Example
        Get-USB
    .Example
        Get-USB | Group-Object Manufacturer  
    .Parameter ComputerName
        The name of the computer to get the USB devices from
    #>
    param($computerName = "localhost")
    Get-WmiObject Win32_USBControllerDevice -ComputerName $ComputerName `
        -Impersonation Impersonate -Authentication PacketPrivacy | 
        Foreach-Object { [Wmi]$_.Dependent }
}
```

{% capture wmicimupdate %}
**Update 2026/11:** `Get-WmiObject` was removed in PowerShell 6 and later. The function above is unchanged. This sample is not a straight `Get-CimInstance` swap: it also uses the WMI type accelerator `[Wmi]` on the association's `Dependent` path, plus DCOM-only `-Impersonation` and `-Authentication PacketPrivacy` (those are not parameters of `Get-CimInstance`). `Win32_USBControllerDevice` is an association class (`CIM_USBController` antecedent, `CIM_LogicalDevice` dependent). In CIM, start from `Win32_USBController` and follow the association with `Get-CimAssociatedInstance`. Session authentication, if you need it, goes on `New-CimSession -Authentication` (and its values are not the WMI PacketPrivacy level).
{% endcapture %}
{{wmicimupdate}}{: .notice--info}

```powershell
function Get-USB {
    param($computerName = "localhost")
    Get-CimInstance -ClassName Win32_USBController -ComputerName $ComputerName |
        ForEach-Object { Get-CimAssociatedInstance -InputObject $_ -Association Win32_USBControllerDevice }
}
```

