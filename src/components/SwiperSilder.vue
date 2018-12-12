<template>
    <div class="silder">
      <swiper :options="swiperOption" >
        <!-- slides -->
        <swiper-slide>
          <img src="../assets/banner/b1.jpg">
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/banner/b2.jpg">
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/banner/b3.jpg">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
      </swiper>
    </div>
</template>

<script>
    export default {
        name: "silder",
      data(){
          return{
            swiperOption: {
              pagination: {
                el: '.swiper-pagination'
              },
              loop:true,
              autoplay:true
            }
          }

      }
    }
</script>

<style scoped>

</style>
