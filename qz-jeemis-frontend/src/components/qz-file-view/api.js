import request from '@/plugin/axios'
import qs from 'qs'
import util from '@/libs/util'

export function previewPdf (fileId, fileName) {
  return request({
    url: '/file/previewfile',
    method: 'post',
    responseType: 'blob',
    params: {
      fileId,
      fileName
    }
  })
}

export function previewZip (fileId) {
  return request({
    url: '/file/previewfile/zip',
    method: 'post',
    params: {
      fileId
    }
  })
}

export function onlyOfficeConfig (fileId) {
  return request({
    url: '/file/onlyoffice/config',
    method: 'post',
    params: {
      fileId
    }
  })
}

export function downloadUrl (id) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    fileId: id
  })
  const url = '/file/download'
  return `${window.SITE_CONFIG.apiURL}${url}?${params}`
}

export function downloadVideo (id) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    fileId: id
  })
  const url = '/file/video'
  return `${window.SITE_CONFIG.apiURL}${url}?${params}`
}

export function videoDecodeURL (fileId) {
  return request({
    url: '/file/voiddecode',
    method: 'post',
    params: {
      fileId
    }
  })
}
export function downloadVideoDecode (res) {
  const params = qs.stringify({
    token: util.cookies.get('token')
  })
  return `${window.SITE_CONFIG.apiURL}/${res}?${params}`
}
