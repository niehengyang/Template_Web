const OtaRouter = [
    {
        path: '/ota',
        component: () => import('@/views/admin/system/ota/List.vue'),
    }, 
    {
        path: '/upgrade',
        component: () => import('@/views/admin/system/ota/Index.vue'),
        name: 'upgrade',
        children: [
            {
                path: 'toupgrade/:ota_id',
                component: () => import('@/views/admin/system/ota/Upgrade.vue'),
                name:'toupgrade'
            },
            {
                path: 'updating/:ota_id',
                component: () => import('@/views/admin/system/ota/Updating.vue'),
                name:'updating'
            },
            {
                path: 'finished/:ota_id',
                component: () => import('@/views/admin/system/ota/Finished.vue'),
                name:'finished'
            },
            {
                path: 'failed/:ota_id',
                component: () => import('@/views/admin/system/ota/Failed.vue'),
                name:'failed'
            },
        ]
    }
]


export default OtaRouter;