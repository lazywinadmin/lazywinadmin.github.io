---
layout: single
title: PowerShell/SCSM - Retrieving Active Directory Object Classes
excerpt: 
permalink: /2014/08/powershell-scsm-retrieving-active.html
tags: 
- active directory
- powershell
- sco
- scorch
- scsm
- scsm2012r2
- smlets
- system center 2012 service manager r2
published: true
comments: true
---

 
 
<a href="{{ site.url }}/images/2014/20140824_PowerShellSCSM_-_Retrieving_Active_Directory_Object_Classes/SCSM_128x128x32__1955049355__-128x128.png" imageanchor="1" style="clear: left; display: inline !important; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140824_PowerShellSCSM_-_Retrieving_Active_Directory_Object_Classes/SCSM_128x128x32__1955049355__-128x128.png" /></a>Following <a href="{{ site.url }}/2014/08/powershell-scsm-my-first-steps.html" target="_blank">my previous post</a>, today I continuemy SCSM journey. I had to create a new automation workflow using SCSM and SCORCH to give the ability to a portal user to add an Active Directory Account to one or more group(s).

Once you get the input of the user, the selected user account and groups impacted by the request are added to the Service Request Related Item, in the Configuration Item field.

Finding this information with PowerShell was not easy. Also Users and Groups are tagged as "User Class" and we want to avoid querying the Active Directory to verify is a user is really a user and a group... really a group object.



Here is an example of Service Request using the SCSM Console:
<a href="{{ site.url }}/images/2014/20140824_PowerShellSCSM_-_Retrieving_Active_Directory_Object_Classes/8-22-2014%252B8-29-42%252BPM__2120621519__-1028x905.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140824_PowerShellSCSM_-_Retrieving_Active_Directory_Object_Classes/8-22-2014%252B8-29-42%252BPM__2120621519__-1028x905.png" height="562" width="640" /></a>


See the objects highlighted, those are stored in the CMDB of SCSM and not in AD.
We properly see the class of each objects.




### Retrieving this information with PowerShell/Smlets module

Using PowerShell with the SMlets module, this information is not easily accessible.
<u style="font-weight: bold;">The problem:</u>We can't tell if an object is an user or a group. Computer however shows correctly as computer object.


```
# Get a single ticket with AD objects
$SRTicket = Get-SCSMObject -Id 992315e4-a94c-6e35-2720-51fe9808f903

# Get all the classes of the first object (which is a group in this case)
((Get-SCSMRelationshipObject -BySource $SRTicket -Filter "RelationshipID -eq 'd96c8b59-8554-6e77-0aa7-f51448868b43'").targetobject
```
<u>Note</u> that the RelationshipID'd96c8b59-8554-6e77-0aa7-f51448868b43'is used for Active Directory objects.

In the output, we have 2 groups, 1 user and 1 computer. But It looks like we can't find out if the groups are actually group object or a user is really an user object.

<a href="{{ site.url }}/images/2014/20140824_PowerShellSCSM_-_Retrieving_Active_Directory_Object_Classes/SR_RelationShipObject_filter_AD_Obj_bad_class__1389336323__-772x278.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140824_PowerShellSCSM_-_Retrieving_Active_Directory_Object_Classes/SR_RelationShipObject_filter_AD_Obj_bad_class__1389336323__-772x278.png" /></a>


### Finding the real class of an object

To work around that, we have to use the method <span style="font-family: Courier New, Courier, monospace;">GetClasses() which reveal more information.


```
# Get all the classes of the first object (which is a group in this case)
((Get-SCSMRelationshipObject -BySource $SRTicket -Filter "RelationshipID -eq 'd96c8b59-8554-6e77-0aa7-f51448868b43'").targetobject | Select-Object -First 1).getclasses()
```

Note that I'm selecting only the first object (Select -first 1), which is a group object.

<a href="{{ site.url }}/images/2014/20140824_PowerShellSCSM_-_Retrieving_Active_Directory_Object_Classes/8-22-2014%252B11-30-47%252BPM__1329652726__-772x278.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140824_PowerShellSCSM_-_Retrieving_Active_Directory_Object_Classes/8-22-2014%252B11-30-47%252BPM__1329652726__-772x278.png" /></a>
You have to look at the property <b><u>Name</u></b> and look for "<b>Microsoft.AD.*</b>" <i>User/Group</i> or <i>Computer</i>, to find the real object class.




### Adding a property Class

Finally you can use the following piece of code to retrieve all the class.
We are adding a property called "Class" that will run against each object and check which value is present: "<i>Microsoft.AD.User</i>", "<i>Microsoft.AD.Group</i>" or "<i>Microsoft.AD.Computer</i>".



```
# Retrieve Relationship Objects CLASS of AD objects(Computers, Users and Groups)) inside SCSM
(Get-SCSMRelationshipObject -BySource $SRTicket -Filter "RelationshipID -eq 'd96c8b59-8554-6e77-0aa7-f51448868b43'").targetobject |
Select-Object -Property DisplayName, @{
    Label = "Class";
    Expression = {
        if ($_.getclasses().name -contains "Microsoft.AD.User")
        {
            "User"
        }
        elseif ($_.getclasses().name -contains "Microsoft.AD.Group")
        {
            "Group"
        }
        elseif ($_.getclasses().name -contains "Microsoft.Windows.Computer")
        {
            "Computer"
        }
    }
}
```


<a href="{{ site.url }}/images/2014/20140824_PowerShellSCSM_-_Retrieving_Active_Directory_Object_Classes/8-22-2014%252B11-23-42%252BPM__555643882__-772x218.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140824_PowerShellSCSM_-_Retrieving_Active_Directory_Object_Classes/8-22-2014%252B11-23-42%252BPM__555643882__-772x218.png" /></a>



