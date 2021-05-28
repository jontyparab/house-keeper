export default {
    saveUser(state, payload) {
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.phone = payload.phone;
        state.city = payload.city;
        state.address = payload.address;
        state.isWorker = payload.isWorker
    },
    loadUser(state, payload) {
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.phone = payload.phone;
        state.city = payload.city;
        state.address = payload.address;
        state.isWorker = payload.isWorker;
    },
}