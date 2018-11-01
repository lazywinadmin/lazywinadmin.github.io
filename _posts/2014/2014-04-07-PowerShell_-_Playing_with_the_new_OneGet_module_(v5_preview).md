---
layout: single
title: PowerShell - Playing with the new OneGet module (v5 preview)
excerpt: 
permalink: /2014/04/powershell-playing-with-new-oneget.html
tags: 
- module
- oneget module
- powershell
- powershell 5.0
- wmf 5
published: true
comments: true
---

 
 <a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_19-13-26__844052398__-343x281.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_19-13-26__844052398__-343x281.png" height="163" width="200" /></a>One very cool thing in the last <a href="http://blogs.technet.com/b/windowsserver/archive/2014/04/03/windows-management-framework-v5-preview.aspx" target="_blank">Windows Management Framework V5 Preview release</a> is the new module <b>OneGet</b> which allow us to manage a list of software repositories, search/acquire/install/uninstall package(s).

This has been present in the Linux world for a very long time, for example with APT-GET (Debian). This new feature is basically a global silent installer for applications and tools. We should also be able to do configuration tasks and anything that you can do with PowerShell. The power you hold with a module like OneGet is only limited by your imagination! :-)

Note that this is a <u>preview</u>, there is no documentation yet, the features and behavior are likely to change before the final release.


# OneGet Module ?

OneGet is a new way to discover and install software packages from around the web. With OneGet, you can:
<ul>
* Manage a list of software repositories in which packages can be searched, acquired, and installed

* Search and filter your repositories to find the packages you need

* Seamlessly install and uninstall packages from one or more repositories with a single PowerShell command
</ul>


# Cmdlets

Here is a list of the Cmdlets coming with this new module
```
Get-Command -Module OneGet
```


```
CommandType     Name                                               Source
-----------     ----                                               ------
Cmdlet          Add-PackageSource                                  OneGet
Cmdlet          Find-Package                                       OneGet
Cmdlet          Get-Package                                        OneGet
Cmdlet          Get-PackageSource                                  OneGet
Cmdlet          Install-Package                                    OneGet
Cmdlet          Remove-PackageSource                               OneGet
Cmdlet          Uninstall-Package                                  OneGet

```


For now, there is not much information in the help but the naming convention is explicit and we can easily understand the role of each of those:

<center><style type="text/css">.tg  {border-collapse:collapse;border-spacing:0;border-color:#ccc;border-width:1px;border-style:solid;} .tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#fff;} .tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#f0f0f0;} .tg .tg-25j7{font-size:16px;font-family:"Lucida Console", Monaco, monospace !important;;color:#000000} .tg .tg-t103{font-weight:bold;font-size:18px} </style><table class="tg">  <tbody><tr>    <th class="tg-t103">Cmdlet</th>    <th class="tg-t103">Definition</th>  </tr><tr>    <td class="tg-25j7">Add-PackageSource</td>    <td class="tg-031e">Add a new Software Repository</td>  </tr><tr>    <td class="tg-25j7">Find-Package</td>    <td class="tg-031e">Search a package from one or more repositories</td>  </tr><tr>    <td class="tg-25j7">Get-Package</td>    <td class="tg-031e">Get the package installed locally</td>  </tr><tr>    <td class="tg-25j7">Get-PackageSource</td>    <td class="tg-031e">Get the Software Repositories</td>  </tr><tr>    <td class="tg-25j7">Install-Package</td>    <td class="tg-031e">Install a Package</td>  </tr><tr>    <td class="tg-25j7">Remove-PackageSource</td>    <td class="tg-031e">Remove a Package Source</td>  </tr><tr>    <td class="tg-25j7">Uninstall-Package</td>    <td class="tg-031e">Uninstall a Package</td>  </tr></tbody></table></center>

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/Help_Find-Package__917214564__-692x666.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/Help_Find-Package__917214564__-692x666.png" height="382" width="400" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">No help or examples for now (Find-Package Cmdlet)</td></tr></tbody></table>

<b><u>Additional Cmdlet Get-PackageProvider ?</u></b>

Note that we can also expect a new cmdlet called <b><span style="font-family: Courier New, Courier, monospace;">Get-PackageProvider</b>in the final version from what we see in the manifest.

<a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_21-52-10__2031314686__-763x429.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_21-52-10__2031314686__-763x429.png" /></a>




# Workflow

From my understanding this is how the OneGet module interact with the package manager like Chocolatey.

* 
* Load OneGet module in PowerShell. OneGet is the common interface for interacting with any Package Manager (Plugins).

* Then use a Provider for each Package Manager that plugs into OneGet. (Providers do all of the actual work, fetching content from the repositories and doing the actual installation.)

* The package manager will then query its software repository to retrieve the package. In this example Chocolatey use it's own set of Cmdlets (see below in this post)

* The package manager then download a configuration file OR get the URI where it will find the instruction to install the package. In the case of Chocolatey, a configuration file is downloaded from the repository and saved locally in C:\Chocolatey\lib\<APPNAME>\Tools,

* The Provider will then execute the configuration file and download the actual software (+ its dependencies) from a repository, and obviously install it.... silently :-)



