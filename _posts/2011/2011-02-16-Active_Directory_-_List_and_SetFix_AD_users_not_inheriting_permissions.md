---
layout: single
title: Active Directory - List and Set/Fix AD users not inheriting permissions
excerpt: 
permalink: /2011/02/list-and-set-ad-users-not-inheriting.html
tags: 
- active directory
- powershell
- scripting
- security
- user account
published: true
comments: true
---
<u>updated:</u> 2013/03/29

<a href="{{ site.url }}/images/2011/20110216_Active_Directory_-_List_and_SetFix_AD_users_not_inheriting_permissions/ActiveDirectory-icon__2011490922__-132x146.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2011/20110216_Active_Directory_-_List_and_SetFix_AD_users_not_inheriting_permissions/ActiveDirectory-icon__2011490922__-132x146.png" /></a>Inherited permissions are those that are propagated to an object from a parent object. Inherited permissions ease the task of managing permissions and ensure consistency of permissions among all objects within a given container. 

If the Allow and Deny permission check boxes in the various parts of the access control user interface are shaded when you view the permissions of an object, the object has inherited permissions from a parent object. You can set these inherited permissions by using the Permissions tab of the Advanced Security Settings properties page.

<a href="http://technet.microsoft.com/en-us/library/cc726071.aspx" target="_blank">Check Technet for more information</a>

Here is the PowerShell way to check which users does not have Inheriting Permission and How to Enabling it for all your users. You will need to user <a href="http://www.quest.com/active-directory/" target="_blank">Quest Active Directory Snapin</a>

List Users without Inheriting Permission 
<pre class="brush: powershell; ruler: true; first-line: 1; highlight: [2, 4, 6]"># This Command will list the user not inheriting Permission
Get-QADUser -SizeLimit 0 | `
Where-Object {$_.DirectoryEntry.PSBase.ObjectSecurity.AreAccessRulesProtected}


```

Enabling Inheriting Permission for all Users
<pre class="brush: powershell; ruler: true; first-line: 1; highlight: [2, 4, 6]"># This Command will enable inheriting Permission for all the accounts
Get-QADUser -SizeLimit 0 | `
Where-Object {$_.DirectoryEntry.PSBase.ObjectSecurity.AreAccessRulesProtected} | `
Set-QADObjectSecurity -UnLockInheritance


```

