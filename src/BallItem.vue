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

    .balls-grid__ball {
        display: block;
        width: 30px;
        height: 30px;
        border: 1px solid gray;
        border-radius: 50%;
        position: relative;
        font-size: 12px;
        line-height: 30px;
        text-align: center;
        margin: auto;
    }

    .balls-grid__ball span {
    }

    .red {
        border: 1px solid red;
        background-color: rgba(255, 0, 0, 0.05);
        color: red;
    }

    .green {
        border: 1px solid green;
        background-color: rgba(0, 128, 0, 0.05);
        color: green;
    }
    
    .blue {
        border: 1px solid blue;
        background-color: rgba(0, 0, 200, 0.05);
        color: blue;
    }

    .purple {
        border: 1px solid blueviolet;
        background-color: rgba(138, 43, 226, 0.05);
        color: blueviolet;
    }

    .brown {
        border: 1px solid brown;
        background-color: rgba(165, 42, 42, 0.05);
        color: brown;
    }

    .yellow {
        border: 1px solid yellow;
        background-color: rgba(255, 255, 0, 0.05);
        color: yellow;
    }

    .orange {
        border: 1px solid orange;
        background-color: rgba(255, 165, 0, 0.05);
        color: orange;
    }

    .white {
        border: 1px solid white;
        background-color: rgba(255, 255, 255, 0.05);
        color: white;
    }

</style>