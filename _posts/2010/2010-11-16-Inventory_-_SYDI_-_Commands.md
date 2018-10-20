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
<div style="background-attachment: initial; background-clip: initial; background-color: white; background-image: initial; background-origin: initial; background-position: initial initial; background-repeat: initial initial; font: normal normal normal 13px/19px Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; margin-top: 0px; padding-bottom: 0.6em; padding-left: 0.6em; padding-right: 0.6em; padding-top: 0.6em;"><strong>#SYDI WORD (Need MS Word on the machine)</strong>
<span class="Apple-style-span" style="color: #274e13; font-family: 'Courier New', Courier, monospace; font-size: small;">cscript sydi-server.vbs –t<NOM_DU_SERVER>
<u>
</u>
<strong>#SYDI XML</strong>
<span class="Apple-style-span" style="color: #274e13; font-family: 'Courier New', Courier, monospace; font-size: small;">cscript sydi-server.vbs –t<NOM_DU_SERVER> -o<NOM_DU_SERVER>.xml -ex
<u>
</u>
<strong>#XML TO DOC (Need MS Word on the machine)</strong>
<span class="Apple-style-span" style="color: #274e13; font-family: 'Courier New', Courier, monospace; font-size: small;">cscript.exe ss-xml2word.vbs -x<NOM_DU_SERVER>.xml -llang_english.xml
<u>
</u>
<strong>#XLS – OVERVIEW (with XML Files)</strong>
<span class="Apple-style-span" style="color: #274e13; font-family: 'Courier New', Courier, monospace; font-size: small;">cscript.exe sydi-overview.vbs -x<PATH>
<u>
</u>
<strong>#XML TO HTML (Need MS Excel on the machine)</strong>
<span class="Apple-style-span" style="color: #274e13; font-family: 'Courier New', Courier, monospace; font-size: small;">cscript.exe sydi-transform.vbs -x<SERVERNAME>.xml -sServerhtml.xsl -o<SERVERNAME>.html
<u>
</u>
