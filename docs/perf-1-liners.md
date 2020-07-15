# Performance 1 liners

## cURL

### Find the Time to First Byte Using Curl

```bash
curl -w "Connect time: %{time_connect} Time to first byte: %{time_starttransfer} Total time: %{time_total} \n" -o /dev/null [url to test]

# Connect time: 0.402 Time to first byte: 0.453 Total time: 0.475
```

or

curl-format.txt
```
time_namelookup: %{time_namelookup}
time_connect: %{time_connect}
time_appconnect: %{time_appconnect}
time_pretransfer: %{time_pretransfer}
time_redirect: %{time_redirect}
time_starttransfer: %{time_starttransfer}
———
time_total: %{time_total}
```

```bash
curl -w "@curl-format.txt" -o /dev/null -s [url to test]
```

What this does:

* -w "@curl-format.txt" tells cURL to use our format file
* -o /dev/null redirects the output of the request to /dev/null (-o NUL for Windows)
* -s tells cURL not to show a progress meter
* [url to test] is the URL we are requesting

And here is what you get back:

```
time_namelookup: 0.001
time_connect: 0.037
time_appconnect: 0.000
time_pretransfer: 0.037
time_redirect: 0.000
time_starttransfer: 0.092
———
time_total: 0.164
```

This will get time to first byte, which is the time_starttransfer line.

The other timing details include DNS lookup, TCP connect, pre-transfer negotiations, redirects (in this case there were none), and of course the total time.
