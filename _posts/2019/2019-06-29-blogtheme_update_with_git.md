---
layout: single
title: "Updating my blog theme with git"
excerpt: "My blog is a static site hosted with Github Pages. I initially forked a theme that I liked and now I need to fetch the latest updates..."
permalink:
tags: 
  - github
  - git
  - jekyll
categories:
published: true
header:
  teaserlogo:
  teaser: ''
  image: images/headers/mountain01_1920x500.jpg
  caption: 'unsplash.com'
gallery:
  - image_path: ''
    url: ''
    title: ''
toc: true
toc_label: "Table of content"
---

In this short post, I'll show how I update my static website hosted on github using git.

I moved my blog from Google Blogger to Github Pages and Jekyll about 2 years ago.

1. I found a Jekyll theme that I liked,
1. forked the repository,
1. rename the repository to `<github username>.github.io`
1. Blog up and running! 🚀
1. You can now clone your fork locally and start writting blog posts.

The migration of my old blog posts and comment was another story 😶.

## Starting a blog from an existing theme

We can summarize the workflow described above like this:

1. Fork a repository (blog theme source)
1. Clone your fork locally
1. Create custom content locally and commit back to your fork
1. Static website gets regenerated each time you commit to your fork

![image-center](/images/2019/2019-06-29-blogtheme_update_with_git/step1.png){: .align-center}

## Blog theme update

However, when the Blog theme author release a new version, **how to you pull the latest changes ?**

![image-center](/images/2019/2019-06-29-blogtheme_update_with_git/step2.png){: .align-center}

One of the great advantage of having my blog content hosted on git is that I can easily use git to pull the last updates from the jekyll theme used.

In my case I'm using the [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) Jekyll theme from [mmistakes](https://github.com/mmistakes). You'll need to adapt the following code for the theme that you are using.

1. **List your remote repositories**: You must first ensure there's an upstream remote. If you forked the theme's repo then you're likely good to go.
   * To double check, run `git remote -v` and verify that you can fetch from origin `https://github.com/mmistakes/minimal-mistakes.git`
1. **Add your remote repositories (optional)**: To add it manually you can do the following: `git remote add upstream https://github.com/mmistakes/minimal-mistakes.git`
1. **Pull the changes**: `git pull upstream master`
   * Depending on the amount of customizations you've made after forking, there's likely to be merge conflicts. Work through any conflicting files Git flags, staging the changes you wish to keep, and then commit them. You can also do these steps using Microsoft Visual Studio Code (see below).
1. **Push the change to your fork**: `git push`

## Conflicts

When pulling the changes from the Upstream (as see above) you might see some conflicts, example during my last upgrade:

[![image-center](/images/2019/2019-06-29-blogtheme_update_with_git/git_conflicts.png){: .align-center}](/images/2019/2019-06-29-blogtheme_update_with_git/git_conflicts.png)

You resolved these issues using Visual Studio, here is an example:

![image-center](/images/2019/2019-06-29-blogtheme_update_with_git/git_conflicts-vscode.png){: .align-center}
