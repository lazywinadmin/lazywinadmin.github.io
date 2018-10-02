---
layout: single
title: mRemoteNG - External Applications
excerpt: 
permalink: /2010/08/mremoteng-external-applications.html
tags: 
- mremote
- productivity
- scripting
published: true
comments: true
---
<a href="http://3.bp.blogspot.com/-17mc-8J-x7M/Ts6AUaM_buI/AAAAAAAA8L8/YkEsmdO2QaI/s1600/11-24-2011+12-30-22+PM.png" imageanchor="1" style="clear: right; float: right; margin-bottom: 1em; margin-left: 1em;"><img border="0" src="http://3.bp.blogspot.com/-17mc-8J-x7M/Ts6AUaM_buI/AAAAAAAA8L8/YkEsmdO2QaI/s1600/11-24-2011+12-30-22+PM.png" /></a><a href="http://4.bp.blogspot.com/-Dq_a6DzF4oQ/Ts6ARNbiV8I/AAAAAAAA8Ls/_w16t7MeGEI/s1600/11-24-2011+12-34-38+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-Dq_a6DzF4oQ/Ts6ARNbiV8I/AAAAAAAA8Ls/_w16t7MeGEI/s1600/11-24-2011+12-34-38+PM.png" /></a>
<a href="http://2.bp.blogspot.com/-cICoHzD6UgA/Ts6ATya5lNI/AAAAAAAA8L0/Cwsyr20d3y4/s1600/11-24-2011+12-31-39+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-cICoHzD6UgA/Ts6ATya5lNI/AAAAAAAA8L0/Cwsyr20d3y4/s1600/11-24-2011+12-31-39+PM.png" /></a>
<div class="MsoNormal" style="background: white; line-height: normal; margin: 0in 0in 10pt; mso-margin-bottom-alt: auto; mso-margin-top-alt: auto;"><span style="font-family: Trebuchet MS;"><b><span style="font-size: 10pt;"><span style="font-size: large;">Here is a list of the Applications you can add in your mRemote <i>External Applications</i></b><div class="MsoNormal" style="background: none repeat scroll 0% 0% white; line-height: normal; margin: 0in 0in 10pt;"><span style="font-family: Trebuchet MS;"><b><span style="font-size: 10pt;">Application:</b><span style="font-size: 10pt;"> Windows Computer Manager<i><span style="font-size: 10pt;"> </i><div class="MsoNormal" style="background: white; line-height: normal; margin: 0in 0in 10pt; mso-margin-bottom-alt: auto; mso-margin-top-alt: auto;"><i><span style="color: black; font-family: Trebuchet MS;"><span style="font-size: 10pt;">This will let you launch the Windows Computer Management MMC against the selected host. This MMC will let you view event logs, manage users, configure disks, manage services, and a whole bunch more. </i><span style="font-size: 10pt;">
<span style="font-family: Trebuchet MS;"><b>Filename:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">C:\windows\system32\compmgmt.msc
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">/Computer=%Hostname%<span style="font-size: 10pt;">

<span style="font-family: Trebuchet MS;"><b>Application:</b><a href="http://nmap.org/zenmap/"><span style="color: #105289; font-family: Trebuchet MS; font-size: 12pt;"><u>Zenmap GUI</u></a>
<span style="color: black; font-family: Trebuchet MS;"><span style="font-size: 10pt;">Zenmap is a GUI front-end for nmap. This is the standard port-scanning tool in use by anybody who knows the difference. Gives you all sorts of detail you won't find in the built-in port scanning tool.
<b>Filename:</b><span style="font-size: 10pt;"><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">C:\Program Files\Nmap\zenmap.exe
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">-p "Quick scan plus" -t %Hostname%<span style="font-size: 10pt;">

