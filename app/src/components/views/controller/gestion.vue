<template>
    <section>
        <div class="container order" v-for="order in orders">
            <p>order n°{{order.id}}</p>
            <div class="buttons">
                <button @click="validated(order.id)" class="button">Validé</button>
                <button @click="recuperate(order.id)" class="button">Récupéré</button>
                <button @click="delivrate(order.id)" class="button">livré</button>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "gestion",
        data() {
            return {
                orders: []
            }
        },
        mounted() {
            this.$http.get(`${process.env.PROD_URL}/api/products/order/all`)
                .then(response => {
                    this.orders = response.data
                    console.log(this.orders)
                }).catch(e => {
                console.error(e)
            })
        },
        methods: {
            validated(id) {
                this.$http.post(`${process.env.PROD_URL}/api/products/order/${id}`, {
                    status: 'En cours de préparation'
                }).then(response => {

                }).catch(e => {
                    console.error(e)
                })
            },
            recuperate(id) {
                this.$http.post(`${process.env.PROD_URL}/api/products/order/${id}`, {
                    status: 'En cours de livraison'
                }).then(response => {
                }).catch(e => {
                    console.error(e)
                })
            },
            delivrate(id) {
                this.$http.post(`${process.env.PROD_URL}/api/products/order/${id}`, {
                    status: 'Livrée'
                }).then(response => {
                }).catch(e => {
                    console.error(e)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    section {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        div:first-child {
            margin-top: 100px;
        }
        .order {
            width: 60%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .buttons {
            width: 20%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .button {
                color: #5f93bb;
                transition: all ease .2s;
                &:hover {
                    background-color: #5f93bb;
                    color: white;
                }
            }
        }
    }
</style>