# frozen_string_literal: true

# Publish the current jekyll-feed Atom document at the old Blogger / reader
# paths: /atom.xml, /rss.xml, and /feeds/posts/default(.xml).
#
# jekyll-feed only writes /feed.xml and has no alias feature. Rendering its
# template again as extra Liquid pages would change <id> and rel="self"
# (those use page.url), so the copies would not match feed.xml. This hook
# copies the built feed byte-for-byte after the site is written.
#
# /feeds/posts/default is written as default.xml because GitHub Pages picks
# Content-Type from the extension, and this site already serves /feed as
# feed.xml with Content-Type application/xml. An extensionless file would
# likely be application/octet-stream, and X-Content-Type-Options: nosniff
# is already set on the live site. A default/index.xml directory would
# make the trailing-slash URL work, but /feed/ already 404s here, and the
# historical URL has no trailing slash.

require "fileutils"

Jekyll::Hooks.register :site, :post_write do |site|
  src = File.join(site.dest, "feed.xml")
  unless File.file?(src)
    Jekyll.logger.warn "Legacy feed paths:", "feed.xml not found; skipped"
    next
  end

  content = File.binread(src)
  %w[atom.xml rss.xml feeds/posts/default.xml].each do |rel|
    dest = File.join(site.dest, rel)
    FileUtils.mkdir_p(File.dirname(dest))
    File.binwrite(dest, content)
    Jekyll.logger.info "Legacy feed paths:", "wrote #{rel}"
  end
end
