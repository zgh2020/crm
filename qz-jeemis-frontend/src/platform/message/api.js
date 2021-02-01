/**
 * 站内发信(SysMessageSend)表API
 *
 * @author sdmq
 * @since 2019-11-13 17:14:51
 */

import util from '@/libs/util'
import qs from 'qs'
import request from '@/plugin/axios'

export function folder () {
  return request({
    url: 'platform/message/folder',
    method: 'post'
  })
}
export function page (data) {
  return request({
    url: 'platform/message/page',
    method: 'post',
    data
  })
}

export function list () {
  return request({
    url: 'platform/message/list',
    method: 'get'
  })
}

export function info (id) {
  return request({
    url: `platform/message/${id}`,
    method: 'get'
  })
}

export function view (id) {
  return request({
    url: `platform/message/view/${id}`,
    method: 'post'
  })
}

export function save (data, method) {
  return request({
    url: 'platform/message',
    method: method,
    data
  })
}
export function saveDrafts (data) {
  return request({
    url: 'platform/message/save_drafts',
    method: 'post',
    data
  })
}

export function updateImportant (id) {
  return request({
    url: 'platform/message/update_important',
    method: 'post',
    params: {
      id
    }
  })
}
export function update (data) {
  return request({
    url: 'message/sysmessagesend',
    method: 'put',
    data
  })
}

export function recycle (data) {
  return request({
    url: 'platform/message/recycle',
    method: 'post',
    data
  })
}

export function clearRecycle () {
  return request({
    url: 'platform/message/clear_recycle',
    method: 'post'
  })
}

export function restoreRecycle (data) {
  return request({
    url: 'platform/message/restore_recycle',
    method: 'post',
    data
  })
}

export function readAll (folder) {
  return request({
    url: 'platform/message/read_all',
    method: 'post',
    params: {
      folder
    }
  })
}

export function revokeMessage (data) {
  return request({
    url: 'platform/message/revoke',
    method: 'post',
    data
  })
}

export function remove (data) {
  return request({
    url: 'platform/message',
    method: 'delete',
    data
  })
}

export function exportXls (data) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    ...data
  })
  const url = '/message/sysmessagesend/export'
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

export function uploadUrl () {
  const params = qs.stringify({
    token: util.cookies.get('token')
  })
  const url = '/file/upload'
  return `${window.SITE_CONFIG.apiURL}${url}?${params}`
}
