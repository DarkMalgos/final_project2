<template>
    <div class="card-container">
        <div ref="card"></div>
        <button v-on:click="purchase">Purchase</button>
    </div>
</template>

<script>
    let stripe = Stripe(`pk_test_drbg7jopB6SXQwUDddLLkla3`),
        elements = stripe.elements(),
        card = undefined;

    export default {
        name: "card",
        mounted() {
            card = elements.create('card', {
                base: {
                    border: '1px solid #D8D8D8',
                    borderRadius: '4px',
                    color: "#000"
                }
            });
            card.mount(this.$refs.card);
        },
        methods: {
            purchase() {
                let self = this;

                stripe.createToken(card).then(function (result) {
                    if (result.error) {
                        self.hasCardErrors = true;
                        self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
                        return;
                    }
                    console.log(result.token)
                    // Access the token with result.token
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>