---
layout: single
title: "SpaceX PowerShell module"
classes: wide
excerpt: "With the very exciting upcoming launch of the Falcon Heavy 🚀 this week, I worked on a SpaceX PowerShell module that interacts with the SpaceX-API to retrieve data regarding company info, vehicles, launch sites, and launch data."
permalink:
tags: 
  - module
  - powershell
  - spacex
categories:
  - powershell
published: true
comments: true
author_profile: false
header:
  teaserlogo:
  teaser: ''
  image: images/headers/spacex02_1920x500.png
  caption: 
gallery:
  - image_path: ''
    url: ''
    title: ''
toc: true
toc_label: "Table of content"
---

{% capture mynote%}
**Update 2018/02/09**: Add launch video
{% endcapture %}

{{mynote}}{: .notice--warning}

I recently worked on a small PowerShell module to interact with the SpaceX Data REST API ([available here](https://github.com/r-spacex/SpaceX-API) ).

The API allows you to gather data regarding company info, vehicles, launch sites, and launch data.

> <i>Scheduled on 2018/02/06, this week will be very exciting, SpaceX plans to launch the Falcon Heavy's first demonstration flight. According to SpaceX founder Elon Musk, the dummy payload on its maiden flight will be his personal Tesla Roadster.</i><br><br>
> <i>The Falcon Heavy is a variant of the Falcon 9 launch vehicle and consists of a strengthened Falcon 9 rocket core with two additional Falcon 9 first stages as strap-on boosters. This increases the low Earth orbit maximum payload to 63,800 kilograms, compared to 22,800 kilograms for a Falcon 9 full thrust.</i> [Wikipedia](https://en.wikipedia.org/wiki/Falcon_Heavy)

Here is a replay of the launch:

<iframe width="560" height="315" src="https://www.youtube.com/embed/wbSwFU6tY1c?rel=0&amp;start=1292" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<br>

![image-center](/images\2018\2018-02-05-SpaceX_Module/falcon-heavy-rocket-hangar-cape-canaveral-spacex-elon-musk-twitter-rotated.jpg)

## Install the module

The module can easily be installed from the PowerShell Gallery using the following command:

```powershell
Install-module -name SpaceX
```

And you're good to go.

## Commands available

The following commands are available

```powershell
Get-Command -module SpaceX
```

```text
CommandType Name            Version Source
----------- ----            ------- ------
Function    Get-SXCapsule   1.0.0.0 spacex
Function    Get-SXCompany   1.0.0.0 spacex
Function    Get-SXLaunch    1.0.0.0 spacex
Function    Get-SXLaunchpad 1.0.0.0 spacex
Function    Get-SXPart      1.0.0.0 spacex
Function    Get-SXRocket    1.0.0.0 spacex
```

## Company information

```powershell
Get-SXCompany
```

```text
name           : SpaceX
founder        : Elon Musk
founded        : 2002
employees      : 7000
vehicles       : 3
launch_sites   : 3
test_sites     : 1
ceo            : Elon Musk
cto            : Elon Musk
coo            : Gwynne Shotwell
cto_propulsion : Tom Mueller
valuation      : 15000000000
headquarters   : @{address=Rocket Road; city=Hawthorne; state=California}
summary        : SpaceX designs, manufactures and launches advanced rockets and
                 spacecraft. The company was founded in 2002 to revolutionize space
                 technology, with the ultimate goal of enabling people to live on other
                 planets.
```

## Upcoming launches

This week is a very special one, SpaceX is about to launch the first **Falcon Heavy** rocket!! 🚀🚀🚀

![image-center](/images\2018\2018-02-05-SpaceX_Module/spacex-falcon-heavy.gif)

We can see it is the next up:

```powershell
Get-SXLaunch -upcoming
```

```text
flight_number     : 55
launch_year       : 2018
launch_date_unix  : 1517941800
launch_date_utc   : 2018-02-06T18:30:00Z
launch_date_local : 2018-02-06T13:30:00-05:00
rocket            : @{rocket_id=falconheavy; rocket_name=Falcon Heavy; rocket_type=FT; 
                    first_stage=; second_stage=}
telemetry         : @{flight_club=}
reuse             : @{core=False; side_core1=True; side_core2=True; fairings=False; 
                    capsule=False}
launch_site       : @{site_id=ksc_lc_39a; site_name=KSC LC 39A; site_name_long=Kennedy 
                    Space Center Historic Launch Complex 39A}
launch_success    : 
links             : @{mission_patch=; reddit_campaign=https://www.reddit.com/r/spacex/com
                    ments/7hjp03/falcon_heavy_demo_launch_campaign_thread/; 
                    reddit_launch=; reddit_recovery=; reddit_media=; presskit=; 
                    article_link=; video_link=}
details           : 

flight_number     : 56
launch_year       : 2018
launch_date_unix  : 1518272520
launch_date_utc   : 2018-02-10T14:22:00Z
launch_date_local : 2018-02-10T09:22:00-05:00
rocket            : @{rocket_id=falcon9; rocket_name=Falcon 9; rocket_type=FT; 
                    first_stage=; second_stage=}
telemetry         : @{flight_club=}
reuse             : @{core=True; side_core1=False; side_core2=False; fairings=False; 
                    capsule=False}
launch_site       : @{site_id=vafb_slc_4e; site_name=VAFB SLC 4E; 
                    site_name_long=Vandenberg Air Force Base Space Launch Complex 4E}
launch_success    : 
links             : @{mission_patch=; reddit_campaign=https://www.reddit.com/r/spacex/com
                    ments/7qnflk/paz_microsat2a_2b_launch_campaign_thread/; 
                    reddit_launch=; reddit_recovery=; reddit_media=; presskit=; 
                    article_link=; video_link=}
details           : 

flight_number     : 57
launch_year       : 2018
launch_date_unix  : 1518566400
launch_date_utc   : 2018-02-14T00:00:00Z
launch_date_local : 2018-02-14T00:00:00-05:00
rocket            : @{rocket_id=falcon9; rocket_name=Falcon 9; rocket_type=FT; 
                    first_stage=; second_stage=}
telemetry         : @{flight_club=}
reuse             : @{core=False; side_core1=False; side_core2=False; fairings=False; 
                    capsule=False}
launch_site       : @{site_id=ccafs_slc_40; site_name=CCAFS SLC 40; site_name_long=Cape 
                    Canaveral Air Force Station Space Launch Complex 40}
launch_success    : 
links             : @{mission_patch=; reddit_campaign=https://www.reddit.com/r/spacex/com
                    ments/7r5pyn/hispasat_30w6_launch_campaign_thread/; reddit_launch=; 
                    reddit_recovery=; reddit_media=; presskit=; article_link=; 
                    video_link=}
details           : 
```

## Latest launch

```powershell
Get-SXLaunch -Latest
```

```text
flight_number     : 54
launch_year       : 2018
launch_date_unix  : 1517433900
launch_date_utc   : 2018-01-31T21:25:00Z
launch_date_local : 2018-01-31T16:25:00-05:00
rocket            : @{rocket_id=falcon9; rocket_name=Falcon 9; rocket_type=FT;
                    first_stage=; second_stage=}
telemetry         : @{flight_club=}
reuse             : @{core=True; side_core1=False; side_core2=False; fairings=False;
                    capsule=False}
launch_site       : @{site_id=ccafs_slc_40; site_name=CCAFS SLC 40; site_name_long=Cape
                    Canaveral Air Force Station Space Launch Complex 40}
launch_success    : True
links             : @{mission_patch=https://i.imgur.com/UJTbQ1f.png; reddit_campaign=http
                    s://www.reddit.com/r/spacex/comments/7olw86/govsat1_ses16_launch_camp
                    aign_thread/; reddit_launch=https://www.reddit.com/r/spacex/comments/
                    7tvtbh/rspacex_govsat1_official_launch_discussion/;
                    reddit_recovery=; reddit_media=https://www.reddit.com/r/spacex/commen
                    ts/7tzzwy/rspacex_govsat1_media_thread_videos_images_gifs/; presskit=
                    http://www.spacex.com/sites/spacex/files/govsat1presskit.pdf; article
                    _link=https://spaceflightnow.com/2018/01/31/spacex-rocket-flies-on-60
                    th-anniversary-of-first-u-s-satellite-launch/;
                    video_link=https://www.youtube.com/watch?v=ScYUA51-POQ}
details           : Reused booster from the classified NROL-76 mission in May 2017.
                    Following a successful experimental ocean landing that used three
                    engines, the booster unexpectedly remained intact; Elon Musk stated
                    in a tweet that SpaceX will attempt to tow the booster to shore.
```

## Launch sites

```powershell
Get-SXLaunchpad
```

```text
id                : ccafs_slc_40
full_name         : Cape Canaveral Air Force Station Space Launch Complex 40
status            : active
location          : @{name=Cape Canaveral; region=Florida; latitude=28.5618571;
                    longitude=-80.577366}
vehicles_launched : {Falcon 9}
details           : SpaceX primary Falcon 9 launch pad, where all east coast Falcon 9s
                    launched prior to the AMOS-6 anomaly. Initially used to launch Titan
                    rockets for Lockheed Martin. Back online since CRS-13 on 2017-12-15.

id                : stls
full_name         : SpaceX South Texas Launch Site
status            : under construction
location          : @{name=Boca Chica Village; region=Texas; latitude=25.9972641;
                    longitude=-97.1560845}
vehicles_launched : {Falcon 9}
details           : SpaceX new launch site currently under construction to help keep up
                    with the Falcon 9 and Heavy manifests. Expected to be completed in
                    late 2018. Initially will be limited to 12 flights per year, and
                    only GTO launches.

id                : vafb_slc_4w
full_name         : Vandenberg Air Force Base Space Launch Complex 4W
status            : active
location          : @{name=Vandenberg Air Force Base; region=California;
                    latitude=34.6332043; longitude=-120.6156234}
vehicles_launched : {Falcon 9}
details           : SpaceX west coast landing pad, has not yet been used. Expected to
                    first be used during the Formosat-5 launch.

id                : ccafs_lc_13
full_name         : Cape Canaveral Air Force Station Space Launch Complex 13
status            : active
location          : @{name=Cape Canaveral; region=Florida; latitude=28.4857244;
                    longitude=-80.5449222}
vehicles_launched : {Falcon 9}
details           : SpaceX east coast landing pad, where the historic first landing
                    occurred. Originally used for early Atlas missiles and rockets from
                    Lockheed Martin. Currently being expanded to add two smaller pads
                    for Falcon Heavy RTLS missions.

...

```

## Capsules

```powershell
Get-SXCapsule
```

```text
id                  : dragon1
name                : Dragon 1
type                : capsule
active              : True
crew_capacity       : 0
sidewall_angle_deg  : 15
orbit_duration_yr   : 2
heat_shield         : @{material=PICA-X; size_meters=3.6; temp_degrees=3000; 
                      dev_partner=NASA}
thrusters           : {@{type=Draco; amount=18; pods=4; fuel_1=nitrogen tetroxide; 
                      fuel_2=monomethylhydrazine; thrust=}}
launch_payload_mass : @{kg=6000; lb=13228}
launch_payload_vol  : @{cubic_meters=25; cubic_feet=883}
return_payload_mass : @{kg=3000; lb=6614}
return_payload_vol  : @{cubic_meters=11; cubic_feet=388}
pressurized_capsule : @{payload_volume=}
trunk               : @{trunk_volume=; cargo=}
height_w_trunk      : @{meters=7.2; feet=23.6}
diameter            : @{meters=3.7; feet=12}

id                  : dragon2
name                : Dragon 2
type                : capsule
active              : False
crew_capacity       : 0
sidewall_angle_deg  : 15
orbit_duration_yr   : 2
heat_shield         : @{material=PICA-X; size_meters=3.6; temp_degrees=3000; 
                      dev_partner=NASA}
thrusters           : {@{type=Draco; amount=18; pods=4; fuel_1=nitrogen tetroxide; 
                      fuel_2=monomethylhydrazine; thrust=}}
launch_payload_mass : @{kg=6000; lb=13228}
launch_payload_vol  : @{cubic_meters=25; cubic_feet=883}
return_payload_mass : @{kg=3000; lb=6614}
return_payload_vol  : @{cubic_meters=11; cubic_feet=388}
pressurized_capsule : @{payload_volume=}
trunk               : @{trunk_volume=; cargo=}
height_w_trunk      : @{meters=7.2; feet=23.6}
diameter            : @{meters=3.7; feet=12}

id                  : crewdragon
name                : Crew Dragon
type                : capsule
active              : False
crew_capacity       : 7
sidewall_angle_deg  : 15
orbit_duration_yr   : 2
heat_shield         : @{material=PICA-X; size_meters=3.6; temp_degrees=3000; 
                      dev_partner=NASA}
thrusters           : {@{type=Draco; amount=18; pods=4; fuel_1=nitrogen tetroxide; 
                      fuel_2=monomethylhydrazine; thrust=}, @{type=SuperDraco; amount=8; 
                      pods=4; fuel_1=dinitrogen tetroxide; fuel_2=monomethylhydrazine; 
                      thrust=}}
launch_payload_mass : @{kg=6000; lb=13228}
launch_payload_vol  : @{cubic_meters=25; cubic_feet=883}
return_payload_mass : @{kg=3000; lb=6614}
return_payload_vol  : @{cubic_meters=11; cubic_feet=388}
pressurized_capsule : @{payload_volume=}
trunk               : @{trunk_volume=; cargo=}
height_w_trunk      : @{meters=7.2; feet=23.6}
diameter            : @{meters=3.7; feet=12}

```

## Parts

```powershell
Get-SXPart -Type Core
```

```text
core_serial     : B0003
status          : expended
original_launch : 2010-06-04
missions        : {Dragon Qualification Unit}
rtls_attempt    : False
rtls_landings   : 0
asds_attempt    : False
asds_landings   : 0
water_landing   : False
details         : Core expended on flight, no recovery effort. First flight of Falcon 9

core_serial     : B0004
status          : expended
original_launch : 2010-12-08
missions        : {COTS Demo Flight 1}
rtls_attempt    : False
rtls_landings   : 0
asds_attempt    : False
asds_landings   : 0
water_landing   : False
details         : First flight of Dragon

core_serial     : B0005
status          : expended
original_launch : 2012-05-22
missions        : {COTS Demo Flight 2}
rtls_attempt    : False
rtls_landings   : 0
asds_attempt    : False
asds_landings   : 0
water_landing   : False
details         :

core_serial     : B0006
status          : expended
original_launch : 2012-10-08
missions        : {SpaceX CRS-1, Orbcomm-OG2}
rtls_attempt    : False
rtls_landings   : 0
asds_attempt    : False
asds_landings   : 0
water_landing   : False
details         : Suffered engine out at T+1:19 but primary mission successful

...
```

## Contributing

The module is available [on github](https://github.com/lazywinadmin/spacex), feel free to contribute via pull requests or issues.

Hope you enjoyed this article ! 🛸🌌🌠👽