<template>
  <header id="menu">
    <nav class="container">
      <ul>
          <li>
              <p>à propos</p>
              <ul class="is-hidden">
                  <li>
                      <router-link to="">comment ça marche ?</router-link>
                  </li>
                  <li>
                      <router-link to="">qui sommes-nous ?</router-link>
                  </li>
              </ul>
          </li>
          <li class="ml-20">
              <router-link to="">commander</router-link>
          </li>
          <li class="ml-20">
              <router-link to="">contact</router-link>
          </li>
      </ul>
      <router-link to="/" id="logo">
        <img src="../../assets/logo2.png" alt="">
      </router-link>
      <ul>
          <li>
              <router-link to="/sign-in">connexion</router-link>
          </li>
          <li class="ml-20 button">
              <router-link to="">inscription</router-link>
          </li>
          <li class="ml-20">
              <router-link to=""><img src="" alt=""></router-link>
          </li>
      </ul>
    </nav>
  </header>
</template>

<script>
    export default {
        name: "Header"
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
    box-shadow: 0px 3px 6px rgba(0,0,0,.2);
    background-color: #FBFBFB;
    nav {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      #logo img {
          margin: 10px 40px 0 40px;
          width: 145px;
      }
      ul{
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          a {
              text-decoration: none;
              color: black;
          }
      }
    }
  }
</style>
