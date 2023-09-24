<template>
  <div class="login">
    <div class="login-header">
        <van-icon @click="back" style="margin-left: 5px;" name="arrow-left" size="30"/>
        <p>登录</p>
        <span @click="goRegister">注册</span>
    </div>
    <van-form>
        <van-field
            v-model="loginInfo.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
        />
        <van-field
            v-model="loginInfo.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
        />
        <div style="margin: 16px;">
            <van-button 
            round 
            block 
            type="info" 
            native-type="submit"
            @click="getLogin">登录</van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    name:'Login',
    data() {
        return {
            pattern:/^[1][3,4,5,7,8][0-9]{9}$/,
            loginInfo:{
                phone:'18344093731',
                password:'Abc123',
            }
        }
    },
    methods:{
        valueFrom(o) {
            for (let key in o) {
                if (!o[key].reg.test(o[key].value)) {
                    this.$toast.fail(o[key].errMsg);
                    return false;
                }
            }
            return true;
        },

        // 登录功能
        getLogin() {
        // 记录要验证的数据
            let o = {
                phone: {
                    // 验证的值
                    value: this.loginInfo.phone,
                    // 正则
                    reg: /^[1][3,4,5,7,8][0-9]{9}$/,
                    // 正则不同通过的提示
                    errMsg: "手机号不正确",
                },
                password: {
                    // 验证的值
                    value: this.loginInfo.password,
                    // 正则 6-14
                    reg: /^[A-Z]\w{5,15}$/,
                    // 正则不同通过的提示
                    errMsg: "密码是首字母开头（6-14位）",
                },
            };
            if (!this.valueFrom(o)) {
                console.log("验证不通过下面的就不执行了");
                return;
            }
             // 获取到浏览器的本地存储
            var userList = JSON.parse(localStorage.getItem("userList"));
            console.log(userList);
            //   localStorage.setItem('设置的名字'，提交的值)
            for (var i = 0; i < userList.length; i++) {
                if (this.loginInfo.phone == userList[i].phone) {
                    console.log("手机号正确");
                    if (this.loginInfo.password == userList[i].password) {
                        Toast.success('登录成功');
                        // 跳转到我的
                        this.$router.push('my')
                        this.$store.state.isLogin = 1;
                        return;
                    }else{
                        Toast.fail('密码错误，请重新输入密码');
                    }
                }else{
                    Toast.fail('没有该手机号，请去注册');
                }
            }
        },

        goRegister(){
            this.$router.push('/register')
        },
        back(){
            this.$router.back(-1)
        }

    }
    
}
</script>

<style lang="less" scoped>
.login{
    height: 100vh;
    .login-header{
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