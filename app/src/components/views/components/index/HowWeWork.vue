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
                <div class="line"></div>
                <div>
                    <img src="../../../../assets/eat.png" alt="">
                    <h3>Vous mangez</h3>
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
        height: 35vh !important;
        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
            margin-bottom: 40px;
            h2 {
                margin-bottom: 20px;
            }
            div {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: flex-end;
                height: 100%;
                width: 100%;
                margin: 0;
                div {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: center;
                    height: 150px;
                    width: 25%;
                    color: black;
                    img {
                        width: 50px;
                        margin-bottom: 40px;
                        @media all and (max-width: 768px){
                            width: 50%;
                        }
                        @media all and (max-width: 767px) and (min-width: 200px){
                            width: 70%;
                        }
                    }
                    h3 {
                        font-size: 15px;
                        @media all and (max-width: 768px){
                            font-size: 12px;
                        }
                    }
                }

            }
            .line {
                height: 3px;
                width: 45%;
                background-color: #5F93BB;
                margin-bottom: 70px;
                @media all and (max-width: 768px){
                    width: 30%;
                }
                @media all and (max-width: 767px) and (min-width: 200px){
                    width: 20%;
                    margin-bottom: 80px;
                }
            }
        }
    }
</style>
