<template>
    <section>
        <h1 class="title">{{deliveryTxt}}</h1>
        <div class="step-container">
            <div class="picto">
                <img id="velo" src="../../../assets/delivery.png" alt="">
            </div>
            <div class="steps">
                <progress id="step1" max="100" value="0"></progress>
                <progress id="step2" max="100" value="0"></progress>
                <progress id="step3" max="100" value="0"></progress>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "delivery",
        data() {
            return {
                inter: '',
                deliveryTxt: '',
                step: ''
            }
        },
        mounted() {
            this.init()
            setInterval(() => {
                this.init()
            }, 5000)
        },
        methods: {
            ...mapActions([
                'newQuantity',
                'newStep'
            ]),
            init() {
                var progress = ''

                this.$http.get(`${process.env.PROD_URL}/api/products/order/${this.getDelivery}`)
                    .then(response => {
                        if (response.data.status == 'En attente de validation') {
                            progress = document.getElementById('step1');
                            this.deliveryTxt = response.data.status
                            this.progressBar(progress)
                        } else if (response.data.status == 'En cours de préparation') {
                            clearInterval(this.inter)
                            document.getElementById('step1').value = 100
                            document.querySelector('#velo').style.left = '22%'
                            progress = document.getElementById('step2');
                            this.deliveryTxt = response.data.status
                            this.progressBar(progress)
                        } else if (response.data.status == 'En cours de livraison') {
                            clearInterval(this.inter)
                            document.getElementById('step1').value = 100
                            document.getElementById('step2').value = 100
                            document.querySelector('#velo').style.left = '70%'
                            progress = document.getElementById('step3');
                            this.deliveryTxt = response.data.status
                            this.progressBar(progress)
                        } else {
                            clearInterval(this.inter)
                            document.getElementById('step1').value = 100
                            document.getElementById('step2').value = 100
                            document.getElementById('step3').value = 100
                            document.querySelector('#velo').style.left = '95%'
                            this.deliveryTxt = response.data.status
                            this.$cookies.remove('cart')
                            this.newStep(1)
                            this.newQuantity([])
                        }
                    }).catch(e => {
                        console.error(e)
                })
            },
            progressBar(progress) {
                clearInterval(this.inter)
                this.inter = setInterval(() => {
                    console.log('progress', progress)
                    const val = progress.value;
                    if (val >= 100) {
                        progress.value = 0;
                    }
                    progress.value = parseInt(progress.value, 10) + 2;
                }, 50);
            }
        },
        computed: {
            ...mapGetters([
                'getDelivery'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    section {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    div {
        margin-top: 80px;
    }

    .title {

    }

    .step-container {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        width: 80%;
        margin: 0 auto;
    }

    .picto {
        position: relative;
        width: 100%;
        height: 40px;
        @media all and (max-width: 768px){
            height: 25px;
        }
        img {
            position: absolute;
            top: -10%;
            left: 0;
            width: 7%;
            -moz-transform: scale(-1, 1);
            -webkit-transform: scale(-1, 1);
            -o-transform: scale(-1, 1);
            -ms-transform: scale(-1, 1);
            transform: scale(-1, 1);
            transition: all ease 1.5s;
            @media all and (max-width: 767px){
                width: 13%;
            }
        }
    }

    #step1 {
        width: 30%;
        height: 15px;
    }

    #step2 {
        width: 60%;
        height: 15px;
    }

    #step3 {
        width: 40%;
        height: 15px;
    }

    .steps {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        margin: 0;
        progress[value] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: none;
            box-shadow: 0px 3px 6px rgba(99, 150, 189, .16);
            &::-moz-progress-bar {
                background-color: #5f93bb;
                border-radius: 3px;
            }
            &::-webkit-progress-value {
                background-color: #5f93bb;
                border-radius: 3px;
            }
            &::-webkit-progress-bar {
                background-color: rgba(99, 150, 189, .16);
                border-radius: 3px;
            }
        }
    }
</style>