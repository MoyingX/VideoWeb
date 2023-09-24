<template>
  <div id="app">
    <!-- 从不使用防盗链 -->
    <!-- 通过防盗链 -->
    <meta name="referrer" content="never"/>
    <Loading v-if="simList.length == 0"></Loading>
    <div v-else>
    <van-nav-bar :style="up?'background-color:#fff':''" style="position: fixed; z-index: 999;" :border="false" left-arrow  @click-left="onClickLeft"/>
    <!-- 视频 -->
    
      <div class="v">
        <video style="width: 100%;" :src="videoSrc" controls></video>
      </div>
      

      <!-- 简介 -->
      <van-tabs v-model="active" background="white">

        <van-tab title="简介">
          <!-- 标题 -->
          <div class="videoInfo">
            <!-- 标题 -->
            <p class="videoInfoTitle">{{ d.title }}</p>
            <div class="videoInfoCateBox">
              <div class="videoInfoCate" v-for="(item,index) in d.categories" :key="index">{{ item }}-</div>
              <div class="videoInfoDate">&emsp;2023-7-13</div>
              <div class="videoInfoCount">&emsp;3.5w次播放</div>
            </div>
            <p class="videoInfoText">{{ d.description }}</p>
            <div class="videoInfoIconList">
              <div class="videoInfoIcon">
                <van-icon name="good-job-o" size="23px" />
                <br>
                <span>187</span>
              </div>
              <div class="videoInfoIcon">
                <van-icon name="star-o" size="23px"/>
                <br>
                <span>187</span>
              </div>
              <div class="videoInfoIcon">
                <van-icon name="share-o" size="23px" />
                <br>
                <span>187</span>
              </div>
            </div>
          </div>


          <!-- 所有分类 -->
          <div class="videoAllCate">
            <div class="videoAllCateMini">
              <li v-for="(item,index) in d.keywords" :key="index">
                <span>{{ item }}</span>
              </li>
            </div>
          </div>


          <!-- 创作人 -->
          <div class="videoAuthor">
            <p style="text-align: left; font-weight: bold;">创作人</p>
            <div class="videoAuthorCard">
              <div class="videoAuthorCardMini">
                <img :src="author.avatar" alt="">
                <div class="videoAuthorText">
                  <span style="font-weight: bold;">{{ author.username }}</span>
                  <span style="font-size: 10px;">出品人</span>
                </div>
              </div>
              <van-button style="margin-right: 15px;" round type="info" size="small">&emsp;关注&emsp; </van-button>
            </div>
          </div>

            <van-divider style="background-color: rgb(230, 230, 230);" />

          <!-- 相似视频部分 -->
          <div class="simVideoList">
            <p>相似视频</p>
            <div class="simVideo" v-for="(item,index) in simList" :key="index" @click="changeDetail(item)">
              <div class="simVideoLeft"><img :src="item.cover" alt=""></div>
              <div class="simVideoRight">
                <span>{{ item.title }}</span>
                <div class="simVideoRightMini">
                  <span style="color: rgb(200, 200, 200); font-size: 10px;">播放{{ item.count.count_view }} &nbsp;-&nbsp; 喜欢{{ item.count.count_like }}</span>
                  <div class="simVideoRightAuthor">
                    <img :src="item.author.userinfo.avatar" alt="">
                    <span>{{ item.author.userinfo.username }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 垫脚石 -->
          <div style="height:40px;"></div>

        </van-tab>

        <van-tab title="评论">
          <!-- 全部评论 -->
          <div class="comment">
            <!-- 单条评论 -->
            <li v-for="(item,index) in commentList" :key="index">
              <div class="commentImg">
                <img :src="item.userInfo.avatar" alt="">
              </div>
              <div class="commentText">
                <div class="commentTextID">
                  <span>{{ item.userInfo.username }}</span>
                </div>
                <div class="commentTextContent">
                  <span>{{ item.content}}</span>
                </div>
                <div class="commentTextIP">
                  <span>{{ ((item.addtime * 1000))|changeTimeFormat }}&nbsp;·&nbsp;{{ item.ip_location }}</span>
                </div>
              </div>
              <div class="commentFooter">
                <div class="commentFooterHeader">
                  <span style="width: 30px; height: 10px;line-height: 5px;">...</span>
                </div>
                <div class="commentFooterFooter">
                  <van-icon name="chat-o" />
                  <div>
                    <van-icon name="good-job-o" />
                    <span style="font-size: 10px;">1011</span>
                  </div>
                </div>
              </div>
            </li>
          </div>

          <!-- 垫脚石 -->
          <div style="height:60px;"></div>
        </van-tab>


      </van-tabs>
    </div>

  </div>
</template>

<script>
import Loading from '../components/Loading.vue'
export default {
    name:'DetailView',
    data() {
        return {
          videoSrc:"",
          mediaid:0,
          articleId:0,
          active:0,
          d:{},
          author:{},
          simList:[],
          commentList:{},
          up:false,
        }
    },
    components:{
      Loading
    },

    created(){
      // console.log('this.$route.params.mediaid=>',this.$route.params.mediaid);
      this.mediaid = this.$route.params.mediaid

      // console.log('this.$route.params.articleId=>',this.$route.params.articleId);
      this.articleId = this.$route.params.articleId

      this.getDatail()
      this.getSimList()
      this.getCommentList()
      // console.log('this.$route',this.$route);
      // console.log('this.$router',this.$router);
    },

    mounted(){
      window.addEventListener("scroll", this.scrolling);
      this.scrolling()
    },

    filters: {
      // 格式化时间
      changeTimeFormat(timespan) {
          var dateTime = new Date(timespan); // 将传进来的字符串或者毫秒转为标准时间
          var year = dateTime.getFullYear();
          var month = dateTime.getMonth() + 1;
          var day = dateTime.getDate();
          // var hour = dateTime.getHours();
          // var minute = dateTime.getMinutes();
          // var second = dateTime.getSeconds()
          var millisecond = dateTime.getTime(); // 将当前编辑的时间转换为毫秒
          var now = new Date(); // 获取本机当前的时间
          var nowNew = now.getTime(); // 将本机的时间转换为毫秒
          var milliseconds = 0;
          var timeSpanStr;
          milliseconds = nowNew - millisecond;
          if (
            milliseconds > 1000 * 60 * 60 * 24 * 15 &&
            year === now.getFullYear()
          ) {
            timeSpanStr = month + "-" + day;
          } else {
            timeSpanStr = year + "-" + month + "-" + day;
          }
          return timeSpanStr;
      },
    },

    methods:{
      // 滚动条距文档顶部的距离
      scrolling(){
        // 滚动条距文档顶部的距离
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.oldScrollTop = scrollTop;
        if(scrollTop > 180){
          this.up = true
        }else{
          this.up = false
        }
      },

      //  获取顶部视频
      getDatail(){
        var that = this
        this.axios.get(`https://apic.netstart.cn/xpc/media/${this.mediaid}`).then(function(res){
          console.log('res=>',res);
          console.log('res.data.data.resource=>',res.data.data.resource);
          //  视频
          var mp4 = res.data.data.resource.progressive[0].backupUrl;
          that.videoSrc = mp4
          // 标题
          var detail = res.data.data
          that.d = detail
          
          var author = res.data.data.owner
          that.author = author
          console.log('that.author=>',that.author);
        })
      },

      //  获取视频相似列表
      getSimList(){
        var that = this
        this.axios.get(`https://apic.netstart.cn/xpc/article/${this.articleId}/next`).then(function(res){
          console.log('simList=>',res.data.data.list);
          that.simList = res.data.data.list;
          // console.log(that.simList);
          
        })
      },

      //  点击相似列表跳转视频
      changeDetail(item){
        var articleId = item.id
        var mediaid = item.media_id

        this.articleId = articleId
        console.log("articleId=>",articleId);

        this.mediaid = mediaid
        console.log("mediaid=>",mediaid);
        
        this.getDatail()
        this.getSimList()

        //  点击相似视频之后让页面的滚动距离滚回最顶部
        document.documentElement.scrollTop = 0;
      },


      //  获取请求评论列表
      getCommentList(){
        var that = this
        var articleId = this.$route.params.articleId
        console.log('评论列表的articId',articleId);
        this.axios.get(`https://apic.netstart.cn/xpc/comments?resource_id=${ articleId }`).then(function(res){
          var commentListData = res.data.data.list
          that.commentList = commentListData
        })
      },

      //  回退到上一页
      onClickLeft(){
        this.$router.back(-1)

      },

      
    },

    
}
</script>

<style lang="less" scoped>
#app{
  // background: #fff;
}


