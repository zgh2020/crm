import request from '@/plugin/axios'

export function getlist () {
  return request({
    url: '/api/gethomenotice',
    method: 'get'
  })
}

export function getinfo () {
  return request({
    url: '/api/gethomenotice',
    method: 'get'
  })
}
