---
layout: single
title: Powershell - Get-ClipBoard Set-Clipboard
description: "PowerShell code to read the current content of the Windows clipboard and set a new value, written for a GUI tool that needed both operations."
excerpt: 
permalink: /2010/06/powershell-get-clipboard-set-clipboard.html
tags:
- powershell
- productivity
categories:
- powershell
published: true
comments: true
classes: wide
---

I recently built GUI tool that needed to gather the content of the clipboard and set a new value.
Here is the code I ended up using :)

```powershell
function Get-ClipBoard {
<#
.SYNOPSIS
    Retrieve the content of the clipboard
#>
    [CmdletBinding()]
    PARAM()
    try{
        Add-Type -AssemblyName System.Windows.Forms
        $TextBox = New-Object -TypeName System.Windows.Forms.TextBox
        $TextBox.Multiline = $true
        $TextBox.Paste()
        $TextBox.Text
    }catch{
        $pscmdlet.throwterminatingerror($psitem)
    }
}


function Set-ClipBoard {
<#
.SYNOPSIS
    Set the content of the clipboard
.PARAMETER Text
    String to set in Clipboard
#>
    [CmdletBinding()]
    PARAM($Text)
    try{
        Add-Type -AssemblyName System.Windows.Forms
        $TextBox = New-Object -TypeName System.Windows.Forms.TextBox
        $TextBox.Multiline = $true
        $TextBox.Text = $text
        $TextBox.SelectAll()
        $TextBox.Copy()
    }catch{
        $pscmdlet.throwterminatingerror($psitem)
    }
}
```