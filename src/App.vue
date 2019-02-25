<template>
    <div class="container">
        <div class="wrapper">
            <lucky-six />
            <last-ten :ballColor="ballColor"/>
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    import axios from 'axios';

    import LuckySix from './components/current/LuckySix.vue';
    import LastTen from './components/lastten/LastTen.vue';
    
    const configUrl = 'https://gcm-fra-staging-1.7platform.com:8008/get-lb';
    const query = 'token="token"&clientType="user"';
    const channel = '1d0d6713-b7c9-4f07-ab23-3451a06e8989';
    
    export default {
        components: {
            LuckySix,
            LastTen
        },
        methods: {
            ballColor(x) {
                const modulo = x%8
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
            },
            activeBall(data) {
                let newBall = {
                    id: data.id,
                    ball: data.ball,
                    eventId: data.eventId,
                    color: '',
                    active: true
                }
                
                let ball = data.ball;
                let modulo = (ball%8);
                
                newBall.color = this.ballColor(modulo);
                this.$store.commit('insertBall', {ball, newBall} );
                this.$store.commit('pushBall', newBall );
            }
        },
        created() {
            this.$store.dispatch('getLastTen');
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
                                    this.$store.commit('changeStatus', 'true');
                                    console.log((Date.now() - data.time));
                                    this.$store.state.time = Math.abs(Math.trunc((Date.now() - data.time)/1000) - 146);
                                    this.$store.commit('toggleCountdown');
                                    this.$store.commit('addSpecialOdds', data.specialOdds);
                                    break;
                                    case 'ball':
                                    data.balls.map(ball => this.activeBall(ball));
                                    break;
                                }
                                break;
                            case 'new':
                                console.log('new: ', data);
                                this.$store.commit('changeStatus', 'new');
                                this.$store.state.balls = Array(48).fill({
                                    id: '',
                                    ball: '',
                                    eventId: '',
                                    color: ''
                                });
                                break;
                            case 'ball':
                                console.log('ball: ', data);
                                this.$store.commit('changeStatus', 'false');
                                this.activeBall(data);
                            case 'results':
                                console.log('results: ', data);
                                break;
                            case 'countdown':
                                console.log('countdown: ', data);
                                this.$store.commit('addSpecialOdds', data.specialOdds);
                                this.$store.dispatch('getLastTen');
                                this.$store.commit('changeStatus', 'true');
                                this.$store.commit('emptyCurrent');
                                this.$store.state.time = 145;
                                this.$store.commit('toggleCountdown');
                                break;
                        }
                    }
                });
            });
            
        }
    }
</script>

<style lang="scss">
    @import 'assets/scss/style.scss';
</style>
