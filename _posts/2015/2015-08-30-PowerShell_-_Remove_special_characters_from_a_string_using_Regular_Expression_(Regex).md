---
layout: single
title: PowerShell - Remove special characters from a string using Regular Expression (Regex)
excerpt: 
permalink: /2015/08/powershell-remove-special-characters.html
tags: 
- powershell
- regex
- regular expressions
- string
published: true
comments: true
---

 
<a href="http://4.bp.blogspot.com/-HHt3IUIRYuI/UmLprP9HhgI/AAAAAAABeLU/No-OUlTpmQ8/s1600/2013-10-19+4-20-29+PM.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-HHt3IUIRYuI/UmLprP9HhgI/AAAAAAABeLU/No-OUlTpmQ8/s1600/2013-10-19+4-20-29+PM.png" /></a>Some more string manipulations! Today I'd like to remove the special characters and only keep alphanumeric characters using Regular Expression (Regex).

You might be interested to check a previous article where I showed how to remove diacritics (accents) from some strings, see here: <a href="{{ base_path }}/2015/05/powershell-remove-diacritics-accents.html">{{ base_path }}/2015/05/powershell-remove-diacritics-accents.html</a>


<b>My goal</b> is to be able to keep only any characters considered as letters and any numbers.
If you are familiar with Regex, you could do something simple as using the metacharacter `\w` or `[a-z]` type of things. It's great when you only work with english language but does not work when you have accents or diacritics with Latin languages for example.

Preview of the final solution:

<a href="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/2015-08-30_18-40-10__1502951707__-844x209.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="99" src="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/2015-08-30_18-40-10__1239215365__-400x99.png" width="400" /></a>


# Regex approaches

Here is a couple of examples using different meta-characters and Unicode techniques.
I stored the string in a variable `$String` to make it easy to read.

```powershell
$String = "François-Xavier!?!#@$%^&*()_+\|}{○<>??/ €$¥£¢ \^$.|?*+()[{ 0123456789"
```


## \W Meta-character


```powershell
# Regular Expression - Using the \W (opposite of \w)
$String -replace '[\W]', ''
```

The `\w` metacharacter is used to find a word character. A word character is a character from `a-z`, `A-Z`, `0-9`, including the `_` (underscore) character. Here we use `\W` which remove everything that is not a word character. This works pretty well but we get an extra underscore character `_`. The diacritics on the c is conserved.

<a href="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Regex01_W__325467495__-844x129.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Regex01_W__325467495__-844x129.png" /></a>


## [^a-zA-Z0-9] Ranges


```powershell
# Regular Expression - Using characters from a-z, A-Z, 0-9
$String -replace '[^a-zA-Z0-9]', ''
```

<b><u>Note:</u></b> The `^` character allows us to get the opposite (inverse) of the regex pattern defined.

<a href="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Regex02_A-Z__1320925435__-844x129.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Regex02_A-Z__1320925435__-844x129.png" /></a>
This is working well, but the diacritics are removed. (Missing C of "François")


## ASCII Ranges

```powershell
# Regular Expression - Using ASCII
#  See http://www.asciitable.com/
$String -replace '[^\x30-\x39\x41-\x5A\x61-\x7A]+', ''
```

<a href="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Regex03_ASCII__1480139706__-844x129.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Regex03_ASCII__1480139706__-844x129.png" /></a>

Same here, we are using specific ranges of ASCII Characters. The diacritics are removed. (Missing C of "François")

<a href="http://www.asciitable.com/" imageanchor="1" style="margin-left: 1em; margin-right: 1em;" target="_blank"><img border="0" height="216" src="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/asciitable__755878205__-320x216.png" width="320" /></a>


## UNICODE Specific Code Point

```powershell
# Regular Expression - Unicode - Matching Specific Code Points
# See http://unicode-table.com/en/
$String -replace '[^\u0030-\u0039\u0041-\u005A\u0061-\u007A]+', ''
```
<a href="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Regex04_Unicode_Specific_Code_Point__1973263826__-844x129.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Regex04_Unicode_Specific_Code_Point__1973263826__-844x129.png" /></a>

Same here again, we are using specific ranges of Unicode Code Point Characters. The diacritics are removed. (Missing C of "François")


## UNICODE Categories (This is what I use in my final function)


```powershell
# Regular Expression - Unicode - Unicode Categories
$String -replace '[^\p{L}\p{Nd}]', ''
```

Each Unicode character belongs to a certain category. You can match a single character belonging to the "letter" category with`\p{L}`. Same for Numbers, you can use `\p{Nd}` for Decimals.

<a href="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Regex05_Unicode_Category__1111939815__-844x129.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Regex05_Unicode_Category__1111939815__-844x129.png" /></a>

Other cool Example such as `\p{N}` for any type of numbers, `\p{Nl}` for a number that looks like a letter, such as a Roman numeral and finally `\p{No}` for a superscript or subscript digit, or a number that is not a digit `0-9`.


This is the method I use in the final function.



# Keep some specific characters

Now that I have the main code working. I want to include some Exclusion.
This can easily be done with the slash character, example:


```powershell
# Regular Expression - Unicode - Unicode Categories
#  Exceptions: We want to keep the following characters: ( } _
$String -replace '[^\p{L}\p{Nd}/(/}/_]', ''
```

<a href="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Regex05_Unicode_Category_WITH_Exceptions__545375934__-844x129.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Regex05_Unicode_Category_WITH_Exceptions__545375934__-844x129.png" /></a>



# Final Function

[Available on my GitHub repository](https://github.com/lazywinadmin/PowerShell/blob/master/TOOL-Remove-StringSpecialCharacter/Remove-StringSpecialCharacter.ps1)

<a href="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Remove-StringSpecialCharacter__130501068__-844x329.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ base_path }}/images/2015/20150830_PowerShell_-_Remove_special_characters_from_a_string_using_Regular_Expression_(Regex)/LazyWinAdmin_Remove-StringSpecialCharacter__130501068__-844x329.png" /></a>

