<template>
  <div style="background-color: #fff;">
    <Loading v-if="hotList.length == 0"></Loading>
    <div v-else>
      
      <div class="searchBox">
        <div class="searchBack">
          <van-icon name="arrow-left" size="30" @click="back"/>
        </div>
        <form action="/" style="width: 80%;">
          <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            @search="onSearch"
          />
        </form>
        <div class="searchButton" @click="SearchClick()">
          <span>搜索</span>
        </div>
      </div>
      
      <div class="historySearchApp">
        <!-- 历史记录标题 -->
        <div class="historyTitle">
          <div class="historyTitleText">
            历史搜索
          </div>
          <div style="margin-right: 10px;">
            <van-icon @click="clearHistory" name="delete-o" size="20"/>
          </div>
        </div>
        <!-- 历史记录 -->
        <div class="historyList">
          <p v-show="this.$store.state.isShowP" style="color: rgb(200, 200, 200);">暂无搜索记录</p>
          <ul>
            <li v-for="(item,index) in $store.state.historyArr" :key="index" @click="historyClick(item)">
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- 热门内容标题 -->
        <div class="hotTitle">
          热门内容
        </div>
        <!-- 热门内容 -->
        <div class="hotContect">
          <ul>
            <li v-for="(item,index) in hotList" :key="index" @click="goDetail(item,index)">
              <span :style="`color:${index<3?'red':'#cccccc'}; font-weight:${index<3?'bold':''}`">{{ index+1 }}</span>
              <span style="padding-left: 10px;">{{ item.title }}</span>
            </li>
          </ul>
        </div>

        <!-- 热门搜索标题 -->
        <div class="hotTitle">
          热门搜索
        </div>

        <!-- 热门搜索 -->
        <div class="hotSearch">
          <ul>
            <li v-for="(item,index) in hotSearch" :key="index" @click="hotSearchClick(item)">
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>


        <!-- 垫脚石 -->
        <div style="height: 45px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue';
import { Dialog } from 'vant';
import { Toast } from 'vant';


export default {
  name:'SearchView',
  data() {
    return {
      value: ''||this.$store.state.historyArr[0],
      historyArr:[],
      hotList:[],
      hotSearch:[],
    };
  },
  components:{
    Loading,
    [Dialog.Component.name]: Dialog.confirm
  },
  
  methods: {
    //  回退按钮
    back(){
      this.$router.back(-1)
    },


    // 清除历史记录
    clearHistory(){
      Dialog.confirm({
        message: '历史记录清除后无法恢复，是否清除全部记录',
      })
        .then(() => {
          this.$store.state.historyArr = []
          this.$store.state.isShowP = 1
          Toast('已全部清除历史记录！')
        })
        .catch(() => {

        });
    },

    
    //  搜索框确认搜索事件
    onSearch(val) {
      this.$store.commit('getHistoryArr',val)
      this.value = ''
      this.historyArr = this.$store.state.historyArr
      this.$store.state.isShowP = 0
      var kw = val
      this.$router.push(`/searchResult/${kw}`)
    },


    // 获取热门数据
    getHotList(){
      var that = this
      this.axios.get(`https://apis.netstart.cn/xpc/search?kw=${'周杰伦'}`).then((res)=>{
        // console.log(res);
        that.hotList =res.data.data.list.splice(0,10)
      })
    },


    // 获取热门搜索
    getHotSearch(){
      var that = this
      this.axios.get('https://apis.netstart.cn/xpc/search/recommend_kws').then((res)=>{
        that.hotSearch = res.data.data.list
        // console.log('that.hotSearch',that.hotSearch);
      })
    },


    //  定义跳转到详情方法
    goDetail(item,index){
      var mediaid = item.media_id;
      var articleId = item.id;
      this.$router.push("/detail/" +mediaid + "/" +articleId + "/");
    },


    //  点击搜索按钮搜索页面
    SearchClick(){
      var val = this.value 
      this.$store.commit('getHistoryArr',val)
      this.value = ''
      this.historyArr = this.$store.state.historyArr
      this.$store.state.isShowP = 0
      var kw = val
      this.$router.push(`/searchResult/${kw}`)
    },


    //  点击历史记录各个按钮跳转页面
    historyClick(item){
      // console.log(item);
      this.$store.state.historyArr.unshift(item)
      this.value = item
      this.$router.push(`/searchResult/${item}`)
    },


    // 点击热门搜索各个按钮跳转页面
    hotSearchClick(item){
      // console.log(item);
      this.$store.state.historyArr.unshift(item.name)
      this.value = item.name
      this.$router.push(`/searchResult/${item.name}`)
      this.$store.state.isShowP = 0
    }


  },
  created(){
    this.getHotList()
    this.getHotSearch()
  }
}
</script>

<style lang="less" scoped>
.searchBox{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  .searchBack{
    height: 54px;
    display: flex;
    align-items: center;
  }
  .searchButton{
    margin-right: 10px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    background-color:rgb(224, 224, 224);
    border-radius: 10px;
    font-size: 17px;
    font-family: "黑体";
    font-weight: bold;
    color: #747474;
  }
}
.historySearchApp{
   width: 96%;
   margin: 0 auto;
   background-color: #fff;
  .historyTitle{
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .historyTitleText{
      margin-left: 5px;
      color: darkgray;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .historyList{
    margin-top:10px;
    margin-left: 6px;
    // height: 90px;
    overflow: auto;
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        border-radius: 5px;
        text-align: center;
        line-height: 25px;
        padding: 0 10px 0 10px;
        background-color: rgb(224, 224, 224);
        margin-right: 11px;
        margin-bottom: 10px;
      }
    }
  }
  .hotTitle{
    text-align: left;
    height: 40px;
    line-height: 40px;
    margin-left: 5px;
    color: darkgray;
    font-size: 18px;
    font-weight: bold;
  }
  .hotContect{
    ul{
      li{
        white-space:nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        margin-left: 6px;
        text-align: left;
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .hotSearch{
    ul{
      margin-left: 10px;
      display: flex;
      flex-wrap: wrap;
      li{
        text-align: left;
        margin-bottom: 10px;
        background-color: rgb(222, 222, 222);
        border-radius: 5px;
        line-height: 18px;
        padding: 5px 12px 5px 12px;
        margin-right: 10px;
        font-size: 13px;
      }
    }
  }
}
</style>