---
layout: single
title: PowerShell - Remove Diacritics (Accents) from a string
excerpt: 
permalink: /2015/05/powershell-remove-diacritics-accents.html
tags: 
- accents
- diacritics
- powershell
- string
published: true
comments: true
---

 
In the last few days, I have been working on a Onboarding automation process that need to handle both French and English and one of the step needed to remove the accents (also knows as Diacritics) from some strings passed by the users.

{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150521_PowerShell_-_Remove_Diacritics_(Accents)_from_a_string/aaaaaa-diacritics__873671977__-496x135.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150521_PowerShell_-_Remove_Diacritics_(Accents)_from_a_string/aaaaaa-diacritics__873671977__-496x135.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})

The following approach uses <a href="https://msdn.microsoft.com/en-us/library/system.string.normalize.aspx" target="_blank">`String.Normalize`</a> to split the input string into constituent glyphs (basically separating the "base" characters from the diacritics) and then scans the result and retains only the base characters. It's just a little complicated, but really you're looking at a complicated problem...

> **UPDATE:** Thanks to **Marcin Krzanowicz** who provided another solution, see the Method 2 below. His version works with Polish characters too where the method 1 doesn't.

> **UPDATE (2016/10/10):** Added an example to replace diacritics in multiple files

{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150521_PowerShell_-_Remove_Diacritics_(Accents)_from_a_string/Remove_accents_PowerShell__1063375222__-772x258.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150521_PowerShell_-_Remove_Diacritics_(Accents)_from_a_string/Remove_accents_PowerShell__1063375222__-772x258.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})


## Method #1

The following code is available on my PowerShell <a href="https://github.com/lazywinadmin/PowerShell/blob/master/TOOL-Remove-StringDiacritic/Remove-StringDiacritic.ps1" target="_blank">GitHub</a> repository.


```powershell
function Remove-StringDiacritic
{
<#
    .SYNOPSIS
        This function will remove the diacritics (accents) characters from a string.
        
    .DESCRIPTION
        This function will remove the diacritics (accents) characters from a string.
    
    .PARAMETER String
        Specifies the String on which the diacritics need to be removed
    
    .PARAMETER NormalizationForm
        Specifies the normalization form to use
        https://msdn.microsoft.com/en-us/library/system.text.normalizationform(v=vs.110).aspx
    
    .EXAMPLE
        PS C:\> Remove-StringDiacritic "L'été de Raphaël"
        
        L'ete de Raphael
    
    .NOTES
        Francois-Xavier Cat
        @lazywinadmin
        www.lazywinadmin.com
#>
    
    param
    (
        [ValidateNotNullOrEmpty()]
        [Alias('Text')]
        [System.String]$String,
        [System.Text.NormalizationForm]$NormalizationForm = "FormD"
    )
    
    BEGIN
    {
        $Normalized = $String.Normalize($NormalizationForm)
        $NewString = New-Object -TypeName System.Text.StringBuilder
        
    }
    PROCESS
    {
        $normalized.ToCharArray() | ForEach-Object -Process {
            if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($psitem) -ne [Globalization.UnicodeCategory]::NonSpacingMark)
            {
                [void]$NewString.Append($psitem)
            }
        }
    }
    END
    {
        Write-Output $($NewString -as [string])
    }
}
```


This code is available on my [GitHub Repository](https://github.com/lazywinadmin/PowerShell/blob/master/TOOL-Remove-StringDiacritic/Remove-StringDiacritic.ps1)


## Method #2 (From Marcin Krzanowicz)

{% assign ImageText = '' %}
{% capture ImageUrl %}
{{ site.url }}/images/2015/20150521_PowerShell_-_Remove_Diacritics_(Accents)_from_a_string/Remove_accents_PowerShell2__774601678__-772x178.png
{% endcapture %}
{% capture SourceUrl %}
{{ site.url }}/images/2015/20150521_PowerShell_-_Remove_Diacritics_(Accents)_from_a_string/Remove_accents_PowerShell2__774601678__-772x178.png
{% endcapture %}
[![{{ImageText}}]({{ImageUrl}})]({{SourceUrl}})


```powershell
function Remove-StringLatinCharacters
{
    PARAM ([string]$String)
    [Text.Encoding]::ASCII.GetString([Text.Encoding]::GetEncoding("Cyrillic").GetBytes($String))
}
```




## Extra: Remove Diacritics from multiple files


If you want to take this to the next level and remove diacritics from multiple files, you could do something like this:


```powershell
# Modify the function to make it compatible with the pipeline
function Remove-StringLatinCharacters
{
    PARAM (
        [parameter(ValueFromPipeline = $true)]
        [string]$String
    )
    PROCESS
    {
        [Text.Encoding]::ASCII.GetString([Text.Encoding]::GetEncoding("Cyrillic").GetBytes($String))
    }
}


# Exemple with multiple Text files located in the directory c:\test\
Foreach ($file in (Get-ChildItem c:\test\*.txt))
{
    # Get the content of the current file and remove the diacritics
    $NewContent = Get-content $file | Remove-StringLatinCharacters
    
    # Overwrite the current file with the new content
    $NewContent | Set-Content $file
}
```