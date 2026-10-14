---
title: Music for coding
layout: archive
permalink: /codingmusic.html
toc: false
toc_label: "Table of content"
---

# Music list

|Name|Notes|
{% for item in site.data.music-coding %}
|*[{{ item.name }}]({{ item.link }})*|{{ item.notes }}|
{% endfor %}

## Edit the list

Want to add an item to this table ? [Edit this CSV file](https://github.com/lazywinadmin/lazywinadmin.github.io/blob/master/_data/music-coding.csv)
