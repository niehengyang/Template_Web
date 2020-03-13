const SysFaultRouter = [
  {
      path: '/faultManage',
      component: () => import('@/views/admin/system/faultManage/List.vue'),
      name:'sys_faultManage',
  },
]


export default SysFaultRouter;