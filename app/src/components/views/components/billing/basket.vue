<template>
    <section class="basket">
        <h2>Votre Panier</h2>
        <p v-if="cart.length>0">Glissez et déposez vos choix ici pour les ajouter</p>
        <div class="cart-products">
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
            <button @click="nextStep" class="button">Valider</button>
        </div>
    </section>
</template>

<script>
    export default {
        name: "basket",
        data() {
            return{
                cart: [],
                Total: NaN,
                taxe: {
                    price: 4,
                    txt: '< 15 mins'
                },
                underTotal: 0
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
        },
        methods: {
            getTaxe(txt, taxe) {
                this.taxe.price = taxe
                this.taxe.txt = txt
                this.getTotal();
            },
            getUnderTotal(){
                let calc = 0
                for (let item of this.cart) {
                    calc += item.total
                }
                console.log(calc)
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
            deleteCart(index) {
                this.cart.splice(index, 1)
                if (this.cart.length > 0)
                    this.getTotal()
                else {
                    this.underTotal = 0
                    this.Total = this.taxe.price
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
            nextStep() {
                this.$emit('next')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .basket {
        background: white;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        border-radius: 3px;
        height: auto;
        padding:20px;
        margin-top: 40px;
        margin-bottom: 40px;
        box-shadow: 1px 2px 10px 0px rgba(106, 146, 183, .2);
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

</style>