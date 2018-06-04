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
    list-style: none;
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
      color: #5F93BB!important;
    }
  }

  .button-red {
    border-radius: 3px;
    border: solid 3px #E45353;
    padding: 5px;
    width: 100%;
    cursor: pointer;
    background-color: transparent;
    color: #E45353!important;
    a {
      color: #E45353!important;
    }
  }

  .is-hidden {
    display: none!important;
  }

  .ml-20 {
    margin-left: 20px;
  }
</style>
