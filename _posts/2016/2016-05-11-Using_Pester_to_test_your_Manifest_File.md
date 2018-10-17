---
layout: single
title: Using Pester to test your Manifest File
excerpt: 
permalink: /2016/05/using-pester-to-test-your-manifest-file.html
tags: 
- adsips
- pester
- powershell
published: true
comments: true
toc: true
toc_label: "Table of content"
classes: wide
---

<img imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;" border="0" height="130" src="{{ site.url }}/images/2016/20160511_Using_Pester_to_test_your_Manifest_File/pester_logo__837959368__-320x320.png" width="130" /> In my previous post I got started with Pester and wrote <a href="{{ site.url }}/2016/05/using-pester-to-test-your-comment-based.html" target="_blank">my first test against the Comment Based Help</a> of my module [AdsiPS](https://github.com/lazywinadmin/AdsiPS").

Next, I wanted to write a Pester test against the Manifest File of AdsiPS module. I want to make sure all the basic information of the module is referenced in this file. Mike Robbins wrote a great article on <a href="http://mikefrobbins.com/2016/04/14/write-dynamic-unit-tests-for-your-powershell-code-with-pester/" target="_blank">Dynamic Unit Tests</a> where he is touching some of the points I want to cover today.

But before I get into the code, a small reminder on the Manifest file's role.


## What is a Manifest File ?


>A module manifest is a Windows PowerShell data file (.psd1) that describes the contents of a module and determines how a module is processed. The manifest file itself is a text file that contains a hash table of keys and values. You link a manifest file to a module by naming it the same as the module, and placing it in the root of the module directory.
> <br> For simple modules that contain only a single .psm1 or binary assembly, a module manifest is optional. However, it is recommended that you use a module manifest whenever possible, as they are useful to help you organize your code and to maintain versioning information. <a href="https://msdn.microsoft.com/en-us/library/dd878337(v=vs.85).aspx">More info</a>.<br><br>

