import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
    state() {
        return {
            isLoggedIn: false,
            email: '',
            password: '',
            id: null,
            token: null,
            tokenExpiration: null,
        }
    },
    getters,
    mutations,
    actions
}