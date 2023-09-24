<template>
  <div>
    
    <div>
      <!-- v-model="$store.state.active" -->
      <van-tabs v-model="active" @click="toogle">
        <van-tab title="推荐">
          <Recommend></Recommend>
        </van-tab>
        <van-tab title="每日精选">
          <Selection></Selection>
        </van-tab>
        <van-tab title="热门">
          <Hot></Hot>
        </van-tab>
        <van-tab title="剧情短片">
          <ShortFilm></ShortFilm>
        </van-tab>
        <van-tab title="入场必看">
          <Mustsee></Mustsee>
        </van-tab>
        <van-tab title="关注">
          <Focus></Focus>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Recommend from '../components/Recommend.vue'
import Hot from '../components/Hot.vue'
import Selection from '../components/Selection.vue';
import ShortFilm from '../components/ShortFilm.vue';
import Mustsee from '../components/Mustsee.vue';
import Focus from '../components/Focus.vue'

import Loading from '../components/Loading.vue';
export default {
    name:'HomeView',
    data() {
      return {
        active:2
      }
    },
    components:{
      Hot,
      Recommend,
      Selection,
      ShortFilm,
      Mustsee,
      Focus,
      Loading,
    },
    methods:{
      getData(){
        this.axios.get("https://apis.netstart.cn/bcomic/Banner")
      },
      toogle(name,title){
        this.$store.commit('toogleBar',name)
      },
    },
}
</script>

<style lang="less" scoped>

</style>