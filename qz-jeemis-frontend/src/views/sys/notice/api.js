/**
 *通知公告
 */
import util from '@/libs/util'
import qs from 'qs'

import request from '@/plugin/axios'

export function page (data) {
  return request({
    url: '/sys/notice/page',
    method: 'get',
    params: data
  })
}

export function list () {
  return request({
    url: '/sys/notice/list',
    method: 'get'
  })
}

export function info (id) {
  return request({
    url: `/sys/notice/${id}`,
    method: 'get'
  })
}

export function save (data, method) {
  return request({
    url: '/sys/notice',
    method: method,
    data
  })
}

export function update (data) {
  return request({
    url: '/sys/notice',
    method: 'put',
    data
  })
}

export function remove (data) {
  return request({
    url: '/sys/notice',
    method: 'delete',
    data
  })
}

export function publishStart (data) {
  return request({
    url: '/sys/notice/publish',
    method: 'post',
    data
  })
}

export function publishStop (data) {
  return request({
    url: '/sys/notice/stop',
    method: 'post',
    data
  })
}

export function exportXls (data) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    ...data
  })
  const url = '/sys/notice/export'
  window.location.href = `${window.SITE_CONFIG.apiURL}${url}?${params}`
}

export function uploadUrl () {
  const params = qs.stringify({
    token: util.cookies.get('token')
  })
  const url = '/file/upload'
  return `${window.SITE_CONFIG.apiURL}${url}?${params}`
}

export function download (id) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    fileId: id
  })
  const url = '/file/download'
  window.location.href = `${window.SITE_CONFIG.apiURL}${url}?${params}`
}
