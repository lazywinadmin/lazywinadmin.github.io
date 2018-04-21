---
layout: single
title: PowerShell - Read an Excel file using COM Interface
excerpt: 
permalink: /2014/03/powershell-read-excel-file-using-com.html
tags: 
- com
- microsoft excel
- microsoft office
- powershell
published: true
comments: true
---
{% include base_path %} 
 
 <a href="http://2.bp.blogspot.com/-nnDulVPr8nI/Uy4x0oATYuI/AAAAAAABj1s/v8Nky6kakKY/s1600/2014-03-22+8-57-33+PM.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-nnDulVPr8nI/Uy4x0oATYuI/AAAAAAABj1s/v8Nky6kakKY/s1600/2014-03-22+8-57-33+PM.png" /></a>Last week, I worked on a small PowerShell script to read a custom excel file sheet with a lot of information in different columns and rows. Unfortunately, you'll have to adapt the script to your needs. However I thought this might be helpful to understand how this work.

Here is the sample Excel file I worked with:
<div class="separator" style="clear: both; text-align: center;"></div>
<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140323_PowerShell_-_Read_an_Excel_file_using_COM_Interface/VIDEOSERVER02__918066707__-691x852.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140323_PowerShell_-_Read_an_Excel_file_using_COM_Interface/VIDEOSERVER02__918066707__-691x852.png" height="640" width="516" /></a></div>




# COM interface: Excel.Application

<b>Layers</b>
To access an Excel file data, you have to be aware of the hierarchy of each elements/layers.
The first element will be the <u>application class</u> (at the the top) that contains <u>one or more workbooks</u>, each workbooks contains<u> one or more worksheets</u>, inside each of the worksheet you can access <u>ranges</u>. Each element can access down to some of the other layers.


<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ base_path }}/images/2014/20140323_PowerShell_-_Read_an_Excel_file_using_COM_Interface/Excel_layers__1122444821__-672x596.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ base_path }}/images/2014/20140323_PowerShell_-_Read_an_Excel_file_using_COM_Interface/Excel_layers__1122444821__-672x596.png" height="283" width="320" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Microsoft Excel - Layers</td></tr></tbody></table>




<u><b>Application layer</b></u>
This will open a new instance of excel on my computer as you can see below:

```
$objExcel = New-Object -ComObject Excel.Application
```

MSDN reference:&nbsp;<a href="http://msdn.microsoft.com/en-us/library/microsoft.office.interop.excel.applicationclass(v=office.11).aspx" target="_blank">Microsoft.Office.Interop.Excel.ApplicationClass</a>


<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140323_PowerShell_-_Read_an_Excel_file_using_COM_Interface/Microsoft.Office.Interop.Excel.ApplicationClass__1553930306__-852x394.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140323_PowerShell_-_Read_an_Excel_file_using_COM_Interface/Microsoft.Office.Interop.Excel.ApplicationClass__1553930306__-852x394.png" /></a></div>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://2.bp.blogspot.com/-lmONOZJi1IA/Uy4k7ROGc8I/AAAAAAABj0Y/_FPkxSFAPJI/s1600/2014-03-22+8-01-37+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://2.bp.blogspot.com/-lmONOZJi1IA/Uy4k7ROGc8I/AAAAAAABj0Y/_FPkxSFAPJI/s1600/2014-03-22+8-01-37+PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">A new Excel Instance is created</td></tr></tbody></table>

<u><b>Workbook layer</b></u>
In the second step, we are opening the workbook inside the Excel Instance.

```
$WorkBook = $objExcel.Workbooks.Open("C:\VIDEOSERVER01-BuildSpecs.xlsx")
```

```


```
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-Bl2QqCRJIVI/Uy4lsp67mKI/AAAAAAABj0g/KjxjtI5nYe4/s1600/2014-03-22+8-06-40+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-Bl2QqCRJIVI/Uy4lsp67mKI/AAAAAAABj0g/KjxjtI5nYe4/s1600/2014-03-22+8-06-40+PM.png" /></a></div>

We can verify that the workbook is opened&nbsp;using the following line

```
$objExcel.WorkBooks | Select-Object -Property name, path, author
```
```
<span style="font-family: 'Times New Roman'; white-space: normal;">

```
```
<span style="font-family: 'Times New Roman'; white-space: normal;">Then see the properties and methods that can be used
$objExcel.WorkBooks | Get-Member
```

