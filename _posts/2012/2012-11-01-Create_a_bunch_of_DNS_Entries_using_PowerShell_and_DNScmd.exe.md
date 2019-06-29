---
layout: single
title: Create a bunch of DNS Entries using PowerShell and DNScmd.exe
excerpt: 
permalink: /2012/10/create-dns-entries-using-powershell-and.html
tags: 
- csv
- dns
- dns server
- powershell
published: true
comments: true
---
<a href="{{ site.url }}/images/2012/20121101_Create_a_bunch_of_DNS_Entries_using_PowerShell_and_DNScmd.exe/DNS__367348001__-450x361.jpg" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="160" src="{{ site.url }}/images/2012/20121101_Create_a_bunch_of_DNS_Entries_using_PowerShell_and_DNScmd.exe/DNS__1762928334__-200x160.jpg" width="200" /></a>
> Update 2019/06/28: Add example to add the same entries to multiple zones.

Today I needed to create approx. ~50 DNS A entries.
Each of those also need to have a PTR entry.

Lazy as i am... a quick search for PowerShell DNS module did return some interesting things but none who can create both `A` and< `PTR` DNS entries at the same time.

So I decided to finally use `DNSCMD.exe` (<a href="http://technet.microsoft.com/en-us/library/cc772069(v=ws.10).aspx" target="_blank">full syntax on technet</a>) with powershell.

**Requirement**: `DNSCmd.exe` is part of theDNS Server Tools and need to be installed prior to use it. On Windows server you can install it using `Add-WindowsFeature RSAT-ADDS-Tools`

Here is a quick syntax overview of the Dnscmd.exe that we will be using.

```text
dnscmd.exe <DNSServer> /RecordAdd <DNSZone> <NewEntryName> /CreatePTR A <IPAddress>
```

**First Step:**
Create a CSV with all the information (in Excel or via PowerShell)
here is an example, save it as DNSEntries.csv (in my case at the root of the C: drive)

<a href="{{ site.url }}/images/2012/20121101_Create_a_bunch_of_DNS_Entries_using_PowerShell_and_DNScmd.exe/DNSCMD-CSVFILE__404817523__-637x615.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" qea="true" src="{{ site.url }}/images/2012/20121101_Create_a_bunch_of_DNS_Entries_using_PowerShell_and_DNScmd.exe/DNSCMD-CSVFILE__547032139__-637x615.png" /></a>

**Second Step:** The PowerShell one-liner:

```powershell
Import-CSV -Path "c:\DNSEntries.csv" |
ForEach-Object {
  dnscmd.exe $_.dnsserver /RecordAdd $_.zone $_.name /createPTR $_.type $_.IP
}
```

And the output should look like the following:

<a href="{{ site.url }}/images/2012/20121101_Create_a_bunch_of_DNS_Entries_using_PowerShell_and_DNScmd.exe/DNSCMD-OUTPUT__1945553717__-692x322.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" qea="true" src="{{ site.url }}/images/2012/20121101_Create_a_bunch_of_DNS_Entries_using_PowerShell_and_DNScmd.exe/DNSCMD-OUTPUT__866050784__-692x322.png" /></a>


## Extra: Adding the same entries to multiple zones.

One user asked in the comments how to add the same DNS entries to multiple zones.

This could be accomplished uing the following approach:

**Note: I did not try this**

### First step

1. create a csv file, similar to the previous example and remove the `zone` property. (just remove the column `zone` and save the file)
1. create a text file that contains the list of your zones.

### Second step

```powershell
# Assuming you want to create the same entries for
# multiple zone, here is the approach you would do

# Get the DNS entries from dnsentries.csv
$DNSEntries = Import-CSV -Path "c:\DNSEntries.csv"

# Get the zones from the zones.txt file
$MyZones = Import-CSV -Path "c:\zones.txt"

# For each DNS Entries
$DNSEntries | ForEach-Object {
	# Capture current DNS Entry to process
	$CurrentDNSEntry = $_
	
	# Foreach Zones
	$MyZones | ForEach-Object {
		# Capture current DNS Entry to process
		$CurrentZone = $_
		
		# Create "CurrentDNSEntry" in "$CurrentZone"
		"[Zone: $currentzone] Entry name $($CurrentDNSEntry.name)"
		dnscmd.exe $CurrentDNSEntry.dnsserver /RecordAdd $CurrentZone $CurrentDNSEntry.name /createPTR $CurrentDNSEntry.type $CurrentDNSEntry.IP
	}
}
```



