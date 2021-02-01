/**
 * word excel 模板表(SysFileTemplate)表API
 *
 * @author sdmq
 * @since 2019-10-06 18:39:05
 */

import util from '@/libs/util'
import qs from 'qs'
import request from '@/plugin/axios'

export function page (data) {
  return request({
    url: 'platform/office/template/page',
    method: 'post',
    data
  })
}

export function list () {
  return request({
    url: 'platform/office/template/list',
    method: 'get'
  })
}

export function info (id) {
  return request({
    url: `platform/office/template/${id}`,
    method: 'get'
  })
}

export function save (data, method) {
  return request({
    url: 'platform/office/template',
    method: method,
    data
  })
}

export function update (data) {
  return request({
    url: 'platform/office/template',
    method: 'put',
    data
  })
}

export function remove (data) {
  return request({
    url: 'platform/office/template',
    method: 'delete',
    data
  })
}

export function exportXls (data) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    ...data
  })
  const url = '/platform/office/template/export'
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
