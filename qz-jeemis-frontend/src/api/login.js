import request from '@/plugin/axios'

const account = {}
/**
 * 登录
 * @param  data
 * {
 *  username, 用户名 必须
 *  password, 口令  必须
 *  captcha, 验证码
 *  uuid     随机数
 *  }
 * @return
 * {
 *   token   不是必须
 *   uuid  用/户id 不是必须
 *   access_token 兼容小财人 不是必须
 *   refresh_token 兼容小财人 不是必须
 * }
 */
account.AccountLogin = function (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**
 * 取用户信息
 * 返回的json
 * {
 *  name :''  登录名  为了兼容原数据
 *  username:'' 登录名
 *  userId:''   实际ID
 *  deptName :'' 当前机构名
 *  deptId :''  当前的机构id
 *  realName:'' 真实姓名
 *  mobile: ''  手机号
 *  email :'' 电子邮件
 *  depts :[{deptId:'', deptName:'' ,deptPkid:'',companyId:'',companyName:''}]  隶属部门{部门ID, 部门PKID,数据库没有pkid,可等于部门ID}
 * }
 */
account.getUseInfo = function () {
  return request({
    url: 'user/info',
    method: 'post'
  })
}

/**
 * 改变用户当前部门
 * 自己调用相关的内容
 */
account.changeCurrentDeptApi = function () {
  return request({
    url: '/user/changecurrentdept',
    method: 'get'
  })
}

account.changeCurrentDept = function (data) {
  console.info(data)
}
/**
 * 更改当前用户的口令
 *
 * @param data
 * {
 * oldpassword
 * newpasswor
 * }
 */
account.changePassword = function (data) {
  return request({
    url: '/user/password',
    method: 'put',
    data
  })
}

account.changeUserInfo = function () {
  console.info('用户信息')
}

account.AccountLogout = function () {
  return request({
    url: '/logout',
    method: 'post'
  })
}
export default account
