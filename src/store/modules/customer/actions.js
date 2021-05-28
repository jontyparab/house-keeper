export default {
    saveCustomer({ commit }, payload) {
        if (payload.preferTime || payload.instructions) {
            commit('saveCustomer', payload)
        }
    },
    loadCustomer({ commit }, payload) {
        commit('loadCustomer', payload)
    },
}