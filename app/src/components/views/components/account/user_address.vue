<template>
    <section class="container">
        <div v-for="(address, index) in addresses" class="card">
            <button class="delete" @click="deleteCart(index)">X</button>
            <div class="info">
                <p>{{address.street}}</p>
                <div class="city">
                    <p>{{address.city}}</p>
                    <p>{{address.zipcode}}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                addresses: [],
                id: NaN
            }
        },
        methods: {
            deleteCart(index) {

            }
        },
        mounted() {
            this.id = this.$cookies.get('user')
            if (this.id == null)
                this.$router.push('/')
            this.$http.get(`http://localhost:3000/api/addresses/${this.id}`)
                .then(response => {
                    this.addresses = response.data
                    console.log(this.addresses)
                })
                .catch(e => {
                    console.error(e)
                })
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        width: 63%;
    }
    section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: auto;
        .card {
            background-color: white;
            display: flex;
            flex-direction: column;
            width: 20%;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 10px;
            p:first-child {
                margin-top: 10px;
            }
        }
        .delete {
            align-self: flex-end;
            border: none;
            color: #E45353;
            font-size: 18px;
            background: transparent;
            cursor: pointer;
        }
        .info {
            width: 100%;
        }
        .city {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>