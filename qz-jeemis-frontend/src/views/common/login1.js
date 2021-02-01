import request from '@/plugin/axios'
import util from '@/libs/util'
import store from '@/store'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import router from '@/router'
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
    url: '/auth/login',
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
    url: '/services/uaa/api/accountLogin',
    method: 'get'
  })
}

/**
 * 改变用户当前部门
 * 自己调用相关的内容
 */
account.changeCurrentDeptApi = function (data) {
  return request({
    url: '/services/uaa/api/changeUserDefaultDept',
    method: 'post',
    data
  })
}

// 仅仅为了测试
function getmenu (title) {
  return [
    {
      path: '/debug/demo5',
      title: title,
      icon: 'home'
    }
  ]
}

/**
 * 切换单位的例子 切换菜单 应该自己重新整理一下
 * @param data
 * @return {Promise<void>}
 */
account.changeCurrentDept = async function (data) {
  // 调用切换单位 ?
  // 取回新菜单 仅菜单不管路由 路由理论上第一次应该全取回?
  // 换菜单
  // 切换单位名字?
  // 是否关闭所有的页?
  // 刷新首页?
  // 步骤例子:
  // 调用切换单位api
  const res = await this.changeCurrentDeptApi(data)
  console.info('login---切换单位', JSON.stringify(data))
  console.info('login---切换单位', res)
  // 切换httphead
  util.cookies.setLogin(res)
  // 重新取用户, 1点建议: 登录及切换单位应一次返回所需的内容 避免多次调用
  const userInfo = await this.getUseInfo()
  util.cookies.setLogin(userInfo)
  console.info('login---切换单位', userInfo)
  // 设置主页面head用户信息
  await store.dispatch('d2admin/user/set', userInfo, { root: true })
  // 切换菜单, 应该后台取一下 下一步计划菜单配置更灵活 顶部菜单和侧边栏菜单分别配置 暂合并配置
  const menu = getmenu(userInfo.deptName)
  const allMenuAside = [...menuAside, ...menu]
  const allMenuHeader = [...menuHeader, ...menu]
  await store.commit('d2admin/menu/headerSet', allMenuHeader)
  await store.commit('d2admin/menu/fullAsideSet', allMenuAside)
  // 是否关闭所有的页 自己看着处理 这里只是个例子 已经自动切换到主页了
  await store.dispatch('d2admin/page/closeAll')
  // 刷新主页 仅测试  自己看着处理
  router.replace('/refresh').catch(error => error)
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
account.changePassword = function () {
  console.info('更改口令')
}

account.changeUserInfo = function () {
  console.info('用户信息')
}

account.AccountLogout = function () {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
export default account
