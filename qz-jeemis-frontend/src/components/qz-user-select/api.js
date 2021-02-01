import request from '@/plugin/axios'

// 取回机构和用户一块取回来,pid 限制取回的机构层次
export function getDeptAndUser (pid) {
  return request({
    url: '/api/sys/user/dept_and_user',
    method: 'post',
    params: {
      pid
    }
  })
}
// 取回已经选择的机构和用户
export function getSelectDeptAndUser (id) {
  return request({
    url: '/api/sys/user/select_dept_and_user',
    method: 'get',
    params: {
      id
    }
  })
}

export function getSearchDeptAndUser (key) {
  return request({
    url: '/api/sys/user/search_dept_and_user',
    method: 'post',
    params: {
      key
    }
  })
}

export function saveSelectDeptAndUser (data) {
  return request({
    url: '/api/sys/user/search_dept_and_user',
    method: 'post',
    data
  })
}
