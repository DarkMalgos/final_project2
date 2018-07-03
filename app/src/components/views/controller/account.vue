<template>
    <main>
        <notifications group="account" classes="my-notification"></notifications>
        <div class="container">
            <aside class="aside-info">
                <h2>Mes informations</h2>
                <form @submit.prevent="updateUser">
                    <div class="control">
                        <input v-model="user.firstname" id="firstname" type="text">
                        <label for="firstname">Prénom</label>
                    </div>
                    <div class="control">
                        <input v-model="user.lastname" id="lastname" type="text">
                        <label for="lastname">Nom</label>
                    </div>
                    <div class="control">
                        <input v-model="user.email" id="email" type="email">
                        <label for="email">Email</label>
                    </div>
                    <div class="control">
                        <input v-model="user.tel" id="tel" type="tel">
                        <label for="tel">Téléphone</label>
                    </div>
                    <input type="submit" value="modifier" class="button">
                </form>
            </aside>
            <div>
                <section class="section-addresses">
                    <h2>Mes adresses</h2>
                    <div class="container-cards">
                        <div v-for="(card, index) in addresses" class="card">
                            <p>{{card.street}}</p>
                            <p>{{card.zipcode}} </p>
                            <p>{{card.city}}</p>
                            <span @click="deleteCard(index)" class="delete"></span>
                        </div>
                        <div class="card">
                            <p>Ajouter une nouvelle adresse</p>
                            <span class="add"></span>
                        </div>
                    </div>
                </section>
                <section class="section-orders">
                    <h2>Mes commandes</h2>
                    <div class="container-orders">
                        <h3>Etat</h3>
                        <h3>Prix</h3>
                        <h3>Date</h3>
                    </div>
                    <div class="container-orders">
                        <p>etat</p>
                        <p>prix</p>
                        <p>date</p>
                    </div>
                </section>
            </div>
        </div>
    </main>
</template>
<script>
    export default {
        data() {
            return {
                user: {},
                addresses: [],
                id: NaN
            }
        },
        mounted() {
            this.id = this.$cookies.get('user')
            if (this.id == null)
                this.$router.push('/')
            this.$http.get(`${process.env.PROD_URL}/api/users/${this.id}`)
                .then(response => {
                    console.log(response.data)
                    this.user = response.data.user
                    this.addresses = response.data.addresses
                })
                .catch(e => {
                    console.error(e)
                })
        },
        methods: {
            updateUser(){
                this.$http.post(`${process.env.DEV_URL}/api/users/update/${this.id}`, {
                    user: this.user
                }).then(response => {
                    if (response.data == 'Réussi')
                        this.$notify({
                            group: 'account',
                            type: 'success',
                            title: 'Modification des informations',
                            text: response.data
                        })
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    //todo: mettre le + en #5ea43e
    main {
        background-color: #fbfbfb !important;
        width: 95vw;
        margin: 0 auto;
        margin-top: 8%;
        height: 100vh;
        .container {
            display: flex;
            justify-content: space-between;
            flex-basis: 100%;
            margin: 50px 0;
        }
    }

    h2 {
        margin-bottom: 20px;
        font-size: 1.3rem;
    }

    h3 {
        font-size: 1.2rem;
    }

    .sections {
        padding: 20px;
    }

    .aside-info {
        @extend .sections;
        flex-basis: 30%;
        width: 30vw;
        form {
            display: flex;
            flex-direction: column;
            background-color: white;
            padding: 15px;
            .control {
                float: left;
                position: relative;
                width: 100%;
                border-bottom: 1px solid #ddd;
                padding-top: 23px;
                padding-bottom: 10px;
                input {
                    display: block;
                    margin-top: 10px;
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
                    top: 10px;
                    transition: top 0.7s ease, opacity 0.7s ease;
                    opacity: 0;
                    font-weight: 600;
                    font-size: 13px;
                    color: #ccc;
                }
                input:valid + label,
                input[type='email']:valid + label {
                    opacity: 1;
                    top: 3px;
                }
                input:focus + label,
                input[type='email']:focus + label {
                    color: #E45353;
                }
                input[type='email']:focus + label {
                    opacity: 1;
                    top: 3px;
                }
            }
            .button {
                margin-top: 30px;
                font-size: 15px;
                align-self: flex-end;
                color: #5F93BB;
                &:hover {
                    color: white;
                }
            }
        }
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

    .delete {
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
            transform: translateY(-50%) translateX(-50%) rotate(45deg);
            content: '';
            width: 3px;
            height: 22px;
            border-radius: 3px;
            background-color: #E45353;
        }
        &:after {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateY(-50%) translateX(-50%) rotate(-45deg);
            content: '';
            width: 3px;
            height: 22px;
            border-radius: 3px;
            background-color: #E45353;
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

    .section-orders {
        @extend .sections;
        flex-basis: 70%;
    }

    .container-orders {
        display: flex;
        justify-content: space-between;
        background-color: white;
        padding: 10px 10vw;
        margin-bottom: 15px;
        p {
            font-size: 1rem;
        }
    }
</style>