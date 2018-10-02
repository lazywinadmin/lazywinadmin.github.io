---
layout: single
title: Powershell - Get-USB
excerpt: 
permalink: /2011/06/powershell-get-usb.html
tags: 
- powershell
- scripting
- usb
published: true
comments: true
---

```
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

