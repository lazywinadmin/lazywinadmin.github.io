---
layout: single
title: Powershell - Launch/Start a process on a remote machine without powershell installed on it
excerpt: 
permalink: /2011/06/powershell-launchstart-process-on.html
tags: 
- powershell
- process
- remote
- scripting
- wmi
published: true
comments: true
---
How to launch/start a process on a remote machine when this one does not have Powershell ? ... WMI!

<b>Solution 1 ([Ravikanth Chaganti](http://www.ravichaganti.com/blog/?p=1979), see his WMI book! Must read!)</b>

```
$proc = Invoke-WmiMethod `
        -ComputerName Test `
        -Class Win32_Process `
        -Name Create `
        -ArgumentList "Notepad.exe"
Register-WmiEvent `
    -ComputerName test `
    -Query "Select * from Win32_ProcessStopTrace Where ProcessID=$($proc.ProcessId)" `
    -Action { Write-Host "Process ExitCode: $($event.SourceEventArgs.NewEvent.ExitStatus)" }
```

<b>Solution 2 ([The Lonely Administrator](http://jdhitsolutions.com/blog/))</b>


```
Function New-RemoteProcess {
    Param([string]$computername=$env:computername,
        [string]$cmd=$(Throw "You must enter the full path to the command which will create the process.")
    )

    $ErrorActionPreference="SilentlyContinue"

    Trap {
        Write-Warning "There was an error connecting to the remote computer or creating the process"
        Continue
    }    

    Write-Host "Connecting to $computername" -ForegroundColor CYAN
    Write-Host "Process to create is $cmd" -ForegroundColor CYAN

    [wmiclass]$wmi="\\$computername\root\cimv2:win32_process"

    #bail out if the object didn't get created
    if (!$wmi) {return}

    $remote=$wmi.Create($cmd)

    if ($remote.returnvalue -eq 0) {
        Write-Host "Successfully launched $cmd on $computername with a process id of" $remote.processid -ForegroundColor GREEN
    }
    else {
        Write-Host "Failed to launch $cmd on $computername. ReturnValue is" $remote.ReturnValue -ForegroundColor RED
    }
}
```

