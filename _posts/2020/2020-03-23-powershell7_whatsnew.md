---
layout: single
title: "PowerShell 7 - What's new ?"
excerpt: "Microsoft recently released a new version of PowerShell, this post is a quick run-through the new features and new cmdlets that I presented at the last French PowerShell User Group meeting"
permalink:
tags: 
  - powershell7
  - powershell
categories:
published: true
comments: true
header:
  teaserlogo:
  teaser: ''
  image: images/headers/mountain01_1920x500.jpg
  caption:
gallery:
  - image_path: ''
    url: ''
    title: ''
toc: true
toc_label: "Table of content"
toc_sticky: true
toc_icon: "terminal"
classes: wide
---

{% capture mynote%}
**Tested on** PowerShell 7.0.0 on Ubuntu 18.04
{% endcapture %}
{{mynote}}{: .notice--info}


Last week I gave a [presentation on "PowerShell 7 - What's new ?"](https://www.youtube.com/watch?v=nqb6s0PYfM0) at the French PowerShell User Group.

I wanted to highlight some of the new features mentioned during this presentation and also some discovered since the release.

## PowerShell 7

### What changed ?

- PowerShell 7 (`Core` has been removed from the name)
- First Long Term Servicing (LTS) release
- PowerShell 7 is based on .NET Core 3.1
- Supported Operating Systems:
  - Windows 8.1, and 10
  - Windows Server 2012, 2012 R2, 2016, and 2019
  - macOS 10.13+
  - Red Hat Enterprise Linux (RHEL) / CentOS 7
  - Fedora 30+
  - Debian 9
  - Ubuntu LTS 16.04+
  - Alpine Linux 3.8+
  - ARM32 and ARM64 flavors of Debian, Ubuntu, and ARM64 Alpine Linux.
- Unsupported Operating System (where PowerShell 7 works)
  - Kali Linux

## Installation

PowerShell can be installed using different methods:

- Windows: `iex "& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI"'`
- Linux: `'wget https://aka.ms/install-powershell.sh; sudo bash install-powershell.sh; rm install-powershell.sh'`
- MacOS: `brew cask install powershell`
- Using the .NET SDK: `dotnet tool install --global PowerShell`

Other methods are available [here](https://github.com/PowerShell/PowerShell/releases/tag/v7.0.0).


## ForEach-Object -Parallel

### What is it ?

- Brings built-in parallelism mechanism (leveraging runspaces)
  - Similar to what some other modules/scripts can already do (ThreadJob, PoshRSJob, Invoke-Parallel)
- Control number of Threads started using `-ThrottleLimit`
- Control TimeOut of each Thread using `-TimeoutSeconds`
- Can be managed by PowerShell Jobs using `-AsJob`
- Does not apply to `.ForEach()` method or `ForEach` statement/loop.

Here is the syntax of the parameter set

```powershell
ForEach-Object -Parallel <scriptblock>
    [-InputObject <psobject>]
    [-ThrottleLimit <int>]
    [-TimeoutSeconds <int>]
    [-AsJob]
    [-WhatIf] [-Confirm] [<CommonParameters>]
```

### Usage

```powershell
1..5 | Foreach-Object -Parallel {$_}
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_001.png){: .align-center}


```powershell
# Using Throttle (default is 5)
#  Here I'm using Get-Runspace to show the number of live runspaces
1..30 | Foreach-Object -Parallel { $((Get-Runspace).count);Start-Sleep -sec 3 } -ThrottleLimit 20
```

Let's set a maximum of 20 threads and try to hit the limit.

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_002.png){: .align-center}


We can also show the current Process ID, Thread ID and RunSpace ID by executing the following.

```powershell
# Show Runspace/Thread ID
1..10 | Foreach-Object -Parallel {
    "$_ - PID: $PID - Thread $([System.Threading.Thread]::CurrentThread.ManagedThreadID) - Runspace ID $(([System.Management.Automation.Runspaces.Runspace]::DefaultRunSpace).id)"
}
# Difference between Process/Thread/Runspace:
#   https://stackoverflow.com/questions/54503232/process-vs-instance-vs-runspace-in-powershell
# Process   : Program that run an instruction set
# Thread    : Single instruction
# Runspace  : New PowerShell engine under the same Program (process)

# Worth noting.. Invoke-Command already have its own parallelism systems
# so not always a good things to combine the two
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_004.png){: .align-center}

### Performance

Is `-Parallel` really faster than the default `-Process` parameter ? Well it depends on your dataset. Parallel does not mean faster.

Let's compare:
* `-Process`
* `-Parallel` with the default 5 threads
* `-Parallel` with 20 threads

```powershell
# Fast (Foreach-Object -Process )
(Measure-Command { 1..100 | Foreach-Object -Process {$_} }).TotalMilliseconds
# Slower (Foreach-Object -Parallel with default 5 threads limit )
(Measure-Command { 1..100 | Foreach-Object -Parallel {$_} }).TotalMilliseconds
# Slower (Foreach-Object -Parallel with default 20 threads limit )
(Measure-Command { 1..100 | Foreach-Object -Parallel {$_} -ThrottleLimit 20 }).TotalMilliseconds
```

As we can see `-Process` is actually faster in this scenario.

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_005.png){: .align-center}

