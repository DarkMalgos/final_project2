<template>
    <main id="app">
        <Header v-bind:user="user"></Header>
        <router-view v-on:connect="connect" :user="user"/>
        <Footer></Footer>
    </main>
</template>

<script>
    import Header from './components/shared/Header'
    import Footer from './components/shared/Footer'

    export default {
        name: 'App',
        data() {
            return {
                affModal: false,
                modalMess: '',
                user: false
            }
        },
        components: {
            Header,
            Footer
        },
        methods: {
            connect() {
                this.user = true
            }
        },
        mounted() {
            this.$http.get('http://localhost:3000/api/users')
                .then(response => {
                    if (response.data.user != undefined)
                        this.connect = true
                }).catch(e => {
                    console.error(e)
            })
        }
    }
</script>

<style lang="scss">
    @font-face {
        font-family: 'moon_2.0regular';
        src: url('assets/font/moon2.0-regular-webfont.woff2') format('woff2'),
        url('assets/font/moon2.0-regular-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;

    }

    * {
        margin: 0;
        padding: 0;
        list-style: none;
        font-family: 'moon_2.0regular';
        letter-spacing: 1.5px;
        word-spacing: -9px;
    }

    body {
        background-color: #FBFBFB;
    }

    #main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: auto;
        width: 100vw;
    }

    .container {
        width: 95vw;
        margin: 0 auto;
    }

    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        border: solid 2px #5F93BB;
        padding: 5px;
        cursor: pointer;
        transition: all ease .5s;
        a {
            color: #5F93BB !important;
            transition: all ease .5s;
        }
        &:hover {
            background-color: #5F93BB;
            a {
                color: white!important;
            }
        }
    }

    .button-red {
        border-radius: 3px;
        border: solid 3px #E45353;
        padding: 5px;
        width: 100%;
        cursor: pointer;
        background-color: transparent;
        color: #E45353 !important;
        a {
            color: #E45353 !important;
        }
    }

    .is-hidden {
        display: none !important;
    }

    .ml {
        &-20 {
            margin-left: 20px;
        }
        &-40 {
            margin-left: 40px;
        }
        &-60 {
            margin-left: 60px;
        }
    }

    .mb {
        &-20 {
            margin-bottom: 20px;
        }
        &-10 {
            margin-bottom: 10px;
        }
    }
</style>
