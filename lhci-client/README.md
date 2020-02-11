# Docker-based LHCI Client

Mostly inspired by this https://github.com/GoogleChrome/lighthouse-ci/tree/master/docs/recipes/docker-client

## Overview

The LHCI client can be run in any environment where Docker is available but root access to install dependencies is not.

**Due to the nature of performance measurement and volatility of container-based resources in cloud environments, we strongly advise against using this Docker image when you have the ability to install Chrome directly.**

## Running Locally

```shell
# Explanation of the command below
# 1. Run the container with SYS_ADMIN privileges so Chrome can sandbox processes (read more bellow)
# 2. Mount a local directory to the .lighthouseci folder so we can persist reports
# 3. Run the prepublished LHCI client docker image
# 4. Run your LHCI command
docker container run --cap-add=SYS_ADMIN \
  -v "$(pwd)/reports/lhci-client:/home/lhci/reports/.lighthouseci" \
  lhci-client \
  lhci collect --url="https://example.com"
```

## --no-sandbox Issues Explained

Chrome uses sandboxing to isolate renderer processes and restrict their capabilities. If a rouge website is able to discover a browser vulnerability and break out of JavaScript engine for example, they would find themselves in a very limited process that can't write to the filesystem, make network requests, mess with devices, etc.

Getting Chrome to run in CI and uncommon linux environments can frequently fail due to sandbox issues that present themselves in two common forms.

## TODO

- [ ] Add docker-compose run, using the currrent service available in the compose file.
