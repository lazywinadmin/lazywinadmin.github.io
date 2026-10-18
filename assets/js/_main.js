/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function () {
  // FitVids init
  $("#main").fitVids();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").toggleClass("is--visible");
    $(".author__urls-wrapper").find("button").toggleClass("open");
  });

  // Close search screen with Esc key
  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      if ($(".initial-content").hasClass("is--hidden")) {
        $(".search-content").toggleClass("is--visible");
        $(".initial-content").toggleClass("is--hidden");
      }
    }
  });

  // Search toggle
  $(".search__toggle").on("click", function () {
    $(".search-content").toggleClass("is--visible");
    $(".initial-content").toggleClass("is--hidden");
    // set focus on input
    setTimeout(function () {
      $(".search-content input").focus();
    }, 400);
  });

  // Smooth scrolling
  var scroll = new SmoothScroll('a[href*="#"]', {
    offset: 20,
    speed: 400,
    speedAsDuration: true,
    durationMax: 500,
  });

  // Gumshoe scroll spy init
  if ($("nav.toc").length > 0) {
    var spy = new Gumshoe("nav.toc a", {
      // Active classes
      navClass: "active", // applied to the nav list item
      contentClass: "active", // applied to the content

      // Nested navigation
      nested: false, // if true, add classes to parents of active link
      nestedClass: "active", // applied to the parent items

      // Offset & reflow
      offset: 20, // how far from the top of the page to activate a content area
      reflow: true, // if true, listen for reflows

      // Event support
      events: true, // if true, emit custom events
    });
  }

  // Auto scroll sticky ToC with content
  const scrollTocToContent = function (event) {
    var target = event.target;
    var scrollOptions = { behavior: "auto", block: "nearest", inline: "start" };

    var tocElement = document.querySelector("aside.sidebar__right.sticky");
    if (!tocElement) return;
    if (window.getComputedStyle(tocElement).position !== "sticky") return;

    if (target.parentElement.classList.contains("toc__menu") && target == target.parentElement.firstElementChild) {
      // Scroll to top instead
      document.querySelector("nav.toc header").scrollIntoView(scrollOptions);
    } else {
      target.scrollIntoView(scrollOptions);
    }
  };

  // Has issues on Firefox, whitelist Chrome for now
  if (!!window.chrome) {
    document.addEventListener("gumshoeActivate", scrollTocToContent);
  }

  // add lightbox class to all image links
  $(
    "a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']"
  ).has("> img").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: "image",
    tLoading: "Loading image #%curr%...",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: "mfp-zoom-in",
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
      },
    },
    closeOnContentClick: true,
    midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  // Add anchors for headings
  (function () {
    var pageContentElement = document.querySelector(".page__content");
    if (!pageContentElement) return;

    pageContentElement
      .querySelectorAll("h1, h2, h3, h4, h5, h6")
      .forEach(function (element) {
        var id = element.getAttribute("id");
        if (id) {
          var anchor = document.createElement("a");
          anchor.className = "header-link";
          anchor.href = "#" + id;
          anchor.innerHTML =
            '<span class="sr-only">Permalink</span><i class="fas fa-link"></i>';
          anchor.title = "Permalink";
          element.appendChild(anchor);
        }
      });
  })();

  // Add copy button for <pre> blocks
  var copyText = function (text) {
    if (document.queryCommandEnabled("copy") && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => true,
        () => console.error("Failed to copy text to clipboard: " + text)
      );
      return true;
    } else {
      var isRTL = document.documentElement.getAttribute("dir") === "rtl";

      var textarea = document.createElement("textarea");
      textarea.className = "clipboard-helper";
      textarea.style[isRTL ? "right" : "left"] = "-9999px";
      // Move element to the same position vertically
      var yPosition = window.pageYOffset || document.documentElement.scrollTop;
      textarea.style.top = yPosition + "px";

      textarea.setAttribute("readonly", "");
      textarea.value = text;
      document.body.appendChild(textarea);

      var success = true;
      try {
        textarea.select();
        success = document.execCommand("copy");
      } catch (e) {
        success = false;
      }
      textarea.parentNode.removeChild(textarea);
      return success;
    }
  };

  // Language labels for code block headers (Rouge "language-*" class -> label).
  // Plain text and unknown languages get no label.
  var codeLanguageLabels = {
    powershell: "PowerShell", posh: "PowerShell", ps1: "PowerShell", pwsh: "PowerShell", psm1: "PowerShell",
    hcl: "HCL", terraform: "Terraform", tf: "Terraform", tfvars: "Terraform",
    bash: "Bash", sh: "Shell", shell: "Shell", zsh: "Zsh", console: "Console", shell_session: "Console",
    yaml: "YAML", yml: "YAML", json: "JSON", jsonc: "JSON", xml: "XML", html: "HTML", css: "CSS", scss: "SCSS",
    javascript: "JavaScript", js: "JavaScript", typescript: "TypeScript", ts: "TypeScript",
    python: "Python", py: "Python", ruby: "Ruby", rb: "Ruby", go: "Go", rust: "Rust", java: "Java",
    csharp: "C#", cs: "C#", "c#": "C#", vb: "VB.NET", vbnet: "VB.NET", vbscript: "VBScript", vbs: "VBScript",
    batch: "Batch", bat: "Batch", cmd: "Batch", batchfile: "Batch", dosbatch: "Batch",
    sql: "SQL", tsql: "T-SQL", kusto: "KQL", kql: "KQL", dockerfile: "Dockerfile", docker: "Dockerfile",
    ini: "INI", toml: "TOML", diff: "Diff", markdown: "Markdown", md: "Markdown", liquid: "Liquid",
    csv: "CSV", make: "Makefile", makefile: "Makefile", nginx: "Nginx", bicep: "Bicep", graphql: "GraphQL"
  };
  var codeLanguageLabel = function (element) {
    var holder = element.closest("[class*='language-']");
    if (!holder) return null;
    var match = holder.className.match(/(?:^|\s)language-([\w#+-]+)/);
    if (!match) return null;
    return codeLanguageLabels[match[1].toLowerCase()] || null;
  };

  var copyButtonEventListener = function (event) {
    var thisButton = event.currentTarget;
    var codeBlock = thisButton.codeElement;

    // Skip line numbers if present (i.e. {% highlight lineno %})
    var realCodeBlock = codeBlock.querySelector("td.code, td.rouge-code");
    if (realCodeBlock) {
      codeBlock = realCodeBlock;
    }
    var result = copyText(codeBlock.innerText);
    // Restore the focus to the button
    thisButton.focus();
    if (result) {
      if (thisButton.interval) {
        clearTimeout(thisButton.interval);
      }
      thisButton.classList.add("copied");
      if (thisButton.statusElement) thisButton.statusElement.textContent = "Copied!";
      thisButton.interval = setTimeout(function () {
        thisButton.classList.remove("copied");
        if (thisButton.statusElement) thisButton.statusElement.textContent = "";
        thisButton.interval = null;
      }, 1500);
    }
    return result;
  };

  if (window.enable_copy_code_button) {
    document
      .querySelectorAll(".page__content pre.highlight > code, .page__content figure.highlight > pre > code")
      .forEach(function (element) {
        var pre = element.parentElement;
        // Sanity check - don't add an extra button if there's already one
        if (pre.dataset.copyReady) {
          return;
        }
        pre.dataset.copyReady = "true";
        var label = codeLanguageLabel(element);

        var copyButton = document.createElement("button");
        copyButton.type = "button";
        copyButton.className = "clipboard-copy-button";
        copyButton.setAttribute("aria-label", label ? "Copy " + label + " code to clipboard" : "Copy code to clipboard");
        copyButton.title = "Copy to clipboard";
        copyButton.codeElement = element;
        copyButton.addEventListener("click", copyButtonEventListener);

        var status = document.createElement("span");
        status.className = "code-header__status sr-only";
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");
        copyButton.statusElement = status;

        if (label) {
          // Header bar above the block: language label + copy button
          var block = pre.closest("div.highlighter-rouge, figure.highlight") || pre;
          var header = document.createElement("div");
          header.className = "code-header";
          var lang = document.createElement("span");
          lang.className = "code-header__lang";
          lang.textContent = label;
          copyButton.classList.add("code-header__copy");
          copyButton.innerHTML = '<i class="far fa-fw fa-copy" aria-hidden="true"></i><i class="fas fa-fw fa-check copied" aria-hidden="true"></i><span class="code-header__copy-text" aria-hidden="true">Copy</span><span class="code-header__copied-text" aria-hidden="true">Copied!</span>';
          header.appendChild(lang);
          header.appendChild(status);
          header.appendChild(copyButton);
          block.classList.add("has-code-header");
          block.insertBefore(header, block.firstChild);
        } else {
          // No language: keep the small floating copy button
          copyButton.innerHTML = '<i class="far fa-fw fa-copy" aria-hidden="true"></i><i class="fas fa-fw fa-check copied" aria-hidden="true"></i>';
          pre.prepend(copyButton);
          pre.appendChild(status);
        }
      });
  }
});
