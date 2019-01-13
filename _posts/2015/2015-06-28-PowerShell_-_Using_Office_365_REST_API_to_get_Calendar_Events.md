---
layout: single
title: PowerShell - Using Office 365 REST API to get Calendar Events
excerpt: 
permalink: /2015/06/powershell-using-office-365-rest-api-to.html
tags: 
- exchange online
- office 365 api
- office365
- powershell
- rest
- rest api
published: true
comments: true
---

 
<a href="{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Outlook-2013-Logo-256x256__688739842__-256x256.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="200" src="{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Outlook-2013-Logo-256x256__892680219__-200x200.png" width="200" /></a> A couple of weeks ago I was looking at a way to find the Calendar Events of an Office365 shared mailbox using PowerShell. Unfortunately I was not able to find a way to accomplished this task using the O365 Cmdlets. (Let me know in the comments if you know how...)

<b><u>Update 2016/04/19:</u></b> Function updated to support `PageResult` parameter

So I turned to the PowerShell Community and posted tweet about it.


{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/twitter.jpg
{% endcapture %}
{% capture SourceUrl %}
https://twitter.com/LazyWinAdmin/status/593760077745680385
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})

Quickly I got an answer from <a href="https://twitter.com/mjolinor" target="_blank">@Mjolinor</a> and <a href="https://twitter.com/glenscales" target="_blank">@Glenscales</a> who sent me some great stuff by using REST API. Thanks again guys!!


This is the example Glen sent me:

```powershell
Invoke-RestMethod `
    -Uri "https://outlook.office365.com/api/v1.0/users/sharedmailbox@domain.com/calendarview?startDateTime=$(Get-Date)&endDateTime=$((Get-Date).AddDays(7))"`
    -Credential (Get-Credential) |
    foreach-object{ $_.Value }
```

This example shows how to list the calendar events for the next week. This is great and exactly what I needed, plus this run super fast compared to using the PowerShell module.

Of course you will need to have permissions on the specified mailbox.


{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-06__98307730__-772x278.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-06__98307730__-772x278.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})

Even though it show this as a CustomObject, the object type is `Microsoft.OutlookServices.Event`, see this MSDN page to find all the properties and methods available: [https://msdn.microsoft.com/office/office365/APi/complex-types-for-mail-contacts-calendar#EventResource](https://msdn.microsoft.com/office/office365/APi/complex-types-for-mail-contacts-calendar#EventResource)



{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-05__906656427__-772x918.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-05__906656427__-772x918.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})

My obvious next step was to create a function to handle different mailbox with different parameters such as `startdatetime`, `enddatetime` or alternative `credentials`. <b><u>See at the end of this post.</u></b>

But before we go there, let's see how we can interact with Office 365 API.



# How to interact with the Office 365 API

The MSDN documentation on how to use the Office365 API is very well done, clear and complete, you can take a look at it here: [https://msdn.microsoft.com/en-us/office/office365/api/api-catalog](https://msdn.microsoft.com/en-us/office/office365/api/api-catalog)

{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-01__1979570724__-932x619.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-01__1979570724__-932x619.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})

In our case, we are interested by the Outlook Calendar.

 
## Using the Calendar API

In the [Overview Page](https://msdn.microsoft.com/office/office365/APi/calendar-rest-operations), you will find information on how to query this API.
All Calendar API requests use the following root URL: `https://outlook.office365.com/api/{version}/{user_context}`

`{user_context}` is the current user, as Calendar API requests are always performed on behalf of the current user.


<b>You can specify the user context in one of <u>two ways</u>:</b
* <b><u>Current User</u>:</b> With the `me` shortcut: `/api/v1.0/me`

```powershell
Invoke-RestMethod `
    -Uri "https://outlook.office365.com/api/v1.0/me" `
    -Credential $cred
```



{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-07__1619919174__-772x378.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-07__1619919174__-772x378.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})


* <b><u>A Specific user</u>:</b> With the `users/{upn}` format to pass the UPN or a proxy address, such as:

```powershell
Invoke-RestMethod `
    -Uri "https://outlook.office365.com/api/v1.0/users/fx.test10@lazywinadmin.com" `
    -Credential $cred
```

{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-08__637553995__-772x378.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-08__637553995__-772x378.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})



## Get the Calendar Events


<b>We can now retrieve the events using one the following:</b>
* <b><u>Against the primary calendar</u></b> `../me/calendarview?startDateTime={ start_datetime }&endDateTime={ end_datetime } `

```powershell
Invoke-RestMethod `
    -Uri "https://outlook.office365.com/api/v1.0/me/calendarview?startDateTime=$(Get-Date)&endDateTime=$((Get-Date).AddDays(7))" `
    -Credential $cred |
ForEach-Object { $_.value } |
Select-Object -Property Subject
```


{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-09__1936211018__-772x278.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-09__1936211018__-772x278.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})


* <b><u>Against a specific calendar</u></b> `../me/calendars/{calendar_id}/calendarview?startDateTime={ start_datetime }&endDateTime={ end_datetime }`


```powershell
Invoke-RestMethod `
    -Uri "https://outlook.office365.com/api/v1.0/me/calendars/$id/calendarview?startDateTime=$(Get-Date)&endDateTime=$((Get-Date).AddDays(7))" `
    -Credential $cred |
ForEach-Object { $_.value } |
Select-Object -Property subject
```


{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-10__439415214__-772x278.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-10__439415214__-772x278.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})


## Get the Calendars

The `$ID` variable in the above example can be retrieve using `/Calendars`
This will list all the calendars present in the mailbox

```powershell
Invoke-RestMethod `
    -Uri "https://outlook.office365.com/api/v1.0/me/calendars" `
    -Credential $cred | 
ForEach-Object { $_.Value } | 
Select-Object -Property Name, ID
```

{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-11__763151546__-772x258.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-11__763151546__-772x258.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})

 
### PageResult
You can limit the number of item to output using the `$top` query parameter. If not specified only 10 items will be returned. You can specify up to 50 items to be returned.

This was implemented in the function below using the `-PageResult` parameter.
For more information about the other filters available see the following page:
[https://msdn.microsoft.com/office/office365/APi/complex-types-for-mail-contacts-calendar#UseODataqueryparametersPageresults](https://msdn.microsoft.com/office/office365/APi/complex-types-for-mail-contacts-calendar#UseODataqueryparametersPageresults)


# Function Get-O365CalendarEvent

Finally, here is the function I built to query the calendar events.
You can find it on my GitHub here: [https://github.com/lazywinadmin/PowerShell/blob/master/O365-Get-O365CalendarEvent/O365-Get-O365CalendarEvent.ps1](https://github.com/lazywinadmin/PowerShell/blob/master/O365-Get-O365CalendarEvent/O365-Get-O365CalendarEvent.ps1)

{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-13__303836682__-772x538.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150628_PowerShell_-_Using_Office_365_REST_API_to_get_Calendar_Events/Office365API-13__303836682__-772x538.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})

