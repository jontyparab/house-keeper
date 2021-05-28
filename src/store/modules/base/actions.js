import { BASE_URL } from '../../../../local-settings/local-settings.js'

export default {
    //WORKERLIST
    async loadWorkersList(context, payload = false) {
        if (!payload && !context.getters.lastFetch) {
            return;
        }
        context.commit('setFetchTimeStamp')
        //const token = context.rootGetters.token;
        const response = await fetch(`${BASE_URL}/workersList.json`)
        const data = await response.json()
        if (!response.ok) {
            const error = new Error(data.message || 'Failed to fetch workers list.')
            throw error;
        }
        for (const key in data) {
            if (data[key].id == context.rootGetters.id) {
                delete data[key]
            }
        }
        context.commit('loadWorkersList', data)
    },

    async addWorkerIntoList(context, payload) {
        const worker = { ...payload, image: "avatar.jpg" };
        ['address', 'preferTime', 'instructions', 'isWorker'].forEach(e => delete worker[e]);
        const token = context.rootGetters.token;
        const response = await fetch(`${BASE_URL}/workersList/${worker.id}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(worker)
        })
        const data = await response.json()
        if (!response.ok) {
            const error = new Error(data.message || 'Failed to Add worker to list.')
            throw error;
        }
        context.commit('addWorkerIntoList', data)
    },

    //REQUESTS
    async loadRequests(context, payload = false) {
        if (!payload && !context.getters.lastFetch) {
            return;
        }
        context.commit('setFetchTimeStamp')

        const token = context.rootGetters.token;
        const response = await fetch(`${BASE_URL}/requests.json?auth=${token}`)
        const data = await response.json()
        if (!response.ok) {
            const error = new Error(data.message || 'Failed to fetch requests.')
            throw error;
        }
        const id = context.rootGetters.id;
        for (const key in data) {
            if ((data[key].customerId == id || data[key].workerId == id) && (data[key].customerId != data[key].workerId)) {
                data[key].preferTime = new Date(data[key].preferTime);
            } else {
                delete data[key]
            }
        }
        context.commit('loadRequests', data)
    },

    async saveRequest(context, payload) {
        const requestId = payload.customerId + '-' + payload.workerId; //customerId + '-' + workerId
        const request = { ...payload, requestState: 'pending', requestId: requestId }
        const token = context.rootGetters.token;
        const response = await fetch(`${BASE_URL}/requests/${requestId}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(request)
        })
        const data = await response.json()
        if (!response.ok) {
            const error = new Error(data.message || 'Failed to save request')
            throw error;
        }
        context.commit('saveRequest', data)
    },

    async cancelRequest(context, payload) {
        const token = context.rootGetters.token;
        const response = await fetch(`${BASE_URL}/requests/${payload}.json?auth=${token}`, {
            method: 'DELETE'
        })
        const data = await response.json()

        if (!response.ok) {
            const error = new Error(data.message || 'Failed to cancel request')
            throw error;
        }
        context.commit('cancelRequest', payload)
    },

    async acceptRequest(context, payload) {
        const token = context.rootGetters.token;
        const response = await fetch(`${BASE_URL}/requests/${payload}.json?auth=${token}`, {
            method: 'PATCH',
            body: JSON.stringify({ requestState: 'accepted' })
        })
        const data = await response.json()

        if (!response.ok) {
            const error = new Error(data.message || 'Failed to accept request')
            throw error;
        }
        context.commit('acceptRequest', payload)
    },

    async declineRequest(context, payload) {
        const token = context.rootGetters.token;
        const response = await fetch(`${BASE_URL}/requests/${payload}.json?auth=${token}`, {
            method: 'PATCH',
            body: JSON.stringify({ requestState: 'declined' })
        })
        const data = await response.json()
        if (!response.ok) {
            const error = new Error(data.message || 'Failed to decline request')
            throw error;
        }
        context.commit('declineRequest', payload)
    },
}