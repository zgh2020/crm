/**
 *
 */
import request from '@/plugin/axios'
import qs from 'qs'

//  文件上传
export function fileUpload (data) {
  return request({
    url: '/file/public/upload',
    method: 'post',
    data
  })
}

export function getImageUrl (id) {
  const params = qs.stringify({
    fileId: id
  })
  const url = '/public/file/download'
  return `${window.SITE_CONFIG.apiURL}${url}?${params}`
}

export function getVideoUrl (id) {
  const params = qs.stringify({
    fileId: id
  })
  const url = '/public/file/video'
  return `${window.SITE_CONFIG.apiURL}${url}?${params}`
}
