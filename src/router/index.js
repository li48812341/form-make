import Vue from 'vue'
import Router from 'vue-router'

import Home from '../demo/Home.vue'
import Test from '../demo/Test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/test',
      component: Test
    },
    {
      path: '/test2',
      component: () => import('../demo/Test2.vue')
    },
    {
      path: '/onchange',
      component: () => import('../demo/OnChange.vue')
    },
    {
      path: '/blank',
      component: () => import('../demo/Blank.vue')
    },
    {
      path: '/borderform',
      component: () => import('../demo/BorderForm.vue')
    },
    {
      path: '/setjson',
      component: () => import('../demo/SetJson.vue')
    },
    {
      path: '/cascader',
      component: () => import('../demo/Cascader.vue')
    },
    {
      path: '/bigdata',
      component: () => import('../demo/BigData.vue')
    },
    {
      path: '/setdata',
      component: () => import('../demo/SetData.vue')
    }
  ]
})