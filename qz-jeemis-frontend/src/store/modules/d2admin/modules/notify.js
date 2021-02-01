import { ChatMessageTextClass } from '@/libs/util.chat.class'
import util from '@/libs/util'
import setting from '@/setting.js'
import qs from 'qs'

/**
 * 处理消息通知提醒
 */
export default {
  namespaced: true,
  state: {
    // 其他消息
    notifyMessage: {}
  },
  actions: {

    /**
     * @description 添加一个信息
     * @param {Object} param type {String} 类型
     * @param {Object} param err {Error} 错误对象
     * @param {Object} param instance {Object} vue 实例
     * @param {Object} param info {String} 信息
     */
    notify ({ state, rootState }, { data }) {
      const obj = JSON.parse(data)
      // 其他消息
      if (obj.msgType === '9') {
        state.customMessage = data
        return
      }
      // 通知消息
      if (obj.chatType === '6') {
        state.notifyMessage = data
        notify.success({
          title: '消息提醒',
          message: data.content,
          showClose: true,
          position: 'bottom-right',
          duration: 20000
        })
        return
      }
      // store 赋值
      state.list.push(data)
    }
  }
}
