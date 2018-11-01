---
layout: single
title: PowerShell - Get-DomainUser
excerpt: 
permalink: /2013/10/powershell-get-domainuser.html
tags: 
- active directory
- adsi
- function
- ldap
- powershell
- user account
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20131016_PowerShell_-_Get-DomainUser/1381983944_hand_driller__1606067665__-128x128.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20131016_PowerShell_-_Get-DomainUser/1381983944_hand_driller__1606067665__-128x128.png" /></a>Today one of my IT coworkers, in another department, sent a couple of emails to the Ops to get the username (SamAccount) from a couple of Active Directory users accounts. This guy, which is not familiar with AD, had only the DisplayName properties information.

I wrote him back that he could just request RSAT(Remote Server Administration Tools) to be installed on his workstation or just use this small PowerShell that I just wrote in minutes. Since Active Directory does not require any specific permission to access this kind of information. Here is the code, nothing advanced, but it does the work ;-)


### 

<div class="PoshOne"><div class="x_MsoNormal"><span style="color: blue; font-family: Consolas; font-size: 10pt;">function<span style="font-family: Consolas; font-size: 10pt;"> <span style="color: teal; font-family: Consolas; font-size: 10pt;">Get-DomainUser<span style="font-family: Consolas; font-size: 10pt;"> {<div class="x_MsoNormal"><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: blue; font-family: Consolas; font-size: 10pt;">PARAM<span style="font-family: Consolas; font-size: 10pt;">(<span style="color: darkred; font-family: Consolas; font-size: 10pt;">$DisplayName<span style="font-family: Consolas; font-size: 10pt;">)<div class="x_MsoNormal"><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: darkred; font-family: Consolas; font-size: 10pt;">$Search<span style="font-family: Consolas; font-size: 10pt;"> <span style="color: blue; font-family: Consolas; font-size: 10pt;">=<span style="font-family: Consolas; font-size: 10pt;">  [adsisearcher]<span style="color: red; font-family: Consolas; font-size: 10pt;">"(&amp;(objectCategory=person)(objectClass=User)(displayname=$DisplayName))"<span style="font-family: Consolas; font-size: 10pt;"><div class="x_MsoNormal"><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: blue; font-family: Consolas; font-size: 10pt;">foreach<span style="font-family: Consolas; font-size: 10pt;"> (<span style="color: darkred; font-family: Consolas; font-size: 10pt;">$user<span style="font-family: Consolas; font-size: 10pt;"> <span style="color: blue; font-family: Consolas; font-size: 10pt;">in<span style="font-family: Consolas; font-size: 10pt;"> <span style="color: darkred; font-family: Consolas; font-size: 10pt;">$<span style="font-family: Consolas; font-size: 10pt;">(<span style="color: darkred; font-family: Consolas; font-size: 10pt;">$Search<span style="font-family: Consolas; font-size: 10pt;">.FindAll())){<div class="x_MsoNormal"><span style="font-family: Consolas; font-size: 10pt;">  <b><span style="color: blue; font-family: Consolas; font-size: 10pt;">New-Object</b><span style="font-family: Consolas; font-size: 10pt;"> <span style="color: #3399ff; font-family: Consolas; font-size: 10pt;">-TypeName<span style="font-family: Consolas; font-size: 10pt;"> PSObject  <span style="color: #3399ff; font-family: Consolas; font-size: 10pt;">-Property<span style="font-family: Consolas; font-size: 10pt;"> @{<div class="x_MsoNormal"><span style="font-family: Consolas; font-size: 10pt;">  <span style="color: red; font-family: Consolas; font-size: 10pt;">"DisplayName"<span style="font-family: Consolas; font-size: 10pt;"> <span style="color: blue; font-family: Consolas; font-size: 10pt;">=<span style="font-family: Consolas; font-size: 10pt;"> <span style="color: darkred; font-family: Consolas; font-size: 10pt;">$user<span style="font-family: Consolas; font-size: 10pt;">.properties.displayname<div class="x_MsoNormal"><span style="font-family: Consolas; font-size: 10pt;">  <span style="color: red; font-family: Consolas; font-size: 10pt;">"UserName"<span style="font-family: Consolas; font-size: 10pt;"> <span style="color: blue; font-family: Consolas; font-size: 10pt;">=<span style="font-family: Consolas; font-size: 10pt;"> <span style="color: darkred; font-family: Consolas; font-size: 10pt;">$user<span style="font-family: Consolas; font-size: 10pt;">.properties.samaccountname<div class="x_MsoNormal"><span style="font-family: Consolas; font-size: 10pt;"><span style="color: red; font-family: Consolas; font-size: 10pt;">"Description"<span style="font-family: Consolas; font-size: 10pt;"> <span style="color: blue; font-family: Consolas; font-size: 10pt;">=<span style="font-family: Consolas; font-size: 10pt;"> <span style="color: darkred; font-family: Consolas; font-size: 10pt;">$user<span style="font-family: Consolas; font-size: 10pt;">.properties.description}<div class="x_MsoNormal"><span style="font-family: Consolas; font-size: 10pt;"> }<div class="x_MsoNormal"><span style="font-family: Consolas; font-size: 10pt;">}<span lang="FR-CA" style="color: #1f497d;">

### 


### Result



```
PS C:\> Get-DomainUser -DisplayName "jonathan*" | Format-List
```

```
UserName    : {JonathanD}
Description : {Account of Jonathan Delpiero}
DisplayName : {Jonathan Delpiero}

UserName    : {DumoulinJ}
Description : {Account of Jonathan Dumoulin}
DisplayName : {Jonathan Dumoulin}

```





### [AdsiSearcher] Accelerator

I'm using the Windows PowerShell<span style="font-family: Courier New, Courier, monospace;"> [AdsiSearcher] type accelerator to search Active Directory Domain Services (AD DS).

Using ADSI/LDAP Query is kind of confusing and I had to make some research to really understand how it actually works.

Let's take a look at this object and its members.
I start bycreating an instance of the System.DirectoryServices.DirectorySearcher class by supplying empty strings.


```
PS C:\> [adsisearcher]""
```

```
CacheResults             : True
ClientTimeout            : -00:00:01
PropertyNamesOnly        : False
Filter                   :
PageSize                 : 0
PropertiesToLoad         : {}
ReferralChasing          : External
SearchScope              : Subtree
ServerPageTimeLimit      : -00:00:01
ServerTimeLimit          : -00:00:01
SizeLimit                : 0
SearchRoot               : System.DirectoryServices.DirectoryEntry
Sort                     : System.DirectoryServices.SortOption
Asynchronous             : False
Tombstone                : False
AttributeScopeQuery      :
DerefAlias               : Never
SecurityMasks            : None
ExtendedDN               : None
DirectorySynchronization :
VirtualListView          :
Site                     :
Container                :



```



```
PS C:\> [adsisearcher]"" | get-member
```

```
   TypeName: System.DirectoryServices.DirectorySearcher

Name                      MemberType Definition
----                      ---------- ----------
Disposed                  Event      System.EventHandler Disposed(System.Object, System.EventArgs)
CreateObjRef              Method     System.Runtime.Remoting.ObjRef CreateObjRef(type requestedType)
Dispose                   Method     void Dispose(), void IDisposable.Dispose()
Equals                    Method     bool Equals(System.Object obj)
FindAll                   Method     System.DirectoryServices.SearchResultCollection FindAll()
FindOne                   Method     System.DirectoryServices.SearchResult FindOne()
GetHashCode               Method     int GetHashCode()
GetLifetimeService        Method     System.Object GetLifetimeService()
GetType                   Method     type GetType()
InitializeLifetimeService Method     System.Object InitializeLifetimeService()
ToString                  Method     string ToString()
Asynchronous              Property   bool Asynchronous {get;set;}
AttributeScopeQuery       Property   string AttributeScopeQuery {get;set;}
CacheResults              Property   bool CacheResults {get;set;}
ClientTimeout             Property   timespan ClientTimeout {get;set;}
Container                 Property   System.ComponentModel.IContainer Container {get;}
DerefAlias                Property   System.DirectoryServices.DereferenceAlias DerefAlias {get;set;}
DirectorySynchronization  Property   System.DirectoryServices.DirectorySynchronization DirectorySynchronization {get;set;}
ExtendedDN                Property   System.DirectoryServices.ExtendedDN ExtendedDN {get;set;}
Filter                    Property   string Filter {get;set;}
PageSize                  Property   int PageSize {get;set;}
PropertiesToLoad          Property   System.Collections.Specialized.StringCollection PropertiesToLoad {get;}
PropertyNamesOnly         Property   bool PropertyNamesOnly {get;set;}
ReferralChasing           Property   System.DirectoryServices.ReferralChasingOption ReferralChasing {get;set;}
SearchRoot                Property   adsi SearchRoot {get;set;}
SearchScope               Property   System.DirectoryServices.SearchScope SearchScope {get;set;}
SecurityMasks             Property   System.DirectoryServices.SecurityMasks SecurityMasks {get;set;}
ServerPageTimeLimit       Property   timespan ServerPageTimeLimit {get;set;}
ServerTimeLimit           Property   timespan ServerTimeLimit {get;set;}
Site                      Property   System.ComponentModel.ISite Site {get;set;}
SizeLimit                 Property   int SizeLimit {get;set;}
Sort                      Property   System.DirectoryServices.SortOption Sort {get;set;}
Tombstone                 Property   bool Tombstone {get;set;}
VirtualListView           Property   System.DirectoryServices.DirectoryVirtualListView VirtualListView {get;set;}
```


Here we will be interested by the<span style="font-family: Courier New, Courier, monospace;">FindOne() and <span style="font-family: Courier New, Courier, monospace;">FindAll() methods to perform our searches, the problem is... how to filter the result, we just have thousands of objects with different object types.

After some search I found a list of the different Logical Operators and main Filters available for LDAP Search Filtering.

<u>Logical Operators</u>

<table border="0" cellpadding="0" cellspacing="0" class="MsoNormalTable" style="border-collapse: collapse; width: 391px;"> <tbody><tr style="height: 15.0pt;">  <td nowrap="" style="background: black; border-bottom: solid white 1.0pt; border: none; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 91.0pt;" valign="bottom" width="121"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;"><b>Logical operator</b></td>  <td nowrap="" style="background: black; border-bottom: solid white 1.0pt; border: none; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 202.0pt;" valign="bottom" width="269"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;"><b>Description</b></td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 91.0pt;" valign="bottom" width="121"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">=</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 202.0pt;" valign="bottom" width="269"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">Equal to</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 91.0pt;" valign="bottom" width="121"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">~=</td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 202.0pt;" valign="bottom" width="269"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">Approximately equal to</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 91.0pt;" valign="bottom" width="121"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;"><=</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 202.0pt;" valign="bottom" width="269"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">Lexicographically less than or equal to</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 91.0pt;" valign="bottom" width="121"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">>=</td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 202.0pt;" valign="bottom" width="269"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">Lexicographically greater than or equal to</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 91.0pt;" valign="bottom" width="121"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">&amp;</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 202.0pt;" valign="bottom" width="269"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">AND</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 91.0pt;" valign="bottom" width="121"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">|</td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 202.0pt;" valign="bottom" width="269"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">OR</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 91.0pt;" valign="bottom" width="121"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">!</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 202.0pt;" valign="bottom" width="269"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">NOT</td> </tr></tbody></table>
<u>Filters on objectCategory and objectClass</u>

<table border="0" cellpadding="0" cellspacing="0" class="MsoNormalTable" style="border-collapse: collapse; width: 512px;"> <tbody><tr style="height: 15.0pt;">  <td nowrap="" style="background: black; border-bottom: solid white 1.0pt; border: none; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;"><b>objectCategory</b></td>  <td nowrap="" style="background: black; border-bottom: solid white 1.0pt; border: none; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;"><b>objectClass</b></td>  <td nowrap="" style="background: black; border-bottom: solid white 1.0pt; border: none; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;"><b>Result</b></td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">person</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">user</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">user objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">person</td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"></td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">user and contact objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">person</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">contact</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">contact objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"></td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">user</td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">user and computer objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">computer</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"></td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">computer objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">user</td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"></td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">user and contact objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"></td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">contact</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">contact objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"></td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">computer</td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">computer objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"></td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">person</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">user, computer, and contact objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">contact</td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"></td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">user and contact objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">group</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"></td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">group objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"></td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">group</td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">group objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">person</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">organizationalPerson</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">user and contact objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"></td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">organizationalPerson</td>  <td nowrap="" style="background: #4472C4; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">user, computer, and contact objects</td> </tr><tr style="height: 15.0pt;">  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">organizationalPerson</td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 105.0pt;" valign="bottom" width="140"></td>  <td nowrap="" style="background: #305496; height: 15.0pt; padding: 0cm 5.4pt 0cm 5.4pt; width: 174.0pt;" valign="bottom" width="232"><div class="MsoNormal" style="line-height: normal; margin-bottom: .0001pt; margin-bottom: 0cm;">user and contact objects</td> </tr></tbody></table>
<a href="https://social.technet.microsoft.com/wiki/contents/articles/5392.active-directory-ldap-syntax-filters.aspx" target="_blank">More information on filters and examples.</a>


Now we can start to work with some basic filtering.


```
PS C:\> ([adsisearcher]"name=*jonathan*").FindAll()
```

```
Path                                              Properties
----                                              ----------
LDAP://CN=JonathanD,CN=Users,DC=FX,DC=LAB         {givenname, codepage, objectcategory, departme...
LDAP://CN=Jonathan Dumoulin,CN=Users,DC=FX,DC=LAB {givenname, codepage, objectcategory, descript...
LDAP://CN=Test Jonathan Group,CN=Users,DC=FX,D... {usnchanged, distinguishedname, grouptype, whe...
LDAP://OU=Test Jonathan OU,OU=Administration,D... {usnchanged, distinguishedname, whencreated, i...
LDAP://CN=Jonathan Contact,CN=Users,DC=FX,DC=LAB  {usnchanged, distinguishedname, displayname, w...

```


We get all kind of different type of objects: User, Organization Unit, Contact and Group objects.
Remember my coworker has the <span style="font-family: Courier New, Courier, monospace;">DisplayNameproperty.
He just wants to know what are their AccountName (SamAccount)

So let's try with DisplayName property


```
PS C:\> ([adsisearcher]"displayname=*jonathan*").FindAll()
```

```
Path                                              Properties
----                                              ----------
LDAP://CN=JonathanD,CN=Users,DC=FX,DC=LAB         {givenname, codepage, objectcategory, departme...
LDAP://CN=Jonathan Dumoulin,CN=Users,DC=FX,DC=LAB {givenname, codepage, objectcategory, descript...
LDAP://CN=Jonathan Contact,CN=Users,DC=FX,DC=LAB  {usnchanged, distinguishedname, displayname, w...

```

Better, but we still get 2 type of objects (Users and Contacts). We'll need to add an extra filter to get the user object type only.

Using the two tables above I will build my filter.
<u>Conditions</u>


* <b>ObjectCategory</b> = Person

* <b>ObjectClass</b> = User

* <b>DisplayName</b> = <input from user>

Finally, I use the ampersand symbol '<b>&amp;</b>' symbol at the start. The whole query can be translated to:
<i>Search for objectCategory=Person<b><u>AND</u></b>ObjectClass=user <b><u>AND</u></b> DisplayName = <input user></i>



```
PS C:\> ([adsisearcher]"(&amp;(objectCategory=person)(objectClass=User)(displayname=*jonatha
n*))").FindAll()
```

```
Path                                              Properties
----                                              ----------
LDAP://CN=JonathanD,CN=Users,DC=FX,DC=LAB         {givenname, codepage, objectcategory, departme...
LDAP://CN=Jonathan Dumoulin,CN=Users,DC=FX,DC=LAB {givenname, codepage, objectcategory, descript...

```


Awesome! :-)
Now we just have to select the properties we want:


