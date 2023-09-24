import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import VueAxios from 'vue-axios';

import store from './store/index';

import router from './router/index'

import Vant from 'vant'
import 'vant/lib/index.css';

import '../src/css/public.css'


Vue.use(Vant);
Vue.use(VueAxios,axios)

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  switch(to.name){
    case 'home':
      store.commit('changeActiveIndex',0);
      break;
    case 'searchIndex':
      store.commit('changeActiveIndex',1);
      break;
    case 'shouji':
      store.commit('changeActiveIndex',2);
      break;
    case 'my':
      store.commit('changeActiveIndex',3);
      break;
  }
  //继续渲染
  next();
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
