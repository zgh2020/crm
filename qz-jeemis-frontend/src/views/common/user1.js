import request from '@/plugin/axios'
const userInfo = {}
/**
 * 取全部菜单
 */
userInfo.getHeadMenuList = function () {
  console.info('代理取菜单')
  return request({
    url: 'services/uaa/api/getheadmenulist',
    method: 'get'
  })
}

userInfo.getAsideMenuList = function () {
  return request({
    url: 'services/uaa/api/getheadmenulist',
    method: 'get'
  })
}
export default userInfo