<span style="font-family: Trebuchet MS;"><b>Application:</b><a href="http://winscp.net/eng/download.php"><span style="color: #105289; font-family: Trebuchet MS; font-size: 12pt;"><u>WinSCP</u></a>
<span style="color: black; font-family: Trebuchet MS;"><span style="font-size: 10pt;">WinSCP is a great, free GUI Secure Copy program.
<b>Filename:</b><span style="font-size: 10pt;"><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">C:\Program Files\WinSCP\WinSCP.exe
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">scp://%Username%:%Password%@%Hostname%/<span style="font-family: Trebuchet MS;"><i></i><div class="MsoNormal" style="background: white; line-height: normal; margin: 0in 0in 10pt; mso-margin-bottom-alt: auto; mso-margin-top-alt: auto;"><b><span style="color: black; font-family: Trebuchet MS; font-size: 10pt;">Application:</b><span style="color: black; font-family: Trebuchet MS; font-size: 10pt;"><a href="http://filezilla-project.org/download.php"><span style="color: #105289; font-family: Trebuchet MS; font-size: 12pt;"><u>FileZilla FTP</u></a>
<span style="color: black; font-family: Trebuchet MS;"><span style="font-size: 10pt;">Free and open source FTP client for most platforms.
<b>Filename:</b><span style="font-size: 10pt;"><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">C:\Program Files\FileZilla FTP Client\filezilla.exe
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">ftp://%Username%:%Password%@%Hostname%<span style="font-size: 10pt;">

<span style="font-family: Trebuchet MS;"><b>Application:</b><a href="http://filezilla-project.org/download.php"><span style="color: #105289; font-family: Trebuchet MS; font-size: 12pt;"><u>FileZilla SFTP</u></a>
<span style="color: black; font-family: Trebuchet MS;"><span style="font-size: 10pt;">Same as above, but using the Secure FTP (SFTP) protocol.
<b>Filename:</b><span style="font-size: 10pt;"><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">C:\Program Files\FileZilla FTP Client\filezilla.exe
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">sftp://%Username%:%Password%@%Hostname%

<span style="font-family: Trebuchet MS;"><b>Application:</b> VMware Virtual Infrastructure Client
<i>This is specific to anybody managing a VMware vSphere or ESX environment. This will launch the VI client against the selected host. If the host is an ESX server, it will simply connect to the ESX server. If the host is a Windows machine running vCenter, it will attach to the full vCenter environment.</i>
<b>Filename:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">C:\Program Files\VMware\Infrastructure\Virtual Infrastructure Client\Launcher\VpxClient.exe
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="font-family: Lucida Console;">-s %Hostname% -u %Username% -p %Password%<div class="MsoNormal" style="background: white; line-height: normal; margin: 0in 0in 0pt;">
<div class="MsoNormal" style="background: white; line-height: normal; margin: 0in 0in 0pt;"><b><span style="color: black; font-family: Trebuchet MS;"><span style="font-size: 10pt;">Application:</b><span style="font-size: 10pt;"><span style="color: black; font-family: Trebuchet MS;"> Firefox
<i>I personally don't like the browser integration in mRemoteNG. It doesn't allow me to use all of my Firefox plugins. Therefore I just use a an external app to launch websites.</i>
<b>Filename:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">C:\Program Files\Mozilla Firefox\firefox.exe
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">%Hostname%

<span style="font-family: Trebuchet MS;"><b>Application:</b> Ping
It's ping, needs no explanation
<b>Filename:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">cmd
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">/c ping -t %HostName%

<span style="font-family: Trebuchet MS;"><b>Application:</b> Traceroute
Again, no explanation needed...
<b>Filename:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">cmd
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">/c set /P = | tracert %HostName%

<span style="font-family: Trebuchet MS;"><b>Application:</b> Cygwin
<i>What's better than managing all kinds of remote servers with mRemoteNG? Locally managing with mRemoteNG of course! Just install Cygwin and the mintty.</i>
<b>Filename:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">C:\cygwin\bin\mintty.exe<span style="font-size: 10pt;">
<span style="font-family: Trebuchet MS;"><span style="font-size: 10pt;"><b>Arguments:</b> -<div class="MsoNormal" style="background: white; line-height: normal; margin: 0in 0in 0pt;"><b><span style="color: black; font-family: Trebuchet MS;"><span style="font-size: 10pt;">Application:</b><span style="font-size: 10pt;"><span style="color: black; font-family: Trebuchet MS;"> TOAD
<b>Filename:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">C:\Program Files\Quest Software\Toad for Oracle\TOAD.exe
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">Connect=%Username%/%Password%@%UserField%<span style="font-size: 10pt;">

<span style="font-family: Trebuchet MS;"><i>I use the UserField for the SID</i>
<i>BUT WATCH OUT they've changed the command line syntax between versions (just search within you TOAD Help for command line)</i>

