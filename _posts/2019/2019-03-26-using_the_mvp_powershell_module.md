---
layout: single
title: "Using the MVP PowerShell module (video)"
excerpt: "I recorded a video to demo how you can install and configure the MVP PowerShell module and use it to add your contributions into the MVP Website"
permalink:
tags: 
  - video
  - powershell
  - mvp
categories:
  - powershell
  - 'MVP Module'
published: true
header:
  teaserlogo:
  teaser: ''
  image: images/headers/mountain02_1920x500.jpg
  caption: 'unsplash.com'
gallery:
  - image_path: ''
    url: ''
    title: ''
toc: false
toc_label: "Table of content"
---

Here is a recording to demo how you can install, configure and use the MVP PowerShell module to add your contributions into the MVP Website.

<iframe width="560" height="315" src="https://www.youtube.com/embed/UeRvlMzfsT8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br>
```powershell
# Install the module
Install-Module -Name MVP -Scope CurrentUser -Verbose

# Configure your connection
Set-MVPConfiguration -SubscriptionKey 2ed3d4ddf0e948a28caeebba64620d20

# List the commands available
Get-Command -Module MVP

# Retrieve my profile
Get-MVPProfile

# Add a new MVP Entry
New-MVPContribution `
    -StartDate '2019/03/26' `
    -Title 'Test From MVP Module' `
    -Description '' `
    -ReferenceUrl 'https://lazywinadmin.com' `
    -AnnualQuantity 1 `
    -AnnualReach 1 `
    -ContributionType Article `
    -ContributionTechnology PowerShell `
    -Visibility Microsoft `
    -verbose

# Add multiple entries
Import-CSV C:\demo\testcontributions.csv | New-MVPContribution -Verbose
```

You'll find more information about this module here:

* [Github Project (source code)](https://github.com/lazywinadmin/MVP)
* [PowerShell Gallery](https://www.powershellgallery.com/packages/MVP)
* [LazyWinAdmin - MVP Module](https://lazywinadmin.com/2017/05/MVP_Module.html#)
* [LazyWinAdmin - Adding my contributions](https://lazywinadmin.com/2018/01/MVPModule-AddingMyContributions.html)
* [LazyWinAdmin - Backing up your entries](https://lazywinadmin.com/2018/01/MVPModule-BackupMyEntries.html)
* [P0w3rsh3ll (Emin Atac) - First release of MVP PowerShell module](https://p0w3rsh3ll.wordpress.com/2017/05/05/first-release-of-mvp-powershell-module/)
* [Microsoft MVP Award program blog](https://blogs.msdn.microsoft.com/mvpawardprogram/2018/01/29/powershell-module/)
* [Automating the submission of WordPress Blog Posts to your Microsoft MVP Community Activities Profile using PowerShell](https://blog.darrenjrobinson.com/automating-the-submission-of-wordpress-blog-posts-to-your-microsoft-mvp-community-activities-profile-using-powershell/)
