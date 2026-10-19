---
layout: single
title: PowerShell Studio 2014 from Sapien released!
excerpt: 
permalink: /2014/03/powershell-studio-2014-from-sapien.html
tags:
- winforms
- productivity
- powershell
- powershell studio
published: true
comments: true
---


<a href="{{ site.url }}/images/2014/20140318_PowerShell_Studio_2014_from_Sapien_released!/powershellstudio__1679627693__-88x88.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img alt="powershellstudio" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/20140318_PowerShell_Studio_2014_from_Sapien_released!/powershellstudio__1679627693__-88x88.png" /></a>SAPIEN released a new version of their awesome tool PowerShell Studio a few days ago:<a href="http://www.sapien.com/software/powershell_studio" target="_blank">SAPIEN PowerShell Studio 2014</a>.

PowerShell Studio is a Toolmaking Environment, a PowerShell Integrated Scripting Environment (ISE) tool that let you edit and debug scripts, create package, installer, executable and deployments. Also, the Enhanced Form Designer makes GUI design fast and easy, eliminating the need to manually write hundreds of lines of code.

This is for me one of the best tool on the market when you need to create PowerShell Scripts/advanced functions and Graphical User Interface.

The tool is listed at 389$ USD which comes with a one year subscription. Once this subscription expire you'll have to renew it in order to continue receiving new updates/features, otherwise you can continue using the tool without updates. Check out the following blog article for more details:<a href="http://www.sapien.com/blog/2014/02/27/starting-with-the-2014-versions-all-sapien-software-sold-with-subscription/" target="_blank">Starting with the 2014 versions all SAPIEN software sold with subscription</a>

In the following post I will talk about the changes I noticed in the PowerShell Studio 2014 compared to PowerShell Studio 2012. I listed the "What's new" items based on what I discovered so far, Some information might be inaccurate since I don't have any documentation yet.

I did not get a chance to play with package, installer and deployment options, so this will be covered in another blogpost.

<a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-15_10-16-06_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 2 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-15_10-16-06_PM.png" /></a>


## What's New ? 

Below I listed the new options/tools/features that I noticed.

<b><u>RIBBON UI</u></b>
<u>Home tab</u>New Abilities to Create a <u>Package</u>, an<u> Installer</u>, a <u>Deployment</u> or an <u>Executable file</u> in the Deploy section.
New Tools: <u>Format Script</u> and <u>Build Function</u> (see below for more details)

<a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-15_10-24-15_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 3 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-15_10-24-15_PM.png" height="75" width="640" /></a>
<u>Designer tab</u>
New Abilities to <u>Preview the GUI</u>, Create/Apply <u>Property Set</u>, Create <u>Control Set</u>, Create <u>Form Template</u>.
New Ability to change the <u>theme</u> (preview below)
<a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-15_10-25-30_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 4 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-15_10-25-30_PM.png" height="78" width="640" /></a>
<u>Deploy tab</u>
Same New Ability that you find in Home/Deploy dropdown menus.
<a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-15_10-27-30_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 5 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-15_10-27-30_PM.png" height="78" width="640" /></a>
<u>Tools tab</u>
New Abilities related to <u>Restore Points</u> (seems to be only related to the GUI making) and <u>Source Control </u>(Seems to work only if VersionRecall 2014 is installed)
<a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-15_10-27-02_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 6 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-15_10-27-02_PM.png" height="72" width="640" /></a>


**NEW TOOL: FUNCTION BUILDER**

This tool will help you creating advanced functions without typing all the code and syntax, all you need to do is to launch it from the Ribbon UI or by right clicking in your script, see below.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: left; margin-right: 1em;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_2-23-30_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 7 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_2-23-30_PM.png" /></a></td></tr><tr><td class="tr-caption" style="font-size: 13px; text-align: center;">"Build Function" in the Ribbon UI</td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: left; margin-right: 1em;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-10_9-32-19_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 8 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-10_9-32-19_PM.png" height="200" width="132" /></a></td></tr><tr><td class="tr-caption" style="font-size: 13px; text-align: center;">"Build Function" using right click</td></tr></tbody></table>

