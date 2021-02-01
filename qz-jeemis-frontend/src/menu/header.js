// 菜单 顶栏  以后改成动态从数据库中取回
import _ from 'lodash'

let headMenu = [{
  path: '/index',
  title: ' 首页',
  icon: 'home'
}
/*,
{
  path: '/index5',
  title: '菜单格式',
  icon: 'align-justify'
  // iconSvg: 'boot-2.png'
} */
]
if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_DEBUG === '1') {
  const testMenu = [{
    path: '/debug',
    title: '开发工具',
    icon: 'flask',
    children: []
  }]
  loadModuleMenus(testMenu[0].children)
  headMenu = [...headMenu, ...testMenu]
}

/**
 * 装载子目录的菜单
 * @param menus
 */
function loadModuleMenus (menus) {
  const req = context => context.keys().map(context)
  return _.flatten(req(require.context('@/views', true, /menu\.js$/))
    .filter(e => e.default)
    .map(e => e.default))
    .forEach(e => menus.push(e))
}

/* headMenu = [{
  path: '/index',
  title: '首页',
  icon: 'home',
  children: [
    { path: '/index', title: '首页' },
    { path: '', title: '消息管理' },
    { path: '', title: '问题反馈' }
  ]
},
{
  title: '人事管理',
  icon: 'address-book',
  children: [
    { path: '', title: '组织机构' },
    { path: '', title: '岗位管理' },
    { path: '', title: '人员管理' },
    { path: '', title: '合同管理' },
    { path: '', title: '信息查询' },
    { path: '', title: '信息统计' }
  ]
},
{
  title: '日常管理',
  icon: 'th-large',
  children: [
    { path: '', title: '招聘管理' },
    { path: '', title: '晋升管理' },
    { path: '', title: '考评奖惩' },
    { path: '', title: '教育培训' },
    { path: '', title: '慰问管理' }
  ]
},
{
  title: '薪酬福利',
  icon: 'calculator',
  children: [
    { path: '', title: '标准管理' },
    { path: '', title: '晋升管理' },
    { path: '', title: '工资调整' },
    { path: '', title: '工资发放' },
    { path: '', title: '保险管理' }
  ]
},
{ title: '综合分析', icon: 'pie-chart', path: '' },
{
  title: '系统管理',
  icon: 'cog',
  children: [
    { path: '', title: '角色管理' },
    { path: '', title: '用户管理' },
    { path: '', title: '操作日志' },
    { path: '', title: '在线用户' },
    { path: '', title: '预警管理' }
  ]
}] */

export default headMenu
