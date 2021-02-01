import { JSEncrypt } from 'jsencrypt'
import setting from '@/setting.js'
const $encrypt = {}
const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI/UlsY91LoJcXjoUCzCbjz+/SirdeK6c0ih9o5laS2N' +
  '3bqSXQ9uba+BvMQ72WUPzya10WSkZ2Nvgf/SGQQzETkCAwEAAQ=='
$encrypt.encrypt = function (data) {
  if (!setting.encrypt.enable) {
    //  没有启用加密
    return data
  }
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  return encrypt.encrypt(data)
}

export default $encrypt
