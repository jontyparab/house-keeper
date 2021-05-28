export default {
    saveWorker(context, payload) {
        if (payload.isWorker && payload.fromTime && payload.toTime) {
            context.commit('saveWorker', payload)
        }
    },
    loadWorker(context, payload) {
        context.commit('loadWorker', payload)
    },
}