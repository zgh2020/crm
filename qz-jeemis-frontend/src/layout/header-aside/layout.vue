<template>
    <div :class="{grayMode: grayActive}"
         :style="styleLayoutMainGroup"
         class="d2-layout-header-aside-group">
        <!-- 半透明遮罩 -->
        <div class="d2-layout-header-aside-mask"></div>
        <!-- 主体内容 -->
        <div class="d2-layout-header-aside-content" flex="dir:top">
            <!-- 顶栏 -->
            <div :style="{opacity: this.searchActive ? 0.5 : 1}"
                 class="d2-theme-header"
                 flex
                 flex-box="0">
                <div :style="{width: asideCollapse ? logoWidthCollapse : logoWidth}" class="logo-group" flex-box="0">
                    <img :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`" v-if="asideCollapse">
                    <img :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`" v-else>
                </div>
                <div @click="handleToggleAside" class="toggle-aside-btn" flex-box="0">
                    <i :class="{'fas fa-outdent':!asideCollapse,'fas fa-indent':asideCollapse}" style="font-size: 16px"  ></i>
                    <!--<d2-icon name="bars"/>-->
                </div>
                <d2-menu-header flex-box="1" v-if="layoutHeader.headMenu"/>
                <div flex-box="1" v-else/>
                <!-- 顶栏右侧 -->
                <div class="d2-header-right" flex-box="0">
                    <d2-header-dept v-if="layoutHeader.deptSwitch"/>
                    <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
                    <d2-header-search @click="handleSearchClick" v-if="layoutHeader.search"/>
                    <d2-header-error-log v-if="false"/>
                    <d2-header-fullscreen v-if="layoutHeader.fullScreen"/>
                    <d2-header-theme v-if="layoutHeader.theme"/>
                    <d2-header-size v-if="false"/>
                    <d2-header-user/>
                </div>
            </div>
            <!-- 下面 主体 -->
            <div class="d2-theme-container" flex flex-box="1">
                <!-- 主体 侧边栏 -->
                <div :style="{ width: asideCollapse || this.aside.length === 0 ? asideWidthCollapse : asideWidth, opacity: this.searchActive ? 0.5 : 1}"
                     class="d2-theme-container-aside"
                     flex-box="0"
                     ref="aside">
                    <div class="menuTitle" style="z-index:-1; position:relative" v-if="!((asideCollapse  || this.aside.length === 0) && asideWidthCollapse==='5px')">导航菜单</div>
                    <d2-menu-side v-show="!((asideCollapse  || this.aside.length === 0) && asideWidthCollapse==='5px')"/>
                </div>
                <!-- 主体 -->
                <div class="d2-theme-container-main" flex flex-box="1">
                    <!-- 搜索 -->
                    <transition name="fade-scale">
                        <div class="d2-theme-container-main-layer" flex="dir:top" v-show="searchActive">
                            <d2-panel-search
                                    @close="searchPanelClose"
                                    ref="panelSearch"/>
                        </div>
                    </transition>
                    <!-- 内容 -->
                    <transition name="fade-scale">
                        <div class="d2-theme-container-main-layer" flex="dir:top" v-show="!searchActive">
                            <!-- tab -->
                            <div class="d2-theme-container-main-header white-tabs" flex-box="0">
                                <d2-tabs/>
                            </div>
                            <!-- 页面 -->
                            <div class="d2-theme-container-main-body" flex-box="1">
                                <transition  :name="transitionActive ? 'fade-transverse' : ''"  :mode="transitionActive ? '': 'out-in'">
                                    <keep-alive :include="keepAlive">
                                        <router-view :key=$route.fullPath />
                                    </keep-alive>
                                </transition>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import d2MenuSide from './components/menu-side'
import d2MenuHeader from './components/menu-header'
import d2Tabs from './components/tabs'
import d2HeaderFullscreen from './components/header-fullscreen'
import d2HeaderSearch from './components/header-search'
import d2HeaderSize from './components/header-size'
import d2HeaderTheme from './components/header-theme'
import d2HeaderUser from './components/header-user'
import d2HeaderDept from './components/header-dept'
import d2HeaderErrorLog from './components/header-error-log'
import { mapState, mapGetters, mapActions } from 'vuex'
import mixinSearch from './mixins/search'
import setting from '@/setting.js'
export default {
  name: 'd2-layout-header-aside',
  mixins: [
    mixinSearch
  ],
  components: {
    d2MenuSide,
    d2MenuHeader,
    d2Tabs,
    d2HeaderFullscreen,
    d2HeaderSearch,
    d2HeaderSize,
    d2HeaderTheme,
    d2HeaderUser,
    d2HeaderDept,
    d2HeaderErrorLog
  },
  data () {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '190px',
      // [侧边栏宽度] 折叠状态
      // asideWidthCollapse: '65px',
      logoWidth: '285px',
      logoWidthCollapse: '285px'
    }
  },
  mounted () {
    //  以后去掉, 不应该统一配置 应该根据用户自行配置 存储到本地
    this.$store.dispatch('d2admin/transition/set', setting.transition.active)
    this.$store.commit('d2admin/gray/set', setting.gray.active)
  },
  computed: {
    ...mapState('d2admin', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse,
      aside: state => state.menu.aside,
      openPage: state => state.page.opened
    }),
    ...mapGetters('d2admin', {
      themeActiveSetting: 'theme/activeSetting'
    }),
    /**
       * @description 最外层容器的背景图片样式
       */
    styleLayoutMainGroup () {
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      }
    },
    layoutHeader () {
      return setting.layoutHeader
    },
    // [侧边栏宽度] 折叠状态
    asideWidthCollapse () {
      return this.aside.length < 1 ? '5px' : setting.layoutHeader.asideMinWidth
    }
  },
  methods: {
    ...mapActions('d2admin/menu', [
      'asideCollapseToggle'
    ]),
    /**
       * 接收点击切换侧边栏的按钮
       */
    handleToggleAside () {
      this.asideCollapseToggle()
    },
    showIframe (path) {
      for (const obj of this.openPage) {
        if (obj && obj.fullPath === path) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="scss">
    // 注册主题
    @import '~@/assets/style/theme/register.scss';
</style>
