import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state() {
    return {
      preferTime: new Date('Sun May 02 2000 09:00:00 GMT+0530 (India Standard Time)'),
      instructions: '',
    }
  },
  mutations,
  actions,
  getters,
}