---
layout: single
title: Powershell - Get files or Folder list
excerpt: 
permalink: /2011/01/powershell-get-files-or-folder-list.html
tags: Powershell
published: true
comments: true
---
Directories: get-childitem . -recurse|where{$_.PsIsContainer} 
Files: get-childitem . -recurse|where{!$_.PsIsContainer}
