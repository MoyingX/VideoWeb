import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    active:0,
    scrollTop:0,
    activeIndex:0,

    // 历史记录数据
    historyArr:[],
    KeyValue:1,
    isShowP:1,

    //是否登录，0为未登录
    isLogin:0,

    // //  视频收藏
    // is_vr:0,
    // //  视频点赞
    // vr:0,


    //视频收藏夹
    videoCollectArr:[],
    //视频点赞夹
    videoLikeArr:[],
}

const actions = {

}

const mutations = {
    changeActiveIndex(state,playload){
        state.activeIndex = playload
    },
    toogleBar(state,playload){
        // console.log("state=>",state);
        // console.log("playload=>",playload);
        this.state.active = playload
    },

    afterScroll(state,playload){
        this.state.scrollTop = playload
    },

    //  获取历史记录数据
    getHistoryArr(state,playload){
        this.state.historyArr.unshift(playload)
    },
    

    //视频点收藏信息
    // isCollect(state,playload){
    //     state.is_vr = playload
    // },
    // //视频点赞信息
    // isLike(state,playload){
    //     state.vr = playload
    // },


    //  视频收藏夹
    videoCollect(state,playload){
        if (state.videoCollectArr == '') {  //第一次输入
            state.videoCollectArr.unshift(playload)
            playload.vr = 1
        }else{  //第n次输入
            let id = playload.id
            for(let i=0;i<state.videoCollectArr.length;i++){    //查重
                if(id == state.videoCollectArr[i].id){
                    return;
                }
            }
            state.videoCollectArr.unshift(playload)
            playload.vr = 1

        }
    },
    //  取消视频收藏夹
    deleteVideoCollect(state,playload){
        if (state.videoCollectArr == '') {
            return;
        }else{
            let id = playload.id
            for(let i=0;i<state.videoCollectArr.length;i++){
                if(id == state.videoCollectArr[i].id){
                    state.videoCollectArr.splice(i,1)
                    playload.vr = 0
                }
            }
        }
    },



    //视频点赞夹
    videoLike(state,playload){
        if (state.videoLikeArr == '') {  //第一次输入
            state.videoLikeArr.unshift(playload)
        }else{  //第n次输入
            let id = playload.id
            for(let i=0;i<state.videoLikeArr.length;i++){    //查重
                if(id == state.videoLikeArr[i].id){
                    return;
                }
            }
            state.videoLikeArr.unshift(playload)
        }
    },
    //取消视频点赞夹
    deleteVideoLike(state,playload){
        if (state.videoLikeArr == '') {
            return;
        }else{
            let id = playload.id
            for(let i=0;i<state.videoLikeArr.length;i++){
                if(id == state.videoLikeArr[i].id){
                    state.videoLikeArr.splice(i,1)
                }
            }
        }
    }
    
}
const getters = {

}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})