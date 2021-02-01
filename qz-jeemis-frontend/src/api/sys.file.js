import request from '@/plugin/axios'
//  文件上传 下载
export function fileUpload (data, folder) {
  return request({
    url: '/file/upload2',
    method: 'post',
    data,
    params: {
      class: folder
    }
  })
}
