import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Map from './views/Map.vue'
import WhatAboutKult from './views/WhatAboutKult.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path: '/what/about/kult',
      name: 'kult',
      component: WhatAboutKult
    }
  ]
})
