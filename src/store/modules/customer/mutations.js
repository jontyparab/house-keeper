export default {
    saveCustomer(state, payload) {
        state.preferTime = payload.preferTime;
        state.instructions = payload.instructions;
    },
    loadCustomer(state, payload) {
        state.preferTime = payload.preferTime;
        state.instructions = payload.instructions;
    }
}