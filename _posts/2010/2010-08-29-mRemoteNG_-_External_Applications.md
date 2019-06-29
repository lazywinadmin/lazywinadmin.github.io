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
toc: true
toc_label: "Table of content"
---

> Update 2019/06/29: Add ExtApp.xml at the end of this post

# External Applications list

## Application: Windows Computer Manager
This will let you launch the Windows Computer Management MMC against the selected host. This MMC will let you view event logs, manage users, configure disks, manage services, and a whole bunch more. 
* **Filename**: `C:\windows\system32\compmgmt.msc`
* **Arguments**: `/Computer=%Hostname%`

## Application: Zenmap GUI
Zenmap is a GUI front-end for nmap. This is the standard port-scanning tool in use by anybody who knows the difference. Gives you all sorts of detail you won't find in the built-in port scanning tool.
* **Filename**: `C:\Program Files\Nmap\zenmap.exe`
* **Arguments**: `-p "Quick scan plus" -t %Hostname%`

## Application: WinSCP
WinSCP is a great, free GUI Secure Copy program.
* **Filename**: `C:\Program Files\WinSCP\WinSCP.exe`
* **Arguments**: `scp://%Username%:%Password%@%Hostname%/ `
## Application: FileZilla FTP
Free and open source FTP client for most platforms.
* **Filename**: `C:\Program Files\FileZilla FTP Client\filezilla.exe`
* **Arguments**: `ftp://%Username%:%Password%@%Hostname%`

## Application: FileZilla SFTP
Same as above, but using the Secure FTP (SFTP) protocol.
* **Filename**: `C:\Program Files\FileZilla FTP Client\filezilla.exe`
* **Arguments**: `sftp://%Username%:%Password%@%Hostname%`

## Application: VMware Virtual Infrastructure Client
This is specific to anybody managing a VMware vSphere or ESX environment. This will launch the VI client against the selected host. If the host is an ESX server, it will simply connect to the ESX server. If the host is a Windows machine running vCenter, it will attach to the full vCenter environment.
* **Filename**: `C:\Program Files\VMware\Infrastructure\Virtual Infrastructure Client\Launcher\VpxClient.exe`
* **Arguments**: `-s %Hostname% -u %Username% -p %Password%`

## Application: Firefox
I personally don't like the browser integration in mRemoteNG. It doesn't allow me to use all of my Firefox plugins. Therefore I just use a an external app to launch websites.
* **Filename**: `C:\Program Files\Mozilla Firefox\firefox.exe`
* **Arguments**: `%Hostname%`

## Application: Ping
It's ping, needs no explanation
* **Filename**: `cmd`
* **Arguments**: `/c ping -t %HostName%`

## Application: Traceroute
Again, no explanation needed...
* **Filename**: `cmd`
* **Arguments**: `/c set /P = | tracert %HostName%`

## Application: Cygwin
What's better than managing all kinds of remote servers with mRemoteNG? Locally managing with mRemoteNG of course! Just install Cygwin and the mintty.
* **Filename**: `C:\cygwin\bin\mintty.exe`
* **Arguments**: `-`

## Application: TOAD
* **Filename**: `C:\Program Files\Quest Software\Toad for Oracle\TOAD.exe`
* **Arguments**: `Connect=%Username%/%Password%@%UserField%`

I use the UserField for the SID
BUT WATCH OUT they've changed the command line syntax between versions (just search within you TOAD Help for command line)

## Application: mcgetmac (MC-WOL Homepage)
Description: find the MAC of a PC (useful for MC-WOL - see below)
* **Filename**: `Apps\MC-WOL\mcgetmac.bat`
* **Arguments**: `%Hostname%`
Download the `mcgetmac.exe`, put it to mRemoteNG's subfolder (Apps\MC-WOL) and create a mcgetmac.bat with the following 2 lines

```
SELECT ALL
@Apps\MC-WOL\mcgetmac.exe %1

@pause
```

## Application: Wake-On-LAN (MC-WOL Homepage)
Description: wake up a remote PC over the network (find the MAC by using the mcgetmac.bat from above)
* **Filename**: `Apps\MC-WOL\mc-wol.exe`
* **Arguments**: `%MacAddress% /a %Hostname%`

## Application: Google Chrome
* **Filename**: `\portable\GoogleChromePortable\GoogleChromePortable.exe`
* **Arguments**: `%HostName%`

## Application: Internet Explorer
* **Filename**: `Internet Explorer\IEXPLORE.EXE`
* **Arguments**: `%HostName%`

## Application: Samba
* **Filename**: `\portable\Notepad++Portable\Notepad++Portable.exe`
* **Arguments**: `\samba\%Hostname%_sambaconf.txt`

## Application: Traceroute
* **Filename**: `cmd`
* **Arguments**: `/c set /P = | tracert %HostName%`

