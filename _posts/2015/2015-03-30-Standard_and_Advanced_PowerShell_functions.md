---
layout: single
title: Standard and Advanced PowerShell functions
excerpt: 
permalink: /2015/03/standard-and-advanced-powershell.html
tags: 
- powershell
- powershell blogging week
published: true
comments: true
---


This post is part of the <b>PowerShell Blogging Week (</b><a href="https://twitter.com/hashtag/PSBlogWeek?src=hash&amp;lang=en" target="_blank">#PSBlogWeek</a><b>)</b>, a series of coordinated posts designed to provide a comprehensive view of a particular topic.

This week topic will be focused on <b><u>Windows PowerShell Advanced Functions</u></b>.

> <u>In this series:</u>
> * <a href="{{ site.url }}/2015/03/standard-and-advanced-powershell.html" target="_blank"><b>Standard and Advanced PowerShell Functions</b></a> by <a href="https://twitter.com/LazyWinAdm" target="_blank">Francois-Xavier Cat (@LazyWinAdmin)</a> (March 30, 2015)
> * <a href="http://mikefrobbins.com/2015/03/31/powershell-advanced-functions-can-we-build-them-better-with-parameter-validation-yes-we-can/" target="_blank"><b>PowerShell Advanced Functions: Can we build them better? With parameter validation, yes we can!</b></a> by <a href="https://twitter.com/mikefrobbins" target="_blank">Mike F. Robbins (@mikefrobbins)</a> (March 31, 2015)
> * <a href="http://www.adamtheautomator.com/psbloggingweek-dynamic-parameters-and-parameter-validation/" target="_blank"><b>Dynamic Parameters and Parameter Validation</b></a> by <a href="https://twitter.com/adbertram" target="_blank">Adam Bertram (@adbertram)</a> (April 1, 2015)
> * <a href="http://bit.ly/1GlVVff" target="_blank"><b>Supporting WhatIf and Confirm in Advanced Functions</b></a> by <a href="https://twitter.com/JeffHicks" target="_blank">Jeffery Hicks (@JeffHicks)</a> (April 2, 2015)
> * <a href="http://www.sapien.com/blog/2015/04/03/advanced-help-for-advanced-functions/" target="_blank"><b>Advanced Help for Advanced Functions</b></a> by <a href="https://twitter.com/juneb_get_help" target="_blank">June Blender (@juneb_get_help)</a> (April 3, 2015)
> * <a href="http://learn-powershell.net/2015/04/04/a-look-at-trycatch-in-powershell" target="_blank"><b>A Look at Try/Catch</b></a> in PowerShell by <a href="https://twitter.com/proxb" target="_blank">Boe Prox (@proxb)</a> (April 4, 2015)

In this post, we'll discuss <b>Standard and Advanced Functions</b> and why you should write advanced functions.

When you have been working with PowerShell for some time, creating reusable tools is an obvious evolution to avoid writing the same code over and over again. You will want to have modular pieces of code that only do one job and do it well - that's the role of functions.

Let's suppose you have to accomplish a task that requires multiple lines of code, for example:

```powershell
# Computer System
Get-WmiObject -Class Win32_ComputerSystem
# Operating System
Get-WmiObject -class win32_OperatingSystem
# BIOS
Get-WmiObject -class Win32_BIOS
```

# Standard Function

A function is a list of statements wrapped into a scriptblock. A function has a name that you assign. You run those statements by simply typing the function name.

We can take the code above and wrap it into a function that we will call `Get-ComputerInformation`

```powershell
Function Get-ComputerInformation
{
    # Computer System
    Get-WmiObject -Class Win32_ComputerSystem
    # Operating System
    Get-WmiObject -class win32_OperatingSystem
    # BIOS
    Get-WmiObject -class win32_BIOS
}
```

It can be used this way:

<a href="{{ site.url }}/images/2015/20150330_Standard_and_Advanced_PowerShell_functions/Get-ComputerInformation2__928055762__-797x512.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150330_Standard_and_Advanced_PowerShell_functions/Get-ComputerInformation2__928055762__-797x512.png" /></a>

Now we can make our function more versatile by including a parameter that accepts different computer names. In the following example I'm adding the parameter `$ComputerName` and some extra code on the WMI queries to pass the machine name.

For the Output, I'm creating a new powershell object to only return some selected information.


```powershell
Function Get-ComputerInformation
{
    PARAM ($ComputerName)
    # Computer System
    $ComputerSystem = Get-WmiObject -Class Win32_ComputerSystem -ComputerName $ComputerName
    # Operating System
    $OperatingSystem = Get-WmiObject -class win32_OperatingSystem -ComputerName $ComputerName
    # BIOS
    $Bios = Get-WmiObject -class win32_BIOS -ComputerName $ComputerName
    
    # Prepare Output
    $Properties = @{
        ComputerName = $ComputerName
        Manufacturer = $ComputerSystem.Manufacturer
        Model = $ComputerSystem.Model
        OperatingSystem = $OperatingSystem.Caption
        OperatingSystemVersion = $OperatingSystem.Version
        SerialNumber = $Bios.SerialNumber
    }
    
    # Output Information
    New-Object -TypeName PSobject -Property $Properties
    
}
```

<a href="{{ site.url }}/images/2015/20150330_Standard_and_Advanced_PowerShell_functions/Get-ComputerInformation5__1609500709__-810x218.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;">
  <img border="0" src="{{ site.url }}/images/2015/20150330_Standard_and_Advanced_PowerShell_functions/Get-ComputerInformation5__1609500709__-810x218.png" />
</a>

We created a very simple and nice tool that can query different machines by editing the ComputerName parameter. What can we do to make this tool more efficient?

# Advanced Function

Advanced functions allow you to write functions that can act like cmdlets. This means that you can make your functions more robust, handle errors, support Verbose, Debug, Dynamic Parameters, Validate input, ... just to name a few.

Those features would be typically available with compiled cmdlet using a Microsoft .NET Framework language (for example with C#). However, Advanced Functions make it simple and are written in Windows PowerShell in the same way that other functions or script blocks are written.

<b><u>How do I make a function advanced?</u></b>
Pretty simple, all you need is the attribute `CmdletBinding`.
<u>Note:</u> You can also use the `[Parameter()]` attribute to enable the advanced features.


Let's apply this to our function.


```powershell
Function Get-ComputerInformation
{
    [CmdletBinding()]
    PARAM ($ComputerName)
    # Computer System
    $ComputerSystem = Get-WmiObject -Class Win32_ComputerSystem -ComputerName $ComputerName
    # Operating System
    $OperatingSystem = Get-WmiObject -Class win32_OperatingSystem -ComputerName $ComputerName
    # BIOS
    $Bios = Get-WmiObject -class win32_BIOS -ComputerName $ComputerName
    
    # Prepare Output
    $Properties = @{
        ComputerName = $ComputerName
        Manufacturer = $ComputerSystem.Manufacturer
        Model = $ComputerSystem.Model
        OperatingSystem = $OperatingSystem.Caption
        OperatingSystemVersion = $OperatingSystem.Version
        SerialNumber = $Bios.SerialNumber
    }
    
    # Output Information
    New-Object -TypeName PSobject -Property $Properties
    
}
```

That's it! This is all you need to make an Advanced Function.

If you take a look at the parameters available with and without the CmdletBinding attribute, you'll be surprised by all the greatness this little word enables to our function.

<b>Standard Function</b> (Without `CmdletBinding`)

<a href="{{ site.url }}/images/2015/20150330_Standard_and_Advanced_PowerShell_functions/FunctionParams3__691243369__-637x95.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150330_Standard_and_Advanced_PowerShell_functions/FunctionParams3__691243369__-637x95.png" /></a>

<b>Advanced Function</b> (With `CmdletBinding`)

<a href="{{ site.url }}/images/2015/20150330_Standard_and_Advanced_PowerShell_functions/AdvancedFunctionParams3__1105038008__-661x353.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;">
  <img border="0" src="{{ site.url }}/images/2015/20150330_Standard_and_Advanced_PowerShell_functions/AdvancedFunctionParams3__1105038008__-661x353.png" />
</a>

The common parameters are available with any cmdlet and on advanced functions that use the CmdletBinding attribute or the Parameter attribute. They can, for example, help you handle different types of error, warnings or show some programmer-level details about the operation performed.

I won't go into too much detail about those, you can check this article <a href="https://technet.microsoft.com/en-us/library/hh847884.aspx" target="_blank">`about_CommonParameters`</a> for more information.

<b><u>Why should you use Advanced Function over the Standard?</u></b>

Standard functions are great for simple tasks that will make you save lines of code or as "helpers" for another advanced function.

If you plan to create a tool that needs to work in many scenarios such as inside a pipeline, to validate the data passed to its parameters, to handles errors, to be compatible with -confirm and -whatif switches, to show verbose messages, ... or if you simply plan to share and add this function into a module, then Advanced function is the way to go.

As we saw earlier, making your function "Advanced" is really simple and adds some really great features.

Using those useful features can help you create a really strong reusable tool.



<b><u>Accept Pipeline Input and Verbose message</u></b>

As a final example, here is how you can simply make your advanced function <u>accept input from the pipeline</u> and show some <u>verbose messages</u> to keep track of your function's progress.

Adding support for pipeline can be done by adding the static parameter `ValueFromPipeline` inside the Parameter attribute: `[Parameter(ValueFromPipeline)]`. In my example I added this on the parameter we defined ComputerName.

Verbose messages are available using the `Write-Verbose` cmdlet. Remember that you will need to use the switch `-verbose` when you call your function to show those messages.



```powershell
Function Get-ComputerInformation
{
    [CmdletBinding()]
    PARAM (
        [Parameter(ValueFromPipeline)]
        $ComputerName = $env:COMPUTERNAME
    )
    PROCESS
    {
        Write-Verbose -Message "$ComputerName"
        
        # Computer System
        $ComputerSystem = Get-WmiObject -Class Win32_ComputerSystem -ComputerName $ComputerName
        # Operating System
        $OperatingSystem = Get-WmiObject -class win32_OperatingSystem -ComputerName $ComputerName
        # BIOS
        $Bios = Get-WmiObject -class win32_BIOS -ComputerName $ComputerName
        
        # Prepare Output
        Write-Verbose -Message "$ComputerName - Preparing output"
        $Properties = @{
            ComputerName = $ComputerName
            Manufacturer = $ComputerSystem.Manufacturer
            Model = $ComputerSystem.Model
            OperatingSystem = $OperatingSystem.Caption
            OperatingSystemVersion = $OperatingSystem.Version
            SerialNumber = $Bios.SerialNumber
        } #Properties
        
        # Output Information
        Write-Verbose -Message "$ComputerName - Output Information"
        New-Object -TypeName PSobject -Property $Properties
    } #PROCESS
} #Function

```



In this example, I'm loading a list of machines inside the text file computers.txt. Those machines are passed to the parameter "ComputerName". I also used the verbose switch which lets me follow the sequence of my tool.


<a href="{{ site.url }}/images/2015/20150330_Standard_and_Advanced_PowerShell_functions/Get-ComputerInformation8__39775431__-822x454.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;">
  <img border="0" src="{{ site.url }}/images/2015/20150330_Standard_and_Advanced_PowerShell_functions/Get-ComputerInformation8__39775431__-822x454.png" />
</a>


# Resources on Advanced Functions

Here are some great resources if you want to learn more on PowerShell Functions:

* [about_Functions](https://technet.microsoft.com/en-us/library/hh847829.aspx)
* [about_Functions_Advanced](https://technet.microsoft.com/en-us/library/hh847806.aspx)
* [about_Functions_CmdletBindingAttribute](https://technet.microsoft.com/en-us/library/hh847872.aspx)
* [about_Functions_Advanced_Methods](https://technet.microsoft.com/en-us/library/hh847781.aspx)
* [about_Functions_Advanced_Parameters](https://technet.microsoft.com/en-us/library/hh847743.aspx)
* [about_Functions_OutputTypeAttribute](https://technet.microsoft.com/en-us/library/hh847785.aspx)

# PowerShell Blogging Week

Follow the hashtag <a href="https://twitter.com/hashtag/PSBlogWeek?src=hash&amp;lang=en" target="_blank">#PSBlogWeek</a> on twitter and make sure to follow the contributors below :-)

| Names        | Twitter           | Blog  |
| ------------- |-------------| -----|
| Adam Bertram | [@adbertam](http://twitter.com/adbertam) | http://www.adamtheautomator.com/ |
| Boe Prox | [@proxb](http://twitter.com/proxb) | http://learn-powershell.net/ |
| Francois-Xavier Cat | [@lazywinadmin](http://twitter.com/lazywinadmin) | http://www.lazywinadmin.com/ |
| Jeffery Hicks | [@jeffhicks](http://twitter.com/jeffhicks) | http://jdhitsolutions.com/blog/ |
| June Blender | [@juneb_get_help](http://twitter.com/juneb_get_help) | http://www.sapien.com/blog/ |
| Mike F. Robbins | [@mikefrobbins](http://twitter.com/mikefrobbins) | http://mikefrobbins.com/ |