.v{
  width: 100%;
}
video{
  object-fit: fill;
}
::v-deep.van-nav-bar{
  width: 100%;
  background-color: rgba(0,0,0,0);
}

::v-deep.van-nav-bar .van-icon{
  color: #bababa; 
  font-size: 20px;
}
// 标题
.videoInfo{
  margin: 0 auto;
  width: 335px;
  // border: 1px solid black;
  .videoInfoTitle{
    text-align: left;
    font-family: '黑体';
    font-weight: bold;
    color: black;
    font-size: 17px;
  }
  .videoInfoCateBox{
    display: flex;
    flex-wrap: wrap;
    font-size: 13px;
    font-family: '黑体';
    color: gray;
  }
  .videoInfoText{
    text-align: left;
    font-family: '黑体';
    color: rgb(101, 101, 101);
    font-size: 13px;
  }
  .videoInfoIconList{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .videoInfoIcon{
      width: 33%;
      span{
        font-size: 12px;
      }
    }
  }
}


// 所有分类
.videoAllCate{
    width: 100%;
    padding-top: 15px;
    padding-bottom: 10px;
    margin: 20px 0 10px 0;
    border-top: 1px solid rgb(230, 230, 230);
    border-bottom: 1px solid rgb(230, 230, 230);
    
    .videoAllCateMini{
      width: 335px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      li{
        padding: 2px 8px 2px 8px;
        margin-right: 10px;
        margin-bottom: 5px;
        height: 20px;
        font-size: 8px;
        line-height: 20px;
        background-color: rgb(230, 230, 230);
        
      }
    }
}


