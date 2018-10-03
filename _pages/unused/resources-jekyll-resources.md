---
layout: archive
title: "Jekyll Resources"
permalink: /resources/jekyll/resources
author_profile: false
sidebar:
  nav: "resources"
---

# Markdown

## Template/Manipulation/Expand etc..

https://jekyllrb.com/docs/templates/

## Links

https://jekyllrb.com/docs/templates/#linking-to-posts

### Variable
Declare:`[Link1]: http://lazywinadmin.com`
Use it: `[Some Text][Link1]`

or

Declare:`[Link1]: http://lazywinadmin.com "Some description here"`
Use it: `[Some Text][Link1]`

the last part `"Some description here"` will be visible when you pass over the link

### Image

#### Show an image

```text
![useful image]({{ site.url }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroup_Get-DistributionGroupMember__1466182560__-772x318.png)
```

![useful image]({{ site.url }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroup_Get-DistributionGroupMember__1466182560__-772x318.png)

```text
![useful image]({{ base_path }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroup_Get-DistributionGroupMember__1466182560__-772x318.png)
```

![useful image]({{ base_path }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroup_Get-DistributionGroupMember__1466182560__-772x318.png)

#### Show an image with a link

```text
[![Get-DistributionGroupMember error]({{ base_path }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroup_Get-DistributionGroupMember__1466182560__-772x318.png)]({{ base_path }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroup_Get-DistributionGroupMember__1466182560__-772x318.png)
```

[![Get-DistributionGroupMember error]({{ base_path }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroup_Get-DistributionGroupMember__1466182560__-772x318.png)]({{ base_path }}/images/2015/20150824_PowerShellOffice_365_-_Get_the_distribution_groups_membership/Get-DistributionGroup_Get-DistributionGroupMember__1466182560__-772x318.png)


#### Declare an image (specific to Minimal mistakes)

Declare:`[ImageLink1]: http://lazywinadmin.com/lazy.jpg`
Use it: `![Description][ImageLink1]`

You can also add a text that will be visible when you pass over.
Declare:`[ImageLink1]: http://lazywinadmin.com/lazy.jpg "Some details"`
Use it: `![Description][ImageLink1]`

or

Declare:`[ImageLink1]: http://lazywinadmin.com/lazy.jpg "Some details"`
Use it: `![Description][ImageLink1]`


#### Image aligned left in post with text around (specific to minimal mistakes)

Align left
```
![image-left]({{ site.url }}{{ site.baseurl }}/assets/images/image-alignment-150x150.jpg){: .align-left}
```

see:

https://github.com/mmistakes/minimal-mistakes/blob/57a4324fa04086ee8c035a6969d3c415f250e556/docs/_posts/2013-01-10-markup-image-alignment.md

https://mmistakes.github.io/minimal-mistakes/markup/markup-image-alignment/

### Link

`<http://lazywinadmin.com>`
or
`[http://lazywinadmin.com](http://lazywinadmin.com)`

### Emoticons

Just copy and paste those: [https://emojipedia.org/](https://emojipedia.org/)

### Update the top right navigation

`navigation.yml`

### Build a navigation menu for a series of posts

`navigation.yml`
You will also need to specify in the top of your post the navigation info

### Edit the profile picture

Update `img {` in `_sidebar.scss`

```css
.author__avatar {
  display: table-cell;
  vertical-align: top;
  width: 36px;
  height: 36px;

  @include breakpoint($large) {
    display: block;
    width: auto;
    height: auto;
  }

  img {
    max-width: 110px;
    border-radius: 50%;

    @include breakpoint($large) {
      padding: 5px;
      border: 1px solid $border-color;
    }
  }
}
```

### Using the .notice from minimal mistkaes

My text {.notice}

My text {.notice--warning}

{% capture mynote%}
My text
{% endcapture %}

{{mynote}}{: .notice--warning}

{% capture notice-text %}
You can also add the `.notice` class to a `<div>` element.

* Bullet point 1
* Bullet point 2
{% endcapture %}

<div class="notice--info">
  <h4>Notice Headline:</h4>
  {{ notice-text | markdownify }}
</div>

### Landing Page Header/Overlay

Edit the index.html page at the root of the repo.

examepl:

excerpt: "PowerShell, Automation, Windows Server and Much more .. 🚀"
header:
  overlay_image: /images/headers/mountain01_1920x500.jpg

### Headers

```
=
```


### Line

```
---
```

### Bold, Underline, Italic

### Quote
```
> My Paragraph yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada
```
> My Paragraph yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada

### Lists

```
- Item
- Item
- Item
```
- Item
- Item
- Item


```
1. Item
1. Item
1. Item
```
1. Item
1. Item
1. Item

## Cheat sheet
https://learn.cloudcannon.com/jekyll-cheat-sheet/

## Liquid
http://www.rubydoc.info/github/Shopify/liquid/Liquid
https://github.com/Shopify/liquid/wiki/Liquid-for-Designers

### date format

http://alanwsmith.com/jekyll-liquid-date-formatting-examples

### Include another page

You can include the content of another file using this:
```
{% include read-time.html %}
```
Source: http://www.rubydoc.info/github/Shopify/liquid/Liquid/Include




## Icons

http://www.flaticon.com/
https://thenounproject.com/