  <template>
  <div>
    <div class="login">
      <div class="loginText">
        <div class="loginTextIcon">
          <img v-if="isLogin" :src="userImg" style="width: 50px;border-radius: 50%;" alt="">
          <van-icon v-if="!isLogin" name="user-o"  size="36"/>
        </div> 
        <span v-if="isLogin">&nbsp;{{ username }}</span>
        <span v-if="!isLogin">&nbsp;请先登录</span>
      </div>

      <div v-if="isLogin" class="follow-fans">
        <div class="follow">
          <span style="font-weight: bold;color: #000;">{{followNumber}}</span>
          <br>
          <span>关注</span>
        </div>
        <span style="line-height: 35px;font-weight: bold;color: darkgray;">|</span>
        <div class="fans">
          <span style="font-weight: bold;color: #000;">{{fansNumber}}</span>
          <br>
          <span>粉丝</span>
        </div>
      </div>


      <van-cell-group inset>
        <van-cell title="我的喜欢" to="/my/like" size="large" is-link />
        <van-cell title="我的收藏" size="large" is-link />
        <van-cell title="浏览记录" size="large" is-link />
        <van-cell title="关于我们" size="large" is-link />
      </van-cell-group>
      
      <div v-if="!isLogin" style="width: 100%;display: flex;justify-content: center;">
        <van-button @click="clickBtn" class="btn" type="danger" size="large">点击登录</van-button>
      </div>
      <div v-if="isLogin" style="width: 100%;display: flex;justify-content: center;">
        <van-button @click="clickBtn" class="btn" type="danger" size="large">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
    name:'MyView',
    data() {
      return {
        followNumber:0,
        fansNumber:0,
        username:'',
        userImg:'',
        My:[
          {
            id:1,
            to:'like',
            cardName:'我的喜欢'
          },
          {
            id:2,
            to:'sc',
            cardName:'我的收藏'
          },
          {
            id:3,
            to:'history',
            cardName:'浏览记录'
          },
          {
            id:4,
            to:'about',
            cardName:'关于我们'
          },
        ],

      }
    },
    components:{
      [Dialog.Component.name]: Dialog.confirm,
    },
    computed:{
      isLogin(){
        return this.$store.state.isLogin;
        
      }
    },
    methods:{
      clickBtn(){
        if(!this.isLogin){
          this.$router.push('/login')
        }else{
          Dialog.confirm({
            title: '是否退出登录',
          })
            .then(() => {
              this.$store.state.isLogin = 0
              this.$toast.success('已退出登录');
            })
            .catch(() => {
              // on cancel
            });
          
        }
      },
      getUserInfo(){
        if(this.isLogin != 0){
          var that = this
          this.axios.get('https://apis.netstart.cn/xpc/user/10020974').then((res)=>{
            console.log(res);
            that.username = res.data.data.username
            that.followNumber = res.data.data.count.count_followee
            that.fansNumber = res.data.data.count.count_follower
            that.userImg = res.data.data.avatar
          })
        }
      }
    },

   created(){
    this.getUserInfo()
   },
    
    beforeCreate() {
      //修改vue文件背景颜色
      this.$nextTick(() => {
        document.body.setAttribute('style', 'background:rgb(250, 219, 224)')
      })
    },
    beforeDestroy() {
       document.body.removeAttribute('style')
    }
}
</script>

<style lang="less" scoped>

.login{
  width: 100%;
  padding-top: 20px;
  text-align: left;
  .loginText{
    margin-left: 10px;
    margin-bottom: 30px;
    height: 50px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .loginTextIcon{
      width: 50px;
      height: 50px;
      background-color: #fff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span{
      margin-left: 5px;
      font-size: 20px;
      font-family: '黑体';
    }
  }
  
  .follow-fans{

    margin-bottom: 30px;
    display: flex;
    justify-content: space-evenly;
    .follow{
      text-align: center;
      font-size: 14px;
      color: gray;
    }
    .fans{
      text-align: center;
      font-size: 14px;
      color: gray;
    }
  }

  .btn{
    margin:30px auto;
    width: 80%;
    border-radius: 12px;
  }
}
</style>