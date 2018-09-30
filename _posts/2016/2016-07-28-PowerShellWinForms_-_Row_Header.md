---
layout: single
title: PowerShell/WinForms - Row Header
excerpt: 
permalink: /2016/07/powershellwinforms-row-header.html
tags: 
- datagridview
- powershell
- winformps
- winforms
published: true
comments: true
toc: true
toc_label: "Table of content"
---
<a href="{{ site.url }}/images/2016/20160728_PowerShellWinForms_-_Row_Header/DataGridView_RawHeader2__851313811__-301x308.jpg" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="200" src="{{ site.url }}/images/2016/20160728_PowerShellWinForms_-_Row_Header/DataGridView_RawHeader2__334636553__-195x200.jpg" width="195" /></a>If you are creating Windows Forms (WinForms) using PowerShell with tools such as PowerShell Studio from Sapien, you might have some scenario where you want to use Row Header instead of Column Header in a ```DataGridView``` control.

Those can be controlled using the properties ```RowHeaderVisible``` and ```ColumnHeaderVisible```.


Assuming you already have a form with a Datagridview in it, you will need to do the following:

* Create a Column
* Create a Row with the Header value (and optionally a value for the first column)
* Add the Row to the ```DataGridView```
* Set ```RowHeaderVisible``` to ```$true```
* Set ```ColumnHeaderVisiable``` to ```$false``` (Optional)

<b><i>(The example <a href="https://github.com/lazywinadmin/PowerShellGUI/tree/master/_Examples/DataGridView/DataGridView_RowHeader" target="_blank">can be download on my github</a>)</i></b>

### Creating a Column

```powershell
# Create Column object
$NewColumn = New-Object -TypeName System.Windows.Forms.DataGridViewTextBoxColumn
$NewColumn.Name = "Column1"
$NewColumn.HeaderText = "Column1"

# Add the Column to the Datagridview
$DataGridView.Columns.Add($NewColumn)
```

### Creating a Row with Header value

```powershell
# Create a Row
$Row = New-Object -TypeName System.Windows.Forms.DataGridViewRow

# Set a Row Header value
$Row.HeaderCell.Value = "Header1"

# Set the Header and a row value (for the first column)
$Row.CreateCells($DataGridView, "Value1")

```

### Add Row to Datagridview
```powershell
# Add the row to the DataGridView control
$DataGridView.Rows.Add($Row)
```

### Hide the Column Header and Show the Row Header

```powershell
# Make the Row Header Visible
$DataGridView.RowHeadersVisible = $true

# Make the Column Header Invisible
$DataGridView.ColumnHeadersVisible = $false
```

## Easy way: Using the PowerShell module WinFormPS

I started a Window Forms module a while ago called <b><u>WinFormPS</u></b>. This module allows you to interact with WinForms control using PowerShell.
The module is available on GitHub here: [https://github.com/lazywinadmin/WinFormPS](https://github.com/lazywinadmin/WinFormPS)

For our case here, you can either use the entire module or just copy the functions you need in your module.

<b><u>Performing the same steps is way easier:</u></b>

```powershell
# Add Column
Add-WFDataGridViewColumn -DataGridView $datagridview1 -ColumnName "First Column"

# Add Row and Row Header
Add-WFDataGridViewRow -DataGridView $datagridview1 -Title "Header1" -Values "Value1"

# Set the Row Header to Visible
Set-WFDataGridView -DataGridView $datagridview1 -ShowRowHeader

# Set the Column Header to Invisible
Set-WFDataGridView -DataGridView $datagridview1 -HideColumnHeader
```


<a href="{{ site.url }}/images/2016/20160728_PowerShellWinForms_-_Row_Header/DataGridView_RawHeader2__109809389__-301x308.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2016/20160728_PowerShellWinForms_-_Row_Header/DataGridView_RawHeader2__109809389__-301x308.jpg" /></a>

<b><u><a href="https://github.com/lazywinadmin/PowerShellGUI/tree/master/_Examples/DataGridView/DataGridView_RowHeader" target="_blank">Download this example</a></u></b>
