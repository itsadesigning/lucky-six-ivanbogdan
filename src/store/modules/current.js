import axios from 'axios';

const state = {
    state: '',
    countdownState: false,
    countdownTextBelow: '',
    time: 146,
    status: '',
    specialOdds: [],
    currentBalls: [],
    balls: Array(48).fill({
        id: '',
        ball: '',
        eventId: '',
        color: '',
    }),
    colors: [
        {color: 'red', balls: 0},
        {color: 'green', balls: 0},
        {color: 'blue', balls: 0},
        {color: 'purple', balls: 0},
        {color: 'brown', balls: 0},
        {color: 'yellow', balls: 0},
        {color: 'orange', balls: 0},
        {color: 'white', balls: 0}],
    
}

const getters = {
    countdownText(state) {
        switch(state.status) {
            case 'false':
            return 'GAME IN PROGRESS...'
            break;
            case 'new':
            return 'DRAWING BALLS...'
            break;
            case 'true':
            return 'COUNTDOWN: ' + state.time;
            break;
            default: 
            return 'WAIT UNTIL NEXT ROUND...';
        }
    },
};

const mutations = {
    setBall(state, {ball, newBall}) {
        let index = state.colors.findIndex((color) => {
            return color.color == newBall.color
        });
        state.colors[index].balls++;
        console.log(state.colors[index]);
        state.balls.splice(ball-1, 1, newBall);
    },
    setState(state, payload) {
        state.state = payload;
    },
    pushBall(state, payload) {
        state.currentBalls.push(payload);
    },
    setTime(state, payload) {
        state.time = payload;
    },
    setStatus(state, payload){
        state.status = payload;
    },
    setSpecialOdds(state,payload) {
        state.specialOdds = payload;
    },
    emptyCurrent(state, payload) {
        state.currentBalls = [];
    },
    emptyColors(state, payload) {
        state.colors.map((color) => color.balls = 0)
    },
    activateCountdown(state, payload) {
        let interval = setInterval(() => {
            state.time--;
            console.log('TIME:', state.time);
            switch(state.time) {
                case 144:
                    state.countdownTextBelow = `${state.specialOdds[0].name} Odds: ${state.specialOdds[0].odds}` ;        
                break;
                case 120:
                    state.countdownTextBelow = `${state.specialOdds[1].name} Odds: ${state.specialOdds[1].odds}` ;    
                break;
                case 100:
                    state.countdownTextBelow = `${state.specialOdds[2].name} Odds: ${state.specialOdds[2].odds}` ;
                break;
                case 80:
                    state.countdownTextBelow = `${state.specialOdds[3].name} Odds: ${state.specialOdds[3].odds}` ;
                break;
                case 60:
                    state.countdownTextBelow = `${state.specialOdds[4].name} Odds: ${state.specialOdds[4].odds}` ;
                break;
                case 40:
                    state.countdownTextBelow = `${state.specialOdds[5].name} Odds: ${state.specialOdds[5].odds}` ;
                break;
                case 20:
                    state.countdownTextBelow = `${state.specialOdds[0].name} Odds: ${state.specialOdds[0].odds}` ;
                break;
                case 0: 
                    state.time = 146;
                    clearInterval(interval);
                break;
            }
        }, 1000);
    }
};

const actions = {
    setState({commit}, payload) {
        commit('setState', payload);
    },
    setBall({commit}, payload) {
        commit('setBall', payload);
    },
    pushBall({commit}, payload) {
        commit('pushBall', payload);
    },
    activateCountdown({commit}) {
        commit('activateCountdown');
    },
    setTime({commit}, payload = 146) {
        commit('setTime', payload);
    },
    setStatus({commit}, payload) {
        commit('setStatus', payload);
    },
    setSpecialOdds({commit}, payload) {
        commit('setSpecialOdds', payload);
    },
    emptyCurrent({commit}, payload) {
        commit('emptyCurrent', payload);
    },
    emptyColors({commit}, payload) {
        commit('emptyColors', payload);
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}