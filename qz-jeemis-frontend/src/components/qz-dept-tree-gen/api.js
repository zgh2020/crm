import request from '@/plugin/axios'
export function getTreeRoot (id) {
  return request({
    url: '/api/sys/dept/tree/getroot',
    method: 'post',
    params: {
      id
    }
  })
}

export function getTreeChildren (pid) {
  return request({
    url: '/api/sys/dept/tree/getchildren',
    method: 'post',
    params: {
      pid
    }
  })
}

export function getDeptNodePids (id) {
  return request({
    url: '/api/sys/dept/tree/getdeptpids',
    method: 'post',
    params: {
      id
    }
  })
}
