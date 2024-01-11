# WebPagetest Scripting examples

```
// Custom User Agent: allowlist WPT traffic, trigger UA-dependent variant etc.
setUserAgent Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0000.00 Mobile Safari/537.36

# // Authorize WPT to pass DDOS defense or similar auth mechanisms
# setHeader your-auth-key: your-auth-secret

# // Clean Baseline Efforts: pre-resolve DNS to avoid DNS perf fluctuations
# setDnsName %HOST% %HOSTR%

# // Clean Baseline Efforts: manually block 3rdParties, no 'blockDomainsExcept' allowlisting
# blockDomains www.googletagmanager.com doubleclick.net cdn.cookie law.org

# // Appr. viewport of DPR2 WQHD+ laptop screen
# setViewportSize 1276 684

# // Actually navigate to the desired page for testing
# navigate %URL%

# // Log stuff
# exec console.log(window.yourObject)
# exec performance.mark('yourMark')
```