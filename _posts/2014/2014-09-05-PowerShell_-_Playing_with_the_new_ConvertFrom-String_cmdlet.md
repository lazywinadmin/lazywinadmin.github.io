---
layout: single
title: PowerShell - Playing with the new ConvertFrom-String cmdlet
excerpt: 
permalink: /2014/09/powershell-playing-with-new-convertfrom.html
tags: 
- convertfrom-string
- netstat
- parser
- parsing
- powershell
- powershell 5.0
- regex
- regular expressions
published: true
comments: true
---

<a href="{{ site.url }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_20-28-34__556572779__-144x125.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_20-28-34__556572779__-144x125.png" /></a>In a previous post I talked about <a href="{{ site.url }}/2014/08/powershell-parse-this-netstatexe.html" target="_blank">parsing NetStat.exe using PowerShell and some regex</a>, It is a fun exercice but require some knowledge to figure out how the parsing should happen.

Today, It got way easier ! The PowerShell Team just released a new version of the WMF : <a href="http://blogs.msdn.com/b/powershell/archive/2014/09/04/windows-management-framework-5-0-preview-september-2014-is-now-available.aspx" target="_blank">v5 September preview !</a> And One of the coolest feature is the new <b>ConvertFrom-String</b>cmdlet.

<b><u style="background-color: yellow;">EDIT (2014/10/02):</u></b> See also my post about <a href="{{ site.url }}/2014/09/powershell-convertfrom-string-and.html" target="_blank">using ConvertFrom-String and the param -TemplateFile against Netstat.exe</a>

Using the same example <a href="{{ site.url }}/2014/08/powershell-parse-this-netstatexe.html" target="_blank">from my previous post</a>, I will perform a simple parsing of netstat.exe -n and send the output to ConvertFrom-String.

<b><u>Important:</u></b><i>This post is based on the September 2014 preview release of WMF 5.0. This is pre-release software, so this information may change.</i>

<u>Note:</u> $netstat variable is holding the output of netstat.exe -n without the 5 first lines, you can refer to <a href="{{ site.url }}/2014/08/powershell-parse-this-netstatexe.html" target="_blank">my previous post</a> to see how to do this step.

## Playing with ConvertFrom-String

Passing the Output of netstat to ConvertFrom-String, the cmdlet is parsing on the whitespace by default, but you can also specify it using the parameter -Delimiter

```powershell
$netstat | ConvertFrom-String
```

<a href="{{ site.url }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_22-59-56__1937905208__-692x472.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_22-59-56__1937905208__-692x472.png" /></a>
The first property is empty since the output of netstat starts with a couple of whitespaces, the parsing interpret it as an empty property.

## Adding some Properties

Next we can specify the Properties names to make it more explicit
None is used for my first empty property called P1 in the previous example.

```powershell
$netstat | ConvertFrom-String -PropertyNames None,Protocol,LocalIP,RemoteIP,Status
```

<a href="{{ site.url }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_23-01-38__1726571702__-692x472.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_23-01-38__1726571702__-692x472.png" /></a>

To remove the first empty property, we can modify the initial $netstat by removing the whitespace at the beginning of each line. Regex magic: '^\s+'


```powershell
$netstat -replace '^\s+' | ConvertFrom-String -PropertyNames Protocol,LocalIP,RemoteIP,Status
```

<a href="{{ site.url }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_23-02-37__1915252753__-692x472.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_23-02-37__1915252753__-692x472.png" /></a>

That's all for today, in a next post I will work with the new parameters `TemplateFile` and `TemplateContent` parameters.

## Extra: Help Content

Current help content

```text
Synopsis
    
    ConvertFrom-String -InputObject <string> [-Delimiter <string>] [-PropertyNames <string[]>] [<CommonParameters>]
    
    ConvertFrom-String -InputObject <string> [-TemplateFile <string>] [-TemplateContent <string>] [<CommonParameters>]
    

Syntax
    ConvertFrom-String -InputObject <string> [-Delimiter <string>] [-PropertyNames <string[]>] [<CommonParameters>]

    ConvertFrom-String -InputObject <string> [-TemplateFile <string>] [-TemplateContent <string>] [<CommonParameters>]


Parameters
    -Delimiter <string>

        Required?                    false
        Position?                    Named
        Default value                
        Accept pipeline input?       false
        Accept wildcard characters?  

    -InputObject <string>

        Required?                    true
        Position?                    Named
        Default value                
        Accept pipeline input?       true (ByValue)
        Accept wildcard characters?  

    -PropertyNames <string[]>

        Required?                    false
        Position?                    Named
        Default value                
        Accept pipeline input?       false
        Accept wildcard characters?  

    -TemplateContent <string>

        Required?                    false
        Position?                    Named
        Default value                
        Accept pipeline input?       false
        Accept wildcard characters?  

    -TemplateFile <string>

        Required?                    false
        Position?                    Named
        Default value                
        Accept pipeline input?       false
        Accept wildcard characters?  



Inputs
    System.String
    

Outputs
    System.Object

RelatedLinks
     http://go.microsoft.com/fwlink/?LinkId=507579


Remarks
    Get-Help cannot find the Help files for this cmdlet on this computer. It is displaying only partial help.
        -- To download and install Help files for the module that includes this cmdlet, use Update-Help.
        -- To view the Help topic for this cmdlet online, type: "Get-Help ConvertFrom-String -Online" or 
           go to http://go.microsoft.com/fwlink/?LinkId=507579.

```