---
layout: single
title: "Moving my blog comments from Disqus to Github issues using PowerShell"
excerpt: "I went through the migration of all my blog comments from Disqus to Github Issues using PowerShell. Basically it is using Github Issue Search API to retrieve existing comments and leveraging Utterances bot to create new issues on my Github repository"
permalink:
tags: 
  - disqus
  - powershell
  - github
categories:
  - powershell
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
toc_sticky: true
---
**Update 2019/04/12** Adding a preview of the results
{: .notice}

In this post I'm documenting my blog comment migration from Disqus to Github Issues using PowerShell. It was stricky... hopefully the diagrams help you to understand what I was trying to resolve.

# Hosting my comments on Disqus

When I initially started to blog on Google Blogger I did not really care where my comments where stored. I was happy with the solution provided by Google which allow the readers to authenticate using different systems or to remain anonymous.

As the traffic on my blog started to rise, the amount of spam comments started to climb as well. Eventually I moved from the built-in comment system provided by Google to Disqus, the most popular (still?) comment system for websites/blog which was external to my blog and was better ot handle spam comments. The advantage being, Disqus handles the spam, the authentication of users and the email notifications when some one reply to their comments.

# Moving my blog to Github Pages

At the beginning of 2017 I decided to move my blog to a Static site, hosted on Github Pages. This allowed me to have the control over the whole blog content, config and layout with the exception of the blog comments, which were still hosted in Disqus. Remapping my Disqus comments was straight forward as I just added the Disqus widget into my static site.

Here is a representation of the setup with Disqus widget:
1. I commited changes to my blog on a github repository
1. Github re-generated the static site for me at each commit
1. The Disqus widget is loaded in the browser when a user browse the page and this shows the comments for the current blog post url.

![image-center](/images/2019/2019-04-07-moving_blog_comments/Static_Site_-_Comment_system_with_Disqus.png){: .align-center}

# Moving my blog comments

Having done the move from Blogger to Github pages the actual content of a blog post was accessible in 2 locations and on 3 different addresses:

* `*.blogspot.com`
* `lazywinadmin.github.io`
* `lazywinadmin.com`

My main "problem" was that Disqus generate a different thread for each url accessed by users. Different comments were showing up depending on the url used to access the blog post.

So I recently decided to clean this mess up and move my blog comments closer to the blog content.

A few options were available to me, here are the two that I considered.

## Using Github Issues search API

This method use the Github Issue search API to retrieve the existing comment and use a Github App or a Bot to create new issue on the Github repository.

In this case I'm using [Utterances](https://github.com/utterance/utterances) This will create the Github Issues as [utterances-bot](https://github.com/utterances-bot). Utterances is a lightweight comments widget built on GitHub issues. This app can work for blog comments, wiki pages and more.

