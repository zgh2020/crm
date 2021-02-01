import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
import $message from './util.message'
import $gen from './util.gen'
import $chat from './util.chat'
import conditionBuilder from './util.condition'
import $encrypt from './util.encrypt'
const util = {
  cookies,
  db,
  log,
  $message,
  $gen,
  $chat,
  $encrypt,
  conditionBuilder
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}
/**
 * 取文件扩展名
 * @param filename
 * @returns {string}
 */
util.extname = function (filename) {
  if (!filename || typeof filename !== 'string') {
    return ''
  }
  const a = filename.split('').reverse().join('')
  const b = a.substring(0, a.search(/\./)).split('').reverse().join('')
  return b
}
/**
 * 取文件大小
 * @param size
 * @returns {string}
 */
util.getFileSize = function (size) {
  if (!size) { return '' }
  const num = 1024.00 // byte
  if (size < num) { return size + 'B' }
  if (size < Math.pow(num, 2)) { return (size / num).toFixed(2) + 'K' } // kb
  if (size < Math.pow(num, 3)) { return (size / Math.pow(num, 2)).toFixed(2) + 'M' } // M
  if (size < Math.pow(num, 4)) { return (size / Math.pow(num, 3)).toFixed(2) + 'G' } // G
  return (size / Math.pow(num, 4)).toFixed(2) + 'T' // T
}

util.getFileIcon = function (fileType) {
  const extNames = 'png,bpm,jpg,rar,zip,7z,jar,groovy,pptx,ppt,docx,doc,xls,xlsx,csv,folder,mp3,mp4,wav,pdf,sql,dat,avi,att,'
  if (extNames.indexOf(fileType + ',') >= 0) { return fileType } else { return 'unknown' }
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

/**
 * 获取uuid
 */
util.getUUID = function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}
export default util
