<template>
    <draggable v-model="products" :options="{group:{name:'product', pull: 'clone', put: false }}" class="products" @end="onAdd">
        <div v-for="product in products">
            <img src="" alt="">
            <div>
                <p>{{product.name}}</p>
                <p>{{product.ingredients}}</p>
                <div>
                    <p>price</p>
                    <p>{{product.price}}</p>
                </div>
            </div>
        </div>
    </draggable>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        name: "products_list",
        props: ['products'],
        data() {
            return {
                isDragging: false,
                delayedDragging: false
            }
        },
        components: {
            draggable
        },
        methods: {
            onAdd(evt) {
                this.$emit('drop', evt)
            }
        }
    }
</script>

<style scoped>
    .products {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
</style>