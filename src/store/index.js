import Vue from 'vue'
import Vuex from 'vuex'
import session from './modules/session'
import google from './modules/google'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    session,
    google
  },
  strict: debug,
  //   plugins: debug ? [createLogger()] : []
})
