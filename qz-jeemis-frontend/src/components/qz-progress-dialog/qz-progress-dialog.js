import Vue from 'vue'
import progressDialog from './index.vue'
const AlertConstructor = Vue.extend(progressDialog) // 返回一个“扩展实例构造器”
let alertDom
const loadDialog = {}
loadDialog.open = (time) => {
  alertDom = new AlertConstructor({
    el: document.createElement('div') // 将Alert组件挂载到新创建的div上
  })
  document.body.appendChild(alertDom.$el) // 把Alert组件的dom添加到body里
  alertDom.init(time)
}

loadDialog.close = (time) => {
  alertDom.closeDialog()
  document.body.removeChild(alertDom.$el) // 把Alert组件的dom添加到body里
}
export default loadDialog
