---
layout: single
title: PowerShell - Parse this - NetStat.exe
excerpt: 
permalink: /2014/08/powershell-parse-this-netstatexe.html
tags: 
- cli
- netstat
- parser
- parsing
- powershell
- substring
- toolmaking
published: true
comments: true
---

 
 <a href="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-09-04_20-28-34__1627644906__-144x125.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-09-04_20-28-34__1627644906__-144x125.png" /></a>In the last couple of months I had to parse different types of output using PowerShell and I thought it would be a cool idea to explain how this can be done. Command line tool: <b><u>Netstat.exe</u></b>

This small tool allows you to display active TCP connections, ports on which the computer is listening, Ethernet statistics, the IP routing table, IPv4 and IPv6 statistics.

In this example I will use the parameter '<b><u>-n</u></b>' which displays active TCP connections (without name resolution).

<div>



</div><div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-12_23-36-07__398076426__-692x826.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-12_23-36-07__398076426__-692x826.png" /></a></div>



# Parse this


Before we start to write code, we need to :

* 
* <b>Getting the <u>Data</u></b>: The actual information starts from the line 4, after the properties line.

* <b>Define what is the <u>separator</u> between each properties</b>. In this case we see that the properties are separated by one or more spaces (those spaces are also called whitespaces)

* <b>Define each of the </b><b style="text-decoration: underline;">Properties.</b>First column represents the Protocol, second column the Local Address, third...etc...


<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-12_23-36-07__1572039118__-691x371.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-12_23-36-07__1572039118__-691x371.png" /></a></div><div class="separator" style="clear: both; text-align: center;"></div><div class="separator" style="clear: both; text-align: center;"></div>


# Getting the Data

In this example we see that all the data we need is below the first 4 lines... until the last line.
How to remove the first 4 lines ? How to get the total count of lines ? How to get a range of lines ?


```
# Store the output in the variable $data
$data = netstat -n

# Get a count of the lines in the output
$data.count

# Get the third line in the output
$data[3]

# Get a range of lines
$data[4..8]

# Get the data from the line 4 to the end
$data[4..$data.count]
```

<div class="separator" style="clear: both; text-align: center;"></div>
<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_21-42-33__665391850__-772x658.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_21-42-33__665391850__-772x658.png" /></a></div>



# Defining the separator

We have the data ready to be parse, next we need to separate the different properties.
Those properties are separated by spaces (also called whitespace characters). Regular expression (regex) can help us for this task. I'm using <a href="http://regexpal.com/" target="_blank">regexpal</a> to show the matches.

<b><span style="font-size: large;">\s</b>
Using the parameter \s we can <u>find any whitespace inside a string</u>. But as you can see the regex find multiple matches and will split on each individual whitespace.
<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_22-53-44__437826017__-588x190.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_22-53-44__437826017__-588x190.png" /></a></div>
<b><span style="font-size: large;">\s+</b>
The solution to avoid the previous example is to add a + to theparameter \s. This way we can <u>find any substring that contains more that one whitespace</u>.
<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_22-52-54__621512630__-579x186.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_22-52-54__621512630__-579x186.png" /></a></div><div class="separator" style="clear: both; text-align: center;">
</div><b><span style="font-size: large;">^\s+</b>
Finally we need to get rid of the first whitespaces at the the beginning of the string, before the protocol property. If we don't do this step, the first property of our split will be empty.
The <b><span style="font-size: large;">^</b> sign means that we are looking at the very beginning of the line.

<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_22-55-36__741437709__-583x183.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_22-55-36__741437709__-583x183.png" /></a></div>

Let's test the split in PowerShell:

<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_23-13-27__200921306__-772x398.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_23-13-27__200921306__-772x398.png" /></a></div>
# Defining your properties

