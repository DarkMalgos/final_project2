<template>
    <section id="signup">
        <form @submit.prevent="inscription" class="form-container">
            <div class="groupir">
                <div class="control">
                    <input id="firstname" name="firstname" type="text" v-model="user.firstname" placeholder="Prénom"
                           required>
                    <label for="firstname">Prénom</label>
                </div>
                <div class="control">
                    <input id="lastname" name="lastname" type="text" v-model="user.lastname" placeholder="Nom" required>
                    <label for="lastname">Nom</label>
                </div>
            </div>
            <div class="control">
                <input id="email" name="email" type="email" v-model="user.email" placeholder="Email" required>
                <label for="email">Email</label>
            </div>
            <p class="pass-not-match" v-if="notMatch">Les mots de passe doivent être les mêmes</p>
            <div class="groupir">
                <div class="control">
                    <input id="password1" name="password" type="password" v-model="user.password"
                           placeholder="Mot de passe" required>
                    <label for="password1">Mot de passe</label>
                </div>
                <div class="control">
                    <input id="password2" type="password" v-model="confirm" placeholder="Confirmer le mot de passe"
                           required>
                    <label for="password2">Confirmer le mot de passe</label>
                </div>
            </div>
            <div class="control">
                <input type="tel" id="tel" name="tel" v-model="user.tel" placeholder="Numéro de téléphone" required>
                <label for="tel">Numéro de téléphone</label>
            </div>
            <div class="control">
                <input type="text" id="address" name="address" v-model="address.street" placeholder="Adresse" required>
                <label for="address">Adresse</label>
            </div>
            <div class="groupir">
                <div class="control">
                    <input type="text" id="city" name="city" v-model="address.city" placeholder="Ville" required>
                    <label for="city">Ville</label>
                </div>
                <div class="control">
                    <input type="text" id="zipcode" name="zipcode" v-model="address.zipcode" placeholder="Code postal"
                           required>
                    <label for="zipcode">Code postal</label>
                </div>
            </div>
            <input type="submit" value="Valider" class="button">
        </form>
        <div class="illu"></div>
    </section>
</template>

<script>
    export default {
        name: "signUp",
        data() {
            return {
                user: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    tel: ''
                },
                confirm: '',
                address: {
                    street: '',
                    city: '',
                    zipcode: ''
                },
                notMatch: false
            }
        },
        methods: {
            inscription() {
                if (this.user.password != this.confirm) {
                    this.notMatch = true
                    return
                }
                this.$http.post(process.env.PROD_URL + '/api/users', {
                    user: this.user,
                    address: this.address
                }).then(response => {
                    console.log(response.data.user)
                    if (response.data.user){
                        this.$emit('connect', response.data.user)
                        this.$router.push('/')
                    }
                })
                    .catch(e => {
                        console.error(e)
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

    #signup {
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
            height: 60%;
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
        background: url("../../../assets/inscription.jpg") no-repeat center;
        background-size: cover;
    }
</style>
