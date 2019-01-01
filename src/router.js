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
      component: Index,
      meta: {title: 'Intrigue Map'}
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
      meta: {title: 'Intrigue Map'}
    },
    {
      path: '/what/about/kult',
      name: 'kult',
      component: WhatAboutKult,
      meta: {title: 'What about Kult'}
    }
  ]
})
