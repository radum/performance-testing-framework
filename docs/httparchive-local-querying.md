# Querying the HTTP Archive with DuckDB

Query the HTTP Archive in Google BigQuery to create a new table:

Example:

```sql
SELECT
  resp_etag,
  COUNT(*) AS sum
FROM
  `httparchive.summary_requests.2023_02_01_mobile`
GROUP BY
  resp_etag
HAVING
  sum > 1
ORDER BY
  sum DESC
```

```shell
bq query --use_legacy_sql=false --destination_table lbrocard_bigquery.httparchive_summary_requests_2023_02_01_mobile_resp_etag < etags.sql
```

That makes a 1.04 GB table with 34,316,234 rows.

Extract the table as compressed Parquet format files in a Google Cloud Storage bucket:

```bash
bq extract --destination_format PARQUET --compression ZSTD 'lbrocard_bigquery.httparchive_summary_requests_2023_02_01_mobile_resp_etag' 'gs://radum-httparchive/httparchive.summary_requests.2023_02_01_mobile_resp_etag/*'
```

This creates 7 Parquet files, with a combined size of 528 MB.

Copy the files locally:

```shell
mkdir httparchive.summary_requests.2023_02_01_mobile_resp_etag
gsutil -m rsync gs://lbrocard-httparchive/httparchive.summary_requests.2023_02_01_mobile_resp_etag/ httparchive.summary_requests.2023_02_01_mobile_resp_etag
```

Then query the local files using the duckdb CLI with:

```shell
duckdb
D SELECT resp_etag, sum FROM read_parquet('httparchive.summary_requests.2023_02_01_mobile_resp_etag/*') WHERE regexp_matches(resp_etag, '(W/)?".*apple.*"$') ORDER BY sum DESC;
┌──────────────────────────────────────────────────────────────────────────────────────┬───────┐
│                                      resp_etag                                       │  sum  │
│                                       varchar                                        │ int64 │
├──────────────────────────────────────────────────────────────────────────────────────┼───────┤
│ "apple-touch-icon-07b519aab2aa41fafd5da3a6642a5d9c.png"                              │    12 │
│ "global/download/apple-62b449309f50b222e6e6f06e581eb66e.svg"                         │    10 │
│ "apple/apple-login-53408aea6fc94d03eab2e540df50c123.js"                              │     5 │
│ W/"static/media/icon-apple.74ca668ab1d7f2eafa5d.756fab2c07.svg"                      │     3 │
│ W/"favicons/apple-touch-icon-60x60-precomposed-a0e563e71bba6a64f81bda6bc7b0e313.png" │     2 │
│ "images/home-page/header/apple-6046f0c7c8a1fe157f8d5b5d1212a3f9.svg"                 │     2 │
└──────────────────────────────────────────────────────────────────────────────────────┴───────┘
```

Source: https://discuss.httparchive.org/t/querying-the-http-archive-with-duckdb/2568/1