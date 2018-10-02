---
layout: single
title: PowerShell - Get a SubString out of a String using RegEx
excerpt: 
permalink: /2013/10/powershell-get-substring-out-of-string.html
tags: 
- operators
- powershell
- regex
- regular expressions
- split
- substring
published: true
comments: true
toc: true
toc_label: "Table of Content"
---
<a href="http://4.bp.blogspot.com/-HHt3IUIRYuI/UmLprP9HhgI/AAAAAAABeLU/No-OUlTpmQ8/s1600/2013-10-19+4-20-29+PM.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-HHt3IUIRYuI/UmLprP9HhgI/AAAAAAABeLU/No-OUlTpmQ8/s1600/2013-10-19+4-20-29+PM.png" /></a>Last week one of my colleague asked me if I could help him with some Regular Expression (Regex) to select some text inside a String.

I don't work a lot with RegEx but when I do, I use tools like <a href="http://www.sapien.com/blog/2013/08/26/introducing-powerregex-community-preview/" target="_blank">PowerRegex from Sapien</a>, <a href="http://gskinner.com/RegExr/" target="_blank">RegExr</a>,the technet help for<a href="http://technet.microsoft.com/en-us/library/hh847880.aspx" target="_blank">about_Regular_Expressions</a>or <a href="http://regexlib.com/" target="_blank">RegExlib.com</a>. And to be honest, most of the time I'm trying to avoid it...trying to find a solution the "PowerShell Way" before trying with Regex...

## Problem

So here is what he asked:
Out of the following string `OU=MTL1,OU=CORP,DC=FX,DC=LAB` (Which is a [Distinguished Name]("http://msdn.microsoft.com/en-us/library/windows/desktop/aa366101(v=vs.85).aspx")), he wanted to get the name **MTL1**, (The site code for Montreal).

## Solutions

I came up with the following solutions:

### Using PowerShell

```powershell
("OU=MTL1,OU=CORP,DC=FX,DC=LAB" -split ",")[0].substring(3)
```

### Using RegEx

```powershell
("OU=MTL1,OU=CORP,DC=FX,DC=LAB" -split ',*..=')[1]
```

> Note: Please leave a comment if you know a better way, I would be curious to learn more.

### Steps to solution: Using PowerShell

First let's check the methods and properties available using Get-Member

```powershell
PS C:\> "OU=MTL1,OU=CORP,DC=FX,DC=LAB" | get-member
```

```text
   TypeName: System.String

Name             MemberType            Definition
----             ----------            ----------
Clone            Method                System.Object Clone(), System.Object ICloneable.Clone()
CompareTo        Method                int CompareTo(System.Object value), int CompareTo(string ...
Contains         Method                bool Contains(string value)
CopyTo           Method                void CopyTo(int sourceIndex, char[] destination, int dest...
EndsWith         Method                bool EndsWith(string value), bool EndsWith(string value, ...
Equals           Method                bool Equals(System.Object obj), bool Equals(string value)...
GetEnumerator    Method                System.CharEnumerator GetEnumerator(), System.Collections...
GetHashCode      Method                int GetHashCode()
GetType          Method                type GetType()
GetTypeCode      Method                System.TypeCode GetTypeCode(), System.TypeCode IConvertib...
IndexOf          Method                int IndexOf(char value), int IndexOf(char value, int star...
IndexOfAny       Method                int IndexOfAny(char[] anyOf), int IndexOfAny(char[] anyOf...
Insert           Method                string Insert(int startIndex, string value)
IsNormalized     Method                bool IsNormalized(), bool IsNormalized(System.Text.Normal...
LastIndexOf      Method                int LastIndexOf(char value), int LastIndexOf(char value, ...
LastIndexOfAny   Method                int LastIndexOfAny(char[] anyOf), int LastIndexOfAny(char...
Normalize        Method                string Normalize(), string Normalize(System.Text.Normaliz...
PadLeft          Method                string PadLeft(int totalWidth), string PadLeft(int totalW...
PadRight         Method                string PadRight(int totalWidth), string PadRight(int tota...
Remove           Method                string Remove(int startIndex, int count), string Remove(i...
Replace          Method                string Replace(char oldChar, char newChar), string Replac...
Split            Method                string[] Split(Params char[] separator), string[] Split(c...
StartsWith       Method                bool StartsWith(string value), bool StartsWith(string val...
Substring        Method                string Substring(int startIndex), string Substring(int st...
ToBoolean        Method                bool IConvertible.ToBoolean(System.IFormatProvider provider)
ToByte           Method                byte IConvertible.ToByte(System.IFormatProvider provider)
ToChar           Method                char IConvertible.ToChar(System.IFormatProvider provider)
ToCharArray      Method                char[] ToCharArray(), char[] ToCharArray(int startIndex, ...
ToDateTime       Method                datetime IConvertible.ToDateTime(System.IFormatProvider p...
ToDecimal        Method                decimal IConvertible.ToDecimal(System.IFormatProvider pro...
ToDouble         Method                double IConvertible.ToDouble(System.IFormatProvider provi...
ToInt16          Method                int16 IConvertible.ToInt16(System.IFormatProvider provider)
ToInt32          Method                int IConvertible.ToInt32(System.IFormatProvider provider)
ToInt64          Method                long IConvertible.ToInt64(System.IFormatProvider provider)
ToLower          Method                string ToLower(), string ToLower(cultureinfo culture)
ToLowerInvariant Method                string ToLowerInvariant()
ToSByte          Method                sbyte IConvertible.ToSByte(System.IFormatProvider provider)
ToSingle         Method                float IConvertible.ToSingle(System.IFormatProvider provider)
ToString         Method                string ToString(), string ToString(System.IFormatProvider...
ToType           Method                System.Object IConvertible.ToType(type conversionType, Sy...
ToUInt16         Method                uint16 IConvertible.ToUInt16(System.IFormatProvider provi...
ToUInt32         Method                uint32 IConvertible.ToUInt32(System.IFormatProvider provi...
ToUInt64         Method                uint64 IConvertible.ToUInt64(System.IFormatProvider provi...
ToUpper          Method                string ToUpper(), string ToUpper(cultureinfo culture)
ToUpperInvariant Method                string ToUpperInvariant()
Trim             Method                string Trim(Params char[] trimChars), string Trim()
TrimEnd          Method                string TrimEnd(Params char[] trimChars)
TrimStart        Method                string TrimStart(Params char[] trimChars)
Chars            ParameterizedProperty char Chars(int index) {get;}
Length           Property              int Length {get;}

```

