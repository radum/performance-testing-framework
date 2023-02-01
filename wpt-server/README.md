# Webpagetest Server

## Utilities

- https://wpt-compare.app/

## Useful links

- https://www.webpagetest.org/?auth=1 - To enable auth again

- http://localhost:4000/index.php?debug=1 - If you run the test with debug=1 (or index.php?debug=1) it will capture the debug log from the agent and show it to the left of the waterfall
- http://localhost:4000/install/ - WebPageTest Installation Check
- http://localhost:4000/getkey.php - Get an API key to use with WPT
- http://localhost:4000/getTesters.php?f=html - Check to see what is connected
- http://localhost:4000/getLocations.php?f=html - Show all locations data
- http://localhost:4000/usage.php - Agents usage
- http://localhost:4000/cron/5min.php - The server should update itself to the latest version

- https://www.webpagetest.org/jsonResult.php?test=210621_BiDcY9_42cd9d50ac4ebfe05e0364ea73fd6e93&pretty=1&average=0&standard=0&runs=0&requests=0&console=0&lighthouse=0&rv=0
JSON output of a test but with filters. All filter options can be found [here](https://github.com/WPO-Foundation/webpagetest/blob/master/www/jsonResult.php#L94). (Ex: `&average=0&standard=0&runs=0&requests=0&console=0&lighthouse=0&rv=0`).

- https://www.webpagetest.org/?fps=60
Useful for CLS, start render precision testing and debugging.

- https://www.webpagetest.org/result/210621_BiDcY9_42cd9d50ac4ebfe05e0364ea73fd6e93/?medianMetric=Largest%20Contentful%20Paint
If you want to change the median run to another metric add `?medianMetric={metric name}`

- https://www.webpagetest.org/video/compare.php?tests=210621_BiDcY9_42cd9d50ac4ebfe05e0364ea73fd6e93-r%3A1-c%3A0&thumbSize=200&ival=100&end=3
If you to show only up until a certain second in Filmstrip view add an `&end={number of seconds}` param.

- https://www.webpagetest.org/video/compare.php?tests=220919_BiDcPT_FQG,220919_BiDc75_FQF&ignoreTTFB
Experiments have a "ignoreTTFB" URL param in the context of A/B comparisons to avoid the server variability. The feature is only surfaced beyond a threshold % difference, but power users can always add it to the URL.

## How-To

- https://www.robinosborne.co.uk/2019/05/20/a-step-by-step-guide-to-setting-up-an-autoscaling-private-webpagetest-instance/
- https://www.robinosborne.co.uk/2019/06/03/a-step-by-step-guide-to-using-terraform-to-define-an-autoscaling-private-webpagetest-instance-in-code/
- https://www.robinosborne.co.uk/2021/02/22/setting-up-an-android-phone-as-a-webpagetest-agent/