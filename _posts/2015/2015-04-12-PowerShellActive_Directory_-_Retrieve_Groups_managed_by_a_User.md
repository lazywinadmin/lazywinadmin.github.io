---
layout: single
title: PowerShell/Active Directory - Retrieve Groups managed by a User
excerpt: 
permalink: /2015/04/powershellactive-directory-retrieving.html
tags: 
- active directory
- activedirectory module
- adsi
- powershell
published: true
comments: true
---

 
<a href="{{ site.url }}/images/2015/20150412_PowerShellActive_Directory_-_Retrieve_Groups_managed_by_a_User/Manager-icon__1421794936__-96x96.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150412_PowerShellActive_Directory_-_Retrieve_Groups_managed_by_a_User/Manager-icon__1421794936__-96x96.png" /></a>I recently had an interesting request at work:
<b>Finding a way to list all the groups a specific user was managing.</b>

If you look into the properties of an Active Directory group object, you will find under the tab `ManagedBy` the name of a user or group who is managing the group and possibly its members if the `Manager can update membership list` is checked.

Group object properties / Managed By tab:
{% assign ImageText = 'Example using the TimeSpan parameter' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150412_PowerShellActive_Directory_-_Retrieve_Groups_managed_by_a_User/ManagerdBy_Tab__678788052__-432x477.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150412_PowerShellActive_Directory_-_Retrieve_Groups_managed_by_a_User/ManagerdBy_Tab__678788052__-432x477.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})

This is nice for one group.... what if the user manage tons of them ?



# Using the Active Directory Module and some LDAP Filtering

Using the PowerShell Cmdlet `Get-ADGroup` (from the Active Directory Module), I am using a LDAP filter to find groups that contain the user `DistinguishedName` in the `ManagedBy` attribute.

```powershell
# Retrieve the groups managed by the current user
Get-ADGroup -LDAPFilter "(ManagedBy=$((Get-ADuser -Identity $env:username).distinguishedname))"
```

{% assign ImageText = 'Example using the TimeSpan parameter' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150412_PowerShellActive_Directory_-_Retrieve_Groups_managed_by_a_User/Get-ADObject__2038758211__-852x508.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150412_PowerShellActive_Directory_-_Retrieve_Groups_managed_by_a_User/Get-ADObject__2038758211__-852x508.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})

For better performance and depending on the size of your Active Directory, I would also recommend to use the `-SearchBase` to better scope the search range of your query... and possibly use the `-ResultSize` if you expect a long list of groups.

Example:

```powershell
# Retrieve the groups managed by the current user
# and only search from "OU=Groups,DC=FX,DC=Lab"
Get-ADGroup -LDAPFilter "(ManagedBy=$((Get-ADuser -Identity $env:username).distinguishedname))" -SearchBase "OU=Groups,DC=FX,DC=Lab" -ResultSetSize 50
```


# Using ADSI/LDAP

If you don't want to rely on the Active Directory Module, you can also use ADSI.
Using the same above LDAP filter, we can query Active Directory this way:

```powershell
# Distinguished Name of the user
$DN = "CN=TestUser,OU=User,DC=FX,DC=Lab"

# Retrieve the groups managed by this user
([ADSISearcher]"(&(objectCategory=group)(ManagedBy=$DN))").findall()
```
{% assign ImageText = 'Example using the TimeSpan parameter' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150412_PowerShellActive_Directory_-_Retrieve_Groups_managed_by_a_User/ManagedByGet-ADSI_LDAP__124834729__-852x202.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150412_PowerShellActive_Directory_-_Retrieve_Groups_managed_by_a_User/ManagedByGet-ADSI_LDAP__124834729__-852x202.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})


You will then need to select the properties that you want to output.

For example:

```powershell
([ADSISearcher]"(&(objectCategory=group)(ManagedBy=$DN))").findall().properties |
ForEach-Object -Process {

    # Output the current object with only Name, DN and ManagedBy properties
    [pscustomobject][ordered]@{
        GroupName = $Psitem.name -as [string]
        GroupDistinguishedName = $Psitem.distinguishedname -as [string]
        GroupManagedby = $Psitem.managedby -as [string]
    }
}
```

<br>

# Extra: Get all the groups that contains a manager

```powershell
# Retrieve the groups managed by the current user
Get-ADGroup -LDAPFilter "(ManagedBy=*)" -SearchBase "OU=Groups,DC=FX,DC=Lab" -Properties ManagedBy
```
<br>

# Other Resources

* [about_ActiveDirectory_Filter](https://technet.microsoft.com/en-us/library/hh531527%28v=ws.10%29.aspx)
  * Describes the syntax and behavior of the search filter supported by the Active Directory module for Windows PowerShell.