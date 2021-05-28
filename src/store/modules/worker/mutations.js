export default {
    saveWorker(state, payload) {
        state.status = payload.status;
        state.description = payload.description;
        state.basePay = payload.basePay;
        state.selectedWorks = payload.selectedWorks;
        state.fromTime = payload.fromTime;
        state.toTime = payload.toTime;
    },
    loadWorker(state, payload) {
        state.status = payload.status;
        state.description = payload.description;
        state.basePay = payload.basePay;
        state.selectedWorks = payload.selectedWorks;
        state.fromTime = payload.fromTime;
        state.toTime = payload.toTime;
    }
}