const PersonalRouter = [
    {
        path: '/personal',
        component: () => import('@/views/admin/personal/personalInfo.vue'),
        name:'personal',
    }
]


export default PersonalRouter;