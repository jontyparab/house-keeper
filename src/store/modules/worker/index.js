import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state() {
    return {
      status: 'available',
      description: '',
      basePay: [900, 1200],
      selectedWorks: [],
      fromTime: new Date('Sun May 02 2000 09:00:00 GMT+0530 (India Standard Time)'),
      toTime: new Date('Sun May 02 2000 15:00:00 GMT+0530 (India Standard Time)'),
    }
  },
  mutations,
  actions,
  getters,
}