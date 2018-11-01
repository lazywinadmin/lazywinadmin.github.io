---
layout: single
title: How to Deploy an OVF Template from a Remote Web Server
excerpt: 
permalink: /2013/03/how-to-deploy-ovf-template-from-remote.html
tags: 
- ovf template
- url
- vcenter
- vcsa
- vmware
- web server
published: true
comments: true
---


<a href="http://3.bp.blogspot.com/-SFE54vcIfl8/UVEXr7bBBkI/AAAAAAABWwg/8wDgKoexhus/s1600/3-25-2013+11-35-36+PM.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="200" src="http://3.bp.blogspot.com/-SFE54vcIfl8/UVEXr7bBBkI/AAAAAAABWwg/8wDgKoexhus/s200/3-25-2013+11-35-36+PM.png" width="135" /></a>In the following post I am going to explain how to deploy an OVF Template from an URL.


The VMware vSphere Client allows you to deploy and export virtual machines, virtual appliances, and vApps stored in Open Virtual Machine Format (OVF).

An appliance is a pre-configured virtual machine that typically includes a preinstalled guest operating system and other software.





<div style="text-align: justify;">Methods to deploy an OVF TemplateUsing vSphere Client you have a couple of methods available to you :

* Remote web server (URL)

* Local Disk, USB keychain drives or CD/DVD drives

* Shared network drives

* <a href="http://www.vmware.com/support/developer/ovf/" target="_blank">OVFTool</a>(Command-line utility from VMware that allows you to import and export OVF packages to and from a wide variety of VMware platform products.)

In most cases, Administrators would probably browse their Local Disks or Network Shares.
However, In my case I want to deploy a template using the local datastore of my ESXi host, using an URL.


Using a Remote web server (URL) to deploy an OVF Template
Typically, in the following example I will use the built-in Web Server of my VMware ESXi host.

* Open vSphere Client and Click "<b>File - Deploy OVF Template</b>"

<a href="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/vCSA-00__1382088668__-332x312.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/vCSA-00__1382088668__-332x312.png" /></a><li style="text-align: left;">Now we need to get the URL link to the OVF Template. Navigate to<i>http://<Host IP></i>and select <b>Browse datastores in the host's inventory</b>

<a href="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-01__54768531__-802x913.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="400" src="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-01__1945513460__-351x400.png" width="351" /></a>
<li style="text-align: left;">Enter your credential (Example: root)

<a href="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-02__1719693575__-372x240.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-02__1719693575__-372x240.png" /></a>
<li style="text-align: left;">Navigate into the datastore where your template is located. In my case, the template is on the local disk of my ESXi Host.

<a href="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-03__2031358893__-734x374.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="203" src="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-03__1115113259__-400x204.png" width="400" /></a><li style="text-align: left;">Right click on this file and <b>Copy the Shortcut</b> (URL link)

<a href="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-04__443204987__-269x241.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-04__443204987__-269x241.png" /></a>
<li style="text-align: left;">Go back to vSphere Client, <i><b>Deploy OVF Template Wizard</b> </i>should be opened, Paste the URL in "<b>Deploy from a file or URL</b>" field, then click <b>Next.</b>

<a href="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-05__167232142__-744x708.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="380" src="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-05__1499511427__-400x381.png" width="400" /></a><table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;"><tbody><tr><td style="text-align: center;"><a href="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-06__1640046118__-352x325.png" imageanchor="1" style="margin-left: auto; margin-right: auto;"><img border="0" src="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-06__1640046118__-352x325.png" /></a></td></tr><tr><td class="tr-caption" style="text-align: center;">You might have to enter your credential again to access the Host</td></tr></tbody></table>

* And that's it, you are ready to continue the wizard. Verify the OVF template and click <b>Next</b>

<a href="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-07__493640785__-728x692.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="380" src="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-07__1093470022__-400x380.png" width="400" /></a>
<li style="text-align: left;">Enter a name for your new VM

<a href="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-08__613493989__-744x708.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="380" src="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-08__1423762206__-400x381.png" width="400" /></a><li style="text-align: left;">Choose the Datastore and Specify the Disk Format

<a href="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-09__738904776__-744x708.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="380" src="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-09__1536840945__-400x381.png" width="400" /></a>

* You are done, verify the information and click <b>Finish</b>! to launch the deployment.

<a href="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-10__1897334863__-744x708.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="380" src="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/OVF_ESXi-Local-10__472802979__-400x381.png" width="400" /></a>
<a href="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/vCSA-08__957380208__-409x210.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="{{ site.url }}/images/2013/20130326_How_to_Deploy_an_OVF_Template_from_a_Remote_Web_Server/vCSA-08__957380208__-409x210.png" /></a>
VMware Documentation
You can find more information here :<a href="http://pubs.vmware.com/vsphere-51/topic/com.vmware.ICbase/PDF/vsphere-esxi-vcenter-server-51-virtual-machine-admin-guide.pdf" target="_blank">vSphere Virtual Machine Administrator Guide 5.1</a>[page 93]


