---
description: "Currently I’m playing with some products from the Microsoft System Center 2012 Suite in my Home Lab."
layout: single
title: Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab
seo_title: "Install SQL Server 2012 Standard SP1 in a Home Lab"
excerpt: 
permalink: /2013/06/installing-microsoft-sql-server-2012.html
tags: 
- database
- microsoft sql server 2012
- sql 2012
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20130625_Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/SQL-Server-2012__189173740__-256x256.jpg" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img alt="SQL Server 2012" loading="lazy" decoding="async" border="0" height="130" src="{{ site.url }}/images/2013/20130625_Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/SQL-Server-2012__447326219__-200x200.jpg" width="130" /></a>Currently I'm playing with some products from the Microsoft System Center 2012 Suite in my Home Lab. I'm Starting the whole installation by installing a new Virtual Machine with Microsoft SQL Server 2012 (Standard Edition).

I used a dedicated VM that will be used to host the database of Configuration Manager 2012 and Orchestrator 2012 (at least.. for now)


<b>Resources</b>


* <a href="http://technet.microsoft.com/en-us/sqlserver/ff898410.aspx" target="_blank">Documentation - Microsoft SQL Server 2012 - Technet</a>

* <a href="https://web.archive.org/web/20130629092526/http://www.microsoft.com/en-us/sqlserver/editions/2012-editions/standard.aspx" target="_blank">Download - Microsoft SQL Server 2012 - Technet</a>

* <a href="http://technet.microsoft.com/en-us/library/bb500469.aspx" target="_blank">Plan, Install, Upgrade, Uninstall, Failover Cluster - Technet</a>

<b>Installation</b>

1 - After launching the SQL 2012 Server Installation, you should first run the <b>System Configuration Checker</b>. This small tool will check if you have every requirements to install SQL Server.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_8-25-03_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 2 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_8-25-03_PM_s640.webp" width="640" /></a>


2 - The <b>System Configuration Checker.</b>As you can see, the Setup support Rules identify problems that might occur when you install SQL Server Setup support files. Failures must be corrected before Setup can continue.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_8-25-49_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 3 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_8-25-49_PM_s640.png" width="640" /></a>
3 - Select<i> Installation</i> on the left navigation pane and select <i>New SQL Server stand-alone installation or add features to an existing installation</i><a href="{{ site.url }}/images/2013/20130625_Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/00__1951673337__-816x616.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em; text-align: center;"><img alt="Image 4 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/20130625_Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/00__441512096__-640x483.png" width="640" /></a>

4 - Enter your Product key or select <i>Specify a Free Edition</i> if you just want to and evaluation version.
<a href="{{ site.url }}/images/2013/20130625_Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/01__2014507277__-836x631.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 5 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/20130625_Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/01__1033329562__-640x483.png" width="640" /></a>

<div class="separator" style="clear: both; text-align: left;">5 - Read and Accept the License terms.<div class="separator" style="clear: both; text-align: left;">Optionally you can check the "<i>Send feature usage data to Microsoft....</i>"<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_8-28-26_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 6 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_8-28-26_PM_s640.png" width="640" /></a>

6 - Leave the "<i>Include SQL Server product updates</i>" checked and click on Next.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_8-28-53_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 7 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_8-28-53_PM_s640.png" width="640" /></a>

7 - On the Setup Support Rules, you can see that my firewall generate a warning.
I'll open the firewall later on. Click Next to continue
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-07-31_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 8 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="483" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-07-31_PM_s640.png" width="640" /></a>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-08-55_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 9 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-08-55_PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">When you click on the Windows Firewall rule Warning Link, you'll see the information above

</td></tr></tbody></table><div class="separator" style="clear: both; text-align: left;">8 - Select the standard Features to install, here I just need:<div class="separator" style="clear: both; text-align: left;">
* Database Engine Services

* Reporting Services - Native

* Management Tools - Basic

* Management Tools - Complete

<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-11-50_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 10 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="564" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-11-50_PM_s640.webp" width="640" /></a>
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-12-15_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 11 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-12-15_PM.png" /></a>

