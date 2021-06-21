# Sitespeed.io Local

## Running Sitespeed.io locally on Mac

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
    sitespeedio/sitespeed.io:17.8.1-plus1 \
    -e REPLAY=true \
    -e LATENCY=100 \
    -n 3 \
    -c 3gfast \
    --browser chrome \
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

## Running Sitespeed.io locally on Linux

```
--connectivity.engine=throttle \
```

```bash
# IFB is an alternative to tc filters for handling ingress traffic, by redirecting it to a virtual interface and treat is as egress traffic there.
# You need one ifb interface per physical interface, to redirect ingress traffic from eth0 to ifb0, eth1 to ifb1 and so on.
# When inserting the ifb module, tell it the number of virtual interfaces you need. The default is 2:
sudo modprobe ifb numifbs=1

docker run \
    --name sitespeed-local \
    --network=host \
    --cap-add=NET_ADMIN \
    --privileged \
    --shm-size=2g \
    --rm \
    -v "$(pwd):/sitespeed.io" \
    sitespeedio/sitespeed.io:17.8.1-plus1 \
    -e REPLAY=true \
    -e LATENCY=100 \
    -n 3 \
    -c 3gfast \
    --connectivity.engine=throttle \
    --browser chrome \
    --browsertime.viewPort 1920x1080 \
    --speedIndex \
    --visualElements \
    --video \
    --cpu \
    --axe.enable \
    --chrome.timeline \
    --thirdParty.cpu \
    --sustainable.enable \
    --crux.key=AIzaSyA3S1ySgmryewmBSvxvme7udpOTa6LoGHA \
    https://example.com
```