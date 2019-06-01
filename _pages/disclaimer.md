---
title: disclaimer
layout: single
permalink: /disclaimer.html
---

{% capture notice-text %}
**Important** ⚠️ The content on this site is provided without any warranty and confers no rights.

All the scripts provided in this blog are based on my personal views/usage scenarios. There is no guarantee or warranty that these will work your environment without any issues. You need to test them yourself in your test lab before trying in production.

The author of this blog is not responsible if the usage of scripts given in this blog causes any damage to your environment or malfunctions.

{% endcapture %}

<div class="notice--warning">
  {{ notice-text | markdownify }}
</div>
