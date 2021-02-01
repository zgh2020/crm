/**
 * 学生表(TestStudent)表API
 *
 * @author sdmq
 * @since 2019-10-09 13:39:16
 */

import util from '@/libs/util'
import qs from 'qs'
import request from '@/plugin/axios'

export function page (data) {
  return request({
    url: 'demo/teststudent/page',
    method: 'post',
    data
  })
}

export function list () {
  return request({
    url: 'demo/teststudent/list',
    method: 'get'
  })
}

export function info (id) {
  return request({
    url: `demo/teststudent/${id}`,
    method: 'get'
  })
}

export function save (data, method) {
  return request({
    url: 'demo/teststudent',
    method: method,
    data
  })
}

export function update (data) {
  return request({
    url: 'demo/teststudent',
    method: 'put',
    data
  })
}

export function remove (data) {
  return request({
    url: 'demo/teststudent',
    method: 'delete',
    data
  })
}

export function exportXls (data) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    ...data
  })
  const url = '/demo/teststudent/export'
  window.location.href = `${window.SITE_CONFIG.apiURL}${url}?${params}`
}

export function download (id) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    fileId: id
  })
  const url = '/file/download'
  window.location.href = `${window.SITE_CONFIG.apiURL}${url}?${params}`
}