<b>Application:</b> mcgetmac (<a href="http://www.matcode.com/wol.htm"><span style="color: #105289; font-family: Trebuchet MS; font-size: 12pt;"><u>MC-WOL Homepage</u></a><span style="color: black; font-family: Trebuchet MS;"><span style="font-size: 10pt;">)
<b>Description:</b> find the MAC of a PC (useful for MC-WOL - see below)
<b>Filename:</b><span style="font-size: 10pt;"><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">Apps\MC-WOL\mcgetmac.bat
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">%Hostname%<span style="font-size: 10pt;">
<span style="font-family: Trebuchet MS;">Download the mcgetmac.exe, put it to mRemoteNG's subfolder (Apps\MC-WOL) and create a mcgetmac.bat with the following 2 lines

mcgetmac.bat<div class="MsoNormal" style="background: white; line-height: normal; margin: 0in 0in 0pt;"><span style="color: black; font-family: Trebuchet MS; font-size: 10pt;">CODE: <a href="http://forum.mremoteng.org/viewtopic.php?f=3&amp;t=82"><span style="font-family: Trebuchet MS;"><u>SELECT ALL</u></a><div class="MsoNormal" style="background: white; line-height: normal; margin: 0in 0in 0pt 0.5in;"><span style="font-family: Courier New;">@Apps\MC-WOL\mcgetmac.exe %1

@pause<div class="MsoNormal" style="background: white; line-height: normal; margin: 0in 0in 10pt; mso-margin-bottom-alt: auto; mso-margin-top-alt: auto;"><b><span style="color: black; font-family: Trebuchet MS; font-size: 10pt;">Application:</b><span style="color: black; font-family: Trebuchet MS; font-size: 10pt;"> Wake-On-LAN (<a href="http://www.matcode.com/wol.htm"><span style="color: #105289; font-family: Trebuchet MS; font-size: 12pt;"><u>MC-WOL Homepage</u></a><span style="color: black; font-family: Trebuchet MS;"><span style="font-size: 10pt;">)
<b>Description:</b> wake up a remote PC over the network (find the MAC by using the mcgetmac.bat from above)
<b>Filename:</b><span style="font-size: 10pt;"><span class="Style1Char"><span style="color: green; font-family: Lucida Console;">Apps\MC-WOL\mc-wol.exe
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="font-family: Lucida Console;">%MacAddress% /a %Hostname%<div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 0pt;"><span style="font-family: Trebuchet MS;"><b><span style="font-size: 10pt;">Application:</b><span style="font-size: 10pt;"> Google Chrome<span style="font-size: 10pt;">
<b><span style="color: black; font-family: Trebuchet MS;">Filename</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">: \portable\GoogleChromePortable\GoogleChromePortable.exe
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">%HostName%
<span style="font-family: Trebuchet MS;"><b>Application:</b> Internet Explorer
<span style="font-family: Trebuchet MS;"><b>Filename:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">Internet Explorer\IEXPLORE.EXE
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">%HostName%
<span style="font-family: Trebuchet MS;"><b>Application:</b> Samba
<span style="font-family: Trebuchet MS;"><b>Filename:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">\portable\Notepad++Portable\Notepad++Portable.exe
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">\samba\%Hostname%_sambaconf.txt
<span style="font-family: Trebuchet MS;"><b>Application:</b> Traceroute
<span style="font-family: Trebuchet MS;"><b>Filename:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">cmd
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">/c set /P = | tracert %HostName%
<span style="font-family: Trebuchet MS;"><b>Application:</b> Ping
<span style="font-family: Trebuchet MS;"><b>Filename:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">cmd
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">/c ping -t %HostName%
<span style="font-family: Trebuchet MS;"><b>Application:</b> VNC Viewer
<span style="font-family: Trebuchet MS;"><b>Filename:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">\portable\vnc\vnc-4_1_2-x86_win32_viewer.exe
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">%HostName%
<span style="font-family: Trebuchet MS;"><b>Application:</b> Windows Computer Manager
<span style="font-family: Trebuchet MS;"><b>Filename:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">C:\WINDOWS\system32\compmgmt.msc
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">/Computer=%HostName%
<span style="font-family: Trebuchet MS;"><b>Application:</b> WinSCP
<span style="font-family: Trebuchet MS;"><b>Filename:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">\portable\WinSCP\WinSCP.exe
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">scp://%Username%:%Password%@%Hostname%/
<span style="font-family: Trebuchet MS;"><b>Application:</b> Zabbix
<span style="font-family: Trebuchet MS;"><b>Filename:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">/zabbix/search.php?search=%HostName%<b><span style="font-family: Trebuchet MS;">Arguments: </b><div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 0pt;">
<div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 0pt;"><span style="font-family: Trebuchet MS;"><b><span style="font-size: 10pt;">Application:</b><span style="font-size: 10pt;"> Zenmap GUI<span style="font-size: 10pt;">
<span style="font-family: Trebuchet MS;"><b>Filename:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">\portable\Nmap\zenmap.exe
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">-p "Quick scan plus" -t %Hostname%
<span style="font-family: Trebuchet MS;"><b>Application:</b> Check Remoteconnection
<span style="font-family: Trebuchet MS;"><b>Filename:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">check_remote.bat
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="font-family: Lucida Console;"><span style="background-color: white; color: green; font-size: 10pt;">%HostName%<div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 0pt;">
<div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 0pt;"><span style="font-family: Courier New;">@echo off &amp; setlocal

