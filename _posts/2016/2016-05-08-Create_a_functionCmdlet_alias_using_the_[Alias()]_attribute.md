---
layout: single
title: "Create a Function/Cmdlet Alias using the [Alias()] attribute"
excerpt: 
permalink: /2016/05/create-functioncmdlet-alias-using-alias.html
tags: 
- powershell
- powershell 4.0
- powershell tip
published: true
comments: true
---

 
Just wanted to share a small PowerShell tips that Kirk Munro found.
You can declare a function or Cmdlet Alias using the following keyword `[Alias("MyAlias")]`

__Example:__

```powershell
function Get-This
{
    [CmdletBinding()]
    [Alias("Get-That")]
    PARAM (
        $Param1
    )
    
    Write-Output "Param1 = $param1"
}

Get-That -Param1 "Hello World"
```

According to Jason Shirk this has been added in PowerShell v4.0:
"<b><i>Support for the alias attribute on a function or cmdlet (works in C# too!) was added in V4.</i></b>
<b><i>It's most valuable in a binary module because it's harder to create aliases via IModuleAssemblyInitializer and when you do via that interface</i></b>"

![Function Alias]( {{ site.url }}/images/2016/20160508_Create_a_functionCmdlet_alias_using_the_Alias_attribute/Alias_Attribute_on_function_Cmdlet__134371622__.png )
