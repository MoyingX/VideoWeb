<template>
  <div>
    <!-- 搜索框部分 -->
    <div style="padding: 0px 10px 10px 10px;margin-bottom: 8px;background-color: #fff;">
      <van-search v-model="value" placeholder="点击搜索" 
          style="box-shadow: 0px 10px 5px rgb(222, 222, 222);border-radius: 10px;" 
          @click="onclickSearch"
      />
    </div>
    
    <!-- 轮播图部分 -->
    <div class="header">
      <!-- 轮播图 -->
      <van-swipe @change="onChange" class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img style="width: 100%;height: 100%;" :src="item.cover" alt="">
        </van-swipe-item>
      </van-swipe>

      <!-- 标签 -->
      <div class="discovery">
        <ul>
          <li v-for="(item,index) in recommendedPositionList" :key="index">
            <img :src="item.icon" alt="">
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </div>
    </div>


    <!-- 分类作品库部分 -->
    <div class="categoriesList" :style="isAll?'height: 175px;overflow: hidden;':''">
      <div class="categoriesTitle">
        <span class="left">分类作品库</span>
        <span class="right" v-if="isAll"  @click="clickAll">查看全部</span>
        <span class="right" v-if="!isAll"  @click="clickAll">收起全部</span>
      </div>
      <div class="categories">
        <ul>
          <li v-for="(item,index) in categoriesList" :key="index">
            <img :src="item.cover" alt="">
            <span>{{ item.category_name }}</span>
          </li>
        </ul>
      </div>
    </div>



    <!-- 垫脚石 -->
    <div style="height: 50px;"></div>

  </div>
</template>

<script>
export default {
    name:'SearchIndex',
    data() {
        return {
          value: this.$store.state.historyArr[0],
          current: 0,
          bannerList:[],
          recommendedPositionList:[],
          categoriesList:[],
          isAll:1
        }
    },
    methods:{
      onChange(index) {
        this.current = index;
      },

      //  获取发现页面全部数据
      getDiscoveryData(){
        var that = this
        this.axios.get('https://apis.netstart.cn/xpc/page/discovery').then((res)=>{
          console.log(res);

          //  获取轮播图数据
          that.bannerList = res.data.data.banners
          // console.log('that.bannerList',that.bannerList);

          //  获取发现标签数据
          that.recommendedPositionList = res.data.data.recommended_position

          //  获取分类作品库数据
          that.categoriesList = res.data.data.categories
        })
      },


      onclickSearch(){
        this.$router.push('/search/')
      },

      clickAll(){
        this.isAll = !this.isAll
      },

    },
    created(){
      this.getDiscoveryData()
    }

}
</script>

<style lang="less" scoped>
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
}

.header{
  padding-left: 10px;
  padding-right: 10px;
  background-color: #fff;
}

.discovery{
  margin-top: 20px;
  padding-bottom: 20px;
  ul{
    display: flex;
    justify-content: space-around;
    align-items: center;
    li{
      height: 75px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      img{
        width: 40px;
      }
      span{
        font-size: 14px;
      }
    }
  }
}

.categoriesList{
  margin-top: 15px;
  padding: 30px 15px 0px 15px;

  background-color: #fff;
  .categoriesTitle{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .left{
      font-size: 18px;
      font-weight: bold;
    }
    .right{
      font-size: 12px;
      color: rgb(140, 140, 140);
    }
  }

  .categories{
    ul{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li{
        display: flex;
        margin-right: 5px;
        flex-direction: column;
        align-content: center;
        margin-bottom: 10px;
        line-height: 25px;
        img{
          width: 105px; 
          height: 100px; 
          border-radius: 12px;
        }
        span{
          font-size: 12px;
        }
      }
    }
  }
}
</style>