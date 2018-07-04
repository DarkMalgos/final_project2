<template>
    <section class="info">
        <div class="info">
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
                    <p>{{address.street}}</p>
                    <p>{{address.zipcode}} </p>
                    <p>{{address.city}}</p>
                </div>
            </div>
        </div>
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
                cart: []
            }
        },
        mounted() {
            this.id = this.$cookies.get('user')
            console.log(`${process.env.DEV_URL}/api/users/${this.id}`)
            this.$http.get(`${process.env.DEV_URL}/api/users/${this.id}`)
                .then(response => {
                    this.user = response.data.user
                    console.log(this.user)
                }).catch(e => {
                    console.error(e)
                })
            this.address = this.getAddress
            console.log(this.address)
            this.token = this.getToken
            let cookie = this.$cookies.get('cart')
            this.cart = JSON.parse(cookie)
        },
        computed: {
            ...mapGetters([
                'getAddress',
                'getToken'
            ])
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
        width: 100%;
        .container-cards {
            display: flex;
            flex-direction: row;
            justify-content: center;
            .card {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 27px 15px;
                margin: 5px;
                margin-bottom: 50px;
                border-radius: 5px;
                p {
                    font-size: 1.09rem;
                    &:not(:last-child) {
                        margin-right: 20px;
                    }
                }
            }
        }
    }
</style>