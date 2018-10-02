---
layout: single
title: Powershell - Monitor Active Directory Groups membership change
excerpt: 
permalink: /2012/03/powershell-monitor-membership-change-to.html
tags: 
- active directory
- monitoring
- powershell
published: true
comments: true
---
<span style="background-color: yellow;"><b><u>UPDATE:</u></b>The most recent update is available<a href="https://github.com/lazywinadmin/AD-GROUP-Monitor_MemberShip" target="_blank">on Github</a>
<b><u style="background-color: yellow;">
</u></b>
<u>See also those related BlogPosts:</u>


* <a href="{{ site.url }}/2013/11/update-powershell-monitor-and-report.html" style="background-color: white;" target="_blank"><u>[2013/11/28] - Version 1.6 -</u><u>[UPDATE] PowerShell - Monitor and Report Active Directory Group Membership Change</u></a>

* <a href="{{ site.url }}/2013/10/powershell-monitor-and-report-active.html" style="background-color: white;" target="_blank"><u>[2013/10/13] - Version 1.5-</u><u>PowerShell - Monitor and Report Active Directory Group Membership Change</u></a>



A couple of weeks back, my boss asked me to set a quick monitoring tool to check membership change made on Active Directory groups.
In my case here i'm talking about "Domain Admins" and "Enterprise Admins"

Unfortunately we currently don't have a tool in place to do this.

So why not taking advantage of Powershell ? :-)

<u>Required</u>
-A Script to monitor a list of Groups
-Create a Scheduled Task to run every minutes
(if you set the Scheduled task on a Windows Server 2008R2 or a Windows 7, you might want to take a look at my previous post: [Run this task every minute !!!]({{ site.url }}/2012/03/run-this-task-every-minute.html))

<u>Description</u>
This script will first check the members and export the result to a CSV file (if it does not exist yet) If a file already exist, it content will be compared with the result of $Members If different an email is sent to $EmailTo email with the member who has been added or removed.  

<u>Script</u>
[http://gallery.technet.microsoft.com/Monitor-Active-Directory-4c4e04c7](http://gallery.technet.microsoft.com/Monitor-Active-Directory-4c4e04c7)

<pre class="brush: powershell; ruler: true; first-line: 1;gutter: true;">#requires -version 2.0 

# ############################################################################# 
# NAME: TOOL-Monitor-AD_DomainAdmins_EnterpriseAdmins.ps1 
#  
# AUTHOR:  Francois-Xavier CAT 
# DATE:  2012/02/01 
# EMAIL: info@lazywinadmin.com 
#  
# COMMENT:  This script is monitoring group(s) in Active Directory and send an email when  
#     someone is added or removed 
# 
# REQUIRES:  
#  -Quest AD Snapin 
#  -A Scheduled Task 
# 
# VERSION HISTORY 
# 1.0 2012.02.01 Initial Version. 
# 1.1 2012.03.13 CHANGE to monitor both Domain Admins and Enterprise Admins
# 1.2 2013.09.23 FIX issue when specifying group with domain 'DOMAIN\Group'
#                CHANGE Script Format (BEGIN, PROCESS, END)
#                ADD Minimal Error handling. (TRY CATCH)
# 
# ############################################################################# 
  

BEGIN {
    TRY{
        # Monitor the following groups 
        $Groups =  "Domain Admins","Enterprise Admins"

        # The report is saved locally 
        $ScriptPath = (Split-Path ((Get-Variable MyInvocation).Value).MyCommand.Path) 
        $DateFormat = Get-Date -Format "yyyyMMdd_HHmmss" 

        # Email information
        $Emailfrom   = "sender@company.local" 
        $Emailto   = "receive@company.local" 
        $EmailServer  = "emailserver.company.local" 
  
        # Quest Active Directory Snapin 
         if (!(Get-PSSnapin Quest.ActiveRoles.ADManagement -ErrorAction Silentlycontinue)) 
          {Add-PSSnapin Quest.ActiveRoles.ADManagement}
        }
    CATCH{Write-Warning "BEGIN BLOCK - Something went wrong"}
}

PROCESS{

    TRY{
        FOREACH ($item in $Groups){

            # Let's get the Current Membership
            $GroupName = Get-Qadgroup $item
            $Members = Get-QADGroupMember $item -Indirect | Select-Object Name, SamAccountName, DN 
            $EmailSubject = "PS MONITORING - $GroupName Membership Change" 
   
            # Store the group membership in this file 
            $StateFile = "$($GroupName.domain.name)_$($GroupName.name)-membership.csv" 
   
            # If the file doesn't exist, create one
            If (!(Test-Path $StateFile)){  
                $Members | Export-csv $StateFile -NoTypeInformation 
                }
   
            # Now get current membership and start comparing it to the last lot we recorded 
            # catching changes to membership (additions / removals) 
            $Changes =  Compare-Object $Members $(Import-Csv $StateFile) -Property Name, SamAccountName, DN | 
                Select-Object Name, SamAccountName, DN,
                    @{n='State';e={
                        If ($_.SideIndicator -eq "=>"){
                            "Removed" } Else { "Added" }
                        }
                    }
  
            # If we have some changes, mail them to $Email 
            If ($Changes) {  
                $body = $($Changes | Format-List | Out-String) 
                $smtp = new-object Net.Mail.SmtpClient($EmailServer) 
                $smtp.Send($emailFrom, $emailTo, $EmailSubject, $body) 
                } 
            #Save current state to the csv 
            $Members | Export-csv $StateFile -NoTypeInformation -Encoding Unicode
        }
    }
    CATCH{Write-Warning "PROCESS BLOCK - Something went wrong"}

}#PROCESS
END{"Script Completed"}



#end region script

```

