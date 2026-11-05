---
description: "Every LazyWinAdmin post since 2010, listed by year: PowerShell, Active Directory, Azure, DevOps and automation articles."
layout: archive
permalink: /archive.html
title: "Archive"
author_profile: false
toc: true
toc_label: "Table of content"
toc_icon: "file-text"
---
## Chronological

<section class="archive-post-list">
   {% for post in site.posts %}
       {% assign currentDate = post.date | date: "%Y" %}
       {% if currentDate != myDate %}
           {% unless forloop.first %}</ul>{% endunless %}
            <h3 id="{{ currentDate }}"> {{ currentDate }} </h3>
           <ul>
           {% assign myDate = currentDate %}
       {% endif %}
       <li><a href="{{ post.url }}">{{ post.title }}<span style="color:blue;font-size:10px"> {{ post.date | date: "%B %-d" }}</span></a></li>
       {% if forloop.last %}</ul>{% endif %}
   {% endfor %}
</section>

## Per Collection

{% capture written_label %}'None'{% endcapture %}

{% for collection in site.collections %}
  {% unless collection.output == false or collection.label == "posts" %}
    {% capture label %}{{ collection.label }}{% endcapture %}
    {% if label != written_label %}
      <h2 id="{{ label | slugify }}" class="archive__subtitle">{{ label }}</h2>
      {% capture written_label %}{{ label }}{% endcapture %}
    {% endif %}
  {% endunless %}
  {% for post in collection.docs %}
    {% unless collection.output == false or collection.label == "posts" %}
      {% include archive-single.html %}
    {% endunless %}
  {% endfor %}
{% endfor %}
