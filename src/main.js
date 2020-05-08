// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引用vue的相关实用工具模块
import router from './router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import store from './store'

// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 引入filter
import * as filters from './utils/filters'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})




Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(Vuex)

NProgress.inc(0.2)
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
}).$http.interceptors.push((request, next) => {
  NProgress.start();
  next((response) => {
    NProgress.done();
  })
})