<div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/-ydMvIBBQYc8/Uy4nAJFXBBI/AAAAAAABj00/Uo106voE_TI/s1600/2014-03-22+8-12-14+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-ydMvIBBQYc8/Uy4nAJFXBBI/AAAAAAABj00/Uo106voE_TI/s1600/2014-03-22+8-12-14+PM.png" /></a></div>

In the following example, I hold the data inside the $WorkBook variable.
$WorkBook = $objExcel.Workbooks.Open("C:\VIDEOSERVER01-BuildSpecs.xlsx")

```


```
```
<span style="font-family: 'Times New Roman'; white-space: normal;">I then look for any member (property, method, or event) that contains the word "sheet".
$WorkBook | Get-Member -Name *sheet*
```

<div class="separator" style="clear: both; text-align: center;"><a href="http://4.bp.blogspot.com/-22dsI3DX1EQ/Uy4royVEhGI/AAAAAAABj1A/Wn0iy7AtwLw/s1600/2014-03-22+8-22-51+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-22dsI3DX1EQ/Uy4royVEhGI/AAAAAAABj1A/Wn0iy7AtwLw/s1600/2014-03-22+8-22-51+PM.png" /></a></div>
My WorkBook contains 2 worksheets as you can see in the first image of the article, "BuildSpecs" and "Sheet2", PowerShell can retrieve this information using the "sheets" property.

```
$WorkBook.sheets | Select-Object -Property Name
```

<div class="separator" style="clear: both; text-align: center;"><a href="http://4.bp.blogspot.com/-X0VcTeIfl0I/Uy4rvJM0q7I/AAAAAAABj1I/3PKCNLPEQSs/s1600/2014-03-22+8-24-02+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-X0VcTeIfl0I/Uy4rvJM0q7I/AAAAAAABj1I/3PKCNLPEQSs/s1600/2014-03-22+8-24-02+PM.png" /></a></div>

<u><b>WorkSheet layer</b></u>
We select the sheet BuildSpecs and are now able to start working on the data

```
$WorkSheet = $WorkBook.sheets.item("BuildSpecs")
```


<div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/-AIdNtL3p3d4/Uy4rxFHxaFI/AAAAAAABj1Q/Ggsa5YSmrok/s1600/2014-03-22+8-30-11+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://1.bp.blogspot.com/-AIdNtL3p3d4/Uy4rxFHxaFI/AAAAAAABj1Q/Ggsa5YSmrok/s1600/2014-03-22+8-30-11+PM.png" /></a></div>



# Loading and getting the Data

Loading the file in PowerShell can be done with just a few lines.


```
# Specify the path to the Excel file and the WorkSheet Name
$FilePath = "C:\VIDEOSERVER01-BuildSpecs.xlsx"
$SheetName = "BuildSpecs"

# Create an Object Excel.Application using Com interface
$objExcel = New-Object -ComObject Excel.Application

# Disable the 'visible' property so the document won't open in excel
$objExcel.Visible = $false

# Open the Excel file and save it in $WorkBook
$WorkBook = $objExcel.Workbooks.Open($FilePath)

# Load the WorkSheet 'BuildSpecs'
$WorkSheet = $WorkBook.sheets.item($SheetName)
```
<div>
</div>

Let's get the ComputerName value which is "VIDEOSERVER01" is this example.
If you look at the sheet "<b>BuildSpecs</b>" below, you'll see the ComputerName information in the C3 cell. We can also refer to it using the coordinate-systems: Third column/third row.
<div class="separator" style="clear: both; text-align: center;"></div>
<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140323_PowerShell_-_Read_an_Excel_file_using_COM_Interface/VIDEOSERVER03__186302990__-691x852.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140323_PowerShell_-_Read_an_Excel_file_using_COM_Interface/VIDEOSERVER03__186302990__-691x852.png" height="640" width="516" /></a></div>

Different methods are possible to retrieve the information from the sheet, I found the following ones:


```
$worksheet.Range("C3").Text
$worksheet.Range("C3:C3").Text
$worksheet.Range("C3","C3").Text
$worksheet.cells.Item(3, 3).text
$worksheet.cells.Item(3, 3).value2
$worksheet.Columns.Item(3).Rows.Item(3).Text
$worksheet.Rows.Item(3).Columns.Item(3).Text
$worksheet.UsedRange.Range("c3").Text
```


