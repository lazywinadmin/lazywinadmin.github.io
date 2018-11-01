---
layout: single
title: PowerShell - Find Inactive Computers in Active Directory with ADSI
excerpt: Leveraging ADSI to retrieve inactive machine accounts in your domain.
permalink: /2014/03/powershell-find-inactive-computers-in.html
tags: 
- active directory
- adsi
- computer object
- powershell
published: true
comments: true
---


<a href="{{ site.url }}/images/2014/20140323_PowerShell_-_Find_Inactive_Computers_in_Active_Directory_with_ADSI/icon_find_computer__674497977__-127x135.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140323_PowerShell_-_Find_Inactive_Computers_in_Active_Directory_with_ADSI/icon_find_computer__674497977__-127x135.png" /></a>Today I wanted to retrieve inactive computer accounts in the Active Directory without using the Quest Active Directory Snapin or the Active Directory Module. Yes... It happens that you work on a computer that don't have those tools once in a while, and I thought It would be fun to have a script without requirements...

<u>Note</u>: BTW, the following solution might not be the best or most efficient, so let me know if you know a faster/easier way to do this, I'm willing to learn more about querying AD.

Here are the key element of the script, I want:

* Computer Inactive for >=90 days
* Be able to specify a SearchRoot
* Filter on the Operating System if possible (I want only Windows Servers, without the Domain controllers for example)
* Return SamAccountName, Name, DN, Operating System, and Description
* Limit the number of object to return (can be useful for large environment)

# [adsisearcher]

I already talked about ADSISearcher<a href="{{ site.url }}/2013/10/powershell-get-domainuser.html" target="_blank"> in a previous post</a>so I won't give too much details about it. [adsisearcher] type accelerator is used to search Active Directory Domain Services (ADDS)

After some research and tests I quickly got the following line which return the basic information of what I want:

```powershell
([adsisearcher]"(&amp;(objectcategory=computer)(lastlogontimestamp<=$((Get-Date).AddDays(-105).ToFileTime())))").findall()
```

**Output:**

```text
Path                                              Properties
----                                              ----------
LDAP://CN=XAVIERLAPTOP,CN=Computers,DC=FX,DC=LAB  {logoncount, codepage, objectcategory, descrip...
LDAP://CN=LAB1VC01,OU=Servers,OU=TEST,DC=FX,DC... {logoncount, codepage, objectcategory, descrip...
LDAP://CN=LAB1VH02,OU=Servers,OU=TEST,DC=FX,DC... {logoncount, codepage, objectcategory, descrip...
LDAP://CN=LAB1VH01,OU=Servers,OU=TEST,DC=FX,DC... {logoncount, codepage, objectcategory, descrip...
LDAP://CN=DHCP1,CN=Computers,DC=FX,DC=LAB         {logoncount, codepage, objectcategory, descrip...
LDAP://CN=LAB1SQL01,OU=Servers,OU=TEST,DC=FX,D... {logoncount, codepage, objectcategory, descrip...
LDAP://CN=LAB1CM01,CN=Computers,DC=FX,DC=LAB      {logoncount, codepage, objectcategory, descrip...
LDAP://CN=LAB1OR01,OU=Servers,OU=TEST,DC=FX,DC... {logoncount, codepage, objectcategory, descrip...
LDAP://CN=LAB1VC02,OU=Servers,OU=TEST,DC=FX,DC... {logoncount, codepage, objectcategory, descrip...
```

Next the properties. If we a take look at the list of properties and methods available with this object we might be able to find what we need. We can do this using Get-Member

```powershell
([adsisearcher]"(&amp;(objectcategory=computer)(lastlogontimestamp<=$((Get-Date).AddDays(-105).ToFileTime())))") | Get-Member
```

**Output:**

