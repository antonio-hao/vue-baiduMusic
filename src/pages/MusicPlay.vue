<template>
  <div class="play">
    <div class="header">
      <div class="title">
        <router-link to="/">
          <i class="iconfont icon-shouye left"></i>
        </router-link>
        <div class="music-info">
          <p>{{ playData.songinfo.title }}</p>
          <p>{{ playData.songinfo.author }}</p>
        </div>
        <router-link to="/"><i class="iconfont icon-sousuo right"></i></router-link>
      </div>
    </div>
    <div class="song-info">
      <div class="song-info-img">
        <img :src="playData.songinfo.pic_big">
        <div class="song-lrc">
          <LRC :currentTime="currentTime" :durationTime="durationTime" :songid="$route.params.songid"/>
        </div>
      </div>
      <div class="iconbox">
        <i class="iconfont icon-shoucang2 left"></i>
        <i class="box"></i>
        <i class="iconfont icon-xiazai right"></i>
      </div>
    </div>
    <div class="song">
      <audio ref="player" :src="playData.bitrate.file_link" autoplay controls>
      </audio>
    </div>
  </div>
</template>

<script>
  import "../assets/font/iconfont.css"
  import LRC from "../components/LRC"

    export default {
        name: "play",
        components:{
          LRC
        },
        data(){
          return{
            playData:{
              songinfo:{},
              bitrate:{}
            },
            currentTime:null,//当前播放时间
            durationTime:null//歌曲时常
          }
        },
        methods:{
          addEventListeners(){
            const self = this;
            self.$refs.player.addEventListener('timeupdate',self._currentTime);
            self.$refs.player.addEventListener('canplay',self._durationTime)
          },
          removeEventListeners(){
            const self = this;
            self.$refs.player.removeEventListener('timeupdate',self._currentTime);
            self.$refs.player.removeEventListener('canplay',self._durationTime)
          },
          _currentTime(){
            const self = this;
            self.currentTime = self.$refs.player.currentTime;
          },
          _durationTime(){
            const self = this;
            self.durationTime = self.$refs.player.duration;
          }
        },
        mounted(){
          this.addEventListeners();
          console.log("歌曲播放模块加载完成~~")
        },
        beforeDestroy(){
          this.removeEventListeners();
          console.log("歌曲播放模块卸载~~")
        },
        created() {
          const playUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.play&songid="+this.$route.params.songid
          this.$axios.get(playUrl)
            .then(res=>{
              this.playData = res.data;

            })
            .catch(error=>{
              console.log(error);
            })
        }
    }

</script>

<style scoped>
  .header{
    padding:15px;
  }

  .music-info{
    flex: 1;
    font-size: 20px;
  }

  .title{
    display: flex;
    text-align: center;
  }

  .left{
    font-size: 30px;
  }

  .right{
    font-size: 30px;
  }

  .song-info{
    padding: 15px;
  }

  .song-info-img{
    text-align: center;
  }

  .song-info-img img{
    width: 50%;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 rgba(50,50,50,.31);
  }

  .song-lrc{
    margin-top: 10px;
    min-height: 50px;
  }

  .iconbox{
    display: flex;
    margin-top: 30px;
  }

  .iconbox .box{
    flex: 1;
  }

  .song{
    width: 100%;
    text-align: center;
  }

  .song audio{
    width: 80%;
  }

  .active{
    color: #222;
  }
</style>
