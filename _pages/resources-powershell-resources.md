---
layout: archive
title: "PowerShell resources"
permalink: /resources/powershell/resources
author_profile: false
sidebar:
  nav: "resources"
toc: true
toc_label: "Table of content"
toc_icon: "file-text"
---
## Blog Roll

<table>
  <thread>
    <tr>
      <th>Name</th>
      <th>Blog</th> 
    </tr>
  </thread>
  <tbody>
    {% for blog in site.data.blogroll %}
    <tr>
      <td>{{ blog.blogger }}</td>
      <td><a href="{{ blog.link }}">{{ blog.link }}</a></td> 
    </tr>
    {% endfor %}
  </tbody>
</table>

## Training (Videos)
* [MVA - Testing PowerShell with Pester with Adam Bertram/Ashley McGlone](https://mva.microsoft.com/en-US/training-courses/testing-powershell-with-pester-17650?l=mg8oBM9vD_8811787177)

## Cheatsheets

## Other

* [Regular Expression reference (Lee Holmes)](http://www.powershellcookbook.com/recipe/qAxK/appendix-b-regular-expression-reference)



## Website

* [PowerShell (official website)](https://msdn.microsoft.com/en-us/powershell?f=255&MSPPError=-2147217396)
* [PowerShell Team blog](https://blogs.msdn.microsoft.com/powershell/)
