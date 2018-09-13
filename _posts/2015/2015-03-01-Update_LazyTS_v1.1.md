---
layout: single
title: Update - LazyTS v1.1
excerpt: 
permalink: /2015/03/lazyts-11-update.html
tags: 
- gui
- lazyts
- powershell
- sapien
- sapien powershell studio 2015
published: true
comments: true
---


<a href="{{ site.url }}/images/2015/20150301_Update_LazyTS_v1.1/LazyTS-Highlight__1728965691__-740x387.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150301_Update_LazyTS_v1.1/LazyTS-Highlight__1728965691__-740x387.png" height="104" width="200" /></a>I found some time over the week-end to fix some bugs and add a few things to <b>LazyTS</b>. You'll now be able to quickly search though the displayed data using the small highlight util and open a Remote Desktop connection using the Shadow feature (View and Control)

See <a href="http://blogs.technet.com/b/askperf/archive/2013/10/22/windows-8-1-windows-server-2012-r2-rds-shadowing-is-back.aspx" target="_blank">this link</a> for more information about RDP Shadow.

# LazyTS

LazyTS is a PowerShell script to manage Sessions and Processes on local or remote machines. It also allows you to Disconnect/Stop sessions and Send Interactive message to one or more sessions.

This tool is using the module PSTerminalService which relies on the Cassia .NET Library.I used Sapien PowerShell Studio 2014 to which make life easier if you want to start building WinForms tools and add PowerShell code. 

## Version 1.1

Apart of a couple of bugs fixes and minor changes:

* Two new features:
  * Highlight tool
  * Remote Desktop Shadow
* Big fixes:
  * 2015/03/04 Update: Fixed issue when using RDP Shadow and getting the error `This computer name is invalid`
  * 2015/03/02 Update: Fixed a small issue where you got the following message : `Exception setting "Item": "Exception calling "Set_Item" with "2" argument(s): "Cannot set Column 'CurrentTime' to be null. Please use DBNull instead.` This was related to an issue with `ConvertTo-DataTable`

### Highlight tool

You can easily search for a string in the displayed data

<a href="{{ site.url }}/images/2015/20150301_Update_LazyTS_v1.1/LazyTS-Highlight__1728965691__-740x387.png" imageanchor="1" style="margin-left: auto; margin-right: auto;">
  <img border="0" src="{{ site.url }}/images/2015/20150301_Update_LazyTS_v1.1/LazyTS-Highlight__1728965691__-740x387.png" height="332" width="640" />
</a>

### Remote Desktop Shadow

Allows you to View or Control a specific session.
By default it requires the user to accept your request. (this can be changed using a group policy object)

<a href="{{ site.url }}/images/2015/20150301_Update_LazyTS_v1.1/LazyTS-RDP_Shadow__873050890__-740x387.png" imageanchor="1" style="margin-left: auto; margin-right: auto;">
  <img border="0" src="{{ site.url }}/images/2015/20150301_Update_LazyTS_v1.1/LazyTS-RDP_Shadow__873050890__-740x387.png" height="334" width="640" />
</a>

## Download

This tool can be download from the [Github page](https://github.com/lazywinadmin/LazyTS/releases).

## Feature requests and Bug report

I also want to thank those who are sending me features request and reporting bugs ! This is greatly helpful !!! Merci!!

Here is the issue page: https://github.com/lazywinadmin/LazyTS/issues