---
layout: single
title: "Retrieving the parameters used to run a script"
excerpt: "When troubleshooting scripts, it comes handy to be able to log which parameters were used to invoke a script or a function. Here is one way to retrieve the information"
permalink:
tags: 
- powershell
- powershelltip
- myinvocation
- pscmdlet
- automaticvariable
- variable
categories:
- powershell
published: true
comments: true
author_profile: false
header:
  image: images/headers/Code01_1920x500.jpg
  caption: ""
  teaserlogo: images/2017/2017-03-29-MyInvocation_Commandused/icon.png
---

## Using $MyInvocation
If you want to show the invocation line used to invoke a powershell script or function, you can use the automatic variable called ```$MyInvocation``` and the property ```Line``` to retrieve this information

```powershell
$MyInvocation.Line
```

Here is an example, assume you have the following powershell script called ```MyInvocation.ps1``` with following content:

```powershell
PARAM(
    $A,
    $B,
    $C
)
$myinvocation.line
```

If you execute the script using the following line:
```
.\MyInvocation.ps1 -A test -B test
```

It will output the following
```
.\MyInvocation.ps1 -A test -B test
```

As you can see, it is easy to retrieve the command used invoked with its parameters and values.

## Using $PSCmdlet
If your script or function has the advanced features enabled, using ```[CmdletBinding()]``` or ```[parameter()]``` (on one of the parameters), you will be able to use ```$PSCmdlet.MyInvocation.Line``` to retrieve the same information.

Example, same script as above but with the ```[CmdletBinding()]```
```powershell
[CmdletBinding()]
PARAM(
    $A,
    $B,
    $C
)

$PSCmdlet.myinvocation.line
```

If I invoke the script using:
```
.\MyInvocation.ps1 -C test -B test
```

I will get the following output:
```
.\MyInvocation.ps1 -C test -B test
```

Note that ```$MyInvocation``` is still available.