Now let's add a 1 second sleep to make the thread last a bit longer.

```powershell
# -Process
(Measure-Command { 1..10 | Foreach-Object -Process {Start-Sleep -Seconds 1} }).TotalMilliseconds
# -Parallel (5 threads limit)
(Measure-Command { 1..10 | Foreach-Object -Parallel {Start-Sleep -Seconds 1} }).TotalMilliseconds
# -Parallel (10 threads limit)
(Measure-Command { 1..10 | Foreach-Object -Parallel {Start-Sleep -Seconds 1}-ThrottleLimit 10 }).TotalMilliseconds
```

Now we can see the benefits of using this parameter when some tasks can take longer.

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_006.png){: .align-center}

### Passing data to the runspaces

Passing data to each runspace can be done by specify the `$using:` scope in front of your variable name. Similar to what you have to do for remote variable.

```powershell
# Passing data to the runspaces
$Message = "Output:"

1..8 | ForEach-Object -Parallel {
    "$Using:Message $_"
    Start-Sleep 1
} -ThrottleLimit 4
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_007.png){: .align-center}

### AsJob

`-Parallel` also supports jobs, where you can choose to have a job object returned instead of having results written to the console.

```powershell
# Run in parallel as a PowerShell job
1..10 | ForEach-Object -Parallel {
    "Output: $_"
    Start-Sleep 1
} -ThrottleLimit 2 -AsJob |
Receive-Job -Wait
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_008.png){: .align-center}

### Storing data from multiple runspaces

If you are gathering information from different locations, you might want to have a single place to store the data.

One way is to use the dictionnary object `[System.Collections.Concurrent.ConcurrentDictionary]`, example:

```powershell
# Create dictionary
$threadSafeDictionary = [System.Collections.Concurrent.ConcurrentDictionary[string,object]]::new()

# Retrieve files
$Files = "~\code\Presentations\20200310-PowerShell7-whats_new\"
Get-Childitem "$Files*.txt" | ForEach-Object -Parallel {
    # Retrieve mention of a the word 'powershell' in txt files
    $result = (Get-Content $_ | Select-string powershell).linenumber

    # Append information to dictionary outside the runspace
    $dict = $using:threadSafeDictionary
    $dict.TryAdd($_.basename, $result)
}

# Show content
$threadSafeDictionary

$threadSafeDictionary.Keys
$threadSafeDictionary.Values
$threadSafeDictionary["github"]
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_011.png){: .align-center}

### Set a timeout

You might want to set a "Time to live" limit in second(s) on each of your Runspaces. This can be done using the `-TimeoutSeconds` parameter, example:

```powershell
# Set timeout
1..5 | Foreach-Object -Parallel {Start-Sleep -s 10} -TimeoutSeconds 1
```

Here is the output if the time exceed the timeout specified

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_012.png){: .align-center}


## ErrorView 'ConciseView'

A new ErrorView was added to help clarify the message show to the user. Here is a list of the current views available:

``` powershell
# Get Default ErrorView
$ErrorView # ConciseView is default

