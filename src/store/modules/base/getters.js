export default {
    workersList(state) {
        return state.workersList;
    },
    jobs(state) {
        return state.jobs;
    },
    requests(state) {
        return state.requests;
    },
    lastFetch(state) {
        const lastFetch = state.lastFetch;
        const currentTimeStamp = new Date().getTime()
        // Last Fetch was more than a minute ago, then return true;
        if ((currentTimeStamp - lastFetch) / 1000 > 60) {
            return true;
        }
    }

}