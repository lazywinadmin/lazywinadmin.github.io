---
layout: single
title: PowerShell/SCCM - Find Applications advertised to a user
excerpt: 
permalink: /2015/09/powershellsccm-find-applications.html
tags: 
- configmgr
- powershell
- sccm
- sccm osd
- sccm task sequence
- sccm2012r2
published: true
comments: true
---

 
<a href="{{ site.url }}/images/2015/20150903_PowerShellSCCM_-_Find_Applications_advertised_to_a_user/SCCM2012R2_big__1580057027__-256x256.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="140" src="{{ site.url }}/images/2015/20150903_PowerShellSCCM_-_Find_Applications_advertised_to_a_user/SCCM2012R2_big__1977075591__-200x200.png" width="140" /></a>The following function helps you retrieve all the deployment that a user is supposed to received.

We use this during the Operating System Deployment (OSD). Using the UDI we get the user account that will receive the workstation currently being deployed. This script allow us to retrieve in SCCM all the Application advertised on the user that needed to be deployed on the computer during the task sequence.

I know this could probably be done with the Configuration Manager module, but I'm pretty new with it and I was not sure it could be loaded in a task sequence, if you have the answer let me know in the comment section.

Here is the step by step how I found my solution. You can also go straight to the function at the end of this article.


## Define Default Parameters

First I define a splatting to avoid repeating the same parameters in each command.

```powershell
# Define default parameters (Splatting)
$Splatting = @{
    ComputerName = "Sccm01.lazywinadmin.com"
    NameSpace = "root\SMS\Site_FX1"
}
```

## Retrieve a user in SCCM CMDB

Then I need to find a user in the SCCM Database to retrieve its `ResourceID`.

```powershell
# Find the User in SCCM CMDB
$User = Get-WMIObject @Splatting -Query "Select * From SMS_R_User WHERE UserName='FxTest'"
```

## Retrieve the collections the user is member of

```powershell
# Find the collections where the user is member of
$Collections = Get-WmiObject -Class sms_fullcollectionmembership @splatting -Filter "ResourceID = '$($user.resourceid)'"
```

## Retrieve the deployments of each Collections and output the information

```powershell
# For each collection we find the deployments
# Then output an object with information of the user, collection and application advertised
Foreach ($Collection in $collections)
{
    # Find the Deployment on one collection                    
    $Deployments = (Get-WmiObject @splatting -Query "Select * From SMS_DeploymentInfo WHERE CollectionID='$($Collection.CollectionID)'")
    
    Foreach ($Deploy in $Deployments)
    {
        
        # Prepare Output
        $Properties = @{
            UserName = $User.Name
            ComputerName = $Splatting.ComputerName
            CollectionName = $Deploy.CollectionName
            CollectionID = $Deploy.CollectionID
            DeploymentID = $Deploy.DeploymentID
            DeploymentName = $Deploy.DeploymentName
            DeploymentIntent = $deploy.DeploymentIntent
            TargetName = $Deploy.TargetName
            TargetSubName = $Deploy.TargetSubname
            
        }
        
        # Output the current object
        New-Object -TypeName PSObject -prop $Properties
    }
}
```


## Using the function

First load the function into your PowerShell using the Dot Sourcing method:

```powershell
. .\Get-SCCMUserCollectionDeployment.ps1
```

Here is an example of the final function and how you can use it against your environment

```powershell
Get-SCCMUserCollectionDeployment -ComputerName SCCM01.lazywinadmin.com -SiteCode FX1 -Credential (Get-Credential) -UserName 'FXtest'
```

This works perfectly inside a Task Sequence during the OSD.


## Function in Action

Default Output:
![Default Output]({{ site.url }}/images/2015/20150903_PowerShellSCCM_-_Find_Applications_advertised_to_a_user/Get-SCCMUserCollectionb__387352672__-718x262.jpg)


Using `Select-Object` to only show `TargetName`, `TargetSubname` and `DeploymentIntent`
You can also filter on the collection name if you just want a specific set of application.

![alt]({{ site.url }}/images/2015/20150903_PowerShellSCCM_-_Find_Applications_advertised_to_a_user/Get-SCCMUserCollection2b__291576827__-718x380.jpg)


## Download

[Github repository](https://github.com/lazywinadmin/PowerShell/blob/master/SCCM-Get-SCCMUserCollectionDeployment/Get-SCCMUserCollectionDeployment.ps1)



