import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/views/controller/index'
import signIn from '../components/views/controller/signIn'
import signUp from '../components/views/controller/signUp'
import catalog from '../components/views/controller/catalog'
import billing from '../components/views/controller/billing'
import contact from '../components/views/controller/contact'
import account from '../components/views/controller/account'
import delivery from '../components/views/controller/delivery'
import gestion from '../components/views/controller/gestion'

Vue.use(Router)

export default new Router({
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
        },
        {
            path: '/contact',
            name: 'contact',
            component: contact
        },
        {
            path: '/account',
            name: 'account',
            component: account
        },
        {
            path: '/cart',
            name: 'billing',
            component: billing
        },
        {
            path: '/delivery',
            name: 'delivery',
            component: delivery
        },
        {
            path: '/gestion',
            name: 'gestion',
            component: gestion
        }
    ]
})
