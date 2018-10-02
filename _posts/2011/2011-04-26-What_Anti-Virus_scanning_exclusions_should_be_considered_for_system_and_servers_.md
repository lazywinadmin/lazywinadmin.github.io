---
layout: single
title: What Anti-Virus scanning exclusions should be considered for system and servers ?
excerpt: 
permalink: /2011/04/what-anti-virus-scanning-exclusions.html
tags: 
- anti-virus
- scan
- sccm
- security
- virus
- windows server
published: true
comments: true
---
[Source](http://myitforum.com/cs2/blogs/scassells/archive/2007/05/14/what-anti-virus-scanning-exclusions-should-be-considered-for-system-and-servers.aspx)

<span class="Apple-style-span" style="font-family: Tahoma, Arial, Helvetica; font-size: 13px;">
Consider the following<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h1" title="#h1"></a>file scanning exceptions for your Anti-Virus software where applicable:

<strong>NOTE</strong>: The %systemroot% is normally the C:\WINDOWS or C:\WINNT directory depending on your OS.
<strong>NOTE</strong>: the %systemroot% variable will not work as an exclusion for some OSs. So make sure to spell out full path in your exclusion files (GPO or via AntiVirus Server)

1.) %systemroot%\System32\Spool (and all the sub-folders and files)
2.) %systemroot%\SoftwareDistribution\Datastore
Refer to the following article for information:
KB822158 - Virus scanning recommendations for computers that are running Windows Server 2003, Windows 2000, or Windows XP<a href="http://support.microsoft.com/kb/822158" style="color: #006ff7;">http://support.microsoft.com/kb/822158</a>
3.) Any Network Drives that are mapped.




The following steps are Server Role specific:
==========================================================
1.) If your system is also<strong>a Domain Controller (DC) / DNS / DHCP</strong>also<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h2" title="#h2"></a>exclude the following from Anti-Virus Scanning:
a.) %systemroot%\Sysvol folder (include all the sub-folders and files)
b.) %systemroot%\system32\dhcp folder (include all the sub-folders and files)
c.) %systemroot%\system32\dns folder (include all the sub-folders and files)
d.) %systemroot%\ntds
Refer to the following article for information:
KB822158 - Virus scanning recommendations for computers that are running Windows Server 2003, Windows 2000, or Windows XP<a href="http://support.microsoft.com/kb/822158" style="color: #006ff7;">http://support.microsoft.com/kb/822158</a>

2.) If<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h3" title="#h3"></a><strong>File</strong><strong>Replication (NTFR)</strong>service is running on your system, make sure yourAnti-Virus software is compatible:
KB815263 - Antivirus, backup, and disk optimization programs that are compatible with the<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h4" title="#h4"></a>File Replication Service
<a href="http://support.microsoft.com/kb/815263" style="color: #006ff7;">http://support.microsoft.com/kb/815263</a>
And<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h5" title="#h5"></a>exclude:
a.) %systemroot%\ntfrs folder (include all the sub-folders and files)
b.) Files that have the .log and .dit extension

3.) If you have<strong>IIS</strong>installed,<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h6" title="#h6"></a>exclude:
a.) The IIS compression directory (default compression directory is %systemroot%\IIS Temporary Compressed Files)
b.) %systemroot%\system32\inetsrv folder
c.) Files that have the .log extension
Refer to the following knowledge base articles for reference:
KB817442 - IIS 6.0: Antivirus Scanning of IIS Compression Directory May Result in 0-Byte<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h7" title="#h7"></a>File
<a href="http://support.microsoft.com/kb/817442" style="color: #006ff7;">http://support.microsoft.com/kb/817442</a>
KB821749 - Antivirus software may cause IIS to stop unexpectedly
<a href="http://support.microsoft.com/kb/821749" style="color: #006ff7;">http://support.microsoft.com/kb/821749</a>

