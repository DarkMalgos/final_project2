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
                            <div class="circle">
                                <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </transition>
                        <p>Jean Patry</p>
                        <p>Chef</p>
                    </div>
                    <div class="people">
                        <transition name="fade">
                            <div class="circle">
                                <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </transition>
                        <p>Jean Patry</p>
                        <p>Chef</p>
                    </div>
                    <div class="people">
                        <transition name="fade">
                            <div class="circle">
                                <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </transition>
                        <p>Jean Patry</p>
                        <p>Chef</p>
                    </div>
                </div>
                <div>
                    <div class="people">
                        <transition name="fade">
                            <div class="circle">
                                <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                        </transition>
                        <p>Jean Patry</p>
                        <p>Chef</p>
                    </div>
                    <div class="people">
                        <div class="circle">
                            <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                        <p>Jean Patry</p>
                        <p>Chef</p>
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
                        background: url("../../../../assets/team.jpg") no-repeat center;
                        border-radius: 50%;
                        background-size: cover;
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
                }
            }
        }
    }

</style>
