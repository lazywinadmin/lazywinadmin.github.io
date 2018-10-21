---
layout: single
title: How to Document Servers with SYDI
excerpt: 
permalink: /2010/12/how-to-document-servers-with-sydi_23.html
tags: 
- documentation
- inventory
- sydi
- vbscript
published: true
comments: true
toc: true
---
Having written SYDI from scratch, I know it inside and out. The readme file included in SYDI is far from perfect. While people in this line of business can usually figure out how it works, others will just ignore reading the manual anyway. In this how-to I will go through the basics of how SYDI-Server works and then describe how I use SYDI-Server.

## Getting the Software

You probably have the software already, but just in case. Download it from the <a href="http://sydi.sourceforge.net/" title="Home of SYDI"><u>SYDI website</u></a>, or if you love this site and don't want to leave it no matter what: you can download it from <a href="http://ogenstad.net/software/sydi/" title="SYDI"><u>here</u></a>. This guide is written for SYDI-Server 2.0, if there is a newer version when you read this, don't worry; it should be useful anyway. Just be sure to check the changelog.txt file for new features.Unzip the file to your target directory.

## Running SYDI in default mode

To see what the software does, open a command prompt and navigate to your sydi directory. This step requires you to have Microsoft Word installed on your computer. Type the command:

```vb
Cscript.exe sydi-server.vbs
```

Enter a message box appears and asks you which host you want to target, the default is localhost. You can select another host if you have administrative access on that machine. Though for now, just press enter.In the command prompt window you will now see that SYDI starts to gather information about your machine. Soon a Word document is created and SYDI writes the information gathered into the document.Take a look at the document. Not all this information will be relevant to you and you can remove the parts you don't want by reading further. Close Word, or save the file it if you want to.

## The Options

To view the available options use the help command `-h`:

```vb
Cscript.exe sydi-server.vbs -h
```

Options in five categories will be listed; Gathering, Output, Word, XML and Other. In reality there are only two, Gathering and Output.

## Gathering the Information

Breaking down the gathering option we have five different arguments -w for WMI options, -r for Registry options and -u and -p for username and password if you want to connect to a different user. Finally we have the -t option where you specify which host you want to target against.Looking closer at the -w argument from the help menu (-h) you could see that SYDI defaults to using `-wabefghipPqrsSu`, meaning everything gathered from the WMI providers will be included.You cannot remove everything from the report, but let's create a document without all the extra information. Run:

```vb
Cscript.exe sydi-server.vbs -w
```

As you can see the report created is much shorter than the previous one. We have removed the optional WMI providers, but we still have the basic ones and the information coming from the Registry.To choose which options you want, just check the help menu and see what they mean. If we want to add Bios Information, Printers and Services we would run:

```vb
Cscript.exe sydi-server.vbs -wbps
```

This way you can pick and choose the options you want. The Registry switch works the same way. For an even smaller report you can run:

```vb
Cscript.exe sydi-server.vbs -w -r
```

Now you can add the registry options that you want. Please note though that a lot of the "Computer Roles" are gathered from the Windows Components, so if you want these roles you must have the Windows Components in your report `-rc`.Using the `-t` option removes the message box asking you which host you want to target. A few examples of using the `-t` switch:

```vb
Cscript.exe sydi-server.vbs -tServer1
cscript.exe sydi-server.vbs -tDC1
cscript.exe sydi-server.vbs -tWebServer
cscript.exe sydi-server.vbs -t192.168.0.10
```

The user and password options should work as you would expect them to, if they don't: report the bug to me<a href="http://lh6.ggpht.com/_wma7RYUNbDg/TRPwOpe8jXI/AAAAAAAA1VY/aBemBHSesNc/s1600-h/clip_image001%5B10%5D%5B2%5D.gif"></a>

## Word Options

As you've seen, sydi-server defaults to writing output to Word. The reason for this is so that you can get a quick overview of what the script can collect without having to do any tricks. Having said that, I only use the Word option to get a quick view of a machine, later I throw away the document. I always use the XML format which I later convert to a Word document, more on that later. Even though you won't use the Word options much we'll just take a quick look at them to see what you can do, it won't be a total waste as a few of the options are used by another script called ```ss-xml2word.vbs```

`-b` is for the border of the tables created in the document. As you might have noticed there isn't any borders by default (when you print the document). You can use all borders you have installed in Word. To test it, type:

```vb
cscript.exe sydi-server.vbs -b "Table Contemporary"
```

`-f` is if you want different font sizes, the default font size for the text is 12. To change it, use:

```Cscript.exe sydi-server.vbs -f8```

`-d` tells SYDI not to display Word until the entire report is written. Using the -d option makes the process go faster. Also if you want to save the file (-o option, more on that later), you might not want to see Word at all. For example if you are running a scheduled task you don't want a GUI to be loaded.