4.) If you have<strong>SQL</strong>installed, you may want to<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h8" title="#h8"></a>exclude the SQL folder and databases files (or database<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h9" title="#h9"></a>file types) from scanning for performance reasons:
KB309422 - Guidelines for choosing antivirus software to run on the computers that are running SQL Server
<a href="http://support.microsoft.com/kb/309422" style="color: #006ff7;">http://support.microsoft.com/kb/309422</a>

5.) If you have<strong>Exchange</strong>installed, perform the relevant<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h10" title="#h10"></a>file-based scanning exclusions listed in Knowledge Base articles:
KB328841 - Exchange and antivirus software
<a href="http://support.microsoft.com/kb/328841" style="color: #006ff7;">http://support.microsoft.com/kb/328841</a>
KB823166 - Overview of Exchange Server 2003 and antivirus software
<a href="http://support.microsoft.com/kb/823166" style="color: #006ff7;">http://support.microsoft.com/kb/823166</a>
KB245822 - Recommendations for troubleshooting an Exchange Server computer with antivirus software installed
<a href="http://support.microsoft.com/kb/245822" style="color: #006ff7;">http://support.microsoft.com/kb/245822</a>

6.) If you have<strong>Cluster services</strong>, make sure your Anti-Virus software is compatible:
KB250355 - Antivirus Software May Cause Problems with Cluster Services
<a href="http://support.microsoft.com/kb/250355" style="color: #006ff7;">http://support.microsoft.com/kb/250355</a>
NOTE: If you have a SQL cluster, make sure that you<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h11" title="#h11"></a>exclude these locations from virus scanning:
a.) Q:\ (Quorum drive)
b.) %systemroot%\Cluster
c.) SQL Server data files that have the .mdf extension, the .ldf extension, and the .ndf extension

7.) If you have<strong>Sharepoint</strong>installed, you should<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h12" title="#h12"></a>exclude:
a.) Drive:\Program Files\SharePoint Portal Server
b.) Drive:\Program Files\Common Files\Microsoft Shared\Web Storage System
c.) Drive:\MSDEDatabases (particularly on SBS) (where Drive: is the drive letter where you installed SharePoint Portal Server)
Refer to the following knowledge base articles for reference:
KB320111 - Random Errors May Occur When Antivirus Software Scans Microsoft Web Storage System
<a href="http://support.microsoft.com/kb/320111" style="color: #006ff7;">http://support.microsoft.com/kb/320111</a>
KB322941 - Microsoft's Position on Antivirus Solutions for Microsoft SharePoint Portal Server
<a href="http://support.microsoft.com/kb/322941" style="color: #006ff7;">http://support.microsoft.com/kb/322941</a>

8.) If you have a<strong>Systems Management Server</strong>(<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h13" title="#h13"></a>SMS), you should<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h14" title="#h14"></a>exclude folders:
a.)<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h15" title="#h15"></a>SMS\Inboxes
b.) SMS_CCM\ServiceData
Refer to the following knowledge base articles for reference:
KB327453 - Antivirus programs may contribute to<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h16" title="#h16"></a>file backlogs in<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h17" title="#h17"></a>SMS 2.0 and in<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h18" title="#h18"></a>SMS 2003
<a href="http://support.microsoft.com/kb/327453" style="color: #006ff7;" title="http://support.microsoft.com/kb/327453">http://support.microsoft.com/kb/327453</a>
<span style="font-family: Arial, sans-serif; font-size: 10pt;"><strong>NOTE</strong>: If you<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h19" title="#h19"></a>exclude the<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h20" title="#h20"></a>SMS\Inboxes directory from virus scanning or remove the antivirus software, you may make the site server and all clients vulnerable to potential virus risks. The client base component files reside in the<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h21" title="#h21"></a>SMS\Inboxes directory.

9.) If you have a<strong>MOM (Microsoft Operations Manager) Server</strong>, you consider excluding:
a.) Drive:\Documents and Settings\All Users\Application Data\Microsoft\Microsoft Operations Manager
b.) Drive:\Program Files\Microsoft Operations Manager 2005 (where Drive: is the drive letter where profiles are located)

