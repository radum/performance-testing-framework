# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2020-03-20
### Added
- Bump all dependecies to latest versions
- Added K6 load testing containers and Jenkins task

## [1.0.0] - 2020-02-11
### Added
- LHCI Server and client containers
- Jenkins node plugin
- Jenkins LHCI server pipeline
- Docker compose to Jenkins container
- Fix Jenkins sudo requirements

### Changed
- Some containers need to restart unless stopped

### Removed
- N\A

## [0.0.0] - 2020-02-06
### Initial version
- Added docker containers for Jenkins, sitepseed.io, WebPageTest, Grafana, Graphite
- The initial pipelines for testing FE jobs
