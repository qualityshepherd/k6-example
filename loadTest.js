import http from 'k6/http'
import { sleep, check } from 'k6'
import { Rate } from 'k6/metrics'

export let options = {
  stages: [
    { duration: '10s', target: 20 }, // simulates ramping up traffic from 1 to 10 users over 10s
    { duration: '10s', target: 50 }, // stay at 20 users for 10 seconds
    { duration: '5s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<500'] // 99% of requests must complete below 500ms
  }
}

export let errorRate = new Rate('errors')

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