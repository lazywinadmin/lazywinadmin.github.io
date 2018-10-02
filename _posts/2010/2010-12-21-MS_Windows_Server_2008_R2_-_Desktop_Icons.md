---
layout: single
title: MS Windows Server 2008 R2 - Desktop Icons
excerpt: 
permalink: /2010/12/ms-windows-server-2008-r2-desktop-icons.html
tags: Windows Server 2008 R2
published: true
comments: true
---
<div style="background-attachment: initial; background-clip: initial; background-color: white; background-image: initial; background-origin: initial; background-position: initial initial; background-repeat: initial initial; font: normal normal normal 13px/19px Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; margin-top: 0px; padding-bottom: 0.6em; padding-left: 0.6em; padding-right: 0.6em; padding-top: 0.6em;">Have you noticed that you cannot add the desktop icons (Computer, Network, etc.) to your Windows Server 2008 R2 desktop? Am I the only one who is annoyed by this? If not, here's how to get them back.

First, you'll have to go into Server Manager and access the Features section. In Features, you will select to add a feature and then select the Desktop Experience feature. Once added, you will have to reboot the server. That's right! A reboot is required to add icons to your desktop.

Now this is really insane. Think about it. You can add your own icons for shortcuts on the desktop, but to get Computer and Network, you have to add the entire Desktop Experience feature. What a ridiculous decision Microsoft made here.

Now that I've expressed my suffering, we shall move on.
Once you've rebooted the server, simply right-click on the Desktop and select Personalize. From here, you can add the desktop icons you desire as usual.

OK. I'm over it now, but it's still ridiculous.
