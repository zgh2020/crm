import cookies from './util.cookies'
import * as api from './api'
import qs from 'qs'
const $gen = {}
/// <summary>
/// 格式化日期字符串(例如0101转2001-01-01)
/// </summary>
/// <param name="t"></param>
/// <returns></returns>
function FormatSDate (dateValue) {
  if (!dateValue) return ''
  if (dateValue === '') return ''
  let strYear = ''
  let strMonth = '01'
  let strDay = '01'
  let strDate = ''
  strDate = dateValue.replace(/-/g, '')
  strDate = strDate.replace(/\//g, '')
  strDate = strDate.replace(/\./g, '')
  strDate = strDate.replace(/\s+/g, '')
  const datelen = strDate.length
  switch (datelen) {
    case 2: //  例如输入“80”表示1980年01月01日
      strYear = '19' + strDate
      if (Number(strDate) < 40) strYear = '20' + strDate
      break
    case 3: // 例如输入“801”表示1980年01月
      if (Number(strDate.substr(0, 2)) < 20) {
        strYear = '20' + strDate.substr(0, 2)
      } else {
        strYear = '19' + strDate.substr(0, 2)
      }
      strMonth = '0' + strDate.substr(2, 1)
      break
    case 4:// 例如输入“8701”表示1987年01月,“0201”表示2002年01月
      if (Number(strDate.substr(0, 2)) < 20) {
        strYear = '20' + strDate.substr(0, 2)
      } else {
        strYear = '19' + strDate.substr(0, 2)
      }
      strMonth = strDate.substr(2, 2)
      break
    case 6:
      if (strDate.substr(0, 2) === '19' || strDate.substr(0, 2) === '20') { // 如196705
        strYear = strDate.substr(0, 4)
        strMonth = strDate.substr(4, 2)
      } else { //  如670518
        if (Number(strDate.substr(0, 2)) < 20) {
          strYear = '20' + strDate.substr(0, 2)
        } else {
          strYear = '19' + strDate.substr(0, 2)
        }
        strMonth = strDate.substr(2, 2)
        strDay = strDate.substr(4, 2)
      }
      break
    case 8:
      strYear = strDate.substr(0, 4)
      strMonth = strDate.substr(4, 2)
      strDay = strDate.substr(6, 2)
      break
  }
  if (!strYear || strYear === '') {
    return dateValue
  } else {
    strDate = strYear + '-' + strMonth + '-' + strDay
  }
  return strDate
}

$gen.FormatSDate = function (datevalue) {
  try {
    const strDate = FormatSDate(datevalue)
    if (isNaN(strDate) && (!isNaN(Date.parse(strDate)) || !isNaN(Date.parse(strDate.replace(/-/g, '/')))) && strDate.length > 8) {
      return strDate
    }
  } catch (e) {
    return ''
  }
  return ''
}
$gen.isObjValueNull = function (obj) {
  for (var key in obj) {
    if (!obj[key]) continue
    if (obj[key] && obj[key] instanceof Array && obj[key].length > 0) return false
  }
  return true
}

$gen.getImageURL = function (fileId) {
  const token = cookies.get('token')
  const baseUrl = window.SITE_CONFIG.apiURL
  return baseUrl + '/file?fileId=' + fileId + '&token=' + token
}

$gen.getImageObjectURL = function (data) {
  return window[window.webkitURL ? 'webkitURL' : 'URL'].createObjectURL(data)
}
// 导出
$gen.exportHandle = function (data, exportURL) {
  var params = qs.stringify({
    token: cookies.get('token'),
    ...data
  })
  window.location.href = `${window.SITE_CONFIG.apiURL}${exportURL}?${params}`
}

$gen.getIMURL = function () {
  const baseUrl = window.SITE_CONFIG.imURL
  const token = cookies.get('token')
  return baseUrl + '?username=' + token + '&token=' + token
}

$gen.getIMURL1 = function () {
  const baseUrl = window.SITE_CONFIG.imURL
  return baseUrl
}

$gen.isObjectValueEqual = function (a, b, ...fields) {
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)
  if (aProps.length !== bProps.length) {
    return false
  }
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i]
    if (propName.indexOf('__') >= 0 || (fields.length > 0 && fields.indexOf(propName) >= 0)) {
      continue
    }
    if (!a[propName] && !b[propName]) {
      continue
    }
    if (a[propName] !== b[propName]) {
      return false
    }
  }
  return true
}
$gen.isIE = function () {
  return !(window.ActiveXObject) && 'ActiveXObject' in window
}

$gen.getSimplePinYin = function (hanZi) {
  return api.getSimplePinYin(hanZi)
}

export default $gen
