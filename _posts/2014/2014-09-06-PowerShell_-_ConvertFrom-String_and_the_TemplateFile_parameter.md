---
layout: single
title: PowerShell - ConvertFrom-String and the TemplateFile parameter
excerpt: 
permalink: /2014/09/powershell-convertfrom-string-and.html
tags: 
- convertfrom-string
- netstat
- parser
- parsing
- powershell
- powershell 5.0
- regex
- regular expressions
published: true
comments: true
toc: true
---

<a href="{{ site.url }}/images/2014/20140906_PowerShell_-_ConvertFrom-String_and_the_TemplateFile_parameter/2014-09-04_20-28-34__43357578__-144x125.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140906_PowerShell_-_ConvertFrom-String_and_the_TemplateFile_parameter/2014-09-04_20-28-34__43357578__-144x125.png" /></a>I'm continuing to play with the new `ConvertFrom-String` cmdlet (<a href="http://blogs.msdn.com/b/powershell/archive/2014/09/04/windows-management-framework-5-0-preview-september-2014-is-now-available.aspx" target="_blank">available in the last WMF 5.0 September preview released yesterday</a>) which make the parsing job really easy for simple or complex output.

This cmdlets supports two types of modes: <b>Basic Delimited Parsing</b> (<a href="{{ site.url }}/2014/09/powershell-playing-with-new-convertfrom.html" target="_blank">See yesterday's post</a>) and the <b>Auto-Generated Example-Driven Parsing</b> which I will cover in this post.

This Auto-Generated Example-Driven Parsing mode is based on the <b>FlashExtract</b> research work in Microsoft Research...

<b><u>Important:</u></b><i>This post is based on the September 2014 preview release of WMF 5.0. This is pre-release software, so this information may change.</i>

{% capture notice-text %}
The research core of FlashExtract comes from <a href="http://research.microsoft.com/en-us/um/people/sumitg/publications.html" target="_blank">Sumit Gulwani and Vu Le</a>:
<b><u>FlashExtract:</u> A Framework for Data Extraction by Examples, PLDI 2014, Vu Le, Sumit Gulwani (<a href="http://research.microsoft.com/en-us/um/people/sumitg/pubs/pldi14-flashextract-abs.html" target="_blank">Abstract</a> / <a href="http://research.microsoft.com/en-us/um/people/sumitg/pubs/pldi14-flashextract.pdf" target="_blank">Pdf</a> / <a href="http://research.microsoft.com/en-us/um/people/sumitg/pubs/FlashM-TextFile.avi" target="_blank">Video</a>)</b>

<b><u>Abstract:</u></b> Various document types that combine model and view (e.g., text files, webpages, spreadsheets) make it easy to organize (possibly hierarchical) data, but make it difficult to extract raw data for any further manipulation or querying. We present a general framework FlashExtract to extract relevant data from semi-structured documents using examples. It includes: (a) an interaction model that allows end-users to give examples to extract various fields and to relate them in a hierarchical organization using structure and sequence constructs. (b) an inductive synthesis algorithm to synthesize the intended program from few examples in any underlying domain-specific language for data extraction that has been built using our specified algebra of few core operators (map, filter, merge, and pair). We describe instantiation of our framework to three different domains: text files, webpages, and spreadsheets. On our benchmark comprising 75 documents, FlashExtract is able to extract intended data using an average of 2.36 examples in 0.84 seconds per field.
{% endcapture %}

{{ notice-text | markdownify }} 

## NetStat.exe -na

Once again, I will work with the <b>NetStat.exe</b>command line, to demo <b>ConvertFrom-String </b>with the<b style="text-decoration: underline;">TemplateFile</b>parameter. Here is the default output.

<a href="{{ site.url }}/images/2014/20140906_PowerShell_-_ConvertFrom-String_and_the_TemplateFile_parameter/2014-09-06_2-50-01__1141328320__-692x832.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140906_PowerShell_-_ConvertFrom-String_and_the_TemplateFile_parameter/2014-09-06_2-50-01__1141328320__-692x832.png" /></a>


## Creating the Template File

The <b>-TemplateFile</b> parameter allows us to specify a file that contains the data structure pattern of the information we want to automatically extract.

This file simply need to have curly braces around data that you want to extract, with a property name of your choice.

<b><u>Asterisk (*)</u></b>
In some case the property you define can appear multiple times and you will need to use an asterisk * to indicate that this results in multiple records.

<b><u>Example:</u></b>
Consider the following line from netstat -na


```text
  TCP    0.0.0.0:49164          0.0.0.0:0              LISTENING
```

You would translate it to the following (Don't forget the whitespaces)

```text
  {Protocol*:TCP}    {LocalAddress:0.0.0.0:49164}          {ForeignAddress:0.0.0.0:0}              {State:LISTENING}
```

<u><b>Missing property:</b></u>
In the previous example I defined 4 properties: `Protocol`, `LocalAddress`, `ForeignAddress` and `State`.
However, What if a line does not contains a State information? like this one :


```text
  UDP    0.0.0.0:443            *:*
```

If I do the following:

```text
  {Protocol*:UDP}    {LocalAddress:0.0.0.0:443}          {ForeignAddress:*:*}
```

<u>State</u> will show the same value as <u>ForeignAddress</u> :-/

<a href="{{ site.url }}/images/2014/20140906_PowerShell_-_ConvertFrom-String_and_the_TemplateFile_parameter/2014-09-06_3-15-20__587262349__-449x460.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140906_PowerShell_-_ConvertFrom-String_and_the_TemplateFile_parameter/2014-09-06_3-15-20__587262349__-449x460.png" /></a>

This can be solved by adding the property State anyway with a whitespace Regex Metacharacter<b>\s</b>

```
  {Protocol*:UDP}    {LocalAddress:0.0.0.0:443}            {ForeignAddress:*:*}{State:\s}
```


<a href="{{ site.url }}/images/2014/20140906_PowerShell_-_ConvertFrom-String_and_the_TemplateFile_parameter/2014-09-06_3-17-47__311027146__-433x554.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140906_PowerShell_-_ConvertFrom-String_and_the_TemplateFile_parameter/2014-09-06_3-17-47__311027146__-433x554.png" /></a>


<b><u>Different type of lines in NetStat -na</u></b>
Looking at the output of NetStat -na we can see some very different types of lines:
IPV4,IPV6, with and without local/foreign ports and some without State property...

You have to identity those possible case in your template so the cmdlet knows what do we each cases.


```
  TCP    0.0.0.0:49164          0.0.0.0:0              LISTENING
  TCP    192.168.1.51:54331     74.125.228.42:80       ESTABLISHED
  TCP    [::]:135               [::]:0                 LISTENING
  UDP    0.0.0.0:443            *:*
  UDP    [::]:3389              *:*
  UDP    [::1]:1900             *:*
  UDP    [fe80::98b9:6db4:216a:2f9f%18]:1900  *:*

```


<b><u>TemplateFile</u></b>

Given all the previous elements, here is the TemplateFile:


```
  {Protocol*:TCP}    {LocalAddress:0.0.0.0:49164}          {ForeignAddress:0.0.0.0:0}              {State:LISTENING}
  {Protocol*:TCP}    {LocalAddress:192.168.1.51:54331}     {ForeignAddress:74.125.228.42:80}       {State:ESTABLISHED}
  {Protocol*:TCP}    {LocalAddress:[::]:135}               {ForeignAddress:[::]:0}                 {State:LISTENING}
  {Protocol*:UDP}    {LocalAddress:0.0.0.0:443}            {ForeignAddress:*:*}{State:\s}
  {Protocol*:UDP}    {LocalAddress:[::]:3389}              {ForeignAddress:*:*}{State:\s}
  {Protocol*:UDP}    {LocalAddress:[::1]:1900}              {ForeignAddress:*:*}{State:\s}
  {Protocol*:UDP}    {LocalAddress:[fe80::98b9:6db4:216a:2f9f%18]:1900}  {ForeignAddress:*:*}{State:\s}

```

```powershell
netstat -na |
    ConvertFrom-String -TemplateFile .\netstat_template.txt |
    Select-Object -Property Protocol, LocalAddress, ForeignAddress, State
```

<a href="{{ site.url }}/images/2014/20140906_PowerShell_-_ConvertFrom-String_and_the_TemplateFile_parameter/2014-09-06_3-20-15__461307832__-692x634.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140906_PowerShell_-_ConvertFrom-String_and_the_TemplateFile_parameter/2014-09-06_3-20-15__461307832__-692x634.png" /></a>
This is super cool !!


# Extra: Retrieving the ports too !

Now we might want to split the information in the LocalAddress and have a property for the IP and another for the Port, same thing for the ForeignAddress.

We can notice that the two information are separated by a colon (<b>:</b>) character, so we need to split on that. Example:


```text
{LocalAddress:0.0.0.0:49164}
```

<u>Becomes</u>


```text
{LocalAddress:0.0.0.0}:{LocalPort:49164}
```

<b><u>TemplateFile:</u></b>

And here is the final Template.


```text
  {Protocol*:TCP}    {LocalAddress:0.0.0.0}:{LocalPort:57037}          {ForeignAddress:0.0.0.0}:{ForeignPort:0}              {State:LISTENING}
  {Protocol*:TCP}    {LocalAddress:10.100.3.31}:{LocalPort:3389}       {ForeignAddress:10.100.44.36}:{ForeignPort:51992}     {State:ESTABLISHED}
  {Protocol*:TCP}    {LocalAddress:[::]}:{LocalPort:80}                {ForeignAddress:[::]}:{ForeignPort:0}                 {State:LISTENING}
  {Protocol*:UDP}    {LocalAddress:[::]}:{LocalPort:123}               {ForeignAddress:*}:{ForeignPort:*}                    {State:\s}
  {Protocol*:UDP}    {LocalAddress:[fe80::98b9:6db4:216a:2f9f%18]}:{LocalPort:1900}  {ForeignAddress:*}:{ForeignPort:*}{State:\s}
  {Protocol*:UDP}    {LocalAddress:[fe80::98b9:6db4:216a:2f9f%18]}:{LocalPort:59108}  {ForeignAddress:*}:{ForeignPort:*}{State:\s}

```


<b><u>Output:</u></b>

```powershell
netstat -na |
    ConvertFrom-String -TemplateFile .\netstat_template_with_ports.txt |
    Select-Object -Property Protocol, LocalAddress, LocalPort, ForeignAddress, ForeignPort, State |
    Out-gridview
```

<a href="{{ site.url }}/images/2014/20140906_PowerShell_-_ConvertFrom-String_and_the_TemplateFile_parameter/2014-09-06_3-23-30__1662940095__-513x813.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2014/20140906_PowerShell_-_ConvertFrom-String_and_the_TemplateFile_parameter/2014-09-06_3-23-30__1662940095__-513x813.png" /></a>


