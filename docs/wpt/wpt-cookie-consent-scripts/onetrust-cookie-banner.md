# OneTrust Cookie Banner

**cookies**

- OptanonConsent
- OptanonAlertBoxClosed

## To generate new values

```js
const otScriptVersion = '6.11.0';
const OptanonConsent = `landingPath=NotLandingPage&datestamp=${encodeURI(
    new Date(Date.now() - 10).toISOString()
)}&version=${otScriptVersion}&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&hosts=&consentId=a969e5b2-3a55-4fdd-b255-9358c5789896&interactionCount=1`;

const OptanonAlertBoxClosed = new Date(Date.now() - 10).toISOString(); // '2021-04-06T13:12:00.236Z';
```

## WPT Script

```
setCookie	https://www.company.com/	OptanonConsent=isIABGlobal=false&datestamp=Mon+Mar+08+2021+21%3A51%3A49+GMT%2B0000+(Greenwich+Mean+Time)&version=6.11.0&hosts=&consentId=a06eafbf-2110-4c6d-baf8-5446b7409f45&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0%2CC0004%3A0
setCookie	https://www.company.com/	OptanonAlertBoxClosed=2021-03-08T21:51:49.487Z
navigate	https://www.company.com/about/
```