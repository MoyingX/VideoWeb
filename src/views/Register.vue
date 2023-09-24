<template>
  <div class="register">
    <div class="register-header">
        <van-icon style="margin-left: 5px;" name="arrow-left" size="30" @click="back"/>
        <p>注册</p>
        <span>&emsp;&emsp;</span>
    </div>
    <van-form>
        <van-field
            v-model="registerInfo.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
        />
        <van-field
            v-model="registerInfo.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
        />
        <van-field
            v-model="registerInfo.passwordAgain"
            type="password"
            name="再次输入密码"
            label="再次输入密码"
            placeholder="再次输入密码"
        />
        <div style="margin: 16px;">
            <van-button 
            round 
            block 
            type="info" 
            native-type="submit"
            @click="getRegister">点击注册</van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    name:'Register',
    data() {
        return {
            pattern:/^[1][3,4,5,7,8][0-9]{9}$/,
            registerInfo:{
                phone:'18011825202',
                password:'Abc123',
                passwordAgain:'Abc123',
            },
            userList:[]
        }
    },
    methods:{
        back(){
            this.$router.back(-1)
        },
        valueFrom(o) {
            for (let key in o) {
                if (!o[key].reg.test(o[key].value)) {
                    this.$toast.fail(o[key].errMsg);
                    return false;
                }
            }
            return true;
        },
        getRegister(){
            let o = {
                phone:{
                    // 验证的值
                    value:this.registerInfo.phone,
                    // 正则
                    reg: /^[1][3,4,5,7,8][0-9]{9}$/,
                    // 正则不同通过的提示
                    errMsg: "手机号不正确",
                },
                password: {
                    // 验证的值
                    value: this.registerInfo.password,
                    // 正则 6-14
                    reg: /^[A-Z]\w{5,15}$/,
                    // 正则不同通过的提示
                    errMsg: "密码是首字母开头（6-14位）",
                },
            };
            //  正则验证
            if (!this.valueFrom(o)) {
                console.log("验证不通过下面的就不执行了");
                return;
            }

            //  注册再次输入密码验证
            if(this.registerInfo.passwordAgain != ''){
                if (this.registerInfo.passwordAgain !=this.registerInfo.password){
                    Toast.fail("再次输入密码与密码不符合");
                    return;
                }
            }else{
                Toast.fail('请再次输入密码');
                return;
            }
            Toast.success('注册成功');
            


            //  注册功能
            var userList = []
            var userInfos = {
                phone:this.registerInfo.phone,
                password:this.registerInfo.password,
                passwordAgain:this.registerInfo.passwordAgain
            };
            //当local有值的时候
            if(localStorage.getItem("userList")){
                userList = JSON.parse(localStorage.getItem("userList"))
                for(var i = 0;i<userList.length;i++){
                    if(this.registerInfo.phone === userList[i].phone){
                        Toast.fail('该号码已被注册');
                        return;
                    }
                }
                userList.push(userInfos)
                Toast.success('注册成功')
                this.$router.back(-1)
            }else{
                userList.push(this.registerInfo)
                Toast.success('注册成功')
                this.$router.back(-1)
            }
            JSON.parse(localStorage.setItem('userList',JSON.stringify(userList)))
            
        }
    }
}
</script>

<style lang="less" scoped>
.register{
    height: 100vh;
    .register-header{
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