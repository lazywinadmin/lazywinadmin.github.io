---
layout: single
title: PowerShell/Office 365 - Get the distribution groups membership
excerpt: 
permalink: /2015/08/powershello365-get-distribution-groups.html
tags: 
- distribution group
- exchange online
- o365 distribution group
- office365
- powershell
published: true
comments: true
---


<a href="{{ site.url }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Outlook-2013-Logo-256x256__1558078760__-256x256.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="150" src="{{ site.url }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Outlook-2013-Logo-256x256__1558078760__-256x256.png" width="150" /></a>I was recently looking at Office365/Exchange Online to retrieve Distribution Group membership. This is pretty simple using something like: `Get-DistributionGroupMember -Identity "Marketing"`

Not that prior to perforce the following command you need to be already connected to Office365, <a href="{{ site.url }}/2014/07/powershell-handy-function-to-connect-to.html" target="_blank">see this post</a>.

### Retrieving all members of each Distribution Group

Now if I want to retrieve all the Distribution group members, it's bit trickier you'll see. First I started by listing the groups members. My PowerShell instinct made me type `Get-DistributionGroup | Get-DistributionGroupMember` but it did not work, see below:

[![Get-DistributionGroupMember error]({{ site.url }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroup_Get-DistributionGroupMember__1466182560__-772x318.png)]({{ site.url }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroup_Get-DistributionGroupMember__1466182560__-772x318.png)

As the error message is stating that this Cmdlet does not accept input :-/

By using `Get-Help` on `Get-DistributionGroupMember`, we can check the parameters accepting Input:

```powershell
(Get-Help Get-DistributionGroupMember).parameters.parameter|
    Select-Object name,parametervalue,pipelineinput
```

[![Get-Help Get-DistributionGroupMember]({{ site.url }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroupMember_help_pipelineinput2__1765972882__-772x298.png)]({{ site.url }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroupMember_help_pipelineinput2__1765972882__-772x298.png)

The Identity parameter is not accepting the value by property name, so we have to specify `Identity` before we send the output to `Get-DistributonGroupMember`

```powershell
(Get-DistributionGroup -ResultSize 5).identity|
    Get-DistributionGroupMember
```

[![Get-DistributionGroup]({{ site.url }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroup_Identity_Get-DistributionGroupMember2__626810639__-772x318.png)]({{ site.url }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroup_Identity_Get-DistributionGroupMember2__626810639__-772x318.png)

The above output does the job but we do not know which group they belong to.
You can include the Distribution group name in the output using the following:

```powershell
(Get-DistributionGroup).identity | ForEach-Object{
    $DistributionGroupName = $_
    Get-DistributionGroupMember -Identity $_ | ForEach-Object{
        [PSCustomObject]@{
            DistributionGroup = $DistributionGroupName
            MemberName = $_.Name
            #Other recipient properties here
        }
    }
}
```

### Retrieving a single Distribution Group membership

Pretty similar to the one above, just specify the name of the Distribution Group

```powershell
(Get-DistributionGroup -Identity 'Sales').identity | ForEach-Object{
    $DistributionGroupName = $_
    Get-DistributionGroupMember -Identity $_ | ForEach-Object{
        [PSCustomObject]@{
            DistributionGroup = $DistributionGroupName
            MemberName = $_.Name
            #Other recipient properties here
        }
    }
}
```

### Retrieving Distribution Groups membership with a specific name pattern

You can also specify the pattern of distribution groups you are looking for.
Here it will return all the Distribution Group starting by `MTL`.

```powershell
(Get-DistributionGroup -Identity 'MTL*').identity | ForEach-Object{
    $DistributionGroupName = $_
    Get-DistributionGroupMember -Identity $_ | ForEach-Object{
        [PSCustomObject]@{
            DistributionGroup = $DistributionGroupName
            MemberName = $_.Name
            #Other recipientproperties here
        }
    }
}
```