<template>
    <div>
    <div class="countdown">
        <span class="eventId">EVENT: {{ $store.state.current.state.eventId }}</span>
        <span class="countdownText">{{ $store.getters.countdownText }}</span>
    </div> 
    <div class="luckysix">
        <div class="balls-grid" v-if="$store.state.current.status !== 'true'">
            <ball-item 
            v-for="(ball, index) in $store.state.current.balls" 
            :ball="ball"
            :index="index"
            :key="index"
            />
            <div 
            v-for="(color, index) in $store.state.current.colors" 
            class="balls-grid__color" 
            :class="color.color"
            :key="index + '_color'"
            >
                <span>{{ color.balls }}</span>
            </div>
        </div>
        <div class="countdownTextBelow" v-else>
            <span>{{ $store.state.current.countdownTextBelow }}</span>
        </div>
    </div>
    <div class="currentBallGrid">
            <div 
            v-for="(ball, index) in $store.state.current.currentBalls" 
            class="currentBall" 
            :class="ball.color" 
            :key="index + '_color'"
            >
                <span>{{ ball.ball }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import BallItem from './BallItem.vue';

export default {
    components: {
        BallItem
    }
}
</script>

<style>

</style>