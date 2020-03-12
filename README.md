# Performance testing framework

This framework could be used for frontend load testing with sitespeed.io (with lighthouse) and webpagetest private instance.


## Getting Started

Framework consists of next services:

- **Jenkins**: continuous integration server for tests execution
- **Sitespeed.io**: set of tools for frontend load testing
- **Webpagetest**: private instance of webpagetest server for frontend tests execution
- **K6**: tool for backend load testing
- **Grafana**: data visualization & monitoring
- **Graphite**: time series DB platform for metrics
- **InfluxDB**: time series DB optimized for fast storage and retrieval of time series data

Not yet implemented:

- **Portainer**: service for managing docker environment
- **K6 Grafana dashboard**:  The default Grafaba dashboard for K6 for now needs to be [added manually](https://k6.io/docs/results-visualization/influxdb-+-grafana)

## Framework architecture:

![](docs/img/framework-architecture.png)

## Prerequisites

To run framework install docker: https://docs.docker.com/engine/installation/.

You should be able to run ```docker run hello-world``` with no errors.

## Installing

1. Clone this repository
```git clone https://github.com/serputko/performance-testing-framework.git```
2. open performance-testing-framework dir

## How to run

1. (optional) if you want to update existing services

```shell
docker-compose pull
docker-compose build
docker-compose down
```

2. Run docker services

**On Linux Server**

```shell
sudo modprobe ifb numifbs=1
docker-compose up
```

**On Mac OS / PC**

**Mac OS does not support network shaping.**

```shell
docker-compose -f docker-compose.yml -f docker-compose-macos.yml up
```

Native Connection (No Traffic Shaping) will have to be used in order to work as there is no traffic shaping enabled.

All containers should be up and running

### Services endpoints

- **jenkins** localhost:8181
- **LHCI** localhost:9001
- **webpagetest server** localhost:4000
- **grafana** localhost:3000
- **portainer** localhost:9000

### How to stop

```shell
docker-compose down
```

## Jenkins

Login to Jenkins with admin/admin (could be changed in docker-compose file)

![](docs/img/jenkins-dashboard.png)
*(BlueOcean plugin is also available)*

By default jenkins consists of 2 jobs:

- **FrontendJob**: run tests with sitespeed.io and webpagetest private instance
- **BackendJob**: run Jmeter scenarios (NOT YET IMPLEMENTED)

### Frontend Job

To run frontend test: **Open FrontendJob -> Build with Parameters -> Set build parameters -> Build**

![](docs/img/jenkins_frontendjob_run.png)

This job will start `sitespeed.io plus1` docker container and run test with parameters using the WebPageTest private instance.

Frontend test deliverables:

- **sitespeed.io HTML report**

![](docs/img/jenkins_frontendjob_sitespeed_html_report.png)

- **webpagetest HTML report**

![](docs/img/jenkins_frontendjob_webpagetest_html_report.png)

### LHCI Job

To run Lighthouse CI test: **Open LighthouseCI -> Build with Parameters -> Set build parameters -> Build**

This job will start `lhci-client` docker container and run test with parameters using Lighthouse, pushing the results to the LHCI server running on http://localhost:9001.

![](docs/img/lhci-report.png)

### K6 Job

K6 is a modern load testing tool, using Go and JavaScript. This job will start `k6` into a docker container and will use the provided script from `k6/scripts` folder.

To run K6 Load testing create a [loading script](https://k6.io/docs/using-k6/http-requests) in the `k6/scripts` folder and then **Open K6 Load testing -> Build with Parameters -> Set build parameters -> Build**.

The results will be saved on the associated k6 reports folder and also pushed to the InfluxDB running locally.

![](docs/img/grafana-dashboard-k6-example.png)

## Grafana

### Available metrics

Ready-made dashboards are inserted with a Docker container using curl. You can check out the container with the dashboards here: https://github.com/sitespeedio/grafana-bootstrap-docker

The [Sitespeed.io](https://www.sitespeed.io/documentation/sitespeed.io/performance-dashboard/) team worked hard to make them and the great thing is that you can use them as base dashboards, then create additional dashboards if you like.

![](docs/img/grafana-dashboard-example.mp4)
![](docs/img/grafana-dashboard-example.png)

## Useful Docker commands

```
docker-compose build --pull --force-rm --no-cache
docker-compose -f docker-compose.yml -f docker-compose-macos.yml up lhci-server
```

## TODO

- [ ] Add K6 Grafaba dashboard - https://k6.io/docs/results-visualization/influxdb-+-grafana
- [ ] Run containers from Jenkins via docker-compose or at leaset the built ones
- [ ] Test runs comparison
- [x] Add JMeter or Gantling load testing (UPDATE: Went with K6 as it is very fast and uses less memory.)
- [ ] Better docs to explain how it should be run
- [ ] More docs around architecture and how it works
- [ ] Explain how to test localhost using extra_hosts for wpt-agent
- [ ] jenkins-cli.jar should already be part of `/var/jenkins_home/war/WEB-INF/jenkins-cli.jar` but when I build it, it was not so I had to manually copy it.

## Other examples

- Anton Serputko perf testing framework (from which this one was inspired) - https://github.com/serputko/performance-testing-framework
- Garie - https://garie.netlify.com/
- OpenSpeedMonitor - https://github.com/iteratec/OpenSpeedMonitor
