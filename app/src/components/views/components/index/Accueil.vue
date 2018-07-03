<template>
    <section id="ship">
        <div class="container">
            <h1>Le bien mangé français livré où vous voulez !</h1>
            <div>
                <input ref="autocomplete" type="text" id="adress" placeholder="10 avenue du maine, Paris, 750015"
                       @keyup.enter="goCommander" v-model="address">
                <div @click="goCommander"><img src="../../../../assets/search.png" alt=""></div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Accueil",
        data() {
            return {
                address: '',
                auto_address: '',
                bdd_address: {}
            }
        },
        methods: {
            ...mapActions([
                'newAddress'
            ]),
            goCommander() {
                if (this.address == '') {
                    return
                }
                this.$router.push(`/order`)
            }
        },
        computed: {
            ...mapGetters([
                'getAddress'
            ])
        },
        mounted() {
            this.autocomplete = new google.maps.places.Autocomplete(
                (this.$refs.autocomplete),
                {
                    types: ['geocode'],
                    componentRestrictions: {
                        country: "FR"
                    },
                    language: 'fr'
                }
            );
            this.address = this.getAddress
            this.autocomplete.addListener('place_changed', () => {
                let place = this.autocomplete.getPlace()
                this.bdd_address.street = place.address_components[0].long_name + ' ' + place.address_components[1].long_name
                this.bdd_address.city = place.address_components[2].long_name
                this.bdd_address.zipcode = place.address_components[6].long_name
                this.address = place.formatted_address
                this.newAddress(place.formatted_address)
            })
        }
    }
</script>

<style scoped lang="scss">
    #ship {
        height: 90vh;
        width: 100%;
        margin-top: 10vh;
        background: url("../../../../assets/accueil2.jpg") center no-repeat;
        background-size: cover;
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            h1 {
                margin-bottom: 50px;
                font-size: 25px;
            }
            img {
                width: 500px;
            }
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 550px;
                height: 30px;
                box-shadow: 0px 12px 6px rgba(0, 0, 0, .2);
                input {
                    width: 90%;
                    height: 100%;
                    padding: 10px;
                    border: none;
                    font-size: 20px;
                    border-bottom-left-radius: 3px;
                    border-top-left-radius: 3px;
                    &::placeholder {
                        color: rgba(0, 0, 0, .41);
                        font-size: 20px;
                    }
                }
                div {
                    width: 10%;
                    background-color: #E45353;
                    height: 100%;
                    padding: 10px 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: none;
                    border-bottom-right-radius: 3px;
                    border-top-right-radius: 3px;
                    img {
                        height: 80%;
                        width: auto;
                    }
                }
            }
        }
    }
</style>
