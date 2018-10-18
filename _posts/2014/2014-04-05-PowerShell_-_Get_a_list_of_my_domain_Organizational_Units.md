---
layout: single
title: PowerShell - Get a list of my domain Organizational Units
excerpt: This article shows how to list organization unit in your Active Directory using the AD Module and ADSI
permalink: /2014/04/powershell-get-list-of-my-domain.html
tags: 
- .net
- active directory
- activedirectory module
- adsi
- csv
- powershell
published: true
comments: true
toc: true
toc_label: "Table of Content"
classes: wide
---

<a href="{{ site.url }}/images/2014/20140405_PowerShell_-_Get_a_list_of_my_domain_Organizational_Units/1396679449_active_directory__771843079__-128x128.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140405_PowerShell_-_Get_a_list_of_my_domain_Organizational_Units/1396679449_active_directory__771843079__-128x128.png" /></a>Quick post, last week my coworker <a href="http://www.virtualizemydc.ca/" target="_blank">Andrey</a> needed to list all the Organization Units in the domain by Canonical Name. I thought sharing the PowerShell One-Liner magic could save time to some people out there.

In the following examples two methods to retrieve the information using<b>Active Directory</b> and <b>ADSI/NET</b>.

## Active Directory Module

I found two ways to get this information using this module

* `Get-ADOrganizationUnit`
* `Get-ADObject`

First we need to verify if the module is loaded and then search for Cmdlet that could meet our needs.

```powershell
# Check if the ActiveDirectory module is Loaded
Get-Module -Name ActiveDirevtory

# Check if the ActiveDirectory module is available
Get-Module -Name ActiveDirectory -ListAvailable

# Import the ActiveDirectory module
Import-Module -Name ActiveDirectory

# Find Cmdlets in the ActiveDirectory related to OrganizationalUnit
Get-Command -Module ActiveDirectory -Name *OrganizationalUnit*
```

![Get_a_list_of_my_domain_Organizational_Units]({{ site.url }}{{ site.baseurl }}/images/2014/20140405_PowerShell_-_Get_a_list_of_my_domain_Organizational_Units/2014-04-04_21-39-53__683241467__-691x426.png)

## Get-ADOrganizationalUnit

The Get-ADOrganizational unit cmdlet gets an organizational unit object or performs a search to retrieve multiple organizational units.

Straight forward, we look for the properties available to us.

```powershell
# Get the properties available for each OrganizationalUnit object
Get-ADOrganizationalUnit -Filter * -Properties *| Get-Member
```

**Output:**

