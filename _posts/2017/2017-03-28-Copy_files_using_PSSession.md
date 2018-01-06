---
layout: single
title: Copy files over a PSSession
excerpt: "Copying files from a remote host that is running PowerShell v2 using a PowerShell Session"
permalink:
tags: 
- powershell
- powershell-remoting
categories:
- powershell
- powershellv2
published: false
comments: true
author_profile: false
header:
  image: images/headers/Code01_1920x500.jpg
  caption: ""
  teaserlogo: ''
---
{% include toc title="Table of content" icon="file-text" %}

## Introduction

I recently had a scenario where I had to copy files from multiple computers to my local host.
Introduced in PowerShell v5 you can now use ```Copy-Item``` to copy from or to a remote host using PowerShell Remoting.


### Copy FROM a remote machine

```powershell
# Copy files from local host to remote host
$TargetSession = New-PSSession -ComputerName MYSERVER01
Copy-Item -ToSession $TargetSession -Path "C:\scripts\" -Destination "C:\" -Recurse
# -Path is a local path
# -Destination is a path on the remote machine
```

### Copy TO a remote machine
```powershell
# Copy files from remote host to local host
$TargetSession = New-PSSession -ComputerName MYSERVER01
Copy-Item -FromSession $TargetSession -Path "C:\scripts\" -Destination "C:\" -Recurse
# -Path is a remote path
# -Destination is a path on the local machine
```

In the those cases you need to run PowerShell v5 on your local machine.

## Conserve the folder structure

By default the structure of the folders won't be kept in the destination, however you can use the parameter ```-Container``` to conserve the directories and files organization.

```powershell
# Using -Container to keep the organization of the files and folders
Copy-Item -FromSession $TargetSession -Path "C:\scripts\" -Destination "C:\" -Recurse -Container
```


## My remote host is running PowerShell v2


### Copy a single file
If you try to copy a single file to a remote host that is running PowerShell v2 you might encounter the following error:

```
<PASTE ERROR HERE>
```

this is miss leading since the file actually get copied over.


### Copy multiple files
If you try to copy multiple files, you will get something like this
```powershell

```

#### Workaround

This work around will do the job and keep the order of your folder and files.
You can ignore the error messages

```powershell
Some Code here
```