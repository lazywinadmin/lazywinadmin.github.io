---
layout: single
title: Winter Scripting Games 2013 - Practice Event 2
excerpt: 
permalink: /2013/02/winter-scripting-games-2013-practice_18.html
tags: 
- 2013 winter scripting games
- function
- powershell
- scripting games
published: true
comments: true
---

<a href="http://2.bp.blogspot.com/-d1gykybQn4I/Uk4cLkoVYiI/AAAAAAABdyU/lDUuVAhuJgE/s1600/PowerShell-Scripting-Games-Logo+(1).png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="200" src="http://2.bp.blogspot.com/-d1gykybQn4I/Uk4cLkoVYiI/AAAAAAABdyU/lDUuVAhuJgE/s200/PowerShell-Scripting-Games-Logo+(1).png" width="171" /></a>Just a quick post on the script I submit for the second practice event of the Winter Scripting Games 2013 (last week).


<div style="background-color: white;"><b style="font-family: 'Trebuchet MS', Trebuchet, sans-serif; line-height: 18px;"><u>Practice Event 2 -</u></b><span style="background-color: transparent; line-height: 18px;"><span style="font-family: Trebuchet MS, Trebuchet, sans-serif;"><b><u>Covering Your Assets</u></b><div style="background-color: white;"><blockquote class="tr_bq"><span style="font-family: Trebuchet MS, Trebuchet, sans-serif;"><span style="line-height: 18px;"><i>Your organization is preparing to renew maintenance contracts on all of your server computers. You need to provide management with a report that details each inventory information for each server. Most of the servers do not have Windows PowerShell installed. None of the servers a separated from your client computer by a firewall. Computer names may be specified by a variety of means; your function must accept any collection of strings as computer names.</i></blockquote>
<blockquote class="tr_bq"><i style="line-height: 18px;"><b>Minimum Requirements</b></i></blockquote><blockquote class="tr_bq"><i style="line-height: 18px;"><b>Optional Criteria</b></i></blockquote><blockquote class="tr_bq">
* <span style="line-height: 22px;"><i>Display optional verbose output showing the computer name being contacted</i>

* <span style="line-height: 22px;"><i>Prompt for computer names if none are specified when the function is run</i>

* <span style="line-height: 22px;"><i>Accept computer names as strings from the pipeline</i>
</blockquote><blockquote class="tr_bq"><span style="line-height: 18px;"><b><i>Desired Output</i></b></blockquote><blockquote class="tr_bq">
* <i>ComputerName Model Manufacturer LogicalProcs PhysicalRAM BIOSSerial</i>
</blockquote><i style="font-family: 'Trebuchet MS', Trebuchet, sans-serif; line-height: 18px;"><b>
</b></i><div style="background-color: white; font-family: 'Trebuchet MS', Trebuchet, sans-serif; line-height: 18px;"><b><u>My Script</u></b><b><u>
</u></b>
```
# NAME  : Get-ComputerInventory
# AUTHOR: Francois-Xavier Cat
# EMAIL : fxcat@LazyWinAdmin.com
# DATE  : 2013/02/10 

Function Get-ComputerInventory {
        <#
        .SYNOPSIS 
        The Get-ComputerInventory function gets information about a local or 
        Remote machine(s) specified by the parameter ComputerName.
    
        .DESCRIPTION
        The Get-ComputerInventory function gets information about a local or 
        Remote machine(s) specified by the parameter ComputerName.
    
        .PARAMETER ComputerName
         Specifies the target computer for the management operation. The value can 
        be a fully qualified domain name, a NetBIOS name, or an IP address. To 
        specify the local computer, use the local computer name, use localhost, or 
        use a dot (.)
    
        .INPUTS
        System.String
    
        .OUTPUTS
        System.Management.Automation.PSObject

        .EXAMPLE
         Get-ComputerInventory -ComputerName PC01
        
        This command gets inventory information about the Computer PC01.
    
        .EXAMPLE
         "SERVER01","SERVER02" | Get-ComputerInventory
        
        This command gets inventory information about SERVER01 and SERVER02.
        Get-ComputerInventory accepts Input from the pipeline.
    
        .NOTES
        NAME  : Get-ComputerInventory
        AUTHOR: Francois-Xavier Cat
        EMAIL : fxcat@LazyWinAdmin.com
        DATE  : 2013/02/10
    
        .LINK
        http://lazywinadmin.com
        #>

    [CmdletBinding()]
    param(
        [Parameter(ValueFromPipeline=$True,Mandatory=$true)]
        [string[]]$ComputerName
    )
    BEGIN {# Setup
        }
    PROCESS {
        Foreach ($Computer in $ComputerName) {
            Write-Verbose -Message "$Computer"

            try {
                
                # Gather Win32_ComputerSystem information for the current $Computer
                $WMIComputerSystem = Get-WmiObject -Class Win32_Computersystem -ComputerName $Computer -ErrorAction 'Stop'
                
                # Gather Win32_BIOS information for the current $Computer
                $WMIBios = Get-WmiObject -Class win32_bios -ComputerName $Computer -ErrorAction 'Stop'

                $TryIsOK = $True
                
            }#Try
            
            Catch {
                # Send the Errors in the Errors.txt file.
                "$Computer" | Out-File -Append -FilePath Errors.txt
                $TryIsOK = $False
                
            }#Catch
            
            if ($TryIsOK) {

                $output =    @{'ComputerName'=$Computer;
                            'Model'=$WMIComputerSystem.model;
                            'Manufacturer'=$WMIComputerSystem.Manufacturer;
                            'LogicalProcs'=$WMIComputerSystem.NumberOfLogicalProcessors;
                            'PhysicalRam'=("{0:N0}" -f($WMIComputerSystem.TotalPhysicalMemory/1GB));
                            'BIOSSerial'= $WMIBios.SerialNumber}
                    
                # Create a new PowerShell object for the output
                $object = New-Object -TypeName PSObject -Property $output
                $object.PSObject.TypeNames.Insert(0,'Report.ComputerInventory')

                # Show the Output
                Write-Output -InputObject $object

            }#if ($TryIsOK)

        }#Foreach ($Computer in $ComputerName)
        
    }#PROCESS

    END {# Cleanup
        }

}#Function Get-ComputerInventory
```