IF "%1"=="" (
GOTO MANUAL
) ELSE (
GOTO AUTO
)

:AUTO
set IP=%1
qwinsta /server:%IP%
GOTO CHOICE

:MANUAL
set /p IP=Aktuelle IP oder Servernamen eingeben: 
qwinsta /server:%IP%
GOTO CHOICE

:CHOICE
echo Auswahl:
echo [1] eine Verbindung trennen
echo [2] Beenden

SET /P auswahl=[1,2]?
for %%? in (1) do if /I "%auswahl%"=="%%?" goto DISCONNECT
for %%? in (2) do if /I "%auswahl%"=="%%?" goto ENDE
goto CHOICE

:DISCONNECT
set /p ID=Session ID eingeben:
rwinsta /server:%IP% %ID%

:ENDE
PAUSE<div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 0pt;">
<div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 0pt;"><b><span style="color: black; font-family: Trebuchet MS;"><span style="font-size: 10pt;">Application:</b><span style="font-size: 10pt;"><span style="color: black; font-family: Trebuchet MS;"> Configure Samba
<b>Filename:</b><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">configure_Samba.bat
<span style="font-family: Trebuchet MS;"><b>Arguments:</b><span class="Style1Char"><span style="font-family: Lucida Console;"><span style="background-color: white; color: green; font-size: 10pt;">%HostName% %username% %password%<div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 0pt;">
<div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 0pt;"><span style="font-family: Courier New;">@echo off &amp; setlocal
set Hostname=%1
set Username=%2
set Password=%3<div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 0pt;"><span style="font-family: Courier New;">:UBUNTU
\portable\WinSCP\WinSCP.com /command "open scp://%Username%:%Password%@%Hostname%" "lcd \samba" "get /etc/samba/smb.conf" "exit"
IF ERRORLEVEL 1 GOTO SUSE
GOTO Notepad_UBUNTU<div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 10pt; mso-margin-bottom-alt: auto; mso-margin-top-alt: auto;"><span style="font-family: Courier New;">:SUSE
\portable\WinSCP\WinSCP.com /command "open scp://%Username%:%Password%@%Hostname%" "lcd \samba" "get /usr/local/samba/lib/smb.conf" "exit"

GOTO Notepad_SUSE
:Notepad_UBUNTU

"\portable\Notepad++Portable\Notepad++Portable.exe" \samba\smb.conf

PAUSE

xcopy \samba\smb.conf \samba\%Hostname%_sambaconf.txt /Y

\portable\WinSCP\WinSCP.com /command "open scp://%Username%:%Password%@%Hostname%" "cd /etc/samba/" "put \samba\smb.conf" "call /etc/init.d/samba restart" "exit"

GOTO Ende<div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 10pt; mso-margin-bottom-alt: auto; mso-margin-top-alt: auto;"><span style="font-family: Courier New;">:Notepad_SUSE
"\portable\Notepad++Portable\Notepad++Portable.exe" \samba\smb.conf

PAUSE

xcopy \samba\smb.conf \samba\%Hostname%_sambaconf.txt /Y
\portable\WinSCP\WinSCP.com /command "open scp://%Username%:%Password%@%Hostname%" "cd /usr/local/samba/lib/" "put \samba\smb.conf" "call /etc/init.d/samba restart" "exit"

GOTO Ende<div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 10pt; mso-margin-bottom-alt: auto; mso-margin-top-alt: auto;"><span style="font-family: Courier New;">:Ende

