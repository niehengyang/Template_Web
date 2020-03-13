const ToolsRouter = [
  {
      path: '/tools',
      component: () => import('@/views/admin/system/tools/Index.vue'),
      name:'sys_tools',
  }
]


export default ToolsRouter;