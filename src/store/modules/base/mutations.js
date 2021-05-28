export default {
    addWorkerIntoList() {
        //Do something i guess...
    },
    loadWorkersList(state, payload) {
        state.workersList.length = 0;
        for (const key in payload) {
            state.workersList.push(payload[key])
        }
    },
    saveRequest(state, payload) {
        for (let i = 0; i <= state.requests.length - 1; i++) {
            if (state.requests[i].requestId == payload.requestId) {
                Object.assign(state.requests[i], payload)
                return;
            }
        }
        state.requests.push(payload)
    },
    loadRequests(state, payload) {
        state.requests.length = 0;
        for (const key in payload) {
            state.requests.push(payload[key]);
        }
    },
    cancelRequest(state, payload) {
        for (let i = 0; i <= state.requests.length - 1; i++) {
            if (state.requests[i].requestId == payload) {
                //splice for mutating the original array
                state.requests.splice(i, 1)
                break;
            }
        }
    },
    acceptRequest(state, payload) {
        state.requests.find((request) => {
            if (request.requestId == payload) {
                request.requestState = 'accepted'
            }
        })
    },
    declineRequest(state, payload) {
        state.requests.find((request) => {
            if (request.requestId == payload) {
                request.requestState = 'declined'
            }
        })
    },
    setFetchTimeStamp(state) {
        state.lastFetch = new Date().getTime();
    }
}