## Application: Ping
* **Filename**: `cmd`
* **Arguments**: `/c ping -t %HostName%`

## Application: VNC Viewer
* **Filename**: `\portable\vnc\vnc-4_1_2-x86_win32_viewer.exe`
* **Arguments**: `%HostName%`

## Application: Windows Computer Manager
* **Filename**: `C:\WINDOWS\system32\compmgmt.msc`
* **Arguments**: `/Computer=%HostName%`

## Application: WinSCP
* **Filename**: `\portable\WinSCP\WinSCP.exe`
* **Arguments**: `scp://%Username%:%Password%@%Hostname%/`

## Application: Zabbix
* **Filename**: `/zabbix/search.php?search=%HostName%Arguments:`

## Application: Zenmap GUI
* **Filename**: `\portable\Nmap\zenmap.exe`
* **Arguments**: `-p "Quick scan plus" -t %Hostname%`

## Application: Check Remoteconnection
* **Filename**: `check_remote.bat`
* **Arguments**: `%HostName%`

```
@echo off & setlocal

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
PAUSE
```

## Application: Configure Samba
* **Filename**: `configure_Samba.bat`
* **Arguments**: `%HostName% %username% %password%`

```
@echo off & setlocal
set Hostname=%1
set Username=%2
set Password=%3
:UBUNTU
\portable\WinSCP\WinSCP.com /command "open scp://%Username%:%Password%@%Hostname%" "lcd \samba" "get /etc/samba/smb.conf" "exit"
IF ERRORLEVEL 1 GOTO SUSE
GOTO Notepad_UBUNTU
:SUSE
\portable\WinSCP\WinSCP.com /command "open scp://%Username%:%Password%@%Hostname%" "lcd \samba" "get /usr/local/samba/lib/smb.conf" "exit"

GOTO Notepad_SUSE
:Notepad_UBUNTU

"\portable\Notepad++Portable\Notepad++Portable.exe" \samba\smb.conf

PAUSE

xcopy \samba\smb.conf \samba\%Hostname%_sambaconf.txt /Y

\portable\WinSCP\WinSCP.com /command "open scp://%Username%:%Password%@%Hostname%" "cd /etc/samba/" "put \samba\smb.conf" "call /etc/init.d/samba restart" "exit"

GOTO Ende
:Notepad_SUSE
"\portable\Notepad++Portable\Notepad++Portable.exe" \samba\smb.conf

PAUSE

xcopy \samba\smb.conf \samba\%Hostname%_sambaconf.txt /Y
\portable\WinSCP\WinSCP.com /command "open scp://%Username%:%Password%@%Hostname%" "cd /usr/local/samba/lib/" "put \samba\smb.conf" "call /etc/init.d/samba restart" "exit"

GOTO Ende
:Ende

PAUSE
```

Sysinternals tools: http://technet.microsoft.com/en-us/sysinternals/default.aspx
SYDI: http://sydiproject.com/

## Application: [HTTPS] Dell OpenManage [port 1311]
* **Filename**: `iexplore`
* **Arguments**: `https://%Hostname%:1311`

## Application: [HTTPS] HP HomePage [2381]
* **Filename**: `iexplore`
* **Arguments**: `https://%Hostname%:2381`

## Application: [HTTPS] ILO [81]
* **Filename**: `iexplore`
* **Arguments**: `https://ilo-%Hostname%:81`

## Application: [HTTPS] LocalHost [80]
* **Filename**: `iexplore`
* **Arguments**: `http://%hostname%`

## Application: [MSC] Compmgmt
* **Filename**: `compmgmt.msc`
* **Arguments**: `/computer:%hostname%`

## Application: [MSC] Services
* **Filename**: `services.msc`
* **Arguments**: `/computer:%hostname%`

