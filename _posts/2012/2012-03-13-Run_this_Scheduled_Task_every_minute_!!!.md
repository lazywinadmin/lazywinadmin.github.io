---
layout: single
title: Run this Scheduled Task every minute !!!
excerpt: 
permalink: /2012/03/run-this-task-every-minute.html
tags: 
- task scheduler
- windows server 2008 r2
published: true
comments: true
---
<a href="{{ site.url }}/images/2012/20120313_Run_this_Scheduled_Task_every_minute_!!!/Task-Scheduler__1187729876__-129x141.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2012/20120313_Run_this_Scheduled_Task_every_minute_!!!/Task-Scheduler__1187729876__-129x141.png" /></a>
Description
This is a weird one... This post will show you how to configure a Scheduled task every single minute.

By default on Microsoft Windows Server 2008 R2, You have the options to run a task every:<span style="font-family: 'Courier New', Courier, monospace;">"5 minutes",<span style="font-family: 'Courier New', Courier, monospace;">"10 minutes",<span style="font-family: 'Courier New', Courier, monospace;">"15 minutes",<span style="font-family: 'Courier New', Courier, monospace;">"30 minutes",<span style="font-family: 'Courier New', Courier, monospace;">"1 hour".

How to Schedule a task to run every minute ?
Today I was configuring a new<i> Scheduled task</i> on Windows Server 2008 R2. In my case i wanted the task to run every minute...

<u><b>Using the CLI</b></u>
I know this is easily possible using the tool <i><b>Schtasks.exe </b></i>
The command would look like something like that

<span style="font-family: Courier New, Courier, monospace;">schtasks /create /sc minute /mo 1 /tn "Hello World" /tr \\Server\scripts\helloworld.vbs
<i><b>
</b></i><i>See Technet: <a href="http://technet.microsoft.com/en-us/library/cc725744%28v=ws.10%29.aspx" target="_blank">Schtasks.exe</a>for more details.</i>

<b><u>Using the GUI</u></b>
I realize that i couldn't set the task to repeat under 5 minutes ;-(

So here is <b><u>the trick</u></b>:

* Edit the Trigger of your task. And as you can see ... nothing below 5 minutes :-(

<a href="{{ site.url }}/images/2012/20120313_Run_this_Scheduled_Task_every_minute_!!!/TaskScheduler-5minutes-c__537366515__-594x509.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="340" src="{{ site.url }}/images/2012/20120313_Run_this_Scheduled_Task_every_minute_!!!/TaskScheduler-5minutes-c__2146880799__-400x343.png" width="400" /></a>

* I realized the <i>Repeat Task Every</i>'s Textbox could be edited... All you need to do is to set the value to "<u>1 minute</u>" manually, (manually type "1 minutes") and press OK. VOILA! :-)

<a href="{{ site.url }}/images/2012/20120313_Run_this_Scheduled_Task_every_minute_!!!/TaskScheduler-1Minute-a__1304695560__-594x506.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="340" src="{{ site.url }}/images/2012/20120313_Run_this_Scheduled_Task_every_minute_!!!/TaskScheduler-1Minute-a__1670170967__-400x341.png" width="400" /></a>
Verifying your Trigger settings

Here you can see the task repeat every minute.

<a href="{{ site.url }}/images/2012/20120313_Run_this_Scheduled_Task_every_minute_!!!/TaskScheduler-1Minute-b__1604341881__-634x471.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="295" src="{{ site.url }}/images/2012/20120313_Run_this_Scheduled_Task_every_minute_!!!/TaskScheduler-1Minute-b__1209500685__-400x297.png" width="400" /></a><a href="http://4.bp.blogspot.com/-xArIkCG11jE/T1-0Z41YBYI/AAAAAAABCB0/pNHv3gPiNy8/s1600/3-13-2012+4-53-20+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;">
</a>