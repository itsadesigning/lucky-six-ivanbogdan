<template>
    <div>
        <div v-if="$store.state.current.showOdds">
            <span class="oddsTitle">Odds: </span>
            <div class="odds">
                <div>
                    <span v-for="(odd, index) in $store.state.current.state.odds" :key="index">
                    <span class="oddSpan">{{ odd.id }}.</span> 
                    {{ odd.odds }}
                </span>
                </div>
            </div>
        </div>
        <span v-else>{{ $store.state.current.countdownTextBelow }}</span>
    </div>
</template>

<script>


export default {

}
</script>

<style>

</style>
