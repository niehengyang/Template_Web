import VueRouter from 'vue-router'
import Home from '@/views/admin/home/Index';

/* 初始路由模块 */
let routeArray = [
    {
        path: '/',
        redirect: '/home/'
    },
    {
        path: '/home/',
        component: Home,
        name: 'home'
    },
];

/* import路由模块 */
import Template from "@/router/Template.js"


routeArray = routeArray.concat(Template);

export default new VueRouter({
    mode: 'hash',
    routes: routeArray
})