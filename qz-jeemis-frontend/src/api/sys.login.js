import account from './login'
// 动态加载js 判断view login.js 是否存在存在 如果存在则代理
const files = require.context('@/views/common', false, /login.js$/)
const modules = {}
files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

let a = modules.login
if (!a) a = account
export default a

// export default account
