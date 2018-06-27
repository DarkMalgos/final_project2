<template>
    <section class="container">
        <form class="form-container" @submit.prevent="update">
            <div class="groupir">
                <div class="control">
                    <input id="firstname" type="text" placeholder="Prénom" v-model="user.firstname">
                    <label for="firstname">Prénom</label>
                </div>
                <div class="control">
                    <input id="lastname" type="text" placeholder="Nom" v-model="user.lastname">
                    <label for="lastname">Nom</label>
                </div>
            </div>
            <div class="groupir">
                <div class="control">
                    <input id="email" type="email" placeholder="Email" v-model="user.email">
                    <label for="email">Email</label>
                </div>
                <div class="control">
                    <input id="tel" type="tel" placeholder="Téléphone" v-model="user.tel">
                    <label for="tel">Téléphone</label>
                </div>
            </div>
            <input type="submit" class="button">
        </form>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    tel: ''
                },
                id: NaN
            }
        },
        mounted() {
            this.id = this.$cookies.get('user')

            if (this.id == null)
                this.$router.push('/')

            this.$http.get(`http://localhost:3000/api/users/${this.id}`)
                .then(response => {
                    this.user = response.data.user
                })
                .catch(e => {
                    console.error(e)
                })
        },
        methods: {
            update() {
                this.$http.post(`http://localhost:3000/api/users/update/${this.id}`,{
                    user: this.user
                })
                    .then(response => {
                        if (response.data == 'Réussi') {
                            this.$emit('update', response.data)
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    section {
        margin-top: 15vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: auto;
        height: 100%;
        form {
            height: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            font-size: 15px;
            margin: 20px 0;
        }
        .form-container {
            width: 65%;
            margin: 0 auto;
        }
        .groupir {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .control {
                width: 45%;
                float: left;
                position: relative;
                border-bottom: 1px solid #ddd;
                padding-top: 23px;
                padding-bottom: 10px;
                input {
                    display: block;
                    width: 25%;
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
        }
    }
    .button {
        font-size: 15px;
        align-self: flex-end;
        color: #5F93BB;
        &:hover {
            color: white;
        }
    }
</style>