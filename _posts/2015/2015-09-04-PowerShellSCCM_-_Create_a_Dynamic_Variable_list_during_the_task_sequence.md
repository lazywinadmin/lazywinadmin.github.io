---
layout: single
title: PowerShell/SCCM - Create a Dynamic Variable list during the task sequence
excerpt: 
permalink: /2015/09/powershellsccm-create-dynamic-variable.html
tags: 
- configmgr
- powershell
- sccm
- sccm osd
- sccm task sequence
published: true
comments: true
---


<a href="{{ site.url }}/images/2015/20150904_PowerShellSCCM_-_Create_a_Dynamic_Variable_list_during_the_task_sequence/SCCM2012R2_big__899663529__-256x256.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="140" src="{{ site.url }}/images/2015/20150904_PowerShellSCCM_-_Create_a_Dynamic_Variable_list_during_the_task_sequence/SCCM2012R2_big__843211874__-200x200.png" width="140" /></a>In <a href="{{ site.url }}/2015/09/powershellsccm-find-applications.html" target="_blank">my previous article</a> I talked about SCCM Application and how to retrieve the applications targeted to a user.

Today I'll show how we can build a function to create a list of dynamic variables. This would be used in a Task Sequence during the Operating System Deployment in the task **Install Application**.

First we will need to find the list of applications and then create a variable with a specific pattern for each of them.


## What does it look like inside the task Sequence ?

Before we dig into the PowerShell, I think it is important to understand where everything will goes.

In the following task "<b><i>Run PowerShell Shell Script</i></b>", the script will retrieve in SCCM all the Applications advertised on the users (<a href="{{ site.url }}/2015/09/powershellsccm-find-applications.html" target="_blank">showed in previous article</a>) and then create a bunch of variables that will be used in the task "<b><i>Install Application</i></b>".

<a href="{{ site.url }}/images/2015/20150904_PowerShellSCCM_-_Create_a_Dynamic_Variable_list_during_the_task_sequence/SCCM_TaskSequence-DynamicVariable01__799027215__-889x655.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="293" src="{{ site.url }}/images/2015/20150904_PowerShellSCCM_-_Create_a_Dynamic_Variable_list_during_the_task_sequence/SCCM_TaskSequence-DynamicVariable01__1436397956__-400x295.png" width="400" /></a>



When you use the task "<b><i>Install Application</i></b>" with the option '<i>Install applications according to dynamic variable list</i>', the task expect to find a bunch of variables that start by "<i>Base Variable Name</i>" specified below, here"<i>FX</i>".

So you should have variables such as:

```
FX01
FX02
FX03
```

Each of those variables value must contain the name of the Application you want to deploy.

<a href="{{ site.url }}/images/2015/20150904_PowerShellSCCM_-_Create_a_Dynamic_Variable_list_during_the_task_sequence/SCCM_TaskSequence-DynamicVariable02__51884747__-874x640.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="292" src="{{ site.url }}/images/2015/20150904_PowerShellSCCM_-_Create_a_Dynamic_Variable_list_during_the_task_sequence/SCCM_TaskSequence-DynamicVariable02__1213736718__-400x293.png" width="400" /></a>


## Retrieving the application targeted to a user

Now let's focus on PowerShell. Assuming you have following list of application targeted to a user:

<a href="{{ site.url }}/images/2015/20150904_PowerShellSCCM_-_Create_a_Dynamic_Variable_list_during_the_task_sequence/LazyWinAdmin-DynamicVariableList04__963896766__-772x438.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150904_PowerShellSCCM_-_Create_a_Dynamic_Variable_list_during_the_task_sequence/LazyWinAdmin-DynamicVariableList04__963896766__-772x438.png" /></a>

## Creating a list of variable with a specific pattern


First we need to work on the variable incrementation, this can easily be done with a counter, the list of application and some Composite Formatting.

<a href="{{ site.url }}/images/2015/20150904_PowerShellSCCM_-_Create_a_Dynamic_Variable_list_during_the_task_sequence/LazyWinAdmin-DynamicVariableList05__1056007837__-772x698.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150904_PowerShellSCCM_-_Create_a_Dynamic_Variable_list_during_the_task_sequence/LazyWinAdmin-DynamicVariableList05__1056007837__-772x698.png" /></a>

```powershell
# Create a Counter
$Counter = 1

# Output the base variable with an incremented number
#  for each Application
$ApplicationList | ForEach-Object {
    
    # Using the Composite Formating {0:00}
    #  to add a two difit number
    "FX{0:00}" -f $Counter
    
    # Increment the counter
    [void]$Counter++
}
```


We are creating a counter to have our start number, <b>1</b> in this case. (it's important to follow a sequence without skipping any number, the task "<b><i>Install Application</i></b>" won't like it otherwise).

We then use `$ApplicationList` variable, which contains 16 Applications, to go through the pipeline 16 times and create a value with different number each time.

The weird looking string `FX{0:00}` is using something called Composite Formatting, this help us inject some information in a String with a specific format. There are two parts, separated by the colon. The first part represent the index and the second part the FormatString <b><i>{index:formatString}</i></b>

The format operator `-f` places the composite formatting with the format item on the left side of the `-f` operator and the object list on the right side.

This also work with multiple values:

<a href="{{ site.url }}/images/2015/20150904_PowerShellSCCM_-_Create_a_Dynamic_Variable_list_during_the_task_sequence/LazyWinAdmin-DynamicVariableList06__1911094798__-772x98.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2015/20150904_PowerShellSCCM_-_Create_a_Dynamic_Variable_list_during_the_task_sequence/LazyWinAdmin-DynamicVariableList06__1911094798__-772x98.png" /></a>

## Creating Variable in the SCCM Task Sequence Environment

Finally... creating the Task Sequence Variable is pretty straight forward, here is an example.

```powershell
$TaskSequenceEnvironment = New-Object -COMObject Microsoft.SMS.TSEnvironment
$TaskSequenceEnvironment.value("VariableName") = "ApplicationName"
```
The class `Microsoft.SMS.TSEnvironment` however is only available inside the Task Sequence.
So we can implement this into the code by doing something like:

```powershell
$TaskSequenceEnvironment = New-Object -COMObject Microsoft.SMS.TSEnvironment    
$Counter = 1

$ApplicationList | ForEach-Object {
    $Variable = "$BaseVariableName{0:00}" -f $Counter
    $TaskSequenceEnvironment.value("$Variable") = "$_"
    
    $Counter++| Out-Null
}
```



## Download the full function

<a href="https://github.com/lazywinadmin/PowerShell/blob/master/SCCM-New-SCCMTSAppVariable/New-SCCMTSAppVariable.ps1" target="_blank">New-SCCMTSAppVariable (GitHub Repository)</a>

## More Information

Note also that there is a bunch of built-in variables available when you use Task Sequence, <a href="https://technet.microsoft.com/en-us/library/hh273375.aspx?f=255&amp;MSPPError=-2147217396" target="_blank">See here</a>.
Another alternative is to create Collection Variables or Computer Variables and retrieve them during your Task Sequence.

* <a href="https://technet.microsoft.com/en-us/library/hh846237.aspx#BKMK_InstallApplication" target="_blank">Technet - SCCM Task Sequence - Task: Install Application</a>
* <a href="https://technet.microsoft.com/en-us/library/hh846237.aspx#BKMK_RunPowerShellScript" target="_blank">Technet - SCCM Task Sequence - Task: Run Powershell Shell Script</a>
* <a href="https://msdn.microsoft.com/en-us/library/txafckwd(v=vs.110).aspx" target="_blank">MSDN - Composite Formatting</a>

