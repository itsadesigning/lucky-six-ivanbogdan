<template>
    <div>
        <div class="balls-grid__ball" :class="ball.color">
            <span>{{ this.index + 1 }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        ball: Object,
        index: Number
    }
}
</script>

<style lang="scss">

</style>