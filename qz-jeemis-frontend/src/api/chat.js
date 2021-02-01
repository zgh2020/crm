/**
 * 聊天API
 */
import request from '@/plugin/axios'

// 发送消息
export function sendChat (data) {
  return request({
    url: 'chat/sendtouser',
    method: 'post',
    data
  })
}

// 搜索联系人
// 机构树
// 群组列表
// 取回文件
// 下载文件
// 上传文件
// 取回某一窗口的消息 (index,pagesize) page取
// 创建某个群组
// 增加一个群组的人员
// 移除群组人员
// 解散群组
// 转发信息
