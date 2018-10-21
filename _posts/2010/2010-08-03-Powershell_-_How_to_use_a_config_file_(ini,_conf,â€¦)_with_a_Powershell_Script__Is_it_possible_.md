---
layout: single
title: Powershell - How to use a config file (ini, conf,...) with a Powershell Script ?
excerpt: 
permalink: /2010/08/powershell-how-to-use-config-file-ini.html
tags:
- ini
- powershell
- scripting
categories:
- powershell
published: true
comments: true
---

I was recently looking for a way to load a txt file configuration with PowerShell and came up with the following solution:

Here is an example of configuration stored in a file called `Settings.txt`

```text
SETTINGS.TXT
#from http://tlingenf.spaces.live.com/blog/cns!B1B09F516B5BAEBF!213.entry
#
[General]
MySetting1=value

[Locations]
InputFile="C:\Users.txt"
OutputFile="C:\output.log"

[Other]
WaitForTime=20
VerboseLogging=True
```

And here is the PowerShell snippet used to load the configuration:

```powershell
Get-Content -Path "C:\settings.txt" |
    foreach-object `
        -begin {
            # Create an Hashtable
            $h=@{}
        } `
        -process {
            # Retrieve line with '=' and split them
            $k = [regex]::split($_,'=')
            if(($k[0].CompareTo("") -ne 0) -and ($k[0].StartsWith("[") -ne $True))
            {
                # Add the Key, Value into the Hashtable
                $h.Add($k[0], $k[1])
            }
        } `
        -end {Write-Output $h}
```

Here is an example of output:

```text
Name                           Value
----                           -----
MySetting1                     value
VerboseLogging                 True
WaitForTime                    20
OutputFile                     "C:\output.log"
InputFile                      "C:\Users.txt"
```