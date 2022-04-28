# WPT Cookie consent

## Bypass Cookie Consent Banner

There are two main methods to bypass cookie consent banners / screens detailed below.

### 1. Click the button

Clicking the consent button is the easiest method, but means that you will have two steps by default. It is great for simulating the first-time user experience. You can combine the steps into one waterfall, or split them and set event names.

**Using `combineSteps`**

```js
combineSteps
navigate	https://www.harpersbazaar.com/
sleep 5
execAndWait	document.querySelector('#onetrust-accept-btn-handler').click()
```

**Using `setEventName`**

```js
setEventName	Homepage
navigate	https://www.harpersbazaar.com/
setEventName	AcceptCookies
execAndWait	document.querySelector('#onetrust-accept-btn-handler').click()
```

### 2. Set the cookie

Setting the consent cookie(s) emulates a repeat visitor experience and is my preference for testing holistic performance - including how consented scripts interact with page load. Note that consent cookies are normally time-limited, so a test run now may work but in a month you may need to update the timestamp / date in the cookie value.

Note that the cookie must be set on page origin, including protocol but excluding trailing slash. It is possible that a combination of cookies is required to clear the banner so it may take a few test runs. Use a fast connection and single-run first-view only tests to speed up the process!

Load the target page in an incognito / private window and accept cookies. Look at the cookies that are set against the first-party domain, you’re looking for any cookie names like `%consent%`

```
setCookie https://www.harpersbazaar.com OptanonAlertBoxClosed=2022-04-05T11:05:53.794Z
setCookie https://www.harpersbazaar.com OptanonConsent=isIABGlobal=false&datestamp=Tue+Apr+05+2022+12%3A05%3A54+GMT%2B0100+(British+Summer+Time)&version=6.32.0&hosts=&consentId=5810616d-5003-40e8-8d7c-37e4e957aac7&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0004%3A1%2CBG352%3A1%2CC0003%3A1%2CC0002%3A1%2CC0005%3A1&geolocation=%3B&AwaitingReconsent=false
navigate	https://www.harpersbazaar.com/
```