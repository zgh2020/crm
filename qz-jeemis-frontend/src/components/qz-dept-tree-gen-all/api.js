import request from '@/plugin/axios'
export function getTreeAll (id) {
  return request({
    url: '/api/sys/dept/tree/gettreeall',
    method: 'post',
    params: {
      id
    }
  })
}
