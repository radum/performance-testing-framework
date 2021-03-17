# Sitespeed.io Local

Running Sitespeed.io locally

```bash
throttle 3gfast

docker run \
    --name sitespeed-local \
    --network=host \
    --cap-add=NET_ADMIN \
    --privileged \
    --shm-size=2g \
    --rm \
    -v "$(pwd):/sitespeed.io" \
    sitespeedio/sitespeed.io:16.10.0-plus1 \
    -e REPLAY=true \
    -e LATENCY=100 \
    -n 3 \
    -c 3gfast \
    -b chrome \
    --browsertime.viewPort 1920x1080 \
    --speedIndex \
    --visualElements \
    --video \
    --cpu \
    --axe.enable \
    --chrome.timeline \
    --thirdParty.cpu \
    --sustainable.enable \
    https://example.com

throttle stop
```
