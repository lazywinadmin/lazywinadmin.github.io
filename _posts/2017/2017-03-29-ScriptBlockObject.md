---
layout: single
title: "Create and reuse a powershell scriptblock"
excerpt: "Passing multiple arguments to a scriptblock is sometimes a bit complexe, but not with this approach..."
permalink:
tags: 
- powershell
- scriptblock
- powershelltip
categories:
  - powershell
published: true
comments: true
author_profile: false
header:
  image: images/headers/Code01_1920x500.jpg
  caption: ""
  teaserlogo: images/2017/2017-03-29-ScriptBlockObject/script.png
toc: true
toc_label: "Table of content"
---
Countless time people asked me how they could pass arguments to parameters inside a powershell scriptblock.

## The usual approach

Here are a few examples when using Invoke-Command:

```powershell
# Without argument
Invoke-Command -ScriptBlock {Get-ChildItem}
# With one argument
Invoke-Command -ScriptBlock {Get-ChildItem $args} -ArgumentList 'C:\Windows'
# With multiple arguments - Option A
Invoke-Command -ScriptBlock {Get-ChildItem $args[0] $args[1]} -ArgumentList 'C:\Windows','*.log'
# With multiple arguments - Option B
Invoke-Command -ScriptBlock {PARAM($Path,$Filter) Get-ChildItem $Path $Filter} -ArgumentList 'C:\Windows','*.log'
# You can also be explicit and specify the parameters for more clarity
#  The argumentlist items will be sent in the same order as the parameters declared in
#  the PARAM() block.
Invoke-Command -ScriptBlock {PARAM($Path,$Filter) Get-ChildItem -Path $Path -Filter $Filter} -ArgumentList 'C:\Windows','*.log'
```

If the above scenario, you need to know the order of the parameters accepted by the Cmdlet you use, for example ```Get-Help Get-ChildItem```
You'll see that one of the syntax accepted is:

```powershell
Get-ChildItem [[-Path] <String[]>] [[-Filter] <String>] [-Attributes {ReadOnly | Hidden | System | Directory |
    Archive | Device | Normal | Temporary | SparseFile | ReparsePoint | Compressed | Offline | NotContentIndexed |
    Encrypted | IntegrityStream | NoScrubData}] [-Depth <UInt32>] [-Directory] [-Exclude <String[]>] [-File] [-Force]
    [-Hidden] [-Include <String[]>] [-Name] [-ReadOnly] [-Recurse] [-System] [-UseTransaction] [<CommonParameters>]
```

 First is Path, Second is Filter, Third is Attributes, etc...

## Creating your own ScriptBlock

Another option is to create your own ```ScriptBlock``` object (```[System.Management.Automation.ScriptBlock]```) and add your parameters to it before the execution

```powershell
# Create your own scriptblock without argument
$NewScriptBlock = [scriptblock]::Create("Get-ChildItem")
# Executing the scriptblock
$NewScriptBlock.Invoke()
# It also can be reused, example with Invoke-Command
Invoke-Command -ScriptBlock $NewScriptBlock


# Pass one parameter
$MyPath = 'c:\windows'
$NewScriptBlock = [scriptblock]::Create("Get-Childitem -path $MyPath")
# Execute the scriptblock
$NewScriptBlock.Invoke()

# Pass multiple parameters
$MyPath = 'c:\windows'
$MyFilter = '*.log'
$NewScriptBlock = [scriptblock]::Create("Get-Childitem -path $MyPath -filter $MyFilter")
# Execute the scriptblock
$NewScriptBlock.Invoke()

# Or Using it with invoke-command
Invoke-Command -ScriptBlock $NewScriptBlock
# Works as well against one or multiple machines
Invoke-Command -ScriptBlock $NewScriptBlock -ComputerName MyServer
```

## $Using

Beginning in Windows PowerShell 3.0, you can use the Using scope modifier to identify a local variable in a remote command.

```powershell
$MyPath = 'c:\windows'
$MyFilter = '*.log'

Invoke-Command -ScriptBlock {Get-ChildItem -Path $using:MyPath -Filter $using:MyFilter}
```

## Resources
You'll find more information on this topic on this page: [about_Remote_Variables](https://msdn.microsoft.com/en-us/powershell/reference/5.1/microsoft.powershell.core/about/about_remote_variables?f=255&MSPPError=-2147217396)