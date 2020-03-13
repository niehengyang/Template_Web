/**
 * 该文件用于导入基础的通用模块
 *
 */


window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */


/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
import TokenFactory from '@/utils/tokenfactory';
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 *
 * 导入Vue 及 Vue Router
 *
 */
import Vue from "vue"; //引入Vue
window.Vue = Vue;

import VueRouter from 'vue-router'; //引入vue-router
Vue.use(VueRouter); //使用vue-router
/*解决反复点同一个路由时报错的情况*/
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
/**
 *
 * 导入ElementUI
 *
 */
import ElementUI from 'element-ui'; //引入element-ui
import 'element-ui/lib/theme-chalk/index.css'; //引入element-ui样式文件
Vue.use(ElementUI); // 使用element-ui

/**
 * 导入语言包
 */
import i18n from './i18n/i18n'
window.i18n=i18n

// 兼容IE
import "babel-polyfill"
