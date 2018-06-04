<template>
  <header id="menu">
    <nav class="container">
      <ul></ul>
      <router-link to="/" id="logo">
        <img src="../../assets/logo2.png" alt="">
      </router-link>
      <ul></ul>
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
      justify-content: space-between;
      #logo img {
        margin-top: 10px;
        width: 145px;
      }
      ul {
        height: 100%;
      }
      .link-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        .basket {
          background-color: #5F93BB;
          width: 100%;
          border-radius: 50%;
          border-bottom: solid 3px #40637e;
          border-right: solid 3px #40637e;
          position: relative;
          &:after {
            content: '0';
            position: absolute;
            background-color: #E45353;
            border-bottom: solid 3px #ae3f3f;
            border-right: solid 3px #ae3f3f;
            color: white;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
            bottom: -5px;
            right: -5px;
          }
        }
        &:last-of-type{
          .link:last-of-type {
            padding: 0 5px;
            width: 100px;
          }
          a {
            color: white!important;
          }
          .link:first-of-type {
            margin-right: 20px;
            a {
              color: black!important;
            }
          }
        }
        .link {
          list-style: none;
          display: flex;
          justify-content: center;
          align-items: center;
          a {
            text-decoration: none;
            color: black;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            p {
              margin-left: 5px;
              transform: rotate(90deg);
            }
          }
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>
