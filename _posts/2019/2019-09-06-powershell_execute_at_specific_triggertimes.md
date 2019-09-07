---
layout: single
title: "PowerShell - Executing code at specific times"
excerpt: "Someone recently asked me how to trigger code at specific times without leveraging the scheduled tasks"
permalink:
tags: 
  - powershell
categories:
  - powershell
published: true
header:
  teaserlogo:
  teaser: ''
  image: images/headers/Code04_1920x500.jpg
  caption: 'unsplash.com'
gallery:
  - image_path: ''
    url: ''
    title: ''
toc: false
toc_label: "Table of content"
---

Tested on:
* Windows PowerShell 5.1
* PowerShell 6.2.2

## Quick tip - How to trigger code at specific times

I recently had someone ask how they could trigger a piece of PowerShell code at different times.

This type of tasks can usually be handled by other systems such as Scheduler, Event or message based systems.

In this particular case, it needed to be handled in the current PowerShell session.

I came up with the following solution.

Let me know in the comment section if you would use another approach and I'll add you to the post.

```powershell
# Specify the Execution times
$TriggerTimes = @(
    '4:12:00pm',
    '4:12:10pm',
    '4:12:20pm',
    '2:00:00pm',
    '1:00:00pm'
)

# Sort in chronologic order
#  assuming the times format are the same
$TriggerTimes = $TriggerTimes | Sort-Object

foreach ($t in $TriggerTimes)
{
    # Past time ?
    if((Get-Date) -lt (Get-Date -Date $t))
    {
        # Sleeping
        while ((Get-Date -Date $t) -gt (Get-Date))
        {
            # Sleep for the remaining time
            (Get-Date -Date $t) - (Get-Date) | Start-Sleep
        }

        # Trigger event
        #  insert your code here
        "# TriggerTime: '$t' - Executing my code here!"

    }else{"Belong to the past: '$t'"}
}
```

Output:

```text
PS /home/fx/code> ./triggertimes.ps1

Belong to the past: '1:00:00pm'
Belong to the past: '2:00:00pm'
# TriggerTime: '4:12:00pm' - Executing my code here!
# TriggerTime: '4:12:10pm' - Executing my code here!
# TriggerTime: '4:12:20pm' - Executing my code here!
```

![image-center](/images/2019/2019-09-06-powershell_execute_at_specific_triggertimes/powershell-triggertimes_output.png)
