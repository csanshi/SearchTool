import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/pages/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/tool'
    },
    {
      path: '/tool',
      component: layout,
      redirect: '/tool/index',
      children: [{
        path: 'index',
        name: 'index',
        component: () => import('@/pages/index')
      },{
        path: 'admin',
        name: 'admin',
        component: () => import('@/pages/admin')
      }]
    }
  ]
})
