const LogRouter = [
    {
        path: '/log',
        component: () => import('@/views/admin/system/log/Index.vue'),
        children: [
            {
                path: 'system',
                component: () => import('@/views/admin/system/log/System.vue'),
                name:'sys_log'
            },
            {
                path: 'operate',
                component: () => import('@/views/admin/system/log/Operate.vue'),
                name:'sys_operate'
            }
        ]
    },
]


export default LogRouter;