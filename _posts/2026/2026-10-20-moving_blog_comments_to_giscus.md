---
layout: single
title: "Moving my blog comments from Utterances (GitHub Issues) to Giscus (GitHub Discussions)"
seo_title: "Moving Blog Comments from Utterances to Giscus"
description: "How I migrated 119 comment threads and 977 comments from Utterances (GitHub Issues) to Giscus (GitHub Discussions) without losing authors or dates."
excerpt: "Follow-up to my 2019 Disqus migration: moving 119 Utterances threads (977 comments) to Giscus on GitHub Discussions, with the gh and GraphQL snippets I used."
permalink:
tags:
- blogging
- github
categories:
published: true
comments: true
header:
  teaserlogo:
  teaser: ''
  image: images/headers/mountain01_1920x500.jpg
  caption:
toc: true
toc_label: "Table of content"
toc_sticky: true
---
Back in 2019 I wrote about [moving my blog comments from Disqus to GitHub Issues]({% post_url 2019/2019-04-07-moving_blog_comments %}) using Utterances. Seven years later, it was time for the next move: from Utterances (GitHub Issues) to [Giscus](https://giscus.app) (GitHub Discussions).

## Why Giscus

Utterances served me well, but Giscus is basically the same idea built on GitHub Discussions, which are a better fit for comments:

* Threaded replies
* Reactions on the post itself
* Lazy loading of the widget
* Theme that follows the reader's light/dark preference
* Minimal Mistakes (the theme I use) has a native `giscus` provider, so no custom include

## Step 1 - Enable Discussions and install the app

```bash
gh api -X PATCH repos/OWNER/REPO -f has_discussions=true
```

I used the default **Announcements** category. Only maintainers can create new discussions in it, so visitors can't spam new threads; the giscus bot creates them when someone comments on a post.

Then install the [giscus GitHub App](https://github.com/apps/giscus) on the repository.

Giscus needs the repository and category IDs. You can get them from giscus.app or with GraphQL:

```bash
gh api graphql -f query='
query {
  repository(owner: "OWNER", name: "REPO") {
    id
    discussionCategories(first: 10) { nodes { id name } }
  }
}'
```

## Step 2 - Configure Minimal Mistakes

In `_config.yml`:

```yaml
comments:
  provider: "giscus"
  giscus:
    repo_id: "R_xxxxxxxx"
    category_name: "Announcements"
    category_id: "DIC_xxxxxxxx"
    discussion_term: "pathname"
    reactions_enabled: "1"
    lazy: true
```

`pathname` matters here: Utterances was also mapping issues by pathname, so the existing issue titles already match what Giscus looks for.

## Step 3 - Inventory and backup

Before touching anything, I counted and backed up everything:

```bash
# Count comment threads
gh issue list --repo OWNER/REPO --label "blog comments" --state all --limit 500 --json number | jq length

# Backup every comment to JSON
gh api --paginate repos/OWNER/REPO/issues/comments > comments-backup.json
jq length comments-backup.json
```

Result: **119 threads and 977 comments**. About 837 of them were the Disqus comments I imported in 2019 (posted under my account with the commenter name and date as a header).

## Step 4 - Cleanup

**Spam**: surprisingly little. Only 7 comments deleted: a gambling promo, a phone shop link drop, an essay-service filler comment, and 4 vendor product ads from 2011.

```bash
gh api -X DELETE repos/OWNER/REPO/issues/comments/COMMENT_ID
```

**Missing labels**: 15 threads didn't have the `blog comments` label:

```bash
gh issue edit 123 --repo OWNER/REPO --add-label "blog comments"
```

## Step 5 - Convert issues to discussions

GitHub has a "convert issues to discussions" bulk option per label. In my case it didn't work:

* Bulk convert only applies to **open** issues, and 111 of my threads had been closed by a stale bot.
* Even after reopening them, the bulk option still wasn't shown.

Reopening by label:

```bash
gh issue list --repo OWNER/REPO --label "blog comments" --state closed --limit 500 --json number -q '.[].number' |
  xargs -I{} gh issue reopen {} --repo OWNER/REPO
```

So I converted each issue individually with **Convert to discussion** in the issue sidebar. Slower, but it preserves the authors, dates and all the comments. The discussion keeps the issue title (the pathname), so Giscus maps it to the post automatically.

## Step 6 - Verify

The giscus API is handy to check a page:

```bash
curl -s "https://giscus.app/api/discussions?repo=OWNER/REPO&term=2012/12/get-localgroupmembership-using-adsiwinnt&category=Announcements&number=0&strict=false&first=20" |
  jq '.discussion.totalCommentCount'
```

For that post it returned 8 comments, with the original Disqus names and dates.

And counting discussions in the category:

```bash
gh api graphql -f query='
query {
  repository(owner: "OWNER", name: "REPO") {
    discussions(first: 1) { totalCount }
  }
}'
```

## Tips and gotchas

* Back up the comments to JSON before deleting or converting anything.
* Convert **before** switching the widget live: if someone comments first, Giscus creates a new empty discussion that clashes with the converted one.
* Check for closed issues (stale bots!) — bulk convert ignores them.
* Converting is one-way: discussions can't be turned back into issues.
* Make sure every thread has the label you filter on.
* Use `pathname` for both Utterances and Giscus so titles line up with no remapping.
* Use a maintainer-only category (Announcements) to prevent new spam threads.
