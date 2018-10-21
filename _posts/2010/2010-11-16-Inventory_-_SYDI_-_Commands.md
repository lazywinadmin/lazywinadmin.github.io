---
layout: single
title: Inventory - SYDI - Commands
excerpt: 
permalink: /2010/12/inventory-sydi-commands.html
tags: 
- documentation
- inventory
- scripting
- sydi
- vbscript
published: true
comments: true
---

SYDI is a VBscript tool that I used to gather all the information about servers and computers locally and remotely.

Here are some of the commands i use very often:

## SYDI WORD (Need MS Word on the machine)

`cscript sydi-server.vbs –t<NOM_DU_SERVER>`

## SYDI XML

`cscript sydi-server.vbs –t<NOM_DU_SERVER> -o<NOM_DU_SERVER>.xml -ex`

## XML TO DOC (Need MS Word on the machine)

`cscript.exe ss-xml2word.vbs -x<NOM_DU_SERVER>.xml -llang_english.xml`

## XLS – OVERVIEW (with XML Files)

`cscript.exe sydi-overview.vbs -x<PATH>`

## XML TO HTML (Need MS Excel on the machine)

`cscript.exe sydi-transform.vbs -x<SERVERNAME>.xml -sServerhtml.xsl -o<SERVERNAME>.html`