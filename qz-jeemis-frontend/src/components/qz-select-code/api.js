import request from '@/plugin/axios'

export function getcodelistAll (codeid) {
  return request({
    url: '/api/sys/code/getcodelistall',
    method: 'get',
    params: {
      codeid
    }
  })
}

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
