---
layout: single
title: How to find running processes and their port number
excerpt: 
permalink: /2011/02/how-to-find-running-processes-and-their.html
tags: 
- networking
- powershell
- scripting
published: true
comments: true
---
<div class="gmail_quote"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;">
<div style="margin-bottom: 20px; margin-left: 0px; margin-right: 0px; margin-top: 0px;"><h1 style="color: #529e00; font-family: Tahoma, Arial, Helvetica; font-size: 1.8em; font-weight: bold; margin-bottom: 20px; margin-top: 0px;"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;"><span style="color: black; font-size: 13px; font-weight: normal;">[Source](http://blogs.microsoft.co.il/blogs/scriptfanatic/archive/2011/02/10/How-to-find-running-processes-and-their-port-number.aspx)

<h1 style="color: #529e00; font-family: Tahoma, Arial, Helvetica; font-size: 1.8em; font-weight: bold; margin-bottom: 20px; margin-top: 0px;"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;"><span style="color: black; font-size: 13px; font-weight: normal;">The<i>netstat</i>command line utility displays protocol statistics and current TCP/IP network connections. If we want to display the associated process identifier (PID) of each process we add the -o parameter.

<div style="color: black;"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;"><a href="{{ site.url }}/images/2011/20110215_How_to_find_running_processes_and_their_port_number/image_31A86A41__1018426679__-677x342.png" style="color: #00477f;" target="_blank"><img alt="image" border="0" height="324" src="{{ site.url }}/images/2011/20110215_How_to_find_running_processes_and_their_port_number/image_thumb_2576CA4D__161054948__-720x365.png" style="border-bottom-color: initial; border-bottom-style: initial; border-bottom-width: 0px; border-left-color: initial; border-left-style: initial; border-left-width: 0px; border-right-color: initial; border-right-style: initial; border-right-width: 0px; border-top-color: initial; border-top-style: initial; border-top-width: 0px; display: inline; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; margin-top: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px;" title="image" width="640" /></a><div style="color: black;"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;">To filter the result we need to pipe to the<i>Find</i>utility and again, the result is text!. In<a href="http://www.microsoft.com/PowerShell" style="color: #00477f;" target="_blank">PowerShell</a>we can get the same information with the following command, however the process PID is missing and the connections in LISTENING state are not included by default.<div style="color: black;"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;">PS > [System.Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties().GetActiveTcpConnections()<div style="color: black;"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;">With the<i>Get-NetworkStatistics</i>function we can get the same information but each returned connection is an object.<i>Get-NetworkStatistics</i>parses only TCP/UDP connections (entries that starts with '[::' are ignored). Each connection is divided into two columns. For example, if the 'Local Address' column has a value of '<a href="http://0.0.0.0/" target="_blank">0.0.0.0:80</a>' the IP address will be shown in the LocalAddress property (e.g 0.0.0.0) and the port number in the LocalPort property (e.g 80). The name of each process is also added to the result. This should make filtering much more easier when we pipe the result to the<a href="http://go.microsoft.com/fwlink/?LinkID=113423" style="color: #00477f;" target="_blank">Where-Object</a>cmdlet, allowing us to filter on any property of a connection.<div style="color: black;"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;"><strong>UPDATE</strong>: Added support for IPv6 connections.<a href="http://twitter.com/xcud" style="color: #00477f;" target="_blank">@xcud</a>and surveyor, thanks for the input!<div style="color: black;"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;">

<pre class="brush: powershell; ruler: true; first-line: 1; highlight: [2, 4, 6]"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;">function Get-NetworkStatistics
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
<span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;">Get-NetworkStatistics |Format-Table 
<pre style="color: black;"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;"><a href="{{ site.url }}/images/2011/20110215_How_to_find_running_processes_and_their_port_number/image_0D6E7EC8__1656586924__-997x570.png" style="color: #00477f;" target="_blank"><img alt="image" border="0" height="413" src="{{ site.url }}/images/2011/20110215_How_to_find_running_processes_and_their_port_number/image_thumb_147D9573__300040902__-722x413.png" style="border-bottom-width: 0px; border-left-width: 0px; border-right-width: 0px; border-top-width: 0px; display: inline; padding-left: 0px; padding-right: 0px; padding-top: 0px;" title="image" width="722" /></a>
```
<div style="color: black;"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;">To get all processes running on a local port 80:<div style="color: black;"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;"><a href="{{ site.url }}/images/2011/20110215_How_to_find_running_processes_and_their_port_number/image_35C21C39__160590569__-997x154.png" style="color: #00477f;" target="_blank"><img alt="image" border="0" height="114" src="{{ site.url }}/images/2011/20110215_How_to_find_running_processes_and_their_port_number/image_thumb_45EDE432__1624800143__-717x114.png" style="border-bottom-color: initial; border-bottom-style: initial; border-bottom-width: 0px; border-left-color: initial; border-left-style: initial; border-left-width: 0px; border-right-color: initial; border-right-style: initial; border-right-width: 0px; border-top-color: initial; border-top-style: initial; border-top-width: 0px; display: inline; padding-left: 0px; padding-right: 0px; padding-top: 0px;" title="image" width="717" /></a><div style="color: black;"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;">Or find a connection information by filtering on ProcessName:<div style="color: black;"><span style="font-family: 'trebuchet ms', sans-serif;"><span style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;"><a href="{{ site.url }}/images/2011/20110215_How_to_find_running_processes_and_their_port_number/image_41D00455__782723866__-997x185.png" style="color: #00477f;" target="_blank"><img alt="image" border="0" height="139" src="{{ site.url }}/images/2011/20110215_How_to_find_running_processes_and_their_port_number/image_thumb_5DB11380__591248035__-724x139.png" style="border-bottom-color: initial; border-bottom-style: initial; border-bottom-width: 0px; border-left-color: initial; border-left-style: initial; border-left-width: 0px; border-right-color: initial; border-right-style: initial; border-right-width: 0px; border-top-color: initial; border-top-style: initial; border-top-width: 0px; display: inline; padding-left: 0px; padding-right: 0px; padding-top: 0px;" title="image" width="724" /></a>
