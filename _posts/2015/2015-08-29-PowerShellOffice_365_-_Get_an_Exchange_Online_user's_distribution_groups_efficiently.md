---
layout: single
title: PowerShell/Office 365 - Get an Exchange Online user's distribution groups efficiently
excerpt: 
permalink: /2015/08/powershelloffice-365-get-exchange.html
tags: 
- distribution group
- exchange online
- o365 distribution group
- office365
- powershell
published: true
comments: true
---


<a href="{{ site.url }}/images/2015/20150829_PowerShellOffice_365_-_Get_an_Exchange_Online_user%27s_distribution_groups_efficiently/Outlook-2013-Logo-256x256__580073936__-256x256.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="150" src="{{ site.url }}/images/2015/20150829_PowerShellOffice_365_-_Get_an_Exchange_Online_user%27s_distribution_groups_efficiently/Outlook-2013-Logo-256x256__307945277__-200x200.png" width="150" /></a>

<a href="{{ site.url }}/2015/08/powershello365-get-distribution-groups.html#more" target="_blank">In my previous post</a> I showed how to retrieve the membership of one or multiple groups. In today's post I want to find the Distribution groups a user belongs to.

There are multiple approaches you could be using to gather this information but as an example I'll re-use the same one-liner from my previous article and simply filter with `Where-Object` to find a particular User.

This is probably the route PowerShell beginners would take and it is working '<i>Fine</i>' in a small environment but not very efficient, you'll see in the following example.

In this environment, there are a bit more than 1800 Distribution Groups. I want to know which Distribution Group I'm member of.

Retrieving the count of Distribution Groups and an User account in Office 365:

{% assign ImageText = 'Retrieving the count of Distribution Groups and an User account in Office 365' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150829_PowerShellOffice_365_-_Get_an_Exchange_Online_user%27s_distribution_groups_efficiently/2015-08-25+9-17-33+PM__333558129__-772x178.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{ImageUrl}})


# Requirement

You need to be connected to Exchange Online. This can be done using on of the following functions:

* [Connect-ExchangeOnline](https://github.com/lazywinadmin/PowerShell/blob/master/EXCHANGE-Connect-ExchangeOnline/Connect-ExchangeOnline.ps1)
* [Connect-Office365]({{ site.url }}/2014/07/powershell-handy-function-to-connect-to.html)


# Find User's distribution groups with the Where-Object cmdlet


This retrieve all the members of each groups, then narrow down the output to only the user I'm looking for. This looks good with the only problem than this one-liner took... 15 minutes to query all the groups memberships, Not really efficient...

{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150829_PowerShellOffice_365_-_Get_an_Exchange_Online_user%27s_distribution_groups_efficiently/2015-08-25+9-43-40+PM__189355782__-772x649.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{ImageUrl}})

# Find User's distribution groups with the Filter parameter

What you can do instead is to filter as much as you can on the left side of your command line.
This is one of the best practice in Powershell because the output of your first function is much smaller compare to the 1800 Distribution Groups we get in the previous example.

Here I'm using the Filter parameter from the `Get-DistributionGroup` to only find groups where my distinguished name appears.


```powershell
Get-DistributionGroup -Filter "Members -like $($user.distinguishedName)"
```


{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150829_PowerShellOffice_365_-_Get_an_Exchange_Online_user%27s_distribution_groups_efficiently/2015-08-25+9-47-27+PM__1159283031__-772x478.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{ImageUrl}})


# Exchange Cmdlet Server-Side Opath Filtering

I don't know if you notice but there is a trick here in the previous example.
In the Filter I specified the `Members` property.... but there is no `Members` property when you check the `Get-DistributionGroup` members.

```powershell
Get-DistributionGroup -ResultSize 5 | Get-Member -Name "*Member*"
```

No signs of 'Members' property. If you look at the help of `Get-DistributionGroup`, you see something talking about `Opath filtering` used to filter recipients.

{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150829_PowerShellOffice_365_-_Get_an_Exchange_Online_user%27s_distribution_groups_efficiently/Get-DistributionGroup_Get-Member__164818717__-772x458.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{ImageUrl}})

{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150829_PowerShellOffice_365_-_Get_an_Exchange_Online_user%27s_distribution_groups_efficiently/Get-DistributionGroup_Help_Filterparam__2128617403__-772x378.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{ImageUrl}})

`Get-Help` on `Get-DistributionGroup` for the `-Filter` Parameter.

The reason is that you can use `Exchange Opath filters` inside many Exchange Online cmdlets.

> ## Exchange Opath filters
<i>OPATH is basis for the filtering syntax used by PowerShell, and is therefore the filtering syntax used by Exchange 2007. It replaces the complicated syntax of LDAP used in Exchange 2003, and will allow for filters which are easier to create and interpret. For native PowerShell filters, all work is done client-side in the Powershell host. In Exchange 2007, however, various cmdlets provide "server-side" filters using the same syntax as their client-side counterparts. These server-side filters provide higher performance and added scenarios that are specific to Exchange Server.</i>
> [http://blogs.technet.com/b/exchange/archive/2007/01/10/3397707.aspx](http://blogs.technet.com/b/exchange/archive/2007/01/10/3397707.aspx)

More information on the properties that you can use with Exchange Cmdlets in the `Filter` Parameter : [https://technet.microsoft.com/en-us/library/bb738155(v=exchg.150).aspx](https://technet.microsoft.com/en-us/library/bb738155(v=exchg.150).aspx)

# Additional Information

* Exchange Online - <a href="https://technet.microsoft.com/en-us/library/bb124268(v=exchg.150).aspx#OPATH" target="_blank">OPATH Syntax</a>
* Exchange Online - <a href="https://technet.microsoft.com/en-us/library/bb124268(v=exchg.150).aspx" target="_blank">Filters in recipient Shell commands</a>
* Exchange Online - <a href="https://technet.microsoft.com/en-us/library/bb738155(v=exchg.150).aspx" target="_blank">Filterable properties for the -Filter parameter</a>