---
layout: single
title: PowerShell Tip - Adding Help in the PARAM statement
excerpt: 
permalink: /2014/01/powershell-tip-adding-help-in-param.html
tags: 
- powershell
- powershell 3.0
- powershell 4.0
- powershell ise
- sapien powershell studio 2012
- tip
published: true
comments: true
---

 
 <a href="{{ site.url }}/images/2014/20140126_PowerShell_Tip_-_Adding_Help_in_the_PARAM_statement/windows_powershell_icon__1887754660__-256x256.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140126_PowerShell_Tip_-_Adding_Help_in_the_PARAM_statement/windows_powershell_icon__1887754660__-256x256.png" height="180" width="180" /></a>It's always a good idea to include help within your functions ! You never know who might benefit from it.

With PowerShell adding help to your script, function and module is a really easy thing to do.


# Help in the PARAM statements


A very cool way to add some help to your script parameters is to add comments within the <b>PARAM</b> statement block. With this method you do not need to write a <span style="font-family: Courier New, Courier, monospace;"><b>.PARAMETER</b>directive for each paremeters. However you are required to write at least one directive in the Comment Based Help block (<span style="font-family: Courier New, Courier, monospace;"><b>.SYNOPSIS</b>or <span style="font-family: Courier New, Courier, monospace;"><b>.DESCRIPTION</b>) to be able to use it.

<u>Example:</u>


```
<#
    .SYNOPSIS
        This function will get some cool stuff
#>
    PARAM(
        # Specifies the computer name
        $ComputerName,
    
        # Specifies the Log directory Path
        $Logs = C:\lazywinadmin\logs
    )#PARAM
```

Then use Get-Help against your function/script


```
Get-Help Get-Something -Parameter *

```


This command will only return the Parameters information with the help we added in the PARAM statement


```
-ComputerName <string>
    Specifies the ComputerName

    Required?                    true
    Position?                    named
    Default value
    Accept pipeline input?       false
    Accept wildcard characters?  false


-Logs <string>
    Specifies the Log directory Path

    Required?                    false
    Position?                    named
    Default value                c:\lazywinadmin\logs
    Accept pipeline input?       false
    Accept wildcard characters?  false

</string></string>
```


<a href="http://4.bp.blogspot.com/-ldV5QCZ7Oec/UuSSEAVCbzI/AAAAAAABijE/6b3ej4vQLM4/s1600/2014-01-25+11-32-11+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-ldV5QCZ7Oec/UuSSEAVCbzI/AAAAAAABijE/6b3ej4vQLM4/s1600/2014-01-25+11-32-11+PM.png" /></a>
Even if this tip is pretty cool, I would still recommend to use the Comment Based Help block to have a centralized place to put all the help !



