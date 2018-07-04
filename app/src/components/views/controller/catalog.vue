<template>
    <section id="catalog">
        <notifications group="catalog"></notifications>
        <div class="swiper-zone">
            <swiper :options="swiperOption">
                <swiper-slide>
                    <img src="../../../assets/ban1.jpg" alt="" class="pub">
                </swiper-slide>
                <swiper-slide>
                    <img src="../../../assets/ban2.jpg" alt="" class="pub">
                </swiper-slide>
                <swiper-slide>
                    <img src="../../../assets/ban3.jpg" alt="" class="pub">
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>
        <div id="menu" class="container">
            <div class="container-picto">
                <div class="picto-cube">
                    <img src="../../../assets/pin.svg" alt="">
                </div>
                <div class="triangle"></div>
            </div>
            <input ref="autocomplete" type="text" v-model="address">
            <div class="loop"><img src="../../../assets/search.png" alt=""></div>
            <div class="order-taxe">
                <div class="taxe" @click="getTaxe('30/40 mins', 2)">
                    <div>
                        <img src="../../../assets/delivery.png" alt="">
                        <p>2€</p>
                    </div>
                    <p>30/40 mins</p>
                </div>
                <div class="taxe" @click="getTaxe('15/30 mins', 3)">
                    <div>
                        <img src="../../../assets/scoot.png" alt="">
                        <p>3€</p>
                    </div>
                    <p>15/30 mins</p>
                </div>
                <div class="taxe active-taxe" @click="getTaxe('< 15 mins', 4)">
                    <div>
                        <img src="../../../assets/clock.png" alt="">
                        <p>4€</p>
                    </div>
                    <p>< 15 mins</p>
                </div>
            </div>
        </div>
        <section class="container">
            <header class="header-product">
                <div class="sandwich" :class="{filter:filter=='Sandwich'}" @click="getFilter('Sandwich')">
                    <p>Sandwich</p>
                </div>
                <div class="plats" :class="{filter:filter=='Plats'}" @click="getFilter('Plats')">
                    <p>Plat</p>
                </div>
                <div class="dessert" :class="{filter:filter=='Dessert'}" @click="getFilter('Dessert')">
                    <p>Dessert</p>
                </div>
                <div class="planche" :class="{filter:filter=='Planche'}" @click="getFilter('Planche')">
                    <p>Planche</p>
                </div>
                <div class="vin" :class="{filter:filter=='Vin'}" @click="getFilter('Vin')">
                    <p>Vin</p>
                </div>
            </header>
            <div class="product-zone container">
                <products v-bind:products="products" v-on:drop="drop"></products>
                <div class="basket">
                    <h2>Votre Panier</h2>
                    <p v-if="cart.length>0">Glissez et déposez vos choix ici pour les ajouter</p>
                    <draggable v-model="cart" :options="{group:'product'}" class="cart-products">
                        <p class="flash" v-if="cart.length==0">Glissez et déposez vos choix ici pour les ajouter</p>
                        <div v-for="(product, index) in cart" :key="index" class="cart-item">
                            <button class="delete" @click="deleteCart(index)">X</button>
                            <div>
                                <p>{{product.name}}</p>
                                <div class="price">
                                    <div class="add">
                                        <button @click="removeItem(index)">-</button>
                                        <p>{{product.quantity}}</p>
                                        <button @click="addItem(index)">+</button>
                                    </div>
                                    <p>{{product.total}} €</p>
                                </div>
                            </div>
                        </div>
                    </draggable>
                    <div class="total">
                        <div class="more-details">
                            <p>Sous-total</p>
                            <p>{{underTotal}} € TTC</p>
                        </div>
                        <div class="more-details">
                            <p>Frais de livraison - {{taxe.txt}}</p>
                            <p>{{taxe.price}} €</p>
                        </div>
                        <div class="more-details">
                            <p>Total</p>
                            <p>{{Total}} €</p>
                        </div>
                        <button @click="goCart"  class="button">Valider</button>
                    </div>
                </div>
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
    import {mapGetters, mapActions} from 'vuex'

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
                allproducts: [],
                cart: [],
                swiperOption: {
                    slidesPerView: 1,
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                delayedDragging: false,
                address: '',
                taxe: {
                    txt: '< 15 mins',
                    price: 4
                },
                underTotal: 0,
                Total: 0
            }
        },
        mounted() {
            let cookie = this.$cookies.get('cart')
            if (cookie != null) {
                cookie = JSON.parse(cookie)
                this.cart = cookie.cart
                this.getTaxe(cookie.taxe.txt, cookie.taxe.price)
                this.getUnderTotal()
            } else {
                this.Total = this.taxe.price
            }
            this.autocomplete = new google.maps.places.Autocomplete(
                (this.$refs.autocomplete),
                {
                    types: ['geocode'],
                    componentRestrictions: {
                        country: "FR"
                    },
                    language: 'fr'
                }
            );
            this.autocomplete.addListener('place_changed', () => {
                let place = this.autocomplete.getPlace()
                this.address = place.formatted_address
                this.newAddress(place.formatted_address)
            })
            this.address = this.getAddress
            this.$http.get(`${process.env.DEV_URL}/api/products/`)
                .then(response => {
                    for (let product of response.data) {
                        product.quantity = 1
                        product.total = product.price
                    }
                    this.allproducts = response.data
                    this.products = this.allproducts.filter(product => product.category == this.filter)
                }).catch(e => {
                console.error(e)
            })
        },
        methods: {
            ...mapActions([
                'newAddress',
                'newQuantity'
            ]),
            drop(evt) {
                let check = []
                for (let i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id == this.products[evt.oldIndex].id) {
                        check.push(i)
                    }
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
                this.getUnderTotal()
            },
            getTaxe(txt, taxe) {
                this.taxe.price = taxe
                this.taxe.txt = txt
                switch (taxe) {
                    case 2:
                        document.querySelectorAll('.active-taxe')[0].classList.remove('active-taxe')
                        document.querySelectorAll('.taxe')[0].classList.add('active-taxe')
                        break
                    case 3:
                        document.querySelectorAll('.active-taxe')[0].classList.remove('active-taxe')
                        document.querySelectorAll('.taxe')[1].classList.add('active-taxe')
                        break
                    case 4:
                        document.querySelectorAll('.active-taxe')[0].classList.remove('active-taxe')
                        document.querySelectorAll('.taxe')[2].classList.add('active-taxe')
                        break
                    default:
                }
                this.getTotal();
            },
            getUnderTotal(){
                let calc = 0
                for (let item of this.cart) {
                    calc += item.total
                }
                this.underTotal = calc
                this.getTotal()
            },
            getTotal() {
                this.Total = this.underTotal + this.taxe.price
                if (this.$cookies.get('cart') != null)
                    this.$cookies.remove('cart')
                this.$cookies.set('cart', JSON.stringify({
                    cart: this.cart,
                    taxe: this.taxe
                }), "7d")
                this.newQuantity(this.cart)
            },
            deleteCart(index) {
                for (let product of this.products) {
                    if (product.id == this.cart[index].id) {
                        product.quantity = 1
                    }
                }

                this.cart.splice(index, 1)
                if (this.cart.length > 0)
                    this.getUnderTotal()
                else {
                    this.underTotal = 0
                    this.Total = this.taxe.price
                    this.$cookies.remove('cart')
                    this.newQuantity(this.cart)
                }
            },
            removeItem(index) {
                this.cart[index].quantity--
                if (this.cart[index].quantity == 0) {
                    this.deleteCart(index)
                    return
                }
                this.itemTotal(index)
                this.getUnderTotal()
            },
            addItem(index) {
                this.cart[index].quantity++
                this.itemTotal(index)
                this.getUnderTotal()
            },
            itemTotal(index) {
                this.cart[index].total = this.cart[index].quantity * this.cart[index].price
            },
            getFilter(filter) {
                this.filter = filter
                this.products = this.allproducts.filter(product => product.category == this.filter)
            },
            goCart() {
                if (this.getAddress == '') {
                    this.$notify({
                        group: 'catalog',
                        type: 'error',
                        title: 'Veuillez entrer une adresse'
                    })
                }
            }
        },
        computed: {
            ...mapGetters([
                'getAddress',
            ])
        }
    }
