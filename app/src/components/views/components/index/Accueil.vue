<template>
  <section id="ship">
    <div class="container">
      <h1>Le bien mangé français livré où vous voulez !</h1>
      <div>
        <input type="text" id="adress" placeholder="10 avenue du maine, Paris, 750015">
        <div><img src="../../../../assets/search.png" alt=""></div>
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
        margin-bottom: 50px;
        font-size: 25px;
      }
      img {
        width: 500px;
      }
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 550px;
        height: 30px;
        box-shadow: 0px 12px 6px rgba(0, 0, 0, .2);
        input {
          width: 90%;
          height: 100%;
          padding: 10px;
          border: none;
          font-size: 20px;
          &::placeholder {
            color: rgba(0,0,0,.41);
            font-size: 20px;
          }
        }
        div {
          width: 10%;
          background-color: #5F93BB;
          height: 100%;
          padding: 10px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: none;
          img {
            height: 80%;
            width: auto;
          }
        }
      }
    }
  }
</style>
