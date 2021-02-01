/**
 * Created by zhangl on 2019/5/16.
 */
import request from '@/plugin/axios'

/**
 * 校验指标集名称是否重复
 * @param setId
 */
export function checkModelSet (setId, id) {
  return request({
    url: '/api/sys/model/checkmodelset',
    method: 'post',
    params: {
      setId, id
    }
  })
}

/**
 * 校验指标项名称是否重复
 * @param data
 */
export function checkModelItem (data) {
  return request({
    url: '/api/sys/model/checkmodelitem',
    method: 'post',
    data
  })
}

/**
 * 保存指标集
 * @param data
 */
export function saveModelSet (data) {
  return request({
    url: '/api/sys/model/savemodelset',
    method: 'post',
    data
  })
}

/**
 * 保存指标项
 * @param data
 */
export function saveModelItem (data) {
  return request({
    url: '/api/sys/model/savemodelitem',
    method: 'post',
    data
  })
}

/**
 * 获取当前指标集信息
 * @param setId
 */
export function getModelSet (setId) {
  return request({
    url: '/api/sys/model/getmodelset',
    method: 'get',
    params: { setId }
  })
}
/**
 * 获取当前指标集信息
 * @param setId
 */
export function getNewModelSet () {
  return request({
    url: '/api/sys/model/getnewmodelset',
    method: 'get'
  })
}

/**
 * 获取当前指标集信息
 * @param setId
 */
export function getModelItem (id) {
  return request({
    url: '/api/sys/model/getmodelitem',
    method: 'get',
    params: { id }
  })
}

/**
 * 删除当前指标集信息
 * @param setId
 */
export function delModelSet (setId) {
  return request({
    url: '/api/sys/model/delmodelset',
    method: 'post',
    params: { setId }
  })
}

/**
 * 删除当前指标集信息
 * @param setId
 */
export function delModelItem (id) {
  return request({
    url: '/api/sys/model/delmodelitem',
    method: 'post',
    params: { id }
  })
}

/**
 * 获取相关指标代码数据
 */
export function getCodeCollect () {
  return request({
    url: '/api/target/getCodeCollect',
    method: 'get'
  })
}

/**
 * 获取指标维护子节点
 * @param data
 */
export function getTargetChildNode (data) {
  return request({
    url: '/api/target/getTargetChildNode',
    method: 'post',
    data
  })
}

/*
* 排序
*/
export function orderupdown (id, upid) {
  return request({
    url: '/api/target/orderupdown',
    method: 'get',
    params: {
      id, upid
    }
  })
}
