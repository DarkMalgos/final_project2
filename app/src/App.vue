<template>
    <main id="app">
        <component :is="witchHeader" :user="user" @disconnect="disconnect"></component>
        <notifications group="notify" classes="my-notification"></notifications>
        <router-view @connect="connect" :user="user"/>
        <Footer></Footer>
    </main>
</template>

<script>
    import Header from './components/shared/Header'
    import RespHeader from './components/shared/respHeader'
    import Footer from './components/shared/Footer'

    export default {
        name: 'App',
        data() {
            return {
                affModal: false,
                modalMess: '',
                user: false,
                witchHeader: 'Header'
            }
        },
        components: {
            Header,
            RespHeader,
            Footer
        },
        methods: {
            connect(user) {
                this.user = true
                this.$cookies.set('user', user, "14d")
            },
            disconnect() {
                this.user = false
            }
        },
        mounted() {
            if (window.innerWidth < 870) {
                this.witchHeader = 'RespHeader'
            }

            let user = this.$cookies.get('user')
            if (user != null) {
                this.connect(user)
            }
        }
    }
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        list-style: none;
        font-family: 'Lato', sans-serif;
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
        height: auto;
        cursor: pointer;
        transition: all ease .5s;
        padding: 5px;
        background: transparent;
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

    .my-notification {
        padding: 10px;
        margin: 0 5px 5px;

        font-size: 16px;

        color: #ffffff;
        background: #44A4FC;

        &.warn {
            background: #ffb648;
        }

        &.error {
            background: #E54D42;
        }

        &.success {
            background: #68CD86;
        }
    }
</style>
