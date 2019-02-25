<template>
    <div class="luckysix">
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
        <div class="currentBallGrid">
            <div v-for="(ball, index) in $store.state.currentBalls" class="currentBall" :class="ball.color" :key="index + '_color'">
                <span>{{ index + 1 }}</span>
                
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
    .currentBallGrid {
        display: flex;
        margin-top: 20px;
        flex-wrap: nowrap;
    }

    .currentBall {
        display: block;
        width: 10px;
        height: 10px;
        border: 1px solid gray;
        border-radius: 50%;
        position: relative;
        font-size: 0.5em;
        line-height: 12px;
        text-align: center;
        margin: auto;
    }
</style>