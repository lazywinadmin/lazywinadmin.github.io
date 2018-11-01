---
layout: single
title: PowerShell Studio 2014 - DataGridView Sorting
excerpt: 
permalink: /2015/01/powershell-studio-2014-datagridview.html
tags: 
- datagridview
- powershell
- sapien powershell studio 2014
- winform
published: true
comments: true
---

 
 <a href="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/powershellstudio__1010113239__-88x88.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/powershellstudio__1010113239__-88x88.png" /></a>When creating graphical tools with PowerShell Studio 2014 and using the <a href="http://msdn.microsoft.com/en-us/library/e0ywh3cz%28v=vs.90%29.aspx" target="_blank">DataGridView control</a>, I often find myself looking for the following tip!

The DataGridView control provides a customizable table for displaying data. You can extend the DataGridView control in a number of ways to build custom behaviors into your applications. A DataView provides a means to filter and sort data within a DataTable. The following example shows how to sort a DataGridView by using a DataTable Object.

In this example, I'm using PowerShell Studio 2014 from SAPIEN, you can download a 45 days trial version <a href="http://www.sapien.com/software/powershell_studio" target="_blank">here</a>.





# How to sort DataGridView ?

Using PowerShell Studio 2014, let's create a simple GUI and add a DataGridView control

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/2014-12-02_21-19-54__1710328047__-346x274.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/2014-12-02_21-19-54__1710328047__-346x274.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Add a DataGridView</td></tr></tbody></table>
For test purpose, I will add some PowerShell code to load the list of processes currently running and the machine and send it to the DataGridView control:


```
$form1_Load = {
    $Processes = Get-Process | Select-Object -Property Name, id, ws
    Load-DataGridView -DataGridView $datagridview1 -Item $Processes
}
```


If you try to launch the tool, you'll see the following. At this point we can't sort anything yet.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/2014-12-02_21-24-47__138122398__-394x480.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/2014-12-02_21-24-47__138122398__-394x480.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Basic GUI</td></tr></tbody></table>

# Converting to a Database object

One of the requirement to allow the sorting feature is to convert the PowerShell Object to a [System.Data.Datatable] object.


<b><u>Function ConvertTo-DataTable</u></b>
Thanks the guys at SAPIEN, they created a small function to do this: ConvertTo-DataTable

To load this function, open the snippets using the CTRL+K shortcut and select "Convert To Database"
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/2014-12-02_23-17-37__100399466__-298x203.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/2014-12-02_23-17-37__100399466__-298x203.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><b>Snippets</b></td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/2014-12-02_23-28-52__1889225507__-635x490.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/2014-12-02_23-28-52__1889225507__-635x490.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><b>ConvertTo-Datatable</b> preview</td></tr></tbody></table>You can find the <b>ConvertTo-Datatable</b> <a href="https://gist.github.com/1e094b3f0f229e9b011d.git" target="_blank">here</a>.

<b><u>Convert PSObject to DataTable</u></b>
Now we need to convert the output of <b>Get-Process</b> to a <b>DataTable</b> object:


```
$form1_Load = {
    $Processes = Get-Process | Select-Object -Property Name, id, ws
    $ProcessesDT = ConvertTo-DataTable -InputObject $Processes
    Load-DataGridView -DataGridView $datagridview1 -Item $ProcessesDT
}
```



# Add an event ColumnHeaderMouseClick


<b><u>
</u></b>Next, we need to add an event when the user click on one of the Column Header
In the designer view, select your DataGridView and double click on the event called: <b><u>ColumnHeaderMouseClick</u></b>

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/2014-12-02_21-29-23__1826617879__-396x84.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/2014-12-02_21-29-23__1826617879__-396x84.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">ColumnHeaderMouseClick event (DataGridView Control)</td></tr></tbody></table>

Finally add this piece of code, to enable the feature:


```
$datagridview1_ColumnHeaderMouseClick=[System.Windows.Forms.DataGridViewCellMouseEventHandler]{
#Event Argument: $_ = [System.Windows.Forms.DataGridViewCellMouseEventArgs]
    if ($datagridview1.DataSource -is [System.Data.DataTable])
    {
        $column = $datagridview1.Columns[$_.ColumnIndex]
        $direction = [System.ComponentModel.ListSortDirection]::Ascending
        
        if ($column.HeaderCell.SortGlyphDirection -eq 'Descending')
        {
            $direction = [System.ComponentModel.ListSortDirection]::Descending
        }
        
        $datagridview1.Sort($datagridview1.Columns[$_.ColumnIndex], $direction)
    }
}
```




# Sorting in action

Now let's run the tool again and click on "Name" a couple of times for example, It will sort on this property.

<a href="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/Datagridview_Sorting_GIF__83437090__-373x301.gif" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150110_PowerShell_Studio_2014_-_DataGridView_Sorting/Datagridview_Sorting_GIF__83437090__-373x301.gif" /></a>



# Code Example

Finally, the code is available on <b><a href="https://github.com/lazywinadmin/PowerShellGUI/tree/master/_Examples/DataGridView/DataGridView_ColumnHeader_Sorting" target="_blank">GitHub</a></b> or <b><a href="https://gallery.technet.microsoft.com/Winforms-DataGridView-28f9b521" target="_blank">Technet Gallery</a></b>



