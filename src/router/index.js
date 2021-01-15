import Vue from 'vue'
import Router from 'vue-router' 

const index = resolve => require(['@/components/index'],resolve)
const type = resolve => require(['@/components/type'],resolve)
const playgame = resolve => require(['@/components/playGame'],resolve)

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
      path: '/type',
      name: 'type',
      component: type
    },
    // { 
    //   path: '/playgame',
    //   name: 'playgame',
    //   component: playgame
    // }
  ]
  
})
