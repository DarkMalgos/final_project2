<template>
    <header id="menu">
        <nav class="container">
            <ul>
                <li id="drop">
                    <p>À propos</p>
                    <ul class="dropped">
                        <li class="mb-20">
                            <a @click="scrollInto('#how-it-work')">Comment ça marche ?</a>
                        </li>
                        <li class="mb-10">
                            <a @click="scrollInto('#who-we-are')">Qui sommes-nous ?</a>
                        </li>
                    </ul>
                </li>
                <li class="ml-40">
                    <router-link to="">Commander</router-link>
                </li>
                <li class="ml-40">
                    <router-link to="">Contact</router-link>
                </li>
            </ul>
            <a @click="scrollInto('#ship')" id="logo" class="ml-60">
                <img src="../../assets/logo2.png" alt="">
            </a>
            <ul class="ml-60">
                <li>
                    <router-link to="/sign-in">Connexion</router-link>
                </li>
                <li class="ml-40 button">
                    <router-link to="">Inscription</router-link>
                </li>
                <li class="ml-40">
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
            scrollInto(ancre) {
                if (window.location.pathname != '/') {
                    let link = document.createElement('a')
                    ancre != '#ship' ? link.setAttribute('href', `/${ancre}`) : link.setAttribute('href', `/`)
                    link.click()
                } else {
                    document.querySelector(ancre).scrollIntoView({
                        behavior: 'smooth'
                    });

                }
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
        z-index: 1000;
        nav {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            #logo img {
                cursor: pointer;
                margin-top: 10px;
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
                                width: 30px;
                            }
                            position: relative;
                            &:after {
                                content: '0';
                                font-size: 10px;
                                position: absolute;
                                width: 15px;
                                height: 15px;
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
            #drop:hover {
                text-align: right;
                padding-top: 28.25%;
                position: relative;
                p {
                    margin-bottom: 83px;
                }
                .dropped {
                    display: flex;
                }
            }
            .dropped {
                display: none;
                position: absolute;
                text-align: right;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
                -webkit-box-pack: end;
                -ms-flex-pack: end;
                justify-content: flex-end;
                align-items: flex-end;
                height: auto;
                width: 200px;
                background-color: #FBFBFB;
                padding: 15px;
                text-align: right;
                box-shadow: 0px 5px 6px rgba(106, 146, 183, .2);
                bottom: -10%;
                right: 0;
                a {
                    &:after {
                        display: none !important;
                    }
                }
            }
        }
    }
</style>
