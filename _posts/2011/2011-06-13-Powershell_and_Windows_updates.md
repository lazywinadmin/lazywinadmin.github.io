---
layout: single
title: Powershell and Windows updates
excerpt: 
permalink: /2011/06/powershell-and-windows-updates.html
tags: 
- com
- powershell
- scripting
- windows update
published: true
comments: true
---

Quick post, I found this neat function from http://richardspowershellblog.wordpress.com/ to be able to retrieve the installed Windows updates.

```powershell
#
# Functions from http://richardspowershellblog.wordpress.com/
#
# --- GET-UPDATE --- #
function get-update {
    $session = New-Object -ComObject Microsoft.Update.Session
    $searcher = $session.CreateUpdateSearcher()
    $result = $searcher.Search("IsInstalled=0 and Type='Software'" )

    $result.Updates | select Title, IsHidden
}

# --- GET-UPDATE --- # (updated)
function get-update2 {
    [CmdletBinding()] 
    param ( 
         [switch]$hidden 
    ) 
    PROCESS{
        $session = New-Object -ComObject Microsoft.Update.Session
        $searcher = $session.CreateUpdateSearcher()

        # 0 = false &amp; 1 = true
        if ($hidden){
             $result = $searcher.Search("IsInstalled=0 and Type='Software' and ISHidden=1" )
        }
        else {
             $result = $searcher.Search("IsInstalled=0 and Type='Software' and ISHidden=0" )
        }

        if ($result.Updates.Count -gt 0){
             $result.Updates | 
             select Title, IsHidden, IsDownloaded, IsMandatory, 
             IsUninstallable, RebootRequired, Description
        }
        else {
             Write-Host " No updates available"
        } 

    }#process

<# 
.SYNOPSIS Discovers available updates 
.DESCRIPTION Interrogates Windows updates for available software updates only. Optional parameter to display hidden updates 
.PARAMETER hidden A switch to display the hidden updates 
.EXAMPLE get-update Displays non-hidden updates 
.EXAMPLE get-update -hidden Displays hidden updates #>
}



# --- GET-INSTALLEDUPDATE --- #
function get-installedupdate {
    $session = New-Object -ComObject Microsoft.Update.Session
    $searcher = $session.CreateUpdateSearcher()
    $result = $searcher.Search("IsInstalled=1 and Type='Software'" )

    $result.Updates | select Title, LastDeploymentChangeTime
}


# --- INSTALL-UPDATE --- #
function install-update {
    $session = New-Object -ComObject Microsoft.Update.Session
    $searcher = $session.CreateUpdateSearcher()

    $result = $searcher.Search("IsInstalled=0 and Type='Software' and ISHidden=0")
    
    if ($result.Updates.Count -eq 0) {
         Write-Host "No updates to install"
    }
    else {
        $result.Updates | select Title
    }

    $downloads = New-Object -ComObject Microsoft.Update.UpdateColl

    foreach ($update in $result.Updates){
         $downloads.Add($update)
    }
     
    $downloader = $session.CreateUpdateDownLoader()
    $downloader.Updates = $downloads
    $downloader.Download()

    $installs = New-Object -ComObject Microsoft.Update.UpdateColl
    foreach ($update in $result.Updates){
         if ($update.IsDownloaded){
               $installs.Add($update)
         }
    }

    $installer = $session.CreateUpdateInstaller()
    $installer.Updates = $installs
    $installresult = $installer.Install()
    $installresult

}
```
