---
layout: single
title: "CoinMarketCap PowerShell module"
excerpt: "I recently developed an interest for cryptocurrencies. I created a PowerShell module to interact with CoinMarketCap, a website where you can explore coins information."
permalink:
tags: 
  - bitcoin
  - cryptocurrencies
  - coinmarketcap
categories:
  - powershell
published: true
comments: true
author_profile: false
header:
  teaserlogo:
  teaser: ''
  image: images/headers/cryptocurrency01_1920x500.png
  caption: ''
gallery:
  - image_path: ''
    url: ''
    title: ''
toc: true
toc_label: "Table of content"
toc_icon: "code"
toc_sticky: true
---

# CoinMarketCap

I recently developed an interest for cryptocurrencies. It takes some time to get familiar with all the technologies involved but I'm enjoying the ride so far :rocket:

To follow the market, there are plenty of services and websites available. One of the most popular platform is [CoinMarketCap](https://coinmarketcap.com/). In addition to provide a clean interface, they offer a nice api to interact with the data of each coins.

So I figure, why not make a small PowerShell module wrapped around the [coinmarketcap API](https://coinmarketcap.com/api/).

The source of the module are available on Github here: [https://github.com/lazywinadmin/CoinMarketCap](https://github.com/lazywinadmin/CoinMarketCap)

## Installation

You can retrieve and install the module from the PowerShell Gallery.

```powershell
# Install the module from the PowerShell Gallery
Install-Module -Name CoinMarketCap
```

## Usage

### Get a Cryptocurrency information

```powershell
# Retrieve Bitcoin information
Get-Coin -CoinId bitcoin
```

As you may know you don't need to specify the verb `Get-` in powershell for most of the Cmdlets and functions declared in your sessions (Does not work with `process` as far as i know, probably because of the existing `process {}` block)

So you can simply use the following syntax

```powershell
# Retrieve Bitcoin information
Coin btc
```

Example of output:

```text
id                 : bitcoin
name               : Bitcoin
symbol             : BTC
rank               : 1
price_usd          : 5923.98
price_btc          : 1.0
24h_volume_usd     : 8592590000.0
market_cap_usd     : 98789398264.0
available_supply   : 16676187.0
total_supply       : 16676187.0
max_supply         : 21000000.0
percent_change_1h  : -3.27
percent_change_24h : -7.17
percent_change_7d  : -20.74
last_updated       : 1510520351
```

### Show the Cryptocurrency web page

Many things are not available using the API, so I added a switch `-Online` to open the page of the CryptoCurrency you specified.
This is a bit similar to `Get-Help Get-Process -Online`.

```powershell
# Retrieve Cardano coin information
Get-Coin ada -Online
```

![image-center](/images/2017/2017-11-28-CoinMarketCap/CoinMarketCap02.png)

### Retrieve all the existing coins

```powershell
Get-CoinID
```

And you get the top 100

```text
id                    name                    symbol rank
--                    ----                    ------ ----
bitcoin               Bitcoin                 BTC    1   
ethereum              Ethereum                ETH    2   
bitcoin-cash          Bitcoin Cash            BCH    3   
ripple                Ripple                  XRP    4   
litecoin              Litecoin                LTC    5   
bitcoin-gold          Bitcoin Gold            BTG    6   
dash                  Dash                    DASH   7   
iota                  IOTA                    MIOTA  8   
cardano               Cardano                 ADA    9   
monero                Monero                  XMR    10  
ethereum-classic      Ethereum Classic        ETC    11  
neo                   NEO                     NEO    12  
nem                   NEM                     XEM    13  
stellar               Stellar Lumens          XLM    14  
eos                   EOS                     EOS    15  
qtum                  Qtum                    QTUM   16  
zcash                 Zcash                   ZEC    17  
omisego               OmiseGO                 OMG    18  
lisk                  Lisk                    LSK    19  
hshare                Hshare                  HSR    20  
tether                Tether                  USDT   21  
waves                 Waves                   WAVES  22  
bitconnect            BitConnect              BCC    23  
stratis               Stratis                 STRAT  24  
populous              Populous                PPT    25  
bitshares             BitShares               BTS    26  
decred                Decred                  DCR    27  
ardor                 Ardor                   ARDR   28  
bytecoin-bcn          Bytecoin                BCN    29  
ark                   Ark                     ARK    30  
augur                 Augur                   REP    31  
komodo                Komodo                  KMD    32  
monacoin              MonaCoin                MONA   33  
steem                 Steem                   STEEM  34  
tenx                  TenX                    PAY    35  
golem-network-tokens  Golem                   GNT    36  
dogecoin              Dogecoin                DOGE   37  
maidsafecoin          MaidSafeCoin            MAID   38  
digixdao              DigixDAO                DGD    39  
pivx                  PIVX                    PIVX   40  
exchange-union        Exchange Union          XUC    41  
veritaseum            Veritaseum              VERI   42  
vertcoin              Vertcoin                VTC    43  
factom                Factom                  FCT    44  
siacoin               Siacoin                 SC     45  
salt                  SALT                    SALT   46  
power-ledger          Power Ledger            POWR   47  
nxt                   Nxt                     NXT    48  
raiden-network-token  Raiden Network Token    RDN    49  
basic-attention-token Basic Attention Token   BAT    50  
binance-coin          Binance Coin            BNB    51  
bitcoindark           BitcoinDark             BTCD   52  
gas                   Gas                     GAS    53  
byteball              Byteball Bytes          GBYTE  54  
status                Status                  SNT    55  
tron                  TRON                    TRX    56  
kyber-network         Kyber Network           KNC    57  
syscoin               Syscoin                 SYS    58  
iconomi               Iconomi                 ICN    59  
zcoin                 ZCoin                   XZC    60  
walton                Walton                  WTC    61  
metaverse             Metaverse ETP           ETP    62  
gamecredits           GameCredits             GAME   63  
aeternity             Aeternity               AE     64  
gnosis-gno            Gnosis                  GNO    65  
gxshares              GXShares                GXS    66  
bytom                 Bytom                   BTM    67  
digibyte              DigiByte                DGB    68  
ethos                 Ethos                   ETHOS  69  
blocknet              Blocknet                BLOCK  70  
civic                 Civic                   CVC    71  
funfair               FunFair                 FUN    72  
bancor                Bancor                  BNT    73  
0x                    0x                      ZRX    74  
metal                 Metal                   MTL    75  
pura                  Pura                    PURA   76  
cryptonex             Cryptonex               CNX    77  
einsteinium           Einsteinium             EMC2   78  
verge                 Verge                   XVG    79  
singulardtv           SingularDTV             SNGLS  80  
lykke                 Lykke                   LKK    81  
storj                 Storj                   STORJ  82  
minexcoin             MinexCoin               MNX    83  
zencash               ZenCash                 ZEN    84  
adx-net               AdEx                    ADX    85  
quantstamp            Quantstamp              QSP    86  
vechain               VeChain                 VEN    87  
counterparty          Counterparty            XCP    88  
ubiq                  Ubiq                    UBQ    89  
streamr-datacoin      Streamr DATAcoin        DATA   90  
substratum            Substratum              SUB    91  
aragon                Aragon                  ANT    92  
nexus                 Nexus                   NXS    93  
particl               Particl                 PART   94  
santiment             Santiment Network Token SAN    95  
bitbay                BitBay                  BAY    96  
nav-coin              NAV Coin                NAV    97  
edgeless              Edgeless                EDG    98  
monaco                Monaco                  MCO    99  
feathercoin           Feathercoin             FTC    100 
```

### Get global market data

```powershell
Get-CoinGlobal
```

```text
total_market_cap_usd             : 194757913663.0
total_24h_volume_usd             : 22536410182.0
bitcoin_percentage_of_market_cap : 50.96
active_currencies                : 900
active_assets                    : 372
active_markets                   : 6513
last_updated                     : 1510520660
```

### Get the Historical data of a currency

This one was a bit tricky. CoinMarketCap does not offer an API for that. However I noticed that when you search for set of data with a start and end date you get an url that look like this `https://coinmarketcap.com/currencies/cardano/historical-data/?start=20171101&end=20171105`

![image-center](/images/2017/2017-11-28-CoinMarketCap/CoinMarketCap03.png)

Finally I can easily parse the page to retrieve the table. I'm using the code [from Lee Holmes](http://www.leeholmes.com/blog/2015/01/05/extracting-tables-from-powershells-invoke-webrequest/).

```powershell
Get-CoinHistory -Begin '20171101' -End '20171105' -CoinId ada
```

```text
Date       : Nov 11, 2017
Open       : 298.59
High       : 319.45
Low        : 298.19
Close      : 314.68
Volume     : 842,301,000
Market Cap : 28,559,400,000

Date       : Nov 10, 2017
Open       : 320.67
High       : 324.72
Low        : 294.54
Close      : 299.25
Volume     : 885,986,000
Market Cap : 30,665,200,000

Date       : Nov 09, 2017
Open       : 308.64
High       : 329.45
Low        : 307.06
Close      : 320.88
Volume     : 893,250,000
Market Cap : 29,509,000,000

Date       : Nov 08, 2017
Open       : 294.27
High       : 318.70
Low        : 293.10
Close      : 309.07
Volume     : 967,956,000
Market Cap : 28,128,700,000

Date       : Nov 07, 2017
Open       : 298.57
High       : 304.84
Low        : 290.77
Close      : 294.66
Volume     : 540,766,000
Market Cap : 28,533,300,000

Date       : Nov 06, 2017
Open       : 296.43
High       : 305.42
Low        : 293.72
Close      : 298.89
Volume     : 579,359,000
Market Cap : 28,322,700,000

Date       : Nov 05, 2017
Open       : 300.04
High       : 301.37
Low        : 295.12
Close      : 296.26
Volume     : 337,658,000
Market Cap : 28,661,500,000

Date       : Nov 04, 2017
Open       : 305.48
High       : 305.48
Low        : 295.80
Close      : 300.47
Volume     : 416,479,000
Market Cap : 29,175,300,000

Date       : Nov 03, 2017
Open       : 288.50
High       : 308.31
Low        : 287.69
Close      : 305.71
Volume     : 646,340,000
Market Cap : 27,547,400,000

Date       : Nov 02, 2017
Open       : 290.73
High       : 293.91
Low        : 281.17
Close      : 287.43
Volume     : 904,901,000
Market Cap : 27,754,200,000

Date       : Nov 01, 2017
Open       : 305.76
High       : 306.40
Low        : 290.58
Close      : 291.69
Volume     : 553,864,000
Market Cap : 29,183,600,000
```

Let me know what you think and feel free to contribute to the module by using the [issues and pull requests](https://github.com/lazywinadmin/CoinMarketCap).
