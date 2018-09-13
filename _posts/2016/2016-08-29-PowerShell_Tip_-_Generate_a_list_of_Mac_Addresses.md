---
layout: single
title: PowerShell Tip - Generate a list of Mac Addresses
excerpt: 
permalink: /2016/08/powershell-tip-generate-list-of-mac.html
tags: 
- composite formatting
- -f operator
- powershell
- sccm
- macaddress
published: true
comments: true
---

 
<a href="{{ site.url }}/images/2016/20160829_PowerShell_Tip_-_Generate_a_list_of_Mac_Addresses/1472461884_computer__1229181452__-128x128.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2016/20160829_PowerShell_Tip_-_Generate_a_list_of_Mac_Addresses/1472461884_computer__1229181452__-128x128.png" /></a>While playing in my lab I needed to create a bunch of fake Devices in System Center Configuration Manager (SCCM). When creation devices you need two pieces of information, the computer name and the Mac Address of the device.

I used the following method to generate my list of mac addresses.


```powershell
# First, get a list of mac address.
1..150 | ForEach-Object { '{0:X12}' -f $_ }
# Second step: Before we import we need to add a colon ":" every two characters
1..150|%{((('{0:X12}' -f $_) -split '(..)')|?{$_}) -join ":"}
```



### What is happening here

* We list from the number 1 to 150
```powershell
1..150
```

* We send each number to the pipeline and use composite formatting to convert the number to an hexadecimal that must me 12 characters. It will add leading zeros in this case.
```powershell
'{0:X12}' -f $_
```

* We then split every two characters using regex
```powershell
-split '(..)'
```

* We send this output to Where-Object to make sure we have a value. Our split is generating some empty values. We can double check that using those examples:
```powershell
("000000000000" -split "(..)").count # returns 13
("000000000000" -split "(..)" | where { $_ }).count #returns 6
```

* Finally we join the whole string (that is currently splitted every two characters) using -join with the delimiter ":"
```powershell
-join ":"
```





### Extra: Here is a list of fake ComputerName with their fake Mac Addresses

```powershell
1..10 | ForEach-Object{
    # ComputerName
    $CompNumber = "TestFakeDevice{0:0000}" -f $_
    
    # Mac Address
    $CompMac = (('{0:X12}' -f $_) -split '(..)' | Where-Object { $_ }) -join '-'
    
    # Output information
    New-Object -TypeName PSObject -Property @{
        ComputerNumber = $CompNumber
        ComputerMacAddress = $CompMac
    }
}
```


<u><b>Output: </b></u>

```
ComputerNumber     ComputerMacAddress
--------------     ------------------
TestFakeDevice0001 00-00-00-00-00-00
TestFakeDevice0002 00-00-00-00-00-01
TestFakeDevice0003 00-00-00-00-00-02
TestFakeDevice0004 00-00-00-00-00-03
TestFakeDevice0005 00-00-00-00-00-04
TestFakeDevice0006 00-00-00-00-00-05
TestFakeDevice0007 00-00-00-00-00-06
TestFakeDevice0008 00-00-00-00-00-07
TestFakeDevice0009 00-00-00-00-00-08
TestFakeDevice0010 00-00-00-00-00-09

```