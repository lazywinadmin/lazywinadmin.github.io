---
layout: single
title: Windows 10 ADK - Issues while uninstalling Windows 8.1 ADK and installing Windows 10 ADK
excerpt: 
permalink: /2015/08/windows-10-adk-issues-while.html
tags: 
- powershell
- sccm
- sccm2012r2
- windows 10
- windows 8.1
- windows adk
published: true
comments: true
---

 
 Installing Windows 10 Assessment and Deployment Kit (ADK) on SCCM 2012 R2 SP1 was a bit tricky. To "upgrade" the Windows ADK from 8.1 to 10, <a href="http://blogs.technet.com/b/configmgrteam/archive/2015/08/05/windows-10-adk-and-configuration-manager.aspx" target="_blank">Microsoft recommend</a> to remove Windows 8.1 ADK prior to the installation of Windows 10 ADK. We had some issue uninstalling Windows 8.1 ADK and installing the Windows 10 ADK



# Uninstalling the Windows 8.1

<b><u>Issue</u></b>

> <b>Uninstall did not complete successfully</b><br>
> <i>An error occured while uninstalling "Deployment Tools."</i><br>
> <b>Could not acquire privileges; GLE=0x514 </b><br>
<b>Returning Status 0x514 </b>

You can also look at the ADK install/uninstall logs here: `C:\Users\<Account>\AppData\Local\Temp\adk`


{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Uninstalling_Windows10ADK_01__605578273__-778x579.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Uninstalling_Windows10ADK_01__605578273__-778x579.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})


We found different solutions online such as:
* Unjoin, install ADK and Rejoin the computer to the domain
* Run the installer as a Local Administrator or domain admin

<br>
Unjoining the machine was out of questions and the second solution did not work (Same error message).

I also tried to:
* Remove one component at the time but always got stuck on the "Deployment Tools" component.
* Repair W8.1 ADK and try again

Same result :(


<b><u>Solution </u></b>

Finally I found a way by running the installer with the Local System Account. The name of this account is `NT AUTHORITY\System`. It is a powerful account that has unrestricted access to all local system resources.
Using [`PsExec.exe`](https://technet.microsoft.com/en-us/sysinternals/bb897553.aspx) run the following command:
`psexec.exe /sid powershell.exe`


{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/PsExec_PowerShell_LocalSystem__125866709__-630x239.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/PsExec_PowerShell_LocalSystem__125866709__-630x239.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})


This will launch a new PowerShell window and you can verify the current user by using `WhoAmI` tool.
Finally I run the command `adksetup.exe /uninstall` and everything uninstall properly. In my example I renamed the `adksetup.exe` file to `adksetup_8.1update.exe`



{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/PowerShell_LocalSystem_ADKSetup__214499777__-674x218.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/PowerShell_LocalSystem_ADKSetup__214499777__-674x218.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})


{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Uninstalling_Windows10ADK_02_success__448296844__-780x583.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Uninstalling_Windows10ADK_02_success__448296844__-780x583.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})


# Installing Windows 10 ADK

<b><u>Issue</u></b>

Unfortunately I had the same issue when running the Windows 10 ADK Installer.


{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Windows10ADK_Install01__453172665__-781x579.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Windows10ADK_Install01__453172665__-781x579.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})

> Install did not complete successfully.<br>
> An error occurred while installing "Deployment Tools".

{% assign ImageText = 'Install did not complete successfully' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Windows10ADK_Install02__691625683__-779x581.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Windows10ADK_Install02__691625683__-779x581.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})

<br>
Error seen in the setup log file:

```
Error 0x800705514: Process returned error: 0x514
Error 0x800705514: Failed to execute EXE package
Error 0x800705514: Failed to configure per-machine EXE package.
RetryManager: Not an execute error to retry: 0x800705514
Error 0x800705514: Failed to execute EXE package
```

{% assign ImageText = 'Error seen in the setup log file' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Windows10ADK_Install03__583158098__-900x791.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Windows10ADK_Install03__583158098__-900x791.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})

<br>
Error seen in the log file:

{% assign ImageText = 'Error seen in the log file' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Windows10ADK_Install04__1638434946__-719x176.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Windows10ADK_Install04__1638434946__-719x176.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})

```
Image Path is  [\??D:\Program Files (x86)\Windows Kits\10\Assessment and Deployment Kit\Deployment Tools\amd64\DISM\wimmount.sys]
Could not acquire privileges; GLE=0x514
Returning status 0x514
```




<b><u>Solution</u></b>

Same solution as above by using `Psexec` and by running `adksetup.exe`


{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Windows10ADK_Install06__230518088__-675x176.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Windows10ADK_Install06__230518088__-675x176.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})



{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Windows10ADK_Install05__754254663__-766x568.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150815_Windows_10_ADK_-_Issues_while_uninstalling_Windows_8.1_ADK_and_installing_Windows_10_ADK/Windows10ADK_Install05__754254663__-766x568.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})