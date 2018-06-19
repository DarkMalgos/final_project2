<template>
    <section id="catalog">
        <div class="swiper-zone">
            <swiper :options="swiperOption">
                <swiper-slide>Slide 1</swiper-slide>
                <swiper-slide>Slide 2</swiper-slide>
                <swiper-slide>Slide 3</swiper-slide>
                <swiper-slide>Slide 4</swiper-slide>
                <swiper-slide>Slide 5</swiper-slide>
                <swiper-slide>Slide 6</swiper-slide>
                <swiper-slide>Slide 7</swiper-slide>
                <swiper-slide>Slide 8</swiper-slide>
                <swiper-slide>Slide 9</swiper-slide>
                <swiper-slide>Slide 10</swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>
        <div id="menu">

        </div>
        <section class="container">
            <header></header>
            <div class="product-zone">
                <products v-bind:products="products" v-on:drop="drop"></products>
                <draggable v-model="cart" :options="{group:'product'}" style="border:solid red 3px">
                    <p v-if="cart.length == 0">drag here</p>
                    <div v-for="(product, index) in cart" :key="index">
                        <button>X</button>
                        <p>{{product.name}}</p>
                        <div>
                            <div>
                                <button>-</button>
                                <p>{{product.quantity}}</p>
                                <button>+</button>
                            </div>
                            <p>{{product.total}} €</p>
                        </div>
                    </div>
                </draggable>
            </div>
        </section>
    </section>
</template>

<style>
    /* require styles */
    @import '../../../../node_modules/swiper/dist/css/swiper.css';
</style>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import products from '../components/catalog/products_list'
    import draggable from 'vuedraggable'

    export default {
        name: "catalog",
        components: {
            products,
            draggable,
            swiper,
            swiperSlide
        },
        data() {
            return {
                filter: 'Sandwich',
                products: [],
                cart: [],
                swiperOption: {
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                delayedDragging: false
            }
        },
        mounted() {
            this.$http.get(`http://localhost:3000/api/products/${this.filter}`)
                .then(response => {
                    for (let product of response.data) {
                        product.quantity = 1
                    }
                    this.products = response.data
                }).catch(e => {
                console.error(e)
            })
        },
        methods: {
            drop(evt) {
                let check = []
                for (let i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id = this.products[evt.oldIndex].id)
                        check.push(i)
                }
                if (check.length > 1) {
                    for (let i = 0; i < check.length; i++) {
                        this.cart.splice(check[i], 1)
                        if (i > 0) {
                            this.products[evt.oldIndex].quantity++
                        }
                    }
                }
                this.products[evt.oldIndex].total = this.products[evt.oldIndex].quantity * this.products[evt.oldIndex].price
            }
        }
    }
</script>

<style lang="scss" scoped>
    #catalog {
        position: relative;
        margin-top: 10vh;
        height: calc(100vh - 15vh);
        .swiper-zone {
            height: 70%;
            .swiper-container {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .swiper-slide {
                text-align: center;
            }
        }

        .product-zone {
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
        }
    }
</style>