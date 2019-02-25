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
</template>

<script>
export default {
    
}
</script>

<style>

</style>
