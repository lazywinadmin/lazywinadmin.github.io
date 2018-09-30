---
layout: single
title: "PowerShell Command Precedence"
excerpt: "If you have a function, a module's function and a Cmdlet with the same exact name, which command will answer first ? This is the role of Command Precedence in PowerShell"
permalink:
tags: 
  - powershell
  - command precedence
categories:
  - powershell
published: true
comments: true
author_profile: false
header:
  teaserlogo:
  teaser: ''
  image: images/headers/Code01_1920x500.jpg
  caption: ''
gallery:
  - image_path: ''
    url: ''
    title: ''
toc: true
toc_label: "Table of content"
toc_icon: "code"
---

Assuming the following scenario:

* I'm declaring a module `MyModule` with one function called `Get-Process` which returns the following text: `Module`
* I'm also declaring a function in my session called `Get-Process` which returns the following text: `Function`
* And we know there is also a built-in Cmdlet called `Get-Process` which returns the list of processes running on my machine

If I call `Get-Process` which result will I see ?

# Code

```powershell
# MODULE
#  declare a very basic module and save to mymodule.psm1 file
@"
    function Get-Process {
        "Module"
    }

    Export-ModuleMember -Function Get-Process
"@ | Out-File mymodule.psm1 -force
#  load the module and its function
Import-Module .\mymodule.psm1


# FUNCTION
#  declare a function in my session
function Get-Process {
    "Function"
}
```

<br>

# Calling Get-Process

Now if I run the following which output will I see ?

```powershell
# Which one will be called ?
Get-Process
```

__Output:__

```
Function

```

Why ? because the function declared in my session take precedence over the module and the cmdlets.

Windows PowerShell uses the following precedence order when it runs commands:

1. Alias
1. Function
1. Cmdlet
1. Native Windows commands

<br>

# Qualified name

Well what if I don't want to change anything to my script, how can i launch the `Get-Process` function from the module `mymodule.psm1` ?

By using the Qualified name `<Module>\<function>`

```powershell
MyModule\Get-Process
```

Same if you want to call the built-in Cmdlet `Get-Process`, you specify the module

```powershell
Microsoft.PowerShell.Management\Get-Process
```

<br>
What about functions ? __You can't use qualified name for functions declared in the session__

## Retrieving the module name

But wait, how did you know the exact module name ?

You can use `Get-Command` to retrieve all the Command with the name `Get-Process` by using the parameter `-All`

```powershell
Get-Command Get-Process -all
```

__Output:__

```
CommandType  Name         Version  Source                         
-----------  ----         -------  ------                         
Function     Get-Process                                        
Cmdlet       Get-Process  3.1.0.0  Microsoft.PowerShell.Management
Function     Get-Process  0.0      mymodule                       
```

Then you can use `-CommandType` to specify the `Cmdlet` type and select the property `ModuleName`. (You'll find also the same information in the properties `Source` and `Module`)

```powershell
(get-command Get-Process -CommandType Cmdlet).ModuleName
```

__Output:__

```
Microsoft.PowerShell.Management
```

<br>

# Module Prefix

One technique to prevent name conflict with module is to use `Import-Module` with the parameter `-Prefix`.

For example:

```powershell
Import-Module .\mymodule.psm1 -Prefix FX
```

This will add `FX` as a prefix of all the functions noun present in the module. In our case we only have one.

```powershell
Get-FXProcess
```

__Output:__

```
Module
```

<br>
# More information

You'll find more information of this topic in the following link(s)
* [about_command_precedence](https://msdn.microsoft.com/en-us/powershell/reference/5.1/microsoft.powershell.core/about/about_command_precedence)