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

// 配置路由表
const Routers = [
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: Index
    },
    {
        path: '/about',
        meta: {
            title: '关于'
        },
        component: About
    },
    {
        path: '/user/:id',
        meta: {
            title: '个人主页'
        },
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

// vue-touter 导航钩子
// beforeEach 路由即将改变前 和 afterEach 路由改变后
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
})


// 创建Vue根实例
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
