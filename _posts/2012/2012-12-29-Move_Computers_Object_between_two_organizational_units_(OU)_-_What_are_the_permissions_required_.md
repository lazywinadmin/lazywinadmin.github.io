---
layout: single
title: Move Computers Object between two organizational units (OU) - What are the permissions required ?
excerpt: 
permalink: /2012/12/move-computers-object-between-two.html
tags: 
- active directory
- automation
- computer object
- delegation
- permission
- security
published: true
comments: true
---
Today I was playing a bit in my lab with PowerShell and AD Computer Objects.
I automate the daily cleanup of Inactive Computer Object and move them to a specific OU.
This script is running with his own service account, the privileges required are specified below.

<u>Move Computer Object INSIDE an OU:</u>
-Create Computer

<u>Move Computer Object OUTSIDE an OU:</u>
-Delete Computer
-Write All Properties

As an example, here I was using the "Delegation of Control Wizard" to allow the "Move out"

<a href="{{ site.url }}/images/2012/20121229_Move_Computers_Object_between_two_organizational_units_(OU)_-_What_are_the_permissions_required_/AD-Move_Computers_delegation-01__557436448__-513x398.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" eea="true" height="310" src="{{ site.url }}/images/2012/20121229_Move_Computers_Object_between_two_organizational_units_(OU)_-_What_are_the_permissions_required_/AD-Move_Computers_delegation-01__1819022111__-400x310.jpg" width="400" /></a>
<a href="{{ site.url }}/images/2012/20121229_Move_Computers_Object_between_two_organizational_units_(OU)_-_What_are_the_permissions_required_/AD-Move_Computers_delegation-02__1322620529__-512x396.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" eea="true" height="308" src="{{ site.url }}/images/2012/20121229_Move_Computers_Object_between_two_organizational_units_(OU)_-_What_are_the_permissions_required_/AD-Move_Computers_delegation-02__1704995565__-400x309.jpg" width="400" /></a>
<a href="{{ site.url }}/images/2012/20121229_Move_Computers_Object_between_two_organizational_units_(OU)_-_What_are_the_permissions_required_/AD-Move_Computers_delegation-03__211554978__-513x397.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" eea="true" height="308" src="{{ site.url }}/images/2012/20121229_Move_Computers_Object_between_two_organizational_units_(OU)_-_What_are_the_permissions_required_/AD-Move_Computers_delegation-03__2064972025__-400x310.jpg" width="400" /></a>
<a href="{{ site.url }}/images/2012/20121229_Move_Computers_Object_between_two_organizational_units_(OU)_-_What_are_the_permissions_required_/AD-Move_Computers_delegation-04__907383694__-512x398.jpg" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" eea="true" height="310" src="{{ site.url }}/images/2012/20121229_Move_Computers_Object_between_two_organizational_units_(OU)_-_What_are_the_permissions_required_/AD-Move_Computers_delegation-04__404798573__-400x311.jpg" width="400" /></a>

