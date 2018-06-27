<template>
    <section>
        <notifications group="account" classes="my-notification"></notifications>
        <info v-on:update="update"></info>
        <addresses></addresses>
    </section>
</template>

<script>
    import info from '../components/account/user_infos'
    import addresses from '../components/account/user_address'

    export default {
        components: {
            info,
            addresses
        },
        methods: {
            update(text) {
                this.$notify({
                    group: 'account',
                    type: 'success',
                    title: 'Modification des information',
                    text: text
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    section {
        min-height: 100vh;
        height: auto;
    }
</style>