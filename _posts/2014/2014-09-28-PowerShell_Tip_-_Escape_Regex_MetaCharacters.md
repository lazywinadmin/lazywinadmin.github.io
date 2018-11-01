---
layout: single
title: PowerShell Tip - Escape Regex MetaCharacters
excerpt: 
permalink: /2014/09/powershell-tip-escape-regex.html
tags: 
- .net
- powershell
- powershell tip
- regex
- regular expressions
- tip
published: true
comments: true
---


<a href="{{ site.url }}/images/2014/20140928_PowerShell_Tip_-_Escape_Regex_MetaCharacters/powershell_logo__1414163941__-144x109.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140928_PowerShell_Tip_-_Escape_Regex_MetaCharacters/powershell_logo__1414163941__-144x109.png" /></a>
Last week I worked on a Scorch PowerShell script that is looking for duplicate Incident Requests inside SCSM by checking new incoming request and existing ticket already in the system.

One of the script step is to look for a match between two strings, something similar to the following:

```powershell
$String1 = "Title:[PowerShell Rocks!]"
$String2 = "Title:[PowerShell Rocks!]"

$String1 -match $String2
```

Straight forward you would think! And at first I was surprised to see the result `$FALSE` ... yep...to "ass-u-me"...

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/20140928_PowerShell_Tip_-_Escape_Regex_MetaCharacters/string_match_string__1798984695__-692x170.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2014/20140928_PowerShell_Tip_-_Escape_Regex_MetaCharacters/string_match_string__1798984695__-692x170.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">What !?</td></tr></tbody></table>
After taking another golp of coffee... I realized that the match operator was interpreting the `:`,`[` and `]` as regex metacharacters.

# Using BackSlash character to ignore metacharacters

I could easily escape those characters by placing a backslash `\` character to ignore those

```powershell
$String1 = "Title:[PowerShell Rocks!]"
$String2 = "Title:\[PowerShell\ Rocks!]"

$String1 -match $String2
```

<a href="{{ site.url }}/images/2014/20140928_PowerShell_Tip_-_Escape_Regex_MetaCharacters/2014-09-29_21-40-22__1259397774__-692x170.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140928_PowerShell_Tip_-_Escape_Regex_MetaCharacters/2014-09-29_21-40-22__1259397774__-692x170.png" /></a>


# Using the [Regex]::Escape() method

Since my script might received very different type of text inputs with some other metacharacters, another technique is to use the method ESCAPE() that comes with the <a href="http://msdn.microsoft.com/en-us/library/system.text.regularexpressions.regex(v=vs.110).aspx" target="_blank">System.Text.RegularExpressions.Regex</a> class, we can use the [regex] accelerator type to call it.

```powershell
$String1 = "Title:[PowerShell Rocks!]"
$String2 = "Title:[PowerShell Rocks!]"

# Using the full classname
$String1 -match [System.Text.RegularExpressions.Regex]::Escape($String2)

# Using the Accelerator type
$String1 -match [Regex]::Escape($String2)
```

<a href="{{ site.url }}/images/2014/20140928_PowerShell_Tip_-_Escape_Regex_MetaCharacters/string_match_Regex_Escape_string3__1669152075__-692x234.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140928_PowerShell_Tip_-_Escape_Regex_MetaCharacters/string_match_Regex_Escape_string3__1669152075__-692x234.png" /></a>

If you look on <a href="http://msdn.microsoft.com/en-us/library/system.text.regularexpressions.regex.escape(v=vs.110).aspx" target="_blank">MSDN documentation</a>, you find the following details:

> <b><u>Regex.Escape Method </u></b>
Escapes a minimal set of characters (\, *, +, ?, |, {, [, (,), ^, $,., #, and white space) by replacing them with their escape codes. This instructs the regular expression engine to interpret these characters literally rather than as metacharacters.