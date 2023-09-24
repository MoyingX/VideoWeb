import Vue from 'vue'
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => {})
};

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:'home',
        component:() => import("../views/HomeView.vue")
    },
    {
        path:'/search',
        name:'search',
        component:() =>import("../views/SearchView.vue")
    },
    {
        path:'/shouji',
        name:'shouji',
        component:() =>import("../views/ShouJi.vue"),
        
    },
    {
        path:'/my',
        name:'my',
        component:() =>import("../views/MyView.vue"),
    },
    {
        path:'/my/like',
        name:'like',
        component:() =>import("../views/My/MyLike.vue"),
    },

    {
        path:'/detail/:mediaid/:articleId',
        name:'detail',
        component:() =>import("../views/DetailView.vue"),
        meta:{
            isHideNav:true
        }
    },
    {
        path:'/searchResult/:kw',
        name:'searchResult',
        component:() =>import("../views/SearchResult.vue")
    },
    {
        path:'/searchIndex/',
        name:'searchIndex',
        component:() =>import("../views/SearchIndex.vue")
    },
    {
        path:'/login',
        name:'login',
        component:() =>import("../views/Login.vue"),
        meta:{
            isHideNav:true
        }
    },
    {
        path:'/register',
        name:'register',
        component:() =>import("../views/Register.vue"),
        meta:{
            isHideNav:true
        }
    }
]


const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes,
})



export default router