When Utterances loads, the [GitHub issue search API](https://developer.github.com/v3/search/#search-issues) is used to find the issue associated with the page based on `url`, `pathname` or `title`. If it cannot find an issue that matches the page, utterances-bot will automatically create an issue the first time someone comments.

To comment, users must authorize the utterances app to post on their behalf using the GitHub OAuth flow. Alternatively, users can comment on the GitHub issue directly.

* **Pros**:
  * No spam
  * Authentification via Github 🛂
  * Notifications managed by Github 📫
  * Emoticons 😸
  * Support Markdown 📖
  * Support mention (can use `@<github username>`)
  * Users can edit their own comments 📝
  * Accessible via api (Github issue search api) 🐙
  * No ads 👍
  * Open Source :raised_hands:
* **Cons**
  * No Anonymous :see_no_evil:
  * Github account required
  * For imported comments, we can't have the comment entries appear with their real author, the import is done by my account
  * Need to be migrated if host is changed

## Using Pull request and comment files stored with your code

This method is using a pull request mechanism with Github App or Bot to add a new comment file (in JSON or YAML for example) to your repository. Once the pull request is approved, your static site is re-generated with the comments for each posts.

Solutions using this approach: [StaticMan App](https://staticman.net/) or [using Azure Functions](https://github.com/Azure-Functions/jekyll-blog-comments)

* **Pros**
  * Live with your code, no extra migration 📜
  * ReCaptcha supported 🔒
  * Easily editable 📝 (User can edit their comments on the repo, but not so straight forward from the website)
  * No ads 👍
  * Open Source :raised_hands:
  * Authors of the comments will show properly after import
* **Cons**
  * Need to review comments before publishing
  * No support for markdown
  * No support for mention
  * No support for email notifications (however you can subscribe to a provider to take care of it)

# Moving from Disqus to Github Issues

After testing both approaches, hosting the comments with Github Issues made more sense to me. Less management and more convenient for the user notifications and authentication.

My migration plan looked like this:

1. Get a Disqus Export of my comments
1. Extract Disqus Comments
1. Parse and format the comments
1. Group them by article
1. Create a Github Issue per article and add comments
1. Add Github Issue tag "Blog Comment"
1. Close Github Issue
1. Update Blog configuration to use Utterances

Diagram of the final state:

![](/images/2019/2019-04-07-moving_blog_comments/Static_Site_-_Comment_system_with_Github_Issues.png){: .align-center}


## Get the comments export

Fortunately Disqus made the comments exportation easy. Simply navigate to the [Export Page](https://disqus.com/admin/discussions/export/) and it will be sent to you email address.

`Your export has been queued. We will send an email to your registered address when it is available.`

![](/images/2019/2019-04-07-moving_blog_comments/disqus_export_comments.png)

Once downloaded you'll need a tool like 7zip to uncompress the Gz file.

## Load the file with PowerShell

In PowerShell, loading the file can be done using `Get-Content`. Then we can cast the output to XML format:

```powershell
# Load the file
$Disqus = Get-Content -Path .\lazywinadmin-2019-03-22.xml

# Cast the file to XML format
$DisqusXML = ([xml]$Disqus).disqus

# Output result
$DisqusXML
```

Output:

```text
xmlns          : http://disqus.com
dsq            : http://disqus.com/disqus-internals
xsi            : http://www.w3.org/2001/XMLSchema-instance
schemaLocation : http://disqus.com/api/schemas/1.0/disqus.xsd http://disqus.com/api/schemas/1.0/disqus-internals.xsd
category       : category
thread         : {thread, thread, thread, thread…}
post           : {post, post, post, post…}
```

Notice you have 2 main parts in this file, `thread` and `post`.

* `thread` contains the blog post/article information
* `post` contains the actual comment with a reference to the `thread` unique ID.

As mentionned aboved, I will have multiple threads for the same blog article since I had multiple urls per blog article, same situation for the comments.

Here is what the content of the `post` property looks like:

```powershell
$DisqusXML.post
```

Output:

```text
id        : {1254333003, 8047217168623132202}
message   : message
createdAt : 2011-02-10T02:11:44Z
isDeleted : false
isSpam    : false
author    : author
thread    : thread

id        : {1254332999, 1138675168851104074}
message   : message
createdAt : 2011-02-14T20:36:29Z
isDeleted : false
isSpam    : false
author    : author
thread    : thread

id        : {1254332995, 7228675180265117115}
message   : message
createdAt : 2011-05-16T15:11:03Z
isDeleted : false
isSpam    : false
author    : author
thread    : thread

id        : {1254332994, 3638297498698364223}
message   : message
createdAt : 2011-05-16T15:11:55Z
isDeleted : false
isSpam    : false
author    : author
thread    : thread

id        : {1254332993, 816552959763879113}
message   : message
createdAt : 2011-05-16T15:12:41Z
isDeleted : false
isSpam    : false
author    : author
thread    : thread
```

Next we can start the work and retrieve the Comments and the threads.

## Parse and format the comments

```powershell
# Retrieve all Comments
$AllComments = $DisqusXML.post

# Retrieve properties available for each comments
$Properties = $AllComments | Get-Member -MemberType Property

# Process each Comments
$AllComments | Foreach-Object -process {

  # Store the current comment
  $Comment = $_

  # Create Hashtable to store properties of the current comment
  $Post = @{}

  # Go through each properties of each comments
  foreach ($prop in $Properties.name)
  {
     if($prop -eq 'id')
     {
        # Capture Unique IDs
        $Post.DsqID = $Comment.id[0]
        $Post.ID = $Comment.id[1]
     }
     elseif($prop -eq 'author')
     {
        # Author information
        $Post.AuthorName = $Comment.author.name
        $Post.AuthorIsAnonymous = $Comment.author.isanonymous
     }
     elseif($prop -eq 'thread')
     {
        # Here is the important data about the
        #  thread the comment belong to
        $Post.ThreadId = $Comment.thread.id
     }
     elseif($prop -eq 'message')
     {
        $Post.Message = $Comment.message.'#cdata-section'
     }
     else{
        # Other properties
        $Post.$prop = ($Comment |
            Select-Object -ExpandProperty $prop ) -replace '`r`n'
     }
     # Keep the original comment data structure if we need it later
     $Post.raw = $Comment
  }
  # Return a PowerShell object for the current comment
  New-Object -TypeName PSObject -Property $Post
}
```

## Parse and format the threads

Next, same exercice for the threads item.

Again, each thread represent one blog post. We may have multiple threads for the same blog post since it was reachable by multiple urls.

```powershell
# Retrieve threads
$AllThreads = $DisqusXML.thread

# Retrieve Thread properties
$Properties = $AllThreads |
    Get-Member -MemberType Property

# Process each threads
$AllThreads=$AllThreads | Foreach-Object -process {

    # Capture Current ThreadItem
    $ThreadItem = $_

    # Create Hashtable for our final object
    $ThreadObj = @{}

    # Go through each properties of each threads
    foreach ($prop in $Properties.name)
    {
        if($prop -eq 'id')
        {
            # Thread ID
            $ThreadObj.ID = $ThreadItem.id[0]
        }
        elseif($prop -eq 'author')
        {
            # Author
            $ThreadObj.AuthorName = $ThreadItem.author.name
            $ThreadObj.AuthorIsAnonymous = $ThreadItem.author.isanonymous
            $ThreadObj.AuthorUsername = $ThreadItem.author.username
        }
        elseif($prop -eq 'message')
        {
            $ThreadObj.Message = $ThreadItem.message.'#cdata-section'
        }
        elseif($prop -eq 'category')
        {
            $ThreadObj.Category = ($ThreadItem|
                Select-Object -ExpandProperty $prop).id
        }
        else{
            # Other properties
            $ThreadObj.$prop = ($ThreadItem |
                Select-Object -ExpandProperty $prop) -replace '`r`n'
        }
        $ThreadObj.raw = $ThreadItem
    }
    # Return a PowerShell object for the current ThreadItem
    New-Object -TypeName PSObject -Property $ThreadObj
}
```

Some cleanup was necessary for the thread items. I noticed that disqus included some useless threads created by spam bot, commenting on search result pages. I was able to filter them out using some regular expressions:

```powershell
$AllThreads = $AllThreads |
    Where-Object -FilterScript {
        $_.link -match "
          \.io\/\d{4}\/.+html$|
          \.com\/\d{4}\/.+html$|
          \.com\/p\/.+html$|
          \.io\/minimal-mistakes\/\d{4}\/.+html$|
          \.io\/powershell\/\d{4}\/.+html$|
          \.io\/usergroup\/\d{4}\/.+html$" -and
        $_.link -notmatch "googleusercontent\.com"}
```

Now let's find the right Title and keep only the Relative path of the link (so we can group threads together for the same article). The title was not visible properly for all the threads so I had to find the right one. Again these issues are related to 3 urls available for each posts.

Also, if we can't figure the real title from the Disqus Export, we are simply doing a Web call against the Live URL on my blog.

```powershell
# Create 2 properties 'link2' and 'title2' that will contains the clean information
#  then group per link (per thread or post)
#  link2: trimed URL
#  title2: Remove prefix, weird brackets or weird characters, Encoding issues
$AllThreads = $threads|
  Select-Object -Property *,
  @{L='link2';E={
      $_.link -replace "
        https://|http://|www\.|
        lazywinadmin\.com|
        lazywinadmin\.github\.io|
        \/minimal-mistakes|
        \/powershell"}},
  @{L='title2';E={
      $_.title -replace "^LazyWinAdmin:\s" `
        -replace 'â€™',"'" `
        -replace "Ã¢â‚¬Â¦|â€¦" `
        -replace 'â€“','-' `
        -replace '\/\[','[' `
        -replace '\\\/\]',']' }}|
  Group-Object -Property link2



# if we can't find the proper title, we are doing a lookup with the URL using Invoke-WebRequest
# We add a property 'RealTitle' which contain the real title to each thread
$ThreadsUpdated = $AllThreads|
Sort-Object -Property count |
ForEach-Object -Process {

# Capture current post
$CurrentPost = $_

# if one comment is found
if($CurrentPost.count -eq 1)
{
    if($CurrentPost.group.title2 -notmatch '^http')
    {
        # Add REALTitle property
        $RealTitle = $CurrentPost.group.title2
        # output object
        $CurrentPost.group |
            Select-Object -Property *,
                @{L='RealTitle';e={$RealTitle}},
                @{L='ThreadCount';e={$CurrentPost.count}}
    }
    elseif($CurrentPost.group.title2 -match '^http')
    {
        # lookup online
        $result = Invoke-webrequest -Uri $CurrentPost.group.link -Method Get
        # add REALTitle prop
        $RealTitle = $result.ParsedHtml.title
        # output object
        $CurrentPost.group |
            Select-Object -Property *,
            @{L='RealTitle';e={$RealTitle}},
            @{L='ThreadCount';e={$CurrentPost.count}}
    }
}
if($CurrentPost.count -gt 1)
{
    if($CurrentPost.group.title2 -notmatch '^http')
    {
        # add REALTitle prop
        $RealTitle = ($CurrentPost.group.title2|
            Where-Object -FilterScript {
                $_ -notmatch '^http'}|
                Select-Object -first 1)

                # Output object
                $CurrentPost.group |
                    Select-Object -Property *,
                    @{L='RealTitle';e={$RealTitle}},
                    @{L='ThreadCount';e={$CurrentPost.count}
            }
    }
    elseif($CurrentPost.group.title2 -match '^http')
    {
        # get url of one
        $u = ($CurrentPost.group|
            Where-Object {
                $_.title2 -match '^http'}|
                    Select-Object -first 1).link

                # lookup online
                $result = Invoke-webrequest -Uri $u -Method Get

                # add REALTitle prop
                $RealTitle = $result.ParsedHtml.title
                # output object
                $CurrentPost.group |
                  Select-Object *,@{L='RealTitle';e={$RealTitle}
            }
    }
    else {
        # add REALTitle prop
        $RealTitle = 'unknown'
        # output object
        $CurrentPost.group | Select-Object *,@{L='RealTitle';e={$RealTitle}}
    }
}
}
```

## Combine Comments and Threads

Finally we can combine all the information together

```powershell
# Append the thread information to the each comment object
# Here we just pass the realtitle and link2
$AllTogether = $Comments | ForEach-Object -Process {
    $CommentItem = $_
    $ThreadInformation = $ThreadsUpdated |
        Where-Object -FilterScript {
            $_.id -match $CommentItem.ThreadId
        }

    $CommentItem |
        Select-Object -Property *,
            @{L='ThreadTitle';E={$ThreadInformation.Realtitle}},
            @{L='ThreadLink';E={$ThreadInformation.link2}}
} |
Group-Object -Property ThreadLink |
Where-Object -FilterScript {$_.name}
```

And that's it, now we are ready to create our Github issues and add the comments.

## Authenticate against Github API

For this part, I'll be using the PowerShell module `PowerShellForGithub`, maintained by some Microsoft folks and [available on github](https://github.com/PowerShell/PowerShellForGitHub).

In order to connect to the Github API, we'll need to get a token from your Github account by going into `Settings/Developer settings/Personal access tokens` and generate a new one.

```powershell
# First fetch the module from the PowerShell Gallery
Install-Module -Name powershellforgithub -scope currentuser -verbose
# Import it
Import-Module -Name powershellforgithub

# Specify our Github Token
$key = '<Secret token>'
$KeySec = ConvertTo-SecureString $key -AsPlainText -Force
$cred = New-Object System.Management.Automation.PSCredential ('username_is_ignored', $KeySec)
#$cred = Get-Credential -UserName $null

# Set Connection and configuration
Set-GitHubAuthentication -Credential $cred
Set-GitHubConfiguration -DisableLogging -DisableTelemetry
```

## Create the comment in github issues

Finally we can start the creation of Github Issues and comments

```powershell
# Define Github commands default params
$GithubSplat = @{
    OwnerName = 'lazywinadmin'
    RepositoryName = 'lazywinadmin.github.io'
}
$BlogUrl = 'https://lazywinadmin.com'

# Retrieve issues
#$issues = Get-GitHubIssue -Uri 'https://github.com/lazywinadmin/lazywinadmin.github.io'
$issues = Get-GitHubIssue @githubsplat

# Process each threads with their comments
$AllTogether |
Sort-Object name -Descending |
ForEach-Object -Process{

    # Capture current thread
    $BlogPost = $_

    # Issue Title, replace the first / and
    #  remove the html at the end of the name
    $IssueTitle = $BlogPost.name -replace '^\/' -replace '\.html'

    # lookup for existing issue
    $IssueObject = $issues|
        Where-Object -filterscript {$_.title -eq $IssueTitle}

    if(-not $IssueObject)
    {
        # Build Header of the post
        $IssueHeader = $BlogPost.group.ThreadTitle |
          select-object -first 1

        # Define blog post link
        $BlogPostLink = "$($BlogUrl)$($BlogPost.name)"

        # Define body of the issue
        $Body = @"
# $IssueHeader

[$BlogPostLink]($BlogPostLink)

<!--
Imported via PowerShell on $(Get-Date -Format o)
-->
"@
        # Create an issue
        $IssueObject = New-GitHubIssue @githubsplat `
            -Title $IssueTitle `
            -Body $body `
            -Label 'blog comments'
    }

    # Sort comment by createdAt
    $BlogPost.group|
      Where-Object {$_.isspam -like '*false*'} |
      Sort-Object createdAt |
      ForEach-Object{

        # Current comment
        $CurrenComment = $_

        # Author update
        #  we replace my post author name :)
        $AuthorName = $($CurrenComment.AuthorName)
        switch ($AuthorName) 
        {
            'Xavier C' {$AuthorName='Francois-Xavier Cat'}
            default {}
        }

        # Define body of the comment
        $CommentBody = @"

## **Author**: $AuthorName
**Posted on**: ``$($CurrenComment.createdAt)``
$($CurrenComment.message)

<!--
Imported via PowerShell on $(Get-Date -Format o)
Json_original_message:
$($CurrenComment|Select-Object -ExcludeProperty raw|convertTo-Json)
-->
"@
        # Create Comment
        New-GitHubComment @githubsplat `
            -Issue $IssueObject.number `
            -Body $CommentBody
    }
    # Close issue
    Update-GitHubIssue @githubsplat `
        -Issue $IssueObject.number `
        -State Closed
}
```

## Blog configuration

The last step is to update my blog to use Utterances. Lucky for me, my theme already support it, so i just have to target Utterances.

```yml
comments:
  provider               : "utterances"
```

However if your blog does not, you can find information on the following [page](https://utteranc.es/).

# Final result

Now what does the final result looks like, here are the two perspectives:

## Blog post

If you look at a blog article, now it will look like this:

![image-center](/images/2019/2019-04-07-moving_blog_comments/blogpost01.png){: .align-center}

You also have a link that send you directly to the Github issue item related to the Blogpost

![image-center](/images/2019/2019-04-07-moving_blog_comments/githubissues03.png){: .align-center}

## Github Issues

On the Github side, it will just look like a regular issue. Note that the title contains the relative path of the blog post. This is how Utterances retrieve the related issue and its comments.

List of issues related to blog posts:

![image-center](/images/2019/2019-04-07-moving_blog_comments/githubissues01.png){: .align-center}

Comments for a particular blog post:

![image-center](/images/2019/2019-04-07-moving_blog_comments/githubissues02.png){: .align-center}
