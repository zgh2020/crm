import request from '@/plugin/axios'

export function getcodelist (codeid, pptr) {
  return request({
    url: '/api/sys/code/getcodelist',
    method: 'get',
    params: {
      codeid,
      pptr
    }
  })
}

export function getcodequerylist (codeid, keys, currpage, pagesize) {
  return request({
    url: '/api/sys/code/getcodequerylist',
    method: 'get',
    params: {
      codeid,
      keys,
      currpage,
      pagesize
    }
  })
}

export function getcodecollectinfo (codeid) {
  return request({
    url: '/api/sys/code/getcodecollect',
    method: 'get',
    params: {
      codeid
    }
  })
}

export function getcodepptrs (codeid, code) {
  return request({
    url: '/api/sys/code/getcodepptrs',
    method: 'get',
    params: {
      codeid,
      code
    }
  })
}

export function savecoderecent (codeid, code) {
  return request({
    url: '/api/sys/code/savecoderecent',
    method: 'post',
    params: {
      codeid,
      code
    }
  })
}

export function getcoderecentList (codeid) {
  return request({
    url: '/api/sys/code/getcoderecentlist',
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
