---
layout: single
title: Active Directory - How to grant an account to use Sync-ADObject ?
excerpt: 
permalink: /2016/03/active-directory-how-to-grant-account.html
tags: 
- active directory
- powershell
- security
published: true
comments: true
---

 
<img imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;" border="0" src="{{ site.url }}/images/2016/20160319_Active_Directory_-_How_to_grant_an_account_to_use_Sync-ADObject_/Site_Map__1914663504__-96x96.png" />During an onboarding process, I had to create some accounts on a remote site where the Exchange Role is installed. There, the account can be mail-enabled. We do this because the information will get replicated to Office365 faster and we will be able to proceed with other automated tasks.

Once the account is created, mail-enabled, sync to Office365, added to a couple of DLs, I needed to sync back the account to my local Domain Controller.

This can be done using the Cmdlet ```Sync-ADobject``` from the Active Directory module.

Of course you will need to give explicit permission to an account to perform this action else you will get the following message:

```Sync-ADObject : Insufficient access rights to perform the operation```

To grant permission, you'll need to launch the ADSIEdit tool and grant permission at the root of the domain for ```Replication Synchronisation```

<img border="0" src="{{ site.url }}/images/2016/20160319_Active_Directory_-_How_to_grant_an_account_to_use_Sync-ADObject_/replication_synchronization_permission__1889655891__-637x581.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" />

Once the permission granted, you'll see the following

<a href="{{ site.url }}/images/2016/20160319_Active_Directory_-_How_to_grant_an_account_to_use_Sync-ADObject_/replication_synchronization_Sync-AdObject__973336434__-1012x184.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="116" src="{{ site.url }}/images/2016/20160319_Active_Directory_-_How_to_grant_an_account_to_use_Sync-ADObject_/replication_synchronization_Sync-AdObject__334694765__-640x116.png" width="640" /></a>