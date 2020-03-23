import TokenFactory from '@/utils/tokenfactory'
import Vue from 'vue'

if (TokenFactory.getToken()) {
  window.location.href = '/admin/'
}else{
  window.location.href = '/login/'
}

new Vue(Vue.util.extend(App)).$mount('#app')
