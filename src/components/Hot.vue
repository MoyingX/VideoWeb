<template>
  <!-- 热门 -->
  <div ref="scrollContainer">
    <Loading v-if="cardImgDataList==0"></Loading>
    <div style="width: 360px; margin: 0 auto;">
      <!-- 轮播图 -->
      <van-swipe @change="onChange" class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img :src="item.model?item.model.cover:''" alt="" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            <span style="display: inline-block; 
                          background-color: rgba(0, 0, 0, 0) ;
                          font-weight:bold;">{{ current + 1 }}</span>/5
          </div>
        </template>
      </van-swipe>
      

      <!-- 子标题 -->
      <van-grid :border="false">
        <van-grid-item v-for="(item,index) in iconList" :key="index"
                              :icon="iconList[index].model.icon" 
                              :text="iconList[index].model.title" />
      </van-grid>

      
      <!-- 内容：卡片 -->
      <div class="card" v-for="(item,index) in cardImgDataList" :key="index">
        <!-- 卡片--标题部分 -->
        <div class="cardTitle">
          <div class="Apple">
            <img :src="item.author.userinfo.avatar">
            <span> {{item.author.userinfo.username}} </span>
          </div>
          <div class="ddd">…</div>
        </div>

        <!-- 卡片--图片部分 -->
        <div class="cardContent"  @click="goDetail(item,index)">
          <span class="contentTitle">{{item.title}}</span>
          <img :src="item.cover" style="margin-top: 5px;" alt="">
          <span class="contentFooter">{{(item.count.count_view /10000).toFixed(1)}}w 观看 | {{parseInt(item.duration / 60 % 60)}}'{{(item.duration % 60)}}"</span>
        </div>

        <!-- 卡片--点赞评论收藏部分 -->
        <div class="cardFooter">
          <div @click="collectPlusOne(item,index)" class="cardFooterBox">
            <van-icon :name="item.vr?'star':'star-o'" style="margin-top: -3px;" />
            <span>{{ item.count.count_collect }}</span>
          </div>
          <div class="cardFooterBox">
            <van-icon name="comment-o" />
            <span>{{ item.count.count_comment }}</span>
          </div>
          <div @click="likePlusOne(item,index)" class="cardFooterBox">
            <van-icon :name="item.is_vr?'good-job':'good-job-o'" />
            <span>{{ item.count.count_like }}</span>
          </div>
        </div>
      </div>

      <!-- 垫脚石 -->
      <div style="width: 100%; height: 50px;"></div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Lazyload } from 'vant';
import Loading from '../components/Loading.vue'
Vue.use(Lazyload);

export default {
  name:'Hot',
  data() {
    return {
      bannerList:[],
      iconList:[],
      // cardList:[],
      cardImgDataList:[],
      current:0,

    }
  },
  components:{
    Loading,
  },
  methods:{
    // 收藏事件
    collectPlusOne(item,index){
      console.log('收藏的item=>',item);
      item.vr = !item.vr
      if (item.vr != 0) {
        item.count.count_collect = item.count.count_collect + 1
        this.$store.commit('videoCollect',item)
      }else{
        item.count.count_collect = item.count.count_collect - 1
        this.$store.commit('deleteVideoCollect',item)
      }
    },


    //点赞事件
    likePlusOne(item,index){
      console.log('点赞的item=>',item);
      item.is_vr= !item.is_vr
      if (item.is_vr != 0) {
        item.count.count_like = item.count.count_like + 1
        this.$store.commit('videoLike',item)

      }else{
        item.count.count_like = item.count.count_like - 1
        this.$store.commit('deleteVideoLike',item)
      }
      
    },

    

    onChange(index) {
      this.current = index; 
    },

    // 获取页面数据
    getHotData(){
      var that = this;
      this.axios.get('https://apic.netstart.cn/xpc/home/hot').then(function(res){
        console.log('res=>',res);

        // 请求轮播图数据
        // console.log('res.data.data.children[0]==>',res.data.data.children[0]);
        var bannerData = res.data.data.children[0].children;
        that.bannerList = bannerData;
        

        // 请求标题数据
        // console.log('res.data.data.children[1]==>',res.data.data.children[1]);
        var iconData = res.data.data.children[1].children;
        that.iconList = iconData
        // console.log(that.iconList);


        // 请求页面数据
        // for(let i = 2;i<res.data.data.children.length;i++){
        //   var cardData = res.data.data.children[2].children[0].model.resource.author.userinfo;
        //   that.cardList.unshift(cardData)
        // }
        // console.log('that.cardImgDataList[].author.userinfo',that.cardList);
        // console.log(that.cardList);


        //  请求页面图片
        for(let i = 2;i<res.data.data.children.length;i++){
          var cardImgData =  res.data.data.children[i].children[0].model.resource
          that.cardImgDataList.unshift(cardImgData)
        }
        console.log('cardImgDataList=>',that.cardImgDataList);

        // var cardImgData =  res.data.data.children[0].children[0].model.resource
        // that.cardImgDataList = cardImgData
        
      })
    },

    // 点击图片跳转视频页面事件
    goDetail(item,index){
      // console.log('item=>',item);
      var mediaid = item.media_id
      
      var articleId = item.id

      this.$router.push("/detail/"+mediaid+'/'+articleId+'/')

      
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.$store.commit('afterScroll',scrollTop)
      console.log('点击后的前一个页面滚动条的高度：',scrollTop);
    },
  
  },
  created(){
    this.getHotData();
    
  },
  mounted(){
    console.log('回到页面滚动条高度=>',this.$store.state.scrollTop);
    this.$refs.scrollContainer.scrollTop = this.$store.state.scrollTop
  },
}
</script>

<style lang="less" scoped>、

*{
  background-color: rgb(247, 247, 247);
}

// Vant2内置样式

.my-swipe{
  border-radius: 15px;margin:0 auto;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 40px;
    line-height: 0px;
    text-align: center;
    background-color: #39a9ed;    
}

.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 15px;
    background: rgba(0, 0, 0, 0);
    color: #fff;
    letter-spacing:2px
}
::v-deep .van-grid-item__content {
  background-color: rgb(247, 247, 247);  
}
img{
  width: 360px;
}
.van-icon{
  background-color: #fff;
}



// 自写样式

.card{
  background-color: #fff;
  margin-top: 5px;
  margin-bottom: 15px;
  box-shadow:0px 0px 5px darkgray;
  .cardTitle{
    width: 100%;
    height: 40px;
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    .Apple{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      img{
        width: 30px;
        margin-left: 10px;
        border-radius: 50%;
        
      }
      span{
        font-size: 10px;
        margin-left: 8px;
        color: gray;
        background-color: #fff;
      }
    }
    .ddd{
      width: 40px;
      height: 40px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      line-height: 30px;
      background-color: #fff;
      transform-origin: center center;
      transform: rotate(90deg);
    }
  }
  .cardContent{
    background-color: #fff;
    position: relative;
    text-align: left;

    .contentTitle{
      margin-left: 5px;
      font-size: 16px;
      line-height: 5px;
      background-color: #fff;
    }
    
    .contentFooter{
      position: absolute;
      // margin-top: 175px;
      font-size: 12px;
      right: 10px;
      bottom: 10px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0);
    }
  }
  .cardFooter{
    display: flex;
    justify-content: space-evenly;
    width: 360px;
    height: 43px;
    background-color: #fff;
    .cardFooterBox{
      background-color: #fff;
      width: 120px;
      height: 43px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      span{
        background-color: #fff;
        margin-left: 5px;
      }
    }
  }
}

</style>