---
layout: single
title: "Retrieving Youtube video information from Google APIs using PowerShell"
excerpt: "In this article, I'm using Google APIs to retrieve Youtube public videos data with PowerShell in order to update Microsoft MVP Contributions"
permalink:
tags: 
  - powershell
  - mvp
  - youtube
  - google api
categories:
  - powershell
  - 'MVP Module'
published: true
header:
  teaserlogo:
  teaser: ''
  image: images/headers/mountain02_1920x500.jpg
  caption: 'unsplash.com'
gallery:
  - image_path: ''
    url: ''
    title: ''
toc: true
toc_label: "Table of content"
toc_sticky: true
---

# Summary

In this article I'll describe how you can query data from Youtube by using the Google Apis and PowerShell.

A few days back, I saw [a repository on Github](https://github.com/julioarruda/UpdateMVPContributions/blob/master/UpdateContributions.ps1) from a fellow Microsoft MVP **Julio Arruda** that was using the PowerShell MVP module to populate Youtube videos views into his MVP Contributions. I thought it was a great way to use the MVP module so I wanted to document the process.

Note: The same approach can be used for the different Google services.

What do we need:

1. Get an API Credential for Youtube
2. Query the data from Google API
3. Update the MVP Contributions

# Google API Credentials

In order to be able to query Google Apis with PowerShell, you will first need to request an API Key.

Navigate to <https://console.developers.google.com/apis/dashboard> and Create a new Project and give it a Name.

![image-center](/images\2019\2019-04-10-retrieving_youtube_videos_information_with_powershell\01.png){: .align-center}
![image-center](/images\2019\2019-04-10-retrieving_youtube_videos_information_with_powershell\02.png){: .align-center}

Then click on `Enable APIs and Services`. We will need to search for the Youtube API to specify the scope of access.

![image-center](/images\2019\2019-04-10-retrieving_youtube_videos_information_with_powershell\03.png){: .align-center}

Search for **Youtube** and select **Youtube Data API v3**, then select **ENABLE**.

![image-center](/images\2019\2019-04-10-retrieving_youtube_videos_information_with_powershell\04.png){: .align-center}
![image-center](/images\2019\2019-04-10-retrieving_youtube_videos_information_with_powershell\05.png){: .align-center}

Finally, click on **Credentials** on the left side, then select **Create Credential**

![image-center](/images\2019\2019-04-10-retrieving_youtube_videos_information_with_powershell\06.png){: .align-center}

"*Where will be calling the API From?*", select **Other UI**

"*What data will you be accessing?*", select **Public Data**

Then click on **What credential do I need**
![image-center](/images\2019\2019-04-10-retrieving_youtube_videos_information_with_powershell\07.png){: .align-center}

This will give you an API key. Click on **Done**.
![image-center](/images\2019\2019-04-10-retrieving_youtube_videos_information_with_powershell\08.png){: .align-center}

# Using PowerShell to query video data

Now we can query Google API for Youtube Data API.

You can find more information on this API here: https://developers.google.com/youtube/v3/docs/videos#properties

**No need to try to use this API key, it has been regenerated** 🙊

```powershell
# Get the video id from your link
$videoId = 'Rrm_apVFER0' # https://www.youtube.com/watch?v=Rrm_apVFER0

# Get the API Key
$GoogleApiKey = 'AIzaSyAz6siWRi7uLHZV4nl_73BKc5mN8_cubc0'

# Query Google API for the video properties specified
#  properties specified here: snippet,contentDetails,statistics,status
Invoke-RestMethod -uri "https://www.googleapis.com/youtube/v3/videos?id=$videoId&key=$GoogleApiKey&part=snippet,contentDetails,statistics,status"
```

Output:

```text
kind     : youtube#videoListResponse
etag     : "XpPGQXPnxQJhLjs6enD_n8JR4Qk/OvfFaJNQBjrFmYcA9HmnsU2CbhQ"
pageInfo : @{totalResults=1; resultsPerPage=1}
items    : {@{kind=youtube#video; etag="XpPGQXPnxQJhLgs6enD_n8JR4Qk/HRpqfwdmecz7iRfrrVIRd8h03-w"; id=Rrm_apVFER0;
           snippet=; contentDetails=; status=; statistics=}}
```

The actual data is inside the `items` property

```powershell
Invoke-RestMethod -uri "https://www.googleapis.com/youtube/v3/videos?id=$videoId&key=$GoogleApiKey&part=snippet,contentDetails,statistics,status" |
Select-Object -expand items
```

```text
kind           : youtube#video
etag           : "XpPjQXPnxQJhLgs6enD_n8JR4Qk/HRpqfwdmecz7iRfrrVIRE8h03-w"
id             : Rrm_apVFER0
snippet        : @{publishedAt=2019-03-27 8:13:05 PM; channelId=UCdxicOKZNm_u1opF_xAYfDA; title=Automatiser Azure avec
                 Azure Automation/Sharepoint Online/PowerApps; description=French PowerShell User Group / Groupe
                 d'utilisateurs PowerShell Francophone.

                 Website: http://frpsug.com
                 Twitter: @frpsug
                 Github: https://github.com/FrPSUG
                 Email: frpsug@gmail.com; thumbnails=; channelTitle=French PowerShell User Group;
                 tags=System.Object[]; categoryId=29; liveBroadcastContent=none; localized=; defaultAudioLanguage=fr}
contentDetails : @{duration=PT57M56S; dimension=2d; definition=hd; caption=false; licensedContent=False;
                 projection=rectangular}
status         : @{uploadStatus=processed; privacyStatus=public; license=creativeCommon; embeddable=True;
                 publicStatsViewable=True}
statistics     : @{viewCount=139; likeCount=7; dislikeCount=0; favoriteCount=0; commentCount=0}
```

As you might see in the above result, the video count is in the statistics properties.

```powershell
(Invoke-RestMethod -uri "https://www.googleapis.com/youtube/v3/videos?id=$videoId&key=$GoogleApiKey&part=snippet,contentDetails,statistics,status").items.statistics.viewCount
```

Output:

```text
140
```

# Retrieving Youtube links from my contributions

Now we can retrieve the MVP Contribution that contains Youtube Links.

To set up the MVP Module connection, see the information [here](https://lazywinadmin.com/2017/05/MVP_Module.html)

```powershell
# Assuming the MVP module is installed and configured.

# Retrieve MVP Contributions
Get-MVPContribution -Limit 100 |
# Only get entries that contains a referenceurl with the string 'youtube'
Where-Object -FilterScript {$_.Referenceurl -match 'youtube'} |
# Only show the referenceurl
Select-Object -Property referenceurl
```

```text
https://www.youtube.com/watch?v=Rrm_apVFER0
https://www.youtube.com/watch?v=3OR143IPQ4o
https://www.youtube.com/watch?v=_VoDJu0tnsk
https://www.youtube.com/watch?v=ldDtE_KksxM
https://www.youtube.com/watch?v=89DVbbjLLCQ
https://www.youtube.com/watch?v=GBzqXDSMOJk
https://www.youtube.com/watch?v=glhNRB0xyF8&t=31s
https://www.youtube.com/watch?v=Wq9XpoQb2Mc
https://www.youtube.com/watch?v=D1vV7NLddC4
https://www.youtube.com/watch?v=R0ePfYmljE8
https://www.youtube.com/watch?v=mpYQkYHQjII
https://www.youtube.com/watch?v=fZly3Cg73p8
https://www.youtube.com/watch?v=mU8M3955reg
https://www.youtube.com/watch?v=pg_oP9ky4UI
https://www.youtube.com/watch?v=gIzxfEeOtJU
https://www.youtube.com/watch?v=XR06_VOqbGs
https://www.youtube.com/watch?v=I365XQDW1zk
https://www.youtube.com/watch?v=WJ140S4mCfM
https://www.youtube.com/watch?v=6IDJoSo3qDc
https://www.youtube.com/watch?v=u05rSvsLTxA
https://www.youtube.com/watch?v=sO3GaSpLIdE
```

# Trimming links

However the problem here is that we just need the ID of the video, the part that is after the `v=`. Also we don't care of anything from `&` to the end of the url string.

I just used some `-replace` operators and regular expressions to take care of that.

```powershell
Get-MVPContribution -Limit 100 |
Where-Object -FilterScript {
    $_.Referenceurl -match 'youtube'
    }|
Foreach-Object -Process {
    # Remove https://youtu.be/
    # Remove https://www.youtube.com/watch?v=
    # Remove what is after the video ID, from '&'
    $_.ReferenceUrl -Replace "https\:\/\/youtu.be\/|https\:\/\/www\.youtube\.com\/watch\?v\=|&.+$"
}
```

Output

```text
Rrm_apVFER0
3OR143IPQ4o
_VoDJu0tnsk
ldDtE_KksxM
89DVbbjLLCQ
GBzqXDSMOJk
glhNRB0xyF8
Wq9XpoQb2Mc
D1vV7NLddC4
R0ePfYmljE8
mpYQkYHQjII
fZly3Cg73p8
mU8M3955reg
pg_oP9ky4UI
gIzxfEeOtJU
XR06_VOqbGs
I365XQDW1zk
WJ140S4mCfM
6IDJoSo3qDc
u05rSvsLTxA
sO3GaSpLIdE
```

# Retrieve the videos data and update MVP contributions

Now let's put the pieces together

```powershell
# Specify your API Key
$GoogleApiKey = 'AIzaSyAz6siWRi7uLHZV4nl_73BKc5mN8_cubc0'

# Retrieve videos links from MVP Contributions
$Videos = Get-MVPContribution -Limit 100 |
Where-Object -FilterScript {
    $_.Referenceurl -match 'youtube'
    }|
Foreach-Object -Process {
    # Return all properties of the current object and add a new property 'videoId' with the trimmed url
    $_ |
      Select-Object *,
        @{
          Label='VideoID';
          Expression={
            $_.ReferenceUrl -Replace "https\:\/\/youtu.be\/|https\:\/\/www\.youtube\.com\/watch\?v\=|&.+$"
          }
        }
} | Foreach-Object -Process {
  $CurrentItem = $_
  # Query Google API for the video properties specified
  #  properties specified here: snippet,contentDetails,statistics,status
  $Views = Invoke-RestMethod -uri "https://www.googleapis.com/youtube/v3/videos?id=$($CurrentItem.videoId)&key=$GoogleApiKey&part=snippet,contentDetails,statistics,status"

  # Update MVP Contribution
  Set-MVPContribution `
    -ContributionID $CurrentItem.ContributionId `
    -AnnualReach $views.items.statistics.viewCount
}
```