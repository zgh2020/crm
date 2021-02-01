/**
 * 云盘id0是个系统目录(SysCloudDisk)表API
 *
 * @author sdmq
 * @since 2019-10-08 19:35:12
 */

import util from '@/libs/util'
import qs from 'qs'
import request from '@/plugin/axios'

export function tree () {
  return request({
    url: 'platform/clouddisk/tree',
    method: 'get'
  })
}

export function page (data) {
  return request({
    url: 'platform/clouddisk/page',
    method: 'post',
    data
  })
}

export function list () {
  return request({
    url: 'platform/clouddisk/list',
    method: 'get'
  })
}

export function info (id) {
  return request({
    url: `platform/clouddisk/${id}`,
    method: 'get'
  })
}

export function save (data, method) {
  return request({
    url: 'platform/clouddisk',
    method: method,
    data
  })
}

export function update (data) {
  return request({
    url: 'platform/clouddisk',
    method: 'put',
    data
  })
}

export function remove (data) {
  return request({
    url: 'platform/clouddisk',
    method: 'delete',
    data
  })
}

export function exportXls (data) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    ...data
  })
  const url = '/platform/clouddisk/export'
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

export function uploadUrl (folder) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    folder: folder
  })
  const url = '/file/upload2'
  return `${window.SITE_CONFIG.apiURL}${url}?${params}`
}

export function saveFile (data) {
  return request({
    url: 'platform/clouddisk/savefile',
    method: 'post',
    data
  })
}

export function copyFile (data) {
  return request({
    url: 'platform/clouddisk/copyfile',
    method: 'post',
    data
  })
}
