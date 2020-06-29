/* eslint-disable import/first */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'postcss-px-to-viewport'

// 引入MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
// 引入axios
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// 引入数据请求方法
import ajax from './methods/ajax.js'
Vue.prototype.ajax = ajax

// 调起模态框
import myModal from './methods/myModal.js'
Vue.prototype.myModal = myModal

// 引入vconsole
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.localToken)) {
    // 这里判断用户是否登录，验证本地存储是否有token
    if (!localStorage.localToken) { // 判断当前的token是否存在
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
