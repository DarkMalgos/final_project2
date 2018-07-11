<template>
    <section id="who-we-are">
        <div class="container">
            <h2>Qui sommes-nous ?</h2>
            <p class="presentation">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolore eligendi
                impedit ipsam porro rem repudiandae tempora tempore veniam voluptates!</p>
            <h3>La team</h3>
            <div class="body-container">
                <div>
                    <div class="people">
                        <transition name="fade">
                            <div class="circle team1">
                                <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </transition>
                        <p>Marc Duval</p>
                        <p>Founder</p>
                    </div>
                    <div class="people">
                        <transition name="fade">
                            <div class="circle team2">
                                <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </transition>
                        <p>Mary Jane</p>
                        <p>Community</p>
                    </div>
                    <div class="people">
                        <transition name="fade">
                            <div class="circle team3">
                                <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </transition>
                        <p>Jose Calrissian</p>
                        <p>Designer</p>
                    </div>
                </div>
                <div>
                    <div class="people">
                        <transition name="fade">
                            <div class="circle team4">
                                <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </transition>
                        <p>Jean Patry</p>
                        <p>Chef</p>
                    </div>
                    <div class="people">
                        <div class="circle team5">
                            <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                        <p>Anne titegoutte</p>
                        <p>Lead Dev</p>
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
        height: auto !important;
        margin-bottom: 40px;
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
                @media all and (max-width: 768px) {
                    flex-direction: column;
                }
                &:last-of-type {
                    margin-top: 20px;
                }
                .people {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: auto;
                    width: auto;
                    &:not(:last-of-type) {
                        margin-right: 120px;
                        @media all and (max-width: 768px) {
                            margin: 0;
                        }
                    }
                    .circle {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                        width: 150px;
                        height: 150px;
                        border-radius: 50%;

                        .description {
                            opacity: 0;
                            position: absolute;
                            background-color: rgba(95, 147, 187, .7);
                            top: 0;
                            color: white;
                            width: calc(100% - 20px);
                            height: calc(100% - 20px);
                            display: flex;
                            padding: 10px;
                            justify-content: center;
                            align-items: center;
                            transition: opacity .5s;
                            border-radius: 50%;
                            text-align: center;
                        }
                        &:hover {
                            .description {
                                opacity: 1;
                            }
                        }
                        &:not(:first-of-type) {
                            margin-left: 20%;
                        }
                    }
                    .team1 {
                        background: url("../../../../assets/team1.jpg") no-repeat center;
                        background-size: cover;
                    }
                    .team2 {
                        background: url("../../../../assets/team2.jpg") no-repeat top;
                        background-size: cover;
                    }
                    .team3 {
                        background: url("../../../../assets/team3.jpg") no-repeat top;
                        background-size: cover;
                    }
                    .team4 {
                        background: url("../../../../assets/team4.jpg") no-repeat center;
                        background-size: cover;
                    }
                    .team5 {
                        background: url("../../../../assets/team5.jpg") no-repeat center;
                        background-size: cover;
                    }
                }
            }
        }
    }

</style>
