<template>
  <div class="lrcContainer">
    <div class="lrc" ref="lrc">
      {{getAllKey}}
      <p class="lrc-p"  :class="{'active':key < currentTime && key > currentTime -(keyArr[index+1]-keyArr[index])}" v-for="(item,key,index) in lrcData">{{item}}{{ srcollLrc(key,index) }}</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "lrc",
      data(){
          return {
            lrcData:{},
            keyArr:[]
          }
      },
        props:{
          currentTime:{
            type:Number,
            default:null
          },//当前播放时间
          durationTime:{
            type:Number,
            default:null
          },//歌曲时常
          songid:{
            type:String,
            default:0
          }
        },
      created(){
        const lrcUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.song.lry&songid="+this.songid
        this.$axios.get(lrcUrl)
          .then(res=>{
            //歌词处理
            var lyrics = res.data.lrcContent.split("\n");
            var lrcObj = {};
            for(var i = 0;i<lyrics.length;i++){
              var lyric = decodeURIComponent(lyrics[i]);
              var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
              var timeRegExpArr = lyric.match(timeReg);
              if(!timeRegExpArr)continue;

              var clause = lyric.replace(timeReg,'');
              var clause = clause.replace('\r','');
              for(var k=0,h=timeRegExpArr.length;k<h;k++){
                var t = timeRegExpArr[k];
                var min = Number(String(t.match(/\[\d*/i)).slice(1));
                var sec = Number(String(t.match(/\:\d*/i)).slice(1));
                var time = min*60 + sec;
                lrcObj[time] = clause;
              }
            }
            this.lrcData = lrcObj;
          })
          .catch(error=>{
            console.log(error);
          })
      },
      computed:{
        getAllKey:function(){
          for(var allkey in this.lrcData){
              this.keyArr.push(allkey);
          }
        }
      },
      methods:{
        srcollLrc(key,index){
          const lrcDiv = this.$refs.lrc
          if(key < this.currentTime && key > this.currentTime - (this.keyArr[index+1] - this.keyArr[index])){
            lrcDiv.style.top = -((index-2)*30)+"px"
          }
        }

      }
    }
</script>

<style scoped>

  .lrcContainer{
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
  }

  .lrc{
    width: 100%;
    position: absolute;
    top: 0;
  }
  .active{
    display: block;
  }
  .lrc-p{
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }

  .up30{
    margin-top: -30px;
  }

</style>
