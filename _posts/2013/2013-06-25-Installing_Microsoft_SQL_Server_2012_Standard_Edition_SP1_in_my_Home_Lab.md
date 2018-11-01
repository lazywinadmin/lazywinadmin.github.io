---
layout: single
title: Installing Microsoft SQL Server 2012 Standard Edition SP1 in my Home Lab
excerpt: 
permalink: /2013/06/installing-microsoft-sql-server-2012.html
tags: 
- database
- microsoft sql server 2012
- sql 2012
published: true
comments: true
---
<a href="{{ site.url }}/images/2013/20130625_Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/SQL-Server-2012__189173740__-256x256.jpg" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="130" src="{{ site.url }}/images/2013/20130625_Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/SQL-Server-2012__447326219__-200x200.jpg" width="130" /></a>Currently I'm playing with some products from the Microsoft System Center 2012 Suite in my Home Lab. I'm Starting the whole installation by installing a new Virtual Machine with Microsoft SQL Server 2012 (Standard Edition).

I used a dedicated VM that will be used to host the database of Configuration Manager 2012 and Orchestrator 2012 (at least.. for now)


<b>Resources</b>


* <a href="http://technet.microsoft.com/en-us/sqlserver/ff898410.aspx" target="_blank">Documentation - Microsoft SQL Server 2012 - Technet</a>

* <a href="http://www.microsoft.com/en-us/sqlserver/editions/2012-editions/standard.aspx" target="_blank">Download - Microsoft SQL Server 2012 - Technet</a>

* <a href="http://technet.microsoft.com/en-us/library/bb500469.aspx" target="_blank">Plan, Install, Upgrade, Uninstall, Failover Cluster - Technet</a>

<b>Installation</b>

1 - After launching the SQL 2012 Server Installation, you should first run the <b>System Configuration Checker</b>. This small tool will check if you have every requirements to install SQL Server.
<a href="http://3.bp.blogspot.com/-iG6DayOFJPc/UceTE8rnzzI/AAAAAAABaCI/zWd6sSsy-Gs/s1600/2013-06-23+8-25-03+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="482" src="http://3.bp.blogspot.com/-iG6DayOFJPc/UceTE8rnzzI/AAAAAAABaCI/zWd6sSsy-Gs/s640/2013-06-23+8-25-03+PM.png" width="640" /></a>


2 - The <b>System Configuration Checker.</b>As you can see, the Setup support Rules identify problems that might occur when you install SQL Server Setup support files. Failures must be corrected before Setup can continue.
<a href="http://1.bp.blogspot.com/-Ozko1ubzMWw/UceTFGCCuAI/AAAAAAABaCM/KOUr4N6b-gk/s1600/2013-06-23+8-25-49+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="482" src="http://1.bp.blogspot.com/-Ozko1ubzMWw/UceTFGCCuAI/AAAAAAABaCM/KOUr4N6b-gk/s640/2013-06-23+8-25-49+PM.png" width="640" /></a>
3 - Select<i> Installation</i> on the left navigation pane and select <i>New SQL Server stand-alone installation or add features to an existing installation</i><a href="{{ site.url }}/images/2013/20130625_Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/00__1951673337__-816x616.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em; text-align: center;"><img border="0" height="482" src="{{ site.url }}/images/2013/20130625_Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/00__441512096__-640x483.png" width="640" /></a>

4 - Enter your Product key or select <i>Specify a Free Edition</i> if you just want to and evaluation version.
<a href="{{ site.url }}/images/2013/20130625_Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/01__2014507277__-836x631.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="482" src="{{ site.url }}/images/2013/20130625_Installing_Microsoft_SQL_Server_2012_Standard_Edition_SP1_in_my_Home_Lab/01__1033329562__-640x483.png" width="640" /></a>

<div class="separator" style="clear: both; text-align: left;">5 - Read and Accept the License terms.<div class="separator" style="clear: both; text-align: left;">Optionally you can check the "<i>Send feature usage data to Microsoft....</i>"<a href="http://1.bp.blogspot.com/-ugrx-MEJwfU/UceTFlwZdtI/AAAAAAABaCU/miVv7Ri9e5c/s1600/2013-06-23+8-28-26+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="482" src="http://1.bp.blogspot.com/-ugrx-MEJwfU/UceTFlwZdtI/AAAAAAABaCU/miVv7Ri9e5c/s640/2013-06-23+8-28-26+PM.png" width="640" /></a>

