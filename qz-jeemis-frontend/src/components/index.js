import Vue from 'vue'
import d2Container from './d2-container'
import d2ContainerFrame from './d2-container-frame'
import d2LinkBtn from './d2-link-btn'
import qzDialog from './qz-dialog'
import qzModal from './qz-modal/index'
import qzUserSelect from './qz-user-select'
// 注意 有些组件使用异步加载会有影响
Vue.component('qz-modal', qzModal)
Vue.component('qz-dialog', qzDialog)
Vue.component('d2-container', d2Container)
Vue.component('d2-container-frame', d2ContainerFrame)
Vue.component('d2-link-btn', d2LinkBtn)
Vue.component('qz-user-select', qzUserSelect)
Vue.component('d2-page-cover', () => import('./d2-page-cover'))
Vue.component('d2-count-up', () => import('./d2-count-up'))
Vue.component('d2-highlight', () => import('./d2-highlight'))
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))
Vue.component('d2-icon-png', () => import('./d2-icon-png/index.vue'))
Vue.component('d2-icon-file-svg', () => import('./d2-icon-file-svg/index.vue'))
Vue.component('d2-icon-select', () => import('./d2-icon-select/index.vue'))
Vue.component('d2-icon-svg-select', () => import('./d2-icon-svg-select/index.vue'))
Vue.component('d2-markdown', () => import('./d2-markdown'))
Vue.component('d2-mde', () => import('./d2-mde'))
Vue.component('d2-module-index-banner', () => import('./d2-module-index-banner'))
Vue.component('d2-module-index-menu', () => import('./d2-module-index-menu'))
Vue.component('qz-input-code', () => import('./qz-input-code'))
Vue.component('qz-input-date', () => import('./qz-input-date'))
Vue.component('qz-dept-tree', () => import('./qz-dept-tree'))
Vue.component('qz-dept-tree-gen', () => import('./qz-dept-tree-gen'))
Vue.component('qz-dept-tree-gen-all', () => import('./qz-dept-tree-gen-all'))
Vue.component('qz-frame-box', () => import('./qz-frame-box'))
Vue.component('qz-input-dept-tree', () => import('./qz-input-dept-tree'))
Vue.component('qz-input-dept-tree-gen', () => import('./qz-input-dept-tree-gen'))
Vue.component('qz-tree-menu', () => import('./qz-tree-menu'))
Vue.component('qz-input-code-desc', () => import('./qz-input-code-desc'))
Vue.component('qz-input-photo', () => import('./qz-input-photo'))
Vue.component('qz-select-code', () => import('./qz-select-code'))
Vue.component('qz-select-role', () => import('./qz-select-role'))
Vue.component('qz-pdf-view', () => import('./qz-pdf-view'))
Vue.component('qz-progress-dialog', () => import('./qz-progress-dialog'))
Vue.component('qz-quill', () => import('./qz-quill'))
Vue.component('qz-file-list', () => import('./qz-file-list'))
Vue.component('qz-shortcut-btn', () => import('./qz-shortcut-btn'))
Vue.component('qz-file-view-dialog', () => import('./qz-file-view/index-dialog.vue'))
