import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { L } from 'vue2-leaflet'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'leaflet/dist/leaflet.css'
import VueAnalytics from 'vue-analytics'
import VueLodash from 'vue-lodash'

Vue.use(require('vue-shortkey'))

// this part resolve an issue where the markers would not appear
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

Vue.use(VueAnalytics, {
  id: 'UA-52309409-4',
  router
});

Vue.use(VueLodash);