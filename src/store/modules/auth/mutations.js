export default {
    auth(state, payload) {
        state.isLoggedIn = true;
        state.token = payload.idToken;
        state.id = payload.localId;
    },
    logout(state) {
        state.isLoggedIn = false;
        state.id = null;
        state.token = null;
    }
}