// import './style.css';
// document.getElementById('app').innerHTML = 'Hello Webpack';

// 导入Vue框架
import Vue from 'vue';
// 使用Vue.use()加载插件
import VueRouter from 'vue-router';
//导入app.vue组件
import App from './app.vue';
// 导入 index
import Index from './views/index.vue';
// 导入 about
import About from './views/about.vue';
//导入 user
import User from './views/user.vue';

Vue.use(VueRouter);

const Routers = [
    {
        path: '/index',
        component: Index
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/user/:id',
        component: User
    },
    {
        path: '*',
        redirect: '/index'
    }
];

const RouterConfig = {
    // 使用HTML5的History路由模式
    mode: 'history',
    routes: Routers
}

const router = new VueRouter(RouterConfig);

// 创建Vue根实例
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
