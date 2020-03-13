const VersionRouter = [
    {
        path: '/version',
        component: () => import('@/views/admin/system/version/Index.vue'),
        children: [
            {
                path: 'android',
                component: () => import('@/views/admin/system/version/Android.vue'),
                name:'sys_versionD',
            },
            {
                path: 'ios',
                component: () => import('@/views/admin/system/version/Ios.vue'),
                name:'sys_versionI'
            }
        ]
    },
]


export default VersionRouter;