---
layout: single
title: PowerShell Studio 2012 - WinForms - GUI ToolMaking
excerpt: 
permalink: /2013/10/PowerShellStudio2012ToolMaking.html
tags: 
- gui
- powershell
- sapien powershell studio 2012
- tool
- toolmaking
- video
- winform
published: true
comments: true
---
<a href="http://2.bp.blogspot.com/-W3J8czlT9N4/UlhdeW-8f7I/AAAAAAABd6w/p6wBbRNnNyg/s1600/2013-10-11+4-19-47+PM.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="180" src="http://2.bp.blogspot.com/-W3J8czlT9N4/UlhdeW-8f7I/AAAAAAABd6w/p6wBbRNnNyg/s200/2013-10-11+4-19-47+PM.png" width="200" /></a>In my previous post I showed <a href="{{ site.url }}/2013/10/powershell-studio-2012-winforms.html" target="_blank">how to create a quick PowerShell GUI</a> to append some colored text in a RichTextBox control using <a href="http://www.sapien.com/software/powershell_studio" target="_blank">Sapien PowerShell Studio 2012</a>.

Today I will go a bit further and show you how to create a tool to query some information from a remote computer. I will first send the Output to Out-GridView cmdlet and then show you how to send it to a DataGridView control inside the GUI.

The tool will query <b>Services</b>, <b>Processes</b> and <b>Shares</b> from a Remote Computer.
You will need to specify the <b>ComputerName</b> and the <b>Credential</b> required to perform those actions. The goal is to show how to create something very simple so I did not write any Error Handling or any conditional code in this version.

One cool thing to mention when using PowerShell Studio 2012 is, if you add some controls like a DataGridView, a Listview or a ListBox, PowerShell Studio 2012 will add some functions to help you Load/Add/Refresh those controls. I will show you below in the part "<i>Replacing the Out-Gridview by a DataGridView Control</i>"






### Overview



* ToolMaking - Video

* ToolMaking - Step By Step

* Creating and Editing the GUI

* Adding your PowerShell Code

* Test the GUI, using Out-Gridview cmdlet for the output

* Replacing the Out-Gridview by a DataGridView Control

* Modifying your PowerShell code for DataGridView

* Test the GUI using the DataGridView for the output

* Download (PS1 and PFF)



### ToolMaking - Video


<iframe allowfullscreen="" frameborder="0" height="360" src="//www.youtube.com/embed/HmcWucxQeQE" width="480"></iframe>



### Creating and Editing the GUI

Insert your controls. Here I used 3 buttons and one TextBox
<a href="http://3.bp.blogspot.com/-3elYd_EYdfs/UlhsoHZQs9I/AAAAAAABd7A/bbxMpkrtQUw/s1600/2013-10-11+1-42-52+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-3elYd_EYdfs/UlhsoHZQs9I/AAAAAAABd7A/bbxMpkrtQUw/s1600/2013-10-11+1-42-52+PM.png" /></a>
Rename your button text properties and rename the textbox control (Design Name property) so it will be easier to find it when writing the PowerShell code.
<a href="http://3.bp.blogspot.com/-jDhF0PqFhkE/Ulg6dkrmgqI/AAAAAAABd6A/LCwwb1xmBzA/s1600/2013-10-11+1-46-10+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-jDhF0PqFhkE/Ulg6dkrmgqI/AAAAAAABd6A/LCwwb1xmBzA/s1600/2013-10-11+1-46-10+PM.png" /></a>

<a href="http://3.bp.blogspot.com/-CFn_HSpvv1s/Ulg6dqydCLI/AAAAAAABd58/R_GCIc7UJH8/s1600/2013-10-11+1-46-26+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-CFn_HSpvv1s/Ulg6dqydCLI/AAAAAAABd58/R_GCIc7UJH8/s1600/2013-10-11+1-46-26+PM.png" /></a>

### Adding your PowerShell Code

Here is the code I used for each of my events.
I basically do some basic <span style="font-family: Courier New, Courier, monospace;"><b>Get-WmiObject</b> queries on different classes related to the Services/Processes and Shared. Note the Output is sent to the pipeline to <b><span style="font-family: Courier New, Courier, monospace;">Out-GridView.</b>


```
$buttonCredential_Click={
    # Ask for Credential
    $global:cred = Get-Credential -Credential 'FX\Administrator'
}

$buttonServices_Click={
    # Query the Services on the computername specified in the textbox
    Get-WmiObject Win32_Service -ComputerName $textboxComputerName.Text -Credential $cred | Select-Object __Server,Name | Out-GridView
}

$buttonProcesses_Click={
    # Query the Processes on the computername specified in the textbox
    Get-WmiObject Win32_Process -ComputerName $textboxComputerName.Text -Credential $cred | Select-Object __Server,Name | Out-GridView
}

$buttonShares_Click={
    # Query the Shares on the computername specified in the textbox
    Get-WmiObject Win32_Share -ComputerName $textboxComputerName.Text -Credential $cred | Select-Object __Server,Name | Out-GridView
}
```



### Test the GUI, using Out-Gridview cmdlet for the output


Here is the result when you click on one of the 3 buttons. Each of them invoke the events:
* 
```
$buttonServices_Click
```


