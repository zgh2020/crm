/**
 * Created by qiangxl on 2019/5/16.
 */
import request from '@/plugin/axios'

/**
 * 获取树
 */
export function getModelTree () {
  return request({
    url: '/api/sys/model/getmodeltree',
    method: 'post'
  })
}
