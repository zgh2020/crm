
export class ChatUserClass {
  constructor (id, name, avatar, unReadCount, lastMessage, mobile, email, type) {
    this.id = id
    this.name = name
    this.avatar = avatar
    this.unReadCount = unReadCount
    this.lastMessage = lastMessage
    this.mobile = mobile
    this.email = email
    this.type = type
  }
}

export class ChatMessageTextClass {
  constructor (from, to, msgType, content) {
    this.from = from
    this.to = to
    this.msgType = msgType
    this.content = content
  }
}
