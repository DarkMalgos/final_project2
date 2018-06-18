<template>
    <draggable>

    </draggable>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        name: "products_list",
        props: ['products'],
        data() {
            return {

            }
        },
        components: {
            draggable
        }
    }
</script>

<style scoped>

</style>