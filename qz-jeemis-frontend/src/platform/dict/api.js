/**
 * Created by 张强 on 2019/5/16.
 */
import request from '@/plugin/axios'

export function getCodeTreeRoots () {
  return request({
    url: '/api/sys/code/getcodetreeroots',
    method: 'get'
  })
}

export function getCodeTreeNodes (codeId, code) {
  return request({
    url: '/api/sys/code/getcodetreenodes',
    method: 'get',
    params: {
      codeId,
      code
    }
  })
}

export function getCodeTableList (codeId, code, searchDesc) {
  return request({
    url: '/api/sys/code/getcodetablelist',
    method: 'get',
    params: {
      codeId, code, searchDesc
    }
  })
}

export function saveCodeCollect (data) {
  return request({
    url: '/api/sys/code/savecodecollect',
    method: 'post',
    data
  })
}

export function saveCodeItem (data) {
  return request({
    url: '/api/sys/code/savecodeitem',
    method: 'post',
    data

  })
}

export function getSysCodeItem (pkId) {
  return request({
    url: '/api/sys/code/getsyscodeitem',
    method: 'get',
    params: {
      pkId
    }
  })
}

export function getNewSysCodeItem (codeId, pptr) {
  return request({
    url: '/api/sys/code/getnewsyscodeitem',
    method: 'get',
    params: {
      codeId,
      pptr
    }
  })
}

export function getSysCodeCollect (codeId) {
  return request({
    url: '/api/sys/code/getsyscodecollect',
    method: 'get',
    params: {
      codeId
    }
  })
}

export function deleteSysCodeItem (pkId) {
  return request({
    url: '/api/sys/code/deletesyscodeitem',
    method: 'post',
    params: {
      pkId
    }

  })
}

export function deleteSysCodeCollect (codeId) {
  return request({
    url: '/api/sys/code/deletesyscodecollect',
    method: 'post',
    params: {
      codeId
    }

  })
}

export function saveSysCodeItemOrder (pkId1, pkId2) {
  return request({
    url: '/api/sys/code/savesyscodeitemorder',
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
