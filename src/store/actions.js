import { BASE_URL } from '../../local-settings/local-settings.js'
export default {
    async saveUser(context, payload) {
        const id = context.getters['id']
        context.dispatch('worker/saveWorker', payload, { root: true })
        context.dispatch('customer/saveCustomer', payload, { root: true })
        context.commit('saveUser', payload)
        const userDetails = {
            id: id,
            firstName: context.getters['firstName'],
            lastName: context.getters['lastName'],
            phone: context.getters['phone'],
            city: context.getters['city'],
            address: context.getters['address'],
            preferTime: context.getters['customer/preferTime'],
            instructions: context.getters['customer/instructions'],
            status: context.getters['worker/status'],
            description: context.getters['worker/description'],
            basePay: context.getters['worker/basePay'],
            selectedWorks: context.getters['worker/selectedWorks'],
            fromTime: context.getters['worker/fromTime'],
            toTime: context.getters['worker/toTime'],
            isWorker: context.getters['isWorker'],
        }
        const token = context.getters.token;
        console.log('saveUser ran')
        const response = await fetch(`${BASE_URL}/users/${id}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(userDetails)
        })
        const data = await response.json()
        if (!response.ok) {
            const error = new Error(data.message || 'Failed to save user.')
            throw error
        }

        if (data.isWorker) {
            context.dispatch('base/addWorkerIntoList', data, { root: true })
        }

    },

    async loadUser(context) {
        const id = context.getters['id']
        const token = context.getters.token;
        const response = await fetch(`${BASE_URL}/users/${id}.json?auth=${token}`)
        const data = await response.json()
        if (!response.ok) {
            const error = new Error(data.message || 'Failed to load user.')
            throw error
        }
        if (data) {
            data.preferTime = new Date(data.preferTime);
            data.fromTime = new Date(data.fromTime);
            data.toTime = new Date(data.toTime);
            context.dispatch('worker/loadWorker', data)
            context.dispatch('customer/loadCustomer', data)
            context.dispatch('base/loadRequests', data)

            context.commit('loadUser', data)
        }
    },

}