import request from '@/plugin/axios'

export function getMenuTree (type) {
  return request({
    url: '/api/sys/menu/tree',
    method: 'get',
    params: {
      type
    }
  })
}
export function getMenuList (pId) {
  return request({
    url: '/api/sys/menu/list',
    method: 'get',
    params: {
      pId
    }
  })
}

export function saveMenuInfo (data) {
  return request({
    url: '/api/sys/menu',
    method: 'post',
    data
  })
}
export function deleteMenu (id) {
  return request({
    url: '/api/sys/menu/' + id,
    method: 'delete'
  })
}

export function getMenuItem (pId, id) {
  return request({
    url: '/api/sys/menu/getmenuitem',
    method: 'get',
    params: {
      pId,
      id
    }
  })
}

export function saveMenuSort (id1, id2) {
  return request({
    url: '/api/sys/menu/sort',
    method: 'post',
    params: {
      id1,
      id2
    }
  })
}

export function startMenuItem (id) {
  return request({
    url: '/api/sys/menu/' + id,
    method: 'put'
  })
}
