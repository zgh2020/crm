import request from '@/plugin/axios'

export function getHeadMenuList () {
  return request({
    url: '/sys/menu/getheadmenulist',
    method: 'get'
  })
}
