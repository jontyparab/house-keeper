import router from '../../../router/index.js'
import { YOUR_API_KEY } from '../../../../local-settings/local-settings.js'

let timer;
export default {
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload, mode: 'signup'
        })
    },
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload, mode: 'login'
        })
    },
    tryLogin(context) {
        const idToken = localStorage.getItem('token')
        const localId = localStorage.getItem('userId')
        const tokenExpiration = localStorage.getItem('tokenExpiration')

        const expiresIn = +tokenExpiration - new Date().getTime()

        // if expiresIn negative or 0 then don't autoLogin
        if (expiresIn < 0) {
            return
        }

        timer = setTimeout(() => {
            context.dispatch('logout')
        }, expiresIn);

        if (idToken && localId) {
            context.commit('auth', { idToken: idToken, localId: localId })
        }
    },
    logout(context) {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('tokenExpiration')

        clearTimeout(timer);
        context.commit('logout')
        router.go(0);
    },
    async auth(context, payload) {
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${YOUR_API_KEY}`
        if (payload.mode == 'signup') {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${YOUR_API_KEY}`
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        const data = await response.json()
        if (!response.ok) {
            const error = new Error(data.message || 'Could\'t Authenticate. Please check your credentials.');
            throw error;
        }
        const expiresIn = +data.expiresIn * 1000;
        // const expiresIn = 20000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('tokenExpiration', expirationDate)

        timer = setTimeout(() => {
            context.dispatch('logout')
        }, expiresIn);

        context.commit('auth', { idToken: data.idToken, localId: data.localId })

        try {
            await context.dispatch('base/loadWorkersList', { root: true })
            if (payload.mode == 'signup') {
                const newUserData = { ...payload, isWorker: false }
                await context.dispatch('saveUser', newUserData)
            }
            await context.dispatch('loadUser')
        } catch (error) {
            console.log(error.message)
        }
    }
}