<template>
  <div>
    
    <div class="header">
      <span>手记</span>
      <van-button class="btn" color="red"  icon="edit" round type="primary" size="small"> 写一条&nbsp;</van-button>
    </div>

    <!-- 手记列表 -->
    <div class="shoujiList">
      <!-- 单个手记 -->
      <div class="shouji" v-for="(item,index) in shoujiList" :key="index">
        <!-- 作者 -->
        <div class="shoujiTitle">
          <div class="shoujiLeft">
            <img :src="item.user.avatar" alt="">
            <div class="shoujiUser">
              <div class="username">
                {{ item.user.username }}
              </div>
              <div class="date">
                {{ (item.addtime * 1000)|changeTimeFormat }} 发布
              </div>
            </div>
          </div>
          <div class="shoujiRight">
            <span>+ 关注</span>
          </div>
        </div>
        <!-- 文案 -->
        <div class="shoujiText">
          <div class="shoujiTextTitle">
            {{ item.title }}
          </div>
          <div class="shoujiContent">
            {{ item.content }}
          </div>
        </div>
        <!-- 图片 -->
        <div class="shoujiImgList">

          <div v-if="item.article.cover" class="shoujiImgUrl">
            <img :src="item.article.cover" alt="">
            <div class="span">
              <span>{{ item.article.title }}</span>
            </div>
          </div>

          <div class="shoujiImg">
            <div v-for="(item,index) in item.images" :key="index">
              <div style="width: 100px; height: 120px;overflow: hidden;margin-bottom: 5px;border-radius: 10px;margin-right: 12px;border: 1px solid rgb(220, 220, 220);">
                <img v-if="item" :src="item" alt="">
              </div>
            </div>
          </div>

        </div>
        <!-- 点赞收藏信息 -->
        <div class="shoujiFooter">
          <div class="like">
            <van-icon size="20" name="star-o" />
            <span>{{item.count.count_liked}}</span>
          </div>
          <div class="comment">
            <van-icon size="20" name="comment-o" />
            <span>{{item.count.count_commented}}</span>
          </div>
          <div class="share">
            <van-icon size="20" name="share-o" />
            <span>{{item.count.count_shared}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 垫脚石 -->
    <div style="height: 50px;"></div>
  </div>
</template>

<script>
export default {
    name:'ShouJi',
    data() {
      return {
        shoujiList:[]
      }
    },
    methods:{
      getShoujiData(){
        var that = this
        this.axios.get('https://apis.netstart.cn/xpc/notes').then((res)=>{
          // console.log('shouji-res=>',res);
          that.shoujiList = res.data.data.list
          console.log(that.shoujiList);
        }) 
      }
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

    created(){
      this.getShoujiData()
    }
}
</script>

<style lang="less" scoped>
.header{
  width: 100%;;
  height: 62px;
  background-color: #fff;
  font-weight: bold;
  font-family: '黑体';
  color: #000;
  font-size: 18px;
  line-height: 70px;
  .btn{
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
.shoujiList{
  width: 100%;
  .shouji{
    // width: 100%;
    padding: 10px 16px;
    margin: 10px auto;
    background-color: #fff;
    .shoujiTitle{
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      .shoujiLeft{
        display: flex;
        flex-wrap: wrap;
        align-items:center;
        img{
          width: 50px;
          border-radius: 50%;
        }
        .shoujiUser{
          text-align: left;
          margin-left: 6px;
          .username{
            font-size: 15px;
            font-weight: bold;
          }
          .date{
            font-size: 10px;
            color: rgb(171, 171, 171);
          }
        }
      }
      .shoujiRight{
        color: red;
        font-size: 14px;
        line-height: 35px;
      }
    }

    .shoujiText{
      text-align: left;
      margin-bottom: 5px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      text-overflow: ellipsis;
      .shoujiTextTitle{
        font-size: 18px;
        font-weight: bold;
      }
      .shoujiContent{
        font-size: 16px;
      }
    }

    .shoujiImgList{
      text-align: left;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      overflow: hidden;
      .shoujiImgUrl{
        width: 100%;
        background-color: rgb(221, 221, 221);
        display: flex;
        
        flex-wrap: nowrap;
        img{
          width: 150px;
        }
        .span{
          margin-left: 10px;
          font-size: 16px;
        }
      }

      .shoujiImg{
        display: flex;
        flex-wrap: wrap;
        
        img{
          width: 100px;
          height: 120px;
        }
      }
    }

    .shoujiFooter{
      width: 98%;
      height: 45px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid rgb(219, 219, 219);
      span{
        margin-left: 5px;
      }
      .comment{
        line-height: 30px;
        display: flex;
        align-items: center;
      }
      .share{
        display: flex;
        align-items: center;
      }
    }
  }

  
}


</style>