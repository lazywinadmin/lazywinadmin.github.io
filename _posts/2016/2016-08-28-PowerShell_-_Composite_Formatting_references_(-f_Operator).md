---
layout: single
title: PowerShell - Composite Formatting references (-f Operator)
excerpt: 
permalink: /2016/08/powershell-composite-formatting.html
tags: 
- composite formatting
- -f operator
- powershell
published: true
comments: true
toc: true
toc_label: "Table of content"
---

<a href="{{ site.url }}/images/2016/20160828_PowerShell_-_Composite_Formatting_references_(-f_Operator)/1472490851_format-indent-more__1286772066__-128x128.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2016/20160828_PowerShell_-_Composite_Formatting_references_(-f_Operator)/1472490851_format-indent-more__1286772066__-128x128.png" /></a>If you play often with PowerShell you might have encountered something called "Composite Formatting". What is that ? 

Each format item takes the following form and consists of the following components:

```python
{index[,alignment][:formatString]}
```

The matching braces `{` and `}` are required.

Here is a quick example `"Welcome to {0}" -f "LazyWinAdmin.com"`

<center><a href="{{ site.url }}/images/2016/20160828_PowerShell_-_Composite_Formatting_references_(-f_Operator)/CompositeFormatting__1364390208__-438x57.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2016/20160828_PowerShell_-_Composite_Formatting_references_(-f_Operator)/CompositeFormatting__1364390208__-438x57.png" /></a></center>

## Composite Formation

> The .NET Framework composite formatting feature takes a list of objects and a composite format string as input. A composite format string consists of fixed text intermixed with indexed placeholders, called format items, that correspond to the objects in the list. The formatting operation yields a result string that consists of the original fixed text intermixed with the string representation of the objects in the list.
<a href="https://msdn.microsoft.com/en-us/library/txafckwd(v=vs.110).aspx" target="_blank">https://msdn.microsoft.com/en-us/library/txafckwd(v=vs.110).aspx</a> 

### Numeric Format Strings

```powershell
##########################
# Numeric Format Strings #
##########################

# The Decimal ("D") Format Specifier
"{0:D}" -f 50999994 #50999994
"{0:D10}" -f 50999994 #0050999994
"{0:D6}" -f -1234 #-001234

# The Numeric ("N") Format Specifier
"{0:N1}" -f 0.55567884654 #0.6
"{0:N3}" -f 0.55567884654 #0.556
"{0:N5}" -f 0.55567884654 #0.55568
"{0:N}" -f 55567884654 #55,567,884,654.00
"{0:N5}" -f 55567884654 #55,567,884,654.00000

# Fixed points
"{0:F}" -f 50999994 #50999994.00
"{0:F5}" -f 50999994 #50999994.00000

# The General ("G") Format Specifier
"{0:G}" -f 50999994 #50999994
"{0:G1}" -f 50999994 #5E+07
"{0:G2}" -f 50999994 #5.1E+07
"{0:G5}" -f 50999994 #5.1E+07

# Exponentielle
"{0:E}" -f 1052.0329112756 #1.052033E+003
"{0:e}" -f 1052.0329112756 #1.052033e+003


# Round-Trip (used to ensure that a numeric value that is converted to a string will be parsed back into the same numeric value)
"{0:R}" -f 5.665599292333 #5.665599292333
"{0:R}" -f 5.665590000000 #5.66559
# Interesting example from @MuchToDiscuss (thank you!)
# "The following example yields different results from a 32-bit prompt vs 64-bit,
#  showing that converting this particular 64-bit value to and from string will
#  result in a loss of precision"
"{0:R}" -f [double]0.6822871999174
#0.68228719991740006 (in PowerShell 64-bits)
#0.6822871999174     (in PowerShell 32-bits)


# Hexadecimal
"0x{0:x}" -f 181300 #0x2c434
"0x{0:X}" -f 181300 #0x2C434   (Uppercase here)
"{0:X}" -f 12 #C
"{0:X}" -f 121 #79
"{0:X12}" -f 121 #000000000079

# Leading Zeros
"{0:000}" -f 1 #001
"{0:000}" -f 12 #012
"{0:000}" -f 123 #123
"{0:000}" -f 1234 #1234

# Currency
"{0:C}" -f 100 # $100.00
"{0:C1}" -f 100 # $100.0
"{0:C3}" -f 100 # $100.000
"{0:C3,en-CA}" -f 100 # $100.000

# Mix of types
"0x{0:X} {0:E} {0:N}" -f [Int64]::MaxValue
#0x7FFFFFFFFFFFFFFF 9.223372E+018 9,223,372,036,854,775,807.00
```

