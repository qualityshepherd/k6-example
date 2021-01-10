import http from 'k6/http'
import { check } from 'k6'
import { Rate } from 'k6/metrics'

// code outside default is `init` code and run once per VU

// pass options via cli or...
export let options = {
  vus: 1, // 1 user looping for n seconds
  duration: '20s',

  thresholds: {
    http_req_duration: ['p(99)<500'], // 99% of requests must complete below 500ms
  },
}

export let errorRate = new Rate('errors')

// k6 requires a default function which is what the VUs loop over
export default function () {
  const url = 'https://qualityshepherd.com'
  let res = http.batch([
    ['GET', `${url}`, null, { tags: { ctype: 'root' } }],
    ['GET', `${url}/#tags?t=blather`, null, { tags: { ctype: 'tag' } }],
    ['GET', `${url}/#search?q=test`, null, { tags: { ctype: 'search' } }],
    ['GET', `${url}/#about`, null, { tags: { ctype: 'page' } }]
  ])

  check(res[0], { 'status was 200': (r) => r.status === 200 })
  errorRate.add(!res)
}