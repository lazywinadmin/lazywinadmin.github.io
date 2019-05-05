---
layout: single
title: PowerShell - How to find running processes and their port number
excerpt: 
permalink: /2011/02/how-to-find-running-processes-and-their.html
tags: 
- networking
- powershell
- scripting
published: true
comments: true
---
The *netstat* command line utility displays protocol statistics and current TCP/IP network connections. If we want to display the associated process identifier (PID) of each process we add the `-o` parameter.

![image-center]({{ site.url }}/images/2011/20110215_How_to_find_running_processes_and_their_port_number/image_thumb_2576CA4D__161054948__-720x365.png){: .align-center}

This filter the result we need to pipe to the `Find.exe` utility and again, the result is text!.

In PowerShell we can get the same information with the following command, however the process PID is missing and the connections in `LISTENING` state are not included by default.

```powershell
PS > [System.Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties().GetActiveTcpConnections()
```

With the `Get-NetworkStatistics` function we can get the same information but each returned connection is an object.

`Get-NetworkStatistics` parses only TCP/UDP connections (entries that starts with `[::` are ignored). Each connection is divided into two columns.

For example, if the `Local Address` column has a value of `0.0.0.0:80` the IP address will be shown in the LocalAddress property (e.g 0.0.0.0) and the port number in the LocalPort property (e.g 80).

The name of each process is also added to the result. This should make filtering much more easier when we pipe the result to the [Where-Object](http://go.microsoft.com/fwlink/?LinkID=113423) cmdlet, allowing us to filter on any property of a connection.

```powershell
function Get-NetworkStatistics
{
 $properties = 'Protocol','LocalAddress','LocalPort'
 $properties += 'RemoteAddress','RemotePort','State','ProcessName','PID'

 netstat -ano |Select-String-Pattern '\s+(TCP|UDP)' | ForEach-Object {

 $item = $_.line.split(" ",[System.StringSplitOptions]::RemoveEmptyEntries)

 if($item[1] -notmatch '^\[::')
 {
 if (($la = $item[1] -as [ipaddress]).AddressFamily -eq 'InterNetworkV6')
 {
 $localAddress = $la.IPAddressToString
 $localPort = $item[1].split('\]:')[-1]
 }
 else
 {
 $localAddress = $item[1].split(':')[0]
 $localPort = $item[1].split(':')[-1]
 }

 if (($ra = $item[2] -as [ipaddress]).AddressFamily -eq 'InterNetworkV6')
 {
 $remoteAddress = $ra.IPAddressToString
 $remotePort = $item[2].split('\]:')[-1]
 }
 else
 {
 $remoteAddress = $item[2].split(':')[0]
 $remotePort = $item[2].split(':')[-1]
 }

New-ObjectPSObject -Property @{
 PID = $item[-1]
 ProcessName = (Get-Process-Id $item[-1] -ErrorAction SilentlyContinue).Name
 Protocol = $item[0]
 LocalAddress = $localAddress
 LocalPort = $localPort
 RemoteAddress =$remoteAddress
 RemotePort = $remotePort
 State = if($item[0] -eq 'tcp') {$item[3]} else {$null}
 } |Select-Object-Property $properties
 }
 }
}
```

```powershell
Get-NetworkStatistics |Format-Table
```

![image-center]({{ site.url }}/images/2011/20110215_How_to_find_running_processes_and_their_port_number/image_thumb_147D9573__300040902__-722x413.png){: .align-center}

To get all processes running on a local port 80:

![image-center]({{ site.url }}/images/2011/20110215_How_to_find_running_processes_and_their_port_number/image_thumb_45EDE432__1624800143__-717x114.png){: .align-center}

Or find a connection information by filtering on ProcessName:

![image-center]({{ site.url }}/images/2011/20110215_How_to_find_running_processes_and_their_port_number/image_thumb_5DB11380__591248035__-724x139.png){: .align-center}