PAUSE<div class="MsoNormal" style="background: #ecf3f7; line-height: normal; margin: 0in 0in 3pt;"><span style="color: black; font-family: Trebuchet MS;"><span style="font-size: 10pt;">Sysinternals tools: <span style="font-size: 10pt;"><a href="http://technet.microsoft.com/en-us/sysinternals/default.aspx"><span style="color: #105289; font-family: Trebuchet MS;"><u>http://technet.microsoft.com/en-us/sysi ... fault.aspx</u></a>
<span style="color: black; font-family: Trebuchet MS;">SYDI: <a href="http://sydiproject.com/"><span style="color: #105289; font-family: Trebuchet MS;"><u>http://sydiproject.com/</u></a>

<span style="font-family: Trebuchet MS;"><b>Application</b>: [HTTPS] Dell OpenManage [port 1311]
<b>Filename</b>: <span style="font-size: 10pt;"><span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">iexplore
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">https://%Hostname%:1311

<span style="font-family: Trebuchet MS;"><b>Application</b>: [HTTPS] HP HomePage [2381]
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">iexplore
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">https://%Hostname%:2381

<span style="font-family: Trebuchet MS;"><b>Application</b>: [HTTPS] ILO [81]
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">iexplore
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><a href="https://ilo-/"><span style="background-color: white; color: green; font-family: Lucida Console;">https://ilo-</a><span style="background-color: white; color: green; font-family: Lucida Console;">%Hostname%:81

<span style="font-family: Trebuchet MS;"><b>Application</b>: [HTTPS] LocalHost [80]
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">iexplore
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">http://%hostname%

<span style="font-family: Trebuchet MS;"><b>Application</b>: [MSC] Compmgmt
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">compmgmt.msc
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">/computer:%hostname%

<span style="font-family: Trebuchet MS;"><b>Application</b>: [MSC] Services
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">services.msc
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">/computer:%hostname%

<span style="font-family: Trebuchet MS;"><b>Application</b>: [TOOL] Inventory with SYDI
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">cmd
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">/k cscript %mremote%\scripts\sydi\sydi-server.vbs -wabefghipPqrsu -racdklp -ew -f10 -d -t%hostname%<b><i><span style="color: black; font-family: Trebuchet MS;">You need to have MSWORD on your machine (you can also export in xml/html)</i></b>

<span style="font-family: Trebuchet MS;"><b>Application</b>: [TOOL] Command Prompt (using SysInternals PSEXEC)
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">cmd
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">/k %tools%\psexec.exe \\%hostname% cmd.exe
<span style="font-family: Trebuchet MS;"><b><i>In my case i added %tools% (system variable)</i></b>

<b>Application</b>: [TOOL] Files Opened (using SysInternals PSFiLE)
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">cmd
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">/k %tools%\psfile.exe \\%hostname%

<span style="font-family: Trebuchet MS;"><b>Application</b>: [TOOL] Logged-on users (using SysInternals psloggedon.exe)
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">cmd
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">/k %tools%\psloggedon.exe \\%hostname%
<span style="font-family: Trebuchet MS;"><b>Application</b>: Netstat (Listening ports)(using Sysinternals PSEXEC)
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">cmd
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">/k %tools%\psexec.exe \\%hostname% netstat -nab |find /i

<span style="font-family: Trebuchet MS;"><b>Application</b>: Nslookup
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">cmd
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">/K nslookup %hostname%

<span style="font-family: Trebuchet MS;"><b>Application</b>: RDP /Admin (Console Session)
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">cmd
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">/c mstsc /v:%hostname%:3389 /admin
<span style="font-family: Trebuchet MS;"><b>Application</b>: Processes List (Powershell)
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">powershell
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">-noexit Get-wmiobject win32_process -computername %hostname% | Select-Object __server,name,processid,sessionid,vm,ws,description,executablepath,osname,windowsversion,__path | Out-GridView
<span style="font-family: Trebuchet MS;"><b>Application</b>: Shares List (Powershell)
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">powershell
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">-noexit Get-WmiObject win32_share -computer %hostname%|sort name|fl
<span style="font-family: Trebuchet MS;"><b>Application</b>: Shutdown GUi
<b>Filename</b>: <span class="Style1Char"><span style="background-color: white; color: green; font-family: Lucida Console;">shutdown
<span style="font-family: Trebuchet MS;"><b>Arguments</b>: <span class="Style1Char"><span style="font-family: Lucida Console;"><span style="background-color: white; color: green; font-size: 10pt;">/i /m %hostname%<div class="MsoNormal" style="line-height: normal; margin: 0in 0in 10pt;">

