# frozen_string_literal: true

# Related posts ranked by shared tags.
#
# For every post, sets page.related_by_tags to up to `related_by_tags.limit`
# (default 4) other posts, ranked by number of shared tags (case-insensitive),
# then by most recent date. If fewer posts share a tag than the limit, the
# remaining slots are filled with the most recent posts, so the section is
# never empty. Used by _includes/page__related.html via _layouts/single.html.
#
# Runs once per build in O(posts x tags) using a tag -> posts index, so it adds
# well under a second for a few hundred posts.
module LazyWinAdmin
  class RelatedByTags < Jekyll::Generator
    safe true
    priority :lowest

    def generate(site)
      limit = (site.config.dig("related_by_tags", "limit") || 4).to_i
      posts = site.posts.docs.reject { |p| p.data["hidden"] || p.data["published"] == false }
      recent = posts.sort_by { |p| -p.date.to_f }

      tag_sets = {}
      index = Hash.new { |h, k| h[k] = [] }
      posts.each do |post|
        tags = Array(post.data["tags"]).compact.map { |t| t.to_s.strip.downcase }.reject(&:empty?).uniq
        tag_sets[post] = tags
        tags.each { |t| index[t] << post }
      end

      posts.each do |post|
        scores = Hash.new(0)
        tag_sets[post].each do |t|
          index[t].each { |other| scores[other] += 1 unless other.equal?(post) }
        end
        ranked = scores.sort_by { |other, n| [-n, -other.date.to_f] }.first(limit).map(&:first)
        if ranked.size < limit
          recent.each do |other|
            break if ranked.size >= limit
            next if other.equal?(post) || ranked.include?(other)
            ranked << other
          end
        end
        post.data["related_by_tags"] = ranked
      end
    end
  end
end
