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
<span class="postbody">Here are the steps I completed to do this. And yes it works through 
ADUC. 

<b>ManageDialin</b>
<span class="postbody"><b></b>
<u>Note:</u> this model requires editing the C:\windows\system32\DSSEC.DAT 
file on the DC that you are running ADUC on. See 
<a href="http://support.microsoft.com/?id=296490" style="text-decoration: underline;" target="_blank">http://support.microsoft.com/?id=296490</a> for more details. In short, 
some of the rights that need to be delegated are filtered out from the 
list by default. Edit the file so that these permissions are no longer 
filtered (set them from 7 to a 0): 

<span class="postbody">1. Set the following values to 0 under the [user] area in the file (not 
under [computer]): 
<i>"   msNPAllowDialin=0 
msNPCallingStationID=0 
msNPSavedCallingStationID=0 
msRADIUSCallbackNumber=0 
msRADIUSFramedIPAddress=0 
msRADIUSFramedRoute=0 
msRADIUSServiceType=0 

msRASSavedCallbackNumber=0 
msRASSavedFramedIPAddress=0 
msRASSavedFramedRoute=0"</i>  

<span class="postbody">2. Save the file and then open ADUC / run delegation wizard etc as 
outlined below. 
3. Specify the group to delegate to (DELG Group) 
4. Select Create a custom task to delegate and select Next 
5. Select Only the following objects in the folder 
a. User objects 
6. Select Next 
7. Select General and Property-specific under Show these permissions 
8. Select "Read and Write Remote Access Information" 
9. Select the Read and Write checkboxes for all of the following 
attributes 
<i>"   msNPAllowDialin 
msNPCallingStationID 
msNPSavedCallingStationID 
msRADIUSCallbackNumber 
msRADIUSFramedIPAddress 
msRADIUSFramedRoute 
msRADIUSServiceType 
msRASSavedCallbackNumber 
msRASSavedFramedIPAddress 
msRASSavedFramedRoute 
userParameters" </i>

<span class="postbody">10. Select Next 
11. Review Summary and Select Finish to complete 
