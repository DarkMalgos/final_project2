<template>
    <section class="info">
        <div>
            <h2>Mes informations</h2>
            <form>
                <div class="control">
                    <input v-model="user.firstname" id="firstname" type="text" readonly>
                    <label for="firstname">Prénom</label>
                </div>
                <div class="control">
                    <input v-model="user.lastname" id="lastname" type="text" readonly>
                    <label for="lastname">Nom</label>
                </div>
                <div class="control">
                    <input v-model="user.email" id="email" type="email" readonly>
                    <label for="email">Email</label>
                </div>
                <div class="control">
                    <input v-model="user.tel" id="tel" type="tel" readonly>
                    <label for="tel">Téléphone</label>
                </div>
            </form>
        </div>
        <div class="section-addresses">
            <h2>Votre adresse</h2>
            <div class="container-cards">
                <div class="card">
                    <p>{{address.street}},</p>
                    <p>{{address.zipcode}},</p>
                    <p>{{address.city}}</p>
                </div>
            </div>
        </div>
        <div class="basket">
            <h2>Votre Panier</h2>
            <div class="cart-products">
                <div v-for="(product, index) in cart" :key="index" class="cart-item">
                    <div>
                        <p>{{product.name}}</p>
                        <div class="price">
                            <div class="add">
                                <p>x{{product.quantity}}</p>
                            </div>
                            <p>{{product.total}} €</p>
                        </div>
                    </div>
                </div>
            </div>
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
            </div>
        </div>
        <button class="button" @click="payement">Valider</button>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "resume",
        data() {
            return {
                user: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    tel: ''
                },
                id: NaN,
                address: {},
                token: '',
                cart: [],
                taxe: {},
                underTotal: NaN,
                Total: NaN
            }
        },
        mounted() {
            this.id = this.$cookies.get('user')
            this.$http.get(`${process.env.PROD_URL}/api/users/${this.id}`)
                .then(response => {
                    this.user = response.data.user
                }).catch(e => {
                console.error(e)
            })

            this.address = this.getAddress
            this.token = this.getToken

            let cookie = this.$cookies.get('cart')
            this.cart = JSON.parse(cookie).cart
            this.taxe = JSON.parse(cookie).taxe

            this.getUnderTotal()

        },
        computed: {
            ...mapGetters([
                'getAddress',
                'getToken'
            ])
        },
        methods: {
            getUnderTotal() {
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
            },
            payement() {
                this.$http.post(`${process.env.PROD_URL}/api/bill/${this.id}`, {
                    user: {
                        token: this.token
                    },
                    cart: {
                        products: this.cart,
                        taxe: this.taxe
                    }
                }).then(response => {
                    console.log(response.data)
                }).catch(e => {
                    console.error(e)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    h2 {
        margin-bottom: 20px;
        font-size: 1.3rem;
    }

    .sections {
        padding: 20px;
        margin: 50px 0;
    }

    .info {
        @extend .sections;
        flex-basis: 30%;
        width: 30vw;
        background: white;
        border-radius: 5px;
        form {
            display: flex;
            flex-direction: column;
            background-color: white;
            padding: 15px;
            padding-top: 10px;
            .control {
                float: left;
                position: relative;
                width: 100%;
                border-bottom: 1px solid #ddd;
                padding-bottom: 10px;

                input {
                    display: block;
                    margin-top: 40px;
                    width: 100%;
                    border: 0;
                    outline: 0;
                    resize: none;
                    background-color: transparent;
                    font-size: 15px;

                    &::placeholder {
                        font-size: 15px;
                    }

                }
                input + label {
                    position: absolute;
                    transition: top 0.7s ease, opacity 0.7s ease;
                    opacity: 1;
                    top: 20px;
                    font-weight: 600;
                    font-size: 13px;
                    color: #ccc;
                }

            }
        }
    }

    .section-addresses {
        @extend .sections;
        flex-basis: 70%;
        .container-cards {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            .card {
                width: 100%;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-around;
                width: 240px;
                padding: 27px 15px;
                background-color: #5F93BB;
                margin: 5px;
                margin-bottom: 50px;
                color: #fff;
                border-radius: 5px;
                p {
                    font-size: 1rem;
                }
            }
        }
    }

    .basket {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        border-radius: 3px;
        height: auto;
        padding: 20px;
        margin-top: 40px;
        margin-bottom: 40px;
        h2,
        p {
            margin-left: 10px;
            margin-right: 10px;
            margin-top: 10px;
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
            border-bottom: solid 1px #5F93BB;
            .cart-item {
                width: 80%;
                margin: 0 auto;
                margin-top: 10px;
                padding: 1.5%;
                border-radius: 3px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                background-color: #FBFBFB;
                margin-bottom: 20px;
                box-shadow: 0px 2px 4px 0px rgba(106, 146, 183, .2);
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
                }
            }
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

    .button {
        float: right;
        color: #5f93bb;
        font-size: 16px;
        &:hover {
            color: white;
        }
    }
</style>