---
layout: single
title: Get-LocalGroupMembership (Using ADSI/WinNT)
excerpt: 
permalink: /2012/12/get-localgroupmembership-using-adsiwinnt.html
tags: 
- audit
- function
- group membership
- local administrators
- powershell
published: true
comments: true
---
<b style="text-decoration: underline;">Updated (2013/06/03):</b> I added some error handeling/verbose/testing. You are now able to pass multiple computers to the ComputerName parameter.

Intro

Recently I had to do an Audit at my work to find who was Local Administrators on a bunch of Servers.
That might sounds easy when you just have to check 2 or 3 servers... but what if you have to get the information for hundreds! Plus ... I know the Auditor would ask me this same question every few months to prove that the list did not change...Arghhh!

Once again PowerShell saved me so much time on that one!!

Get-LocalGroupMembership

Get the specified local group membership on a local or remote computer.
By default, if you don't specify any parameter, It will query the local group "Administrators" on the localhost.

For some reason WMI bug with some of my Windows Server 2003 and does not return some Domain Groups where Windows Server 2008/2012 work just fine. 

Here is my ADSI/WinNT version, It fixed my problem.
In the next post I will go a bit further and get the membership from the domain groups ;-)

Running the Function

<a href="{{ site.url }}/images/2012/20121230_Get-LocalGroupMembership_(Using_ADSIWinNT)/Get-LocalGroupMembership__1536305082__-603x418.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="442" src="{{ site.url }}/images/2012/20121230_Get-LocalGroupMembership_(Using_ADSIWinNT)/Get-LocalGroupMembership__812400549__-603x418.png" width="640" /></a>
The Code

<pre class="brush: powershell;toolbar:false; ruler: true; first-line: 1;gutter: true;">Function Get-LocalGroupMembership {
<#
.Synopsis
    Get the local group membership.
            
.Description
    Get the local group membership.
            
.Parameter ComputerName
    Name of the Computer to get group members. Default is "localhost".
            
.Parameter GroupName
    Name of the GroupName to get members from. Default is "Administrators".
            
.Example
    Get-LocalGroupMembership
    Description
    -----------
    Get the Administrators group membership for the localhost
            
.Example
    Get-LocalGroupMembership -ComputerName SERVER01 -GroupName "Remote Desktop Users"
    Description
    -----------
    Get the membership for the the group "Remote Desktop Users" on the computer SERVER01

.Example
    Get-LocalGroupMembership -ComputerName SERVER01,SERVER02 -GroupName "Administrators"
    Description
    -----------
    Get the membership for the the group "Administrators" on the computers SERVER01 and SERVER02

.OUTPUTS
    PSCustomObject
            
.INPUTS
    Array
            
.Link
    N/A
        
.Notes
    NAME:      Get-LocalGroupMembership
    AUTHOR:    Francois-Xavier Cat
    WEBSITE:   www.LazyWinAdmin.com
#>

 
 [Cmdletbinding()]

 PARAM (
        [alias('DnsHostName','__SERVER','Computer','IPAddress')]
  [Parameter(ValueFromPipelineByPropertyName=$true,ValueFromPipeline=$true)]
  [string[]]$ComputerName = $env:COMPUTERNAME,
  
  [string]$GroupName = "Administrators"

  )
    BEGIN{
    }#BEGIN BLOCK

    PROCESS{
        foreach ($Computer in $ComputerName){
            TRY{
                $Everything_is_OK = $true

                # Testing the connection
                Write-Verbose -Message "$Computer - Testing connection..."
                Test-Connection -ComputerName $Computer -Count 1 -ErrorAction Stop |Out-Null
                     
                # Get the members for the group and computer specified
                Write-Verbose -Message "$Computer - Querying..."
             $Group = [ADSI]"WinNT://$Computer/$GroupName,group"
             $Members = @($group.psbase.Invoke("Members"))
            }#TRY
            CATCH{
                $Everything_is_OK = $false
                Write-Warning -Message "Something went wrong on $Computer"
                Write-Verbose -Message "Error on $Computer"
                }#Catch
        
            IF($Everything_is_OK){
             # Format the Output
                Write-Verbose -Message "$Computer - Formatting Data"
             $members | ForEach-Object {
              $name = $_.GetType().InvokeMember("Name", 'GetProperty', $null, $_, $null)
              $class = $_.GetType().InvokeMember("Class", 'GetProperty', $null, $_, $null)
              $path = $_.GetType().InvokeMember("ADsPath", 'GetProperty', $null, $_, $null)
  
              # Find out if this is a local or domain object
              if ($path -like "*/$Computer/*"){
               $Type = "Local"
               }
              else {$Type = "Domain"
              }

              $Details = "" | Select-Object ComputerName,Account,Class,Group,Path,Type
              $Details.ComputerName = $Computer
              $Details.Account = $name
              $Details.Class = $class
                    $Details.Group = $GroupName
              $details.Path = $path
              $details.Type = $type
  
              # Show the Output
                    $Details
             }
            }#IF(Everything_is_OK)
        }#Foreach
    }#PROCESS BLOCK

    END{Write-Verbose -Message "Script Done"}#END BLOCK
}#Function Get-LocalGroupMembership



```

