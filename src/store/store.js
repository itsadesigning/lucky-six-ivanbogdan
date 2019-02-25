import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import io from 'socket.io-client';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        status: '',
        lastTen: [],
        time: 146,
        countdownState: false,
        countdownTextBelow: '',
        currentBalls: [],
        balls: Array(48).fill({
            id: '',
            ball: '',
            eventId: '',
            color: '',
        }),
        specialOdds: [],
        colors: ['red', 'green', 'blue', 'purple', 'brown', 'yellow', 'orange', 'white'],
    },
    getters: {
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
        getColor(x) {
            const modulo = x%8;
            switch(modulo) {
                case 1:
                return 'red';
                break;
                case 2:
                return 'green';
                break;
                case 3:
                return 'blue';
                break;
                case 4:
                return 'purple';
                break;
                case 5:
                return 'brown';
                break;
                case 6:
                return 'yellow';
                break;
                case 7:
                return 'orange';
                break;
                case 0:
                return 'white';
                break;
            }
        }
    },
    mutations: {
        addSpecialOdds(state,payload) {
            state.specialOdds = payload;
        },
        insertLastTen(state, payload) {
            state.lastTen = payload;
        },
        pushBall(state, payload) {
            state.currentBalls.push(payload);
        },
        emptyCurrent(state, payload) {
            state.currentBalls = [];
        },
        insertBall(state, {ball, newBall}) {
            state.balls.splice(ball-1, 1, newBall);
        },
        changeStatus(state, payload) {
            state.status = payload;
        },
        toggleCountdown(state, payload) {
            state.countdownState = !state.countdownState;
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
    },
    actions: {
        getLastTen(context) {
            axios.get('https://services-staging.7platform.com/web/events/1d0d6713-b7c9-4f07-ab23-3451a06e8989.json?count=11')
                .then((res) => {
                    context.commit('insertLastTen', res.data);
                }).catch((error) => console.log(error));
        },
        /* socket(context) {

            const configUrl = 'https://gcm-fra-staging-1.7platform.com:8008/get-lb';
            const query = 'token="token"&clientType="user"';
            const channel = '1d0d6713-b7c9-4f07-ab23-3451a06e8989';

            axios.get(configUrl).then((res) => {
                const socketUrl = res.data.url;
                const socket = io(socketUrl, {query});
                socket.on('connect', () => {
                    socket.emit('subscribe', {
                        channel,
                        subChannes: {
                            language: 'en',
                            deliveryPlatform: 'Web',
                            playerUuid: null
                        }
                    })
                });
                socket.on(channel, (res) => {
                    if (res) {
                        const eventType = res.type;
                        const data = res.data;
                        switch (eventType) {
                            case 'state':
                                console.log('state: ', data);
                                switch (data.type) {
                                    case 'countdown':
                                    context.commit('changeStatus', 'true');
                                    console.log((Date.now() - data.time));
                                    context.state.time = Math.abs(Math.trunc((Date.now() - data.time)/1000) - 146);
                                    context.commit('toggleCountdown');
                                    break;
                                    case 'ball':
                                    data.balls.map(ball => this.activeBall(ball));
                                    break;
                                }
                                break;
                            case 'new':
                                console.log('new: ', data);
                                context.commit('changeStatus', 'new');
                                context.state.balls = Array(48).fill({
                                    id: '',
                                    ball: '',
                                    eventId: '',
                                    active: false,
                                    color: ''
                                });
                                break;
                            case 'ball':
                                console.log('ball: ', data);
                                context.commit('changeStatus', 'false');
                                this.activeBall(data);
                            case 'results':
                                console.log('results: ', data);
                                break;
                            case 'countdown':
                                console.log('countdown: ', data);
                                context.dispatch('getLastTen');
                                context.commit('changeStatus', 'true');
                                context.state.time = 145;
                                context.commit('toggleCountdown');
                                break;
                        }
                    }
                });
            });
        } */
    }
});


