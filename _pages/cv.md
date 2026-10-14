---
title: "CV"
layout: single
permalink: /cv/
author_profile: false
classes: cv-page
---

<p class="cv-download"><a class="btn btn--primary" href="/cv/fx-cv.pdf">Download PDF</a></p>

{% capture cv %}{% include cv.md %}{% endcapture %}
{{ cv | markdownify }}
