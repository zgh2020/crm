// Vue
import Vue from 'vue'
import App from './App'
// store
import store from '@/store/index'
// 多国语
import i18n from './i18n'
// 图标
// import 'font-awesome/css/font-awesome.css'
// VXE表格
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// [ 可选插件组件 ] 右键菜单
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
// [必须组件] ag-grid
import 'ag-grid-community' // ag-grid
// [可选组件]iview
import 'view-design/dist/styles/iview.css'
import { Split } from 'view-design'
//   [ 可选插件组件 ] 实现对话框拖拽的指令
import '@/libs/directive.js'
// 菜单和路由设置
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
// [ 可选插件组件 ] 图表
import VCharts from 'v-charts'
import setting from '@/setting.js'

import VueNativeSock from 'vue-native-websocket'
Vue.use(VueNativeSock, `${window.SITE_CONFIG.imURL}`, {
  connectManually: true
})
//  日格式化过滤器
Vue.use(require('vue-moment'))
Vue.component('iv-Split', Split)
Vue.use(VXETable)
// 核心插件
Vue.use(d2Admin, { store })
// 可选插件组件
Vue.use(VCharts)
Vue.use(contentmenu)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    //  迁移到 routes/index.js
  },
  data () {
    return {
      heartCheckInterval: undefined
    }
  },
  mounted () {
    this.$store.dispatch('d2admin/chat/connectSocket')
    this.$options.sockets.onmessage = async (data) => {
      console.info('测试---', data.data)
      await this.$store.dispatch('d2admin/chat/add', data)
    }
    this.heartCheck()
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  methods: {
    heartCheck () { // 重置心跳
      this.heartCheckInterval && clearInterval(this.heartCheckInterval)
      if (!setting.websocket.enable) return
      this.heartCheckInterval = setInterval(() => {
        // console.info(this.$socket)
        if (this.$socket && this.$socket.readyState === 1) {
          this.$socket.send('1')
        } else {
          this.$store.dispatch('d2admin/chat/connectSocket')
        }
      }, 5 * 1000)
    }
  },
  watch: {
    // 检测路由变化切换侧边栏内容
    '$route.matched': {
      handler (matched) {
        if (this.layoutHeader && this.layoutHeader.headMenu && matched.length > 0) {
          const fullAside = this.$store.state.d2admin.menu.fullAside
          const _side = fullAside.filter(menu => menu.path === matched[0].path)
          this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children || [] : [])
        }
      },
      immediate: true
    }
  },
  computed: {
    layoutHeader () {
      return setting.layoutHeader
    }
  }
}).$mount('#app')
