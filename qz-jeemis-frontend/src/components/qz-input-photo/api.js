import request from '@/plugin/axios'
//  照片上传
export function fileUpload1 (data) {
  return request({
    url: '/file/upload2',
    method: 'post',
    data,
    params: {
      class: '照片'
    }
  })
}

export function getFileName () {
  return request({
    url: '/file/getfilename',
    method: 'post'
  })
}

export function fileUpload (data, fileid) {
  return request({
    url: '/file/upload3',
    method: 'post',
    data,
    params: {
      fileid: fileid,
      class: '照片'
    }
  })
}
