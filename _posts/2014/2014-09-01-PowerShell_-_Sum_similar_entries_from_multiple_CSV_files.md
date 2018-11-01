---
layout: single
title: PowerShell - Sum similar entries from multiple CSV files
excerpt: 
permalink: /2014/09/powershell-sum-similar-entries-from.html
tags: 
- csv
- import-csv
- log
- microsoft excel
- parsing
- powershell
- proxy
published: true
comments: true
---

 
 <a href="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/powershell_logo__990131128__-144x109.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/powershell_logo__990131128__-144x109.png" /></a>One of my script is scheduled to download everyday the proxy logs files from multiple proxies (Approx 1>2GB per file) of the previous day. The second step is to parse each of them and get the top 200 domain names within a specific environment. Finally at the end of the month another script create a report on the monthly internet usage.

I thought this was an interesting exercise even if some tools would probably do a better job ($$$). Also we shouldn't take those results too seriously since some protocols like Ajax or HTML5 talk a lot to the servers, keep refreshing pages even if you are not actively working on them.

In this post, I will talk about the last part of this process and how I combine all those files to get a real monthly top domains.



<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/Drawing1__1917794308__-1600x806.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/Drawing1__1917794308__-1600x806.png" height="321" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">
</td></tr></tbody></table>

# Example of daily report


Here is a sample of daily CSV file result after the parsing has done its job:

<a href="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/2014-09-01_16-47-54__862795648__-197x157.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/2014-09-01_16-47-54__862795648__-197x157.png" /></a>
So at the end of the month I have a bunch of CSV files that were generated during the months and I need to know how many time each domains were accessed.





# One-Liner Magic!


To calculate the Sum of each domains for each months I can simply use the following One-Liner:

```
Get-ChildItem -Path .\*.csv | # Get each CSV files
    ForEach-Object -Process {
        Import-Csv -Path $PSItem.FullName # Import CSV data
    } | 
    Group-Object -Property Name | # Group per Domain Name
    Select-Object -Unique -Property Name, @{
        Label = "Sum";
        Expression = {
            # Sum all the counts for each domain
            ($PSItem.group | Measure-Object -Property Count -sum).Sum
        }
    } |
    Sort-Object -Property Sum -Descending |
    Out-GridView -Title "Top Domains"
```


<a href="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/2014-09-01_16-27-49__1938572579__-338x402.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/2014-09-01_16-27-49__1938572579__-338x402.png" /></a>

# Step by Step



<u>Get all the CSV File</u>

<a href="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/2014-09-01_18-13-59__1544608816__-692x292.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/2014-09-01_18-13-59__1544608816__-692x292.png" /></a>```

```

Now we <u>import the data</u> inside each file. I added a Sort-Object so you can see that we have duplicates (since we have the same values coming from different files).

<a href="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/2014-09-01_18-22-38__1316553119__-677x583.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/2014-09-01_18-22-38__1316553119__-677x583.png" /></a>

Using <u>Group-Object by Domain Name</u>. This will group also all the different "counts" for each domain

<a href="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/2014-09-01_18-15-53__576300314__-692x292.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/2014-09-01_18-15-53__576300314__-692x292.png" /></a>
Finally we use Select-Object to <u>show a unique Domain Name</u> and <u>Sum each counts present in the "Group"</u> property from the Group-Object Cmdlet (see above).

<a href="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/2014-09-01_20-26-30__1652430148__-692x400.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140901_PowerShell_-_Sum_similar_entries_from_multiple_CSV_files/2014-09-01_20-26-30__1652430148__-692x400.png" /></a>





