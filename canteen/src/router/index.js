import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/pages/login'], resolve)
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/components/pages/home'], resolve)
    },
    {
      path: '/myiframe',
      name: 'myiframe',
      component: resolve => require(['@/components/pages/myiframe'], resolve)
    },
    {
      path: '/errMessage',
      name: 'ErrMessage',
      component: resolve => require(['@/components/pages/errMessage'], resolve)
    },
    {
      path: '/noLogin',
      name: 'NoLogin',
      component: resolve => require(['@/components/pages/NoLogin'], resolve)
    },
    {
      path: '/moreInfo',
      name: 'MoreInfo',
      component: resolve => require(['@/components/pages/MoreInfo'], resolve)
    },
    {
      path: '/selectPark',
      name: 'SelectPark',
      component: resolve => require(['@/components/pages/SelectPark'], resolve)
    },
    {
      path: '/settings',
      name: 'Settings',
      component: resolve => require(['@/components/pages/Settings'], resolve)
    },
    {
      path: '/udDataMobile',
      name: 'UdDataMobile',
      component: resolve => require(['@/components/pages/UdDataMobile'], resolve)
    },
    {
      path: '/pay',
      name: 'pay',
      component: resolve => require(['@/components/pages/pay'], resolve)
    }
  ]
})
