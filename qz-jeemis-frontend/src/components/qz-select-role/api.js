import request from '@/plugin/axios'

export function list () {
  return request({
    url: '/sys/role/list',
    method: 'get'
  })
}
