 /* 设备接入配置相关路由 */

 const DeviceConfigRouter = [
     {
         path: '/devicetype/',
         component: () => import('@/views/admin/deviceConfig/Index'),
         children:[
             {
                 path: '/',
                 component: () => import('@/views/admin/deviceConfig/Type'),
                 name:'device_type',
             },
             {
                 path: 'devicemodel/',
                 component: () => import('@/views/admin/deviceConfig/Model'),
                 name:'device_model',
             } 
         ]
     },
     {
         path: '/devicetype/:dt_id',
         component: () => import('@/views/admin/deviceConfig/configTemplate/Index'),
         children:[
             {
                 path: 'dataflow/',
                 component: () => import('@/views/admin/deviceConfig/configTemplate/Parameter'),
                 name:'device_dataflow'
             },
             {
                 path: 'rule/',
                 component:  () => import('@/views/admin/deviceConfig/configTemplate/Rule.vue'),
                 name:'device_Rule'
             },
             {
                 path: 'uploadratio/',
                 component: () => import('@/views/admin/deviceConfig/configTemplate/Frequency'),
                 name:'device_uploadratio'
             }
         ]
     },
 ];

 export default DeviceConfigRouter;