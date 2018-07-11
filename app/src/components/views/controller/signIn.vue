<template>
    <section id="signin">
        <form @submit.prevent="connection" class="form-container">
            <notifications group="erlog" classes="my-notification"></notifications>
            <div class="control">
                <input id="email" type="email" placeholder="Email" v-model="user.email" required>
                <label for="email">Email</label>
            </div>
            <div class="control">
                <input id="password" type="password" placeholder="Mot de passe" v-model="user.password" required>
                <label for="password">Mot de passe</label>
            </div>
            <input type="submit" class="button">
        </form>
        <div class="illu"></div>
    </section>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "signIn",
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                },
                error: '',
                errCo: false
            }
        },
        methods: {
            ...mapActions([
                'newStep'
            ]),
            connection() {
                this.$http.post(process.env.PROD_URL + '/api/users/connexion', {
                    user: this.user
                }).then(response => {
                    if (response.data.user) {
                        this.$emit('connect', response.data.user);
                        if (window.location.search) {
                            this.newStep(2)
                            this.$router.push('/cart')
                        } else {
                            this.$router.push('/')
                        }
                    } else {
                        this.error = response.data
                        this.errCo = true
                        this.$notify({
                            group: 'erlog',
                            type: 'error',
                            title: 'Erreur de connexion',
                            text: response.data
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    #signin {
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .form-container {
            width: 40%;
            margin: 0 auto;
        }
        form {
            height: 40%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            font-size: 15px;
            margin: 20px 0;
            .pass-not-match {
                align-self: center;
                color: #E45353;
            }
            .groupir {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                .control {
                    width: 45%;
                }
            }
            .control {
                float: left;
                position: relative;
                width: 100%;
                border-bottom: 1px solid #ddd;
                padding-top: 23px;
                padding-bottom: 10px;
                input {
                    display: block;
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
                width: 20%;
                align-self: flex-end;
                color: #5F93BB;
                @media all and (max-width: 768px){
                    width: 35%;
                }
                &:hover {
                    color: white;
                }
            }
        }
    }

    .illu {
        height: 100%;
        width: 30%;
        background: url("../../../assets/connexion.jpg") no-repeat center;
        background-size: cover;
    }
</style>
