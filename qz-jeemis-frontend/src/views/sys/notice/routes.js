export default [
  {
    path: '/sys/viewnotice',
    name: 'view-notice',
    meta: {
      title: '',
      auth: true
    },
    component: () => import('./view-notice')
  }
]
