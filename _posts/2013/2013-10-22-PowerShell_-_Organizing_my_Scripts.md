---
layout: single
title: PowerShell - Organizing my Scripts
excerpt: 
permalink: /2013/10/powershell-organizing-my-scripts.html
tags: 
- folder
- naming convention
- organizing
- powershell
- skydrive
- version control
published: true
comments: true
---


<a href="http://2.bp.blogspot.com/-X2nYTJy-2Ok/UmdEDJ613bI/AAAAAAABeRI/nK0iWCMhx6Y/s1600/2013-10-22+11-35-10+PM.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-X2nYTJy-2Ok/UmdEDJ613bI/AAAAAAABeRI/nK0iWCMhx6Y/s1600/2013-10-22+11-35-10+PM.png" /></a>With time, the number of PowerShell scripts I write keeps growing and growing, and I feel it is getting more and more difficult to find what I have done in the past. I won't say that all my scripts are great! Especially when I look at the scripts I wrote back in 2010/2011 or even 2012. I'm really happy to see the evolution as I keep learning about PowerShell. And honestly ... I think it is really fun to update old scripts, and it is always a good topic for a new blog post.

Today I will talk about my scripts directory, how I maintain it, which naming convention I use, what are my bottlenecks, my preferences ...





### <b>Naming Convention</b>

Personally I organize my directories this way:
<span style="font-family: Courier New, Courier, monospace;"><TECHNOLOGY>-<CATEGORY>-<EXPLICIT_TITLE>
<b>
</b><b><u>For example, you would get those kind of folders for my scripts</u>:</b>
<span style="font-family: Courier New, Courier, monospace;">AD-SITE-Find_Missing_subnets
<span style="font-family: Courier New, Courier, monospace;">AD-COMPUTER-Windows_Server_2012
<span style="font-family: Courier New, Courier, monospace;">VMWARE-HOSTS-Resources_Report
<span style="font-family: Courier New, Courier, monospace;">EXCHANGE-MAILBOX-Top_100_user

<b><u>For my functions</u></b> I have different standard, I had the prefix FUNCT, so those can be reused in other scripts (Dot Sourcing, mostly).
<span style="font-family: Courier New, Courier, monospace;">FUNCT-AD-SITE-Get-Subnets
<span style="font-family: Courier New, Courier, monospace;">FUNCT-AD-SITE-Set-Subnets
<span style="font-family: Courier New, Courier, monospace;">FUNCT-VMWARE-VM-Enable-CopyPaste
<span style="font-family: Courier New, Courier, monospace;">FUNCT-VMWARE-VM-Disable-CopyPaste


### <b>Other preferences</b>


* Keep the script in one place! That's why I use SkyDrive (see below), easier to maintain when you access your scripts from different devices/locations.

* I don't like space, I never use space in the name of a folder or a script, always use the underscore "_" or a dash "-" characters.

* Instead of using files, I prefer to use folders for each script or function, especially if I want to keep track of different versions. Also Some scripts might need some XML config file, CSV file input etc... or just because your script is a project of multiple PowerShell script/functions files.


### <b>BottleNecks/Missing items</b>


* Versioning/Version Control

* I did not play with any solution yet, it would be great to have tool that can do the tracking job for me

* Collaboration Tool

* I would like something like Google Docs where you see what each people are doing/typing, and obviously a solution that would support PowerShell files...


<b><u style="background-color: yellow;">No</u><u style="background-color: yellow;">te:</u></b><span style="background-color: yellow;"> I would be interested to hear how you guys get your scripts organized, I'm always looking for ways to improve my folders names and structures.AlsoI did not look into version control solutions yet, if you have tried any let me know.

<a href="http://4.bp.blogspot.com/-45QW1CoMRec/UmckjBRSW9I/AAAAAAABeOo/HX_Dlprqd4c/s1600/2013-10-22+9-09-20+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-45QW1CoMRec/UmckjBRSW9I/AAAAAAABeOo/HX_Dlprqd4c/s1600/2013-10-22+9-09-20+PM.png" /></a>



### SkyDrive

I store all my scripts on Skydrive, Windows 8.1 comes with it !
<b>Plus</b>, Skydrive allows you to edit your file online! Pure Awesomeness! :-)
The only things missing are: We can't embed the files to another website, No version control unless you use the Pro version, No live collaboration tool.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://4.bp.blogspot.com/-7espuZJmuh4/UmcUShp7hII/AAAAAAABeOQ/1WOQabtwQeU/s1600/2013-10-22+8-09-45+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://4.bp.blogspot.com/-7espuZJmuh4/UmcUShp7hII/AAAAAAABeOQ/1WOQabtwQeU/s1600/2013-10-22+8-09-45+PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">YES! you can edit your script right into the browser! :-)</td></tr></tbody></table>


