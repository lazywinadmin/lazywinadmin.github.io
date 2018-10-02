---
layout: single
title: The Simplest Way to Create a Bootable Windows Server 2012 or Windows 8 USB Key
excerpt: 
permalink: /2013/03/the-simplest-way-to-create-bootable.html
tags: 
- bootable
- homelab
- lab
- usb
- windows 7
- windows 8
- windows 8.1
- windows server 2012
- windows server 2012 r2
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USB_Thumb_Drive_1__1900855501__-250x191.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USB_Thumb_Drive_1__149781108__-200x153.png" height="152" width="200" /></a>After I passed my VCP510-DV last week, I wanted to rebuild my Home Lab using Windows Server 2012 for the Storage part, instead of FreeNas.

Part of the rebuild, I needed to install Windows Server 2012 on top of the old FreeNas box. Hard task since I don't have a DVD player in the case... :-/

Hence, USB Boot it is...

I wassurpriseto see how easy it is to create a Bootable Windows Server 2012 (R1 or R2)/Windows 8/8.1 USB Key.

<u>What do you need:</u>


* <a href="https://wudt.codeplex.com/" target="_blank">Windows 7 USB/Download Tool</a>(2MB)

* ISO of Windows Server 2012 or Windows 8 (Mine is from TechNet)



<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USBboot01__1998209990__-76x115.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USBboot01__1998209990__-76x115.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><span style="font-size: small;">Once Installed, Launch Windows 7 USB/Download Tool</td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USBboot02__1585171221__-568x300.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USBboot02__132302406__-400x211.png" height="211" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><span style="font-size: small;">The first step is to select your ISO</td></tr></tbody></table>

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USBboot03__663133543__-568x300.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USBboot03__746511966__-400x211.png" height="211" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><span style="font-size: small;">Here, In my case I select <b>USB Device.</b></td></tr></tbody></table>

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USBboot04__1503532725__-568x300.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USBboot04__1447781380__-400x211.png" height="211" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><span style="font-size: small;">Select the USB Device where the BootMedia will be created, and
<span style="font-size: small;">s<span style="font-size: small;">elect <b style="font-size: medium;">BEGIN COPYING</b><span style="font-size: small;"> when you are ready.
<b style="font-size: medium;">THIS WILL FORMAT YOUR USB DEVICE</b></td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USBboot08__969497842__-568x300.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USBboot08__2131503335__-400x211.png" height="211" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><span style="font-size: small;">In my case this step last 5 minutes.</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USBboot09__1124278660__-568x300.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130305_The_Simplest_Way_to_Create_a_Bootable_Windows_Server_2012_or_Windows_8_USB_Key/USBboot09__1166174522__-400x211.png" height="211" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><span style="font-size: small;">And Voila! You now have a nice USB Bootable Key :-) with Windows Server 2012 loaded on it!!
If you wanna create another USB Bootable Key, just hit <b>Start Over</b></td></tr></tbody></table>

