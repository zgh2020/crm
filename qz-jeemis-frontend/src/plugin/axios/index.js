import request from './request'

// 动态加载js 判断view login.js 是否存在存在 如果存在则代理
const files = require.context('@/views/common', false, /axios.js$/)
const modules = {}
files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

let a = modules.axios
if (!a) a = request
export default a