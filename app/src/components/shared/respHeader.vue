<template>
    <header id="menu">
        <div class="container resp">
            <div @click="selectLink">
                <router-link to="/" class="logo">
                    <img src="../../assets/logo2.png" alt="">
                </router-link>
            </div>
            <nav>
                <div class="burger-container" @click="openBurger">
                    <div id="burger">
                        <span></span>
                    </div>
                </div>
                <div class="ml-40" id="basket">
                    <router-link to="/cart">
                        <img src="../../assets/basket.png" alt="">
                        <span class="after">{{quantity}}</span>
                    </router-link>
                </div>
            </nav>
        </div>
        <transition name="slide-fade">
            <ul v-if="showMenu">
                <li @click="selectLink" class="mb-20">
                    <a @click="scrollInto('#how-it-work')">Comment ça marche ?</a>
                </li>
                <li @click="selectLink" class="mb-10">
                    <a @click="scrollInto('#who-we-are')">Qui sommes-nous ?</a>
                </li>
                <li @click="selectLink">
                    <router-link to="/order">Commander</router-link>
                </li>
                <li @click="selectLink">
                    <router-link to="/contact">Contact</router-link>
                </li>
                <template v-if="!user">
                    <li @click="selectLink">
                        <router-link to="/sign-in">Connexion</router-link>
                    </li>
                    <li @click="selectLink" class="button">
                        <router-link to="/sign-up">Inscription</router-link>
                    </li>
                </template>
                <template v-if="user">
                    <li @click="showMenu=false">
                        <router-link to="/account">Mon compte</router-link>
                    </li>
                    <li class="button" @click.prevent="disconnect">
                        <router-link to="javascript:void(0)">Déconnection</router-link>
                    </li>
                </template>
            </ul>
        </transition>
    </header>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "respHeader",
        props: {
            user: Boolean,
            quantity: 0
        },
        data() {
            return {
                drop: false,
                nb_items: 0,
                quantity: 0,
                showMenu: false
            }
        },
        watch: {
            getQuantity: function (val) {
                this.quantity = val
            }
        },
        methods: {
            ...mapActions([
                'newQuantity'
            ]),
            scrollInto(ancre) {
                let road = window.location.hash.split('#')
                if (road[1] != '/') {
                    if (ancre != '#ship')
                        this.$router.push(`/${ancre}`)
                    else
                        this.$router.push(`/`)
                } else {
                    document.querySelector(ancre).scrollIntoView({
                        behavior: 'smooth'
                    });

                }
            },
            selectLink() {
                let burger = document.querySelector('#burger')
                if (burger.getAttribute('class') == 'active') {
                    burger.classList.toggle('active')
                    this.showMenu = false
                }
            },
            disconnect() {
                this.showMenu = false
                document.querySelector('#burger').classList.toggle('active')
                this.$cookies.remove('user')
                this.$emit('disconnect')
                this.$router.push('/')
            },
            openBurger() {
                let burger = document.querySelector('#burger')
                burger.classList.toggle('active')
                if (burger.getAttribute('class') == 'active') {
                    this.showMenu = true
                } else {
                    this.showMenu = false
                }
            }
        },
        mounted() {
            let cart = this.$cookies.get('cart')
            if (cart != null) {
                cart = JSON.parse(cart)
                this.newQuantity(cart.cart)
            }
            this.quantity = this.getQuantity
            console.log(this.quantity)
        },
        computed: {
            ...mapGetters([
                'getQuantity'
            ])
        }
    }
</script>

<style scoped lang="scss">
    #menu {
        align-self: flex-start;
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 10vh;
        width: 100%;
        box-shadow: 0px 3px 6px rgba(99, 150, 189, .16);
        background-color: #FBFBFB;
        z-index: 1000;
        .logo img {
            cursor: pointer;
            margin-top: 10px;
            width: 145px;
        }
        .resp {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
        }
        nav {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            position: relative;
            height: 100%;
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
        .burger-container {
            position: relative;
            height: 100%;
            margin-right: 40px;
            #burger {
                z-index: 50000;
                display: flex;
                background: transparent;
                position: absolute;
                cursor: pointer;
                left: 10%;
                top: 50%;
            }

            #burger span,
            #burger span:before,
            #burger span:after {
                cursor: pointer;
                border-radius: 5px;
                height: 4px;
                width: 35px;
                background: #5F93BB;
                position: absolute;
                left: 0;
                top: 50%;
                display: block;
                content: '';
            }

            #burger span:before {
                top: -10px;
            }

            #burger span:after {
                top: 10px;
            }

            #burger span,
            #burger span:before,
            #burger span:after {
                transition: all 0.5s ease-in-out;
            }

            #burger.active span {
                background-color: transparent;
            }

            #burger.active span:before,
            #burger.active span:after {
                top: 50%;
            }

            #burger.active span:before {
                transform: rotate(135deg);
            }

            #burger.active span:after {
                transform: rotate(-135deg);
            }
        }
        ul {
            position: absolute;
            top: 10vh;
            height: 90vh;
            width: 100vw;
            background: #fbfbfb;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            li {
                cursor: pointer;
            }
            a {
                text-decoration: none;
                color: black;
            }
        }
        #basket {
            a {
                img {
                    width: 30px;
                }
                position: relative;
                .after {
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
                }
            }
        }
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
