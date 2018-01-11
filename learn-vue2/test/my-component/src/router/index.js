import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import secondcomponent from '@/components/secondcomponent'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(ElementUI)

const First = { template: '<div><h2>我是第二个页面</h2></div>' }

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/first',
      name: 'First',
      component: First
    },
    {
      path: '/second',
      name: 'second',
      component: secondcomponent
    }
  ]
})
