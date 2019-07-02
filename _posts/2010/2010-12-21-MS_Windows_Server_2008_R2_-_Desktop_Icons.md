---
layout: single
title: MS Windows Server 2008 R2 - Adding the desktop icons back
excerpt: 
permalink: /2010/12/ms-windows-server-2008-r2-desktop-icons.html
tags:
  - 'windows server 2008 r2'
published: true
comments: true
---

Have you noticed that you cannot add the desktop icons (Computer, Network, etc.) to your Windows Server 2008 R2 desktop? Am I the only one who is annoyed by this? If not, here's how to get them back.

First, you'll have to go into `Server Manager` and access the `Features` section. In Features, you will select to `add a feature` and then select the `Desktop Experience` feature. Once added, you will have to **reboot** the server. That's right! A reboot is required to add icons to your desktop.

Now this is really insane. Think about it. You can add your own icons for shortcuts on the desktop, but to get Computer and Network, you have to add the entire Desktop Experience feature. What a ridiculous decision Microsoft made here...

Once you've rebooted the server, simply right-click on the Desktop and select `Personalize`. From here, you can add the desktop icons you desire as usual.
