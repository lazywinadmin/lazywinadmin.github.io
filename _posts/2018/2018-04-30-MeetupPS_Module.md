---
layout: single
title: "MeetupPS PowerShell module"
excerpt: "I recently released a PowerShell module called MeetupPS to interact with the Meetup API. This allows you to gather information about groups and create events"
permalink:
tags: 
  - module
  - powershell
  - meetupps
categories:
  - powershell
published: true
comments: true
author_profile: false
header:
  teaserlogo:
  teaser: ''
  image: images/headers/geran-de-klerk-148428_edit.jpg
  caption: 
gallery:
  - image_path: ''
    url: ''
    title: ''
toc: true
toc_label: "Table of content"
toc_sticky: true
---

I recently released a PowerShell module called MeetupPS. This module is a wrapper around the Rest API offered by Meetup.com. The commands available at the moment allow you to:

* Get a Meetup group information,
* Get Meetup events for a specific group (past and upcoming)
* Create events

![image-center](/images/2018/2018-04-30-MeetupPS_Module/Meetup3.png){: .align-left}

The initial reason behind the creation of this module is that I needed to gather the list of all the meetings from the last year (Title, link, attendees) and needed to submit them to the MVP Portal [using the MVP Module](/2017/05/MVP_Module.html). A long process if you do this manually.

The second reason is that I want to automate the creation of an event using something like a Plaster template (Blog post, Meetup Event, Announce to Meetup members, Skype meeting, Tweet, Slack...). This whole process is not done yet, but that would save me some times on the long term.

## Install the module

Install the module from the PowerShell Gallery.

```powershell
Install-Module -Name MeetupPS
```

<a name="Configure"/>

## Configure your connection

Follow the following steps to request a Oauth Key/Secret.
Fortunately you only need to do this once.

Register a new Oauth Consumer on the [Meetup API Oauth Consumer portal](https://secure.meetup.com/meetup_api/oauth_consumers/)

* `Consumer Name` Provide a name for your Oauth Consumer
* `Application Website` Can be pretty much anything, here i used `https://github.com/lazywinadmin/MeetupPS`
* `Redirect URI` Can be pretty much anything, here i used `https://github.com/lazywinadmin/MeetupPS`
* Agree with terms

![image-center](/images/2018/2018-04-30-MeetupPS_Module/MeetupPS-RegisterOauthConsumer01.png)

Once the Oauth Consumer is created, copy the Key and the Secret. This will be used to authenticate against the API

![image-center](/images/2018/2018-04-30-MeetupPS_Module/MeetupPS-RegisterOauthConsumer02.png)

<a name="Authentication"/>

## Connecting to the Meetup.com API

```powershell
# Connect against Meetup.com API
$Key = '<Your Oauth Consumer Key>'
$Secret = '<Your Oauth Consumer Secret>'
Set-MeetupConfiguration -ClientID $Key -Secret $Secret
```

![image-center](/images/2018/2018-04-30-MeetupPS_Module/MeetupPS-Set-MeetupConfiguration01.png)

Note: This will leverage two private functions of the module:

* `Get-OauthCode`
* `Get-OauthAccessToken`

This will then prompt you to connect to Meetup.

![image-center](/images/2018/2018-04-30-MeetupPS_Module/MeetupPS-Set-MeetupConfiguration02.png)

<a name="GetGroupInfo"/>

## Get Group information

Retrieve a Meetup group information

```powershell
Get-MeetupGroup -Groupname FrenchPSUG
```

![image-center](/images/2018/2018-04-30-MeetupPS_Module/MeetupPS-Get-MeetupGroup01.png)

<a name="GetEventInfo"/>

## Get Events information

<a name="GetupcomingEventInfo"/>

### Upcoming events

Retrieve upcoming event(s) for a Meetup group

```powershell
Get-MeetupEvent -Groupname FrenchPSUG -status upcoming
```

<a name="GetpastEventInfo"/>

### Past events

Retrieve past event(s) for a Meetup group

```powershell
Get-MeetupEvent -GroupName FrenchPSUG -status past -page 2
```

![image-center](/images/2018/2018-04-30-MeetupPS_Module/MeetupPS-Get-MeetupEvent03.png)

```powershell
Get-MeetupEvent -GroupName FrenchPSUG -status past |
Format-List -property Name,local_date,link, yes_rsvp_count
```

![image-center](/images/2018/2018-04-30-MeetupPS_Module/MeetupPS-Get-MeetupEvent04.png)

<a name="CreateEvent"/>

## Create Event

```powershell
New-MeetupEvent `
    -GroupName FrenchPSUG `
    -Title 'New Event from MeetupPS' `
    -Time '2018/06/01 3:00pm' `
    -Description "PowerShell WorkShop<br><br>In this session we'll talk about ..." `
    -PublishStatus draft
```

![full](/images/2018/2018-04-30-MeetupPS_Module/MeetupPS-New-MeetupEvent01.png){: .full}

Here is the event created in Meetup

![full](/images/2018/2018-04-30-MeetupPS_Module/MeetupPS-New-MeetupEvent02.png){: .full}

<a name="APIPermissionScopes"/>

## API permission scopes

The API permission scopes are set when the authentication occur in `Get-OAuthAccessToken`.

Currently it is requesting the following permission scopes: `basic`,`reporting`, `event_management`

More permission scopes are available here: https://www.meetup.com/meetup_api/auth/#oauth2-scopes

| scope | permission |
| --- | --- |
| ageless | Replaces the one hour expiry time from oauth2 tokens with a limit of up to two weeks |
| basic | Access to basic Meetup group info and creating and editing Events and RSVP's, posting photos in version 2 API's and below |
| event_management | Allows the authorized application to create and make modifications to events in your Meetup groups on your behalf |
| group_edit | Allows the authorized application to edit the settings of groups you organize on your behalf |
| group_content_edit | Allows the authorized application to create, modify and delete group content on your behalf |
| group_join | Allows the authorized application to join new Meetup groups on your behalf |
| messaging | Enables Member to Member messaging (this is now deprecated) |
| profile_edit | Allows the authorized application to edit your profile information on your behalf |
| reporting | Allows the authorized application to block and unblock other members and submit abuse reports on your behalf |
| rsvp | Allows the authorized application to RSVP you to events on your behalf |

You can take a look a the header passed to the API here:

```powershell
$Headers = @{
    'X-OAuth-Scopes'          = "basic", "reporting", "event_management"
    'X-Accepted-OAuth-Scopes' = "basic", "reporting", "event_management"
}
```

See this line: [Header of Get-OauthAccessToken](/MeetupPS/private/Get-OAuthAccessToken.ps1#L24)

<a name="Resources"/>

## Resources

* [Meetup API Documentation](https://www.meetup.com/meetup_api/docs/)
