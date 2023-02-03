import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueI18n from 'vue-i18n'

/** element */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {zIndex: 300})

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import VueEditor from "vue2-editor"
import CustomComponent from './demo/CustomComponent.vue'
import CustomVantField from './demo/VantField.vue'
import CustomChart from './demo/Chart.vue'
import axios from "./util/request"

Vue.use(VueEditor)

Vue.use(VueI18n)

Vue.prototype.$http = axios

// Vue.locale('en-US', {...enLocale})
// Vue.locale('zh-CN', {...zhLocale})


const i18n = new VueI18n({
  locale: 'zh-CN',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': {...zhLocale},   // 中文语言包
    'en-US': {...enLocale}   // 英文语言包
  }
})
Vue.config.lang = 'en-US'

import FormMaking from './index'
Vue.use(FormMaking, {
  components: [{
    name: 'custom-width-height',
    component: CustomComponent
  },{
    name: 'custom-chart',
    component: CustomChart
  },{
    name: 'custom-vant-field',
    component: CustomVantField
  }]
})

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
