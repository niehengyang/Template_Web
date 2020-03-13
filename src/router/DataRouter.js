const DataRouter = [
  {
      path: '/data',
      component: () => import('@/views/admin/data/user/Index.vue'),
      name:'data_user',
  },
  {
    path: '/data/device',
    component: () => import('@/views/admin/data/device/Index.vue'),
    name:'data_device',
}
]


export default DataRouter;