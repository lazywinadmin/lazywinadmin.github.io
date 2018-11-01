---
layout: single
title: Finding VIBs on ESXi hosts with PowerCLI
excerpt: 
permalink: /2014/11/finding-vibs-on-esxi-hosts-with-powercli.html
tags: 
- oneliner
- powercli
- powershell
- vib
- vmware
published: true
comments: true
---


<a href="{{ site.url }}/images/2014/20141126_Finding_VIBs_on_ESXi_hosts_with_PowerCLI/powercli-110x110__1784526564__-110x110.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20141126_Finding_VIBs_on_ESXi_hosts_with_PowerCLI/powercli-110x110__1784526564__-110x110.png" /></a>I did not work with PowerCli for the last couple of months and I had an interesting question from one of my follower Ivo from Netherlands.

He was trying to retrieve the VIB information with the name `net-e1000e` from all his VMware Hosts using the PowerShell and the Snapin PowerCli from VMware.

> <b><u>What is a VIB ?</u></b>
VIB stands for vSphere Installation Bundle. At a conceptual level a VIB is somewhat similar to a tarball or ZIP archive in that it is a collection of files packaged into a single archive to facilitate distribution


Here is the piece of code to retrieve this information.
The output is sent to `Out-GridView` which create a simple GUI.

```powershell
Get-VMHost | Where-Object { $_.ConnectionState -eq "Connected" } | Foreach-Object {
    $CurrentVMhost = $_
    TRY
    {
        # Exposes the ESX CLI functionality of the current host
        $ESXCLI = Get-EsxCli -VMHost $CurrentVMhost.name
        # Retrieve Vib with name 'net-e1000e'
        $ESXCLI.software.vib.list() | Where-Object { $_.Name -eq "net-e1000e" } |
        FOREACH
        {
            $VIB = $_
            $Prop = [ordered]@{
                'VMhost' = $CurrentVMhost.Name
                'ID' = $VIB.ID
                'Name' = $VIB.Name
                'Vendor' = $VIB.Vendor
                'Version' = $VIB.Version
                'Status' = $VIB.Status
                'ReleaseDate' = $VIB.ReleaseDate
                'InstallDate' = $VIB.InstallDate
                'AcceptanceLevel' = $VIB.AcceptanceLevel
            }#$Prop
            # Output Current Object
            New-Object PSobject -Property $Prop
        }#FOREACH
    }#TRY
    CATCH
    {
        Write-Warning -Message "Something wrong happened with $($CurrentVMhost.name)"
        Write-Warning -Message $Error[0].Exception.Message
    }
} | Out-GridView
```

# Script Version

I also wrote a more complete version <a href="https://github.com/lazywinadmin/PowerShell/tree/master/VMWARE-HOST-List_VIB" target="_blank">available on Github</a>
