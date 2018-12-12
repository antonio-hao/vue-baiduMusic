<template>
    <div class="container">
      <Search/>
      <SwiperSilder/>
      <MusicNav/>
      <router-view></router-view>
      <Singer/>
    </div>
</template>

<script>
  import MusicNav from "./MusicNav"
  import  Singer from "./Singer"
  import SwiperSilder from "../components/SwiperSilder"
  import Search from "../components/Search"


    export default {
        name: "index",
      data(){
        return{

        }
      },
      components: {
          MusicNav,
          Singer,
        SwiperSilder,
        Search
      }
    }
</script>

<style scoped>

</style>
