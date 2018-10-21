---
layout: single
title: Powershell - Using String methods
excerpt: 
permalink: /2010/12/powershell-using-string-functions.html
tags: 
- powershell
- scripting
caterogies:
- powershell
published: true
comments: true
---

PowerShell uses .NET objects everywhere. .NET objects come with some useful built-in methods. However, for string manipulation you do not need to look for external commands as they are built right into string class.

Here are a couple of useful examples:

```powershell
"Hello".Length              #5
"Hello".ToLower()           #hello
"Hello".ToUpper()           #HELLO
"Hello".EndsWith('lo')      #True
"Hello".Contains('l')       #True
"Hello".LastIndexOf('l')    #3
"Hello".IndexOf('l')        #2
"Hello".Substring(3)        #lo
"Hello".Substring(3,1)      #l
"Hello".StartsWith('he')    #False
"Hello".toLower().StartsWith('he')      #True
"Hello".Insert(3, "INSERTED")           #HelINSERTEDlo
"Hello".Replace('l', 'x')               #Hexxo
" remove space at ends ".Trim()         #remove space at ends
" remove space at ends ".Trim(' rem')   #ove space at ends
"Server1,Server2,Server3".Split(',')
<#
Server1
Server2
Server3
#>
```
