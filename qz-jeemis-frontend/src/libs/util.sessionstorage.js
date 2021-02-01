const db = {}

/**
 * @description 存储 sessionStorage 值
 * @param {String} name sessionStorage name
 * @param {String} value sessionStorage value
 * @param {Object} setting sessionStorage setting 默认关闭浏览器失效,如需记住状态 三传参数时请带expires
 */
db.set = function (name = 'default', value = '') {
  sessionStorage.setItem(`d2admin-${process.env.VUE_APP_VERSION}-${name}`, value)
}

/**
 * @description 拿到 sessionStorage 值
 * @param {String} name sessionStorage name
 */
db.get = function (name = 'default') {
  return sessionStorage.getItem(`d2admin-${process.env.VUE_APP_VERSION}-${name}`)
}

/**
 * @description 删除 sessionStorage
 * @param {String} name sessionStorage name
 */
db.remove = function (name = 'default') {
  return sessionStorage.removeItem(`d2admin-${process.env.VUE_APP_VERSION}-${name}`)
}

/**
 *设置 sessionStorage 一定要存 uuid 和 token 两个 sessionStorage
 *整个系统依赖这两个数据进行校验和存储
 *uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复 userid
 *token 代表用户当前登录状态 建议在网络请求中携带 token
 *如有必要 token 需要定时更新，默认保存一天
 * @param res
 */
db.setLogin = function (res) {
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
db.clearLogin = function () {
  this.remove('userinfo')
  this.remove('token')
  this.remove('uuid')
  this.remove('keyid')
  this.remove('authorization')
  this.remove('refreshtoken')
}

export default db
