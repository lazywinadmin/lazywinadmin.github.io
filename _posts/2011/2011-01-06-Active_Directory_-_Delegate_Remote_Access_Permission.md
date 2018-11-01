---
layout: single
title: Active Directory - Delegate Remote Access Permission
excerpt: 
permalink: /2011/01/active-directory-delegate-remote-access.html
tags: 
- active directory
- aduc
- mmc
- security
published: true
comments: true
---

Here are the steps I completed to do this. And yes it works through 
ADUC. 

## ManageDialin
 
Note: this model requires editing the `C:\windows\system32\DSSEC.DAT` file on the DC that you are running ADUC on. See http://support.microsoft.com/?id=296490 for more details. In short, some of the rights that need to be delegated are filtered out from the list by default. Edit the file so that these permissions are no longer 
filtered (set them from 7 to a 0): 
 
1. Set the following values to 0 under the [user] area in the file (not 
under [computer]):

```
msNPAllowDialin=0 
msNPCallingStationID=0 
msNPSavedCallingStationID=0 
msRADIUSCallbackNumber=0 
msRADIUSFramedIPAddress=0 
msRADIUSFramedRoute=0 
msRADIUSServiceType=0 

msRASSavedCallbackNumber=0 
msRASSavedFramedIPAddress=0 
msRASSavedFramedRoute=0
```

2. Save the file and then open ADUC / run delegation wizard etc as outlined below. 
1. Specify the group to delegate to (DELG Group) 
1. Select Create a custom task to delegate and select Next 
1. Select Only the following objects in the folder
   1. User objects 
1. Select Next 
1. Select General and Property-specific under Show these permissions 
1. Select **Read and Write Remote Access Information**
1. Select the Read and Write checkboxes for all of the following attributes 

```
msNPAllowDialin 
msNPCallingStationID 
msNPSavedCallingStationID 
msRADIUSCallbackNumber 
msRADIUSFramedIPAddress 
msRADIUSFramedRoute 
msRADIUSServiceType 
msRASSavedCallbackNumber 
msRASSavedFramedIPAddress 
msRASSavedFramedRoute 
userParameters
```

10. Select Next 
1. Review Summary and Select Finish to complete