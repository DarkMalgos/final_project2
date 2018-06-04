import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/views/controller/index'
import signIn from '../components/views/controller/signIn'

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
    }
  ]
})
