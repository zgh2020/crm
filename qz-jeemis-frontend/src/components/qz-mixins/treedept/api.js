import request from '@/plugin/axios'

export function gettreeroot (id) {
  return request({
    url: '/api/dept/gettreeroot',
    method: 'get',
    params: {
      id
    }
  })
}

export function gettreechildren (pid) {
  return request({
    url: '/api/dept/gettreechildren',
    method: 'get',
    params: {
      pid
    }
  })
}