* 
```
$buttonProcesses_Click
```


* 
```
$buttonShares_Click
```

<a href="http://3.bp.blogspot.com/-22xTb14ZXn0/UlhbBu5Sq7I/AAAAAAABd6U/xiG8HSyInlA/s1600/2013-10-11+4-08-59+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-22xTb14ZXn0/UlhbBu5Sq7I/AAAAAAABd6U/xiG8HSyInlA/s1600/2013-10-11+4-08-59+PM.png" /></a>

You can define all sort of Events for each control, take a look below

<a href="http://4.bp.blogspot.com/-oD_ne0RQCEk/UlhvDs7IdGI/AAAAAAABd7U/maH2R1xOXaA/s1600/2013-10-11+5-33-20+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-oD_ne0RQCEk/UlhvDs7IdGI/AAAAAAABd7U/maH2R1xOXaA/s1600/2013-10-11+5-33-20+PM.png" /></a>

### Replacing the Out-Gridview by a DataGridView Control


Expend your Form and add a DataGridView control.

### <div style="font-size: medium; font-weight: normal;">
<div class="separator" style="clear: both; font-size: medium; font-weight: normal; text-align: center;"><a href="http://3.bp.blogspot.com/-cM87L1VTDfI/UlhcQEIg_1I/AAAAAAABd6g/5S0kSrNlTu0/s1600/2013-10-11+4-14-08+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-cM87L1VTDfI/UlhcQEIg_1I/AAAAAAABd6g/5S0kSrNlTu0/s1600/2013-10-11+4-14-08+PM.png" /></a>


When you add the DataGridView to your form, you will notice that PowerShell Studio 2012 automatically add one ore more functions that can interact with this kind of control, you can write your own of course but this make things simpler for people who don't know which properties to modify or methods to invoke.



```
#region Control Helper Functions
function Load-DataGridView
{
    <#
    .SYNOPSIS
        This functions helps you load items into a DataGridView.

    .DESCRIPTION
        Use this function to dynamically load items into the DataGridView control.

    .PARAMETER  DataGridView
        The ComboBox control you want to add items to.

    .PARAMETER  Item
        The object or objects you wish to load into the ComboBox's items collection.
    
    .PARAMETER  DataMember
        Sets the name of the list or table in the data source for which the DataGridView is displaying data.

    #>
    Param (
        [ValidateNotNull()]
        [Parameter(Mandatory=$true)]
        [System.Windows.Forms.DataGridView]$DataGridView,
        [ValidateNotNull()]
        [Parameter(Mandatory=$true)]
        $Item,
        [Parameter(Mandatory=$false)]
        [string]$DataMember
    )
    $DataGridView.SuspendLayout()
    $DataGridView.DataMember = $DataMember
    
    if ($Item -is [System.ComponentModel.IListSource]`
    -or $Item -is [System.ComponentModel.IBindingList] -or $Item -is [System.ComponentModel.IBindingListView] )
    {
        $DataGridView.DataSource = $Item
    }
    else
    {
        $array = New-Object System.Collections.ArrayList
        
        if ($Item -is [System.Collections.IList])
        {
            $array.AddRange($Item)
        }
        else
        {    
            $array.Add($Item)    
        }
        $DataGridView.DataSource = $array
    }
    
    $DataGridView.ResumeLayout()
}
#endregion

```


### <div style="font-size: medium; font-weight: normal;">



### Modifying your PowerShell Code for DataGridView


Now all you have to do is removing the Out-GridView and send the output to thefunction Load-DataGridView. This function will do the job for you and load everything.



```
$buttonCredential_Click={
    # Ask for Credential
    $global:cred = Get-Credential -Credential 'FX\Administrator'
}

$buttonServices_Click={
    # Query the Services on the computername specified in the textbox
    $Services = Get-WmiObject Win32_Service -ComputerName $textboxComputerName.Text -Credential $cred | Select-Object __Server,Name
    Load-DataGridView -DataGridView $datagridview1 -Item $Services
}

$buttonProcesses_Click={
    # Query the Processes on the computername specified in the textbox
    $Processes = Get-WmiObject Win32_Process -ComputerName $textboxComputerName.Text -Credential $cred | Select-Object __Server,Name
    Load-DataGridView -DataGridView $datagridview1 -Item $Processes
}

$buttonShares_Click={
    # Query the Shares on the computername specified in the textbox
    $Shares = Get-WmiObject Win32_Share -ComputerName $textboxComputerName.Text -Credential $cred | Select-Object __Server,Name
    Load-DataGridView -DataGridView $datagridview1 -Item $shares
}
```



### Test the GUI using the DataGridView for the output



<a href="http://2.bp.blogspot.com/-W3J8czlT9N4/UlhdeW-8f7I/AAAAAAABd6w/p6wBbRNnNyg/s1600/2013-10-11+4-19-47+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-W3J8czlT9N4/UlhdeW-8f7I/AAAAAAABd6w/p6wBbRNnNyg/s1600/2013-10-11+4-19-47+PM.png" /></a>


### Download (PS1 and PFF)

<a href="http://gallery.technet.microsoft.com/PowerShell-Studio-2012-40694250" target="_blank">Download from TechNet Script Repository</a>



