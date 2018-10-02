---
layout: single
title: Protecting OU from accidental deletion
excerpt: 
permalink: /2011/01/protecting-ou-from-accidental-deletion.html
tags: 
published: true
comments: true
---
<p><a href="http://blogs.microsoft.co.il/blogs/scriptfanatic/archive/2009/09/13/protecting-ou-from-accidental-deletion.aspx" target="_blank">Source</a> <p>When you create new Organizational Units in Active Directory Users And Computers (ADUC) in Server 2008 (or with RSAT on 2003 domains), ADUC gives you the option to protect the OU from accidental deletion. <p><a href="{{ site.url }}/images/2011/20110124_Protecting_OU_from_accidental_deletion/ou_40692D70__1134245516__-451x384.png"><img title="ou" border="0" alt="ou" src="{{ site.url }}/images/2011/20110124_Protecting_OU_from_accidental_deletion/ou_thumb_43BA9F4B__774877284__-426x363.png" width="426" height="363"></a> <p>When this option is selected, ADUC updates the security descriptor of the object and, potentially, its parent, with Deny ACE for the Everyone domain group, which denies all administrators or users of this domain and domain controller the ability to delete this object. <p><a href="{{ site.url }}/images/2011/20110124_Protecting_OU_from_accidental_deletion/deny_54529A39__555126197__-636x171.png"><img title="" border="0" alt="" src="{{ site.url }}/images/2011/20110124_Protecting_OU_from_accidental_deletion/deny_thumb_6B316BB5__1853938117__-583x161.png" width="583" height="161"></a> <p><strong>Note:</strong> This setting does not provide protection against accidental deletion of a subtree that contains the protected object. Therefore, it is recommend that you enable this setting for all the protected object's containers up to the domain naming context head. <p>If you try to delete the OU youâ€™ll get the following dialog: <p><a href="{{ site.url }}/images/2011/20110124_Protecting_OU_from_accidental_deletion/outest_3EA83BCF__1593812023__-490x171.png"><img title="" border="0" alt="" src="{{ site.url }}/images/2011/20110124_Protecting_OU_from_accidental_deletion/outest_thumb_683C0702__756729131__-447x160.png" width="447" height="160"></a> <p>To unprotect a container uncheck the value from the objectâ€™s <b>Object</b> tab in ADUC. The <b>Object</b> tab is visible only when<b>Advanced Features </b>is selected on the <b>View</b> menu. <p><a href="{{ site.url }}/images/2011/20110124_Protecting_OU_from_accidental_deletion/object_4DFB9DDE__826321796__-414x461.png"><img title="object" border="0" alt="object" src="{{ site.url }}/images/2011/20110124_Protecting_OU_from_accidental_deletion/object_thumb_5A894AFA__1822522698__-384x426.png" width="384" height="426"></a> <p>With [PowerShell](http://www.microsoft.com/powershell) and [Quest AD cmdlets](http://www.quest.com/powershell/activeroles-server.aspx) we can enable or disable OU protection with a single line of code! <p><strong><u>Enable OU protection on all OUs</u></strong> <p>[Get-QADObject](http://wiki.powergui.org/index.php/Get-QADObject) â€“SizeLimit 0 -Type OrganizationalUnit | [Add-QADPermission](http://wiki.powergui.org/index.php/Add-QADPermission) -Deny -Account Everyone -ApplyTo ThisObjectOnly -Rights DeleteTree,Delete <p><u><strong>Enable protection for specific OU</strong></u> <p>[Add-QADPermission](http://wiki.powergui.org/index.php/Add-QADPermission) -Identity 'DistinguishedNameOfTheOU' -Deny -Account Everyone -ApplyTo ThisObjectOnly -Rights DeleteTree,Delete <p><strong><u>Remove protection for specific OU</u></strong> <p>[Get-QADPermission](http://wiki.powergui.org/index.php/Get-QADPermission) -Identity 'DistinguishedNameOfTheOU' -Deny -Account Everyone -ApplyTo ThisObjectOnly | [Remove-QADPermission](http://wiki.powergui.org/index.php/Remove-QADPermission)  