### Time / Date

```powershell
###############
# TIME / DATE #
###############
"Year = {0:yyyy}, Hours = {0:hh}, Hours(24 format) = {0:HH}" -f $(Get-date)
#Year = 2016, Hours = 11, Hours(24 format) = 23
"Time = {0:HH:mm:ss}" -f $(Get-date)
#Time = 23:55:44
"Time = {0:HH:mm:ss:ffff}" -f $(Get-date)
#Time = 23:55:45:6569

# Short date pattern
"{0:d}" -f $(Get-date) #2016-08-28

# Long date pattern
"{0:D}" -f $(Get-date) #August 28, 2016

# Full date/time pattern (short time)
"{0:f}" -f $(Get-date) #August 28, 2016 7:32 PM

# Full date/time pattern (long time)
"{0:F}" -f $(Get-date) #August 28, 2016 7:31:55 PM

# General date/time pattern (short time)
"{0:g}" -f $(Get-date) #2016-08-28 7:32 PM

# General date/time pattern (long time).
"{0:G}" -f $(Get-date) #2016-08-28 7:34:03 PM

# Month/day pattern
"{0:m}" -f $(Get-date) #28 August
"{0:M}" -f $(Get-date) #28 August

# Round-trip date/time pattern.
"{0:o}" -f $(Get-date) #2016-08-28T19:35:29.1878628-04:00
"{0:O}" -f $(Get-date) #2016-08-28T19:35:50.7359703-04:00

# RFC1123 pattern
"{0:r}" -f $(Get-date) #Sun, 28 Aug 2016 19:36:09 GMT
"{0:R}" -f $(Get-date) #Sun, 28 Aug 2016 19:36:09 GMT
# Sortable date/time pattern
"{0:s}" -f $(Get-date) #2016-08-28T19:36:47

#Short time pattern
"{0:t}" -f $(Get-date) #7:37 PM

#Long time pattern
"{0:T}" -f $(Get-date) #7:37:48 PM

#Universal sortable date/time pattern.
"{0:u}" -f $(Get-date) #2016-08-28 19:38:07Z

#Universal full date/time pattern.
"{0:U}" -f $(Get-date) #August 28, 2016 11:38:28 PM

#Year month pattern.
"{0:y}" -f $(Get-date) #August, 2016
"{0:Y}" -f $(Get-date) #August, 2016

# Custom format
"{0:hh}:{0:mm}" -f (Get-Date) #10:51
"{0:hh}:{0:mm}:{0:ss}" -f (Get-Date) #10:51:23


# Note that all the above works also using the ToString method
#  https://msdn.microsoft.com/en-us/library/az4se3k1(v=vs.110).aspx
(Get-date).tostring('y') #August, 2016

# Custom Date and Time Format Strings
#  https://msdn.microsoft.com/en-us/library/8kb3ddd4(v=vs.110).aspx
(Get-date).tostring('yyyyMMdd') #20160828
```

### Alignement / Spacing

```powershell
########################
# ALIGNEMENT / SPACING #
########################

# Spacing and Define the width of the string
"{0,6} {1,15:N0}" -f "2016", "1000000"      #  2016         1000000
"{0,6} {1,15:N0}" -f "2017", "88000000"     #  2017        88000000
'{0,-10:C2}{1,14:C2}' -f "2017", "88000000" #2017            88000000
"{0,-20:C} (amount)" -f 52353253.27 #$52,353,253.27       (amount)
"|{0,-10}|" -f "hello" #|hello     |
"|{0,10}|" -f "hello" #|     hello|
```

### String

```powershell
##########
# STRING #
##########

# One string
"{0}" -f "Francois-Xavier" #Francois-Xavier

# Multiple Strings
"My name is {0}, From {1} and live in {2}" -f 'FX', 'France', 'Montreal (Canada)'

# You can also shuffle around the tags
"My name is {2} I'm From {1} and live in {0}" -f 'Montreal (Canada)', 'France', 'FX'
```