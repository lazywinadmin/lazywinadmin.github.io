---
layout: single
title: PowerShell - Report Expiring User accounts
excerpt: Script to report expired Active Directory accounts to the assigned manager.
permalink: /2015/05/powershell-report-expiring-user-accounts.html
tags: 
- active directory
- expiring
- powershell
- report
- user account
published: true
comments: true
toc: true
toc_label: "Table of content"
---

<a href="{{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/339px-Expired.svg__2053401180__-339x479.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="200" src="{{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/339px-Expired.svg__2053401180__-339x479.png" width="141" /></a>In the video game industry it is common practice to hire consultants to take care of the Quality Assurance, which consists of a means of the software engineering processes and methods used to ensure quality. Those people are most likely Testers and usually spend most of their day testing games in development to find bugs.

The problem is, once in a while managers forget to update the expiration dates of their Consultant/External Partners even if they got a couple of reminders, and since we have some automation process taking care of the off-boarding (thanks to PowerShell! ;-)...it is becoming fun when those guys can't connect to their accounts on Monday morning...and they lost all their access.

So I wrote a tiny script to report any expiring user accounts and send it to the IT department every Monday morning, just to give us a heads up.

<b><u>Report Example</u></b>

[ReportExample]: {{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/Report-Example__1621226184__-951x506.png
![Report Example][ReportExample]

# How does this work ?

## Summary

This script that will retrieve all the users under a specified Organizational Unit and look for any expiring account in the time span specified (by default I set it to 10 days).

If some accounts are found, the script will generate a HTML report and send it via Email.

You will also need to create a scheduled task to run the script at the specific frequency, in my case it runs every Monday at 6 am.

## Step by Step

1. Look for user accounts expiring in the next 10 days using the cmdlet [`Search-ADAccount`](https://technet.microsoft.com/en-us/library/hh852292.aspx) (from the Active Directory Module)
1. If some accounts are found, Continue, else Stop.
1. Generate a HTML Report,
1. Send the Report to IT Support team.

## Workflow

[![Workflow]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/Report-Expiring_accounts2__601171038__-809x1600.png)]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/Report-Expiring_accounts2__601171038__-809x1600.png)

# Finding Expiring Account

I am using the very neat cmdlet: `Search-ADAccount`. This cmdlet is included with in the Active Directory Module and comes with some very cool parameters.

[![Finding Expiring Account]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/Search-ADAccount__1339633875__-566x313.png)]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/Search-ADAccount__1339633875__-566x313.png)

Notice the `-AccountExpiring` parameter, that's what we need for our little script.

We can get more information by checking out the help

[![Checking out the help]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/Get-Help_Search-ADAccount__1391296234__-802x547.png)]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/Get-Help_Search-ADAccount__1391296234__-802x547.png)

With the `-AccountExpiring` parameter we can use either `-DateTime` or `TimeSpan` parameter to specify the time range.

[![AccountExpiring]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/Search-ADAccount_Example__1428049022__-864x253.png)]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/Search-ADAccount_Example__1428049022__-864x253.png)

Search for account Expiring before 2015/05/26

```powershell
Search-ADAccount -AccountExpiring -DateTime "2015/05/26"
```

[![Search-ADAccount]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/2015-05-16+5-07-18+PM__397010592__-772x278.png)]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/2015-05-16+5-07-18+PM__397010592__-772x278.png)

[![Search-ADAccount2]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/Search-ADAccount_Example2__1309512313__-864x306.png)]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/Search-ADAccount_Example2__1309512313__-864x306.png)

```powershell
Search-ADAccount -AccountExpiring -TimeSpan "10.00:00:00"
```

[![Search-ADAccount3]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/2015-05-16+4-14-16+PM__1637767674__-772x278.png)]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/2015-05-16+4-14-16+PM__1637767674__-772x278.png)

Ok we got the expiring accounts, now we need to generate a report.

# Creating the report

The above output can be easily converted to HTML using the cmdlet `ConvertTo-HTML`, but before we do this, I need to find a nice and simple CSS to make my report looks nice :-)

A quick Google search lead me to this little piece of code below (found on <http://www.textfixer.com/tutorials/css-tables.php>)

I'm adding this piece of code into the variable `$CSS` using the here-string construction method.
Here-String construction lets you bypass the complexities involved in assigning a multi-line string value to a variable.

[![Example using the TimeSpan parameter]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/CSS__1757120316__-539x769.png)]({{ site.url }}/images/2015/20150518_PowerShell_-_Report_Expiring_User_accounts/CSS__1757120316__-539x769.png)

Almost there! The next step is to add a Title above our report and a Foot Note to display the source and generated date/time.

```powershell
# Define the Title of the report
$PreContent = "<Title>Active Directory - Expiring Users (next $days days)</Title>"

# Add a small line at the end to show the source of the report
$NoteLine = "Generated from $($env:Computername.ToUpper()) on $(Get-Date -format 'yyyy/MM/dd HH:mm:ss')"
$PostContent = "<br><p><font size='2'><i>$NoteLine</i></font>"
```

We use `ConvertTo-HTML` cmdlet to get everything together into the `$body` variable which will be used when sending the email.

```powershell
$body = $Accounts |
    ConvertTo-Html -head $Css -PostContent $PostContent -PreContent $PreContent
```

The report is ready to be sent!

# Download

The script is available on Technet Gallery and <a href="https://github.com/lazywinadmin/PowerShell/blob/master/AD-USER-Report_Expiring_users/AD-USER-Report_Expiring_users.ps1" target="_blank">GitHub</a>