# List ErrorViews available
[Enum]::getvalues([System.Management.Automation.ErrorView])
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_015.png){: .align-center}


We can compare the different ErrorViews available. You will probably be familiar with the `NormalView` which was used by default in previous PowerShell versions.

```powershell
# CATEGORYVIEW
$ErrorView = 'CategoryView'
Get-ChildItem -Path /fake

# NORMALVIEW
$ErrorView = 'NormalView'
Get-ChildItem -Path /fake

# CONCISEVIEW
$ErrorView = 'ConciseView'
Get-ChildItem -Path /fake
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_016.png){: .align-center}


Another interesting thing to note in PowerShell 7 is the information showed when a Script generate an error with the `ConciseView`.

```powershell
./errortest.ps1
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_017.png){: .align-center}


A new property `ErrorAccentColor` was also added to the `$host.PrivateData` object to control the Error message color (if you need to customize this for your terminal)

```powershell
$Host.PrivateData.ErrorAccentColor = 'Magenta'
```
![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_018.png){: .align-center}


## Get-Error

A new Cmdlet `Get-Error` was added to retrieve the details of an error. This was previously available but you had to digg inside the Error object to retrieve all these information.

```powershell
# Detailed view of the fully qualified error (for the last error)
Get-Error

# You can also pipe an Error object to the Cmdlet
$Error[0] | Get-Error

# Retrieve the last 2 errors.
Get-Error -Newest 2
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_019.png){: .align-center}


## $ErrorActionPreference = 'Break'

A new ErrorActionPreference `Break` was added in PowerShell 7. This allows you to enter the debugger when an error occurs or when an exception is raised.

```powershell
$ErrorActionPreference = 'Break'
Get-ChildItem -Path /fake
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_032.png){: .align-center}


## Null-Coalescing Operators

Null coalescing operators removes the need for `if` and `else` statements if you want to get the value of a statement if it's not `$null` or return something else if it is `$null`. Note that this doesn't replace the check for a boolean value of true or false, it's only checking if the returned value is `$null`

### Operator ??


`<statement> ?? <What to do if statement is null>`

```powershell
## Before PowerShell 7
$x = $null
if ($null -eq $x) {'x is null'}

## PowerShell 7
# example A - $x is null
$x = $null
$x ?? 'x is null'   # if $x is null, show 'x is null'. Else show $x value

# example B - $x is null
$x = $null
$x ?? 2

# example C - $x is NOT null
$x = 1
$x ?? 'x is null'

# example D - if posh-git is not present, install it
(Get-Module -ListAvailable posh-git) ?? (Install-Module posh-git -WhatIf -Force)

# example E - if file 'stuff.txt' exists show content, else get some content and create file
(Get-Content ./stuff.txt -ea 0) ?? ((iwr 'http://lazywinadmin.com').content > ./stuff.txt)
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_020.png){: .align-center}


### Operator ??=


`<statement> ??= <Value to assign if statement is null>`

```powershell
## Before PowerShell 7
$x = $null
if ($null -eq $x) {$x=5}

## PowerShell 7
$x = $null
$x ??= 5

$x # $x eq 5
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_021.png){: .align-center}


## Pipeline Chain Operators

```powershell
# Summarizing what Pipeline Chain Operators do:
Invoke-Something && "Execute if Invoke-Something worked"
Invoke-Something || "Execute if Invoke-Something failed"
```

These two new operators are leveraging `$LASTEXITCODE` and `$?` variables to know if a statement is successful or not.

As a reminder, here is the behavior of these 2 variables:

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_022.png){: .align-center}

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_023.png){: .align-center}

Now let's see how to use the two new operators

### Operator &&

The operator `&&` (double Ampersand).

`<Command A> && <Command to execute if Command A was successful>`

```powershell
## Before PowerShell 7
Get-Process -id $PID ; if ($?) { 'Second command' }

## PowerShell 7
# Example A
Get-Process -id $PID && 'Second command'

# Example B
install-module adsips -Force && import-module adsips -passthru

# Example C
sudo apt update && sudo apt upgrade
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_024.png){: .align-center}


### Operator ||

The operator `||` (double Pipe).

`<Command A> && <Command to execute if Command A failed>`

```powershell
## Before PowerShell 7
Get-Process -id abc ; if (-not$?) { Write-Output 'Second command' }

