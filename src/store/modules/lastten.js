import axios from 'axios';

const state = {
    lastTen: [],
};

const getters = {
    
};

const mutations = {
    setLastTen(state, payload) {
        state.lastTen = payload;
    },
};

const actions = {
    getLastTen({commit}) {
        axios.get('https://services-staging.7platform.com/web/events/1d0d6713-b7c9-4f07-ab23-3451a06e8989.json?count=11')
            .then((res) => {
                commit('setLastTen', res.data);
            }).catch((error) => console.log(error));
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}