<template>
  <div id="app">
      <!-- 判断条件只要路由中的中的meta属性的isHideNav属性的话为true隐藏导航栏 -->
      <nav v-if="$route.meta.isHideNav != true">
       <van-tabbar v-model="active" active-color="#4FC080" inactive-color="#000">
        <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/searchIndex">搜索</van-tabbar-item>
        <van-tabbar-item icon="records" to="/shouji">手记</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
       </van-tabbar>   
      </nav>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      active:0,
    }
  },
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}



nav a{
  font-weight: bold;
  color: #2c3e50;

}
nav a.router-link-exact-active{
  color: #42b983;
}
</style>
