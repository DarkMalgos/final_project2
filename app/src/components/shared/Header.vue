<template>
    <header id="menu">
        <nav class="container">
            <ul>
                <li class="drop">
                    <p @click="showDrop">à propos</p>
                    <ul v-if="drop" class="dropped">
                        <li class="mb-20">
                            <a @click="scrollInto('#how-it-work')">comment ça marche ?</a>
                        </li>
                        <li class="mb-10">
                            <a @click="scrollInto('#who-we-are')"">qui sommes-nous ?</a>
                        </li>
                    </ul>
                </li>
                <li class="ml-20">
                    <router-link to="">commander</router-link>
                </li>
                <li class="ml-20">
                    <router-link to="">contact</router-link>
                </li>
            </ul>
            <router-link to="/" id="logo">
                <img src="../../assets/logo2.png" alt="">
            </router-link>
            <ul>
                <li>
                    <router-link to="/sign-in">connexion</router-link>
                </li>
                <li class="ml-20 button">
                    <router-link to="">inscription</router-link>
                </li>
                <li class="ml-20">
                    <router-link to=""><img src="../../assets/basket.png" alt=""></router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                drop: false
            }
        },
        methods: {
            showDrop() {
                this.drop = true

                //document.querySelector('#menu').style.padding = '0 0 55px 0'
                document.querySelectorAll('.drop')[0].classList.add('align-drop')
            },
            scrollInto(ancre) {
                document.querySelector(ancre).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    #menu {
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 10vh;
        width: 100%;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, .2);
        background-color: #FBFBFB;
        nav {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            #logo img {
                margin: 10px 40px 0 40px;
                width: 145px;
            }
            ul {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                li {
                    cursor: pointer;
                }
                a {
                    text-decoration: none;
                    color: black;
                }

                &:last-child {
                    li:last-child {
                        a {
                            img {
                                width: 50px;
                            }
                            position: relative;
                            &:after {
                                content: '0';
                                position: absolute;
                                width: 20px;
                                height: 20px;
                                background-color: #E45353;
                                color: white;
                                bottom: 0;
                                right: 0;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-family: 'Ubuntu', sans-serif;
                            }
                        }
                    }
                }
            }
            .align-drop {
                text-align: right;
                margin-top: 36.5%;
                p {
                    margin-bottom: 20px;
                }
            }
            .dropped {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                -webkit-box-pack: end;
                -ms-flex-pack: end;
                justify-content: flex-end;
                align-items: flex-end;
                height: auto;
                background-color: #FBFBFB;
                padding: 15px;
                text-align: right;
                box-shadow: 0px 5px 6px rgba(0, 0, 0, .2);
                a {
                    &:after {
                        display: none!important;
                    }
                }
            }
        }
    }
</style>
