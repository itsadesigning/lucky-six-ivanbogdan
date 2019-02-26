<template>
    <div>
        <ball-item 
            v-for="(ball, index) in $store.state.current.currentBalls" 
            class="currentBall" 
            :class="ball.color" 
            :index="index"
            :key="index + '_color'"
        >
            <span>{{ ball.ball }}</span>
        </ball-item>
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