//  创作人
.videoAuthor{
  width: 335px;
  height: 110px;
  margin: 0 auto;
  // border: 1px solid black;
  .videoAuthorCard{
    width: 260px;
    height: 65px;
    box-shadow: 0px 0px 10px rgb(201, 201, 201);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .videoAuthorCardMini{
      display: flex;
      flex-wrap: wrap;
    
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 10px;
      }
      .videoAuthorText{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
      }
    }
  }
}


//  相似视频
.simVideoList{
  width: 335px;
  margin: 0 auto;
  // border:1px solid black;
  p{
    text-align: left;
    font-weight: bold;
  }
  .simVideo{
    width: 100%;
    height: 90px;
    margin-bottom: 30px;

    display: flex;
    justify-content: space-between;
    .simVideoLeft{
      width: 140px;
      img{
        border-radius: 5px;
        box-shadow: 0px 3px 5px darkgray;
        width: 100%;
        height: 100%;
      }
    }
    .simVideoRight{
      width: 180px;
      text-align: left;
      display: flex;
      flex-direction: column;
      
      span{
        font-size: 13px;
        font-weight: bold;
        height: 60px;
      }
      .simVideoRightMini{
        
        .simVideoRightAuthor{
          height: 20px;
          display: flex;
          align-items: center;
          
          img{
            width: 20px;
            border-radius: 50%;
          }
          span{
            margin-left: 7px;
            padding-top: 6px;
            height: 20px;
            font-size: 8px;
            font-weight: 100;
          }
        }
      }
    }
  }
    
  
}


//  评论
.comment{
  width: 90%;
  margin: 0 auto;
  
  li{
    width: 100%;
    height: 120px;
    border-bottom: 1px solid rgb(201, 201, 201);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .commentImg{
      width: 50px;
      height: 100%;
      // background-color: greenyellow;
      padding-right: 10px;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 30px auto;
      }
    }
    .commentText{
      width: 61%;
      height: 80%;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .commentTextID{
        font-size: 12px;
      }
      .commentTextContent{
        font-size: 15px;
      }
      .commentTextIP{
        color: rgb(128,128,128);
        font-size: 10px;
      }
    }
    .commentFooter{
      width: 70px;
      height: 80%;
      // background-color:greenyellow;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .commentFooterHeader{
        display: flex;
        justify-content: right;
      }
      .commentFooterFooter{
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
}
</style>