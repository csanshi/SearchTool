/**
 * Created by sanshi on 4/18/20.
 */
import Vuex from 'vuex'
import Vue from 'vue'

import user from './modules/user'
import admin from './modules/admin'

Vue.use(Vuex)


export default new Vuex.Store ({
  modules: {
    user,
    admin
  }
})
