---
layout: single
title: PowerShell/SCSM - Get Review Activities Rejected in the last 60 days
excerpt: 
permalink: /2016/03/powershellscsm-get-review-activities.html
tags: 
- powershell
- scsm
- scsm review activity
- smlets
- system center 2012 service manager r2
published: true
comments: true
---


<img imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;" border="0" src="{{ site.url }}/images/2016/20160310_PowerShellSCSM_-_Get_Review_Activities_Rejected_in_the_last_60_days/SCSM_128x128x32__1472339523__-128x128.png" /> In the following post I demonstrate how you can retrieve all the rejected Review Activities from the last 60 days. I also include the DisplayName, the Decision and the Comment of the Reviewer.

Hope this help some people out there.

```powershell
# Smlets Module
Import-module -name smlets

# Capture the SR Failed Status
$RAStatusFailed = Get-SCSMEnumeration -Name ActivityStatusEnum.Failed$

# Capture the date from where we are searching
$RAModifiedDay = (get-date).Adddays(-60)

# Get the Manual Activity Class
$RAClass = Get-SCSMClass -Name System.WorkItem.Activity.ReviewActivity$

# Get the Criteria Class
$CriteriaClass = “Microsoft.EnterpriseManagement.Common.EnterpriseManagementObjectCriteria”

# Define the filter
$Filter = "Status = '$($RAStatusFailed.Id)' AND LastModified > '$RAModifiedDay'"

# Create the Criteria Object
$CriteriaObject = new-object $CriteriaClass $Filter,$RAClass

# Get the Reviewer relationship classes
$RAHasReviewerClass = Get-SCSMRelationshipClass System.ReviewActivityHasReviewer$
$ReviewerIsUserClass = Get-SCSMRelationshipClass System.ReviewerIsUser$

# Get the RA rejected in the last 60 days
Get-SCSMObject -criteria $CriteriaObject |
ForEach-Object -Process {

  # Current Review Activity
  $RA = $_

  # Get the rejected review(s) on this RA
  $RejectedReview = Get-SCSMRelatedObject -SMObject $RA -Relationship $RAHasReviewerClass | Where {$_.decision.displayname -eq 'Rejected'}

  foreach ($item in $RejectedReview)
  {
    # Get the reviewer information
    $ReviewerObj = Get-SCSMRelatedObject -SMObject $Item -Relationship $ReviewerIsUserClass

    # Create a new PowerShell Object
    [pscustomobject][ordered]@{
        ReviewActivityName = $RA.Name
        ReviewerDisplayName = $ReviewerObj.displayname
        Decision = $item.decision.displayname
        Comments = $item.comments -as [string]
    }
  }
}#| Format-List
```

<img border="0" src="{{ site.url }}/images/2016/20160310_PowerShellSCSM_-_Get_Review_Activities_Rejected_in_the_last_60_days/SCSM-RA_Rejected_Last60Days__1508608342__-772x397.png" />