<template>
  <section id="ship">
    <div class="container">
      <h1 class="ml-20">Bienvenue chez</h1>
      <img src="../../../../assets/logo2.png" alt="">
      <label for="adress">où êtes-vous ?</label>
      <div>
        <input type="text" id="adress">
        <button class="button-red">Go !</button>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        name: "Accueil"
    }
</script>

<style scoped lang="scss">
  #ship {
    height: 90vh;
    width: 100%;
    margin-top: 10vh;
    background: url("../../../../assets/accueil.jpg") center no-repeat;
    background-size: cover;
    .container {
      //background-color: red;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      h1 {
        margin-bottom: 20px;
      }
      img {
        width: 500px;
      }
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }
    }
  }
</style>
