<template>
    <section id="billing">
        <card></card>
    </section>
</template>

<script>
    import card from '../components/billing/card'

    export default {
        name: "billing",
        components: {
            card
        }
    }
</script>

<style lang="scss" scoped>
    #billing {
            height: 100vh;
            width: 40%;
        margin-top: 20%;
    }
</style>