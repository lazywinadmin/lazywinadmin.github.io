---
layout: single
title: PowerShell/Pester - Make sure your parameters are separated by an empty line
excerpt: 
permalink: /2016/08/powershellpester-make-sure-your.html
tags: 
- pester
- powershell
published: true
comments: true
toc: true
toc_label: "Table of content"
---

 <a href="{{ site.url }}/images/2016/20160824_PowerShellPester_-_Make_sure_your_parameters_are_separated_by_an_empty_line/pester_logo__1746910156__-400x400.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="120" src="{{ site.url }}/images/2016/20160824_PowerShellPester_-_Make_sure_your_parameters_are_separated_by_an_empty_line/pester_logo__454921558__-200x200.png" width="120" /></a>

Today, I continue with another post on Pester. I want to check that each of my parameters declared in my ```PARAM()``` block is separated by a empty line.

This will help bring clarity to my code and make it easier to read for other people.

## Example
Here is an example,<b>I don't want this</b>:
<center>
<img border="0" height="153" src="{{ site.url }}/images/2016/20160824_PowerShellPester_-_Make_sure_your_parameters_are_separated_by_an_empty_line/PowerShellPester_EmptyLine_between_parameter01__1521695242__-549x212.png"/></center>

Instead,<b>I want all the comment based help in that format</b> (with an empty line between each parameters)
<center>
<img border="0" height="165" src="{{ site.url }}/images/2016/20160824_PowerShellPester_-_Make_sure_your_parameters_are_separated_by_an_empty_line/PowerShellPester_EmptyLine_between_parameter02__2044538152__-547x227.png"/></center>

## Code

This can be accomplish by something like that:

```powershell
[CmdletBinding()]
PARAM (
    $ModuleName = "ADSIPS",
    $GithubRepository = "github.com/lazywinadmin/"
)

# Make sure one or multiple versions of the module are note loaded
Get-Module -Name $ModuleName | remove-module

# Find the Manifest file
$ManifestFile = "$(Split-path (Split-Path -Parent -Path $MyInvocation.MyCommand.Definition))\$ModuleName\$ModuleName.psd1"

# Import the module and store the information about the module
$ModuleInformation = Import-module -Name $ManifestFile -PassThru

# Get the functions present in the Manifest
$ExportedFunctions = $ModuleInformation.ExportedFunctions.Values.name

# Testing the Module
Describe "$ModuleName Module - HELP" -Tags "Module" {
    FOREACH ($funct in $ExportedFunctions)
    {
        $FunctionContent = Get-Content function:$funct
        $AST = [System.Management.Automation.Language.Parser]::ParseInput($FunctionContent, [ref]$null, [ref]$null)

        Context "$funct - Help"{

            # Parameters separated by a space
            $ParamText = $AST.ParamBlock.extent.text -split '\r\n' # split on carriage return
            $ParamText = $ParamText.trim() # Trim the edges
            $ParamTextSeparator = $ParamText | select-string ',$' #line that finish by a ','

            if ($ParamTextSeparator)
            {
                Foreach ($ParamLine in $ParamTextSeparator.linenumber)
                {
                    it "Parameter - Separated by space (Line $ParamLine)"{
                        $ParamText[$ParamLine] -match '^$|\s+' | Should Be $true
                    }
                }
            }
        } #Context
    } #FOREACH
} #Describe
```

## Step by Step

So what is happening here ?

* #1 - Using Abstract Syntax Tree (AST), we retrieve the content of the `PARAM()` block and split on the carriage return character

```powershell
$ParamText = $AST.ParamBlock.extent.text -split '\r\n'
```

* #2 - We trim the edges of each lines

```powershell
$ParamText = $ParamText.trim()
```

* #3 - We find the line that finish by a comma character `,`.

Here we are using Regex and the Dollar sign `$` that will matches the ending of a line.

```powershell
$ParamTextSeparator = $ParamText | select-string ',$'
```

* #4 - Then for each lines that finish by a comma character, we will check if the next line is empty or contains only white spaces, which is fine too. Again we will be using regex here, `^$` matches an empty line and `\s+` matches one ore more whitespaces. This should return either `$true` or `$false` and we can use Pester from here to return the success of failure of the test.

```powershell
$ParamText[$ParamLine] -match '^$|\s+' | Should Be $true
```

<img border="0" height="157" src="{{ site.url }}/images/2016/20160824_PowerShellPester_-_Make_sure_your_parameters_are_separated_by_an_empty_line/PowerShellPester_EmptyLine_between_parameter03__1644746112__-834x329.png"/>

## Related posts

* <a href="{{ site.url }}/2016/05/using-pester-to-test-your-comment-based.html" target="_blank">Using Pester to test your Comment Based Help</a>
* <a href="{{ site.url }}/2016/05/using-pester-to-test-your-manifest-file.html" target="_blank">Using Pester to test your Manifest File</a>
* <a href="{{ site.url }}/2016/08/powershellpester-make-sure-your-comment.html" target="_blank">Make sure your Comment Based Help is not indented</a>
* <a href="{{ site.url }}/2016/08/powershellpester-make-sure-your.html" target="_blank">Make sure your parameters are separated by an empty line</a>