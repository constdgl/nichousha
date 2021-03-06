import App from './App'
import store from './store/index.js'
import cuCustom from './colorui/components/cu-custom.vue'
import loading8 from "./components/loading8.vue";
Vue.component('cu-custom',cuCustom)
Vue.component('loading',loading8)
import uView from "uview-ui";
Vue.use(uView);
require('./utils/plugins.js')

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
