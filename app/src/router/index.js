import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/views/controller/index'
import signIn from '../components/views/controller/signIn'
import signUp from '../components/views/controller/signUp'
import catalog from '../components/views/controller/catalog'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/sign-in',
            name: 'signIn',
            component: signIn
        },
        {
            path: '/sign-up',
            name: 'signUp',
            component: signUp
        },
        {
            path: '/order',
            name: 'catalog',
            component: catalog
        }
    ]
})