<a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/OneGet_Workfow_v8__45444797__-797x833.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/OneGet_Workfow_v8__45444797__-797x833.png" height="640" width="612" /></a>





<b><u>Chocolatey Cmdlets</u></b>
If we look at the files in the module directory, Chocolatey comes with its own set of Cmdlets. (<a href="https://github.com/chocolatey/chocolatey/wiki/HelpersReference" target="_blank">Available on the Chocolatey GitHub repo</a>)
<span style="font-family: Courier New, Courier, monospace;">C:\Windows\System32\WindowsPowerShell\v1.0\Modules\OneGet

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_23-08-19__1267388953__-635x639.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_23-08-19__1267388953__-635x639.png" height="400" width="396" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Chocolatey Provider Cmdlets Helpers (Helpers.psm1)</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_23-09-43__1685468334__-635x754.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_23-09-43__1685468334__-635x754.png" height="400" width="336" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Chocolatey Cmdlets (Chocolatey.psd1)</td></tr></tbody></table>

# Using the module


<b><u>Get the packages already installed</u></b>

Since I've been using chocolatey for a while, Using <b><span style="font-family: Courier New, Courier, monospace;">Get-Package</b>, OneGet is able to retrieve the all the package I installed on this PC.


<a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_18-28-17__741707556__-852x362.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_18-28-17__741707556__-852x362.png" height="271" width="640" /></a>



<b><u>Find and install a new package</u></b>

Now if I want to install a package, that's very easy: <b><span style="font-family: Courier New, Courier, monospace;">Install-Package</b>
We first search for the package



```
# We first query our provider for a package called putty
Find-Package -Name putty | fl *
```

```
# Then we install the package
Find-Package -Name putty | Install-Package -Verbose
```


<a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_23-29-14__124714829__-692x1050.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_23-29-14__124714829__-692x1050.png" height="640" width="419" /></a>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_23-28-41__692951346__-653x189.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_23-28-41__692951346__-653x189.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">PowerShell is download the configuration file the repository and execute it
Then Posh/OneGet is downloading the package (note the package it's not actually located on the chocolatey website)</td></tr></tbody></table>
The file are download and unzipped inC:\Chocolatey\lib directory by default.

<a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-07_0-12-35__684587052__-256x171.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-07_0-12-35__684587052__-256x171.png" /></a><a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-07_0-12-55__1919707307__-278x325.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-07_0-12-55__1919707307__-278x325.png" /></a>
<u>ChocolateyInstall.ps1 content:</u>
```
Install-ChocolateyZipPackage 'putty' 'http://the.earth.li/~sgtatham/putty/latest/x86/putty.zip'  "$(Split-Path -parent $MyInvocation.MyCommand.Definition)"
```


Also note there is some interesting parameters in the Install-Package cmdlet:

<ul>
* <b>InstallationOptions </b>[hashtable]

* <b>InstallArguments</b> [String]
</ul>

<a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-07_0-21-43__1017763092__-692x618.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-07_0-21-43__1017763092__-692x618.png" height="285" width="320" /></a>




<b><u>Find and install one/multiple package(s) using Out-GridView</u></b>

<a class="g-profile" href="https://plus.google.com/109550251938639533774" target="_blank">+Jeffrey Snover</a>also shared a very smart line on twitter on how to use a small "GUI" to Select one or multiple packages you want to install:


```
# Using Out-GridView -PassThru to select the Packages
```
```
Find-Package | Out-Gridview -PassThru | Install-Package -Verbose
```

The other cool thing with Out-GridView is that you can also filter on multiple property

<a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_23-42-39__1801681286__-693x377.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-06_23-42-39__1801681286__-693x377.png" /></a>



<b><u>Uninstalling a package</u></b>


```
# Get the package putty installed locally
Get-Package putty
```

```
# Get and Uninstall putty
Get-Package putty | Uninstall-Package -Verbose
```


<a href="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-07_0-04-49__1943207235__-692x570.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140407_PowerShell_-_Playing_with_the_new_OneGet_module_(v5_preview)/2014-04-07_0-04-49__1943207235__-692x570.png" /></a>


