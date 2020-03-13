const UserRouter = [
    {
        path: '/sys',
        component: () => import('@/views/admin/system/user/Index.vue'),
        children: [
            {
                path: '/',
                component: () => import('@/views/admin/system/user/List.vue'),
                name:'sys_user'
            },
            {
                path: 'role',
                component: () => import('@/views/admin/system/user/Role.vue'),
                name:'sys_role'
            },
            {
                path: 'detail',
                component: () => import('@/views/admin/system/user/Detail'),
                name:'sys_userDetail'
            }
        ]
    },
]


export default UserRouter;