<div>
Now we can loop through each lines and output our properties using the new-object Cmdlet.</div><div>
</div>
```
FOREACH ($line in $data)
{
    
    # Remove the whitespace at the beginning on the line
    $line = $line -replace '^\s+', ''
    
    # Split on whitespaces characteres
    $line = $line -split '\s+'
    
    # Define Properties
    $properties = @{
        Protocole = $line[0]
        LocalAddress = $line[1]
        ForeignAddress = $line[2]
        State = $line[3]
    }
    
    # Output object
    New-Object -TypeName PSObject -Property $properties
}
```
}


<div class="separator" style="clear: both; text-align: center;"></div>And here is the Output! Magnifique! :-)

<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_23-18-13__325637987__-772x578.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_23-18-13__325637987__-772x578.png" /></a></div>```

```
```

```
```

```



# <u>Extra step:</u> Splitting IPAddress and Port number inside the LocalAddress and the ForeignAddress properties

<div>
If you want the ports information in a separated fields, we can simply split on the ":", this does not require a lot of additional work.</div><div>
</div><div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_23-27-28__249884520__-772x238.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_23-27-28__249884520__-772x238.png" /></a></div><div class="separator" style="clear: both; text-align: center;">
</div><div class="separator" style="clear: both; text-align: center;">
</div>
```
FOREACH ($line in $data)
{
    
    # Remove the whitespace at the beginning on the line
    $line = $line -replace '^\s+', ''
    
    # Split on whitespaces characteres
    $line = $line -split '\s+'
    
    # Define Properties
    $properties = @{
        Protocole = $line[0]
        LocalAddressIP = ($line[1] -split ":")[0]
        LocalAddressPort = ($line[1] -split ":")[1]
        ForeignAddressIP = ($line[2] -split ":")[0]
        ForeignAddressPort = ($line[2] -split ":")[1]
        State = $line[3]
    }
    
    # Output object
    New-Object -TypeName PSObject -Property $properties
}


```

```
<u><b>Output:</b></u>
```

```
<u><b>
</b></u>
```
<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_23-31-39__373841716__-772x818.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-14_23-31-39__373841716__-772x818.png" /></a></div>
#  <u>Extra step:</u> Building a function


Finally we can wrap this powershell code inside a function to create a re-usable tool.


```
function Get-NetStat
{
&lt;#
.SYNOPSIS
    This function will get the output of netstat -n and parse the output
.DESCRIPTION
    This function will get the output of netstat -n and parse the output
#&gt;
    PROCESS
    {
        # Get the output of netstat
        $data = netstat -n
        
        # Keep only the line with the data (we remove the first lines)
        $data = $data[4..$data.count]
        
        # Each line need to be splitted and get rid of unnecessary spaces
        foreach ($line in $data)
        {
            # Get rid of the first whitespaces, at the beginning of the line
            $line = $line -replace '^\s+', ''
            
            # Split each property on whitespaces block
            $line = $line -split '\s+'
            
            # Define the properties
            $properties = @{
                Protocole = $line[0]
                LocalAddressIP = ($line[1] -split ":")[0]
                LocalAddressPort = ($line[1] -split ":")[1]
                ForeignAddressIP = ($line[2] -split ":")[0]
                ForeignAddressPort = ($line[2] -split ":")[1]
                State = $line[3]
            }
            
            # Output the current line
            New-Object -TypeName PSObject -Property $properties
        }
    }
}
```

<a href="http://gallery.technet.microsoft.com/Get-NetStat-872e0776" target="_blank">Download on Technet Gallery</a>


Now...Let's say you want to know the most frequent ForeignAddress IP, the count for each IP and ... don't want to show the header....



```
Get-NetStat |
    Group-Object -Property ForeignAddressIP |
    Select-Object -Property Count, Name |
    Sort-Object count -Descending |
    Format-Table -AutoSize -HideTableHeaders
```

<div class="separator" style="clear: both; text-align: center;"><a href="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-17_2-07-48__354367697__-772x652.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2014/20140817_PowerShell_-_Parse_this_NetStat.exe/2014-08-17_2-07-48__354367697__-772x652.png" /></a></div>

