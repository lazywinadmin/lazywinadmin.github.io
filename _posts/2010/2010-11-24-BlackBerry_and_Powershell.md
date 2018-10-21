---
layout: single
title: BlackBerry and Powershell
excerpt: 
permalink: /2010/12/blackberry-and-powershell.html
tags: 
- blackberry server
- powershell
- scripting
- sql 2008
published: true
comments: true
toc: true
---

## Summary

Something that might be useful to anyone that uses poweshell alot. I wrote this so I could quickly look up a users information instead of having to go the BES Admin console. I put this in my profile.ps1 along with my other custom functions so it loads when i open powershell.

## Requirements

1. Install Quest Powershell Cmdlets "http://www.quest.com/powershell/activeroles-server.aspx" and make sure the snapin is loaded in powershell. I usually load it in my profile.ps1 file.

2. To use the new functions you need to follow the following install instructions. Install these components in the following order from this web site "http://www.microsoft.com/downloads/details.aspx?FamilyId=228DE03F-3B5A-428A-923F-58A033D316E1&amp;displaylang=en" <<b>This allows you to take advantage of the SQL 2008 cmdlets from Microsoft></b>

* Microsoft SQL Server System CLR Types
* Microsoft Core XML Services (MSXML) 6.0 (Note: This component is already part of SQL Server 2005, it will likely not need to be installed. I provide it here for completeness of prerequisites).
* Microsoft SQL Server 2008 Native Client (Note: I only installed the client. I did not install the SDK as well.)
Microsoft SQL Server 2008 Management Objects
* Microsoft Windows PowerShell Extensions for SQL Server

Run this from powershell.

```powershell
set-alias installutil $env:windir\microsoft.net\framework\v2.0.50727\installutil
installutil -i "C:\Program Files\Microsoft SQL Server\100\Tools\Binn\Redist\Microsoft.SqlServer.M anagement.PSProvider.dll"
installutil -i "C:\Program Files\Microsoft SQL Server\100\Tools\Binn\Redist\Microsoft.SqlServer.M anagement.PSSnapins.dll"
```

## Usage

`gbesuser "samaccountname"`

```
function gbesuser ($user){

    function devicetype ($type)
    {
        switch ($type)
        { 
            "3" {"GSM"}
            "4" {"CDMA"}
            default {"Unknown"}
        }
    }
    
    function vendor($vendorID)
    {
        switch ($buser.VendorID)
        { 
            "102" {"Cingular"}
            "103" {"NEXTEL"}
            "104" {"SprintPCS"}
            "105" {"Verizon"}
            "107" {"Rogers"}
            "109" {"Bell Mobility"}
            "120" {"Vodafone-UK"}
            "126" {"TELUS"}
            "138" {"Vodafone-AU"}
            "220" {"NNT DoCoMo"}
            default {"Unknown"}
        }
    }
    
    $server=""
    $database = ""
    $mdn = get-Qaduser $user -includeallproperties|
        Select-Object -Property legacyExchangeDN, AccountIsDisabled
        
    $bsql1 = @"
Select
UserConfig.DisplayName,MachineName,PIN,DeviceType,ModelName,PhoneNumber,AppsVer,
VendorID,IMEI,ICCID,MsgsForwarded,MsgsSent,MsgsPending,MsgsExpired,MsgsFiltered,MsgsFailed
,Status,LastFwdTime,LastSentTime
From
    UserConfig,SyncDeviceMgmtSummary,UserStats,ServerConfig
Where
    UserConfig.ID=SyncDeviceMgmtSummary.UserConfigID 
    and
        UserConfig.ID=UserStats.UserConfigID and UserConfig.MailboxDN = '"+$mdn.legacyexchangedn+"' 
    and
        Serverconfig.ID=UserConfig.ServerConfigID
"@
    $buser = Invoke-Sqlcmd -query $bsql1 -serverinstance $server -database $database
    $buser | Select-Object -Property displayname, machinename, pin, @{
        Name       = "DeviceType";
        Expression = {devicetype $buser.devicetype}
    },
    modelname, phonenumber, appsver,
    @{
        name       = "VendorID";
        expression = {vendor $buser.vendorID}
    },
    imei, iccid, MsgsForwarded, msgssent, msgspending, msgsexpired,
    msgsfiltered, msgsfailed, status, lastfwdtime, lastsenttime,
    @{
        name       = "AccountStatus";
        expression = {
            if ($mdn.accountisdisabled -eq $true)
            {"Disabled Account"}
            else {"Normal Account"}
        }
    }
}

```


## Result

Expected Output: (I replaced company internal information with astericks)

```text
DisplayName : ***********
MachineName : **********
PIN : ***********
DeviceType : GSM
ModelName : 8310
PhoneNumber : ***********
AppsVer : 4.5.0.110
VendorID : Cingular
IMEI : **********
ICCID : **********
MsgsForwarded : 14268
MsgsSent : 452
MsgsPending : 0
MsgsExpired : 0
MsgsFiltered : 0
MsgsFailed : 1
Status : 12
LastFwdTime : 3/1/2009 4:49:27 PM
LastSentTime : 3/1/2009 1:45:04 PM
AccountStatus : Normal Account
```