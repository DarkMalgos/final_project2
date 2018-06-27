<template>
    <section>
        <notifications group="account" classes="my-notification"></notifications>
        <info v-on:update="update"></info>
    </section>
</template>

<script>
    import info from '../components/account/user_infos'

    export default {
        components: {
            info
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
        height: 100vh;
    }
</style>