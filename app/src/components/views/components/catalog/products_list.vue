<template>
    <draggable v-model="products" :options="{group:{name:'product', pull: 'clone', put: false }}" class="products" @end="onAdd">
        <div v-for="product in products" class="product">
            <img src="../../../../assets/connexion.jpg" alt="">
            <div class="info">
                <h3>{{product.name}}</h3>
                <p>{{product.ingredients}}</p>
                <div class="price">
                    <p>Prix</p>
                    <p>{{product.price}} €</p>
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

<style lang="scss" scoped>
    .products {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        background: white;
        border-radius: 3px;
        width: 70%;
        min-height: 150px;
        height: auto;
    }
    .product {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        margin-bottom: 30px;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, .1);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        img {
            width: 300px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 3%;
            background: #fbfbfb;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            h3 {
                font-size: 17px;
                padding-top: 10px;
            }
            p {
                font-size: 13px;
                padding: 10px 0;
            }
            .price {
                width: 100%;
                display: flex;
                justify-content: space-between;
                p {
                    font-size: 17px;
                }
                p:last-child {
                    font-size: 17px;
                    font-weight: bold;
                    color: #5F93BB;
                }
            }
        }
    }
</style>