import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutation';
import actions from './action';

Vue.use(Vuex);

const state = {
    latitude: '',// 当前位置纬度
    longitude: '',// 当前位置经度
    userInfo: null,// 用户信息
    geohash:'31.22299,121.36025', // 经纬度
}
export default new Vuex.Store({
    state,
    actions,
    mutations
})