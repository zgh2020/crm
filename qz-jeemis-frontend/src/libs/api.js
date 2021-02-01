/**
 *
 */
import request from '@/plugin/axios'
export function getSimplePinYin (hanZi) {
  return request({
    url: 'api/common/pinyin/getsimple',
    method: 'post',
    params: {
      hanZi
    }
  })
}

export function sendCustomMessage (content, to) {
  return request({
    url: 'chat/sendtouser',
    method: 'post',
    params: {
      content,
      to
    }
  })
}
