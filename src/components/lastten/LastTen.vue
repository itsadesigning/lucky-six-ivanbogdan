<template>
    <div class="lastTen">
            <div class="lastTen__text">
                LAST TEN ROUNDS:
            </div>
                <div class="lastTen__round" v-for="round in $store.state.lastten.lastTen" :key="round.eventId">
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
                            <span>Color Betting:</span><span class="right">{{ colorBetting(round.balls) }}</span>
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
            const ds = d.toLocaleString('HR');
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
            return sum % 2 === 0 ? 'EVEN' : 'ODD';
        },
        colorBetting(x) {
            
            /* AKO SE RIJESIMO OZNAKA ZA KOMENTAR OVDJE DOBIJEMO ISPRAVNO RJESENJE, ALI PREVELIKA KOMPUTACIJA. MORA BITI BOLJE RJESENJE. */

            /* const colors = [
                {color: 'red', balls: 0},
                {color: 'green', balls: 0},
                {color: 'blue', balls: 0},
                {color: 'purple', balls: 0},
                {color: 'brown', balls: 0},
                {color: 'yellow', balls: 0},
                {color: 'orange', balls: 0},
                {color: 'white', balls: 0}];
            
            let results;
            x.map((ball) => {
                switch(ball.color){
                    case 'red':
                    colors[0].balls++;
                    break;
                    case 'green':
                    colors[1].balls++;
                    break;
                    case 'blue':
                    colors[2].balls++;
                    break;
                    case 'purple':
                    colors[3].balls++;
                    break;
                    case 'brown':
                    colors[4].balls++;
                    break;
                    case 'yellow':
                    colors[5].balls++;
                    break;
                    case 'orange':
                    colors[6].balls++;
                    break;
                    case 'white':
                    colors[7].balls++;
                    break;
                }

                results = colors.filter((color) => {
                    return color.balls === 6
                });
            }); */

            let text = '';
            /* results.map((ball) => text = ball.color + ' ' + text); */

            if(text == '') {
                return 'NONE';
            } else {
                return text.toUpperCase();
            }
        }
    },
    created() {
        
    }
}
</script>

<style>
    
</style>