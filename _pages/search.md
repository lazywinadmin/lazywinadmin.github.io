---
layout: archive
title: "Search"
permalink: /search.html
author_profile: false
---
<form action="/search.html" method="get">
  <label for="search-box"></label>
  <input type="text" id="search-box" name="query" style="width:50%">
  <input type="submit" value=" Search ">
</form>

<ul id="search-results"></ul>

<script>
  window.store = {
    {% for post in site.posts %}
      "{{ post.url | slugify }}": {
        "title": "{{ post.title | xml_escape }}",
        "author": "{{ post.author | xml_escape }}",
        "date": "{{ post.date | date: '%Y/%b/%d'|xml_escape }}",
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "url": "{{ post.url | xml_escape }}"
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  };
</script>
<script src="/js/lunr.min.js"></script>
<script src="/js/search.js"></script>