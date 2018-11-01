---
layout: single
title: PowerShell/WinForm - Active Directory User Unlocker 
excerpt: 
permalink: /2013/04/powershellwinform-active-directory-user.html
tags: 
- active directory
- gui
- powershell
- scripting
- unlock
- user account
- winform
published: true
comments: true
---

<a href="{{ site.url }}/images/2013/20130402_PowerShellWinForm_-_Active_Directory_User_Unlocker_/account_Lockout_white__1803127906__-180x180.jpg" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130402_PowerShellWinForm_-_Active_Directory_User_Unlocker_/account_Lockout_white__1803127906__-180x180.jpg" /></a>An Active Directory account may be automatically locked, if the domain's security policy has been configured to lock accounts after a number of unsuccessful logon attempts.

If an account has been locked out, the <span style="font-family: Courier New, Courier, monospace;"><a href="http://msdn.microsoft.com/en-ca/library/windows/desktop/ms676843(v=vs.85).aspx" target="_blank">lockouttime</a> attribute will contain a Win32 time value that indicates when the account was locked.

An easy way to search for locked out accounts is an LDAP query similar to
<span style="font-family: 'Courier New', Courier, monospace;">(&amp;(objectClass=user)(lockoutTime=>0))




You can integrate this query in the saved queries of your Active Directory Users and Computers MMC.

<a href="{{ site.url }}/images/2013/20130402_PowerShellWinForm_-_Active_Directory_User_Unlocker_/AD-SavedQueries__1964619053__-265x152.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130402_PowerShellWinForm_-_Active_Directory_User_Unlocker_/AD-SavedQueries__1964619053__-265x152.png" /></a>


### <span style="font-size: x-large;">Description


The following script will use PowerShell to generate a WinForm and give you the ability to unlock account right from the interface. The goal is to do something simple and functional, nothing fancy.

The GUI was created using PowerShell Studio from SAPIEN. You can try this tool by going on Sapien.com


### <span style="font-size: x-large;">No Module Required


The beautiful part of it is that no Active Directory Module or Quest Active Directory Snapin are required
In my case I used <b>ADSI</b>: <span style="color: blue; font-family: Courier New, Courier, monospace;"><b>[ADSISearcher]</b>

If you want to know more about <span style="font-family: &quot;Courier New&quot;,Courier,monospace;">ADSISearcher check this <a href="http://blogs.technet.com/b/heyscriptingguy/archive/2010/08/24/use-the-powershell-adsisearcher-type-accelerator-to-search-active-directory.aspx" target="_blank">article from the Scripting Guy</a>


### <b><span style="font-size: x-large;">Graphical User Interface</b>



<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130402_PowerShellWinForm_-_Active_Directory_User_Unlocker_/AD-USER-Unlocker-02__648315511__-466x330.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130402_PowerShellWinForm_-_Active_Directory_User_Unlocker_/AD-USER-Unlocker-02__648315511__-466x330.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Under Windows 8</td></tr></tbody></table>

### <span style="font-size: x-large;">How to run the script ?

Invoking the script from a PowerShell will do it. Make sure you run this with an account that have the privileges to unlock accounts.

<a href="{{ site.url }}/images/2013/20130402_PowerShellWinForm_-_Active_Directory_User_Unlocker_/AD-USER-Unlocker-05__737634742__-268x72.png" imageanchor="1" style="clear: left; display: inline !important; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130402_PowerShellWinForm_-_Active_Directory_User_Unlocker_/AD-USER-Unlocker-05__737634742__-268x72.png" /></a>

<span style="font-size: x-large;">Download
<u><a href="http://gallery.technet.microsoft.com/WinForm-Active-Directory-a3771370" target="_blank">This script is available on Technet</a></u>


```

```
```

```
```

```
```
Thanks for reading! ;-)
```
```
Comments are welcome or you can reach me at the email below
```
```
-<a href="mailto:fxcat@lazywinadmin.com" target="_blank">FX</a>-
```

