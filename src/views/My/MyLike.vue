<template>
    <div>
        <div class="Mylike">
            <div class="Mylike-header">
                <van-icon style="margin-left: 5px;" name="arrow-left" size="30" @click="back"/>
                <p>我的喜欢</p>
                <span>&emsp;&emsp;</span>
            </div>
            <van-tabs v-model="active">
                <van-tab title="视频">
                    <div>
                        
                    </div>
                </van-tab>
                <van-tab title="手记">

                </van-tab>
                
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name:'MyLike',
    data() {
        return {
            active:0,
            videoLikeArr:[]
        }
    },
    methods:{
        back(){
            this.$router.back(-1)
        },
        getMyLikeData(){
            this.videoLikeArr = this.$store.state.videoLikeArr
            console.log(this.videoLikeArr);
        }
    },

    created() {
        this.getMyLikeData()
    },
}
</script>

<style lang="less" scoped>
.Mylike{
    height: 100vh;
    .Mylike-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        p{
            font-size: 20px;
            font-family: '黑体';
        }
        span{
            margin-right: 5px;
            color: red;
        }
    }
}
</style>