## PowerShell 7
# Example A
#  if process 'abc' is not present, write 'Second command'
Get-Process -id abc || Write-Output 'Second command'

# Example B
#  if file does not exist, download content and save to file
(Get-Content ~/lazy.txt) || iwr http://lazywinadmin.com -outfile ~/lazy.txt

# Example C (second command does execute because of $ErrorActionPreference 'Continue')
# ErrorActionPreference obviously is taken into account
$ErrorActionPreference = 'Continue' # Default 'Continue'
1/0 || "Wow something went wrong"

# Example D (second command does not execute because of $ErrorActionPreference 'Stop')
$ErrorActionPreference = 'Stop' # Default 'Continue'
1/0 || "Wow something went wrong"
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_026.png){: .align-center}

## Ternary Operator

You can use the ternary operator as a replacement for the `if-else` statement in simple conditional cases.

`<evaluation> ? <if-true> : <if-false>`

```powershell
## Before PowerShell 7
if((Get-Module -Name Adsips -listavailable){
    "Already installed"
}else{
    Install-Module -Name ADSIPS -Force -whatif
}

## PowerShell 7
# Example A
(Get-Module -Name Adsips -listavailable) ? "Already installed" : (Install-Module -Name ADSIPS -Force -whatif)

# Example B
(get-service myservice) ? (irm http://myservice) : (installmyservice.ps1;irm http://myservice)
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_027.png){: .align-center}


## Skip HTTP Error with Web Cmdlets

The two Web Cmdlets `Invoke-RestMethod` and `Invoke-WebRequest` received two new parameters: `SkipHttpErrorCheck` and `StatusCodeVariable`.

### SkipHttpErrorCheck

This parameter causes the cmdlets to ignore HTTP error statuses and continue to process responses. The error responses are written to the pipeline just as if they were successful.

In previous versions you would have to parse the error object yourself.

Here is an example WITHOUT it

```powershell
# Querying a page that does not exist
Invoke-WebRequest -uri 'http://lazywinadmin.com/fakepage'
```
![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_029.png){: .align-center}

Here is an example WITH `-SkipHttpErrorCheck`. As you can see the response is processed normaly.

```powershell
Invoke-RestMethod -uri 'http://lazywinadmin.com/fakepage' -SkipHttpErrorCheck
```
![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_035.png){: .align-center}

### StatusCodeVariable

This parameter specifies a variable that's assigned a status code's integer value. 

```powershell
$Output = Invoke-RestMethod -uri 'http://lazywinadmin.com/fakepage' -SkipHttpErrorCheck -StatusCodeVariable mystatuscode
$mystatuscode # Contains the status code
```
![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_036.png){: .align-center}

## Select-String Emphasis

`Select-String` allows you to search accross files for different words, patterns,...

In PowerShell 7, an Emphasis mode was added by default. This can be disabled using `-NoEmphasis`.

### Emphasis pattern

```powershell
# highlights the string that matches the pattern you searched
$Files = "~\code\Presentations\20200310-PowerShell7-whats_new\"
Get-Childitem "$Files*.txt" |
    Select-String -Pattern 'powershell'
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_013.png){: .align-center}

### Emphasis pattern with regex

Here is another example if you leverage regex, the string matching your pattern will be highlighted

```powershell
# highlights the string that matches the pattern you searched
$Files = "~\code\Presentations\20200310-PowerShell7-whats_new\"
Get-Childitem "$Files*.txt" |
    Select-String -Pattern 'github\w+'
```
![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_014.png){: .align-center}


## Split Negative max-substring

When using `-split` you can specify the maximum number of times that a string is split. The default is all the substrings split by the delimiter. If there are more substrings, they are concatenated to the final substring. If there are fewer substrings, all the substrings are returned. A value of 0 returns all the substrings.

Introduced in PowerShell 7, you can now specify a negative number. Negative values return the amount of substrings requested starting from the end of the input string.

