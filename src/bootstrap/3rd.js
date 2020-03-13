import Vue from 'vue'
import VCharts from 'v-charts'
import BaiduMap from 'vue-baidu-map'

// 使用v-echarts
Vue.use(VCharts)
// 引入百度地图
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'cWKLfvYr931icSR1S4ecadHTGbYdfWGp'
})