`-n` will remove all the text inside the brackets, such as "Logical location: [provide info: Server VLAN 2]". This way you won't have a bad conscience about not completing the documentation.<a href="http://lh3.ggpht.com/_wma7RYUNbDg/TRPwQB4XG8I/AAAAAAAA1Vo/ydPXYWQUmGI/s1600-h/clip_image001%5B11%5D%5B2%5D.gif"></a> But as I have already stated, the whole idea of sydi-server writing directly to word is obsolete. If you start changing the document after it is created and want to run SYDI again your changes will be lost, or you will have to cut and paste them to the new document. There is a way around this though (hint: continue reading!).

`-T` This is if you want to specify a corporate Word Template file (.dot), which enables you to choose which fonts you want to have as well as their size. This way you can get your "look and feel" in the document.

## The Output Options

SYDI has two output options; one for saving the report and another to choose which format to use.

`-o` Output to file, specify a path and filename and use quotation marks if there's a space in the path. Remember to give your file an .xml extension if you're using the XML format and a .doc extension for the Word format.

`-e` This is to choose the export format, the default is -ew (Word), to change to XML use -ex.To create an XML report you would use:

```vb
Cscript.exe sydi-server.vbs -oServer1.xml -ex
```

This will create an XML file that you can open in a browser.

##  XML Options

You might have noticed that the XML file you created didn't look that great when viewed in your favorite browser. The reason is that you're just looking at the raw XML file.To view a style sheet, use the `-s` option. I generally use the `-sh` option which uses the html style sheet included in SYDI. For advanced users there is a `-st` option where you can specify a style sheet you have created on your own.Let's test it again:

```vb
Cscript.exe sydi-server.vbs -oServer1.xml -ex -sh
```

In order to view this file with a browser you will need the `serverhtml.xsl` and `sydi-html-styles.xsl` to be located in the same directory. These files are in the XML subdirectory of SYDI-Server. Copy the `Server1.xml` file you just created to that directory and open the file in a browser. Alternatively you can copy all of these files to another directory.

## What Other Options do you have?

To be honest, you don't have that many. The options that are left are ```-v to check the version of your script; this will check the SYDI website and see if a later version is available (I might remove this option).The last option is -d for debug, if something fails to run as you expect it might be because of a bug in SYDI. The ```-d option is useful to troubleshoot these scenarios.

## What if You Have More Than One computer?

So you want to run SYDI against multiple computers, it's easy enough to write a batch file that does it for you. However, in the Tools directory there is a script called ```sydi-wrapper.vbs. A little "gotcha" is that you have to edit the script for it to work, but don't panic; there isn't any voodoo involved. Just open the script in notepad and scroll down to this section:

```vb
' Gathering Options
' WMI – Everything enabled by default
WMIOPTIONS="-wabefghipPqrsSu"
' Registry – Everything enabled by default
REGISTRYOPTIONS="-racdlp"
' Export Options
'EXPORTFORMAT="word" ' For Microsoft Word
EXPORTFORMAT="xml" ' For XML
' Location Options
' Location of SYDI-Server.vbs
SYDISERVER="C:\scripts\sydi-server.vbs"
OUTPUTDIRECTORY="C:\scripts\Output files\"
LOGDIRECTORY="C:\Scripts\Log Files\"
TIMEOUT="600" ' How many seconds you have to wait until a computer-scan is aborted hasn’t been tested.
' Other options, check sydi-server.vbs -h for help
' Uncoment/Change One of the below
OTHEROPTIONS="-sh" ' For HTML Stylesheet on XML output
'OTHEROPTIONS="-b10" ' Base Font size of 12
' End Of Settings
```

You will recognize the `-w` and `-r` options, unlike SYDI-Server this script defaults to XML (as it should). What you **must** change in order to get this to work are the values for SYDISERVER, OUTPUTDIRECTORY and LOGDIRECTORY. If you want to you can change the TIMEOUT value too, however it might not do you any good. That feature seems to have taken<a href="http://en.wikipedia.org/wiki/Software_bug" title="Bug"><u>time out</u></a>.I wasn't sure this was a good way to implement the script. The reason you have to edit the script is so that you won't have to write such long commands later on in order to get it working.

Anyway, the remaining options are `-u` and `-p` for username and password when you connect to the machines. Then there are the gathering options or source options.

`-t` Reads from a text file, the computers listed in the text file should be separated by line or comma. To use this option:```cscript.exe sydi-wrapper.vbs -tAllMyComputers.txt```-d This is to get computers from a flat domain (NT4 style) to connect to all the computers in the domain you specify. A word of warning though, I'm told Heaven will be closing the gates for people who use NT4 much longer (you might have to break in as it is).`-a` Active Directory, if you just run the script with `-a` it will connect to the active directory domain where your machine is located. Your other option is to specify an LDAP container. SYDI-Server will then scan all computers under this container (except for the ones with disabled computer accounts).A few examples:

