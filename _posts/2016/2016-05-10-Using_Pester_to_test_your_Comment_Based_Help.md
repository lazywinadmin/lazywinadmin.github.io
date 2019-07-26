---
layout: single
title: Using Pester to test your Comment Based Help
excerpt: 
permalink: /2016/05/using-pester-to-test-your-comment-based.html
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

<img imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;" border="0" height="130" src="{{ site.url }}/images/2016/20160510_Using_Pester_to_test_your_Comment_Based_Help/pester_logo__332888956__-200x200.png" width="130" />
<mark><u>Update 2019/07/26:</u></mark> It seems that the AST to Help content parameter comparison doesn't work in PowerShell Core.
See the example suggested by **[@mgeorgebrown89](https://github.com/mgeorgebrown89)** (Thank you!)<br>
<mark><u>Update 2016/11/25:</u></mark> Updated the code to support functions where there is no parameter declared (Thanks <b>Wojciech Sciesinski</b> !)

I remember attending a meeting on Pester presented by Dave Wyatt back in November 2014 during my first MVP Summit.

A couple of well known PowerShellers were there: Boe Prox, Emin Atac, Adam Driscoll, Mike Robbins, Fabien Dibot, Jan Egil Ring, Steve Murawski, ...  It was a great event, great to finally meet all those guys...

Anyway, at the time Pester looked pretty neat but since I only played with it a couple of times and never really invest or commit myself to create tests for each of my scripts or modules.

<i>During the Microsoft MVP Summit 2014 week (Bellevue, WA, USA)
Evening event organized by Dave Wyatt on Pester.</i>

<center>
<a href="{{ site.url }}/images/2016/20160510_Using_Pester_to_test_your_Comment_Based_Help/IMG_20141104_223150__1621835198__-892x669.jpg" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="240" src="{{ site.url }}/images/2016/20160510_Using_Pester_to_test_your_Comment_Based_Help/IMG_20141104_223150__1783351507__-320x240.jpg" width="320" /></a>
</center>

# What is Pester ?

> Pester is a <a href="https://en.wikipedia.org/wiki/Behavior-driven_development">Behavior-driven development</a> (BDD) based test runner for PowerShell. Pester provides a framework for running Unit Tests to execute and validate PowerShell commands. Pester follows a file naming convention for naming tests to be discovered by pester at test time and a simple set of functions that expose a Testing DSL for isolating, running, evaluating and reporting the results of PowerShell commands.<br><br>
> Pester tests can execute any command or script that is accessible to a pester test file. This can include functions, Cmdlets, Modules and scripts. Pester can be run in ad hoc style in a console or it can be integrated into the Build scripts of a Continuous Integration system.<br><br>
>Pester also contains a powerful set of Mocking Functions that allow tests to mimic and mock the functionality of any command inside of a piece of PowerShell code being tested. See Mocking with Pester.

# My first pester

So I decided that from now on, I'll do my best to deliver tests with any new scripts or modules.
At first, It won't be perfect for sure but I have to start somewhere....

## Goal

My first goal is to verify the Comment Based Help for each of the functions included in the module [ADSIPs](https://github.com/lazywinadmin/AdsiPS). I want to make sure that I have a description, parameter description and examples.

I easily see this pester test being expanded to test each of the examples defined in my functions.

## Pester Tests

* <b>Synopsis</b> is not Null or Empty
* <b>Description</b> is not Null or Empty
* <b>Parameters descriptions</b> is not Null or Empty
* <b>Parameters count </b>declared in Help is equal to the Parameter found in the Abstract Syntax Trees (AST)
* <b>Examples</b> count are greater than 0
* <b>Notes</b> contains my information
* Author
* Website
* Twitter Handle
* Github Account

```powershell
Describe "AdsiPS Module" -Tags "Module" {

    # Import Module
    #import-module C:\Test\AdsiPS\AdsiPS.psd1

    #$FunctionsList = (get-command -Module ADSIPS).Name
    $FunctionsList = (get-command -Module ADSIPS | Where-Object -FilterScript { $_.CommandType -eq 'Function' }).Name

    FOREACH ($Function in $FunctionsList)
    {
        # Retrieve the Help of the function
        $Help = Get-Help -Name $Function -Full

        $Notes = ($Help.alertSet.alert.text -split '\n')

        # Parse the function using AST
        $AST = [System.Management.Automation.Language.Parser]::ParseInput((Get-Content function:$Function), [ref]$null, [ref]$null)

        Context "$Function - Help"{

            It "Synopsis"{ $help.Synopsis | Should not BeNullOrEmpty }
            It "Description"{ $help.Description | Should not BeNullOrEmpty }
            It "Notes - Author" { $Notes[0].trim() | Should Be "Francois-Xavier Cat" }
            It "Notes - Site" { $Notes[1].trim() | Should Be "Lazywinadmin.com" }
            It "Notes - Twitter" { $Notes[2].trim() | Should Be "@lazywinadmin" }
            It "Notes - Github" { $Notes[3].trim() | Should Be "github.com/lazywinadmin" }

            # Get the parameters declared in the Comment Based Help
            $RiskMitigationParameters = 'Whatif', 'Confirm'
            $HelpParameters = $help.parameters.parameter | Where-Object name -NotIn $RiskMitigationParameters

            # Get the parameters declared in the AST PARAM() Block
            $ASTParameters = $ast.ParamBlock.Parameters.Name.variablepath.userpath

            $FunctionsList = (get-command -Module $ModuleName | Where-Object -FilterScript { $_.CommandType -eq 'Function' }).Name



            It "Parameter - Compare Count Help/AST" {
                $HelpParameters.name.count -eq $ASTParameters.count | Should Be $true
            }

            # Parameter Description
            If (-not [String]::IsNullOrEmpty($ASTParameters)) # IF ASTParameters are found
            {
                $HelpParameters | ForEach-Object {
                    It "Parameter $($_.Name) - Should contains description"{
                        $_.description | Should not BeNullOrEmpty
                    }
                }

            }

            # Examples
            it "Example - Count should be greater than 0"{
                $Help.examples.example.code.count | Should BeGreaterthan 0
            }

            # Examples - Remarks (small description that comes with the example)
            foreach ($Example in $Help.examples.example)
            {
                it "Example - Remarks on $($Example.Title)"{
                    $Example.remarks | Should not BeNullOrEmpty
                }
            }
        }
    }
}
```

Note that in PowerShell Core, It seems that the AST to Help content parameter comparison doesn't work.
Thanks to [@mgeorgebrown89](https://github.com/mgeorgebrown89) who suggested the following:

```powershel
foreach ($param in $ASTParameters) {
    It "parameter `"$param`" has a .PARAMTER description" {
         (Get-Help $functionName -Parameter $param).description | Should -Not -BeNullOrEmpty
    }
}
```


Here is the code in action:

We can see that I already missed a couple of things on the first functions tested ... :-/

<img border="0" src="{{ site.url }}/images/2016/20160510_Using_Pester_to_test_your_Comment_Based_Help/Pester_CommentBasedHelp02__42317191__-754x477.png" />

# Other Pester posts

* <a href="{{ site.url }}/2016/05/using-pester-to-test-your-comment-based.html" target="_blank">Using Pester to test your Comment Based Help</a>
* <a href="{{ site.url }}/2016/05/using-pester-to-test-your-manifest-file.html" target="_blank">Using Pester to test your Manifest File</a>
* <a href="{{ site.url }}/2016/08/powershellpester-make-sure-your-comment.html" target="_blank">Make sure your Comment Based Help is not indented</a>
* <a href="{{ site.url }}/2016/08/powershellpester-make-sure-your.html" target="_blank">Make sure your parameters are separated by an empty line</a>

# Resources

Some great resources out there helped me to get started:

* [Pester (Github)](https://github.com/pester/Pester/wiki)
* [Dave Wyatt series on Pester on Scripting Guy Blog](https://blogs.technet.microsoft.com/heyscriptingguy/2015/12/14/what-is-pester-and-why-should-i-care/)
* [Test Driven Development with Pester (June Blender)](https://www.youtube.com/watch?v=jvvh9cpD_LM&amp;list=PLfeA8kIs7Coc1Jn5hC4e_XgbFUaS5jY2i&amp;index=19)
* [Mike F Robbins Pester articles](http://mikefrobbins.com/tag/pester/)
