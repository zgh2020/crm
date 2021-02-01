import request from '@/plugin/axios'
export function gettreeroot (id, non, dim) {
  return request({
    url: '/api/dept/gettreeroot',
    method: 'get',
    params: {
      id,
      non,
      dim
    }
  })
}

export function gettreechildren (pid, dim) {
  return request({
    url: '/api/dept/gettreechildren',
    method: 'get',
    params: {
      pid,
      dim
    }
  })
}

export function getDeptNodePptrs (b0110) {
  return request({
    url: '/api/dept/getdeptnodepptrs',
    method: 'get',
    params: {
      b0110
    }
  })
}
