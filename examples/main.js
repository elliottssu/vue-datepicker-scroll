import Vue from 'vue'
import App from './App.vue'

import DatePickerScroll from "../packages";
Vue.use(DatePickerScroll)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
