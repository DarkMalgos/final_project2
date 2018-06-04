<template>
  <section id="signin">
    <form action="">
      <input type="email" placeholder="exemple@email.com">
      <input type="password" placeholder="Mot de passe">
      <input type="submit" class="button">
    </form>
  </section>
</template>

<script>
  const Vue = require('vue')
  const VueResource = require('vue-resource');

  export default {
    name: "signIn",
    methods: {

    }
  }
</script>

<style scoped>
  #signin {
    height: cacl(100vh - 10vh);
    width: 100vw;
    margin-top: 10vh;
  }
</style>