```
PS C:\> ([adsisearcher]"(&amp;(objectClass=person)(objectClass=user)(displayname=*jonathan*)
)").FindAll().properties | Select-Object -first 1
```

```
Name                           Value
----                           -----
givenname                      {Jonathan}
codepage                       {0}
objectcategory                 {CN=Person,CN=Schema,CN=Configuration,DC=FX,DC=LAB}
department                     {FINANCE}
description                    {Account of Jonathan Delpiero}
usnchanged                     {196705}
instancetype                   {4}
logoncount                     {0}
name                           {JonathanD}
badpasswordtime                {0}
pwdlastset                     {0}
objectclass                    {top, person, organizationalPerson, user}
badpwdcount                    {0}
samaccounttype                 {805306368}
usncreated                     {61787}
sn                             {Delpiero}
objectguid                     {130 136 175 148 8 9 110 70 158 21 180 63 255 91 134 170}
whencreated                    {5/20/2013 2:26:31 AM}
adspath                        {LDAP://CN=JonathanD,CN=Users,DC=FX,DC=LAB}
useraccountcontrol             {512}
cn                             {JonathanD}
countrycode                    {0}
l                              {Montreal}
primarygroupid                 {513}
whenchanged                    {10/12/2013 4:04:01 AM}
title                          {Assistant}
lastlogon                      {0}
dscorepropagationdata          {1/1/1601 12:00:00 AM}
distinguishedname              {CN=JonathanD,CN=Users,DC=FX,DC=LAB}
samaccountname                 {JonathanD}
objectsid                      {1 5 0 0 0 0 0 5 21 0 0 0 180 190 60 92 74 161 105 103 20 195 233...
lastlogoff                     {0}
displayname                    {Jonathan Delpiero}
accountexpires                 {9223372036854775807}

```



