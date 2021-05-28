import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: new Date().getTime(),
      workersList: [],
      requests: [],
      jobs: [
        { label: "House Cleaning" },
        { label: "Car Cleaning" },
        { label: "Washing Clothes" },
        { label: "Washing Utensils" },
        { label: "Gardening" },
        { label: "Cooking" },
      ],
    }
  },
  getters,
  mutations,
  actions,
}
