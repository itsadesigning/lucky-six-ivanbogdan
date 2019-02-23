<template>
    <div class="container">
        <div class="wrapper">
            <div class="countdown">{{ countdownText }}</div> 
            <div class="balls-grid">
                <ball-item 
                    v-for="(ball, index) in balls" 
                    :ball="ball"
                    :index="index"
                    :key="index"
                />
                <div v-for="(color, index) in colors" class="balls-grid__color" :class="color" :style="{backgroundColor: color}" :key="index + '_color'"></div>
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
            BallItem
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
                    if (this.time == 0) {
                        clearInterval(interval);
                    }
                }, 1000);
            }
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
                                this.state = 'true';
                                this.time = 146;
                                this.countdownTime = !this.countdownTime;
                                break;
                        }
                    }
                });
            });
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
        background-color: #333;
    }

    .main {

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

    

</style>
