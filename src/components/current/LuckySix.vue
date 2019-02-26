<template>
    <div>
    <countdown-title  class="countdown"/>
    <balls-layout class="luckysix"/>
    <balls-current-balls-grid class="currentBallGrid"/>
    </div>
</template>

<script>
import BallItem from './BallItem.vue';
import CountdownTitle from './CountdownTitle.vue';
import BallsLayout from './BallsLayout.vue';
import BallsCurrentBallsGrid from './BallsCurrentBallsGrid.vue';

export default {
    components: {
        CountdownTitle,
        BallsLayout,
        BallsCurrentBallsGrid,
        BallItem
    }
}
</script>

<style>

</style>