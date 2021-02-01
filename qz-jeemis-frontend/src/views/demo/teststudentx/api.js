/**
 * 学生表2(TestStudentx)表API
 *
 * @author sdmq
 * @since 2019-11-07 10:50:56
 */

import util from '@/libs/util'
import qs from 'qs'
import request from '@/plugin/axios'

export function page (data) {
  return request({
    url: 'demo/teststudentx/page',
    method: 'post',
    data
  })
}

export function list () {
  return request({
    url: 'demo/teststudentx/list',
    method: 'get'
  })
}

export function info (id) {
  return request({
    url: `demo/teststudentx/${id}`,
    method: 'get'
  })
}

export function save (data, method) {
  return request({
    url: 'demo/teststudentx',
    method: method,
    data
  })
}

export function update (data) {
  return request({
    url: 'demo/teststudentx',
    method: 'put',
    data
  })
}

export function remove (data) {
  return request({
    url: 'demo/teststudentx',
    method: 'delete',
    data
  })
}

export function exportXls (data) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    ...data
  })
  const url = '/demo/teststudentx/export'
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
