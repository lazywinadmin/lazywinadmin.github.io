---
layout: single
title: Rename a network card in Command Line
excerpt: 
permalink: /2010/12/rename-network-card-in-command-line.html
tags: 
- batch
- scripting
published: true
comments: true
---
<p>Last week i was working on [HP RDP (Rapid Deployment Pack)](http://h20000.www2.hp.com/bizsupport/TechSupport/Home.jsp?lang=en&amp;cc=us&amp;prodTypeId=18964&amp;prodSeriesId=332359), we want to automate the deployment of new server (Mainly Physical, and some Virtual) <p>I was looking for a way to rename an network Interface, by default: "Local Area Connection" or "Local Area Connection 2". Here is the useful command: <p><font color="#008000" face="Lucida Console">netsh interface set interface name="Local Area Connection" newname="ExampleLan"</font></p>  
