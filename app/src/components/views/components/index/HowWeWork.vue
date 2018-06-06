<template>
    <section id="how-it-work">
        <div class="container">
            <h2>Comment ça marche ?</h2>
            <div>
                <div>
                    <img src="../../../../assets/order.png" alt="">
                    <h3>Vous commandez</h3>
                </div>
                <div class="line"></div>
                <div>
                    <img src="../../../../assets/prepare.png" alt="">
                    <h3>Nous préparons</h3>
                </div>
                <div class="line"></div>
                <div>
                    <img src="../../../../assets/delivery.png" alt="">
                    <h3>Nous livrons</h3>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "HowWeWork"
    }
</script>

<style scoped lang="scss">
    section {
        height: 15vh !important;
        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
            margin-bottom: 40px;
            h2 {
                margin-bottom: 40px;
            }
            div {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                height: 100%;
                width: 100%;
                margin: 0;
                div {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
                    width: 25%;
                    color: black;
                    img {
                        width: 50px;
                        margin-bottom: 40px;
                    }
                    h3 {
                        font-size: 15px;
                    }
                }
                div:last-child {
                    img {
                        margin-top: 5px;
                        width: 80px;
                    }
                }
            }
            .line {
                height: 3px;
                width: 45%;
                background-color: #5F93BB;
                margin-bottom: 50px;
            }
        }
    }
</style>
