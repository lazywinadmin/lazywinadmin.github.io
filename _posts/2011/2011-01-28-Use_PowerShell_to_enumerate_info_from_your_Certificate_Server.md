---
layout: single
title: PowerShell - Gather information from your Certificate Server
excerpt: 
permalink: /2011/01/se-powershell-to-enumerate-info-from.html
tags: 
- certificate
- powershell
- scripting
categories:
- powershell
published: true
comments: true
classes: wide
---

Here is a quick PowerShell tip to retrieve information from your Certificate Authority server

## PowerShell version

```powershell
Function Get-CertInfo {
PARAM($server)

    # Establish connection to Certificate server
    $CaView = New-Object -Com CertificateAuthority.View.1
    $CaView.OpenConnection($Server)

    # Define the numbers of columns
    $NumberOfColumns=8
    $CaView.SetResultColumnCount($NumberOfColumns)
    $Index0 = $CAView.GetColumnIndex($False, "CommonName")
    $Index1 = $CAView.GetColumnIndex($False, "Email")
    $Index2 = $CAView.GetColumnIndex($False, "NotAfter")
    $Index3 = $CAView.GetColumnIndex($False, "Country")
    $Index4 = $CAView.GetColumnIndex($False, "Organization")
    $Index5 = $CAView.GetColumnIndex($False, "OrgUnit")
    $Index6 = $CAView.GetColumnIndex($False, "DistinguishedName")
    $Index7 = $CAView.GetColumnIndex($False, "Disposition")
    
    $CAView.SetResultColumn($Index0)
    $CAView.SetResultColumn($Index1)
    $CAView.SetResultColumn($Index2)
    $CAView.SetResultColumn($Index3)
    $CAView.SetResultColumn($Index4)
    $CAView.SetResultColumn($Index5)
    $CAView.SetResultColumn($Index6)
    $CAView.SetResultColumn($Index7)
 
 
    $RowObj= $CAView.OpenView()
    [void]$RowObj.Next()
    $Cert="IssuingCA,CommonName,Email,NotAfter,Country,Organization,OrgUnit,DistinghuishedName,Disposition`n"
    
    Do
    {
        $Cert= $Cert + $srv + ","
        $ColObj = $RowObj.EnumCertViewColumn()
        [void]$ColObj.Next()
    
        Do {
            $Cert = $Cert + $ColObj.GetValue(1) + ","
        } Until ($ColObj.Next() -eq -1)
        
        Clear-Variable ColObj
        $Cert=$Cert+"`n"
        
    } Until ($Rowobj.Next() -eq -1 )
    Return $Cert
    }

```



## VbScript version

```vb
Const CV_OUT_BASE64 = &H1

'THIS IS THE <machinename>\CAName
CAName = "MyMachine\SpatCA"     '=======>> CHANGE THIS TO THE CORRECT MACHINE\CA==


'create the CAView object
set oCAView = CreateObject("CertificateAuthority.View.1")


'open the connection to the Machine\CA
oCAView.OpenConnection (CAName)

'retrieve specific columns from DB
oCAView.SetResultColumnCount(3) 
Index0 = oCAView.GetColumnIndex(False, "CommonName") 
Index1 = oCAView.GetColumnIndex(False, "Email")
Index2 = oCAView.GetColumnIndex(False, "NotAfter")

oCAView.SetResultColumn (Index0) 
oCAView.SetResultColumn (Index1)
oCAView.SetResultColumn (Index2)

'open the view
Set RowObj= oCAView.OpenView

Do Until RowObj.Next = -1

Set ColObj = RowObj.EnumCertViewColumn()

Do Until ColObj.Next = -1
wscript.echo  ColObj.GetValue(CV_OUT_BASE64) & vbcrlf
'insert logic for checking date to
'current and if near\past send mail.
'see http://www.paulsadowski.com/WSH/cdo.htm
'for a number of examples of mail send info
'Obviously you may want to use the cert email
'attribute to send the mail
Loop

Set ColObj = Nothing

Loop
```