6 - Leave the "<i>Include SQL Server product updates</i>" checked and click on Next.
<a href="http://3.bp.blogspot.com/-4fWHfOGWzY4/UceTF-jo5XI/AAAAAAABaCg/XsN2qgq-g9c/s1600/2013-06-23+8-28-53+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="482" src="http://3.bp.blogspot.com/-4fWHfOGWzY4/UceTF-jo5XI/AAAAAAABaCg/XsN2qgq-g9c/s640/2013-06-23+8-28-53+PM.png" width="640" /></a>

7 - On the Setup Support Rules, you can see that my firewall generate a warning.
I'll open the firewall later on. Click Next to continue
<a href="http://4.bp.blogspot.com/-vvX7_qF6b4w/Ucd-Zyw8VGI/AAAAAAABZ58/2Kw6mHhOpm0/s1600/2013-06-23+4-07-31+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="483" src="http://4.bp.blogspot.com/-vvX7_qF6b4w/Ucd-Zyw8VGI/AAAAAAABZ58/2Kw6mHhOpm0/s640/2013-06-23+4-07-31+PM.png" width="640" /></a>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://2.bp.blogspot.com/-EnEO1LlF97Y/Ucd-c58M_UI/AAAAAAABZ6E/LR1pJaJCbEI/s1600/2013-06-23+4-08-55+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="http://2.bp.blogspot.com/-EnEO1LlF97Y/Ucd-c58M_UI/AAAAAAABZ6E/LR1pJaJCbEI/s1600/2013-06-23+4-08-55+PM.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">When you click on the Windows Firewall rule Warning Link, you'll see the information above

</td></tr></tbody></table><div class="separator" style="clear: both; text-align: left;">8 - Select the standard Features to install, here I just need:<div class="separator" style="clear: both; text-align: left;">
* Database Engine Services

* Reporting Services - Native

* Management Tools - Basic

* Management Tools - Complete

<a href="http://2.bp.blogspot.com/-ynh9WOmHojc/Ucd-oGBc89I/AAAAAAABZ6Q/4juoaXGgUQI/s1600/2013-06-23+4-11-50+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="564" src="http://2.bp.blogspot.com/-ynh9WOmHojc/Ucd-oGBc89I/AAAAAAABZ6Q/4juoaXGgUQI/s640/2013-06-23+4-11-50+PM.png" width="640" /></a>
<a href="http://4.bp.blogspot.com/-ZsG_hGlenqk/Ucd-oKN2SGI/AAAAAAABZ6M/vLjnO2MeT2c/s1600/2013-06-23+4-12-15+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-ZsG_hGlenqk/Ucd-oKN2SGI/AAAAAAABZ6M/vLjnO2MeT2c/s1600/2013-06-23+4-12-15+PM.png" /></a>

<div class="separator" style="clear: both; text-align: left;">9 - Installation Rules - the Setup is running rules to determine if the installation process will be blocked.<a href="http://1.bp.blogspot.com/-I6h2rHI0-wI/Ucd_d5bhxzI/AAAAAAABZ6c/D51Zao4A3lw/s1600/2013-06-23+4-12-56+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em; text-align: center;"><img border="0" height="481" src="http://1.bp.blogspot.com/-I6h2rHI0-wI/Ucd_d5bhxzI/AAAAAAABZ6c/D51Zao4A3lw/s640/2013-06-23+4-12-56+PM.png" width="640" /></a>
<a href="http://4.bp.blogspot.com/-JBxJVfgXoZ4/Ucd_d4Hz8YI/AAAAAAABZ6o/JrfUi6MsCBc/s1600/2013-06-23+4-13-18+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://4.bp.blogspot.com/-JBxJVfgXoZ4/Ucd_d4Hz8YI/AAAAAAABZ6o/JrfUi6MsCBc/s1600/2013-06-23+4-13-18+PM.png" /></a>

10 - Specify the name and instance ID of the SQL Server Instance. By default:<b><i> MSSQLSERVER</i></b>. I continue with this setting and click Next.
<a href="http://1.bp.blogspot.com/-DuJ7DLeR3mU/Ucd_d5JRBwI/AAAAAAABZ6k/Xl1nH-RhP3c/s1600/2013-06-23+4-14-46+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="482" src="http://1.bp.blogspot.com/-DuJ7DLeR3mU/Ucd_d5JRBwI/AAAAAAABZ6k/Xl1nH-RhP3c/s640/2013-06-23+4-14-46+PM.png" width="640" /></a><a href="http://3.bp.blogspot.com/-_3dy0Nmle1I/Ucd_iCVjPKI/AAAAAAABZ60/pLrKHhfW_Uc/s1600/2013-06-23+4-15-06+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-_3dy0Nmle1I/Ucd_iCVjPKI/AAAAAAABZ60/pLrKHhfW_Uc/s1600/2013-06-23+4-15-06+PM.png" /></a>
11 - Review the disk space required for SQL Server and click Next. If you need to change the location of the database, click back and specify another folder/drive.
<a href="http://4.bp.blogspot.com/-xThswRuUn5U/Ucd_iLM04FI/AAAAAAABZ7A/l_0S0ns-FEw/s1600/2013-06-23+4-15-52+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="482" src="http://4.bp.blogspot.com/-xThswRuUn5U/Ucd_iLM04FI/AAAAAAABZ7A/l_0S0ns-FEw/s640/2013-06-23+4-15-52+PM.png" width="640" /></a>


