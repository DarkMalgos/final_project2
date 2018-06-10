<template>
    <section id="who-we-are">
        <div class="container">
            <h2>Qui sommes-nous ?</h2>
            <p class="presentation">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolore eligendi impedit ipsam porro rem repudiandae tempora tempore veniam voluptates!</p>
            <h3>La team</h3>
            <div class="body-container">
                <div>
                    <div class="circle">
                        <img src="../../../../assets/team.jpg" alt="">
                        <p>Jean Patry</p>
                        <p>Co-founder</p>
                        <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                    <div class="circle">
                        <img src="../../../../assets/team.jpg" alt="">
                        <p>Jean Patry</p>
                        <p>CTO</p>
                        <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                    <div class="circle">
                        <img src="../../../../assets/team.jpg" alt="">
                        <p>Jean Patry</p>
                        <p>Marketeur</p>
                        <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div>
                    <div class="circle">
                        <img src="../../../../assets/team.jpg" alt="">
                        <p>Jean Patry</p>
                        <p>Designer</p>
                        <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                    <div class="circle">
                        <img src="../../../../assets/team.jpg" alt="">
                        <p>Jean Patry</p>
                        <p>Chef</p>
                        <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "WhoWeAre"
    }
</script>

<style lang="scss" scoped>
    section {
        height: 80vh !important;
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            h2 {
                margin-bottom: 20px;
            }
            .presentation {
                width: 50%;
                text-align: center;
                margin-bottom: 40px;
            }
            h3 {
                margin-bottom: 20px;
            }
        }
        .body-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 100%;
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                .circle {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    width: 130px;
                    img {
                        width: 100%;
                        border-radius: 50%;
                        margin-bottom: 10px;
                    }
                    .description {
                        visibility: hidden;
                        position: absolute;
                        background-color: rgba(95, 147, 187, .7);
                        top: 0;
                        color: white;
                        width: 100%;
                        height: 82%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: all ease 1s;
                        border-radius: 50%;
                        text-align: center;
                    }
                    &:hover {
                        .description {
                            visibility: visible;
                        }
                    }
                    &:not(:first-of-type) {
                        margin-left: 20%;
                    }
                }
                &:last-child {
                    margin-top: 30px;
                    .circle {
                        img, .description {
                            width: 100%;
                        }
                        &:nth-of-type(1) {
                            margin-right: 10%;
                        }
                        &:nth-of-type(2) {
                            margin-left: 10%;
                        }
                    }
                }
            }
        }
    }


</style>
