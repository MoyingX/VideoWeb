<template>
  <div style="background-color: #fff;">
    <meta name="referrer" content="never"/>
    <Loading v-if="searchResult.length == 0"></Loading>
    <!-- 搜索框 -->
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
                @click="onClick"
            />
            </form>
            <div class="searchButton">
                <span>搜索</span>
            </div>
        </div>

        <!-- 标题 -->
        <van-tabs v-model="active">
            
            <!-- 作品 -->
            <van-tab title="作品">
                <div class="worksNumber">共 <span>{{ total.total }}</span> 部作品</div>
                <!-- 作品栏 -->
                <div class="worksList">
                    <div class="works" v-for="(item,index) in searchResult" :key="index" @click="goDetail(item,index)">
                        <img :src="item.cover" alt="">
                        <div class="workText">
                            <div class="workTextTitle">
                                <span>{{ item.title }}</span>
                            </div>
                            <div class="workTextContect">
                                播放量 {{ (item.count.count_view.toString().length)>4?(item.count.count_view /10000).toFixed(1):item.count.count_view }}{{ (item.count.count_view.toString().length)>4?'w':'' }} · 喜欢 {{ item.count.count_like }}
                            </div>
                            <div class="workTextFooter">
                                <img :src="item.author.userinfo.avatar" alt="">
                                <span>{{ item.author.userinfo.username }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 垫脚石 -->
                <div style="height: 60px;"></div>
            </van-tab>

            <!-- 创作人 -->
            <van-tab title="创作人">
                
            </van-tab>

        </van-tabs>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue'
export default {
    data() {
        return {
            kw:'',
            value:this.$store.state.historyArr[0],
            searchResult:[],
            active:0,
            total:'',
        }
    },
    components:{
        Loading,
    },
    methods: {
        onSearch(val){
            
        },
        onClick(){
            this.$router.push('/search')
        },
        back(){
            this.$router.back(-1)
        },
        getSearchResult(){
            var that = this
            this.axios.get(`https://apis.netstart.cn/xpc/search?kw=${this.kw}`).then((res)=>{
                // console.log(res);
                that.searchResult = res.data.data.list
                // console.log(that.searchResult);

            
                that.total = res.data.data
                // console.log(that.total);
            })
        },

        // 点击图片跳转视频页面事件
        goDetail(item,index){
            console.log('item=>',item);
            var mediaid = item.media_id
            var articleId = item.id
            this.$router.push("/detail/"+mediaid+'/'+articleId+'/')
        },
    },
    created(){
        console.log('这是搜索的内容',this.$route.params.kw);
        this.kw = this.$route.params.kw;
        this.getSearchResult()
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

.worksNumber{
    width: 90%;
    margin: 0 auto;
    text-align:left;
    margin-top: 10px;
    font-size: 14px;
    color:rgb(171, 171, 171);
    span{
        color: red;
        font-weight: bold;
    }
}

.worksList{
    width: 90%;
    margin: 0 auto;
    // border: 1px solid black;
    .works{
        width: 100%;
        height: 110px;
        padding: 18px 0px 18px 0px;
        border-bottom: 1px solid rgb(208, 208, 208);
        text-align: left;
        display: flex;
        flex-wrap: nowrap;
        img{
            width: 170px;
            border-radius: 15px;
            
        }
        .workText{
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .workTextTitle{
                font-size: 14px;
                font-weight: bold;
            }
            .workTextContect{
                padding: 10px 0px 10px 0px;
                font-size: 12px;
                color: rgb(201, 201, 201);
            }
            .workTextFooter{
                display: flex;
                align-items: center;
                font-size: 12px;
                img{
                    width: 20px;
                    margin-right: 5px;
                }
            }
        }
    }
}

</style>