12 - Specify the service accounts and collation configuration, here I set NT AUTHORITY\System for:


* SQL Server Agent

* SQL Server Database Engine

* SQL Server Reporting Services

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-yuV_5NwMhvY/Ucd_iJB6tLI/AAAAAAABZ64/GeDAi7vhC3k/s1600/2013-06-23+4-17-28+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="482" src="http://3.bp.blogspot.com/-yuV_5NwMhvY/Ucd_iJB6tLI/AAAAAAABZ64/GeDAi7vhC3k/s640/2013-06-23+4-17-28+PM.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">Before</td></tr></tbody></table><div class="separator" style="clear: both; text-align: left;">
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-Hr4evWlPKdQ/Ucd_vQZr-oI/AAAAAAABZ7M/AzbrBhheMwc/s1600/2013-06-23+4-19-26+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="482" src="http://3.bp.blogspot.com/-Hr4evWlPKdQ/Ucd_vQZr-oI/AAAAAAABZ7M/AzbrBhheMwc/s640/2013-06-23+4-19-26+PM.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">After</td></tr></tbody></table>

13 - Make sure the Database Engine is set to <i>SQL_Latin1_general_CP1_CI_AS</i>. If it's not the case, click on <b>Customize</b>, tick <b>SQL Collation, used backwards compatibility</b>, and select the good one in the list.
<a href="http://2.bp.blogspot.com/-AAaeHiaUGtI/Ucd_vX2c1hI/AAAAAAABZ7Q/HfBxKxYqMZ8/s1600/2013-06-23+4-20-12+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="482" src="http://2.bp.blogspot.com/-AAaeHiaUGtI/Ucd_vX2c1hI/AAAAAAABZ7Q/HfBxKxYqMZ8/s640/2013-06-23+4-20-12+PM.png" width="640" /></a>

<div class="separator" style="clear: both; text-align: left;">14 - In the next screen "<b>Database Engine Configuration</b>", specify the authentication mode and the administrators for the Database Engine. I added those:<div class="separator" style="clear: both; text-align: left;">
* The Current User (in my case the Domain Administrator account)

* The Domain Admins Group

* The Local Administrator Account

<a href="http://3.bp.blogspot.com/-e0aVvMfk47A/Ucd_12geiYI/AAAAAAABZ7g/dEpcafqJxC8/s1600/2013-06-23+4-22-18+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="482" src="http://3.bp.blogspot.com/-e0aVvMfk47A/Ucd_12geiYI/AAAAAAABZ7g/dEpcafqJxC8/s640/2013-06-23+4-22-18+PM.png" width="640" /></a><div class="separator" style="clear: both; text-align: left;">
<div class="separator" style="clear: both; text-align: left;">
<div class="separator" style="clear: both; text-align: left;">15 - Specify the Reporting Services configuration mode.<div class="separator" style="clear: both; text-align: left;">Here I Selected <i>Install and Configure</i><a href="http://2.bp.blogspot.com/-9OHf0xfQyWo/Ucd_6lf7o5I/AAAAAAABZ70/E6PYXxU2FyI/s1600/2013-06-23+4-22-43+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="482" src="http://2.bp.blogspot.com/-9OHf0xfQyWo/Ucd_6lf7o5I/AAAAAAABZ70/E6PYXxU2FyI/s640/2013-06-23+4-22-43+PM.png" width="640" /></a>

16 - Tick the "<i>Send Windows and SQL Server Error Reports to Microsoft ...</i>"
<a href="http://4.bp.blogspot.com/-EYP9ErLwmeE/Ucd_6v8JMlI/AAAAAAABZ7w/n7X_U6nMJBI/s1600/2013-06-23+4-23-14+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="482" src="http://4.bp.blogspot.com/-EYP9ErLwmeE/Ucd_6v8JMlI/AAAAAAABZ7w/n7X_U6nMJBI/s640/2013-06-23+4-23-14+PM.png" width="640" /></a>

