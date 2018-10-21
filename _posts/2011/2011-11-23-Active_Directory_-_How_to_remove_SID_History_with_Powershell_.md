---
layout: single
title: Active Directory - How to remove SID History with Powershell ?
excerpt: 
permalink: /2011/11/active-directory-how-to-remove-sid.html
tags: 
- active directory
- cleanup
- powershell
published: true
comments: true
---
<a href="http://blogs.technet.com/b/ashleymcglone/archive/2011/11/23/how-to-remove-sid-history-with-powershell.aspx?mid=5373" target="_blank">Source</a>

<div class="post-content user-defined-markup">In the United States we celebrate <a href="http://en.wikipedia.org/wiki/Thanksgiving" target="_blank" title="Thanksgiving">Thanksgiving</a> tomorrow. No matter where you are in the world let us all give thanks  for PowerShell. If Windows were the pumpkin pie, then PowerShell would  be the whipped cream on top. If Active Directory were the turkey, then  PowerShell would be the stuffing. If Exchange were the mashed potatoes,  then PowerShell would be the gravy. Eating and scripting are  complementary passions, so we give thanks for both.
This post is part four in the "PowerShell: SID Walker, Texas Ranger" series on documenting and remediating <strong>SID history</strong> in your AD forest. Go back and read over the <a href="http://blogs.technet.com/b/ashleymcglone/archive/tags/sid+history/" target="_blank" title="previous articles in the series">previous articles in the series</a> if you haven't had a chance yet. In today's post we will look at the  final step of remediating SID history: removing the SID history data  from our migrated AD objects. Cleaning up this stale data will greatly  reduce the chance of <a href="http://blogs.technet.com/b/ashleymcglone/archive/2011/05/19/using-powershell-to-resolve-token-size-issues-caused-by-sid-history.aspx" target="_blank">token size issues</a> for your users.

###  Background

In an <a href="http://blogs.technet.com/b/ashleymcglone/archive/2011/05/19/using-powershell-to-resolve-token-size-issues-caused-by-sid-history.aspx" target="_blank">earlier post</a> I explained the process for cleaning up SID history, and the last step is actually removing the data from your environment. <span style="background-color: yellow;">This is the <span style="text-decoration: underline;"><em>last</em> step. It is crucial that you have already remediated your ACLs, swapping old SIDs for new SIDs. The preferred method is the <a href="http://www.microsoft.com/downloads/en/details.aspx?FamilyID=20C0DB45-DB16-4D10-99F2-539B7277CCDB" target="_blank">ADMT</a>, and then for NAS file shares you can use the function I provided in <a href="http://blogs.technet.com/b/ashleymcglone/archive/2011/09/16/powershell-sid-walker-texas-ranger-part-2.aspx" target="_blank">part 2</a>. <span style="background-color: yellow;">Please  note that removing SID history may cause significant impact to your  users if you have not taken the time to migrate resource ACLs. I highly recommend reviewing the <a href="http://www.microsoft.com/downloads/en/details.aspx?FamilyID=6D710919-1BA5-41CA-B2F3-C11BCB4857AF" target="_blank">ADMT Guide</a> to make sure you have completed all migration steps up to this point.  You have been warned. Proceed carefully. As a backout plan make sure  you have a good system state backup from two DCs per domain. Using <a href="http://support.microsoft.com/kb/295758" target="_blank">VBScript</a> to clear SID history was painful. PowerShell achieves the same end with far fewer lines of code.

###  Get-SIDHistory | Remove-SIDHistory

I decided to divide this function into two parts. I wanted a dynamic  AD query to retrieve users and groups by specific criteria as a way to  surgically target the SID history removal. Then I wanted to pipe the  entries returned into a dedicated function for doing the actual  removal. This allows us to craft the right AD query in a safe  environment before pulling the trigger on SID history.

###  Get-SIDHistory

