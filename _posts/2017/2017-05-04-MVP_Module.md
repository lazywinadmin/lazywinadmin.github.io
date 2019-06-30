---
layout: single
title: "MVP PowerShell module"
excerpt: "The MVP PowerShell module allow you to interact with the Microsoft MVP portal to maintain and update a profile"
permalink:
tags: 
  - powershell
  - 'Microsoft MVP'
categories:
  - powershell
  - 'MVP Module'
published: true
comments: true
author_profile: false
header:
  teaserlogo: ''
  teaser: ''
  image: images/headers/Code03_1920x500.jpg
  caption: ''
gallery:
  - image_path: ''
    url: ''
    title: ''
toc: true
toc_label: "Table of content"
toc_sticky: true
---
<img imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;" border="0" src="{{ base_path }}/images/2017/2017-05-04-MVP_Module/MVP_BlackOnly.png" />
The [MVP PowerShell module](https://github.com/lazywinadmin/MVP) is finally out! This module allows you to interact with the Microsoft MVP Portal Api directly from PowerShell. The goal being to help any Microsoft MVP Award recipient to maintain and update their profile, for example by adding multiple contributions at once.

This first version is the fruit of a collaboration between [Emin Atac](https://twitter.com/p0w3rsh3ll) and I.

# MVP Award ?

Each year all the recipients of the Microsoft MVP Award need to submit their community contributions in order to be re-evaluated for the next nomination cycle.
Until recently the only way to do so was to manually fill up each items using the Microsoft MVP Web portal.

At the beginning of 2017, Microsoft added a Rest API interface to interact with this system and help people develop their own solution to improve that process.

[More information on the MVP program](https://mvp.microsoft.com/)

# MVP Module

## Install the module

Installing the module from the PowerShell Gallery:

```powershell
# Install the module from the PowerShell Gallery
Install-Module -name MVP
```

## Configure your connection

You need to register and get a subscription key from Microsoft in order to use the module.
Fortunately you only need to do this once.

__Steps__

1. Go to the [Microsoft MVP API Developer Portal](https://mvpapi.portal.azure-api.net/)
1. Click the `Sign In` button and sign in with your Microsoft Account. It must be the same Microsoft Account as you use for your Microsoft MVP Site access.
1. Subscribe to the `MVP Production` product.
1. Go to the `PRODUCTS` tab, and choose `MVP Production`.
1. Click the `Subscribe` button.
1. This request will be reviewed and Accepted / Declined by the admin in one or two business days. The admin verifies your access permission based on your Microsoft Account. It must be the same Microsoft Account as you use for your Microsoft MVP Site access.
1. Once approved, on the top right corner click on your name and select `PROFILE`
1. You should see a subscription for the `MVP Production`
1. On the `Primary Key` line, select `Show` and this is your Subscription Key

See [Getting Started with Microsoft MVP API](https://mvp.microsoft.com/en-us/Opportunities/my-opportunities-api-getting-started) for more information.

Next you need to configure your connection using `Set-MVPConfiguration`

```powershell
# Configure your connection
Set-MVPConfiguration -SubscriptionKey 'abcdef083b5b482f8d99184d318b12f6'
```

A user interface will show to authenticate against the Microsoft API "mvpapi.portal.azure-api.net"

## Commands

Here is the list of functions available in the module

```powershell
# List all the functions available
Get-Command -module MVP
```

```text
CommandType Name                          Version Source
----------- ----                          ------- ------
Function    Get-MVPContribution           0.0.2.0 MVP
Function    Get-MVPContributionArea       0.0.2.0 MVP
Function    Get-MVPContributionType       0.0.2.0 MVP
Function    Get-MVPContributionVisibility 0.0.2.0 MVP
Function    Get-MVPOnlineIdentity         0.0.2.0 MVP
Function    Get-MVPProfile                0.0.2.0 MVP
Function    Get-MVPProfileImage           0.0.2.0 MVP
Function    New-MVPContribution           0.0.2.0 MVP
Function    New-MVPOnlineIdentity         0.0.2.0 MVP
Function    Remove-MVPConfiguration       0.0.2.0 MVP
Function    Remove-MVPContribution        0.0.2.0 MVP
Function    Remove-MVPOnlineIdentity      0.0.2.0 MVP
Function    Set-MVPConfiguration          0.0.2.0 MVP
Function    Set-MVPContribution           0.0.2.0 MVP
Function    Set-MVPOnlineIdentity         0.0.2.0 MVP
```

## Retrieve a MVP Profile

You can retrieve a specific profile (your account being the default one)

```powershell
# Retrieving my profile
Get-MVPProfile -ID 5000475 #Francois-Xavier Cat
```

__Output__

```text
Metadata             : @{PageTitle=Francois-Xavier Cat is a Microsoft MVP in PowerShell who has been in the IT field since 2007. He is currently an 
                       Automation Specialist.; TemplateName=; Keywords=; Description=}
MvpId                : 5000475
YearsAsMvp           : 4
FirstAwardYear       : 2014
AwardCategoryDisplay : Cloud and Datacenter Management
TechnicalExpertise   : 
InTheSpotlight       : False
Headline             : Francois-Xavier Cat is a Microsoft MVP in PowerShell who has been in the IT field since 2007. He is currently an Automation 
                       Specialist in a large Financial company.
Biography            : Francois-Xavier Cat is from France but has been living in Montreal, Quebec, Canada since 2004.
                       In 2014, He was concurrently awarded his first MVP PowerShell by Microsoft and PowerShell Hero 2014 award by PowerShell.org.
                       In 2015, he was also nominated Sapien Technologies MVP.
                       You can follow his blog at http://lazywinadmin.com
DisplayName          : Francois-Xavier Cat
FullName             : Francois-Xavier Cat
PrimaryEmailAddress  :
ShippingCountry      : Canada
ShippingStateCity    : Montreal, QC
Languages            : French, English
OnlineIdentities     : {@{PrivateSiteId=35435; SocialNetwork=; Url=https://www.facebook.com/fxavierc; OnlineIdentityVisibility=; 
                       ContributionCollected=False; DisplayName=; UserId=; MicrosoftAccount=; PrivacyConsentStatus=False; 
                       PrivacyConsentCheckStatus=False; PrivacyConsentCheckDate=; PrivacyConsentUnCheckDate=; Submitted=False}, 
                       @{PrivateSiteId=74042; SocialNetwork=; Url=https://www.facebook.com/lazywinadmin; OnlineIdentityVisibility=; 
                       ContributionCollected=False; DisplayName=; UserId=; MicrosoftAccount=; PrivacyConsentStatus=True; 
                       PrivacyConsentCheckStatus=False; PrivacyConsentCheckDate=; PrivacyConsentUnCheckDate=; Submitted=False}, 
                       @{PrivateSiteId=56489; SocialNetwork=; Url=http://klout.com/LazyWinAdm; OnlineIdentityVisibility=; 
                       ContributionCollected=False; DisplayName=; UserId=; MicrosoftAccount=; PrivacyConsentStatus=False; 
                       PrivacyConsentCheckStatus=False; PrivacyConsentCheckDate=; PrivacyConsentUnCheckDate=; Submitted=False}, 
                       @{PrivateSiteId=39315; SocialNetwork=; Url=http://ca.linkedin.com/in/fxcat; OnlineIdentityVisibility=; 
                       ContributionCollected=False; DisplayName=; UserId=; MicrosoftAccount=; PrivacyConsentStatus=True; 
                       PrivacyConsentCheckStatus=False; PrivacyConsentCheckDate=; PrivacyConsentUnCheckDate=; Submitted=False}...}
Certifications       : {@{PrivateSiteId=1274; Id=a2137352-509a-e431-bbc8-6c3be5a82b68; Title=VMware VCP510-DCV,; CertificationVisibility=}}
Activities           :
CommunityAwards      : {@{PrivateSiteId=12499; Title=SAPIEN MVP; Description="SAPIEN Most Valuable Professional (MVP) award. It’s our way to 
                       recognize and show
                       our appreciation for community members who promote our products and contribute
                       to their improvement and success."; DateEarned=2015-01-16T00:00:00; 
                       ReferenceUrl=http://www.sapien.com/company/mvp/13/Francois-Xavier_Cat; AwardRecognitionVisibility=}, @{PrivateSiteId=6179; 
                       Title=PowerShell Hero; Description=; DateEarned=2014-01-08T00:00:00; 
                       ReferenceUrl=http://powershell.org/wp/2014/01/08/announcing-our-2014-powershell-heroes/; AwardRecognitionVisibility=}}
NewsHighlights       : {}
UpcomingEvent        : {}
```

## Retrieve your contributions

You can retrieve your contributions by using ```Get-MVPContribution```. The default limit is 5 entries.

``` powershell
# Retrieve your contribution
Get-MVPContribution #by default it will return 5 entries only
```

You can change the limit using the ```-Limit``` parameter

```powershell
# Retrieve your contribution
Get-MVPContribution -Limit 100 # This will retrieve 100 entries
```

## Create a new contribution

Creating a new contribution with ```New-MVPContribution``` requires a few fields that need to match existing data.

For example, for the **Type** or **Technology** you can use the function parameters ```-ContributionType``` and ```-ContributionTechnology``` which are Dynamic parameters to retrieve the possible values, or you can use ```Get-MVPContributionType``` and ```Get-MVPContributionArea``` to retrieve that data prior to using ```New-MVPContribution```.

```powershell
# Create splatting that will be passed
$Splatting = @{
  startdate ='2017/04/25'
  Title='Test from mvpapi.azure-api.net'
  Description = 'Description sample'
  ReferenceUrl='https://github.com/lazywinadmin/MVP'
  AnnualQuantity='1' # Need to be 1 at least
  SecondAnnualQuantity='0'
  AnnualReach = '0'
  Visibility = 'EveryOne' # Get-MVPContributionVisibility
  ContributionType = 'Blog Site Posts' # Get-MVPContributionType
  ContributionTechnology = 'PowerShell' # Get-MVPContributionArea
}

# Create a new MVP Contribution
New-MVPContribution @splatting
```

__Output:__

```

ContributionId         : 123456
ContributionTypeName   : Blog Site Posts
ContributionType       : @{Id=df6464de-173a-e411-cccc-6c3be5a82b68; Name=Blog Site Posts; EnglishName=Blog Site Posts}
ContributionTechnology : @{Id=7cc301bb-184a-e411-dddd-9cb65495d3c4; Name=PowerShell; AwardName=; AwardCategory=}
StartDate              : 2017-04-25T00:00:00
Title                  : Test from mvpapi.azure-api.net
ReferenceUrl           : https://github.com/lazywinadmin/MVP
Visibility             : @{Id=299600000; Description=Public; LocalizeKey=}
AnnualQuantity         : 0
SecondAnnualQuantity   : 0
AnnualReach            : 0
Description            : Description sample

```

## Create multiple contributions

```New-MVPContribution``` accepts values from the pipeline by property names.

For example you can provide a CSV file that look like this:

```text

startdate,title,description,referenceurl,AnnualQuantity,SecondAnnualQuantity,AnnualReach,Visibility,ContributionType,ContributionTechnology
2017-12-01,Test1,Some content,https://github.com/lazywinadmin/MVP,1,0,0,EveryOne,Blog Site Posts,PowerShell
2017-12-02,Test2,Some content,https://github.com/lazywinadmin/MVP,1,0,0,EveryOne,Blog Site Posts,PowerShell
2017-12-03,Test3,Some content,https://github.com/lazywinadmin/MVP,1,0,0,EveryOne,Blog Site Posts,PowerShell
2017-12-04,Test4,Some content,https://github.com/lazywinadmin/MVP,1,0,0,EveryOne,Blog Site Posts,PowerShell
2017-12-05,Test5,Some content,https://github.com/lazywinadmin/MVP,1,0,0,EveryOne,Blog Site Posts,PowerShell
2017-12-06,Test6,Some content,https://github.com/lazywinadmin/MVP,1,0,0,EveryOne,Blog Site Posts,PowerShell
2017-12-07,Test7,Some content,https://github.com/lazywinadmin/MVP,1,0,0,EveryOne,Blog Site Posts,PowerShell
2017-12-08,Test8,Some content,https://github.com/lazywinadmin/MVP,1,0,0,EveryOne,Blog Site Posts,PowerShell
2017-12-09,Test9,Some content,https://github.com/lazywinadmin/MVP,1,0,0,EveryOne,Blog Site Posts,PowerShell
2017-12-10,Test10,Some content,https://github.com/lazywinadmin/MVP,1,0,0,EveryOne,Blog Site Posts,PowerShell

```

Import the CSV file and pass it to ```New-MVPContribution```

```powershell

# Importing multiple contributions at once
import-csv .\Examples\MultipleEntries.csv | New-MVPContribution

```


# Source / Contributions

The source are available in Github [MVP PowerShell module](https://github.com/lazywinadmin/MVP)

Would love contributors, suggestions, feedback, and other help! Feel free to open an Issue ticket on the github repository.

# Documentation

A more detailed documentation is available on the Github Repository in the README.md  [https://github.com/lazywinadmin/MVP/blob/master/README.md](https://github.com/lazywinadmin/MVP/blob/master/README.md)