So how can I get the **MTL1** ? Notice how each elements are separated by a comma `,`
Let's try to split them, there is `Split()` method!

```powershell
("OU=MTL1,OU=CORP,DC=FX,DC=LAB").split(',')
```

```text
OU=MTL1
OU=CORP
DC=FX
DC=LAB
```

Awesome... but instead of the `Split()` method, let'suse the PowerShell `-Split` Operator.

```powershell
PS C:\> "OU=MTL1,OU=CORP,DC=FX,DC=LAB" -split ','
```

```text
OU=MTL1
OU=CORP
DC=FX
DC=LAB
```

Now, Out of the 4 items, we want to select the first one.`[0]` will do it.

```powershell
PS C:\> ("OU=MTL1,OU=CORP,DC=FX,DC=LAB" -split ',')[0]
```

```text
OU=MTL1
```

Finally we can use the method `SubString()` to select the piece of text we want.
The first letter of the Site code comes after the `=` sign, so it will be charactere number **3**.

```powershell
PS C:\> ("OU=MTL1,OU=CORP,DC=FX,DC=LAB" -split ',')[0].substring(3)
```

```text
MTL1
```

### Steps to solution: Using Regex

RegEx a sequence of characters that forms a search pattern, mainly for use in pattern matching with strings, or string matching (example: validate an Email format). RegEx allows you to search on Positioning, Characters Matching, Number of Matches, Grouping, Either/Or Matching, Backreferencing. Important to note that you can also use RegEx to replace substring or split your strings.

In my solution I used the following part:
The first part `,*` will match zero or more timeof the preceding element.
The second part `..=` will find anypatternthat contains 2charactersfollowed by `=`
A period matches one instance of any character

```powershell
PS C:\> ("OU=MTL1,OU=CORP,DC=FX,DC=LAB" -split ',*..=')[1]
```

```text
MTL1
```

### Other solutions from the readers

#### Jay

```powershell
'OU=MTL1,OU=CORP,DC=FX,DC=LAB' -match '(?<=(^OU=))\w*(?=(,))'
$matches[0]
```

#### Robert Westerlund

```powershell
"OU=MTL1,OU=CORP,DC=FX,DC=LAB" -match "^OU=(?<MTL1>[^,]*)"
$matches["MTL1"]
```

## Resources

* <a href="http://technet.microsoft.com/en-us/library/hh847732.aspx" target="_blank">TechNet - about_Operators</a>
* <a href="http://technet.microsoft.com/en-us/library/hh847759.aspx" target="_blank">TechNet - about_Comparaison_operators</a>
* <a href="http://technet.microsoft.com/en-us/library/hh847811.aspx" target="_blank">TechNet - about_split</a>
* <a href="http://technet.microsoft.com/en-us/library/hh847757.aspx" target="_blank">TechNet - about_join</a>
* <a href="http://www.powershellcookbook.com/recipe/qAxK/appendix-b-regular-expression-reference" target="_blank">PowerShell Cookbook - Appendix B - Regular Expression Reference</a>
* <a href="http://msdn.microsoft.com/en-us/library/az24scfc(v=vs.110).aspx" target="_blank">MSDN - Regular Expression Language - Quick Reference</a>(Thanks Jay)
* <a href="http://blogs.technet.com/b/heyscriptingguy/archive/2009/04/13/how-can-i-create-a-phone-directory-from-files-with-varying-text-formats.aspx" target="_blank">Scripting Guys Blog - How Can I Create a Phone Directory from Files with Varying Text Formats?</a>
* <a href="http://blogs.technet.com/b/heyscriptingguy/archive/2009/04/14/how-can-i-convert-a-tab-delimited-file-to-a-comma-separated-value-file.aspx" target="_blank">Scripting Guys Blog - How Can I Convert a Tab-Delimited File to a Comma-Separated Value File?</a>
* <a href="http://blogs.technet.com/b/heyscriptingguy/archive/2009/04/15/how-can-i-see-which-packets-are-being-dropped-by-windows-firewall.aspx" target="_blank">Scripting Guys Blog -How Can I See Which Packets Are Being Dropped by Windows Firewall?</a>
* <a href="http://blogs.technet.com/b/heyscriptingguy/archive/2011/03/03/use-powershell-regular-expressions-to-format-numbers.aspx" target="_blank">Scripting Guys Blog -Use PowerShell Regular Expressions to Format Numbers</a>
* <a href="http://blogs.technet.com/b/heyscriptingguy/archive/tags/windows+powershell/regular+expressions/" target="_blank">Scripting Guys Blog - Articles about RegEx</a>