```vb
cscript sydi-wrapper.vbs -aDC=exibice,DC=com
cscript sydi-wrapper.vbs -a"OU=Member Servers,DC=exibice,DC=com"
```

##  An Eagles View

After running `sydi-wrapper` you might have ended up with a whole lot of XML files. To give you a quick overview I've included a script for just this purpose. Also in the Tools directory is the sydi-overview.vbs script. It accepts one argument, `-x`, you will want to point this to the output directory you specified in sydi-wrapper. I have created a batch file which reads:

```vb
Cscript.exe sydi-overview.vbs -x\\fileserver\net$\sydi\output
```

Running the script requires that you have Microsoft Excel installed on your machine. The script will parse all the XML files and start to populate the cells in Excel. The script will create six sheets. Computers with basic information about all your computers, WMI Programs is a list of all software installed by Windows Installer, Reg Programs are the ones found in the Uninstall registry key, Processes tells you what every computer is running. All these can be good to detect rouge programs or processes.Finally there is the OS distribution pie chart and data source.

## Wasn't There an Option for Html?

I might have said there was at some time, but it was a white lie. What you can do is to convert the XML file into a Html document. It's quite easy and it's used in this way:

```vb
Cscript.exe sydi-transform.vbs -xServer.xml -sServerhtml.xsl -oServer.html
```

Running this script will require that `Server.xml` and ```Serverhtml.xsl` **and** `sydi-html-stylex.xsl` are located in the same directory. If you have created private xsl files you can use the sydi-transform to convert it.

## Hey, Wasn’t This about Documentation?

It sure was, most of what we’ve looked at up until now has been more geared against Inventory instead of Network Documentation. I saved the best for last; a new tool in sydi-server 2.0 is the ss-xml2word.vbs script (or SYDI-Server XML to Word).
What the script does is that it takes an XML file and converts it to a Word document. You might be thinking that SYDI already wrote to Word, which is true, however there are situations where that isn’t possible. For example in environments where you don’t have Word installed, may it be in a DMZ or as a scheduled task on a server.
The good part though is the options you specify when creating the Word document. To view these options run:

```vb
Cscript.exe ss-xml2word.vbs -h
```

Here you can see that there are two arguments that are required -x and -l
Cscript.exe ss-xml2word.vbs -xServer1.xml -llang_english.xml
This line will create a Word document based on the information in the file, it will then use the English language file which describes what it writes to the Word document. This means that you can have the documentation in your native language. When I released SYDI-Server 2.0 there was support for English and Swedish. Later people have contributed with there own language files which you can download; Italian, Norwegian,Portuguese and Dutch.

One issue that causes the ss-xml2word.vbs script to fail for many people is a path problem. If you run the script and it just writes out a few pages without any information from the xml file and the script crashes, this is happening to you. Either put all the files in the same directory or specify the path after -x -l or -s. I will fix this in future versions so the error message is a bit more user-friendly.

The most exciting feature as I see it is the optional -s argument. This is the reason I created SYDI in the first place. The -s option specifies an XML file which contains the written documentation about the server. That is the documentation you have created, this differs from the data that SYDI-Server has gathered from the machine.

Let’s take it for a spin.

## Writing Your Documentation

To get you started I’ve included three files in the Examples directory (of sydi-server), copy the howto.xml and rename it to Server1_docs.xml. This will be where you will write the documentation. Open the Server1_docs.xml file in Notepad. Scrolling up and down you will see different XML tags. You’ll recognize the sections and subsections from the Word documents previously created.

Inside the sections and subsections you will see prenotes and postnotes, inside these there are a few tags. The only thing you have to do in this file is to create and edit tags. Scroll down to the section called toc (Tables of Contents), here you will see the difference between prenotes and postnotes. It has to do where they appear in the final document. Just run a few tests and you’ll se what I mean. So let’s start to document.
In the system info section change this:

```vb
Cscript.exe ss-xml2word.vbs -xServer1.xml -llang_english.xml -sServer1_docs.xml
```

The above was just an example, you are of course free to write and include whatever you want in the documentation. If you fail to create the documents it’s good to know that XML parsers are very unforgiving if there’s an error in any of the files. Make sure all tags are closed correctly by opening them in a browser. If you fail to open Server1_docs.xml in a browser the problem is there. Fix it and try again.
I’ve also created a batch file, writedoc.cmd which looks like this:

```vb
cscript.exe tools\ss-xml2word.vbs -x\\serverr\net$\sydi\output\%1.xml -llanguage\lang_english.xml -s\\server\itsupport$\documentation-source\%1-written.xml -o\\server\itsupport$\documentation-binder\Server-%1.doc -d -b”Table Contemporary”
```

I use it by running

```vb
Writedoc.cmd Servername
```