---
layout: single
title: PowerShell - Who Reports to Whom? (Active Directory recursive DirectReports)
excerpt: 
permalink: /2014/10/powershell-who-reports-to-whom-active.html
tags: 
- active directory
- activedirectory module
- directreports
- function
- powershell
published: true
comments: true
---

> Update 2019/06/29: Added an example to do wildcard search
 
<a href="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/Site_Map__1366356344__-96x96.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/Site_Map__1366356344__-96x96.png" /></a>I've been working in the video games industry for a bit more than 3 months now. A lot is going on, and the pace seems faster than regular corporation environment. I also notice a lot of employees movements between teams and projects.

Last week I had an interesting "<i>Quest</i>": To find the list of employees under a specific manager. In Active Directory you can retrieve this information under the property <b><u>DirectReports</u></b>.

However if this manager manage other managers... how can I do a recursive search... ?
Sounds like a mission for PowerShell :)

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/2014-10-04_21-55-36__527074596__-340x342.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/2014-10-04_21-55-36__527074596__-340x342.png" height="320" width="318" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">
</td></tr></tbody></table>
In the following post, I will use the above diagram as an example to explain how to retrieve the directreports information and show how to find all the "<b><u>in</u></b>direct reports.

# Get-ADDirectReports function

Get-ADDirectReports is PowerShell functionusing the ActiveDirectory module to retrieve the directreports property. If the switch parameter <u><b>-Recurse</b></u> is used, It will report all the <b><u>in</u></b>directreports users under the <u><b>-Identity</b></u>account specified.

As an example, (assuming the above diagram) we can run the following commands:

```powershell
# Find all direct user reporting to Test_director
Get-ADDirectReports -Identity Test_director

# Find all Indirect user reporting to Test_director
Get-ADDirectReports -Identity Test_director -Recurse
```

<a href="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/Get-ADDirectReport__1896028255__-692x454.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/Get-ADDirectReport__1896028255__-692x454.png" /></a>

# Retrieving the DirectReport Property

Using the MMC Active Directory Users and Computers, this property in under the Organization tab of a user object. For example, here is the information for the Director

<a href="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/directreports_property_mmc__102966376__-432x531.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/directreports_property_mmc__102966376__-432x531.png" /></a>

<b>Director - DirectReports using PowerShell</b>

```powershell
# Find all direct user reporting to Test_director
Get-ADUser -Identity test_director -Properties directreports | Select-Object -ExpandProperty DirectReports
```

<a href="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/Director_directreports_powershell_02__1496667751__-692x166.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/Director_directreports_powershell_02__1496667751__-692x166.png" /></a>

**Managers - DirectReports**

```powershell
# Find all direct user reporting to Test_managerA
Get-ADUser -Identity test_managerA -Properties directreports | Select-Object -ExpandProperty DirectReports
```

<a href="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/ManagerA_ManagerB_directreports_powershell_02__454327956__-692x454.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em; text-align: center;"><img border="0" src="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/ManagerA_ManagerB_directreports_powershell_02__454327956__-692x454.png" /></a>

# Translating the output

We can notice that all the values returned are DistinguishedName. You'll need to do some extra work to get more information on those accounts. For example let's say you only want the SamAccountName and Mail properties:

```powershell
Get-ADUser -Identity test_director -Properties directreports |
    Select-Object -ExpandProperty directreports |
    Get-ADUser -Properties mail |
    Select-Object SamAccountName, mail
```

<a href="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/Director_directreports_powershell_SamAccountName_mail__1578705780__-692x220.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141005_PowerShell_-_Who_Reports_to_Whom_(Active_Directory_recursive_DirectReports)/Director_directreports_powershell_SamAccountName_mail__1578705780__-692x220.png" /></a>


# Recursive DirectReport

We can now create a small function to loop each time some directreports object are found...

<b><u>Small version</u></b>

```powershell
function Get-ADdirectReports
{
    PARAM ($SamAccountName)
    Get-Aduser -identity $SamAccountName -Properties directreports | %{
        $_.directreports | ForEach-Object -Process {
            # Output the current Object information
            Get-ADUser -identity $Psitem -Properties mail,manager | Select-Object -Property Name, SamAccountName, Mail, @{ L = "Manager"; E = { (Get-Aduser -iden $psitem.manager).samaccountname } }
            # Find the DirectReports of the current item ($PSItem / $_)
            Get-ADdirectReports -SamAccountName $PSItem
        }
    }
}
```

<b><u>Full version</u></b>

As a final step we want a flexible function who can return DirectReports and IndirectReports, plus all the nice stuff from PowerShell (Error Handling, Comment Based Help, etc...)

The full version is available below :-)

# Download

* <a href="http://gallery.technet.microsoft.com/Get-ADDirectReport-962616c6" target="_blank">Technet Gallery</a>
* <a href="https://github.com/lazywinadmin/PowerShell/tree/master/AD-USER-Get-ADDirectReport" target="_blank">GitHub</a>


# Extra: Wildcard search

Someone asked in comment how to do a wildcard search when specifying the `-SamAccountName`

For this we need to edit the function to use `-ldapfilter` instead of `-Identity`. 

Here is an example


```powershell
function Get-ADdirectReports
{
    PARAM ($SamAccountName)
    Get-Aduser -ldapfil "(samaccountname=$SamAccountName)" -Properties directreports |
		ForEach-Object{
        $_.directreports | ForEach-Object -Process {
            # Output the current Object information
            Get-ADUser -identity $Psitem -Properties mail,manager | Select-Object -Property Name, SamAccountName, Mail, @{ L = "Manager"; E = { (Get-Aduser -iden $psitem.manager).samaccountname } }
            # Find the DirectReports of the current item ($PSItem / $_)
            Get-ADdirectReports -SamAccountName $PSItem
        }
    }
}
```
Once loaded in your session, you can do something like:

```powershell
Get-ADdirectReports -SamAccountName francoi*
```

Hope this helps