When removing SID history it is best to proceed in phases by  department or business unit. You know the drill. Start with a few  users in IT, then all of IT, then company departments beginning with the  least critical business impact (ie. Grounds Keeping before  Purchasing). You must send notification to your users asking them to  verify that all of their resource access and drive letters are still  good after the change.
Using <a href="http://technet.microsoft.com/en-us/library/ee617198.aspx" target="_blank">Get-ADObject</a> to query by name or OU is pretty straightforward, so I won't go into much detail there. <span style="background-color: yellow;">The  magic of this function, though, is the -DomainName parameter. You can  specify the FQDN of the former domain for which you wish to remove SID  history. Now that is cool! We can easily target the SID history by domain, because the SID object has a property called <a href="http://msdn.microsoft.com/en-us/library/system.security.principal.securityidentifier.aspx" target="_blank" title="AccountDomainSid">AccountDomainSid</a>.  We don't even have to parse it out. When we get back the SID history  entries, we can filter on this attribute to target a specific domain in  the SID history.
In order for this to work you have to first use Export-DomainSIDs to  create the DomainSIDs.CSV file that maps the domain names to the domain  SIDs. If you don't know the old domain name, then you can use the  -DomainSID switch to remove SID history for any unnamed domain. You can  copy the old domain SID from the SIDHistoryReport.CSV file produced by  the function Export-SIDMapping (included in the attached code). You  could also modify the DomainSIDs.CSV file by manually adding any other  domain names and SIDs from your own documentation.
Another feature of the Get-SIDHistory query is that it handles the <span style="background-color: yellow;">multi-value nature of the <a href="http://msdn.microsoft.com/en-us/library/ms679833%28VS.85%29.aspx" target="_blank">sIDHistory</a> attribute. We do this using the ExpandProperty parameter of <a href="http://technet.microsoft.com/en-us/library/dd315291.aspx" target="_blank">Select-Object</a> which I demonstrated <a href="http://blogs.technet.com/b/ashleymcglone/archive/2011/05/26/do-over-sid-history-one-liner.aspx" target="_blank">here</a>.  This allows us to identify and target specific SID history entries when  a user has been migrated more than once. The ExpandProperty parameter  ensures that we get a result row for every SID history entry regardless  of the count.
Here is an example without ExpandProperty:
<span style="font-family: 'Courier New'; font-size: xx-small;">Get-ADUser user1 -Property sIDHistory | Select-Object name, sIDHistory | Format-Table name, sIDHistory –AutoSize
<span style="font-family: 'Courier New'; font-size: xx-small;">name <span style="background-color: yellow;">sidhistory 
---- ---------- 
user1 {S-1-5-21-3013500491-1380372588-2491230877-1122, S-1-5-21-179552...
Here is an example with ExpandProperty:
<span style="font-family: 'Courier New'; font-size: xx-small;">Get-ADUser  user1 -Property sIDHistory | Select-Object name, sIDHistory  -ExpandProperty sidHistory | Format-Table name, sIDHistory –AutoSize
<span style="font-family: 'Courier New'; font-size: xx-small;">name <span style="background-color: yellow;">Value 
---- ----- 
user1 S-1-5-21-3013500491-1380372588-2491230877-1122 
user1 S-1-5-21-1795525639-2355993942-847153066-1695
Notice that ExpandProperty modifies the property name to "value". We  can rename that at the end of the pipe using Select-Object:
<span style="font-family: 'Courier New'; font-size: xx-small;">Select-Object DistinguishedName, <span style="background-color: yellow;">@{name="SID";expression={$_.Value}}
Get-SIDHistory takes the parameters you specify, shapes them into an AD query, and then uses <a href="http://technet.microsoft.com/en-us/library/dd347550.aspx" target="_blank">Invoke-Expression</a> to run it. In other words, this is code that writes code. I love that  feature of PowerShell. The query parameters are cumulative. Therefore  you can pile on two or three criteria for laser accuracy.
Here are a few examples of how you can use Get-SIDHistory:

* <span style="font-family: 'Courier New'; font-size: xx-small;">Get-SIDHistory –SamAccountName ashleym

* <span style="font-family: 'Courier New'; font-size: xx-small;">Get-SIDHistory –DomainName wingtiptoys.com

* <span style="font-family: 'Courier New'; font-size: xx-small;">Get-SIDHistory –DomainName wingtiptoys.com –SamAccountName ashleym

* <span style="font-family: 'Courier New'; font-size: xx-small;">Get-SIDHistory –DomainSID S-1-5-21-2371126157-4032412735-3953120161

* <span style="font-family: 'Courier New'; font-size: xx-small;">Get-SIDHistory –ObjectClass group

* <span style="font-family: 'Courier New'; font-size: xx-small;">Get-SIDHistory –SearchBase "OU=Sales,DC=contoso,DC=com"

* <span style="font-family: 'Courier New'; font-size: xx-small;">Get-SIDHistory –MemberOf MigratedUsers

* <span style="font-family: 'Courier New'; font-size: xx-small;">Get-SIDHistory | Measure-Object
Experiment with different combinations of parameters until you  isolate exactly the targets you need. Then you can script out multiple  statements for each phase of the remediation.

###  Remove-SIDHistory

This <a href="http://technet.microsoft.com/en-us/library/powershell_remove_sid_history%28WS.10%29.aspx" target="_blank">short TechNet article</a> provides syntax for removing SID history:
<span style="font-family: 'Courier New'; font-size: xx-small;">Get-ADUser  –filter 'sidhistory –like "*"' –searchbase "dc=name,dc=name"  –searchscope subtree –properties sidhistory | foreach {Set-ADUser $_  -remove @{sidhistory=$_.sidhistory.value}}
That single line of PowerShell is a "resumÃ©-generating-event". <span style="background-color: yellow;">DO NOT RUN THIS LINE IN YOUR ENVIRONMENT IF YOU WANT TO KEEP YOUR JOB. Wiping SID history for every user all at once is not a best practice (in case you were wondering).
You can call Remove-SIDHistory by specifying the distinguishedName of  the object and the SID entry to remove. However, that is a lot of  complicated typing. The intention is to use Get-SIDHistory to tailor  your query to exactly the results you want, and then simply pipe it to  Remove-SIDHistory. This works through a feature of PowerShell <a href="http://technet.microsoft.com/en-us/library/dd347600.aspx" target="_blank">advanced functions</a> called <a href="http://technet.microsoft.com/en-us/library/dd347560.aspx" target="_blank">cmdlet binding</a>. The <a href="http://msdn.microsoft.com/en-us/library/system.management.automation.parametersetmetadata.valuefrompipelinebypropertyname%28VS.85%29.aspx" target="_blank" title="ValueFromPipelineByPropertyName">ValueFromPipelineByPropertyName</a> argument allows us to pipe the output from one function into the next  as long as the first output properties match the second input  parameters. Features like this make PowerShell truly remarkable.
<span style="font-family: 'Courier New'; font-size: xx-small;">Get-SIDHistory –SamAccountName ashleym | Remove-SIDHistory
I recommend piping the output of the Remove-SIDHistory to a CSV file for change documentation. Like this:
<span style="font-family: 'Courier New'; font-size: xx-small;">Get-SIDHistory –SamAccountName ashleym | Remove-SIDHistory | Export-CSV removed.csv
Your CSV will include a date/time stamp for each entry's removal:
<a href="http://blogs.technet.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-84-58-metablogapi/4452.image_5F00_59575563.png"><img alt="image" border="0" height="115" src="http://blogs.technet.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-00-84-58-metablogapi/2046.image_5F00_thumb_5F00_782DC941.png" style="background-image: none; border: 0px; display: inline; padding-left: 0px; padding-right: 0px; padding-top: 0px;" title="image" width="594" /></a>
This documentation will come in handy if users start to call and  report issues after the removal. But that shouldn't happen if you are  thorough in scrubbing all SID history dependencies prior to removing the  data.

###  Conclusion

If you've been putting off SID history remediation due to the mystery  of how to remove it, then your puzzle is solved. Using the functions  in today's post will make the removal process swift and painless. Let  me reiterate that this is the <span style="background-color: yellow;">LAST step in the migration process. Do not proceed until all of your  resource translation is complete and verified. Phase the remediation by  user groups to limit any unforeseen impact. Following these  recommendations will make the transition as smooth as possible.
So if you are celebrating Thanksgiving with family tomorrow and  everyone around the table shares something they are thankful for, you  can be the geek that is thankful for PowerShell. Most likely no one  else at the table will know what you're talking about. Just smile and  nod.

###  Coming Up Next...

In the next installment of our SID history series we'll provide a  handy summary of each post in the series. We will also take the  function library we've been using and upgrade it to a PowerShell  module. Then we'll walk through the entire SID history remediation  process using the provided cmdlets in this module.<div class="post-attachment-viewer"><div class="post-attachment"><span class="value"><a class="internal-link download-attachment" href="http://blogs.technet.com/cfs-file.ashx/__key/communityserver-components-postattachments/00-03-46-70-13/SIDHistoryV1.2.zip">    <span class="avatar"><img alt="" border="0" src="http://blogs.technet.com/utility/filethumbnails/zip.gif" style="max-height: 28px; max-width: 28px;" />    SIDHistoryV1.2.zip    </a>
