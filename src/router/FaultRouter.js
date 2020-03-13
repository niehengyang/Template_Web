const UserRouter = [
    {
        path: '/alarm',
        component: () => import('@/views/admin/fault/List.vue'),
        name:'alarm_fault',
    },
    {
        path:'/rule',
        component: () => import('@/views/admin/rule/List.vue'),
        name:'alarm_rule'
    }
]


export default UserRouter;