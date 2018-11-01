---
layout: single
title: Introducing WinFormPS - PowerShell module to interact with WinForms controls
excerpt: 
permalink: /2015/02/introducing-winformps-powershell-module.html
tags: 
- module
- powershell
- winform
- winformps
- winforms
- winforms controls
published: true
comments: true
---


 
<a href="{{ site.url }}/images/2015/20150215_Introducing_WinFormPS_PowerShell_module_to_interact_with_WinForms_controls/Apps-preferences-desktop-theme-icon__1590010150__-128x128.png" imageanchor="1" style="clear: left; display: inline !important; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150215_Introducing_WinFormPS_PowerShell_module_to_interact_with_WinForms_controls/Apps-preferences-desktop-theme-icon__1590010150__-128x128.png" /></a>I started to work on a PowerShell module called <b>WinFormPS</b>.
This module contains a few functions that let you interact with Windows Form controls such as DataGridView, ListBox or Button controls for example.

To build those forms I mostly use PowerShell Studio from Sapien but this can also work with any simple Form created from scratch.

The motivation to create User Interfaces has always been to ease the work of  departments and teams with some of their heavy tasks, or simply to speed up some very repetitive processes. I definitely don't have a developer background, so please bear with me and feel free to critique or push update to the module on GitHub :-)

> <b><u>WinForms</u></b>
Windows Forms (<i>WinForms</i>) is the name given to a graphical (GUI) class library included as a part of Microsoft .NET Framework, providing a platform to write rich client applications for desktop, laptop, and tablet. While it is seen as a replacement for the earlier and more complex C++ based Microsoft Foundation Class Library, it does not offer a comparable paradigm and only act as a platform for the user interface tier in a multi-tier solution. -<a href="http://en.wikipedia.org/wiki/Windows_Forms" target="_blank"><i>Wikipedia</i></a>

## Functions

I hope to bring some more functions and features in the next couple of months with the help of the PowerShell Community (hopefully)

<u><b>Note</b></u> that some of the functions were written by guys at Sapien Inc (identified at the end)

```powershell
# WinFormPS

Add-DataGridViewColumn
Add-DataGridViewRow
Append-Richtextbox
Clear-DataGridViewSelection
Clear-ListBox
Clear-RichTextBox
Disable-Button
Disable-RichTextBox
Disable-TabControl
Enable-Button
Enable-RichTextBox
Enable-TabControl
Find-DataGridViewValue
Get-Form
Get-ListBoxItem
Get-ListViewItem
New-BalloonNotification
New-OpenFileDialog
New-OpenFolderDialog
New-InputBox
New-MessageBox
New-SpeakerBeep
Refresh-DataGridView
Remove-ListBoxItem
Reset-DataGridViewFormat
Set-DataGridView
Set-DataGridViewFilter
Set-Form
Set-RichTextBox

# Function from Sapien
Add-ListViewItem
ConvertTo-DataTable # With some of my customization
Load-DataGridView
Load-ListBox
Sort-ListViewColumn
```

## Download

<a href="https://github.com/lazywinadmin/WinFormPS" target="_blank">https://github.com/lazywinadmin/WinFormPS</a>

I will post <u>some examples</u> in the next few days/weeks.