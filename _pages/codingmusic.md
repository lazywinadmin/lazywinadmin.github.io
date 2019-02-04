---
title: Music for coding
layout: archive
permalink: /codingmusic
toc: false
toc_label: "Table of content"
---

|Name|Notes|
|---|---|
{% for item in site.data.music-coding %}
| [{{ item.name }}]({{ item.link }}) | {{ item.notes }} |
{% endfor %}