<b><u>
</u></b>

<u>Main Window: Function Option</u>

From here you can edit all the options related to the function:

* Name of the function Verb/Noun,
* Parameter
* Name
* Mandatory option
* Type
* Parameter Set Name
* Cmdlet Binding options,
* Parameter Set Names,
* Output Type.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_2-20-23_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 9 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_2-20-23_PM.png" height="388" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Function Builder Tool</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_3-03-43_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 10 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_3-03-43_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Parameter Type Auto-complete</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_3-04-14_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 11 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_3-04-14_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Output Type Auto-complete</td></tr></tbody></table>


**Parameter Options**

You can define each of the Parameter options using the small icon at the end of each parameter lines, this will open the following window.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_2-57-19_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 12 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_2-57-19_PM.png" height="480" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Accessing Parameter Options window</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_3-02-37_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 13 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_3-02-37_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Parameter Options: Parameter Set and Settings</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_3-01-46_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 14 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_3-01-46_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Parameter Options: Validation</td></tr></tbody></table>

Once you are done, the function will be inserted in your script:

```powershell
<#
    .SYNOPSIS
        A brief description of the Get-LazyWinAdmin function.

    .DESCRIPTION
        A detailed description of the Get-LazyWinAdmin function.

    .PARAMETER  Blog
        A description of the Blog parameter.

    .PARAMETER  Post
        A description of the Post parameter.

    .PARAMETER  Twitter
        A description of the Twitter parameter.

    .PARAMETER  Retweet
        A description of the Retweet parameter.

    .PARAMETER  Count
        A description of the Count parameter.

    .PARAMETER  Year
        A description of the Year parameter.

    .PARAMETER  Limit
        A description of the Limit parameter.

    .EXAMPLE
        PS C:\> Get-LazyWinAdmin -Blog $value1 -Post $value2
        'This is the output'
        This example shows how to call the Get-LazyWinAdmin function with named parameters.

    .OUTPUTS
        psobject

    .NOTES
        Additional information about the function or script.

#>
function Get-LazyWinAdmin
{
    [CmdletBinding(DefaultParameterSetName='Blog',
                   ConfirmImpact='None')]
    [OutputType([psobject])]
    param
    (
        [Parameter(Mandatory=$true,
                   ParameterSetName='Blog')]
        [ValidateScript()]
        [system.sByte]
        $Blog,
        [Parameter(ParameterSetName='Blog')]
        $Post,
        [Parameter(Mandatory=$true,
                   ParameterSetName='Twitter')]
        $Twitter,
        [Parameter(ParameterSetName='Twitter')]
        $Retweet,
        [Parameter(ParameterSetName='Twitter')]
        $Count,
        [Parameter(ParameterSetName='Twitter')]
        $Year,
        [Parameter(ParameterSetName='Twitter')]
        $Limit
    )
}
```

**NEW TOOL: FORMAT SCRIPT**

This tool allows you to format your script properly, indents, brackets, etc...
For example, here is a piece of poorly formatted code...

<a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_10-36-51_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 15 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_10-36-51_PM.png" /></a>

By pressing the button "Format Script", we get the following... Neat! :-)
<a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_10-37-02_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 16 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-16_10-37-02_PM.png" /></a>


**NEW TOOL: RESTORE POINT**

PowerShell Studio 2014 can now create Restore Point for you, <u><b>automatic</b></u> and <b><u>manual</u></b>.

* <b>Automatic Restore Point</b> will be created automatically by PowerShell Studio 2014, this restore point will contains the first version of you file (beginning of your session)
* <b>Manual Restore Point</b> will be created when you click on "Create" in the Restore Point Group of the Ribbon UI. Pressing "Create" again will overwrite the previous Manual Restore Point

