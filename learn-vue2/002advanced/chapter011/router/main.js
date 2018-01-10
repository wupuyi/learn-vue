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
// 导入message
import Message from './views/message.vue';
// 导入animation
import Animation from './views/animation.vue';

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
        path: '/message',
        meta: {
            title: '消息'
        },
        component: Message
    },
    {
        path: '/animation',
        meta: {
            title: 'vue过渡测试'
        },
        component: Animation
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
    // 导航钩子参数
    // 1、to即将要进入的目标的路由对象
    // 2、from当前导航即将要离开的路由对象
    // 3、next调用该方法后，才能进入下一个钩子
    window.document.title = to.meta.title;
    next();
})

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})


// 创建Vue根实例
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