<div class="separator" style="clear: both; text-align: left;">9 - Installation Rules - the Setup is running rules to determine if the installation process will be blocked.<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-12-56_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em; text-align: center;"><img alt="Image 12 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="481" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-12-56_PM_s640.png" width="640" /></a>
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-13-18_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 13 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-13-18_PM.png" /></a>

10 - Specify the name and instance ID of the SQL Server Instance. By default:<b><i> MSSQLSERVER</i></b>. I continue with this setting and click Next.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-14-46_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 14 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-14-46_PM_s640.png" width="640" /></a><a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-15-06_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 15 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-15-06_PM.png" /></a>
11 - Review the disk space required for SQL Server and click Next. If you need to change the location of the database, click back and specify another folder/drive.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-15-52_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 16 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-15-52_PM_s640.png" width="640" /></a>


12 - Specify the service accounts and collation configuration, here I set NT AUTHORITY\System for:


* SQL Server Agent

* SQL Server Database Engine

* SQL Server Reporting Services

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-17-28_PM.webp" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 17 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-17-28_PM_s640.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Before</td></tr></tbody></table><div class="separator" style="clear: both; text-align: left;">
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-19-26_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 18 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-19-26_PM_s640.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">After</td></tr></tbody></table>

13 - Make sure the Database Engine is set to <i>SQL_Latin1_general_CP1_CI_AS</i>. If it's not the case, click on <b>Customize</b>, tick <b>SQL Collation, used backwards compatibility</b>, and select the good one in the list.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-20-12_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 19 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-20-12_PM_s640.png" width="640" /></a>

<div class="separator" style="clear: both; text-align: left;">14 - In the next screen "<b>Database Engine Configuration</b>", specify the authentication mode and the administrators for the Database Engine. I added those:<div class="separator" style="clear: both; text-align: left;">
* The Current User (in my case the Domain Administrator account)

* The Domain Admins Group

* The Local Administrator Account

<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-22-18_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 20 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-22-18_PM_s640.png" width="640" /></a><div class="separator" style="clear: both; text-align: left;">
<div class="separator" style="clear: both; text-align: left;">
<div class="separator" style="clear: both; text-align: left;">15 - Specify the Reporting Services configuration mode.<div class="separator" style="clear: both; text-align: left;">Here I Selected <i>Install and Configure</i><a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-22-43_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 21 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-22-43_PM_s640.png" width="640" /></a>

16 - Tick the "<i>Send Windows and SQL Server Error Reports to Microsoft ...</i>"
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-23-14_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 22 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-23-14_PM_s640.png" width="640" /></a>

17 - The Setup is running rules to determine if the installation process will be blocked during the installation process.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-23-35_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 23 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-23-35_PM_s640.png" width="640" /></a>

<div class="separator" style="clear: both; text-align: left;">18 - Verify the SQL Server 2012 features to be installed and click on Install.<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-24-25_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 24 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-24-25_PM_s640.png" width="640" /></a>Optionnaly you can check the ConfigurationFile.ini generated by the wizard. This can be reused for another installation.
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-25-03_PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 25 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="440" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-25-03_PM_s640.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">ConfigurationFile.ini</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-25-35_PM.webp" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img alt="Image 26 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="482" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_4-25-35_PM_s640.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">ConfigurationFile.ini can be found under c:\Program Files\Microsoft SQL Server\110\Setup Bootstrap\Log\

</td></tr></tbody></table>19 - After a few minutes your Installation of SQL Server 2012 should be completed successfully
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_5-05-08_PM.webp" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 27 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="552" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_5-05-08_PM_s640.webp" width="640" /></a>

You can check the logs under <b>c:\Program Files\Microsoft SQL Server\110\Setup Bootstrap\Log</b>
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_5-05-42_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 28 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" height="441" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_5-05-42_PM_s640.png" width="640" /></a>

20 - Finally you can launch <b>SQL Server 2012 Management Studio</b> to verify that everything run as expected.
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_5-10-44_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 29 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_5-10-44_PM.png" /></a>
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_5-43-01_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 30 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_5-43-01_PM.png" /></a>
<a href="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_5-43-51_PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img alt="Image 31 from the post &quot;Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab&quot;" loading="lazy" decoding="async" border="0" src="{{ site.url }}/images/2013/Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/2013-06-23_5-43-51_PM.png" /></a>

