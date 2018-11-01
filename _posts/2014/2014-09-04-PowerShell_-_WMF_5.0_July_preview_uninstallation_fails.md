---
layout: single
title: PowerShell - WMF 5.0 July preview uninstallation fails
excerpt: 
permalink: /2014/09/powershell-wmf-50-july-preview.html
tags: 
- fail
- powershell
- powershell 5.0
- wmf 5
published: true
comments: true
---

 
 <a href="{{ site.url }}/images/2014/20140904_PowerShell_-_WMF_5.0_July_preview_uninstallation_fails/powershell_logo__396363731__-144x109.png" imageanchor="1" style="clear: left; display: inline !important; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140904_PowerShell_-_WMF_5.0_July_preview_uninstallation_fails/powershell_logo__396363731__-144x109.png" /></a>
Today the <a href="http://blogs.msdn.com/b/powershell/archive/2014/09/04/windows-management-framework-5-0-preview-september-2014-is-now-available.aspx" target="_blank">PowerShell Team released a new version of the WMF : v5 September preview</a>, I really like the faster beta cycle !

Having the beta preview already installed (July version), I first open Add/Remove Programs (appwiz.cpl) and start to uninstall this version (KB2969050).

Once the uninstallation is completed, Windows ask to reboot. However at the next boot I get a message saying the Update did not work and Windows is Undoing the change, reverting to the previous state...then reboot again.




Once rebooted, the WMF 5.0 July preview was still there.

<a href="{{ site.url }}/images/2014/20140904_PowerShell_-_WMF_5.0_July_preview_uninstallation_fails/2014-09-04_18-03-05__1274619236__-956x391.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140904_PowerShell_-_WMF_5.0_July_preview_uninstallation_fails/2014-09-04_18-03-05__1274619236__-956x391.png" height="260" width="640" /></a>
Fortunately, the PowerShell Team is already aware of this issue and documented this behavior in <a href="http://www.microsoft.com/en-us/download/details.aspx?id=44070&amp;utm_content=bufferd26ed&amp;utm_medium=social&amp;utm_source=twitter.com&amp;utm_campaign=buffer" target="_blank">the September previous release notes</a>.


> <b><u>Resolution:</u></b> Delete the <b>\\root\microsoft\windows\desiredstateconfiguration</b> namespace in WMI before uninstalling WMF 5.0 Experimental Release July 2014.
 1- Open powershell.exe with elevated user rights (run as administrator).
 2- Run the following commands: 

```
$dscNamespace = Get-CimInstance -Namespace root\microsoft\windows -Query "select * from __namespace where name = 'desiredstateconfiguration'"
$dscNamespace | Remove-CimInstance
```

<a href="{{ site.url }}/images/2014/20140904_PowerShell_-_WMF_5.0_July_preview_uninstallation_fails/2014-09-04_18-08-18__1005654604__-772x202.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140904_PowerShell_-_WMF_5.0_July_preview_uninstallation_fails/2014-09-04_18-08-18__1005654604__-772x202.png" /></a>
Once I ran this command, ran the uninstall again and reboot, the update was gone.

<a href="{{ site.url }}/images/2014/20140904_PowerShell_-_WMF_5.0_July_preview_uninstallation_fails/2014-09-04_19-09-20__983448032__-877x472.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140904_PowerShell_-_WMF_5.0_July_preview_uninstallation_fails/2014-09-04_19-09-20__983448032__-877x472.png" height="344" width="640" /></a>
Now I can proceed with the installation of the new WMF 5.0 preview ;-)


