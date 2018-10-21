---
layout: single
title: Active Directory - Saved Queries (ADUC MMC)
excerpt: 
permalink: /2010/09/active-directory-saved-queries-aduc-mmc.html
tags: 
- active directory
- aduc
- ldap
- mmc
- query
- scripting
published: true
comments: true
toc: true
---

>Updated: 2013/03/29

Active Directory Users and Computers provides a Saved Queries folder in which administrators can create, edit, save, and organize saved queries. Before saved queries, administrators were required to create custom ADSI scripts that would perform a query on common objects. This was an often lengthy process that required knowledge of how ADSI utilizes LDAP search filters to resolve a query.

All queries located in the Saved Queries folder are stored in Active Directory Users and Computers (dsa.msc). Once you have successfully created your customized set of queries you can copy the .msc file to other domain controllers (located in the same domain) and use the same set of saved queries. You can also export saved queries to an .xml file and import them into other Active Directory User and Computer consoles located on domain controllers (within the same domain)

## LDAP Syntax

* <a href="http://technet.microsoft.com/en-us/library/aa996205(v=exchg.65).aspx" style="line-height: 19px;" target="_blank">LDAP Query Basics</a>
* <a href="http://msdn.microsoft.com/en-ca/library/windows/desktop/aa746475(v=vs.85).aspx" target="_blank">Search Filter Syntax</a>

## LDAP Queries

### Windows XP Computers with Service Pack 2 Installed

`(&(objectCategory=computer)(operatingSystem=Windows XP Professional)(operatingSystemServicePack=Service Pack 2))`

### Windows XP Computers with Service Pack 1 Installed

`(&(operatingSystem=Windows XP*l)(operatingSystemServicePack=Service Pack 1)))`

### Windows XP Computers with No Service Pack Installed

