---
layout: single
title: PowerShell Studio 2012 - WinForms - Creating a basic GUI (Video)
excerpt: 
permalink: /2013/10/powershell-studio-2012-winforms.html
tags: 
- powershell
- sapien powershell studio 2012
- video
published: true
comments: true
---
<div class="separator" style="clear: both; text-align: left;"><a href="http://2.bp.blogspot.com/-Wa4ZBE00854/UlIbnXr22qI/AAAAAAABd3s/lahXJHF8C3c/s1600/2013-10-06+10-12-49+PM.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-Wa4ZBE00854/UlIbnXr22qI/AAAAAAABd3s/lahXJHF8C3c/s1600/2013-10-06+10-12-49+PM.png" /></a>The following post will demo how to create a basic Graphical User Interface with SAPIEN PowerShell Studio 2012.

<u><b>Update:</b></u>See also the second part of this post:<a href="{{ site.url }}/2013/10/PowerShellStudio2012ToolMaking.html" target="_blank">PowerShell Studio 2012 - WinForms - GUI ToolMaking</a>

Last year I released a PowerShell script called<a href="{{ site.url }}/p/lazywinadmin-04.html" target="_blank">LazyWinAdmin 0.4</a> which is a script that generate a Graphical User Interface. I used SAPIEN PowerShell Studio 2012 to create this Interface and write my PowerShell code.

LazyWinAdmin script allows SysAdmins/IT Pros to Query Information on their Workstation / Servers and to Perform some actions like :

* List Shares (with local path), Processes, Services, ...

* Test the Connection, Permission, PowerShell Remoting, RDP availability ...

* Reboot/Shutdown

* Query and Kill any RDP Session opened

* Etc...

Since then, I got a lot of emails asking me questions about PowerShell and how to make GUIs using PowerShell Studio 2012. So here is a quick demo..




<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20131006_PowerShell_Studio_2012_-_WinForms_-_Creating_a_basic_GUI_(Video)/lwa-v0.4-main01__1020695344__-1202x773.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20131006_PowerShell_Studio_2012_-_WinForms_-_Creating_a_basic_GUI_(Video)/lwa-v0.4-main01__1896092340__-400x257.png" height="255" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">LazyWinAdmin v0.4 Script</td></tr></tbody></table>
### <b>Overview</b>



* Creating a basic GUI -<b>Video</b>

* Creating a basic GUI - <b>Step by Step</b>

* Get PowerShell Studio 2012

* Creating the GUI

* Editing the GUI

* Adding the PowerShell Code

* Download

<b>
</b>
The following post will demo how to create a basic Graphical User Interface with SAPIEN PowerShell Studio 2012.

We will simply add a couple of controls (Buttons and a Richtextbox), and add a few events to write in the Richtextbox when pressing the buttons.

<div style="text-align: center;">
<div style="text-align: center;"><iframe allowfullscreen="" frameborder="0" height="360" src="//www.youtube.com/embed/UeYGapCK78g" width="480"></iframe><div style="text-align: center;">
<div style="text-align: center;"><b>
</b><b>
</b><b>
</b>
### <b>Get PowerShell Studio 2012</b>

