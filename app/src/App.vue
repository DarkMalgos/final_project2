<template>
  <main id="app">
    <Header></Header>
    <router-view/>
    <button @click="getUsers">click</button>
  </main>
</template>

<script>
  import Header from './components/shared/Header'

  export default {
    name: 'App',
    components: {
      Header
    },
    methods: {
      getUsers() {
        this.$http.get('http://localhost:3000/users/')
          .then(response => {
            console.log(response.data)
          })
          .catch(e => {
            console.error(e)
          })
      }
    }
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    font-family: 'Ubuntu', sans-serif;
  }
  .container {
    width: 95vw;
    margin: 0 auto;
  }
  .button {
    border-radius: 25px;
    border-bottom: solid 3px #40637e;
    padding: 5px;
    width: 100%;
    background-color: #5F93BB;
    cursor: pointer;
  }

  .button-red {
    border-radius: 25px;
    border-bottom: solid 3px #ae3f3f;
    padding: 5px;
    width: 10%;
    background-color: #E45353;
    cursor: pointer;
  }

  .is-hidden {
    display: none!important;
  }

  .ml-20 {
    margin-left: 20px;
  }
</style>
