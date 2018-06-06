<template>
  <section id="index">
    <Accueil></Accueil>
    <HowWeWork></HowWeWork>
    <!--<WhoWeAre></WhoWeAre>-->
  </section>
</template>

<script>
  import Accueil from '../components/index/Accueil'
  import HowWeWork from '../components/index/HowWeWork'
  import WhoWeAre from '../components/index/WhoWeAre'
  export default {
    name: 'index',
    components: {
      Accueil,
      HowWeWork,
      WhoWeAre
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #index {
    section {
      height: 100vh;
      width: 100%;
    }

  }
</style>
