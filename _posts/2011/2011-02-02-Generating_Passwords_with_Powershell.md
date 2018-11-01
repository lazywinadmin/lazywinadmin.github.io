---
layout: single
title: Generating Passwords with Powershell
excerpt: 
permalink: /2011/02/generating-passwords-with-powershell.html
tags: 
- password
- powershell
- scripting
- security
categories:
- powershell
published: true
comments: true
classes: wide
---

Here is a very neat script writte by Derek Mangrum that can generate new passwords based on your parameters


## Script

```powershell
#######################################################################
# FUNCTION NAME: New-Password
#   
# See USAGE() function for docs.
#
# WRITTEN BY: Derek Mangrum
#
# REVISION HISTORY:
#     2008-10-23 : Initial version
#
# http://grinding-it-out.blogspot.com/2008/10/generating-passwords-with-powershell.html
#######################################################################
function New-Password
{
    param 
    (
        [int]$length,
        [switch]$lowerCase,
        [switch]$upperCase,
        [switch]$numbers,
        [switch]$specialChars
    )

    BEGIN
    {
        # Usage Instructions
        function Usage() 
        {
            Write-Host ''
            Write-Host 'FUNCTION NAME: New-Password' -ForegroundColor White
            Write-Host ''
            Write-Host 'USAGE'
            Write-Host '    New-Password -length 10 -upperCase -lowerCase -numbers'
            Write-Host '    New-Password -length 10 -specialChars'
            Write-Host '    New-Password -le 10 -lo -u -n -s'
            Write-Host '    New-Password'
            Write-Host ''
            Write-Host 'DESCRIPTION:'
            Write-Host ' Generates a random password of a given length (-length parameter)'
            Write-Host ' comprised of at least one character from each subset provided'
            Write-Host ' as a switch parameter.'
            Write-Host ''
            Write-Host 'AVAILABLE SWITCHES:'
            Write-Host ' -lowerCase    : include all lower case letters'
            Write-Host ' -upperCase    : include all upper case letters'
            Write-Host ' -numbers      : include 0-9'
            Write-Host ' -specialChars : include the following- !@#$%^&amp;*()_+-={}[]<>'
            Write-Host ''
            Write-Host 'REQUIREMENTS:'
            Write-Host ' You must provide the -length (four or greater) and at least one character switch'
            Write-Host ''
        }
        
        function generate_password
        {
            if ($lowerCase)    
            { 
                $charsToUse += $lCase
                $regexExp += "(?=.*[$lCase])"
            }
            if ($upperCase)        
            { 
                $charsToUse += $uCase 
                $regexExp += "(?=.*[$uCase])"
            }
            if ($numbers)
            { 
                $charsToUse += $nums 
                $regexExp += "(?=.*[$nums])"
            }
            if ($specialChars)    
            { 
                $charsToUse += $specChars
                $regexExp += "(?=.*[\W])"
            }
            
            $test = [regex]$regexExp
            $rnd = New-Object System.Random
            
            do 
            {
                $pw = $null
                for ($i = 0 ; $i -lt $length ; $i++)
                {
                    $pw += $charsToUse[($rnd.Next(0,$charsToUse.Length))]
                    Start-Sleep -milliseconds 20
                }
            }
            until ($pw -match $test)
            
            return $pw
        }

        # Displays help
        if (($Args[0] -eq "-?") -or ($Args[0] -eq "-help")) 
        {
            Usage
            break
        }
        else
        {
            $lCase = 'abcdefghijklmnopqrstuvwxyz'
            $uCase = $lCase.ToUpper()
            $nums = '1234567890'
            $specChars = '!@#$%^&amp;*()_+-={}[]<>'
        }
    }
    
    PROCESS
    {
        if (($length -ge 4) -and ($lowerCase -or $upperCase -or $numbers -or $specialChars))
        {
            $newPassword = generate_password
        }
        else
        {
            Usage
            break
        }
        
        $newPassword
    }
    
    END
    {
    }
}
```


## Usage

```powershell
New-Password -length 7 -lowerCase -upperCase -numbers -specialChars
```