Finally we can create a PowerShell object to output the information we want to extract from the Excel file.


```
$Output = [pscustomobject][ordered]@{
    ComputerName = $WorkSheet.Range("C3").Text
    Project = $WorkSheet.Range("C4").Text
    Ticket = $WorkSheet.Range("C5").Text
    Role = $WorkSheet.Range("C8").Text
    RoleType = $WorkSheet.Range("C9").Text
    Environment = $WorkSheet.Range("C10").Text
    Manufacturer = $WorkSheet.Range("C12").Text
    SiteCode = $WorkSheet.Range("C15").Text
    isDMZ = $WorkSheet.Range("C16").Text
    OperatingSystem = $WorkSheet.Range("C18").Text
    ServicePack = $WorkSheet.Range("C19").Text
    OSKey = $WorkSheet.Range("C20").Text
    Owner = $WorkSheet.Range("C22").Text
    MaintenanceWindow = $WorkSheet.Range("C23").Text
    NbOfProcessor = $WorkSheet.Range("C26").Text
    NbOfCores = $WorkSheet.Range("C27").Text
    MemoryGB = $WorkSheet.Range("C29").Text
}
```



<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-0X6m94skkjo/Uy41tyg933I/AAAAAAABj14/ANHlIsQtoa0/s1600/2014-03-22+9-14-51+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-0X6m94skkjo/Uy41tyg933I/AAAAAAABj14/ANHlIsQtoa0/s1600/2014-03-22+9-14-51+PM.png" /></a></div>



# Script example


Here is an example with all the pieces together.


```
#Specify the path of the excel file
$FilePath = "C:\LazyWinAdmin\VIDEOSERVER01-BuildSpecs.xlsx"

#Specify the Sheet name
$SheetName = "BuildSpecs"

# Create an Object Excel.Application using Com interface
$objExcel = New-Object -ComObject Excel.Application
# Disable the 'visible' property so the document won't open in excel
$objExcel.Visible = $false
# Open the Excel file and save it in $WorkBook
$WorkBook = $objExcel.Workbooks.Open($FilePath)
# Load the WorkSheet 'BuildSpecs'
$WorkSheet = $WorkBook.sheets.item($SheetName)

[pscustomobject][ordered]@{
    ComputerName = $WorkSheet.Range("C3").Text
    Project = $WorkSheet.Range("C4").Text
    Ticket = $WorkSheet.Range("C5").Text
    Role = $WorkSheet.Range("C8").Text
    RoleType = $WorkSheet.Range("C9").Text
    Environment = $WorkSheet.Range("C10").Text
    Manufacturer = $WorkSheet.Range("C12").Text
    SiteCode = $WorkSheet.Range("C15").Text
    isDMZ = $WorkSheet.Range("C16").Text
    OperatingSystem = $WorkSheet.Range("C18").Text
    ServicePack = $WorkSheet.Range("C19").Text
    OSKey = $WorkSheet.Range("C20").Text
    Owner = $WorkSheet.Range("C22").Text
    MaintenanceWindow = $WorkSheet.Range("C23").Text
    NbOfProcessor = $WorkSheet.Range("C26").Text
    NbOfCores = $WorkSheet.Range("C27").Text
    MemoryGB = $WorkSheet.Range("C29").Text
}
```


# Download


<a href="https://github.com/lazywinadmin/PowerShell/tree/master/TOOL-Read-ExcelFile" target="_blank">GitHub</a>
<a href="http://gallery.technet.microsoft.com/Read-Excel-File-using-COM-809deb32" target="_blank">Technet Gallery</a>


# Other References

<ul>
* <a href="http://blogs.technet.com/b/heyscriptingguy/archive/2008/09/11/how-can-i-read-from-excel-without-using-excel.aspx" style="font-family: '';" target="_blank">Hey, Scripting Guy! How Can I Read from Excel Without Using Excel?</a>

* <a href="http://import-powershell.blogspot.ca/2012/03/excel-part-1.html" style="font-family: '';" target="_blank">Josh Miller - Excel part1</a>

* <a href="http://import-powershell.blogspot.ca/2012/04/excel-part-2-import-excel.html" target="_blank">Josh Miller - Excel part2</a>

* <a href="http://msdn.microsoft.com/en-us/library/bb149081.aspx" target="_blank">Excel Automation Model</a>
</ul>

