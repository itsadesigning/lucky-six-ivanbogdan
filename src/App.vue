<template>
    <div class="container">
        <div class="wrapper">
            <div class="main">
                <div class="countdown">{{ countdownText }}</div> 
                <div class="balls-grid" v-if="this.state !== 'true'">
                    <ball-item 
                        v-for="(ball, index) in balls" 
                        :ball="ball"
                        :index="index"
                        :key="index"
                    />
                    <div v-for="(color, index) in colors" class="balls-grid__color" :class="color" :style="{backgroundColor: color}" :key="index + '_color'"></div>
                </div>
                <div class="countdownText" v-else>
                    <span>{{ countdownTextBelow }}</span>
                </div>
            </div>
            <div class="lastTen">
                <div class="lastTen__round" v-for="round in lastTen" :key="round.eventId">
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
                    <!-- <ball-item 
                        v-for="(ball, index) in balls" 
                        :ball="ball"
                        :index="index"
                        :key="index"
                    /> -->
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
        data: function() {
            return {
                colors: ['red', 'green', 'blue', 'purple', 'brown', 'yellow', 'orange', 'white'],
                balls: Array(48).fill({
                    id: '',
                    ball: '',
                    eventId: '',
                    active: false,
                    color: ''
                }),
                state: '',
                countdownTime: false,
                countdownTextBelow: '',
                lastTen: [],
                time: 146
            }
        },
        computed: {
            countdownText() {
                switch(this.state) {
                    case 'false':
                    return 'GAME IN PROGRESS...'
                    break;
                    case 'new':
                    return 'DRAWING BALLS...'
                    break;
                    case 'true':
                    return 'COUNTDOWN: ' + this.time;
                    break;
                    default: 
                    return 'WAIT UNTIL NEXT ROUND...';
                }
            }
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
            axios.get('https://services-staging.7platform.com/web/events/1d0d6713-b7c9-4f07-ab23-3451a06e8989.json?count=11')
                .then((res) => {
                    this.lastTen = res.data;
                    console.log(this.lastTen);
                    });
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

                let modulo = (data.ball%8);
                
                switch(modulo) {
                    case 1:
                    newBall.color = 'red';
                    this.balls.splice(data.ball-1, 1, newBall);
                    break;
                    case 2:
                    newBall.color = 'green';
                    this.balls.splice(data.ball-1, 1, newBall);
                    break;
                    case 3:
                    newBall.color = 'blue';
                    this.balls.splice(data.ball-1, 1, newBall);
                    break;
                    case 4:
                    newBall.color = 'purple';
                    this.balls.splice(data.ball-1, 1, newBall);
                    break;
                    case 5:
                    newBall.color = 'brown';
                    this.balls.splice(data.ball-1, 1, newBall);
                    break;
                    case 6:
                    newBall.color = 'yellow';
                    this.balls.splice(data.ball-1, 1, newBall);
                    break;
                    case 7:
                    newBall.color = 'orange';
                    this.balls.splice(data.ball-1, 1, newBall);
                    break;
                    case 0:
                    newBall.color = 'white';
                    this.balls.splice(data.ball-1, 1, newBall);
                    break;
                }
            }
        },
        watch: {
            countdownTime() {
                console.log('COUNTDOWN INITIATED');
                let interval = setInterval(() => {
                    this.time--;
                    console.log('TIME:', this.time);
                    switch(this.time) {
                        case 145:
                            this.countdownTextBelow = '1';        
                        break;
                        case 120:
                            this.countdownTextBelow = '2';    
                        break;
                        case 100:
                            this.countdownTextBelow = '3';
                        break;
                        case 80:
                            this.countdownTextBelow = '4';
                        break;
                        case 60:
                            this.countdownTextBelow = '5';
                        break;
                        case 40:
                            this.countdownTextBelow = '6';
                        break;
                        case 20:
                            this.countdownTextBelow = '7';
                        break;
                        case 0: 
                            clearInterval(interval);
                        break;
                    }
                    /* if (this.time == 0) {
                        clearInterval(interval);
                    } */
                }, 1000);
            },

        },
        created() {
            axios.get(configUrl).then((res) => {
                const socketUrl = res.data.url;
                const socket = io(socketUrl, {
                    query
                });
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
                                    this.state = 'true';
                                    console.log((Date.now() - data.time));
                                    this.time = Math.abs(Math.trunc((Date.now() - data.time)/1000) - 146);
                                    this.countdownTime = !this.countdownTime;
                                    break;
                                    case 'ball':
                                    data.balls.map(ball => this.activeBall(ball));
                                    break;
                                }
                                break;
                            case 'new':
                                console.log('new: ', data);
                                this.state = 'new';
                                this.balls = Array(48).fill({
                                    id: '',
                                    ball: '',
                                    eventId: '',
                                    active: false,
                                    color: ''
                                });
                                break;
                            case 'ball':
                                console.log('ball: ', data);
                                this.state = 'false';
                                this.activeBall(data);
                            case 'results':
                                console.log('results: ', data);
                                break;
                            case 'countdown':
                                console.log('countdown: ', data);
                                this.getLastTen();
                                this.state = 'true';
                                this.time = 146;
                                this.countdownTime = !this.countdownTime;
                                break;
                        }
                    }
                });
            });
            this.getLastTen();
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
