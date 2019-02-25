const state = {

};

const getters = {
    countdownText(state, getters, rootState) {
        console.log(rootState);
        switch(rootState.status) {
            case 'false':
            return 'GAME IN PROGRESS...'
            break;
            case 'new':
            return 'DRAWING BALLS...'
            break;
            case 'true':
            return 'COUNTDOWN: ' + rootState.time;
            break;
            default: 
            return 'WAIT UNTIL NEXT ROUND...';
        }
    },
};

const mutations = {
    
};

const actions = {
    
};

export default {
    state,
    mutations,
    actions,
    getters
}