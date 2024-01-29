# How to setup WPT Agent on a local Ubuntu VM

## Install on Ubuntu Live Server 18.04 LTS in a VM

> 20.04 LTS didn't work for me, the agent failed to register although the install was ok.

### Install dependencies

```bash
# Install Homebrew (useful to install various tools)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# The WPT Agent will fail to install if this is not done first
sudo apt -y install xserver-xorg-core xserver-xorg-video-dummy
```

### Install WPT server

```bash
WPT_BRANCH="prod" bash <(curl -s https://raw.githubusercontent.com/catchpoint/WebPageTest.server-install/master/ubuntu.sh)
```

Once that is finish you will get this message:

```
The locations need to be configured manually in /var/www/webpagetest/www/settings/locations.ini
The settings can be tweaked in /var/www/webpagetest/www/settings/settings.ini

The location key to use when configuring agents is: 14PnLufSWNTUnJnwoyzcyiUvnp2AONY4
An API key to use for automated testing is: AcbrZOCDJMIZBNDU7NHlvzAviVJhYjMO
```

Once this goes OK you can open the IP addresss of the location and WPT will load.

### Install WPT agent

```bash
WPT_DEVICE_NAME="Local Server" WPT_SERVER="192.168.0.150:4000" WPT_LOCATION="Local_Ubuntu" WPT_KEY="location_key_1" DISABLE_IPV6=y WPT_EDGE=n WPT_BRAVE=n WPT_EPIPHANY=n WPT_BRANCH="master" bash <(curl -s https://raw.githubusercontent.com/catchpoint/WebPageTest.agent-install/master/debian.sh)

# Android
WPT_DEVICE_NAME="Pixel 2XL" WPT_SERVER="192.168.0.150:4000" WPT_LOCATION="Local_Ubuntu_Android" WPT_KEY="location_key_1" AGENT_MODE=android DISABLE_IPV6=y WPT_EDGE=n WPT_BRAVE=n WPT_EPIPHANY=n bash <(curl -s https://raw.githubusercontent.com/catchpoint/WebPageTest.agent-install/master/debian.sh)
```

> Replace the `WPT_SERVER` IP with your current local IP address, or the server address.

**Android reverse tethering**

Follow the instrcutions [here](https://github.com/Genymobile/gnirehtet) to instal gnirehtet on the server and on the device.

Run gnirehtet and then the device will use the servers connection

```bash
gnirehtet run
```

> TODO: For now running the above makes the agent not to run the device anymore. Let the test start and right away run gnirehtet again and that will fix the issue.

## Run WPT server locally

```bash
docker-compose -f docker-compose.yml -f docker-compose-macos.yml up wpt_server
```

**Open the local WPT server and start testing**

```
http://localhost:4000/
http://192.168.0.150:4000/
```

**Install mkcert and set the same CA as your local**

To test local dev servers via https you can use mkcert to setup a CA locally, and using the same `rootCA.pem` install it on the linux VM.

> Run at least a test from the previous steps. This is important to be able to update the CA stores for the browsers.

1. Install mkcert - https://github.com/FiloSottile/mkcert
2. Follow mkcert install for other systems - https://github.com/FiloSottile/mkcert#installing-the-ca-on-other-systems
3. Edit `/etc/hosts` on the VM to point your local dev URL to your host IP, Ex: `192.168.0.150 local.dev`

Run tests via `https://local.dev`.

Add to any PHP file to show errors:

```php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
```

## Run on Ubuntu desktop using docker in a VM

```
sudo modprobe ifb numifbs=1
sudo docker run -d \
  -e SERVER_URL="http://192.168.0.150:4000/work/" \
  -e LOCATION="Local_Ubuntu" \
  -e KEY="location_key_1" \
  -e NAME="Local Ubuntu Desktop" \
  --cap-add=NET_ADMIN \
  --net=host \
  --init \
  webpagetest/agent:latest
```

### To access local dev env via https [TODO]

> SSL NOT WORKING IN THE CONTAINER YET

- https://runnable.com/docker/basic-docker-networking (How to use --net=host and why)

```
# Clone wptagent repo https://github.com/WPO-Foundation/wptagent

# Comment Opera in the Docker files
#  opera-stable \
#  opera-beta \
#  opera-developer \

# Add the following to Dockerfile
# COPY radu/rootCA.pem /mkcert/rootCA.pem
# # Don't forget to `chmod +x radu/mkcert` before you copy here
# COPY radu/mkcert /mkcert/mkcert
# # https://github.com/FiloSottile/mkcert/issues/219
# RUN mkdir -p $HOME/.pki/nssdb
# RUN certutil -d sql:$HOME/.pki/nssdb -N --empty-password
# ENV CAROOT=/mkcert/
# RUN /mkcert/mkcert -install

sudo docker build --tag wptagent .
sudo modprobe ifb numifbs=1
sudo docker run -d --init \
  -e SERVER_URL="http://192.168.0.150:4000/work/" \
  -e LOCATION="Local_Ubuntu" \
  -e KEY="location_key_1" \
  -e NAME="Local Ubuntu Desktop" \
  --cap-add=NET_ADMIN \
  --net=host \
  --init \
  wptagent
```