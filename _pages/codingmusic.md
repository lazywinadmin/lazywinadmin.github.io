---
title: Music for coding
layout: archive
permalink: /codingmusic
toc: false
toc_label: "Table of content"
---

# Music list

|Name|Notes|
{% for item in site.data.music-coding %}
|*[{{ item.name }}]({{ item.link }})*|{{ item.notes }}|
{% endfor %}

## Edit the list

Want to add an item to this table ? [Edit this CSV file]("{{ site.github.repository_url }}/blob/master{{ site.branch }}/_data/music-coding.csv")
