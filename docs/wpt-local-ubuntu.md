# How to setup WPT Agent on a local Ubuntu VM

Install Ubuntu Live Server 18.04 LTS or 20.04 LTS in a VM.

Install dependencies:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

sudo apt -y install xserver-xorg-core xserver-xorg-video-dummy
```

Install WPT agent:

```bash
WPT_SERVER="192.168.0.161:4000/" WPT_LOCATION="Local_Ubuntu" WPT_KEY="location_key_1" DISABLE_IPV6=y WPT_EDGE=n WPT_BRAVE=n WPT_EPIPHANY=n bash <(curl -s https://raw.githubusercontent.com/WPO-Foundation/wptagent-install/master/debian.sh)
```

> Replace the `WPT_SERVER` IP with your current local IP address, or the server address.

Run WPT server locally

```bash
docker-compose -f docker-compose.yml -f docker-compose-macos.yml up wpt_server
```

Open the local WPT server:

```
http://localhost:4000/
http://192.168.0.161:4000/
```