10.) If you have an<strong>Internet Security and Acceleration Server (ISA) Server</strong>, you should<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h22" title="#h22"></a>exclude:
a.) The ISALogs folder. By default, the ISALogs folder is located in the folder where you installed ISA Server. Typically, this location is Drive:\Program Files\Microsoft ISA Server.
Refer to the following knowledge base articles for reference:
KB887311 - Event ID 5, event ID 14079, and event ID 14176 are logged in the Application log on your Internet Security and Acceleration Server 2000 computer
<a href="http://support.microsoft.com/kb/887311" style="color: #006ff7;">http://support.microsoft.com/kb/887311</a>

11.) If you have a<strong>Windows Software Update Services (WSUS) Server</strong>role, you consider excluding:
a.) Drive:\MSSQL$WSUS
b.) Drive:\WSUS
(where Drive: is the drive letter where you installed Windows Software Update
Services)
Also refer to the following knowledge base articles for reference:
KB900638 - Multiple symptoms occur if an antivirus<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h23" title="#h23"></a>scan occurs while the Wsusscan.cab<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h24" title="#h24"></a>file is copied
<a href="http://support.microsoft.com/kb/900638" style="color: #006ff7;">http://support.microsoft.com/kb/900638</a>


MORE INFORMATION:
KB49500 - List of antivirus software vendors
<a href="http://support.microsoft.com/kb/49500" style="color: #006ff7;">http://support.microsoft.com/kb/49500</a>
KB129972 - Computer viruses: description, prevention, and recovery
<a href="http://support.microsoft.com/kb/129972" style="color: #006ff7;">http://support.microsoft.com/kb/129972</a>

Small Business Server (SBS):
========================================
KB885685 - How to troubleshoot the POP3 Connector in Windows Small Business Server 2003
<a href="http://support.microsoft.com/kb/885685" style="color: #006ff7;">http://support.microsoft.com/kb/885685</a>

SOX050603700001 - How do I<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h25" title="#h25"></a>exclude a<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h26" title="#h26"></a>file from<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h27" title="#h27"></a>AV scanning?
SOX040212700018 - Anti Virus Software and System State Backup
SOX060301700048 - ISA 2004 Firewall Service crashes intermittently with Event ID: 5 Source: Microsoft Firewall
SOX060307700037 - MOM 2005/<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h28" title="#h28"></a>File level Anti-virus scanners
SOX061205700029 - MOM Agent Installation fails with -2147023277

KB837932 - Event ID 2108 and Event ID 1084 occur during inbound replication of Active Directory in Windows 2000 Server and in Windows Server 2003
<a href="http://support.microsoft.com/kb/837932" style="color: #006ff7;">http://support.microsoft.com/kb/837932</a>
Anti-Virus folder exclusions have not been configured (Exchange)
<a href="http://www.microsoft.com/technet/prodtechnol/exchange/Analyzer/9fb755f5-5f0b-4817-a584-70c76a62eae2.mspx" style="color: #006ff7;">http://www.microsoft.com/technet/prodtechnol/exchange/Analyzer/9fb755f5-5f0b-4817-a584-70c76a62eae2.mspx</a>
Process: Manage Antivirus Software on Domain Controllers
<a href="http://www.microsoft.com/technet/solutionaccelerators/cits/mo/winsrvmg/adpog/adpog3.mspx#EHBBG" style="color: #006ff7;">http://www.microsoft.com/technet/solutionaccelerators/cits/mo/winsrvmg/adpog/adpog3.mspx#EHBBG</a>

Keywords:
<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h29" title="#h29"></a>AV scanning,<a class="" href="http://www.blogger.com/post-edit.g?blogID=5118199599906690528&amp;postID=3371138807439705803" name="#h30" title="#h30"></a>Scan exceptions, Antivirus scanning, first level scanning exclusions, first level scanning exceptions, Server Roles, Server scanning
