/**
 *
 */
import util from '@/libs/util'
import qs from 'qs'

import request from '@/plugin/axios'

export function page (data) {
  return request({
    url: '/sys/role/page',
    method: 'get',
    params: data
  })
}

export function list () {
  return request({
    url: '/sys/role/list',
    method: 'get'
  })
}

export function info (id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'get'
  })
}

export function save (data, method) {
  return request({
    url: '/sys/role',
    method: method,
    data
  })
}

export function update (data) {
  return request({
    url: '/sys/role',
    method: 'put',
    data
  })
}

export function remove (data) {
  return request({
    url: '/sys/role',
    method: 'delete',
    data
  })
}

export function exportXls (data) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    ...data
  })
  const url = '/sys/role/export'
  window.location.href = `${window.SITE_CONFIG.apiURL}${url}?${params}`
}
