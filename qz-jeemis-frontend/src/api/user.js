import request from '@/plugin/axios'

const userInfo = {}
/**
 * 取全部菜单
 */
userInfo.getHeadMenuList = function () {
  return request({
    url: '/api/sys/menu/nav',
    method: 'get'
  })
}

/**
 * 取侧边栏菜单 暂时未用
 */
userInfo.getAsideMenuList = function () {
  return request({
    url: '/api/sys/menu/nav',
    method: 'get'
  })
}

export default userInfo
