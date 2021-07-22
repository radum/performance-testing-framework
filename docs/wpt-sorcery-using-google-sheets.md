# WebPageTest Sorcery Using Google Sheets

How to pull JSON from the Web and work with it directly in Google Sheets

- https://twitter.com/rick_viscomi/status/1408991312729284609
- https://blr.design/blog/webpagetest-in-google-sheets/

1. Run a test in WebPageTest

First off, you need to run a test in WebPageTest and wait for the results.

Once the results page appears, grab the test ID, which is the hash in the address bar URL.

```
https://www.webpagetest.org/result/210630_AiDcXH_a17de95b32287d0a8c9c23afb0cee637/
# '210630_AiDcXH_a17de95b32287d0a8c9c23afb0cee637' is the test ID.
```

2. Set up Google Sheets

You can add a header row for the Test ID and the metric (i.e. JSON path) that you want to look up.

```
Test ID	Run	["chromeUserTiming.LargestContentfulPaint"]	["bytesIn"]	requests[0].dns_ms	TTFB	["base_page_dns_server"]
```

If you want to paruse the results JSON for metrics, just click on “View JSON result” in the WebPageTest results view. It’ll open up a page such as this:

```
https://www.webpagetest.org/jsonResult.php?test=210630_AiDcXH_a17de95b32287d0a8c9c23afb0cee637&pretty=1
```

3. Add a Custom Function

With Custom Functions, you can fetch content from the Web and perform whatever computations you can dream of.

In your Google Sheet, select the menu item Tools > Script editor.

Delete any code in the script editor and replace it with this:

```js
/**
 * Fetches a metric from WebPageTest.
 *
 * @param {string} testId The WebPageTest ID of the test.
 * @param {string} run The WebPageTest RUN of the test.
 * @param {string} metric The name of the metric (as it appears in the results).
 * @return The value of the metric in the test results.
 * @customfunction
 */
function WEBPAGETEST_RESULT_RUN(testId, run, metric) {
  const response = UrlFetchApp.fetch(`https://webpagetest.org/result/${testId}/?f=json&average=0&standard=0&console=0&lighthouse=0&rv=0&requests=0`).getContentText();
  const results = JSON.parse(response);

  return eval(`results.data.runs[${run}].firstView${metric.replace(/^([^\[]+)/, ".$1")}`);
}
```

Important:

Make sure you include JSDoc meta information – the text at the beginning of the snippet that looks like a CSS comment – so that the custom function appears in Sheet’s autocomplete. Without it, you won’t find your function again that easily!

Rename the Apps Script document, e.g. wpt, then click on the Save icon.

4. Use a Custom Function

Now go back to your Google Sheet and refresh it.

Select an empty cell where you want to display a metric value and enter =web and you’ll see the custom function WEBPAGETEST_RESULT_RUN appear in the autocomplete menu.