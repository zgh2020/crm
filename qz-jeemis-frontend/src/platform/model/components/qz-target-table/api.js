/**
 * Created by qiangxl on 2019/5/16.
 */
import request from '@/plugin/axios'

export function getItemList (setId) {
  return request({
    url: '/api/sys/model/getmodelitemlist',
    method: 'post',
    params: { setId }
  })
}
