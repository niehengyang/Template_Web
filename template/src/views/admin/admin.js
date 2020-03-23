import App from './App.vue'


/* VueJs 通用基础组件 */
require("../bootstrap");

/* 第三方通用组件 */
import '@/bootstrap/3rd'

/* 项目自定义组件 */
require("@/bootstrap/project");

/* 路由 */
import router from './router';

/* api统一出口 */
import apis from '@/api/index'
Vue.prototype.$api = apis

/* Axios 全局配置 */
require('@/utils/customaxios')

/* 看门狗 */
require('@/bootstrap/guard')

/* 获取网站初始化数据 */
import portalApi from '@/api/portalApi'

/* 公共的mixin */
import chigoMixin from '@/utils/chigoMixin'




//引入DouDou Push
import doudou from "@/utils/DouDou";
Vue.prototype.$doudou = doudou;

/* 页面loading */
let pageLoading = Vue.prototype.$loading({
  'fullscreen': true,
  'text': '平台加载中，请稍后...'
})

Vue.config.productionTip = false

portalApi.initData().then(function (data) {
  pageLoading.close()
  console.log('permission', data)
  window.__permission_list__ = data.permission_list
  window.__login_user__ = data.login_user

  Vue.mixin(chigoMixin)

  new Vue(
    {
      router,
      i18n,
      render: h => h(App)
    }
  ).$mount('#app')
})