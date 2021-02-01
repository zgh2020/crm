import request from '@/plugin/axios'

export function getcodedescription (codeid, code) {
  return request({
    url: '/api/sys/code/getcodedescription',
    method: 'get',
    params: {
      codeid,
      code
    }
  })
}
