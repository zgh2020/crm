import { ChatMessageTextClass } from '@/libs/util.chat.class'
import util from '@/libs/util'
import setting from '@/setting.js'
import qs from 'qs'
import { Notification } from 'element-ui'
import router from '@/router'

/**
 * 这里边一律不允许去处理后端api
 */
export default {
  namespaced: true,
  state: {

    /**
     * 用户信息{
     *   头像
     *   用户名
     * }
     */
    userInfo: {},

    /**
     * 聊天存储
     * key=聊天窗口id
     * data= {peetId 对方id peetName 对方名字  头像  type  是群组还是私聊  last_content  last_datetime  first_index   ,//ChatList 聊天内容(每次取最后100条)}
     * peetId  对方 id
     * type  是群组 私聊 通知
     * ChatList.item={id	id
     * from_id	发送用户的id
     * to_id	接收用户的id
     *content	消息内容(如果是已撤回的消息 显示已撤回)
     *msg_type	消息类型  0文本 1 图片  2声音  3视频 4音乐 5任务 6链接
     *create_date	创建时间
     *update_date	更新时间
      *}
     */
    // 当前聊天窗口
    currentChatWindow: {},
    chatWindowMap: new Map(),
    /**
     * ChatList.item={id	id
     * from_id	发送用户的id
     * to_id	接收用户的id
     *content	消息内容(如果是已撤回的消息 显示已撤回)
     *msg_type	消息类型  0文本 1 图片  2声音  3视频 4音乐 5任务 6链接
     *create_date	创建时间
     *update_date	更新时间
     *format_date  (格式化时间)
     *}
     */
    currentChatList: [],

    /**
     * 最近一次对话信息,每次变化提醒一次
     * 数据{窗口id  信息}
     */
    currentChat: {},

    // 最近一次消息内容
    currentMsg: {},

    // 聊天对话框是否显示
    chatDialogVisible: false,
    // 其他消息
    customMessage: {},
    // 通知消息 弹窗
    notifyMessage: {},
    list: []
  },
  actions: {
    connectSocket ({ state, dispatch }) {
      if (!setting.websocket.enable) return
      if (!util.cookies.get('token')) return
      // 取回token
      const params = qs.stringify({
        token: util.cookies.get('token')
      })
      this._vm.$connect(`${window.SITE_CONFIG.imURL}?${params}`, {
        reconnection: false,
        reconnectionAttempts: 50,
        reconnectionDelay: 6000
      })
    },
    closeSocket ({ state, dispatch }) {
      if (!setting.websocket.enable) return
      this._vm.$disconnect()
    },
    /**
     * 按照格式发送信息,不用这个发送消息,仅仅是个测试,使用webapi发送消息
     * {
     *   from:
     *   to:
     *   content:
     *
     * }
     * @param data
     */
    sendSocketChat (data) {
      if (!setting.websocket.enable) return
      this.$socket.send(data)
    },
    /**
     * 使用api发送消息
     * data{
     *   id : 接收时有值 发送时无值
     *   windowId: 对话窗id 接收时有值 发送时有值 不能为空 -1表示未知窗口
     *   to   发送给谁
     *   content: 内容(如果是文件的话 仅仅一个文件名 任务的话也是一个文件名)
     *   chatType: 类型
     *   msgType: 消息类型 消息类型  0文本(默认) 1 图片  2声音  3视频 4音乐 5任务 6链接
     *   fileInfo : {id  name content size }
     *   taskInfo:{Id name content 其他} // 任务信息 暂时不处理
     *   processInfo:{Id name content(进度描述)  maxValue  value 进度信息}
     * }
     * @param data
     */
    sendChat (data) {
      if (!setting.websocket.enable) return
      this.$socket.send(data)
    },

    /**
     * 接收到消息后追加的消息, 发送和接收统一处理
     * @param data
     */
    addChat (data) {
      // 根据data 查找窗口的id 然后处理,如果不是当前的则处理窗口信息(快 不算准 使用这种办法 未读消息+1)
      // 根据data 查找窗口的id 然后处理,如果是当前窗口,则处理 未读为0 currentChatList 收到 未读+1
      // chatDialogVisible当关闭对话框时 没有当前窗口
      // currentChatList 增加数据  并设置后台数据库未读0  会不会访问数据库过于频繁? 特别是群组  未读=0  先这样吧至少准 要不然太麻烦 毕竟与户量没有那么大 记着测试 以后启用缓存再优化 没有好办法
      if (!setting.websocket.enable) return
      this.$socket.send(data)
    },
    /**
     * 取回所有的关系(recent_session)
     * 数据格式
     *id  id
     *user_id  用户id
     *peer_id  对方id
     *type  类型，1-用户,2-群组
     *unread  未读消息数
     *last_date  更新时间(最后一次聊天时间)
     *last_content 更新时间(最后一次聊天时间)
     *has_top  置顶1 2 3
     *has_current 是否当前
     */
    setChatWindowList (sessionList) {

    },

    /**
     * 增加群组
     */
    addChatGroup () {

    },
    /**
     * 增加群组会员
     * groupId 如果 groupId为空就表示新增群组
     */
    addChatGroupMember (userList, groupId) {

    },
    /**
     * 移除群组会员
     */
    delChatGroupMember () {

    },

    /**
     * 解散群组
     */
    delChatGroup () {

    },

    /**
     * 获取聊天文件列表 分页
     */
    getChatFilePage () {

    },

    /**
     * 搜索联系人分页
     */
    getChatUserPage () {

    },

    /**
     * 搜索群组分页
     */
    getChatGroupPage () {

    },

    /**
     * 搜索聊天内容分页
     */
    getChatContentPage () {

    },

    getChatWindowList () {
      // 应该watch 是否发生变化 一旦变化应该去刷新当前列表
      return this.state.chatWindowList
    },

    /**
     * 设置当前的聊天窗口
     * 同时刷新currentChatList
     * @param id
     */
    setCurrentChatWindow (id) {

    },

    /**
     * 取回当前的聊天窗口
     * @param id
     */
    getCurrentChatWindow () {
      return this.state.currentChatWindow
    },
    /**
     * 增加window
     * @param peerId
     * @param type
     */
    addChatWindow (peerId) {
      // 从数据库取回来,增加到chatWindowList
    },

    removeChatWindow (id) {

    },

    /**
     * 发送一个简单文本
     * @param msg
     * @param to
     */
    sendCustomMessage ({ state, rootState }, { content, to }) {
      if (!setting.websocket.enable) return
      const user = JSON.parse(util.cookies.get('userinfo'))
      const chatData = new ChatMessageTextClass(user.name, to, '9', content)
      this._vm.$socket.send(JSON.stringify(chatData))
    },
    /**
     * @description 添加一个信息
     * @param {Object} param type {String} 类型
     * @param {Object} param err {Error} 错误对象
     * @param {Object} param instance {Object} vue 实例
     * @param {Object} param info {String} 信息
     */
    add ({ state, rootState }, { data }) {
      const obj = JSON.parse(data)
      // 自定义消息
      if (obj.msgType === '9') {
        state.customMessage = data
        return
      }

      // 通知消息
      if (obj.chatType === '6') {
        state.notifyMessage = data
        const notification = Notification.success({
          title: obj.title,
          message: obj.content,
          showClose: true,
          dangerouslyUseHTMLString: true,
          position: 'bottom-right',
          duration: 20000,
          onClick: () => {
            debugger
            //  根据动作打开不同的内容
            if (obj.actionId === '站内信') {
              router.push({
                path: '/oa/view/message',
                params: { id: obj.receiveId },
                query: {
                  id: obj.receiveId
                }
              })
            }
            notification.close()
          }
        })
        return
      }
      // store 赋值
      state.list.push(data)
    }
  }
}
