# frozen_string_literal: true

# jekyll-last-modified-at always overwrites data["last_modified_at"] with a
# git/mtime Determinator. Restore an explicit front-matter last_modified_at
# when present so author-set sitemap dates survive formatting-only commits.

module RespectExplicitLastModifiedAt
  module_function

  def restore(item)
    path = item.path
    return if path.nil? || path.empty?

    abs = Jekyll.sanitized_path(item.site.source, path)
    return unless File.file?(abs)

    # Enough of the file to cover typical front matter.
    head = File.read(abs, 8192)
    return unless head.start_with?("---")

    match = head.match(/^last_modified_at:\s*(\S+)/)
    return unless match

    item.data["last_modified_at"] = Time.parse(match[1])
  end
end

%i[posts pages documents].each do |owner|
  Jekyll::Hooks.register owner, :post_init do |item|
    RespectExplicitLastModifiedAt.restore(item)
  end
end
