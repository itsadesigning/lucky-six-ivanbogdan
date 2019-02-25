<template>
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
                            <span>First Ball Color:</span><span class="right">{{ ballColor(round.balls[0].ball).toUpperCase() }}</span>
                            <span>Pre Numbers Sum (-122.5+):</span><span class="right">{{ preNumbersSum(round.balls.slice(0,6)) }}</span>
                            <span>First Number Even/Odd:</span><span class="right">{{ firstEvenOdd(round.balls[0].ball) }}</span>
                            <span>First Number (-24.5+):</span><span class="right">{{ firstNumber(round.balls[0].ball) }}</span>
                            <span>Even/Odd Pre Numbers:</span><span class="right">{{ evenOddPre(round.balls.slice(0,6)) }}</span>
                            <span>Color Betting:</span><span class="right">NONE</span>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script>
export default {
    props: {
        ballColor: Function,
    },
    methods: {
        milisecToDate(time) {
            const d = new Date(time);
            const ds = d.toString('MM/dd/yy HH:mm:ss');
            return ds;
        },
        preNumbersSum(x) {
            let sum = 0;
            x.map((ball) => sum += ball.ball );
            return sum < 122.5 ? 'UNDER': 'OVER';
        },
        firstEvenOdd(x) {
            return (x % 2) == 0 ? 'EVEN' : 'ODD';
        },
        firstNumber(x) {
            return x < 22.5 ? 'UNDER' : 'OVER';
        },
        evenOddPre(x) {
            let sum = 0;
            x.map((ball) => sum += ball.ball );
            return sum % 2 == 0 ? 'EVEN' : 'ODD';
        }
    },
    created() {
        
    }
}
</script>

<style>
    
</style>