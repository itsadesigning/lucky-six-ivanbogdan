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
                this.$store.dispatch('setBall', {ball, newBall} );
                this.$store.dispatch('pushBall', newBall );
            },

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
                        this.$store.dispatch('setState', data);
                        console.log(data);
                        switch (eventType) {
                            case 'state':
                                switch (data.type) {
                                    case 'countdown':
                                    let newTime;
                                    this.$store.dispatch('setStatus', 'true');
                                    newTime = Math.abs(Math.trunc((Date.now() - data.time)/1000) - 146);
                                    this.$store.dispatch('setTime', newTime);
                                    this.$store.dispatch('activateCountdown');
                                    this.$store.dispatch('setSpecialOdds', data.specialOdds);
                                    break;
                                    case 'ball':
                                    data.balls.map(ball => this.activeBall(ball));
                                    break;
                                }
                                break;
                            case 'new':
                                this.$store.dispatch('emptyColors');
                                this.$store.dispatch('setStatus', 'new');
                                this.$store.dispatch('emptyBalls');
                                break;
                            case 'ball':
                                this.$store.dispatch('setStatus', 'false');
                                this.activeBall(data);
                            case 'results':
                                break;
                            case 'countdown':
                                this.$store.dispatch('setSpecialOdds', data.specialOdds);
                                this.$store.dispatch('getLastTen');
                                this.$store.dispatch('setStatus', 'true');
                                this.$store.dispatch('emptyCurrent');
                                this.$store.dispatch('setTime');
                                this.$store.dispatch('activateCountdown');
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
