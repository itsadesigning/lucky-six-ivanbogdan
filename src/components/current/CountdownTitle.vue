<template>
    <div>
        <span class="eventId">EVENT: {{ $store.state.current.state.eventId }}</span>
        <span class="countdownText">{{ $store.getters.countdownText }}</span>
    </div> 
</template>

<script>


export default {

}
</script>

<style>

</style>