I think PowerShell Studio is the most powerful and feature complete PowerShell Integrated Scripting Environment (ISE) available today. Of course you can create and edit normal PowerShell scripts but you can also create single and multiple forms GUI and export them as PS1 or EXE files !
Some of my favorite features are the Function explorer and the Snippets explorer.
<b>
</b>As today this product will cost you $349 USD.
[http://www.sapien.com/software/powershell_studio](http://www.sapien.com/software/powershell_studio)

Sapien also has a free version: <b><a href="http://www.sapien.com/blog/topics/software-news/community-tools/" target="_blank">PrimalForms Community Edition</a></b> (PrimalForms CE), but this tool will only allow you to create the user interface and export it to a PowerShell file. You can not directly write PowerShell code for each actions you wish your script to perform.You will have to do this manually once the file is exported from PrimalForms CE.





### <b>Creating the GUI</b>


Select <b>File</b> / <b>New</b> / <b>New Form</b>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://2.bp.blogspot.com/-viVseKKWUpE/UlGgbmgjgkI/AAAAAAABd2s/BGlAJXO1oHI/s1600/2013-10-06+1-28-17+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://2.bp.blogspot.com/-viVseKKWUpE/UlGgbmgjgkI/AAAAAAABd2s/BGlAJXO1oHI/s1600/2013-10-06+1-28-17+PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">
</td></tr></tbody></table><div class="separator" style="clear: both; text-align: left;">In the <b>Form Template</b> selection, select the <b>Empty Form</b>.<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://2.bp.blogspot.com/-4A-IEo0pbeY/UlGge6Lvw5I/AAAAAAABd20/Npl3Ied5MTs/s1600/2013-10-06+1-29-21+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://2.bp.blogspot.com/-4A-IEo0pbeY/UlGge6Lvw5I/AAAAAAABd20/Npl3Ied5MTs/s1600/2013-10-06+1-29-21+PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">
</td></tr></tbody></table>


### <b>Editing the GUI</b>

<b>
</b>Drag and drop the controls into the main form. Here I added 3 <b>Buttons</b> and 1 <b>RichTextBox</b>
<a href="http://3.bp.blogspot.com/-mXDbwZKdkbs/UgQoFXHn7JI/AAAAAAABbnA/aOQPfSCfyK4/s1600/2013-08-08+7-17-04+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-mXDbwZKdkbs/UgQoFXHn7JI/AAAAAAABbnA/aOQPfSCfyK4/s1600/2013-08-08+7-17-04+PM.png" /></a>

Arrange the Form so it does not look too weird :-)
<a href="http://2.bp.blogspot.com/-MDLqbN0v-Hc/UgQogKSCmkI/AAAAAAABbnQ/8kMI9tmmZA4/s1600/2013-08-08+7-23-11+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-MDLqbN0v-Hc/UgQogKSCmkI/AAAAAAABbnQ/8kMI9tmmZA4/s1600/2013-08-08+7-23-11+PM.png" /></a>
<div class="separator" style="clear: both; text-align: left;">Select one of the button and edit the property TEXT to change the name of it.<div class="separator" style="clear: both; text-align: left;">Repeat this step for each buttons<a href="http://3.bp.blogspot.com/-K2yqGnKuKb0/UgQpX-yweeI/AAAAAAABbng/yhO8sYc2hrU/s1600/2013-08-08+7-24-23+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-K2yqGnKuKb0/UgQpX-yweeI/AAAAAAABbng/yhO8sYc2hrU/s1600/2013-08-08+7-24-23+PM.png" /></a>





### <b>Adding the PowerShell code</b>


Select a button and do one of the following action to add the powershell code :
<b>Double Click on the button</b>
 OR
<b>Double click on the Event</b>
<b>
</b>
<a href="http://3.bp.blogspot.com/-u66tnBYOFXU/UgQrDzCBrhI/AAAAAAABbn0/-8cm8OcKofg/s1600/2013-08-08+7-29-47+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-u66tnBYOFXU/UgQrDzCBrhI/AAAAAAABbn0/-8cm8OcKofg/s1600/2013-08-08+7-29-47+PM.png" /></a>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://1.bp.blogspot.com/-IRXMJLpAdCs/UgQrD7ojlGI/AAAAAAABbnw/LqPSQ2aVjCo/s1600/2013-08-08+7-34-10+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://1.bp.blogspot.com/-IRXMJLpAdCs/UgQrD7ojlGI/AAAAAAABbnw/LqPSQ2aVjCo/s1600/2013-08-08+7-34-10+PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">For Example, here I added the code highlighted for the "Add Red Text" Button.</td></tr></tbody></table>

<u>PowerShell code for each buttons. I only used the event "Click".</u>





```
$buttonClear_Click={
    # Clear the RichTextBox Control
    $richtextbox1.Clear()
}

$buttonAddRedText_Click={
    # Change the RichTextBox Color before adding the new text
    $richtextbox1.SelectionColor = 'Red'
    
    # Adding some text with a return (to go to the next line)
    $richtextbox1.AppendText("Red Text`r")
}

$buttonAddBlueText_Click={
    # Change the RichTextBox Color before adding the new text
    $richtextbox1.SelectionColor = 'blue'
    
    # Adding some text with a return (to go to the next line)
    $richtextbox1.AppendText("Blue Text`r")
}
```






<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://2.bp.blogspot.com/-UnYK_kzbpas/UgQmud321OI/AAAAAAABbms/_f51ts5gQKk/s1600/2013-08-08+7-06-17+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://2.bp.blogspot.com/-UnYK_kzbpas/UgQmud321OI/AAAAAAABbms/_f51ts5gQKk/s1600/2013-08-08+7-06-17+PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Final GUI ! :-)</td></tr></tbody></table>


### <b>DOWNLOAD</b>

<b><a href="http://gallery.technet.microsoft.com/PowerShell-Studio-2012-ee07484d" target="_blank">Technet Script Repository</a></b>
<b>
</b>


