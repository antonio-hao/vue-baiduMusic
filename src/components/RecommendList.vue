<template>
  <div class="recommend" >
    <div class="panel hotsongs on"  v-loading.fullscreen.lock="fullscreenLoading">
      <vue-data-loading :loading="loading" :completed="completed" :listens="['pull-up','pull-down']" @pull-up="pullUp" @pull-down="pullDown">
        <ul class="list">
          <router-link :key="index" :to="{name:'MusicPlay',params:{songid:item.song_id}}" tag="li" class="song" v-for="(item,index) in musicData">
            <div class="poster">
              <img :src="item.pic_big" :alt="item.title"/>
            </div>
            <div class="info">
              <div class="name">{{item.title}}</div>
              <div class="author">{{item.author}}</div>
            </div>
          </router-link>
        </ul>
      </vue-data-loading>
    </div>
  </div>
</template>

<script>
  import VueDataLoading from 'vue-data-loading'

  export default {

    name: "recommendList",
    data(){
      return{
        fullscreenLoading:true,
        musicData:[],
        loading: false,
        completed: false,
        offsetNum:0
      }
    },
    props:{
      musictype:{
        type:String,
        default:1
      }
    },
    components:{
      VueDataLoading
    },
    created(){
      this.fetchData()
    },
    methods:{
      fetchData(){
        this.loading = true;
        const musiclistUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.billboard.billList&type="+ this.musictype +"&size=20&offset=" + this.offsetNum
        this.$axios.get(musiclistUrl)
          .then(res=>{
            if(this.offsetNum === 0){
              this.musicData=[]
            }
            this.musicData = this.musicData.concat(res.data.song_list);
            this.loading = false;
            this.offsetNum +=20;
            this.fullscreenLoading = false
          })
          .catch(error=>{
            console.log(error);
          })
      },
      pullUp() {
        this.fullscreenLoading = true
        this.fetchData()
      },
      pullDown() {
        this.fullscreenLoading = true
        this.offsetNum = 0;
        this.completed = false;
        this.fetchData()
      },
    }
  }
</script>

<style scoped>
  .recommend{
    background-color: #fff;
    margin-top: 10px;
    padding: 10px 17px;
    padding-top: 0;
  }

  .layout.home .mod-lists .panel {
    border-top: 1px solid #eee;
    position: relative;
    top: -1px;
    display: none;
  }

  .list {
    word-wrap: break-word;
    -webkit-hyphens: auto;
    hyphens: auto;
    word-break: break-all;
    min-height: 330px;
  }

  .panel .list li {
    height: 55px;
    border-bottom: 1px solid #eee;
    padding-left: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }

  .list li.song {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    min-height: 55px;
    text-align: left;
    margin-top: 10px;
  }

  .panel .list li .poster {
    position: relative;
    width: 45px;
    margin-right: 8px;
  }

  .panel .list li .poster img {
    border: 1px solid #eee;
  }

  .list li .info {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .panel .list li .info .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    color: #333;
  }

  .panel .list li .info .author {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color: #999;
    margin-top: 2px;
  }

  .more-songs{
    color: #999;
    margin-top: 9px;
    font-size: 12px;
    text-align: center;
    height: 32px;
    line-height: 32px;
  }
</style>