(You'll find at the end of this article the command that I use to generate my manifest.)



## Unit tests for a Manifest file


### Goal

As specified above, I want to test the manifest file for the module <a href="https://github.com/lazywinadmin/AdsiPS" target="_blank">ADSIPS</a>. I want to make sure all the basic information is present. You might adapt this to your needs.

### Tests

* <b>Not empty:</b>
* <b>RootModule:</b> typically should have the psm1 file listed there
* <b>Author</b>, <b>Company</b>, <b>Description</b>, <b>Copyright</b>, <b>License URI</b>, <b>Project URI</b>, <b>Tags</b> (used on <a href="https://www.powershellgallery.com/" target="_blank">PowerShell Gallery</a>)
* <b>Equal number</b> of functions present in the <i>Public folder</i>* vs Those present when you import the module.

<img imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;" border="0" height="145" src="{{ site.url }}/images/2016/20160511_Using_Pester_to_test_your_Manifest_File/2016-05-11_23-40-31__1805837867__-256x186.png" width="200" />*<i>Public Folder</i>: Inside the module folder, I like to organize my module with at least a Public and Private folder. Public is used for Exported functions available to the user, Private are helper functions used only inside the module. This is a model that I adapted [from Warren Frame](http://ramblingcookiemonster.github.io/Building-A-PowerShell-Module/) that help to stay organized and also ease the management when you share your module on Version control solutions such as Github.


```powershell
$ModuleName = "ADSIPS"

# Make sure one or multiple versions of the module are not loaded
Get-Module -Name $ModuleName | remove-module

# Find the Manifest file
$ManifestFile = "$(Split-path (Split-Path -Parent -Path $MyInvocation.MyCommand.Definition))\$ModuleName\$ModuleName.psd1"

# Import the module and store the information about the module
$ModuleInformation = Import-module -Name $ManifestFile -PassThru

# Get the functions present in the Manifest
$ExportedFunctions = $ModuleInformation.ExportedFunctions.Values.name

# Get the functions present in the Public folder
$PS1Functions = Get-ChildItem -path "$(Split-path (Split-Path -Parent -Path $MyInvocation.MyCommand.Definition))\$ModuleName\public\*.ps1"


Describe "$ModuleName Module - Testing Manifest File (.psd1)"{
    Context "Manifest"{
        It "Should contains RootModule"{
            $ModuleInformation.RootModule | Should not BeNullOrEmpty
        }
        It "Should contains Author"{
            $ModuleInformation.Author | Should not BeNullOrEmpty
        }
        It "Should contains Company Name"{
            $ModuleInformation.CompanyName | Should not BeNullOrEmpty
        }
        It "Should contains Description"{
            $ModuleInformation.Description | Should not BeNullOrEmpty
        }
        It "Should contains Copyright"{
            $ModuleInformation.Copyright | Should not BeNullOrEmpty
        }
        It "Should contains License"{
            $ModuleInformation.LicenseURI | Should not BeNullOrEmpty
        }
        It "Should contains a Project Link"{
            $ModuleInformation.ProjectURI | Should not BeNullOrEmpty
        }
        It "Should contains a Tags (For the PSGallery)"{
            $ModuleInformation.Tags.count | Should not BeNullOrEmpty
        }

        It "Compare the count of Function Exported and the PS1 files found"{
            $ExportedFunctions.count -eq $PS1Functions.count |
            Should BeGreaterthan 0
        }
        It "Compare the missing function"{
            if (-not ($ExportedFunctions.count -eq $PS1Functions.count))
            {
                $Compare = Compare-Object -ReferenceObject $ExportedFunctions -DifferenceObject $PS1Functions.basename
                $Compare.inputobject -join ',' | Should BeNullOrEmpty
            }
        }
    }
}
```


Output of the pester tests against a Manifest File

<img border="0" src="{{ site.url }}/images/2016/20160511_Using_Pester_to_test_your_Manifest_File/Pester_Manifest__1218784296__-790x248.png" />


## Extra: Generating a Manifest file

This is the command I'm using to generate my manifest:

```powershell
# Provide information on the module
$ModuleName = "AdsiPS"
$Author = "Francois-Xavier Cat"
$AuthorCompany = "Lazywinadmin.com"
$Tags = "ADSI", "AdsiPS", "ActiveDirectory"
$ModuleVersion = "1.0.0.0"
$PowerShellVersion = "3.0"
$Description = "AdsiPS is a module to interact with Active Directory without the Microsoft ActiveDirectory module"
$CopyRight = "(c) 2016 Francois-Xavier Cat. All rights reserved. Licensed under The MIT License (MIT)"
$LicenseURI = "https://github.com/lazywinadmin/$ModuleName/blob/master/LICENSE"
$ProjectURI = "https://github.com/lazywinadmin/$ModuleName/"
$RequiredAssemblies = ''

# Generate the manifest
New-ModuleManifest `
   -RootModule "$ModuleName.psm1" `
   -Path .\$ModuleName.psd1 `
   -Guid ([guid]::NewGuid()) `
   -RequiredAssemblies $RequiredAssemblies `
   -Author $Author `
   -CompanyName $AuthorCompany `
   -ModuleVersion $ModuleVersion `
   -Description $Description `
   -Copyright $CopyRight `
   -FunctionsToExport * `
   -Tags $Tags `
   -PowerShellVersion $PowerShellVersion `
   -LicenseUri $LicenseURI `
   -ProjectUri $ProjectURI
```



## Other posts on Pester


* <a href="{{ site.url }}/2016/05/using-pester-to-test-your-comment-based.html" target="_blank">Using Pester to test your Comment Based Help</a>
* <a href="{{ site.url }}/2016/05/using-pester-to-test-your-manifest-file.html" target="_blank">Using Pester to test your Manifest File</a>
* <a href="{{ site.url }}/2016/08/powershellpester-make-sure-your-comment.html" target="_blank">Make sure your Comment Based Help is not indented</a>
* <a href="{{ site.url }}/2016/08/powershellpester-make-sure-your.html" target="_blank">Make sure your parameters are separated by an empty line</a>

