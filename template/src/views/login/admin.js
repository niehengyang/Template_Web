/**
 * 如果用户已经有Token则跳转到管理网站中
 */
/* VueJs 通用基础组件 */
require('../bootstrap')
import TokenFactory from '@/utils/tokenfactory'
import App from './App'
import VueRouter from 'vue-router'
import Reset from './Reset'
import Login from './login.vue'

/* Axios 全局配置 */
// require('@/utils/customaxios')

if (TokenFactory.getToken()) {
  window.location.href = '/admin/'
}

let router=new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/index/'
    },
    {
      path:'/index/',
      component:Login,
    },
    {
    path:'/reset',
    component: Reset,
    }
  ]
})
new Vue(Vue.util.extend({ i18n, router}, App)).$mount('#app')
