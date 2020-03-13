const MessageRouter = [
    {
        path: '/message',
        component: () => import('@/views/admin/system/message/List.vue'),
        name:'sys_msg',
    },
    {
        path: '/message/detail',
        component: () => import('@/views/admin/system/message/Detail.vue'),
        name:'msg_detail',
    },
    {
        path: '/message/dialogue',
        component: () => import('@/views/admin/system/message/Dialogue.vue'),
        name: 'msg_dialog'
    }
]


export default MessageRouter;