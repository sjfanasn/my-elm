// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/'
import store from './store/'
import './config/rem'

import Icon from 'vue2-svg-icon/Icon.vue'

Vue.component('icon',Icon);
Vue.config.productionTip = false


Vue.use(VueRouter)
const router = new VueRouter({
	routes
})

/* eslint-disable no-new */
new Vue({
    router,
    store
}).$mount('#app')
