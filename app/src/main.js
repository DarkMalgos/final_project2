// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'
import Notifications from 'vue-notification'
import {store} from './store'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$cookies = VueCookies
Vue.use(Notifications)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})