</script>

<style lang="scss" scoped>
    #catalog {
        position: relative;
        margin-top: 10vh;
        height: auto;
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
                .pub {
                    height: 100%;
                    width: 100%;
                }
                &:first-of-type .pub {
                    background-color: #5F93BB;
                }
                &:nth-of-type(2) -of-type .pub {
                    background-color: white;
                }
                &:last-of-type .pub {
                    background-color: #E45353;
                }
            }
        }
        #menu {
            position: absolute;
            background-color: white;
            height: 80px;
            top: 440px;
            left: 50%;
            transform: translateX(-50%);
            box-shadow: 0px 1px 10px rgba(99, 150, 189, .16);
            z-index: 300;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            border-radius: 3px;
            .container-picto {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 100%;
                .picto-cube {
                    height: 100%;
                    width: 100px;
                    background-color: #5F93BB;
                    border-bottom-left-radius: 3px;
                    border-top-left-radius: 3px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 55%;
                        height: 55%;
                    }
                }
                .triangle {
                    width: 0;
                    height: 0;
                    border-top: 15px solid transparent;
                    border-left: 20px solid #5F93BB;
                    border-bottom: 15px solid transparent;
                }
            }
            input {
                height: 100%;
                width: 30%;
                border: none;
                margin-left: 10px;
                word-spacing: 0;
                font-size: 17px;
                &::placeholder {
                    word-spacing: 0;
                    font-size: 16px;
                }
            }
            .loop {
                background-color: #5F93BB;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                img {
                    width: 40%;
                }
            }
            .order-taxe {
                background-color: rgba(99, 150, 189, .33);
                height: 100%;
                width: 65%;
                justify-self: flex-end;
                display: flex;
                justify-content: space-around;
                align-items: center;
                border-bottom-right-radius: 3px;
                border-top-right-radius: 3px;
                .taxe {
                    height: 80%;
                    width: auto;
                    background-color: white;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-radius: 3px;
                    transition: all ease .2s;
                    div {
                        height: 100%;
                        width: 50px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-right: solid 1px black;
                        img {
                            width: 60%;
                            margin: 0;
                        }
                        p {
                            display: none;
                        }
                    }
                    p {
                        margin: 0 15px;

                    }
                    &:hover {
                        box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, .5);
                        div {
                            p {
                                display: block;
                            }
                            img {
                                display: none;
                            }
                        }
                    }
                }
                .active-taxe {
                    box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, .5);
                }
            }
        }
        .header-product {
            margin-top: 100px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: white;
            font-weight: bold;
            font-size: x-large;
            letter-spacing: 1px;
            .sandwich,
            .plats,
            .dessert,
            .planche,
            .vin {
                background: url('../../../assets/connexion.jpg') no-repeat center;
                background-size: cover;
                border-radius: 3px;
                width: 200px;
                height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: all ease .2s;
                p {
                    background: rgba(0, 0, 0, .1);
                    height: 100%;
                    width: 100%;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                &:hover {
                    box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, .5);
                }
            }
            .filter {
                box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, .5);
            }
        }
        .product-zone {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin: 30px 0;
            .basket {
                background: white;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: space-between;
                border-radius: 3px;
                width: 25%;
                padding-top: 20px;
                padding-bottom: 20px;
                box-shadow: 1px 2px 10px 0px rgba(106, 146, 183, .2);
                h2,
                p {
                    margin-left: 10px;
                    margin-right: 10px;
                }
                p {
                    padding-top: 10px;
                }
                .cart-products {
                    margin-top: 10px;
                    margin-bottom: 10px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: space-between;
                    .cart-item {
                        width: 80%;
                        margin: 0 auto;
                        padding: 1.5%;
                        border-radius: 3px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        background-color: #FBFBFB;
                        margin-bottom: 20px;
                        box-shadow: 0px 2px 4px 0px rgba(106, 146, 183, .2);
                        .delete {
                            align-self: flex-end;
                            border: none;
                            color: #E45353;
                            font-size: 18px;
                            background: transparent;
                            cursor: pointer;
                        }
                        .price {
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 10px;
                            p {
                                padding: 0;
                            }
                        }
                        .add {
                            display: flex;
                            justify-content: space-between;
                            button {
                                border: none;
                                background: transparent;
                                color: #E45353;
                                font-size: 18px;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .flash {
                    color: #E45353;
                }
                .total {
                    width: 100%;
                    .more-details {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                    }
                }
            }
        }
        .button {
            float: right;
            margin-right: 10px;
            margin-top: 20px;
            transition: all ease .2s;
            color: #5F93BB;
            font-size: 17px;
            &:hover {
                color: white;
            }
        }
    }
</style>