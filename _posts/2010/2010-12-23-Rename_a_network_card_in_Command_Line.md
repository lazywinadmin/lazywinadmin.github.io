---
layout: single
title: Rename a network card in Command Line
description: "How to rename a network interface from the default Local Area Connection to a custom name such as VLAN10 with netsh, for automated server deployment."
excerpt: 
permalink: /2010/12/rename-network-card-in-command-line.html
tags:
- command line
- networking
published: true
comments: true
---

Last week I was working on [HP RDP (Rapid Deployment Pack)](https://web.archive.org/web/20091227061104/http://h20000.www2.hp.com/bizsupport/TechSupport/Home.jsp?lang=en&cc=us&prodTypeId=18964&prodSeriesId=332359) where I want to automate the deployment of new server.

One of the task I wanted to do was: Renaming a Network Interface. As you probably know it, by default: "Local Area Connection" or "Local Area Connection 2". But I wanted to put some custom name, such as "VLAN10". I was able to resolve this problem with `netsh`.

Here is the useful command:

```
netsh interface set interface name="Local Area Connection" newname="ExampleLan"
```