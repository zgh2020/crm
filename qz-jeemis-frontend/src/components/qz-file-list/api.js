import util from '@/libs/util'
import qs from 'qs'
import request from '@/plugin/axios'

export function uploadUrl (folder) {
  const params = qs.stringify({
    token: util.cookies.get('token'),
    folder: folder
  })
  const url = '/file/upload2'
  return `${window.SITE_CONFIG.apiURL}${url}?${params}`
}
