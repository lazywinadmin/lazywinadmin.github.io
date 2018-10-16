---
layout: single
classes: wide
title: "PowerShell Tip: Parse a date inside a string"
excerpt: "I was recently parsing a bunch of logs where the date and time were in a format that Get-Date couldn't interprete..."
permalink:
tags: 
  - powershell
categories:
  - powershell
published: true
comments: true
author_profile: false
header:
  teaserlogo:
  teaser: ''
  image: images/headers/Code01_1920x500.jpg
  caption:
gallery:

  - image_path: ''
    url: ''
    title: ''
toc: true
toc_label: "Table of content"
---

_Tested on PowerShell Core 6.1.0 (Microsoft Windows 10.0.17763)_
{: .notice--info}

Recently I had to parse a bunch of log files for one of my projects, but the date format what not really ideal for sorting per date.

As an example, here is one of the log format.

![image-center](/images\2018\2018-10-13-PowerShellTip-DateTimeParsing\PowerShellTip-DateTimeParsing01.jpg){: .align-center}

## Parsing the file using Import-CSV

Since we have a delimiter available between each values `;`, we can leverage `Import-CSV` to parse the file and assigned the different values to properties with the `-Header` parameter.

```powershell
import-csv -Path .\ScriptExample-20181002134401.log -Delimiter ';' -header 'Date','Type','Message'
```

Output:

```text
Date           Type Message
----           ---- -------
20181002134401 INF  +----------------------------------------------------------------------------------------+
20181002134401 INF  Script fullname          : C:\FX\script_example.ps1
20181002134401 INF  Current user             : DEMOCOMP\FX
20181002134401 INF  Current computer         : DEMOCOMP
20181002134401 INF  Operating System         : Microsoft Windows 10 Entreprise 2016 LTSB
20181002134401 INF  OS Architecture          : 64 bits
20181002134401 INF  +----------------------------------------------------------------------------------------+
20181002134401 INF  Connect to database 'SQLSERVER01'
20181002134401 INF  Create splatting
20181002134401 INF  Append parameters
```

<!---
![image-center](/images\2018\2018-10-13-PowerShellTip-DateTimeParsing\PowerShellTip-DateTimeParsing02.jpg){: .align-center}--->

## Problem and Solution

However the first column `Date` is not interprated as a DateTime type. For this you can leverage the Method `ParseExact` from the `[datetime]` class.

You'll need to pass the value and the format. The format strings available can be found [here](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings).
* `yyyy`  : Year
* `MM`    : Month
* `dd`    : Day
* `HH`    : Hour (`HH` for 24 hours format and `hh` for 12 hours format)
* `mm`    : Minute
* `ss`    : Seconde

Here is an example:

```powershell
[datetime]::ParseExact("20181010134412",'yyyyMMddHHmmss',$null)
```

Output:

```text
October 10, 2018 1:44:12 PM
```

This method accept different values as input

```text
OverloadDefinitions
-------------------
static datetime ParseExact(string s, string format, System.IFormatProvider provider)
static datetime ParseExact(string s, string format, System.IFormatProvider provider, System.Globalization.DateTimeStyles style)
static datetime ParseExact(System.ReadOnlySpan[char] s, System.ReadOnlySpan[char] format, System.IFormatProvider provider, System.Globalization.DateTimeStyles style)
static datetime ParseExact(string s, string[] formats, System.IFormatProvider provider, System.Globalization.DateTimeStyles style)
static datetime ParseExact(System.ReadOnlySpan[char] s, string[] formats, System.IFormatProvider provider, System.Globalization.DateTimeStyles style)
```

## Result

Now I can just convert the date string into an actual DateTime object using `Select-Object`.
Using a hash table with Name and Expression keys. The value of the Expression key is a script blocks that gets the Date property of each log entry (line) and convert them using the `ParseExact` method we saw above.

```powershell
import-csv .\ScriptExample-20181002134401.log -Delimiter ';' -header 'Date','Type','Message' |
Select-Object -Property @{
    Name='Date';
    Expression={
        [datetime]::ParseExact($($_.date),'yyyyMMddHHmmss',$null)}
    },Type,Message
```

Output:

```text
Date                  Type Message
----                  ---- -------
2018-10-02 1:44:01 PM INF  +----------------------------------------------------------------------------------------+
2018-10-02 1:44:01 PM INF  Script fullname          : C:\FX\script_example.ps1
2018-10-02 1:44:01 PM INF  Current user             : DEMOCOMP\FX
2018-10-02 1:44:01 PM INF  Current computer         : DEMOCOMP
2018-10-02 1:44:01 PM INF  Operating System         : Microsoft Windows 10 Entreprise 2016 LTSB
2018-10-02 1:44:01 PM INF  OS Architecture          : 64 bits
2018-10-02 1:44:01 PM INF  +----------------------------------------------------------------------------------------+
2018-10-02 1:44:01 PM INF  Connect to database 'SQLSERVER01'
2018-10-02 1:44:01 PM INF  Create splatting
2018-10-02 1:44:01 PM INF  Append parameters
```

Screenshot in action:

![image-center](/images\2018\2018-10-13-PowerShellTip-DateTimeParsing\PowerShellTip-DateTimeParsing03.jpg){: .align-center}