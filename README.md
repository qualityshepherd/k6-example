[![Codeship Status for qualityshepherd/k6-example](https://app.codeship.com/projects/751d70b1-0ddd-472e-adad-61b0ca94c77b/status?branch=main)](https://app.codeship.com/projects/423515)

# K6 Example
> Load/performance testing examples using [K6](https://k6.io/)

## Install
> assumes [git](https://git-scm.com/downloads) and [node](https://nodejs.org/en/)...
1. [install k6 on your machine](https://k6.io/docs/getting-started/installation)

## Run Tests
> NOTE: please do not _thank me_ by running these tests and killing my server :) Change the `url` in the tests to a server you own, or use [k6's](http://test.k6.io/)
1. run 'em all: `npm test`
1. run smoke test: `npm run smoke`
1. run them manually: `k6 run smokeTest.js`
1. [understand results](https://k6.io/docs/using-k6/metrics#built-in-metrics)


## Run on CI
1. install k6
  ```
  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61
  echo "deb https://dl.bintray.com/loadimpact/deb stable main" | sudo tee -a /etc/apt/sources.list
  sudo apt-get update
  sudo apt-get install k6
  ```
1. run tests: `npm test`

```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io
  ```