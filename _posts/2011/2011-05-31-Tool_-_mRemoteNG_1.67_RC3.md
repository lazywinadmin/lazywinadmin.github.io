---
layout: single
title: Tool - mRemoteNG 1.67 RC3
excerpt: 
permalink: /2011/05/tool-mremoteng-167-rc3.html
tags:
  - tool
published: false
comments: true
---

New version of one of my favorite Admin tool: **mRemoteNG**

[Download](http://www.mremoteng.org/download/rc)

## Changes from 1.67 RC2 to 1.67 RC3

* Added confirmation before closing connection tabs.
* Fixed bug 42 - Maximized location not remembered with multiple monitors.
* Improved loading and saving of window location.
* Removed flickering on start up.
* Fixed bug 43 - Creating a duplicate connection causes connection list to no longer be sorted ascending.
* Improvements to German translation.

## Changes from 1.67 RC1 to 1.67 RC2

* Added partial French translation to the application.
* Addded Thai translation to the installer.
* Updated graphics in the installer to mRemoteNG logo.
* Added buttons for Add Connection, Add Folder, and Sort Ascending (A-Z) to the Connections panel toolbar.
* Fixed rename edit control staying open when collapsing all folders.

## Changed sorting to sort all subfolders below the selected folder.

* Allow sorting of connections if a connection entry is selected.
* Fixed adding a connection entry if nothing is selected in the tree.
* Added 15-bit Color RDP setting.
* Fixed loading of RDP Colors setting from SQL.
* Added Font Smoothing and Desktop Composition RDP settings.
* Improved error handling when loading XML connection files.
* Added the mRemoteNG icon to the list of selectable icons for connection entries.

## Changes from 1.66 to 1.67 RC1

* Fixed migration of external tools configuration and panel layout from Local to Roaming folder.
* Disable ICA Hotkeys for Citrix connections. Fixes issue with international users.
* Added a language selection option so users can override the language if they don't want it automatically detected.
* Fixed RD Gateway default properties and RDP reconnection count setting not being saved.
* Fixed bug 33 - IPv6 doesn't work in quick Connect box.
* Moved the items under Tools in the Connections panel context menu up to the top level.