## Application: [TOOL] Inventory with SYDI
* **Filename**: `cmd
* **Arguments**: `/k cscript %mremote%\scripts\sydi\sydi-server.vbs -wabefghipPqrsu -racdklp -ew -f10 -d -t%hostname%`
You need to have MSWORD on your machine (you can also export in xml/html)

## Application: [TOOL] Command Prompt (using SysInternals PSEXEC)
* **Filename**: `cmd`
* **Arguments**: `/k %tools%\psexec.exe \\%hostname% cmd.exe`
In my case i added %tools% (system variable)

## Application: [TOOL] Files Opened (using SysInternals PSFiLE)
* **Filename**: `cmd`
* **Arguments**: `/k %tools%\psfile.exe \\%hostname%`

## Application: [TOOL] Logged-on users (using SysInternals psloggedon.exe)
* **Filename**: `cmd`
* **Arguments**: `/k %tools%\psloggedon.exe \\%hostname%`

## Application: Netstat (Listening ports)(using Sysinternals PSEXEC)
* **Filename**: `cmd`
* **Arguments**: `/k %tools%\psexec.exe \\%hostname% netstat -nab |find /i`

## Application: Nslookup
* **Filename**: `cmd`
* **Arguments**: `/K nslookup %hostname%`

## Application: RDP /Admin (Console Session)
* **Filename**: `cmd`
* **Arguments**: `/c mstsc /v:%hostname%:3389 /admin`

## Application: Processes List (Powershell)
* **Filename**: `powershell`
* **Arguments**: `-noexit Get-wmiobject win32_process -computername %hostname% | Select-Object __server,name,processid,sessionid,vm,ws,description,executablepath,osname,windowsversion,__path | Out-GridView`

## Application: Shares List (Powershell)
* **Filename**: `powershell`
* **Arguments**: `-noexit Get-WmiObject win32_share -computer %hostname%|sort name|fl`

## Application: Shutdown GUi
* **Filename**: `shutdown`
* **Arguments**: `/i /m %hostname%`


# ExtApp.xml

As requested in comment, here is the ExtApp.xml file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<Apps>
    <App DisplayName="[HTTP] Dell OpenManage [1311]" FileName="iexplore" Arguments="http://%Hostname%:1311" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="[HTTP] HP HomePage [2381]" FileName="iexplore" Arguments="http://%Hostname%:2381" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="[HTTP] ILO" FileName="iexplore" Arguments="http://ilo-%Hostname%" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="[HTTP] Localhost" FileName="iexplore" Arguments="http://%hostname%" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="[MSC] Compmgmt" FileName="compmgmt.msc" Arguments="/computer:%hostname%" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="[MSC] EventViewer" FileName="eventvwr" Arguments="%hostname%" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="[MSC] Services" FileName="services.msc" Arguments="/computer:%hostname%" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="[PSTOOLS] Front-End (GUI)" FileName="cmd" Arguments="/k %mremote%\scripts\launch_fepstools.bat" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="C$" FileName="cmd" Arguments="/k powershell %mremote%\scripts\explorer.ps1 %hostname%" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="CMD (Psexec.exe)" FileName="cmd" Arguments="/k %mremote%\tools\psexec.exe \\%hostname% cmd.exe" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="Files Opened (Psfile.exe)" FileName="cmd" Arguments="/k %mremote%\tools\psfile.exe \\%hostname%" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="IPconfig" FileName="cmd" Arguments="/k powershell %mremote%\scripts\ipconfig.ps1 %hostname%" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="Logged-On Users (psloggedon.exe)" FileName="cmd" Arguments="/k %mremote%\tools\psloggedon.exe \\%hostname%" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="Netstat (listening ports)" FileName="cmd" Arguments="/k %mremote%\tools\psexec.exe \\%hostname% netstat -nab |find /i &quot;listening&quot;" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="Nmap (winpcap needed)" FileName="cmd" Arguments="/K nmap -sS -P0 %hostname%" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="NsLookup" FileName="cmd" Arguments="/K nslookup %hostname%" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="Ping" FileName="cmd" Arguments="/K ping %Hostname% -t" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="PortPing - 3389" FileName="cmd" Arguments="/k %mremote%\tools\tools4ever\T4ePortPing.exe %hostname% 3389" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="Processes List" FileName="powershell" Arguments="-noexit Get-wmiobject win32_process -computername %hostname% | Select-Object __server,name,processid,sessionid,vm,ws,description,executablepath,osname,windowsversion,__path | Out-GridView" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="RDP /admin (console session)" FileName="cmd" Arguments="/k mstsc /v:%hostname%:3389 /admin" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="Server Information" FileName="powershell" Arguments="powershell -noexit $env:mremote\scripts\serverinfoglobal.ps1 %hostname%" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="Services List" FileName="powershell" Arguments="-noexit Get-WMIObject win32_service -computer %hostname% | select-object displayname,name,state,status,startMode,processId,startname | Sort-Object state,displayname,name |Out-GridView " WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="Shares List" FileName="powershell" Arguments="-noexit Get-WmiObject Win32_Share -ComputerName %hostname% | Select-Object Name,Path,caption,status,description | Out-GridView" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="SID or ACCOUNT Query" FileName="cmd" Arguments="/k powershell %mremote%\scripts\psgetsid.ps1" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="Traceroute" FileName="cmd" Arguments="/K tracert %Hostname%" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="shutdown -s -t 0 -f" FileName="cmd" Arguments="/k shutdown.exe -m \\%hostname% -s -t 0 -f" WaitForExit="False" TryToIntegrate="False" />
    <App DisplayName="Qwinsta" FileName="cmd" Arguments="/k qwinsta /server:%hostname% " WaitForExit="False" TryToIntegrate="False" />
</Apps>
```

