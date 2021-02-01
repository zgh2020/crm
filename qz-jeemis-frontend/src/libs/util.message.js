import { Message, MessageBox } from 'element-ui'
const $message = {}

$message.showSuccess = function (msg) {
  return Message.success({
    message: msg,
    modal: false,
    center: true,
    duration: 1000
  })
}

$message.showError = function (err) {
  if (err.status) {
    return MessageBox.alert(err.status + err.message, '错误', {
      confirmButtonText: '确定',
      modal: false,
      type: 'warning'
    })
  } else {
    return MessageBox.alert(err, '错误', {
      confirmButtonText: '确定',
      modal: false,
      type: 'warning'
    })
  }
}

$message.showInfo = function (msg) {
  return MessageBox.alert(msg, '信息', {
    confirmButtonText: '确定',
    modal: false,
    type: 'info'
  })
}

$message.showInfo2 = function (msg) {
  MessageBox.alert(msg, '信息', {
    confirmButtonText: '确定',
    modal: false,
    type: 'info'
  })
}

$message.showYesNo = function (msg) {
  return MessageBox.confirm(msg, '询问', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info',
    modal: false
  })
}

export default $message
