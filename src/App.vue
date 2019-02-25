<template>
    <div class="container">
        <div class="wrapper">
            <div class="main">
                <div class="countdown">{{ $store.getters.countdownText }}</div> 
                <div class="balls-grid" v-if="$store.state.status !== 'true'">
                    <ball-item 
                        v-for="(ball, index) in $store.state.balls" 
                        :ball="ball"
                        :index="index"
                        :key="index"
                    />
                    <div v-for="(color, index) in $store.state.colors" class="balls-grid__color" :class="color" :style="{backgroundColor: color}" :key="index + '_color'"></div>
                </div>
                <div class="countdownText" v-else>
                    <span>{{ $store.state.countdownTextBelow }}</span>
                </div>
            </div>
            <div class="lastTen">
                <div class="lastTen__round" v-for="round in $store.state.lastTen" :key="round.eventId">
                    <div class="lastTen__roundDetails">
                        <span>Event: {{ round.eventId }}</span> | <span>{{ milisecToDate(round.eventTime) }}</span>
                    </div>
                    <div class="lastTen__roundBallDetails"> 
                        <div class="lastTen__roundBallDetailsLeft">
                            <div class="lastTen__roundBallDetailsLeftTop">
                                <div><span>Pre balls:</span>
                                <div class="lastTen__roundBallDetailsLeftBalls">
                                <div 
                                    class="lastTen__roundBallDetailsLeftBallsItem"
                                    :class="ballColor(ball.ball)"
                                    v-for="ball in round.balls.slice(0,6)" 
                                    :key="ball.id">
                                {{ ball.ball }}
                                </div>
                                </div>
                                </div>
                                <div><span>Bonus balls:</span>
                                <div class="lastTen__roundBallDetailsLeftBalls">
                                <div 
                                    class="lastTen__roundBallDetailsLeftBallsItem"
                                    :class="ballColor(ball)"
                                    v-for="ball in round.bonusBalls" 
                                    :key="ball.id">
                                {{ ball }}
                                </div>
                                </div>
                                </div>
                            </div>
                            <div class="lastTen__roundBallDetailsLeftBottom">
                                <span>Drawn balls:</span>
                                <div class="lastTen__roundBallDetailsLeftBalls">
                                <div 
                                    class="lastTen__roundBallDetailsLeftBallsItem"
                                    :class="ballColor(ball.ball)"
                                    v-for="ball in round.balls" 
                                    :key="ball.id">
                                {{ ball.ball }}
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="lastTen__roundBallDetailsRight">
                            <span>First Ball Color:</span><span class="right">RED</span>
                            <span>Pre Numbers Sum (-122.5+):</span><span class="right">UNDER</span>
                            <span>First Number Even/Odd:</span><span class="right">EVEN</span>
                            <span>First Number (-24.5+):</span><span class="right">OVER</span>
                            <span>Even/Odd Pre Numbers:</span><span class="right">EVEN</span>
                            <span>Color Betting:</span><span class="right">NONE</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    import axios from 'axios';

    import BallItem from './BallItem.vue';
    
    const configUrl = 'https://gcm-fra-staging-1.7platform.com:8008/get-lb';
    const query = 'token="token"&clientType="user"';
    const channel = '1d0d6713-b7c9-4f07-ab23-3451a06e8989';
    
    export default {
        components: {
            BallItem,

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
            getLastTen() {

            },
            milisecToDate(time) {
                const d = new Date(time);
                const ds = d.toString('MM/dd/yy HH:mm:ss');
                return ds;
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
            }
        },
        created() {
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
                                    active: false,
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
                                this.$store.dispatch('getLastTen');
                                this.$store.commit('changeStatus', 'true');
                                this.$store.state.time = 145;
                                this.$store.commit('toggleCountdown');
                                break;
                        }
                    }
                });
            });
            this.$store.dispatch('getLastTen');
        }
    }
</script>

<style lang="scss">

    * {
        margin: 0;
        padding: 0;
        font-family: 'Montserrat', Tahoma, Geneva, Verdana, sans-serif;
    }

    .container {
        background-color: #111;
        min-height: 100vh;
    }

    .wrapper {
        margin: auto;
        width: 80%;
        padding: 20px;
    }

    .main {
        background-color: #333;
        padding: 15px;
    }

    .countdown {
        background-color: #333;
        text-align: center;
        padding-bottom: 1em;
        color: white;
    }

    .balls-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-gap: 20px;
        background-color: #333;
        color: gray;
    }

    .balls-grid__color {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        margin: auto;
    }

    .balls-grid__color--full {
        
    }

    .countdownText {
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        height: 300px;
        color: white;
    }

    .lastTen__round {
        font-size: 0.8em;
        margin-top: 10px;
    }
    
    .lastTen__roundDetails {
        background-color: #333;
        padding: 5px;
    }

    .lastTen__roundBallDetails {
        display: grid;
        grid-template-columns: 3fr 1fr;
        grid-gap: 10px;
        background-color: #333;
        padding: 5px;
        margin-top: 3px;
    }

    .lastTen__roundBallDetailsRight {
        font-size: 0.7em;
        color: lightskyblue;
        display: grid;
        grid-template-columns: auto auto;
    }

    .lastTen__roundBallDetailsLeftTop {
        display: grid;
        grid-template-columns: 1fr 2fr;
    }

    .lastTen__roundBallDetailsLeftBallsItem {
        display: block;
        width: 15px;
        height: 15px;
        border: 1px solid gray;
        border-radius: 50%;
        position: relative;
        font-size: 0.7em;
        line-height: 15px;
        text-align: center;
        margin: auto;
    }

    .lastTen__roundBallDetailsLeftBalls {
        padding: 5px;
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(17px, 1fr));
        grid-gap: 3px;
    }

    .right {
        text-align: right;
    }

</style>
