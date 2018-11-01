---
layout: single
title: Powershell - SYDI - Convert all my XML to DOC Files
excerpt: 
permalink: /2011/01/powershell-sydi-convert-all-my-xml-to.html
tags: 
- automation
- powershell
- scripting
- sydi
published: true
comments: true
---

SYDI is a script to collect information (from servers and network devices) and write the data to a XML, DOC or HTML report file.

The following example takes the XML generated and convert them to DOC files.

```powershell
# ==============================================================================================
# 
# Microsoft PowerShell Source File
# 
# NAME: SYDI-Convert_XML_files_To_DOC.ps1
# 
# AUTHOR: fxavier.cat@gmail.com
# DATE  : 1/26/2011
# 
# COMMENT: Convert all the XML files in the folder XML to a DOC file and output in DOC folder
# 
# ==============================================================================================

###################
## CONFIGURATION ##
###################

$PathToSYDI = "c:\sydi"
$PathToXML = "c:\sydi\xml"
$PathToDOC = "c:\sydi\doc"
$PathToTOOLS = "c:\sydi\tools"
$WaitTimeSecs = 10

############
## SCRIPT ##
############

# Get listing of XML files
$XMLList=gci $PathToXML

# Get the count of files in $PathToXML
$count_xml = gci $PathToXML\ | measure
$TotalFilesXML=$count_xml.count

# Create a counter to show in the loop (foreach)
$counter = 0

# Show the count of files
Write-Host "Total XML Files:" $TotalFilesXML

# Start the Loop
Write-Host "Start - XML to DOC"
gci $PathToXML\|sort | `
foreach {
$counter++
$fichier = $_.name
$fichierBasename = $_.basename
$fichierCreatedOnYEAR=$_.lastwritetime.Year
$fichierCreatedOnMONTH=$_.lastwritetime.Month
$fichierCreatedOnDAY=$_.creationtime.Day

Write-Host "# $counter of $TotalFilesXML"
Write-Host "Current file: $fichier"
Write-Host "XML File Creation time of the $fichier is $fichierCreatedOnYEAR-$fichierCreatedOnMONTH-$fichierCreatedOnDAY"

# Run SYDI
cscript "$PathToTOOLS\ss-xml2word.vbs" "-d" "-x$PathToXML\$fichier" "-l$PathToTOOLS\lang_english.xml" "-o$PathToDOC\$fichierBasename-$fichierCreatedOnYEAR-$fichierCreatedOnMONTH-$fichierCreatedOnDAY.doc"

Write-Host "DOC File saved as: "+"$PathToDOC\$fichierBasename-$fichierCreatedOnYEAR-$fichierCreatedOnMONTH-$fichierCreatedOnDAY.doc"

# Show again the counter
Write-Host "#$counter of $TotalFilesXML"

# Timeout to make sure the sydi is done.
Write-Host "Next in $WaitTimeSecs secs..."
Start-Sleep $WaitTimeSecs

# Kill winword to make sure the script dont launch multiple process
Write-Host "Killing process winword.exe"
Stop-Process -Name "winword" -Force

}

# Count DOC Files
$count_DOC = gci $PathToDOC\ | measure
$TotalFilesDOC=$count_DOC.count

# Get listing of DOC Files
$DOCList=gci $PathToDOC

Write-Host "Total DOC Files:"$TotalFilesDOC
Write-Host "Total XML Files:"$TotalFilesXML
```