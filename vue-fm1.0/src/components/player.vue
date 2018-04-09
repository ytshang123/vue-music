<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <audio id="audioId" :src='first_mp3.url'></audio>
    <div>
      <input type="button" value="上一首" @click="isPrevBtn">
      <input type="button" value="播放" @click="playFn">
      <input type="button" value="暂停" @click="isPauseFn">
      <input type="button" value="下一首" @click="isNextBtn">
    </div>
    <div class="mp3Title">
      <label><img :src=mp3Title.img></label>
      <span class="mp3Singer">歌曲名：{{mp3Title.name}} <br/> 歌手：{{mp3Title.singer}}</span>
    </div>
    <h1 class="listTitle">
      <em @click="isHideFn">折叠</em>
      <i @click="isShowFn">展开</i>
    </h1>
    <transition name="fade">
      <div class="mp3list" v-show="showMusicList">
        <li v-for="(item,inx) in musicList">
          <a @click="switchSong(inx)">
            <label><img :src=item.img></label>
            <span>{{ item.name }} </span>
          </a>
        </li>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'player',
  data () {
    return {
      msg: '音乐播放器',
      musicList: '',
      orderNum: 0,
      first_mp3:'',
      showMusicList: true,
      mp3Title:''
    }
  },
  //钩子函数
  created(){
    this.getData();
  },
  //监听歌曲序号的变化
  //watch监听对象  当orderNum发生变化时，执行playFn
  watch:{
    'orderNum': 'playFn'
  },
  methods:{
    getData(){
      //ajax    .then()回调 得到返回的值
      axios.get('http://localhost:1234/mp3-list')
        .then((_data)=>{
          console.log(_data);
          this.musicList = _data.data.music;
          this.first_mp3 = this.musicList[0];
          this.mp3Title = this.musicList[0];
        })
      
    },
    //公共播放方法
    playFn(){
      let _audioId = document.getElementById('audioId');
      _audioId.setAttribute('src',this.musicList[this.orderNum].url);
      this.mp3Title = this.musicList[this.orderNum];
      _audioId.play();
    },
    //暂停方法
    isPauseFn(){
      document.getElementById('audioId').pause();
    },
    //点击歌曲列表
    switchSong(_inx){
      console.log(_inx);
      this.orderNum = _inx;
    },
    //显示列表
    isShowFn(){
      this.showMusicList = true;
    },
    //隐藏列表
    isHideFn(){
      this.showMusicList = false;
    },
    //上一首
    isPrevBtn(){
      if((this.orderNum--) == 0){
        this.orderNum = this.musicList.length-1;
      }
      console.log(this.orderNum);
      
    },
    //下一首
    isNextBtn(){
      if((this.orderNum++) == this.musicList.length-1){
        this.orderNum = 0;
      }
      console.log(this.orderNum);
      
    }
  }
}
</script>

<style scoped>
*{margin:0;padding:0;border:0;}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
h1.listTitle{
  display: block;height: 50px;position: relative;
  width:80%;margin:0 auto;font-size: 14px;
}
/*显示按钮*/
h1.listTitle i{
  display: block;position: absolute;top: 0;right: 0;
  cursor: pointer;font-style: normal;border:1px solid #000;
  width: 30px;height: 30px;border-radius: 100%;
  line-height: 30px;
}
/*隐藏按钮*/
h1.listTitle em{
  display: block;position: absolute;top: 0;left: 0;
  cursor: pointer;font-style: normal;border:1px solid #000;
  width: 30px;height: 30px;border-radius: 100%;
  line-height: 30px;
}
div.btnWrap{
  width: 95%;margin:10px auto;height: 40px;
  border:1px solid #000;padding:10px 0 0 0;
}
div.btnWrap input{
  margin:0 10px; 
}
.mp3list{
  /*display: none;*/
}
.mp3list li{overflow: hidden;
  display: block;clear: both;background: #ddd;margin:10px;
}
.mp3list li:hover{
  background: #eee;
}
.mp3list li label{float: left;}
.mp3list li label img{width: 50px;height:50px;margin:10px;}
.mp3list li span{
  float: left;font-size: 22px;line-height: 70px;
}
input{padding:10px;margin:10px;}
input:hover{background: #eee;}
.mp3Title{
  position: relative;
  width: -moz-fit-content; 
  width:-webkit-fit-content; 
  width: fit-content; 
  margin:0 auto;
  height: 60px;
  padding-top: 120px;
}
.mp3Title label,
.mp3Title span{
  display: block;
}
.mp3Title label img{
  display: block;
  width:100px;
  height: 100px;
  border-radius: 100%;
  margin:0 auto;
  border:5px solid #666;
  position: absolute;
  top: 0;
  animation: imgGun 10s linear infinite;
}
@keyframes imgGun{
from {transform: rotate(0);}
to {transform: rotate(360deg);}
}
.fade-enter-active, .fade-leave-active{
transition: all 0.5s ease;
}
.fade-enter, .fade-leave-active{
transform:translateY(-20px);
 opacity: 0;
}
</style>
