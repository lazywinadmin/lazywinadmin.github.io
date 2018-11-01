---
layout: single
title: Offline Domain Join - Recreating the Blob file using PowerShell
excerpt: 
permalink: /2016/07/offline-domain-join-recreating-blob.html
tags: 
- active directory
- djoin
- offline domain join
- powershell
published: true
comments: true
toc: true
toc_label: "Table of content"
---

<img border="0" src="{{ site.url }}/images/2016/20160701_Offline_Domain_Join_-_Recreating_the_Blob_file_using_PowerShell/powershell_logo__1375352796__-144x109.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"/>When you need to join a machine to the Active Directory It is a pretty straight forward task using either the User Interface or the PowerShell cmdlet available for that usage.

However in some situation you don't have network connectivity and need to rely on Offline Domain Join, using the ```Djoin.exe``` tool. Typically you use djoin in two phases. First you generates a provisioning file that you drop on a newly deployed machine. In the second phase you run djoin with the file as a parameter and the machine is joined to the domain without connection to the domain controller.

<b><u>My problem</u></b>
Using that same method, I recently had a tricky problem to solve. The environment where I was performing this was very locked down, not allowing me to copy files to the new provisioned machine.

Fortunately the system handling the deployment could perform action on other systems and gather data. I could rely on something like System Center Orchestrator (or SMA) and get the content of the Blob file over HTTP/HTTPS by invoking a runbook.

Recreating the djoin file with the content was a bit trickier. Djoin is really picky on how the file is created. (see <a href="http://www.msuiche.net/2009/01/29/windows-7-and-windows-server-2008-r2-djoin-offline-domain-join-utility/" target="_blank">here</a> and <a href="http://www.win7dll.info/netjoin_dll.html" target="_blank">here</a> for more information)

> ## Using Djoin
> Djoin comes with Windows Client and Server since Windows 7 and Windows Server 2008 R2 installation. Djoin requires administrator privileges, you have to use the tool on an elevated command prompt. Of course, you also need an account that has sufficient rights to create domain computer accounts.

<img border="0" src="{{ site.url }}/images/2016/20160701_Offline_Domain_Join_-_Recreating_the_Blob_file_using_PowerShell/Djoin_help__838119443__-761x717.png" />

1 - First, Run ```Djoin.exe``` to provision the computer account metadata. When you run the provisioning command, the computer account metadata is created in a blob .txt file that you specify as part of the command.

<u>Example:</u>
```djoin /provision /domain fx.lab /machine testdjoin01 /savefile provisioning.txt```

<img border="0" src="{{ site.url }}/images/2016/20160701_Offline_Domain_Join_-_Recreating_the_Blob_file_using_PowerShell/djoin01__584700155__-759x201.png" />


<img border="0" src="{{ site.url }}/images/2016/20160701_Offline_Domain_Join_-_Recreating_the_Blob_file_using_PowerShell/djoin01_ObjectCreated__1360167059__-687x271.png" />

2 - This blob then has to be copied on the machine and used to offline domain join the Windows machine.

<u>Example:</u>
```djoin /requestODJ /loadfile provisionning.txt /windowspath %SystemRoot% /localos```

Here is what we see when we open the output file (provisionning.txt)

<img border="0" src="{{ site.url }}/images/2016/20160701_Offline_Domain_Join_-_Recreating_the_Blob_file_using_PowerShell/blob__1887000796__-617x460.png" />

And here in a hexadecimal editor, you can see it is an unicode base64 encoded string by the two first bytes "FF FE".

<img border="0" src="{{ site.url }}/images/2016/20160701_Offline_Domain_Join_-_Recreating_the_Blob_file_using_PowerShell/blob_hexadecimal__1932001147__-664x258.png" />

## Copying the content of the blob to another file

Creating a copy of the file is easy, even copying the content on the same machine and dumping it in another file works, djoin will accept those files.

```powershell
Get-Content -path provisionning.txt -Encoding Unicode |
Set-Content -path newfile.txt -Encoding Unicode
```

## Recreating the djoin blob file from the content

Using Djoin with the same parameters we used to create the blob earlier, we will add the parameter /PRINTBLOB which will output the Blob to the console.

<img border="0" src="{{ site.url }}/images/2016/20160701_Offline_Domain_Join_-_Recreating_the_Blob_file_using_PowerShell/djoin02_printblob__503439498__-759x410.png" />

The output can then be stored in a Variable and parse to retrieve only the Blob:

```powershell
# Store the djoin
$djoin = djoin /provision /domain fx.lab /machine testdjoin02 /savefile provisioning /printblob

# Get the blob
$djoin[12]
```

Next, this string can be passed across the network using tools such as System Center Orchestrator (SCORCH) or Service Management Automation (SMA). (I won't demonstrate this part in this post)

Finally, on the new deployed machine, we can recreate the Blob file using New-DjoinFile, function available [On Github](https://github.com/lazywinadmin/PowerShell/tree/master/TOOL-New-DjoinFile).

```powershell
# Blob generated
$Blob = "Blob generated previously on the domain machine>"

# Recreate djoin file
New-DjoinFile -Blob $blob -DestinationFile $home\desktop\blob.txt -Verbose
```

You can now use ```Djoin.exe``` with the file ```blob.txt``` to join your new machine to the domain:

<img border="0" src="{{ site.url }}/images/2016/20160701_Offline_Domain_Join_-_Recreating_the_Blob_file_using_PowerShell/recreateddjoinfile__913043406__-614x95.png" />

[Download the function from Github](https://github.com/lazywinadmin/PowerShell/tree/master/TOOL-New-DjoinFile).

Now if you compare the file generated by ```djoin.exe``` and the one recreated by ```New-DjoinFile```, you should get the same content, byte by byte.

<b><u>Original File:</u></b>

<img border="0" src="{{ site.url }}/images/2016/20160701_Offline_Domain_Join_-_Recreating_the_Blob_file_using_PowerShell/Original_file_start__459775647__-749x264.png" />

<img border="0" src="{{ site.url }}/images/2016/20160701_Offline_Domain_Join_-_Recreating_the_Blob_file_using_PowerShell/Original_file_end__1409207496__-749x253.png" />

<b><u>File created with New-DjoinFile</u></b>

<img border="0" src="{{ site.url }}/images/2016/20160701_Offline_Domain_Join_-_Recreating_the_Blob_file_using_PowerShell/New-DjoinFile_file_start__1299855173__-749x253.png" />

<img border="0" src="{{ site.url }}/images/2016/20160701_Offline_Domain_Join_-_Recreating_the_Blob_file_using_PowerShell/New-DjoinFile_file_end__2138957638__-749x253.png" />

## More information

* http://www.win7dll.info/netjoin_dll.html
* http://www.msuiche.net/2009/01/29/windows-7-and-windows-server-2008-r2-djoin-offline-domain-join-utility/
* http://mctexpert.blogspot.com/2016/03/just-for-fun-storing-blob-files-as-xml.html