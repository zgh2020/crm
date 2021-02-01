import * as api from './api'
const $chat = {}

$chat.sendCustomMessage = function (content, to) {
  api.sendCustomMessage(content, to)
}

export default $chat
