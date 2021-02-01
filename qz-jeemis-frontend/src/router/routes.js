import layoutHeaderAside from '@/layout/header-aside'
import _ from 'lodash'

/**
 * 装载子目录的路由
 * @param routes
 */
function loadModuleRoutes (routes) {
  const req = context => context.keys().map(context)
  return _.flatten(req(require.context('@/views', true, /routes\.js$/))
    .filter(e => e.default)
    .map(e => e.default))
    .forEach(e => routes.push(e))
}
/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页 必须 name:index
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: () => import('@/views/index')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(instance => instance.$router.replace(from.fullPath))
          },
          render: h => h()
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(instance => instance.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h()
        }
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/platform/error-page-404')
  }
]

loadModuleRoutes(frameIn[0].children)
// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