**Automatic Restore Point**
Automatic Restore point will create a backup of your script file as soon as you start modifying it.

In this example, I create <b>a new PowerShell Script</b> and save it.
We can see PowerShell Studio is creating two files as soon as I save the file.

<u>Note:</u> If you open an <b>existing file</b>, the TempPoint will be created only when you start to modify it.

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-25-51_AM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 17 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-25-51_AM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">New PowerShell Script saved as <b>testfile.ps1</b></td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;">
<a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-26-21_AM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 18 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-26-21_AM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><b>testfile.ps1</b> and the automatic Restore point created by PowerShell Studio 2014: <b>testfile.TempPoint.ps1</b></td></tr></tbody></table>
You can see the file <b>testfile.TempPoint.ps1</b>file contains exactly the same thing as <b>testfile.ps1</b>

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-27-59_AM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 19 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-27-59_AM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><b>testfile.TempPoint.ps1</b></td></tr></tbody></table>

Now, If I make a modification to <b>testfile.ps1</b> and save it...

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-28-52_AM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 20 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-28-52_AM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><b>testfile.ps1</b></td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-29-10_AM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 21 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-29-10_AM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;"><b>testfile.ps1 </b>and<b> testfile.TempPoint.ps1</b>now have <u>a different Time of modification</u></td></tr></tbody></table>
<div class="separator" style="clear: both; text-align: left;">Notice the <b>testfile.TempPoint.ps1</b> still have the initial content.<a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-29-55_AM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 22 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-29-55_AM.png" /></a>

What about Restore ? In the Ribbon UI, you can click on <b>Rewind</b> to cancel all the changes made.
PowerShell Studio 2014 will ask you to confirm and then overwrite you file if you click OK

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-23-00_AM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 23 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-23-00_AM.png" height="166" width="320" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Rewind button in the Ribbon UI/Restore Point Group</td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-35-46_AM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 24 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-35-46_AM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Confirmation dialog after clicking on <b>Rewind</b></td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-36-27_AM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 25 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-36-27_AM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">The file is now restored.</td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-37-17_AM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 26 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-37-17_AM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">"Date Modified" property are now the same for both file.</td></tr></tbody></table>

**Manual Restore Point**
PowerShell Studio 2014 allows you to create <u>one</u> restore point manually.
All you have to do is click on the <b>Create</b> button in the Restore Points group of the Ribbon UI.
By Pressing "Create" again, you will overwrite the previous Manual Restore Point.

Example, Before I create a Manual Restore Point:

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-39-04_AM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 27 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-39-04_AM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Notice the <b>Create</b> button on the top left</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-39-57_AM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 28 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-39-57_AM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">I have one file saved: <b>TestRP.ps1</b> and PowerShell Studio 2014 created an automatic Restore Point for me<b>TestRP.TempPoint.ps1</b> for me</td></tr></tbody></table>

Once you press <b>Create</b>, the grayed out buttons become available.
<u><b>Restore</b>button:</u> Restore to Manual Restore point
<b>Delete</b> button: Delete Manual Restore point
<u><b>Rewind</b> button:</u> Restore the Automatic Restore point

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-41-41_AM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 29 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-41-41_AM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Restore Points Group</td></tr></tbody></table>
<div class="separator" style="clear: both; text-align: left;">PowerShell Studio 2014 created another file for my manual Restore Point: <b>TestRP.RestorePoint.ps1</b><a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-42-11_AM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 30 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-42-11_AM.png" /></a>

Creating another manual Restore Point overwrite the first one.
<a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-43-37_AM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 31 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-43-37_AM.png" /></a>

<a href="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-43-44_AM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 32 from the post &quot;PowerShell Studio 2014 from Sapien released!&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2014/PowerShell_Studio_2014_from_Sapien_released/2014-03-17_12-43-44_AM.png" /></a>