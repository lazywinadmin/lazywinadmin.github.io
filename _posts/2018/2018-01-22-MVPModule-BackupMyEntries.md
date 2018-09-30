---
layout: single
title: "MVP Module - Backing up all your contributions"
excerpt: "In this post I'll describe how to quickly retrieve your contributions and back them up into a file (Json format)"
permalink:
tags: 
  - module
  - powershell
  - mvp
categories:
  - powershell
  - 'MVP Module'
published: true
comments: true
author_profile: false
header:
  teaserlogo:
  teaser: ''
  image: images/headers/MVP01_1920x500.jpg
  caption: ''
gallery:
  - image_path: ''
    url: ''
    title: ''
toc: true
toc_label: "Table of content"
---

Last year, [Emin Atac](https://twitter.com/p0w3rsh3ll) and I released a PowerShell module to interact with the Microsoft MVP website, see: [MVP Module](https://lazywinadmin.github.io/2017/05/MVP_Module.html).

If you are a Microsoft MVP, this module gives you quick and easy way to retrieve your entries and update your contributions.


## Installing the module

The module can easily be installed from the PowerShell Gallery using the following command:

```powershell
Install-module -name MVP
```

The first time you use the module you'll need to complete some requirements and configure your connection, see the [MVP module github page](https://github.com/lazywinadmin/MVP/blob/master/README.md) for more details.

## Loading and configuring the module

After installation (and first time use requirements completed), we'll need to load the module and authenticate against the Microsoft MVP Api

```powershell
# Import the module
Import-Module -Name MVP

# Set your connection to the MVP API
$SubscriptionKey = '<Your Private Key>'
Set-MVPConfiguration -SubscriptionKey $SubscriptionKey
# This will show a Window to authenticate against Microsoft MVP API
```

We are now all set to use the module.

## Retrieving your contributions

Retrieving all your entries can be done using `Get-MVPContribution` function. By default the function retrieve the last 5 entries, here is an example of output:

```powershell
Get-MVPContribution
```

```text
ContributionId         : 683377
ContributionTypeName   : Open Source Project(s)
ContributionType       : @{Id=414bcf30-e889-e511-8110-c4346bac0abc; Name=Open Source Project(s); 
                         EnglishName=Open Source Project(s)}
ContributionTechnology : @{Id=7cc301bb-189a-e411-93f2-9cb65495d3c4; Name=PowerShell; AwardName=; 
                         AwardCategory=}
StartDate              : 2017-02-01T08:00:00
Title                  : MVP Module
ReferenceUrl           : https://github.com/PowerShellLab/MVP
Visibility             : @{Id=100000000; Description=Microsoft; LocalizeKey=MicrosoftVisibilityText}
AnnualQuantity         : 1
SecondAnnualQuantity   : 0
AnnualReach            : 2
Description            : test
```

### Retrieving multiple contributions

You can specify how many entries you want to retrieve using the `-Limit` parameter. Unfortunately at the moment there is no way to retrieve all the entries using something like `-Limit 0`, you need to specify a high number, example:

```powershell
Get-MVPContribution -limit 1000
```

## Backing up your contributions

Now that we have the data, we can send it to a file.

### Simple backup

As an example we retrieve the last 1000 entries, convert them to a json format and save it to a file with the format `BackupMVP_<yyyyMMdd_HHmmss>.json`

```powershell
# Retrieve 1000 contributions
Get-MVPContribution -limit 1000 |
# Convert to JSON format
ConvertTo-Json |
# Send the output to a file
Out-File -FilePath BackupMVP_$(Get-Date -format 'yyyyMMdd_HHmmss').json
```

This generated a file called `BackupMVP_20180122_214015.json`.

### Backup per year

If you want to save your contributions into different files, for example per year, you can do something like this: 

```powershell
# Retrieve the last 1000 contributions
Get-MVPContribution -limit 1000 |
# Add a property 'Year' (we're grabing the year from the StartDate property)
Select-object -Property *,@{L='Year';E={$_.startdate.substring(0,4)}} |
# Group per year
Group-Object -Property year |
# Process each group
Foreach-object -Process {
    # Grab the current year
    $Year = $_.name
    # Get the contribution of the current group
    $ContributionsOfYear = $_.Group
    # Output the Contribution of the current year
    $ContributionsOfYear |
    # Convert to JSON Format
    ConvertTo-Json |
    # Save to file
    Out-File -FilePath BackupMVP_Year$Year-$(Get-Date -format 'yyyyMMdd_HHmmss').json
}
```

This generated 3 files for me:

```text
BackupMVP_Year2015-20180122_215512.json
BackupMVP_Year2016-20180122_215512.json
BackupMVP_Year2017-20180122_215512.json
```

Hope you enjoyed this article !