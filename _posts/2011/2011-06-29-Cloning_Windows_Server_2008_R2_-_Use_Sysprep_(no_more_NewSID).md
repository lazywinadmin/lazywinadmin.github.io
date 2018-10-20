---
layout: single
title: Cloning Windows Server 2008 R2 - Use Sysprep (no more NewSID)
excerpt: 
permalink: /2011/06/cloning-windows-server-2008-r2-use.html
tags: 
- cloning
- microsoft
- newsid
- sysprep
- virtualization
- windows server 2008 r2
published: true
comments: true
---
[Source](http://www.rayheffer.com/619/cloning-windows-server-2008-r2-use-sysprep-no-more-newsid/)

<span class="Apple-style-span" style="background-color: #647e97; font-family: 'trebuchet ms', arial, helvetica, sans-serif;">
<div style="font-size: 10pt; padding-bottom: 10px; padding-left: 0px; padding-right: 0px; padding-top: 10px;"><a href="{{ site.url }}/images/2011/20110629_Cloning_Windows_Server_2008_R2_-_Use_Sysprep_(no_more_NewSID)/sysprep__1246990109__-1024x768.jpg" rel="lightbox[619]" style="color: #0099ff; text-decoration: none;" title="Sysprep on Windows Server 2008 R2"><img alt="Sysprep on Windows Server 2008 R2" class="alignleft size-medium wp-image-625" height="144" src="{{ site.url }}/images/2011/20110629_Cloning_Windows_Server_2008_R2_-_Use_Sysprep_(no_more_NewSID)/sysprep-300x225__1181149541__-300x225.jpg" style="border-bottom-style: none; border-color: initial; border-left-style: none; border-right-style: none; border-top-style: none; border-width: initial; float: left; margin-bottom: 1em; margin-left: 0px; margin-right: 1em; margin-top: 0px;" title="Sysprep on Windows Server 2008 R2" width="192" /></a>It is not uncommon for system administrators to clone virtual servers or take an image of physical servers running Windows Server 2008 these days. There are plenty of tools to do that these days (Ghost, Acronis, Platespin for P2V conversions,etc.) If this is something you do regularly then you won't be unfamiliar with Sysprep or NewSID, but according to<a href="http://blogs.technet.com/b/markrussinovich/archive/2009/11/03/3291024.aspx" style="color: #0099ff; text-decoration: none;" target="_blank">Mark Russinovich</a>at Microsoft, the SID doesn't matter and Sysinternals have now retired NewSID (written by Mark). NewSID isn't supported in Windows Server 2008 and the only option now is to use Sysprep. Whilst the facts presented on Mark's blog are correct, I have personally seen many issues cloning or imaging Windows Server 2008 machines that haven't been cloned with Sysprep first. Let me present a typical scenario that would cause problems here.



<span id="more-619">
Scenario:<div style="font-size: 10pt; padding-bottom: 10px; padding-left: 0px; padding-right: 0px; padding-top: 10px;">1) Build a Windows Server 2008 R2 server, apply patches and various tweaks.
2) Shutdown the server and take an image (or clone it to a virtual machine template). Note: I haven't used Sysprep!
3) Deploy two new servers from the image or template. Promote one to a domain controller and add the other one to the domain as a member server.<div style="font-size: 10pt; padding-bottom: 10px; padding-left: 0px; padding-right: 0px; padding-top: 10px;">In this scenario the first problem I would encounter is that anydomain users that are a member of Domain Admins will not have the appropriate permissions to access PowerShell or Computer Management. The default Administrator account would work fine.Secondly, if I try and ping the domain controller I would get the following error:<blockquote style="border-bottom-color: rgb(6, 6, 6); border-bottom-style: solid; border-bottom-width: 1px; border-left-color: rgb(6, 6, 6); border-left-style: solid; border-left-width: 1px; border-right-color: rgb(6, 6, 6); border-right-style: solid; border-right-width: 1px; border-top-color: rgb(6, 6, 6); border-top-style: solid; border-top-width: 1px; font-style: italic; margin-bottom: 5px; margin-left: 15px; margin-right: 10px; margin-top: 10px; padding-bottom: 0px; padding-left: 15px; padding-right: 15px; padding-top: 0px;"><div style="font-size: 10pt; padding-bottom: 10px; padding-left: 0px; padding-right: 0px; padding-top: 10px;">C:\Users\User1>ping LAB-DC01
Unable to contact IP driver. General failure.</blockquote><div style="font-size: 10pt; padding-bottom: 10px; padding-left: 0px; padding-right: 0px; padding-top: 10px;">So the SID<span style="text-decoration: underline;">really doesmatter. Prior to taking your clone or image, just remember to use Sysprep as follows:<div style="font-size: 10pt; padding-bottom: 10px; padding-left: 0px; padding-right: 0px; padding-top: 10px;">1) Run Sysprep (on Windows Server 2008 this is located in c:\Windows\System32\Sysprep\Sysprep.exe)
2) Ensure 'System Out-of-Box Experience (OOBE)' is selected
3) Tick the 'Generalize' option (this resets the SID)
4) Select 'Shutdown' from the Shutdown Options.
5) Once the machine has shutdown, take your image and you are good to go!
