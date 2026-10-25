---
layout: single
title: Blogger - Adding PowerShell code in your blog post
excerpt: 
permalink: /2013/10/blogger-adding-powershell-code-in-your.html
tags:
- blogging
- github
- powershell
published: false
comments: true
---
<a href="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_11-20-41_AM.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img alt="Screenshot from &quot;Blogger - Adding PowerShell code in your blog post&quot; (1)" loading="lazy" decoding="async" border="0" height="178" src="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_11-20-41_AM_s200.png" width="200" /></a>From time to time you might be interested to have your code syntax highlighted or presented with a neat format in your blog posts.

Plain text is boring and it can really mess up the layout of your post. Also It can be very hard to understand some code without some sort of syntax highlighting.

Here are a few methods that I found useful for Blogger: (those can probably be applied to Wordpress and other platforms)

* Method 1: Using Syntax Highlighter from Alex Gorbatchev
* Method 2: Using an Editor to copy the code as HTML language
* Method 3: HTML CSS Rectangle (PowerShell console look a like)
* Method 4: Embedded code using Gist (GitHub)

### Method 1: Using <a href="http://alexgorbatchev.com/SyntaxHighlighter/" target="_blank">Syntax Highlighter</a> from Alex Gorbatchev


<u>Preview:</u>

```powershell
# Get the list of command with 'Get'
Get-Command -Verb Get
# Get the list of service with dependent services
Get-service -DependentServices
# Splatting
$Params = @{
    ComputerName  = "$env:ComputerName"
    Class         = "win32_OperatingSystem"
}
```

<u>Configuration </u>
* 
* Go to http://www.blogger.com/home and log in

* Click the blog you are configuring

* Click Template in the left menu

* Click Edit HTML and the Proceed at the warning screen

* Copy the whole code and save it as a backup

* Find the </head> tag and insert the following lines just before and save it:

```html
<link href="http://alexgorbatchev.com/pub/sh/current/styles/shCore.css" rel="stylesheet" type="text/css"></link>
<link href="http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css" rel="stylesheet" type="text/css"></link>
<script src="http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js" type="text/javascript">
<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPowerShell.js' type='text/javascript'/>
<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCSharp.js' type='text/javascript'/>
<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCss.js' type='text/javascript'/>
<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shBrushSql.js' type='text/javascript'/>
<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shBrushXml.js' type='text/javascript'/>
<script language='javascript'>
SyntaxHighlighter.config.bloggerMode=true;
SyntaxHighlighter.all();
</script>


```

<u>Inserting the code in your blog post</u>
Now you are ready to insert the code to be highlighted.
Create a new post or Edit an existing one and switch the blog editor to HTML Mode
<a href="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_11-42-04_AM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Screenshot from &quot;Blogger - Adding PowerShell code in your blog post&quot; (2)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_11-42-04_AM.png" /></a>
And add the following tag
<b><pre class="brush:powershell"></b>
<b></pre></b>

The above example is for PowerShell hence the "brush:powershell". <a href="http://alexgorbatchev.com/SyntaxHighlighter/manual/brushes/" target="_blank">Use the appropriate brush for your code</a>. Now just paste the code itself inside the <pre> tag and you are done!

<u>Example:</u>
<b><pre class="brush:powershell"></b>
<b>Get-Process</b>
<b></pre></b>

would give the following output:

```powershell
Get-Process
```



<u>Tips - Selecting the code</u>
Double click anywhere inside the code window and use Ctrl+C to copy it.

<u>Tips - Adjusting the font size</u>
The initial font size was a bit too big for me, so I did the following changes in the HTML configuration to make it smaller (<span style="background-color: #cccccc;">see highlighted lines)

```html
<link href="http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css" rel="stylesheet" type="text/css"></link>
<script src="http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js" type="text/javascript">
<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPowerShell.js' type='text/javascript'/>
<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCSharp.js' type='text/javascript'/>
<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCss.js' type='text/javascript'/>
<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shBrushSql.js' type='text/javascript'/>
<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shBrushXml.js' type='text/javascript'/>
<style type='text/css'>
 .syntaxhighlighter .line {
 font-size: 76% !important;
}
<script language='javascript'>
SyntaxHighlighter.config.bloggerMode=true;
SyntaxHighlighter.defaults['font-size']='50%';
SyntaxHighlighter.all();
</script>



```


### 
</b>


### 
</b>


### 
</b>


### Method 2: Using an Editor to copy the code as HTML language.</b>


In the following example, I use PowerShell Studio 2012, but this can also be done with some other editors.
For PowerGUI, check the following <a href="http://powergui.org/entry.jspa?externalID=3021" target="_blank">Script Editor Add-on</a>.


<u>Preview:</u>

```
# Get the list of command with 'Get'
Get-Command -Verb Get
# Get the list of service with dependent services
Get-service -DependentServices
# Splatting
$Params = @{
    ComputerName  = "$env:ComputerName"
    Class         = "win32_OperatingSystem"
}
```

