
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 引入request接口文件
import request from 'common/request.js'
import requestSession from 'common/requestSession.js'

Vue.config.productionTip = false
Vue. prototype.$request = request
Vue. prototype.$requestSession = requestSession

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif