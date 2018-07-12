<template>
    <section id="billing">
        <notifications group="bill" classes="my-notification"></notifications>
        <div class="steps">
            <div class="step">
                <p class="number" :class="step == 1 ? 'active' : ''"><span v-if="step==1">1</span><span v-else>✓</span></p>
                <p>Acheter</p>
            </div>
            <div class="step">
                <p class="number" :class="step == 2 ? 'active' : ''"><span v-if="step<=2">2</span><span v-else>✓</span></p>
                <p>Payer</p>
            </div>
            <div class="step">
                <p class="number" :class="step == 3 ? 'active' : ''"><span v-if="step<=3">3</span><span v-else>✓</span></p>
                <p>Valider</p>
            </div>
        </div>

        <component :is="now" @next="nextStep" @choose="choose"></component>
    </section>
</template>

<script>
    import basket from '../components/billing/basket'
    import card from '../components/billing/card'
    import resume from '../components/billing/resume'
    import {mapGetters} from 'vuex'

    export default {
        name: "billing",
        components: {
            basket,
            card,
            resume
        },
        data() {
            return{
                step: 1,
                now: 'basket'
            }
        },
        mounted() {
          if (this.getStep != '') {
              this.step = 2
              this.now = 'card'
          }
        },
        methods: {
            nextStep() {
                document.querySelector('#app').scrollIntoView({
                    behavior: 'smooth'
                });
                this.step++
                switch (this.step) {
                    case 2:
                        this.now = 'card'
                        break
                    case 3:
                        this.now = 'resume'
                        break
                    default:
                        this.now = 'basket'
                        break
                }
            },
            choose() {
                this.$notify({
                    group: 'bill',
                    type: 'error',
                    title: 'Veuillez choisir une adresse'
                })
            }
        },
        computed: {
            ...mapGetters([
                'getStep'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    #billing {
        min-height: 100vh;
        height: auto;
        width: 40%;
        margin: 0 auto;
        margin-top: 8%;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media all and (max-width: 768px) {
            margin-top: 25%;
            width: 80%;
        }
        .steps {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .step {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                p {
                    color: #5F93BB;
                    font-size: 18px;
                    &:last-child {
                        margin-top: 25px;
                    }
                }
                .number {
                    border: solid 2px  #5F93BB;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 25px;
                }
                .active {
                    background-color: #5F93BB;
                    color: white;
                }
            }
        }
    }
</style>