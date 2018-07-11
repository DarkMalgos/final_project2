<template>
    <transition name="modal">
        <div class="mask_modal">
            <section>
                <p class="title">Ajouter une adresse</p>
                <form @submit.prevent="newAddress">
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
                    <div class="groupir">
                        <button type="button" class="button-red" @click.prevent="$emit('close', null)">Annuler</button>
                        <input type="submit" class="button" placeholder="Valider">
                    </div>
                </form>
            </section>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "modal",
        data() {
            return {
                address: {
                    street: '',
                    city: '',
                    zipcode: ''

                }
            }
        },
        methods: {
            newAddress() {
                if (this.address.street != '' && this.address.city != '' && this.address.zipcode != '')  {
                    let user = this.$cookies.get('user')
                    if (user != null) {
                        this.$http.post(`${process.env.PROD_URL}/api/addresses/${user}`, {
                            address: this.address
                        }).then(response => {
                            this.address.id = response.data
                            this.$emit('close', this.address)
                        })
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mask_modal {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
        transition: opacity .3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        section {
            background: #fbfbfb;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 55vw;
            height: auto;
            padding: 20px;
            border-radius: 5px;
            @media all and (max-width: 767px) and (min-width: 200px){
                width: 80vw;
                //height: auto;
            }
        }

        form {
            height: auto;
            width: 90%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            font-size: 15px;
            margin: 20px 0;
            .groupir {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                .control {
                    width: 45%;
                }
                &:not(:last-of-type) {
                    @media all and (max-width: 767px) and (min-width: 200px){
                        flex-direction: column;
                        .control {
                            width: 100%;
                        }
                    }
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
            .button,
            .button-red {
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
            .button-red {
                color: #5F93BB;
                transition: all ease .2s;
                &:hover {
                    background: #e45353;
                    color: white!important;
                }
            }
        }
    }
</style>