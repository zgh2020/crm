import Cookies from 'js-cookie'
import sessionsDB from './util.sessionstorage'
import setting from '@/setting.js'
const cookies = {}
/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting 默认关闭浏览器失效,如需记住状态 三传参数时请带expires
 */
cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
  const currentCookieSetting = {
    //  expires: 1   为空时关闭浏览器cookie失效
  }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(`d2admin-${process.env.VUE_APP_VERSION}-${name}`, value, currentCookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function (name = 'default') {
  return Cookies.get(`d2admin-${process.env.VUE_APP_VERSION}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = function () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function (name = 'default') {
  return Cookies.remove(`d2admin-${process.env.VUE_APP_VERSION}-${name}`)
}

/**
 *设置 cookie 一定要存 uuid 和 token 两个 cookie
 *整个系统依赖这两个数据进行校验和存储
 *uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复 userid
 *token 代表用户当前登录状态 建议在网络请求中携带 token
 *如有必要 token 需要定时更新，默认保存一天
 * @param res
 */
cookies.setLogin = function (res) {
  res && this.set('userinfo', res)
  res.uuid && this.set('uuid', res.uuid)
  res.login && this.set('uuid', res.login)
  res.token && this.set('token', res.token)
  res.access_token && this.set('token', 'Bearer ' + res.access_token)
  res.access_token && this.set('authorization', 'Bearer ' + res.access_token)
  res.refresh_token && this.set('refreshtoken', res.refresh_token)
}
/**
 * 清楚登录信息
 * @param name
 * @returns {*}
 */
cookies.clearLogin = function () {
  this.remove('userinfo')
  this.remove('token')
  this.remove('uuid')
  this.remove('keyid')
  this.remove('authorization')
  this.remove('refreshtoken')
}
let db = cookies
if (setting.token.store === 'sessionStorage') {
  db = sessionsDB
}
export default db