<u>
</u><u>Example with PowerShell Studio 2012</u>

Select your code and right click, select Copy HTML.
<a href="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-10-57_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Screenshot from &quot;Blogger - Adding PowerShell code in your blog post&quot; (3)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-10-57_PM.png" /></a>
Now you are ready to insert the HTML code in your blog post.
<a href="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-13-49_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Screenshot from &quot;Blogger - Adding PowerShell code in your blog post&quot; (4)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-13-49_PM.png" /></a>
<div class="separator" style="clear: both; text-align: left;">Back to "COMPOSE" you can see the html is translated<a href="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-15-28_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Screenshot from &quot;Blogger - Adding PowerShell code in your blog post&quot; (5)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-15-28_PM.png" /></a></div>



### Method 3: HTML CSS Rectangle</b>


Preview:

```
# Get the list of command with 'Get'
Get-Command -Verb Get
# Get the list of service with dependent services
Get-service -DependentServices
# Splatting
$Params = @{
    ComputerName  = "$env:ComputerName"
    Class         = "win32_OperatingSystem"
}
```


Preview2: 

```
PS C:\Users\Xavier> Get-Process svchost

Handles  NPM(K)    PM(K)      WS(K) VM(M)   CPU(s)     Id ProcessName
-------  ------    -----      ----- -----   ------     -- -----------
    599      25    31684      15904   109   304.72    464 svchost
    397      13     4104       4764    40    23.79    756 svchost
    510      16     6164       5712    45    73.79    864 svchost
    796      31    19144      12420   105    29.16    920 svchost
   2271     107   251640      35260   453 1,936.61    948 svchost
    920     141    15400       9632   149    17.71   1012 svchost
    896      50    22292      18468  1453    48.95   1128 svchost
    641      52    28764      15184   433    52.37   1516 svchost
    146      11     2352       1512    41     0.51   2076 svchost
    197      11     1848       1060    36     1.39   2532 svchost
    523      29     8872       6904    85    15.96   2752 svchost
     94       8     1696        480    22     3.53   2836 svchost


PS C:\Users\Xavier> Get-Service | Select-Object -First 1

Status   Name               DisplayName
------   ----               -----------
Running  AdobeARMservice    Adobe Acrobat Update Service


PS C:\Users\Xavier>

```


<u>Configuration</u>
* 
* Go to http://www.blogger.com/home and log in

* Click the blog you are configuring

* Click Template in the left menu

* Click Customize

* In the Blogger Template Designer, Click Advanced

* Click on Add CSS

* Copy the the following CSS code

* Click Apply to Blog to finish


<a href="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-09-01_9-23-03_AM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Screenshot from &quot;Blogger - Adding PowerShell code in your blog post&quot; (6)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-09-01_9-23-03_AM.png" /></a>

<u>CSS Code</u>

```css
.PoshConsole {
  color: #EEEDF0;
  background-color: #012456;
  font-family: consolas;
  font-size: 0.99em;
  padding: .25em;
  padding-top: 0.25em;
  padding-right: 0.25em;
  padding-bottom: 0.25em;
  padding-left: 0.25em;
}

```


<u>Inserting the code in your blog post</u>
All you need to do now is add the following line with your code.

<b><pre class="<span style="background-color: yellow;">PoshConsole"></b>Get-Process<b></pre></b>

For example, simply copy the code from your PowerShell windows and insert into the brackets specified above

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-23-29_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Screenshot from &quot;Blogger - Adding PowerShell code in your blog post&quot; (7)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-23-29_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Copy the code from your powershell console</td></tr></tbody></table>




### Method 4: Embedded code using Gist (GitHub)</b>

"<i>Gist is a simple way to share snippets and pastes with others. All gists are Git repositories, so they are automatically versioned, forkable and usable from Git.</i>"

[https://gist.github.com/](https://gist.github.com/)

<u>Configuration</u>

* 
* Insert your code and select PowerShell

* Create a Secret or Public Gist.

* Get the HTML code to embed the script in your post


<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-43-18_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Screenshot from &quot;Blogger - Adding PowerShell code in your blog post&quot; (8)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-43-18_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">#1 Insert the your PowerShell code and select the language PowerShell</td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-43-42_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Screenshot from &quot;Blogger - Adding PowerShell code in your blog post&quot; (9)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-43-42_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">#2 Create the Gist</td></tr></tbody></table><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-53-29_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Screenshot from &quot;Blogger - Adding PowerShell code in your blog post&quot; (10)" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Blogger_-_Adding_PowerShell_code_in_your_blog_post/2013-10-06_12-53-29_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">#3 Copy the HTML code to embed the gist in your Blog post.</td></tr></tbody></table>
<u>Example:</u>

<script src="https://gist.github.com/lazywinadmin/c4ed43a33c24851c2fc9.js"></script> 


