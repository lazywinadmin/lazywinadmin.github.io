---
layout: single
title: Powershell - My Script Template
excerpt: 
permalink: /2012/03/powershell-my-script-template.html
tags: 
- powershell
- template
published: true
comments: true
---
Here is my powershell script template.
Hope that's help someone out there.


<pre class="brush: powershell; ruler: true; first-line: 1;gutter: true;"># #############################################################################
# COMPANY INC - SCRIPT - POWERSHELL
# NAME: script.ps1
# 
# AUTHOR:  Francois-Xavier Cat, Company Inc
# DATE:  2012/03/14
# EMAIL: info@lazywinadmin.com
# 
# COMMENT:  This script will....
#
# VERSION HISTORY
# 1.0 2011.05.25 Initial Version.
# 1.1 2011.06.14 Upgrade with...
#
# TO ADD
# -Add a Function to ...
# -Fix the...
# #############################################################################


#--- CONFIG ---#
#region Configuration
 # Script Path/Directories
  $ScriptPath   = (Split-Path ((Get-Variable MyInvocation).Value).MyCommand.Path)
  $ScriptPluginPath  = $ScriptPath + "\plugin\"
  $ScriptToolsPath  = $ScriptPath + "\tools\"
  $ScriptOutputPath  = $ScriptPath + "\Output\"
 # Date Format
  $DateFormat   = Get-Date -Format "yyyyMMdd_HHmmss"

#end region configuration

#--- MODULE/SNAPIN/DOT SOURCING/REQUIREMENTS ---#
#region Module/Snapin/Dot Sourcing
 # DOT SOURCING Examples
  #. $ScriptPath\FUNCTION1.ps1
  #. $ScriptPath\FUNCTION2.ps1
  #. $ScriptPath\FUNCTION3.ps1
 # SNAPIN or MODULE Examples
  #if (-not(Get-PSSnapin Quest.ActiveRoles.ADManagement -ErrorAction Silentlycontinue)){Add-PSSnapin Quest.ActiveRoles.ADManagement}
  #if (-not(Get-PSSnapin Quest.ActiveRoles.ADManagement -ErrorAction Silentlycontinue)){Add-PSSnapin Quest.ActiveRoles.ADManagement}
  #if (-not(Get-Module -Name BSonPosh -ErrorAction Silentlycontinue)){Import-Module BSonPosh}
 # REQUIREMENTS
  # see the help: "get-help about_requires -full"
  # The Requires statement prevents a script from running unless the Windows
  # PowerShell version, snap-in, and snap-in version prerequisites are met. If
  # the prerequisites are not met, Windows PowerShell does not run the script.
  
#end region Module/Snapin/Dot Sourcing

#--- HELP ---#
#region help

<#
.SYNOPSIS
Cmdlet help is awesome.
.DESCRIPTION
This Script does a ton of beautiful things!
.PARAMETER
.PARAMETER
.INPUTS
.OUTPUTS
.EXAMPLE
.EXAMPLE
.LINK
http://www.lazywinadmin.com
#>
#end region help

#--- FUNCTIONS ---#
#region functions

#end region functions

#--- SCRIPT ---#
#region script

#end region script

```

