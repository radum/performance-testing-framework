# How to setup WPT Agent on a local Raspberry Pi

> This runs the agent on Pi and the WPT Server using Docker locally.

## Install and run a WPT agent

1. Cd to your home folder `cd ~` and clone the agent repo

```bash
git clone --depth 1 --branch=release https://github.com/WPO-Foundation/wptagent.git
```

2. Install all requirementes:

All these lines are copied from:

- https://github.com/WPO-Foundation/wptagent/blob/release/ubuntu_install.sh
- https://github.com/WPO-Foundation/wptagent-install/blob/master/debian.sh

```bash
# All commands to install requirements from above.
# Make sure you install Chromium as Chrome for Pi arm64 is not available.
```

3. Run the agent

```bash
cd ~/wptagent
```

```sh
#!/bin/sh
export DEBIAN_FRONTEND=noninteractive
export DISPLAY=:1
Xorg -noreset +extension GLX +extension RANDR +extension RENDER -logfile /dev/null -config ./misc/xorg.conf :1 &
# These are the defaults from the WPT Server
# Change the IP with your WPT Server host one.
# WPT_DEVICE_NAME="Device" WPT_SERVER="192.168.0.150" WPT_LOCATION="Test" WPT_KEY="123456789"
python3 ~/wptagent/wptagent.py -vvvv --name "Device" --server "http://192.168.0.150/work/" --location "Test" --key "123456789"
```

## Run local WPT server

TODO steps

1. Clone WPT Server locally

```
git clone --depth 1 --branch=prod https://github.com/WPO-Foundation/webpagetest.git
```

2. Open `docker-compose.yml` file an comment out the agent section:

```
#### DOCKER WPTAGENT - comment this out to run a standalone agent ####
# agent:
#   cap_add: #### Allows traffic shapping
#     - NET_ADMIN
#   build:
#     context: .
#     dockerfile: docker/local/Dockerfile-wptagent
#   command: python3 wptagent.py -vvvv --xvfb --dockerized --server  http://web/work/ --location Test --key 123456789
#### ####
```

3. Run `docker compose up`

You can configure the local server using the `docker\local\*` settings file, for example to enable CrUX.

Set this `$experiments_paid` to true to enable them.

## Open WPT and start testing:

- http://192.168.0.150/install/ - Install check
- http://192.168.0.150/getTesters.php?f=html - See if the agent has connected
- http://192.168.0.150/ - WPT Server