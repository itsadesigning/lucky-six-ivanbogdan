<template>
    <div>
        <div class="balls-grid" v-if="$store.state.current.status !== 'true'">
            <ball-item 
            v-for="(ball, index) in $store.state.current.balls" 
            class="balls-grid__ball"
            :class="ball.color"
            :ball="ball"
            :index="index"
            :key="index"
            >
                <span>{{ index + 1 }}</span>
            </ball-item>
            <ball-item 
                v-for="(color, index) in $store.state.current.colors"
                class="balls-grid__color"
                :class="color.color"
                :key="index + '_color'"
            >
                <span>{{ color.balls }}</span>
            </ball-item>
        </div>
        <countdown-text-below class="countdownTextBelow" v-else/>    
    </div>
</template>

<script>
import BallItem from './BallItem';
import CountdownTextBelow from './CountdownTextBelow';

export default {
    components: {
        BallItem,
        CountdownTextBelow
    }
}
</script>

<style>

</style>
