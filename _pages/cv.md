---
title: "CV"
layout: single
permalink: /cv/
author_profile: false
classes: cv-page
toc: true
toc_sticky: true
toc_label: "On this page"
toc_icon: "file-alt"
---

<p class="cv-download"><a class="btn btn--primary" href="/cv/fx-cv.pdf">Download PDF</a></p>

{% capture cv %}{% include cv.md %}{% endcapture %}
{{ cv | markdownify }}
