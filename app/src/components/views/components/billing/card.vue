<template>
    <section>
        <section class="section-addresses">
            <h2>Vos adresses</h2>
            <div class="container-cards">
                <!-- todo: get l'adresse du state et la mettre en active -->
                <div v-for="(card, index) in addresses" class="card" @click="chooseAddress(index)">
                    <p>{{card.street}}</p>
                    <p>{{card.zipcode}} </p>
                    <p>{{card.city}}</p>
                    <span v-if="select==index" @click="deleteCard(index)" class="delete"></span>
                </div>
                <div class="card">
                    <p>Ajouter une nouvelle adresse</p>
                    <span class="add"></span>
                </div>
            </div>
        </section>
        <div class="card-container">
            <div ref="card"></div>
            <button v-on:click="purchase" class="button">Valider</button>
        </div>
    </section>
</template>

<script>
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
                address: {}
            }
        },
        mounted() {
            console.log(process.env.DEV_URL)
            this.id = this.$cookies.get('user')
            if (this.id == null)
                this.$router.push('/')
            this.$http.get(`${process.env.DEV_URL}/api/addresses/${this.id}`)
                .then(response => {
                    this.addresses = response.data
                })
                .catch(e => {
                    console.error(e)
                })
            card = elements.create('card', {
                base: {
                    border: '1px solid #D8D8D8',
                    borderRadius: '4px',
                    color: "#000"
                }
            });
            card.mount(this.$refs.card);
        },
        methods: {
            purchase() {
                console.log(this.address)
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
                    console.log(result.token.id)
                    // Access the token with result.token
                    self.$emit('next')
                });
            },
            chooseAddress(index) {
                this.address = this.addresses[index]
                if (this.select != index)
                    this.select = index
                else
                    this.select = NaN
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
    .section-addresses {
        @extend .sections;
        flex-basis: 70%;
        width: 60vw;
        .container-cards {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .card {
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
</style>