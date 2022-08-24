# Performance tools

> Performance related tools used to measure, test, report and debug performance.

- [Performance tools](#performance-tools)
  - [Tools](#tools)
    - [Free tools and services](#free-tools-and-services)
      - [Performance Audits](#performance-audits)
      - [Webpagetest](#webpagetest)
      - [Lighthouse & CrUX & Core Web Vitals](#lighthouse--crux--core-web-vitals)
      - [Images & Video](#images--video)
      - [Thirdparty](#thirdparty)
      - [Development Tools](#development-tools)
      - [Network Tools](#network-tools)
      - [Load testing](#load-testing)
      - [Benchmarking](#benchmarking)
      - [Fonts](#fonts)
      - [Browser Extensions](#browser-extensions)
      - [Other Tools](#other-tools)
    - [Paid tools and services](#paid-tools-and-services)
  - [Needs sorting](#needs-sorting)

## Tools

### Free tools and services

- [Chcr.co](https://chckr.co/) Check Your Site Across Leading Website Testing Tools

#### Performance Audits

- [AutoWebPerf (AWP)](https://github.com/GoogleChromeLabs/AutoWebPerf), Google, AutoWebPerf provides a flexible and scalable framework for running web performance audits with arbitrary audit tools like WebPageTest and PageSpeedInsights.
This is a very powerfull tool to run bulk tests on various platforms with multiple input and output formats.
- [WebPageTest Bulk Tester](https://github.com/andydavies/WPT-Bulk-Tester), built by Andy Davies, uses Google Sheets to test multiple URLs using WebPageTest using configurable test settings.

#### Webpagetest

- [WebPageTest](http://www.webpagetest.org/)
Make synthetic measurements from all over the world. Make performance audits of any website. This tool is very powerful and gives you a lot of insights. I use it a lot to make a website comparison video.
- [WebPageTest comparison URL generator](https://wpt-compare.app/)
Compare multiple webpagetest results which each other. Nice tool to see filmstrips site by site.
- [Frustration Index](https://www.frustrationindex.com)
"The gap between metrics is a better KPI for user experience" - FRUSTRATIONindex looks at the gap between metrics instead of looking at them individually.
The bigger the gap the bigger the chance a user gets frustrated.
- [Request Map Generator](https://requestmap.herokuapp.com/)
The Request Map Generator is the go to place to understand what 3rd party tools are running on your page and how much data they are adding.
- [Webpagetest Slack Integration](https://github.com/WebPageTest/webpagetest-slack)
- [WPT Gauntlet](https://github.com/jpnelson/wpt-gauntlet)
wpt-gauntlet is a tool for running a page through a "gauntlet" of web page test runs. This can be combined with jq or tracex to do custom lab performance benchmarking at a scale large enough for statistical significance

#### Lighthouse & CrUX & Core Web Vitals

- [Core Web Vitals Optimizer (BETA)](https://github.com/fabkrum/core-web-vitals-optimizer) https://fabkrum.github.io/core-web-vitals-optimizer/
- [Unlighthouse](https://github.com/harlan-zw/unlighthouse) Scan your entire website with Google Lighthouse️ - in 2 minutes
- [Calibre Core web vitals checker](https://calibreapp.com/tools/core-web-vitals-checker) CWV summary is generated based on Google’s Chrome User Experience Report (CrUX)
- [Lighthouse network throttling simulation](https://www.debugbear.com/lighthouse-simulation) This tool runs a Lighthouse performance test at a range of different network speeds. This shows how bandwidth and round-trip latency impact site performance metrics.
- [Project Lantern](https://docs.google.com/document/d/1pHEjtQjeycMoFOtheLfFjqzggY8VvNaIRfjC7IgNLq0/edit#) Lantern set out to remove Lighthouse's dependency on network throttling and reduce the required time to compute results (previously ~40 seconds) to the same level as that of PageSpeed Insights (~16 seconds).
- [Lighthouse network throttling simulation](https://www.debugbear.com/lighthouse-simulation) This tool runs a Lighthouse performance test at a range of different network speeds. It shows how bandwidth and round-trip latency impact site performance metrics.
- [Multihouse](https://github.com/samdutton/multihouse)
Multiple Lighthouse runs for multiple URLs
- [Lighthouse](https://developers.google.com/web/tools/lighthouse/)
Lighthouse is becoming the best audit tool for web performance. It has a great documentation and gives valuable insights. This is where my performance audit is starting.
- [Lighthouse Parade](https://github.com/cloudfour/lighthouse-parade)
A Node.js command line tool that crawls a domain and compiles a report with lighthouse performance data for every page.
- [Pagespeed Compare](https://pagespeed.compare/)
Compare performance metrics of your pages against each other or your competitors using Google PageSpeed Insights.
- [Lighthouse Scoring Calculator](https://googlechrome.github.io/lighthouse/scorecalc/): Learn how the Lighthouse Score is calculated for the last two versions. This helps to understand where changes are comming from if your score changes.
- [Lighthouse Scores from around the world](https://lighthouse-metrics.com/): Global performance insights, powered by Lighthouse. Lighthouse Metrics provides easy insights for your site's performance. Save your time by running tests from multiple locations to get the valuable insight you need.
- [Web Performance Budget Calculator](https://perf-budget-calculator.firebaseapp.com/)
Create your own budget based on httparchive data of millions of pages. Download it as an json file for [Lighthouse Web Performance Budget](https://developers.google.com/web/tools/lighthouse/audits/budgets).
- [Test your mobile speed with Google](https://testmysite.withgoogle.com/intl/en-gb)
Test score, benchmark with other pages from the same industry, detailed report
- [Google Search Console](https://search.google.com/)
Detect Core Web Vitals issues on your page. Fix it. And revalidate.
- [Google Page Speed Insights](https://developers.google.com/speed/pagespeed/insights/)
Show CrUX RUM data of big websites.
- [Treo](https://treo.sh/sitespeed/)
Configure speed metrics using percentiles and intervals for any website from @ChromeUXReport
- [Real User Experience Test (rUXt)](https://ruxt.dexecure.com/)
Access RUM data for 3,237,526 websites accessed by Google Chrome Users
- [Google Speed Scorecard](https://www.thinkwithgoogle.com/feature/mobile/)
Compare your mobile Site Speed with your competition based on CrUX data
- [Google Imapct Calculator](https://www.thinkwithgoogle.com/feature/mobile/)
Estimate the revenue impact of performance optimisations
- [Google Page Speed Industry Benchmarks](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/)
- [Mobile Friendly Test](https://search.google.com/test/mobile-friendly)
- [massWebVitals](https://github.com/dwsmart/massWebVitals)
A node CLI script to grab Largest Contentful Paint, First Input Delay & Cumulative Layout Shift for a list of pages specified in a .csv file.
- [Layout Shift GIF Generator](https://defaced.dev/tools/layout-shift-gif-generator/): Visualise the Core Web Vitals metric Cumulative Layout Shift (CLS) with a simple GIF.
- [Cumulative Layout Shift Debugger](https://webvitals.dev/cls): Visualise the Cumulative Layout Shift (CLS) to identify what needs improving on mobile and/or desktop in the initial load of a website.
- [Batch Speed: Bulk speed test multiple urls using Google's Page Speed checker](https://batchspeed.com/)
- [Layout Shift Terminator](https://googlechromelabs.github.io/layout-shift-terminator/):
The following tool allows you to enter arbitrary markup which causes layout shifts (e.g. social embed) in order load the markup at various viewport sizes to be able to measure the dimensions at each. With this information it then provides optimized markup with responsive media queries to reduce the amount of layout shifting when the markup is rendered on a loading page.

#### Images & Video

- [Daltons](https://github.com/cleverage/daltons)
daltons is a command-line tool that computes optimal image widths to put in srcset attributes of responsive images.
- [AVPress](https://avpress.zaps.dev/)
Compress & resize videos in the browser thanks to WebAssembly and FFMPEG.WASM.
- [Squoosh](https://squoosh.app)
Upload an image and compare the original with different compressed version to find a good balance between filesize and image quality. – 🚀
- [I just want to put an image on my page](https://just-gimme-an-img.vercel.app/) ([Article](https://paul.kinlan.me/images-are-still-too-hard/))
Optimizes images and generate the HTML for you.
- [See How Images Affect Your Page Speed](https://pageweight.imgix.com)
- [Image Analyser](https://webspeedtest.cloudinary.com/)
Image analysis tool. This tool gives you insight about how you can optimise your images to gain a better web performance. This tool is also integrated within webpagetest.org.
- [Cloudflare: Image Optimization Test](https://images.cloudflare.com/)
Image analysis tool. This tool gives you insight about how you can optimise your images to gain a better web performance.
- [Cloudinary: Image Analyser](https://webspeedtest.cloudinary.com/)
Image analysis tool. This tool gives you insight about how you can optimise your images to gain a better web performance. This tool is also integrated within webpagetest.org.
- [Responsive Image Breakpoints Generator v2.0](https://responsivebreakpoints.com/)
Easily generate the optimal responsive image dimensions
- [ImageOptim](https://imageoptim.com/)
Image compression
- [ImageAlpha](https://pngmini.com/)
Free png optimizer for MacOS

#### Thirdparty

- [3P web](https://www.thirdpartyweb.today/), Shows the impact of Third-Party Tools based on HTTP Archive data.
- [https://better.fyi/trackers/](https://better.fyi/trackers/)
Nice list of 3rd party trackers with detailed information, for example about how to block the service. Which comes in handy when you want to measure the impact of a tool.
- [spof-o-matic](https://github.com/pmeenan/spof-o-matic)
Chrome extension for detecting and simulating frontend Single Points Of Failure
- [JS Manners](https://github.com/triblondon/thirdpartysla)
I like this page to audit JS Frameworks and 3rd party tools.
- [Webbkoll](https://webbkoll.dataskydd.net/)
This tool helps you check what data-protecting measures a site has taken to help you exercise control over your privacy.
- [Ghostery](https://www.ghostery.com/)
See what 3rd party tools are loaded on a site.
- [3rdParty.io](http://3rdparty.io/)
3rdParty.io monitors third-party scripts and libraries, and checks that they’re following best practices for performance, reliability and security – 🚀
- [3rd Party Audit Google Sheet](https://docs.google.com/spreadsheets/d/1uTcRSoJAkXfIm2yfG5hvCSzvSZD9fAwXNQMVK3HdPMI/edit#gid=0)
A Google Sheet provided by Harry Roberts which gives you a nice overview over your used 3rd Party Tools
- [Content Security Policy (CSP) Generator](https://report-uri.com/home/generate)
- [Wappalyzer - Identify technology on websites](https://www.wappalyzer.com/)
- [SimilarWeb](https://www.similarweb.com/)
Find similar pages for a competitor benchmark.
- [Build with](https://builtwith.com/)
Understand the technical building blocks of a website.

#### Development Tools

- [Resource Hint Validator by DebugBear](https://www.debugbear.com/resource-hint-validator)
- [HTML Size Analyzer by DebugBear](https://www.debugbear.com/html-size-analyzer)
- [PurifyCSS Online](https://purifycss.online/)
Insert your website URL below and find out by how much of your CSS file size can be reduced
- [Microsoft WebHint](https://webhint.io/)
webhint is a customizable linting tool that helps you improve your site's accessibility, speed, cross-browser compatibility, and more by checking your code for best practices and common errors.
- [Chrome Developer Tools](https://developer.chrome.com/devtools)
This is the go to tool for all web developers. Understand how your code gets loaded, parsed and rendered. – 🚀
- [Yellow Lab Tools](https://yellowlab.tools)
Online test to help speeding up heavy web pages: Frontend Quality, WebPerf, JS Profiling – 🚀
- [Waterfaller: generate tasks for developers that boost page speed](https://waterfaller.dev/)
Waterfaller uses Google PageSpeed Insights to generate an actionable list of tasks to improve your Core Web Vitals metrics. It might be a good compliment to Lighthouse audit tips! – 🚀
- [Can I use?](https://caniuse.com/)
Check the browser support for every web technology. – 🚀
- [SpeedChecklist](https://speedchecklist.com/)
A checklist which shows you how to optimise web performance issues you might have. You find best practices for the most common problems described in great detail.
- [Slowfiles](https://slowfil.es/), Harry Roberts & Ryan Townsend
Simulate slow loading JS and CSS files.
- [CSS Triggers](https://csstriggers.com/)
Which CSS element trigger layout, paint, or composite?
- [BundlePhobia](https://bundlephobia.com/)
Find the cost of adding a npm package to your bundle
- [EStimator](https://estimator.dev/)
Find out how much turning on modern JS could save.
- [Perf Track](https://perf-track.web.app/),
Compares the HTTP archive data of different JavaScript Frameworks
- [Source Map Explorer](https://www.npmjs.com/package/source-map-explorer), [Webpack Bundle Analyer](https://www.npmjs.com/package/webpack-bundle-analyzer)
Understand what code you are loading
- [Bundle per page type/entry point](https://bundlers.tooling.report/code-splitting/multi-pages/)
- [You might not need Javascript](http://youmightnotneedjs.com/)
Don’t use Javascript for things where it is not really needed. This website shows you to do stuff with CSS: Slider, Modal, Scroll Indicator, Navigation, Tabs, Accordion
- [You might not need jQuery](http://youmightnotneedjquery.com/)
Learn how to get rid of jQuery dependencies in your project. This page shows you how to achieve things with Vanilla Javascript.
- [Browser Scope](https://www.browserscope.org/)
Browserscope is a community-driven project for profiling web browsers. The goals are to foster innovation by tracking browser functionality and to be a resource for web developers.
- [CSS stats](https://cssstats.com/)

**Chrome dev tools Extensions**

- [DOM Treemap](https://github.com/Schepp/dom-treemap-devtools-extension)
A Chrome Devtools extension that helps you explore the distribution of DOM nodes in the document tree.

#### Network Tools

- [H2Vis](https://github.com/DaanDeMeyer/h2vis)
H2Vis is an application that visualizes the inner workings of HTTP/2.
- [Fast or Slow](https://www.fastorslow.com/)
Global Website Speed Profiler
- [https://httpstatus.io/](https://httpstatus.io/)
Service which shows status codes, latency, response headers and more from the URL you submit. This is great to check for redirects and other network related issues.
- [Cloud Ping](http://www.cloudping.info/)
See the network latency from your location to all AWS centres in the work.
- [Charles Web Debugging Proxy](https://www.charlesproxy.com/) (free/$50)
The proxy sits between your browser and the internet and lets you monitor and alter all the network traffic. I use it mainly for network throttling and request blocking.
- [DNS Perf](https://www.dnsperf.com/dns-speed-benchmark/)
DNS Speed Benchmark: Test the performance of your DNS provider from all over the world using this benchmark tool
- [DNS Speed Test](https://www.ultratools.com/tools/dnsHostingSpeed)
The DNS hosting speed tool will give you valuable DNS performance information for each level in the DNS tree to assist with performance evaluations and performance troubleshooting.
- [SSL Server Test](https://entrust.ssllabs.com/)
This free online service performs a deep analysis of the configuration of any SSL web server on the public Internet.
- [httpstat.us](http://httpstat.us/)
Service which responds which all kind of http error codes. With this service you can check how your app or website reacts when 3rd party services are responding with an error.
- [CDN Performance Tool](https://www.uptrends.com/tools/cdn-performance-check)
Using one of your page’s CDN requests, enter the request URL above—perhaps try an image request. Uptrends sends the request and checks your CDN responses from multiple locations. Uptrends measures the response times, connection details, headers, response size, and more from each location. For best results, enable debug response headers in your CDN configuration.
- [CDN Planet](https://www.cdnplanet.com/)
Find the CDN which is right for you.
- [Gzip and Brotli Compression Level Estimator](https://tools.paulcalvano.com/compression.php)
- [Is HTTP2 fast yet?](http://ishttp2fastyet.com/), Andy Davies
- [Cache Control Header Builder](https://cache-control.sdgluck.now.sh/)
- [httpstat cli](https://github.com/davecheney/httpstat), It's like curl -v, with colours.

#### Load testing

- [locust](https://github.com/locustio/locust)
Locust is an easy to use, scriptable and scalable performance testing tool. You define the behaviour of your users in regular Python code.
- [taurus](https://github.com/Blazemeter/taurus)
Hides the complexity of performance and functional tests with an automation-friendly convenience wrapper. Taurus relies on JMeter, Gatling, Locust.io, Grinder and Selenium WebDriver as its underlying tools. Free and open source under Apache 2.0 License.
- [plow](https://github.com/six-ddc/plow)
Plow is a HTTP(S) benchmarking tool, written in Golang.

#### Benchmarking

- https://github.com/TracerBench/tracerbench Automated Chrome Tracing For Benchmarking

#### Fonts

- [Autmatic Font Matching](https://deploy-preview-15--upbeat-shirley-608546.netlify.app/perfect-ish-font-fallback/?font=Montserrat)
- [Font-Face Descriptor Playground](https://codepen.io/simonjhearne/pen/rNMGJyr)
- [Font Style Matcher](https://meowni.ca/font-style-matcher/)
If you use font-display: swap this tool is great to make sure the fallback font looks as similar as possible to avoid major layout changes once the web font is loaded and swapped.
- [FOIT vs FOUT](https://www.zachleat.com/foitfout/)
- [Glyphhanger](https://github.com/filamentgroup/glyphhanger)
Your web font utility belt. It can subset web fonts. It can show you what unicode-ranges are used on a web site (optionally per font-family). It can also subset web fonts automatically using the unicode-ranges it found.
- [Wakamaifondue](https://wakamaifondue.com)
Tool to inspect local font files
- [FontDrop!](https://fontdrop.info/)
Simple and easy way to view the content of font files.
- [Online Font Converter](https://onlinefontconverter.com/)
A good tool to create woff2 fonts
- [Font Subsetter](https://everythingfonts.com/subsetter)
- [Google Web Fonts Helper](https://google-webfonts-helper.herokuapp.com/fonts)
A Hassle-Free Way to Self-Host Google Fonts by Mario Ranftl

#### Browser Extensions

- [Cloudinary Media Inspector](https://chrome.google.com/webstore/detail/cloudinary-media-inspecto/ehnkhkglbafecknplfmjklnnjimokpkg)
Gives a quick overview of all loaded images (dimension, ratio, format, header, details)
- [Piez](https://chrome.google.com/webstore/detail/piez/npbccjkjemgagjioahfccljgnlkdleod?hl=en)
Piez displays optimizations made by Akamai Image Manager, Resource Optimizer, Push/Preconnect, and Script Manager.
- [ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en)
Set additional headers. I use this to set the x-host when I test Cloudflare Workers in the browser.
- [Web Vitals](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma?hl=en#:~:text=Web%20Vitals&text=Web%20Vitals%20are%20quality%20signals,interactivity%20and%20layout%20shift%20metrics.)
Shows the Web Vitals for the active page.
- [CLS Visualizer](https://chrome.google.com/webstore/detail/cls-visualizer/jbbeihojggidiclbcneckhcblilapahn?hl=en)
This plugin will highlight and visualize the Cumulative Layout Shift of the current page.

#### Other Tools

- [ProgUX – The best experience for every user](https://progux.org/)
- [Web Performance Heat Map Generator](http://heatmap.webperf.tools/)
- [What does my site cost](https://whatdoesmysitecost.com/)
How much does it cost for your users to download your page? In many countries the majority of the users are on a pre paid data plan.
- [Website carbon - How is your website impacting the planet?](https://www.websitecarbon.com/)
- [har.tech](https://har.tech/)
Collection of tools which can be used to inspect HAR files.
- [Waterfall Heatmap Bookmarklet](https://github.com/zeman/perfmap)
Prints the timing data on assets.
- [Performance budget calculator](http://www.performancebudget.io/) - 🚀
- [UX Speed Calculator](https://ux-speed-calculator.netlify.app), Sergey Chernyshev
A visualization tool that helps understand relationship between page speed, conversion and bounce rates. Does not require a real data (e.g. RUM) and lets you tweak the distributions yourself
- [SERP Speed](https://reddico.co.uk/tools/serp-speed/)
Compare your page speed at keyword level with the rest
- [NPM dependency graph](https://npmgraph.js.org/)
Generates the NPM dependency graph by uploading a package.json file
- [HAR Analyzer](https://github.com/kevinfarrugia/hara)
HAR Analyzer is a Node.js-based tool for performing simple analysis on HTTP Archive (.har) files.

### Paid tools and services

> These are professional tools which cost money. The cost are usually depends on traffic, server or data.

- [New Relic](https://newrelic.com/)
New Relic offers your great tools which give you insight in your whole app stack in real time. New Relic insights lets you also consume 3rd party APIs and correlate performance with business data. It also comes with great monitor solutions which alert you before things getting bad.
- [Speedcurve](https://speedcurve.com/)
Speedcurve is build on top of WebPageTest and makes running synthetic tests easy. You get nice looking dashboards which are great for running on a big display in your office. With Lux they also integrated a RUM solution. - 🚀
- [Akamai Web Performance Tools](https://www.akamai.com/uk/en/products/web-performance/)
With mPulse you can understand how your performance and business data is correlation. With the “What if” tool you can predict the impact of performance changes on your business KPI. Works together with Chrome UX report data and shows RUM data of your competition (if the data is available).
- [Calibre](https://calibreapp.com)
Nice Web Perf Tool to measure synthetic data
- [Treo](https://treo.sh)
Treo is a good choice if you are interested in Lighthouse (Pages) and CrUX (Sites) data.
- [Blackbird](https://tryblackbird.com/)
Ecommerce site speed monitoring – Track down-to-the-millisecond speed metrics for your users, see how speed affects your conversion rate, and get alerts & reports to stay on top of it
- [Cloudinary](https://cloudinary.com/)
Image and video management in the cloud
- [Request Metrics](https://requestmetrics.com/)
Request Metrics is a simple low-cost performance monitoring service. It charts real user metrics and web vitals for your web pages and API endpoints. It also comes with alerting tools that notify you when pages or endpoints slow down.
- [Cloudflare Workers](https://workers.cloudflare.com/)
They are like service workers in the cloud. With their help you can prototype your web performance optimizations quickly and test the outcome in Webpagetest.org.

## Needs sorting

- https://github.com/nucliweb/webperf-snippets - A curated list of snippets to get Web Performance metrics to use in the browser console
- https://webperf.tools/
- https://requestmap.pages.dev/
- https://requestmap.webperf.tools/ - Request map generator, compiles a chart of all requests and their dependencies.
- https://requestmap.herokuapp.com/
- https://github.com/vigneshshanmugam/rum-profiler
- https://calibreapp.com/ - Monitor and audit web performance.
- https://speedcurve.com/ - See how real people experience the speed of your website.
- https://web.dev/measure/ - Uses Lighthouse
- https://treo.sh/ - Page Speed Monitoring Know the speed of your web pages and make them better.
- https://tools.pingdom.com/ - Enter a URL to test the page load time, analyze it, and find bottlenecks.
- https://developers.google.com/speed/pagespeed/insights/ - PageSpeed Insights analyzes the content of a web page, then generates suggestions to make that page faster.
- https://gtmetrix.com/ - See how your site performs, reveal why it's slow and discover optimization opportunities.
- https://crux.run/ - Instantaneous Historical Chrome User Experience Reports
- https://github.com/Zizzamia/perfume.js - Web performance monitoring library which reports field data like FP/FCP, LCP, FID back to your favorite analytics tool.
- https://github.com/zachleat/performance-leaderboard - A plugin to run Lighthouse against a set of urls to see which site is the fastest.
- https://github.com/treosh/lighthouse-ci-action
- https://github.com/projectwallace/css-diff-action
- https://github.com/addyosmani/puppeteer-webperf
- https://github.com/patrickhulce/cuzillion
- https://pagespeed.compare/
- https://googlechrome.github.io/lighthouse-ci/viewer/
- https://github.com/cloudfour/lighthouse-parade - A Node.js command line tool that crawls a domain and gathers lighthouse performance data for every page.
- https://waterfaller.dev/ - Site Owners and marketers use Waterfaller to generate tasks for developers that boost page speed and Core Web Vital scores.
- https://www.browserstack.com/speedlab - SpeedLab scores your website on important performance metrics so you can optimize your page speed to deliver the best user experience.
- https://rviscomi.github.io/crux-dash-launcher/ - Launch directly into your own customized CrUX Dashboard
- https://lighthouse-metrics.com/ - Global performance insights, powered by Lighthouse
- https://github.com/bundlewatch/bundlewatchhttps://github.com/bundlewatch/bundlewatch
- https://wakamaifondue.com/beta/
- https://googlechrome.github.io/lighthouse/scorecalc/
- https://www.google.com/webmasters/tools/robots-testing-tool - Robots.txt validator
- https://quixdb.github.io/squash-benchmark/ - The Squash library is an abstraction layer for compression algorithms (good for benchmarks)