```powershell
$c = "Mercury,Venus,Earth,Mars,Jupiter,Saturn,Uranus,Neptune"
$c -split ",", 5

$c = "Mercury,Venus,Earth,Mars,Jupiter,Saturn,Uranus,Neptune"
$c -split ",", -5
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_030.png){: .align-center}


## New Version Notification

By default, once a day PowerShell query online services to determine if a newer version is available. See [Microsoft documentation](https://docs.microsoft.com/en-us/powershell/scripting/whats-new/what-s-new-in-powershell-70?view=powershell-7#new-version-notification) for more details.

You can however configure this using the `$Env:POWERSHELL_UPDATECHECK` variable. Note that it does not exist by default.

Here is the feature in action by launching PowerShell 7 RC3 installed on my machine.

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_028.png){: .align-center}

## Windows OS features

Some other new features are only available on Windows Operating System. Here is a short summary of what I found.

### Import-Module -UseWindowsPowerShell

From PowerShell 7, this will open a Windows PowerShell process and load the module specified. This made me think about implicit remoting available when using `-PSSession` or `-CimSession`.

```powershell
Import-Module ActiveDirectory -UseWindowsPowerShell
```

### Graphical interface is back

The following tools are back in PowerShell 7 (previously only available on Windows PowerShell)

* `Out-GridView` example: `Get-Process -Name Chrome | Out-GridView`
* `Get-Help -ShowWindow` example: `Get-Help Get-Process -ShowWindow`
* `Show-Command` example: `Show-Command -Name Get-Process`

### Get-HotFix

You can now list the Patches installed inside PowerShell 7.


## Miscellaneous

### Group-Object -CaseSensitive fixed

```powershell
$myobjects = @(
    [PSCustomObject]@{
        Capitonym = 'lazy'
    }
    [PSCustomObject]@{
        Capitonym = 'Lazy'
    }
)
$myobjects | Group-Object -Property Capitonym -AsHashTable -CaseSensitive
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_034.png){: .align-center}


### PowerShell Jobs

```powershell
## Foreach-Object parallel can use jobs
1..100 | Foreach-Object -Parallel {"Stuff $_"} -AsJob |Receive-Job -Wait

## Start-job has a WorkDirectory parameter
Start-job -ScriptBlock {"Hey"} -WorkingDirectory (Resolve-Path ~)|Receive-Job -Wait

## Start-job has a PSVersion parameter (only works on Windows)
Start-job -ScriptBlock {"Hey"} -PSVersion 5.1 |Receive-Job -Wait
## Start-job - RunAs32 parameter does not work on 64bits systems
##  to start a 32-bit PowerShell (pwsh) process with RunAs32, you need to have the 32-bit PowerShell installed.
```

### Get-History shows Duration

```powershell
Get-History
```

![image-center](/images/2020/2020-03-23-powershell7_whatsnew/Terminal_033.png){: .align-center}


## Resources

- [Official announcement](https://devblogs.microsoft.com/powershell/announcing-the-powershell-7-0-release-candidate/)
- [Microsoft Documentation, PowerShell 7 What's new](https://docs.microsoft.com/en-us/powershell/scripting/whats-new/what-s-new-in-powershell-70?view=powershell-7)
- [ChangeLog](https://github.com/PowerShell/PowerShell/blob/master/CHANGELOG/7.0.md)
- [Breaking changes and Improvements](https://docs.microsoft.com/en-us/powershell/scripting/whats-new/what-s-new-in-powershell-70?view=powershell-7#breaking-changes-and-improvements)
- [Foreach-Object -Parallel](https://devblogs.microsoft.com/powershell/powershell-foreach-object-parallel-feature/)
- [SecretsManagement module](https://devblogs.microsoft.com/powershell/secrets-management-module-vault-extensions/)
- [Using thread safe variable references](https://docs.microsoft.com/en-us/dotnet/standard/collections/thread-safe/)
- [PowerShell 7 - New JSON Cmdlets](https://powershell.anovelidea.org/powershell/ps7now-changes-to-json-cmdlets/)
- [PowerShell 7 for Programmers](https://colincogle.name/blog/2019-12-22-powershell-7-for-programmers.html)