export default {
  // 快捷键
  // 支持快捷键 例如 ctrl+shift+s
  hotkey: {
    search: {
      open: 'ctrl+9',
      close: 'esc'
    }
  },
  // 侧边栏默认折叠状态
  menu: {
    asideCollapse: true
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        fullPath: '/index',
        meta: {
          title: '首页',
          auth: true
        }
      }
    ]
  },
  layoutHeader: {
    theme: true,
    search: false,
    deptSwitch: false,
    fullScreen: true,
    // 是否显示asideCollapse菜单
    asideMenu: false,
    // 只能是5px和65px  配置侧边栏隐藏后是否显示小菜单5px不显示小菜单 65px 显示小菜单
    asideMinWidth: '5px',
    // 是否显示head菜单
    headMenu: true,
    // 顶部仅显示1级菜单 默认全显示
    headLevelTop: false
  },

  // token值存储在哪里 cookie sessionStorage
  token: {
    store: 'cookie'
  },
  // 菜单搜索
  search: {
    enable: true
  },
  // 注册的主题
  theme: {
    list: [
      {
        title: '经典',
        name: 'd2',
        preview: 'image/theme/d2/preview@2x.png'
      },
      /* {
        title: '紫罗兰',
        name: 'violet',
        preview: 'image/theme/violet/preview@2x.png'
      },
      {
        title: '简约线条',
        name: 'line',
        backgroundImage: 'image/theme/line/bg.jpg',
        preview: 'image/theme/line/preview@2x.png'
      },
      {
        title: '流星',
        name: 'star',
        backgroundImage: 'image/theme/star/bg.jpg',
        preview: 'image/theme/star/preview@2x.png'
      },
       {
        title: '黑白主题',
        name: 'dark-white',
        preview: 'image/theme/dark-white/preview@2x.png'
      },
      {
        title: '黑色主题',
        name: 'black',
        preview: 'image/theme/black/preview@2x.png'
      },
      */
      {
        title: '蓝色主题',
        name: 'blue',
        preview: 'image/theme/blue/preview@2x.png'
      },
      {
        title: '绿色主题',
        name: 'dark-turquoise',
        preview: 'image/theme/dark-turquoise/preview@2x.png'
      },
      {
        title: '绿色主题2',
        name: 'dark-turquoise2',
        preview: 'image/theme/dark-turquoise2/preview@2x.png'
      },

      {
        title: '深蓝主题',
        name: 'dark-blue',
        preview: 'image/theme/dark-blue/preview@2x.png'
      },
      {
        title: '深蓝主题2',
        name: 'dark-blue2',
        preview: 'image/theme/dark-blue/preview@2x.png'
      },
      /* {
        title: '白蓝主题',
        name: 'white-blue',
        preview: 'image/theme/white-blue/preview@2x.png'
      }, */
      {
        title: '大数据主题',
        name: 'big-data',
        preview: 'image/theme/big-data/preview@2x.png'
      },
      {
        title: '管控平台主题',
        name: 'group-platform',
        preview: 'image/theme/group-platform/preview@2x.png'
      },
      {
        title: '管控平台主题1366',
        name: 'group-platform1366',
        preview: 'image/theme/group-platform/preview@2x.png'
      }
      /* {
        title: '开发主题',
        name: 'tomorrow-night-blue',
        preview: 'image/theme/tomorrow-night-blue/preview@2x.png'
      } */
    ]
  },
  // 是否开启websocket
  websocket: {
    enable: true
  },
  // 是否默认开启页面切换动画
  transition: {
    active: false
  },
  encrypt: {
    enable: true,
    publicKey: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI/UlsY91LoJcXjoUCzCbjz+/SirdeK6c0ih9o5laS2N' +
      '3bqSXQ9uba+BvMQ72WUPzya10WSkZ2Nvgf/SGQQzETkCAwEAAQ=='

  },
  // 是否默认开启灰度
  gray: {
    active: false
  }
}
