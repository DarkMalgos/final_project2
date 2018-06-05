<template>
    <main id="app">
        <Header></Header>
        <router-view/>
    </main>
</template>

<script>
    import Header from './components/shared/Header'

    export default {
        name: 'App',
        components: {
            Header
        },
        mounted() {
            console.log('test to post')
            this.$http.post('http://localhost:3000/users/', {
                name: 'toto'
            })
                .then(response => {
                    console.log(response.data)
                })
                .catch(e => {
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
    }

    body {
        background-color: #FBFBFB;
    }

    .container {
        width: 95vw;
        margin: 0 auto;
    }

    .button {
        border-radius: 3px;
        border: solid 2px #5F93BB;
        padding: 5px;
        width: 100%;
        cursor: pointer;
        a {
            color: #5F93BB !important;
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

    .ml-20 {
        margin-left: 20px;
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
