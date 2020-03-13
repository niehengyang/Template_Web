const KnowledgeRouter = [
    {
        path: '/knowledge',
        component: () => import('@/views/admin/knowledge/Equipment.vue'),
        name:'knowledge',
    },
    {
        path: '/knowledge_info',
        component: () => import('@/views/admin/knowledge/FaultData.vue'),
        name:'knowledge_info'
    }
]


export default KnowledgeRouter;