import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@views/test'

const routerSet = {
  routes: [{
    path: '/test',
    name:'Test',
    component: Test
  }]
}

/* let boot = window.location.origin
if (boot.indexOf('localhost') != -1) {
  routerSet.routes.push({
    path: '/',
    component: testHomePage
  })
} */



Vue.use(Router)
export default new Router(routerSet);
/* export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
}) */
