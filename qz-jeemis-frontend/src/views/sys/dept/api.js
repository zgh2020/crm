/**
 *
 */
import request from '@/plugin/axios'

export function getList (pId) {
  return request({
    url: '/api/sys/dept/list',
    method: 'get',
    params: {
      pId
    }
  })
}

export function getInfo (pkId) {
  return request({
    url: '/api/sys/dept/get',
    method: 'get',
    params: {
      pkId
    }
  })
}

export function saveInfo (data) {
  return request({
    url: '/api/sys/dept/save',
    method: 'post',
    data
  })
}

export function delInfo (pkId) {
  return request({
    url: '/api/sys/dept/delete',
    method: 'post',
    params: {
      pkId
    }
  })
}

export function sortInfo (pkId1, pkId2) {
  return request({
    url: '/api/sys/dept/sort',
    method: 'post',
    params: {
      pkId1, pkId2
    }
  })
}

export function getSimplePinYin (hanZi) {
  return request({
    url: 'api/common/pinyin/getsimple',
    method: 'post',
    params: {
      hanZi
    }
  })
}
