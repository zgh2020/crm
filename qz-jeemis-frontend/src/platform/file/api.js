/**
 *
 */
import util from '@/libs/util'
import qs from 'qs'

import request from '@/plugin/axios'

export function page (data) {
  return request({
    url: '/file/page',
    method: 'get',
    params: data
  })
}

//  文件上传
export function fileUpload (data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data
  })
}
export function download (id) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    fileId: id
  })
  const url = '/file/download'
  window.location.href = `${window.SITE_CONFIG.apiURL}${url}?${params}`
}

export function del (data) {
  return request({
    url: '/file/delete',
    method: 'post',
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
