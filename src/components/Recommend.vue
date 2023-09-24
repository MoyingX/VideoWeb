<template>
  <div>
    <!-- 推荐 -->
    <Loading v-if="this.imgList == 0"></Loading>
    <div v-else style="width: 355px; margin: 0 auto;">
      <!-- 轮播图 -->
      <van-swipe @change="onChange" class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img style="width: 355px;height: 200px;" :src="item.model.cover" alt="">
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
              <span style="display: inline-block; 
                            background-color: rgba(0, 0, 0, 0) ;
                            font-weight:bold;">{{ current + 1 }}</span>/6
          </div>
        </template>
      </van-swipe>


      <!-- 推荐列表 -->
      <div class="recommendList">
        <div class="recommend" v-for="(item,index) in imgList" :key="index">
          <div class="recommendImg">
            <img :src="item.children[0].model.resource.cover" alt="">
          </div>
          <div class="recommendContent">
            {{item.children[0].model.resource.title}}
          </div>
          <div class="recommendFooter">
            <div>91影视</div>
            <div style="font-size: 16px;font-weight: bold;line-height: 20px;">...</div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script> 
import Loading from '../components/Loading.vue';
export default {
  name:'Recommend',
  data() {
    return {
      bannerList:[],
      current: 0,
      imgList:[],
      imgListBigBox:[],
    }
  },
  components:{
    Loading,
  },
  methods: {
    onChange(index) {
      this.current = index;
    },

    getRecommendData(){
      var that = this;
      this.axios.get('https://apic.netstart.cn/xpc/home/recommend').then((res)=>{
        console.log('res=>',res);
        var bannerList = res.data.data.children[0].children
        that.bannerList = bannerList

        var imgList = res.data.data.children
        that.imgList = imgList.filter((val,index,imgList) =>{
          return index !==0
          // return (index+1) % 5 == 0
        })

        console.log("that.imgList=>",that.imgList);

      })
    }
  },
  created(){
    this.getRecommendData();
  }
  
}
</script>

<style lang="less" scoped>
.my-swipe{
  border-radius: 15px;margin:0 auto;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 0px;
  text-align: center;
  background-color: #39a9ed;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0);
  color: #fff;
  letter-spacing:2px
}
  

.recommendList{
  margin-top: 10px;
  width: 100%;
  height: 1000px;
  // border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .recommend{
    margin-bottom: 10px;
    width: 49%;
    background-color: #fff;
    border-radius: 20px;
    .recommendImg{
      img{
        width:100%;
        height: 120px;
        border-radius: 20px;
      }
    }
    .recommendContent{
      padding-left: 10px;
      padding-right: 10px;
      text-align: left;
      font-size: 14px;
      font-weight: bold;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2; 
      // img{
      //   width:100%;
      //   height: 110px;
      //   border-radius: 20px;
      // }
    }
    .recommendFooter{
      margin-top: 10px;
      margin-bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;
      text-align: left;
      font-size: 12px;
      color: darkgray;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

</style>