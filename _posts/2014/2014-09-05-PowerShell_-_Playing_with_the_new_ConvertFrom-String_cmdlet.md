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
{% include base_path %} 
 
 <a href="{{ base_path }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_20-28-34__556572779__-144x125.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_20-28-34__556572779__-144x125.png" /></a>In a previous post I talked about <a href="{{ base_path }}/2014/08/powershell-parse-this-netstatexe.html" target="_blank">parsing NetStat.exe using PowerShell and some regex</a>, It is a fun exercice but require some knowledge to figure out how the parsing should happen.

Today, It got way easier !! The PowerShell Team just released a new version of the WMF : <a href="http://blogs.msdn.com/b/powershell/archive/2014/09/04/windows-management-framework-5-0-preview-september-2014-is-now-available.aspx" target="_blank">v5 September preview !</a> And One of the coolest feature is the new <b><span style="font-family: Courier New, Courier, monospace; font-size: large;">ConvertFrom-String&nbsp;</b>cmdlet.

<b><u style="background-color: yellow;">EDIT (2014/10/02):</u></b> See also my post about <a href="{{ base_path }}/2014/09/powershell-convertfrom-string-and.html" target="_blank">using ConvertFrom-String and the param -TemplateFile against Netstat.exe</a>

Using the same example <a href="{{ base_path }}/2014/08/powershell-parse-this-netstatexe.html" target="_blank">from my previous post</a>, I will perform a simple parsing of netstat.exe -n and send the output to ConvertFrom-String.

<b><u>Important:</u></b>&nbsp;<i>This post is based on the September 2014 preview release of WMF 5.0. This is pre-release software, so this information may change.</i>


<u>Note:</u> $netstat variable is holding the output of netstat.exe -n without the 5 first lines, you can refer to <a href="{{ base_path }}/2014/08/powershell-parse-this-netstatexe.html" target="_blank">my previous post</a> to see how to do this step.



# Playing with ConvertFrom-String


Passing the Output of netstat to ConvertFrom-String, the cmdlet is parsing on the whitespace by default, but you can also specify it using the parameter -Delimiter

```
$netstat | ConvertFrom-String
```

<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_22-59-56__1937905208__-692x472.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_22-59-56__1937905208__-692x472.png" /></a></div>
The first property is empty since the output of netstat starts with a couple of whitespaces, the parsing interpret it as an empty property.




# Adding some Properties


Next we can specify the Properties names to make it more explicit
None is used for my first empty property called P1 in the previous example.

```
$netstat | ConvertFrom-String -PropertyNames None,Protocol,LocalIP,RemoteIP,Status
```

<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_23-01-38__1726571702__-692x472.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_23-01-38__1726571702__-692x472.png" /></a></div>

To remove the first empty property, we can modify the initial $netstat by removing the whitespace at the beginning of each line. Regex magic: '^\s+'


```
$netstat -replace '^\s+' | ConvertFrom-String -PropertyNames Protocol,LocalIP,RemoteIP,Status
```


<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_23-02-37__1915252753__-692x472.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140905_PowerShell_-_Playing_with_the_new_ConvertFrom-String_cmdlet/2014-09-04_23-02-37__1915252753__-692x472.png" /></a></div>


That's all for today, in a next post I will work with the new parameters TemplateFile and TemplateContent parameters.




# Extra: Help Content

Current help content


```
Synopsis
    
    ConvertFrom-String -InputObject &lt;string&gt; [-Delimiter &lt;string&gt;] [-PropertyNames &lt;string[]&gt;] [&lt;CommonParameters&gt;]
    
    ConvertFrom-String -InputObject &lt;string&gt; [-TemplateFile &lt;string&gt;] [-TemplateContent &lt;string&gt;] [&lt;CommonParameters&gt;]
    

Syntax
    ConvertFrom-String -InputObject &lt;string&gt; [-Delimiter &lt;string&gt;] [-PropertyNames &lt;string[]&gt;] [&lt;CommonParameters&gt;]

    ConvertFrom-String -InputObject &lt;string&gt; [-TemplateFile &lt;string&gt;] [-TemplateContent &lt;string&gt;] [&lt;CommonParameters&gt;]


Parameters
    -Delimiter &lt;string&gt;

        Required?                    false
        Position?                    Named
        Default value                
        Accept pipeline input?       false
        Accept wildcard characters?  

    -InputObject &lt;string&gt;

        Required?                    true
        Position?                    Named
        Default value                
        Accept pipeline input?       true (ByValue)
        Accept wildcard characters?  

    -PropertyNames &lt;string[]&gt;

        Required?                    false
        Position?                    Named
        Default value                
        Accept pipeline input?       false
        Accept wildcard characters?  

    -TemplateContent &lt;string&gt;

        Required?                    false
        Position?                    Named
        Default value                
        Accept pipeline input?       false
        Accept wildcard characters?  

    -TemplateFile &lt;string&gt;

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