17 - The Setup is running rules to determine if the installation process will be blocked during the installation process.
<a href="http://1.bp.blogspot.com/-OHZdrEx34KE/Ucd_6he0RzI/AAAAAAABZ7s/etP8Qlr3GPw/s1600/2013-06-23+4-23-35+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="482" src="http://1.bp.blogspot.com/-OHZdrEx34KE/Ucd_6he0RzI/AAAAAAABZ7s/etP8Qlr3GPw/s640/2013-06-23+4-23-35+PM.png" width="640" /></a>

<div class="separator" style="clear: both; text-align: left;">18 - Verify the SQL Server 2012 features to be installed and click on Install.<a href="http://4.bp.blogspot.com/-cM8Wxa13580/UceABJixk3I/AAAAAAABZ8E/zVC6dQzHHc4/s1600/2013-06-23+4-24-25+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="482" src="http://4.bp.blogspot.com/-cM8Wxa13580/UceABJixk3I/AAAAAAABZ8E/zVC6dQzHHc4/s640/2013-06-23+4-24-25+PM.png" width="640" /></a>Optionnaly you can check the ConfigurationFile.ini generated by the wizard. This can be reused for another installation.
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://4.bp.blogspot.com/-zyue5O9LXKc/UceABNgwkRI/AAAAAAABZ8M/fZD6YGRfSq4/s1600/2013-06-23+4-25-03+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="440" src="http://4.bp.blogspot.com/-zyue5O9LXKc/UceABNgwkRI/AAAAAAABZ8M/fZD6YGRfSq4/s640/2013-06-23+4-25-03+PM.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">ConfigurationFile.ini</td></tr></tbody></table>
<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="http://3.bp.blogspot.com/-hK41z27j3nc/UceABAopGrI/AAAAAAABZ8I/qUzfhWbN24I/s1600/2013-06-23+4-25-35+PM.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" height="482" src="http://3.bp.blogspot.com/-hK41z27j3nc/UceABAopGrI/AAAAAAABZ8I/qUzfhWbN24I/s640/2013-06-23+4-25-35+PM.png" width="640" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">ConfigurationFile.ini can be found under c:\Program Files\Microsoft SQL Server\110\Setup Bootstrap\Log\

</td></tr></tbody></table>19 - After a few minutes your Installation of SQL Server 2012 should be completed successfully
<a href="http://2.bp.blogspot.com/-jONglcpOzAc/UceABYura9I/AAAAAAABZ8k/sxb_cLcJA80/s1600/2013-06-23+5-05-08+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="552" src="http://2.bp.blogspot.com/-jONglcpOzAc/UceABYura9I/AAAAAAABZ8k/sxb_cLcJA80/s640/2013-06-23+5-05-08+PM.png" width="640" /></a>

You can check the logs under <b>c:\Program Files\Microsoft SQL Server\110\Setup Bootstrap\Log</b>
<a href="http://1.bp.blogspot.com/-4N1YbNNprZE/UceABfcSYSI/AAAAAAABZ8c/qCo99sXajpI/s1600/2013-06-23+5-05-42+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="441" src="http://1.bp.blogspot.com/-4N1YbNNprZE/UceABfcSYSI/AAAAAAABZ8c/qCo99sXajpI/s640/2013-06-23+5-05-42+PM.png" width="640" /></a>

20 - Finally you can launch <b>SQL Server 2012 Management Studio</b> to verify that everything run as expected.
<a href="http://2.bp.blogspot.com/-YGqYbb85z0U/UceABsgHzDI/AAAAAAABZ8g/IMfh6PyWrwQ/s1600/2013-06-23+5-10-44+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-YGqYbb85z0U/UceABsgHzDI/AAAAAAABZ8g/IMfh6PyWrwQ/s1600/2013-06-23+5-10-44+PM.png" /></a>
<a href="http://3.bp.blogspot.com/-javstpXRTaE/UceACdlYT6I/AAAAAAABZ8o/XHmAtDne5QU/s1600/2013-06-23+5-43-01+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://3.bp.blogspot.com/-javstpXRTaE/UceACdlYT6I/AAAAAAABZ8o/XHmAtDne5QU/s1600/2013-06-23+5-43-01+PM.png" /></a>
<a href="http://2.bp.blogspot.com/-1tQbxQ9on14/UceACaIdZyI/AAAAAAABZ8w/hhlu58AVA0I/s1600/2013-06-23+5-43-51+PM.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="http://2.bp.blogspot.com/-1tQbxQ9on14/UceACaIdZyI/AAAAAAABZ8w/hhlu58AVA0I/s1600/2013-06-23+5-43-51+PM.png" /></a>

