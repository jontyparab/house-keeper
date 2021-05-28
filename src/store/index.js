import { createStore } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import customerModule from './modules/customer/index.js'
import workerModule from './modules/worker/index.js'
import baseModule from './modules/base/index.js'
import authModule from './modules/auth/index.js'

export default createStore({
  strict: true,
  modules: {
    customer: customerModule,
    worker: workerModule,
    base: baseModule,
    auth: authModule
  },
  state() {
    return {
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      address: '',
      isWorker: false,
    }
  },
  getters: getters,
  actions: actions,
  mutations: mutations,
})
