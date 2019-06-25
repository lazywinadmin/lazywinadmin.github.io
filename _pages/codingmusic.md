---
title: Music for coding
layout: archive
permalink: /codingmusic
toc: false
toc_label: "Table of content"
---

|Name|Link|Notes|
|---|---|---|
{% for item in site.data.music-coding %}
| [{{ item.name }}]({{ item.link }}) | {{ item.notes }} |
{% endfor %}

Want to add an item to this table ? [Edit this CSV file]("{{ site.github.repository_url }}/blob/master{{ site.branch }}/_data/music-coding.csv")