```text
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
DirectorySynchronization  Property   System.DirectoryServices.DirectorySynchronization DirectorySynchronization {get...
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

Looks like the following properties will do just what we need:

* <b>SearchRoot</b> (ADSI Object, Distinguished Name of the organization unit) this will be used to specify the root of the search
* <b>SizeLimit </b>(Integer), to limit the number of object in the output (Can be useful in large environment),
* <b>PropertiesToLoad</b> (String), to select the properties I want in the output,
* <b>Filter</b> (String/LDAP Query), to limit the query to computer with a specific Operating System.

```powershell
$searcher = [adsisearcher]"(&amp;(objectcategory=computer)(lastlogontimestamp<=$((Get-Date).AddDays(-90).ToFileTime())))"
$searcher.searchRoot = [adsi]"LDAP://OU=Servers,OU=TEST,dc=fx,dc=lab"
$searcher.SizeLimit = "5"
$searcher.Filter = "(&amp;(objectCategory=computer)(operatingSystem=*Windows*server*))"
$searcher.PropertiesToLoad.AddRange(('name','samaccountname','cn','operatingsystem','description'))
$searcher.FindAll()
```

**Output:**

```text
Name                           Value
----                           -----
samaccountname                 {LAB1HYPE02$}
name                           {LAB1HYPE02}
operatingsystem                {Windows Server 2012 R2 Standard}
cn                             {LAB1HYPE02}
adspath                        {LDAP://CN=LAB1HYPE02,OU=Servers,OU=TEST,DC=FX,DC=LAB}
samaccountname                 {LAB1HYPE01$}
name                           {LAB1HYPE01}
operatingsystem                {Windows Server 2012 R2 Standard}
cn                             {LAB1HYPE01}
adspath                        {LDAP://CN=LAB1HYPE01,OU=Servers,OU=TEST,DC=FX,DC=LAB}
samaccountname                 {LAB1SQL01$}
description                    {SQL2012}
name                           {LAB1SQL01}
cn                             {LAB1SQL01}
operatingsystem                {Windows Server 2012 Standard}
adspath                        {LDAP://CN=LAB1SQL01,OU=Servers,OU=TEST,DC=FX,DC=LAB}
samaccountname                 {LAB1OR01$}
description                    {SCORCH2012}
name                           {LAB1OR01}
cn                             {LAB1OR01}
operatingsystem                {Windows Server 2012 Standard}
adspath                        {LDAP://CN=LAB1OR01,OU=Servers,OU=TEST,DC=FX,DC=LAB}
samaccountname                 {LAB1VC02$}
description                    {VMware vCenter}
name                           {LAB1VC02}
cn                             {LAB1VC02}
operatingsystem                {Windows Server 2012 Standard}
adspath                        {LDAP://CN=LAB1VC02,OU=Servers,OU=TEST,DC=FX,DC=LAB}

```

The output is poorly formated and we have some extra curly brackets that need to be take care of... Let's fix that by creating a new PowerShell object for each item retrieve by the query.

```powershell
$searcher = [adsisearcher]"(&amp;(objectcategory=computer)(lastlogontimestamp<=$((Get-Date).AddDays(-90).ToFileTime())))"
$searcher.searchRoot = [adsi]"LDAP://OU=Servers,OU=TEST,dc=fx,dc=lab"
$searcher.SizeLimit = "5"
$searcher.Filter = "(&amp;(objectCategory=computer)(operatingSystem=*server*))"
$searcher.PropertiesToLoad.AddRange(('name','samaccountname','distinguishedname','operatingsystem','description'))
Foreach ($ComputerAccount in $searcher.FindAll()){
    New-Object -TypeName PSObject -Property @{
        Name = $ComputerAccount.properties.name -as [string]
        SamAccountName = $ComputerAccount.properties.samaccountname -as [string]
        DistinguishedName = $ComputerAccount.properties.distinguishedname -as [string]
        OperatingSystem = $ComputerAccount.properties.operatingsystem -as [string]
        Description = $ComputerAccount.properties.description -as [string]
    }
}
```

```text
DistinguishedName : CN=LAB1HYPE02,OU=Servers,OU=TEST,DC=FX,DC=LAB
Name              : LAB1HYPE02
OperatingSystem   : Windows Server 2012 R2 Standard
Description       : 
SamAccountName    : LAB1HYPE02$

DistinguishedName : CN=LAB1HYPE01,OU=Servers,OU=TEST,DC=FX,DC=LAB
Name              : LAB1HYPE01
OperatingSystem   : Windows Server 2012 R2 Standard
Description       : 
SamAccountName    : LAB1HYPE01$

DistinguishedName : CN=LAB1SQL01,OU=Servers,OU=TEST,DC=FX,DC=LAB
Name              : LAB1SQL01
OperatingSystem   : Windows Server 2012 Standard
Description       : SQL2012
SamAccountName    : LAB1SQL01$

DistinguishedName : CN=LAB1OR01,OU=Servers,OU=TEST,DC=FX,DC=LAB
Name              : LAB1OR01
OperatingSystem   : Windows Server 2012 Standard
Description       : SCORCH2012
SamAccountName    : LAB1OR01$

DistinguishedName : CN=LAB1VC02,OU=Servers,OU=TEST,DC=FX,DC=LAB
Name              : LAB1VC02
OperatingSystem   : Windows Server 2012 Standard
Description       : VMware vCenter
SamAccountName    : LAB1VC02$

```

That's way better! Neat!

# My previous posts on ADSI

* <a href="{{ site.url }}/2013/11/powershell-add-ad-site-subnet.html" target="_blank">PowerShell - Add AD Site Subnet</a>
* <a href="{{ site.url }}/2013/10/powershell-get-domaincomputer-adsi.html" target="_blank">PowerShell - Get-DomainComputer (ADSI)</a>
* <a href="{{ site.url }}/2013/10/powershell-using-adsi-with-alternate.html" target="_blank">PowerShell - Using ADSI with alternate Credentials</a>
* <a href="{{ site.url }}/2013/10/powershell-get-domainuser.html" target="_blank">PowerShell - Get-DomainUser</a>