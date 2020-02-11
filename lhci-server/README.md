# Docker-based LHCI Server

## Overview

The LHCI server can be run in any node environment with persistent disk storage or network access to a postgres database. Docker can help encapsulate the server setup details for an instant custom server.

More info here: https://github.com/GoogleChrome/lighthouse-ci/tree/master/docs/recipes/docker-server

## How to use

```
$ lhci wizard
? Which wizard do you want to run? new-project
? What is the URL of your LHCI server? https://your-lhci-server.example.com/
? What would you like to name the project? My Favorite Project
? Where is the project's code hosted? https://github.com/GoogleChrome/lighthouse-ci

Created project My Favorite Project (XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX)!
Use token XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX to connect.
```

```shell
lhci autorun --upload.serverBaseUrl="http://localhost:9001" --upload.token="$LHCI_SERVER_TOKEN"
```

## TODO

- [ ] Better docs for this one