Notice the “!” before operating SystemServicePack and the “*”. The “!” means NOT so the statement reads “NOT equal to anything” instead of NULL or empty quotes (”") like some other languages.
`(&(operatingSystem=Windows XP Professional)(!operatingSystemServicePack=*)))`

### Windows Server 2003 No Service Pack 1

`(&(objectCategory=computer)(operatingSystem=Windows Server 2003)(!operatingSystemServicePack=*))`

### Windows Server 2003 Service Pack 1 Installed

`(&(objectCategory=computer)(operatingSystem=Windows Server 2003)(operatingSystemServicePack=Service Pack 1))`

### Windows 2000 Professional
`(&(objectCategory=computer)(operatingSystem=Windows 2000 Professional))`

### Windows 2000 Server
`(&(objectCategory=computer)(operatingSystem=Windows 2000 Server))`

### All Windows Server 2003 Servers
`(&(objectCategory=computer)(operatingSystem=Windows Server 2003))`

### SQL Servers (running on Windows 2003) (please verify in your environment)
`(&(objectCategory=computer)(servicePrincipalName=MSSQLSvc*)(operatingSystem=Windows Server 2003))`

### SQL Servers any Windows Server OS
`(&(objectCategory=computer)(servicePrincipalName=MSSQLSvc*)(operatingSystem=Windows Server*))`

### Exchange Servers (running on Windows 2003) (please verify in your environment)
`(&(objectCategory=computer)(servicePrincipalName=exchangeMDB*)(operatingSystem=Windows Server 2003))`

### Exchange Servers any Windows Server OS
`(&(objectCategory=computer)(servicePrincipalName=exchangeMDB*)(operatingSystem=Windows Server*))`

### Windows Vista SP1
`(&(objectCategory=computer)(operatingSystem=Windows Vista*)(operatingSystemServicePack=Service Pack 1))`

### Windows Server 2008 Enterprise
`(&(objectCategory=computer)(operatingSystem=Windows Server® 2008 Enterprise)(operatingSystemServicePack=Service Pack 1))`

### Windows Server 2008 (all versions)
`(&(objectCategory=computer)(operatingSystem=Windows Server® 2008*))`
Notice the `®` in the Windows 2008 values, it needs to be in the query or there won’t be any results.

### Groups Like Service (finds any group name that contains the word service)
`(objectcategory=group)(samaccountname=*service*)`

### Description Like Service (finds accounts in which the description contains the word service)
`(objectcategory=person)(description=*service*)`

### Groups Like Admin (finds any groups whose name contains the word admin)
`(objectcategory=group)(samaccountname=*admin*)`

### Universal Groups (finds groups with universal scope)
`(groupType:1.2.840.113556.1.4.803:=8)`

### Groups with No Members (finds groups that have no members in them)
`(objectCategory=group)(!member=*)`
Note: The `!` symbol means "Not" and `*` means "Has a value," so the combination of the two evaluates to “Doesn’t have a value.”

### Global, Domain Local, or Universal Groups (finds any group defined as a Global Group, a Domain Local Group, or a Universal Group)
`(groupType:1.2.840.113556.1.4.804:=14)`

### Global Group, a Domain Local Group, or a Universal Group that has no members)
`(groupType:1.2.840.113556.1.4.804:=14)(!member=*)`

### User Like Service (finds any account ID that has a name containing the word service)
`(objectcategory=person)(samaccountname=*service*)`

### Password Does Not Expire (finds user accounts with nonexpiring passwords)
`(objectCategory=person)(objectClass=user)(userAccountControl:1.2.840.113556.1.4.803:=65536)`

### No Employee ID (finds any user account that has no employeeid value)
`(objectcategory=person)(!employeeid=*)`

### No Login Script (finds accounts that don't run a logon script)
`(objectcategory=person)(!scriptPath=*)`

### No Profile Path (finds accounts that don’t have roaming profiles)
`(objectcategory=person)(!profilepath=*)`

### Must Change Password and Not Disabled (finds nondisabled accounts that must change their password at next logon)
`(objectCategory=person)(objectClass=user)(pwdLastSet=0)(!useraccountcontrol:1.2.840.113556.1.4.803:=2)`

### UserList Exclude Disabled Account (finds all user accounts except those that are disabled)
`(objectCategory=person)(objectClass=user)(!useraccountcontrol:1.2.840.113556.1.4.803:=2)`

### Locked Out Accounts (finds all locked out accounts)
`(objectCategory=person)(objectClass=user)(useraccountcontrol:1.2.840.113556.1.4.803:=16)`

### Domain Local Groups (finds groups with Domain Local scope)
`(groupType:1.2.840.113556.1.4.803:=4)`

### Users with Email Address (finds accounts that have an email address)
`(objectcategory=person)(mail=*)`

### Users with No Email Address (finds accounts with no email address)
`(objectcategory=person)(!mail=*)`

### Find Groups that contains the word admin
`(objectcategory=group)(samaccountname=*admin*)`

### Find users who have admin in description field
`(objectcategory=person)(description=*admin*)`

### Find all Universal Groups
`(groupType:1.2.840.113556.1.4.803:=8)`

### Empty Groups with No Members
`(objectCategory=group)(!member=*)`

### Finds all groups defined as a Global Group, a Domain Local Group, or a Universal Group
`(groupType:1.2.840.113556.1.4.804:=14)`

### Find all User with the name Bob
`(objectcategory=person)(samaccountname=*Bob*)`

### Find user accounts with passwords set to never expire
`(objectCategory=person)(objectClass=user)(userAccountControl:1.2.840.113556.1.4.803:=65536)`

### Find all users that never log in to domain
`(&(&(objectCategory=person)(objectClass=user))(|(lastLogon=0)(!(lastLogon=*))))`

### Find user accounts with no log on script
`(objectcategory=person)(!scriptPath=*)`

### Find user accounts with no profile path
`(objectcategory=person)(!profilepath=*)

### Finds non disabled accounts that must change their password at next logon
`(objectCategory=person)(objectClass=user)(pwdLastSet=0)(!useraccountcontrol:1.2.840.113556.1.4.803:=2)`

### Finds all disabled accounts in active directory
`(objectCategory=person)(objectClass=user)(useraccountcontrol:1.2.840.113556.1.4.803:=2)`

### Finds all locked out accounts
`(objectCategory=person)(objectClass=user)(useraccountcontrol:1.2.840.113556.1.4.803:=16)`

### Finds Domain Local Groups
`(groupType:1.2.840.113556.1.4.803:=4)`

### Finds all Users with Email Address set
`(objectcategory=person)(mail=*)`

### Finds all Users with no Email Address
`(objectcategory=person)(!mail=*)`

### Find all Users, Groups or Contacts where Company or Description is Contractors
`(|(objectcategory=user)(objectcategory=group)(objectcategory=contact))(|(description=North*)(company=Contractors*))`

### Find all Users with Mobile numbers 712 or 155
`(objectcategory=user)(|(mobile=712*)(mobile=155*))`

### Find all Users with Dial-In permissions
`(objectCategory=user)(msNPAllowDialin=TRUE)`

### Find All printers with Color printing capability
Note: server name must be changed
`(&(&(&(uncName=*Servername*)(objectCategory=printQueue)(printColor=TRUE))))`

### Find Users Mailboxes Overriding Exchange Size Limit Policies
`(&(&(&objectCategory=user)(mDBUseDefaults=FALSE)))`

### Find all Users that need to change password on next login.
`(&(objectCategory=user)(pwdLastSet=0))`

### Find all Users that are almost Locked-Out
Notice the “>=” that means “Greater than or equal to”.
`(objectCategory=user)(badPwdCount>=2)`

### Find all Computers that do not have a Description
`(objectCategory=computer)(!description=*)`

### Find all users with Hidden Mailboxes
`(&(objectCategory=person)(objectClass=user)(msExchHideFromAddressLists=TRUE))`

### Find all Windows 2000 SP4 computers
`(&(&(&(objectCategory=Computer)(operatingSystem=Windows 2000 Professional)(operatingSystemServicePack=Service Pack 4))))`

### Find all Windows XP SP2 computers
`(&(&(&(&(&(&(&(objectCategory=Computer)(operatingSystem=Windows XP Professional)(operatingSystemServicePack=Service Pack 2))))))))`

### Find all Windows XP SP3 computers
`(&(&(&(&(&(&(&(objectCategory=Computer)(operatingSystem=Windows XP Professional)(operatingSystemServicePack=Service Pack 3))))))))`

### Find all Vista SP1 computers
`(&(&(&(&(sAMAccountType=805306369)(objectCategory=computer)(operatingSystem=Windows Vista*)(operatingSystemServicePack=Service Pack 1)))))`

### Find All Workstations
`(sAMAccountType=805306369)`

### Find all 2003 Servers Non-DCs
`(&(&(&(samAccountType=805306369)(!(primaryGroupId=516)))(objectCategory=computer)(operatingSystem=Windows Server 2003*)))`

### Find all 2003 Servers – DCs
`(&(&(&(samAccountType=805306369)(primaryGroupID=516)(objectCategory=computer)(operatingSystem=Windows Server 2003*))))`

### Find all Server 2008
`(&(&(&(&(samAccountType=805306369)(!(primaryGroupId=516)))(objectCategory=computer)(operatingSystem=Windows Server 2008*))))`

### Find all user accounts that have the name “srv_acct” in them, if your service accounts follow a naming convention.
`(objectcategory=person)(samaccountname=*srv_acct*)`

### Find all groups that have no members
`(objectCategory=group)(!member=*)`

### Find users that have non-expiring passwords.
`(objectCategory=person)(objectClass=user)(userAccountControl:1.2.840.113556.1.4.803:=65536)`

### Find users created between 2010-01-01 and 2011-01-01
`(&(&(objectCategory=user)(whenCreated>=20100101000000.0Z&<=20110101000000.0Z&)))`