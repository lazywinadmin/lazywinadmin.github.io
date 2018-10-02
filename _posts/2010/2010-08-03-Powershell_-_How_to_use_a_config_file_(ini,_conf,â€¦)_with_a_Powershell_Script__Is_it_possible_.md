---
layout: single
title: Powershell - How to use a config file (ini, conf,â€¦) with a Powershell Script ? Is it possible ?
excerpt: 
permalink: /2010/08/powershell-how-to-use-config-file-ini.html
tags: 
- ini
- powershell
- scripting
published: true
comments: true
---
<div style="background-clip: initial; background-color: white; background-origin: initial; line-height: 19px; margin: 0px; padding-bottom: 7px; padding-left: 7px; padding-right: 7px; padding-top: 7px;">Is it possible to use a configuration file with a PowerShell script ?
<strong>for example, the configuration file:</strong>
<pre style="line-height: 18px;"><code>#links
link1=http://www.google.com
link2=http://www.apple.com
link3=http://www.microsoft.com</code>
```

<strong>and then call this information in the PS1 script:</strong>
<pre style="line-height: 18px;"><code>start-process iexplore.exe $Link1</code>
```

thanks in advance for your help!!

Your answers put me on the good track and I found <a _mce_href="http://tlingenf.spaces.live.com/blog/cns!B1B09F516B5BAEBF!213.entry" href="http://tlingenf.spaces.live.com/blog/cns!B1B09F516B5BAEBF!213.entry" rel="nofollow"><u>this</u></a>

<strong>SETTINGS.TXT</strong>
<pre style="line-height: 18px;"><code>#from http://tlingenf.spaces.live.com/blog/cns!B1B09F516B5BAEBF!213.entry
#
[General]
MySetting1=value

[Locations]
InputFile="C:\Users.txt"
OutputFile="C:\output.log"

[Other]
WaitForTime=20
VerboseLogging=True</code>
```

<strong>POWERSHELL COMMAND</strong>
<pre style="line-height: 18px;"><code>#from http://tlingenf.spaces.live.com/blog/cns!B1B09F516B5BAEBF!213.entry
#
Get-Content "C:\settings.txt" | foreach-object -begin {$h=@{}} -process { $k = [regex]::split($_,'='); if(($k[0].CompareTo("") -ne 0) -and ($k[0].StartsWith("[") -ne $True)) { $h.Add($k[0], $k[1]) } }</code>
```

then

<em>After executing the code snippet, a variable ($h) will contain the values in a HashTable.</em>
<pre style="line-height: 18px;"><code>Name Value
---- -----
MySetting1 value
VerboseLogging True
WaitForTime 20
OutputFile "C:\output.log"
InputFile "C:\Users.txt"</code>
```

*To get an item from the table use the command $h.Get_Item("MySetting1").*