```text

   TypeName: Microsoft.ActiveDirectory.Management.ADOrganizationalUnit

Name                            MemberType            Definition
----                            ----------            ----------
Contains                        Method                bool Contains(string propertyName)
Equals                          Method                bool Equals(System.Object obj)
GetEnumerator                   Method                System.Collections.IDictionaryEnumerator G...
GetHashCode                     Method                int GetHashCode()
GetType                         Method                type GetType()
ToString                        Method                string ToString()
Item                            ParameterizedProperty Microsoft.ActiveDirectory.Management.ADPro...
CanonicalName                   Property              System.String CanonicalName {get;}
City                            Property              System.String City {get;set;}
CN                              Property              System.String CN {get;}
Country                         Property              System.String Country {get;set;}
Created                         Property              System.DateTime Created {get;}
createTimeStamp                 Property              System.DateTime createTimeStamp {get;}
Deleted                         Property              System.Boolean Deleted {get;}
Description                     Property              System.String Description {get;set;}
DisplayName                     Property              System.String DisplayName {get;set;}
DistinguishedName               Property              System.String DistinguishedName {get;set;}
dSCorePropagationData           Property              Microsoft.ActiveDirectory.Management.ADPro...
gPLink                          Property              System.String gPLink {get;set;}
instanceType                    Property              System.Int32 instanceType {get;}
isCriticalSystemObject          Property              System.Boolean isCriticalSystemObject {get...
isDeleted                       Property              System.Boolean isDeleted {get;}
LastKnownParent                 Property              System.String LastKnownParent {get;}
LinkedGroupPolicyObjects        Property              Microsoft.ActiveDirectory.Management.ADPro...
ManagedBy                       Property              System.String ManagedBy {get;set;}
Modified                        Property              System.DateTime Modified {get;}
modifyTimeStamp                 Property              System.DateTime modifyTimeStamp {get;}
Name                            Property              System.String Name {get;}
nTSecurityDescriptor            Property              System.DirectoryServices.ActiveDirectorySe...
ObjectCategory                  Property              System.String ObjectCategory {get;}
ObjectClass                     Property              System.String ObjectClass {get;set;}
ObjectGUID                      Property              System.Nullable`1[[System.Guid, mscorlib, ...
ou                              Property              Microsoft.ActiveDirectory.Management.ADPro...
PostalCode                      Property              System.String PostalCode {get;set;}
ProtectedFromAccidentalDeletion Property              System.Boolean ProtectedFromAccidentalDele...
sDRightsEffective               Property              System.Int32 sDRightsEffective {get;}
showInAdvancedViewOnly          Property              System.Boolean showInAdvancedViewOnly {get...
State                           Property              System.String State {get;set;}
StreetAddress                   Property              System.String StreetAddress {get;set;}
systemFlags                     Property              System.Int32 systemFlags {get;}
uSNChanged                      Property              System.Int64 uSNChanged {get;}
uSNCreated                      Property              System.Int64 uSNCreated {get;}
whenChanged                     Property              System.DateTime whenChanged {get;}
whenCreated                     Property              System.DateTime whenCreated {get;}
```

Now we just have to filter on the property `CanonicalName`.

```powershell
# Get the property CanonicalName for each Organizational Unit
Get-ADOrganizationalUnit -Filter * -Properties CanonicalName | Select-Object -Property CanonicalName
```

**Output:**

```text
CanonicalName
-------------
FX.LAB/Domain Controllers
FX.LAB/TEST
FX.LAB/TEST/Groups
FX.LAB/MTL
FX.LAB/Administration
FX.LAB/Administration/Local
FX.LAB/Administration/Global
FX.LAB/Administration/Admin Users
FX.LAB/Administration/ServiceAccounts
FX.LAB/Administration/Test Jonathan OU
FX.LAB/TEST/Users
FX.LAB/TEST/Servers
FX.LAB/Winter Scripting Games 2014
FX.LAB/Winter Scripting Games 2014/Event3
FX.LAB/Winter Scripting Games 2014/Event3/Finance Department

```

# Get-ADObject

The `Get-ADObject` cmdlet gets an Active Directory object or performs a search to retrieve multiple objects.

```powershell
# Get Organizational Unit objects
Get-ADObject -Filter { ObjectClass -eq 'organizationalunit' }
```

![Get_a_list_of_my_domain_Organizational_Units]({{ site.url }}{{ site.baseurl }}/images/2014/20140405_PowerShell_-_Get_a_list_of_my_domain_Organizational_Units/2014-04-04_22-45-52__806703649__-692x442.png)

```powershell
# Get Organizational Unit objects
Get-ADObject -Filter { ObjectClass -eq 'organizationalunit' } -PropertiesCanonicalName | Select-Object -Property CanonicalName
```

**Output:**

```text
CanonicalName
-------------
FX.LAB/Domain Controllers
FX.LAB/TEST
FX.LAB/TEST/Groups
FX.LAB/MTL
FX.LAB/Administration
FX.LAB/Administration/Local
FX.LAB/Administration/Global
FX.LAB/Administration/Admin Users
FX.LAB/Administration/ServiceAccounts
FX.LAB/Administration/Test Jonathan OU
FX.LAB/TEST/Users
FX.LAB/TEST/Servers
FX.LAB/Winter Scripting Games 2014
FX.LAB/Winter Scripting Games 2014/Event3
FX.LAB/Winter Scripting Games 2014/Event3/Finance Department

```

# ADSI/NET

Finally, the ADSI method! This technique is a bit more complex, but this does not require any module/snapin and can be run from PowerShell without any pre-requisites.

```powershell
$info = ([adsisearcher]"objectclass=organizationalunit")
$info.PropertiesToLoad.AddRange("CanonicalName")
$info.findall().properties.canonicalname
```

![Get_a_list_of_my_domain_Organizational_Units]({{ site.url }}{{ site.baseurl }}/images/2014/20140405_PowerShell_-_Get_a_list_of_my_domain_Organizational_Units/2014-04-05_0-01-25__875077715__-692x346.png)
