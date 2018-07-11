<template>
    <section class="section">
        <section class="section-addresses">
            <h2>Vos adresses</h2>
            <div class="container-cards">
                <div v-for="(card, index) in addresses" class="card" @click="chooseAddress(index)">
                    <p>{{card.street}}</p>
                    <p>{{card.zipcode}} </p>
                    <p>{{card.city}}</p>
                    <span v-if="select==index" class="check"></span>
                </div>
                <div class="card">
                    <p>Ajouter une nouvelle adresse</p>
                    <span @click="showModal=true" class="add"></span>
                </div>
            </div>
        </section>
        <div class="card-container">
            <div ref="card"></div>
            <button v-on:click="purchase" class="button">Payer</button>
        </div>
        <addAdress v-if="showModal" @close="close"></addAdress>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import addAdress from '../../../shared/addAddress'

    let stripe = Stripe(`${process.env.STRIPE_KEY}`),
        elements = stripe.elements(),
        card = undefined

    export default {
        name: "card",
        data() {
            return {
                id: NaN,
                addresses: [],
                select: 0,
                address: {},
                showModal: false
            }
        },
        components: {
          addAdress
        },
        created() {
            card = elements.create('card', {
                base: {
                    border: '1px solid #D8D8D8',
                    borderRadius: '4px',
                    color: "#000"
                }
            });
        },
        mounted() {
            if (this.getAddress != '') {
                this.addresses.push(this.getAddress)
                this.address = this.getAddress
            }
            this.id = this.$cookies.get('user')
            /*if (this.id == null)
                this.$router.push('/')*/
            this.$http.get(`${process.env.PROD_URL}/api/addresses/${this.id}`)
                .then(response => {
                    for (let product of response.data) {
                        this.addresses.push(product)
                    }
                    if (this.getAddress == '')
                        this.address = response.data[0]
                })
                .catch(e => {
                    console.error(e)
                })
            card.mount(this.$refs.card);
        },
        methods: {
            ...mapActions([
                'newToken',
                'newAddress'
            ]),
            purchase() {
                if (this.address.street == undefined) {
                    this.$emit('choose')
                    return
                }
                let self = this;

                stripe.createToken(card).then(function (result) {
                    if (result.error) {
                        self.hasCardErrors = true;
                        self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
                        return;
                    }
                    self.newToken(result.token.id)
                    if (self.getAddress != '') {
                        console.log('state vide')
                        if (self.getAddress.street == self.address.street) {
                            self.$http.post(`${process.env.PROD_URL}/api/addresses/${self.id}`, {
                                address: self.address
                            }).then(response => {
                                if (response.data == 'ok')
                                    self.$emit('next')
                            }).catch(e => {
                                console.error(e)
                            })
                        } else {
                            self.newAddress(self.address)
                            self.$emit('next')
                        }
                    } else {
                        console.log('state plein')
                        self.newAddress(self.address)
                        self.$emit('next')
                    }
                    // Access the token with result.token

                });
            },
            chooseAddress(index) {
                if (this.select != index) {
                    this.select = index
                    this.address = this.addresses[index]
                } else {
                    this.select = NaN
                    this.address= {}
                }
            },
            close(address) {
                this.showModal = false
                if (address != null) {
                    this.addresses.push(address)
                    this.select = this.addresses.length - 1
                }
            }
        },
        computed: {
            ...mapGetters([
                'getAddress'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    h2 {
        margin-bottom: 20px;
        font-size: 1.3rem;
    }

    .section {
        background: white;
        padding: 20px;
        margin: 50px 0;
        width: 40vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .sections {
        padding: 20px;
    }

    .section-addresses {
        @extend .sections;
        flex-basis: 70%;
        width: 100%;
        .container-cards {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .card {
                cursor: pointer;
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

    .card-container {
        width: 100%;
        display: inline-block;
        .button {
            float: right;
            margin-right: 10px;
            margin-top: 40px;
            transition: all ease .2s;
            color: #5F93BB;
            font-size: 17px;
            &:hover {
                color: white;
            }
        }
    }

    .add {
        position: absolute;
        bottom: 0px;
        transform: translateY(50%);
        width: 35px;
        height: 35px;
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
        &:before {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateY(-50%) translateX(-50%) rotate(90deg);
            content: '';
            width: 3px;
            height: 22px;
            border-radius: 3px;
            background-color: #5ea43e;
        }
        &:after {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
            content: '';
            width: 3px;
            height: 22px;
            border-radius: 3px;
            background-color: #5ea43e;
        }
    }

    .check {
        position: absolute;
        bottom: 0px;
        transform: translateY(50%);
        width: 35px;
        height: 35px;
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
        &:before {
            position: absolute;
            left: 50%;
            top: 50%;
            content: '✓';
            border-radius: 3px;
            color: #5ea43e;
            transform: translateX(-50%) translateY(-50%);
            font-size: 25px;
        }
    }
</style>