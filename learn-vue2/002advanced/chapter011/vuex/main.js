// import './style.css';
// document.getElementById('app').innerHTML = 'Hello Webpack';

// 导入Vue框架
import Vue from 'vue';
// 使用Vue.use()加载插件
import VueRouter from 'vue-router';
import Vuex, { Store } from 'vuex';
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

// 使用VueRouter
Vue.use(VueRouter);
// 使用Vuex
Vue.use(Vuex);

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


const store = new Vuex.Store({
    // Vuex的配置
    // state保存数据的字段
    state: {
        // 在任何组件内，都可以直接通过$store.state.count读取
        count: 0,
        list: [1, 5, 8, 10, 30, 50]
    },
    getters: {
        filteredList: state => {
            return state.list.filter(item => item < 10);
        },
        listCount: (state, getters) => {
            return getters.filteredList.length;
        }
    },
    mutations: {
        // mutations还可以接受第二个参数
        // 如每次加2
        increment(state, n=2) {
            state.count += n;
        },
        // increment(state, params) {
        //     state.count += params.count;
        // },
        decrease(state) {
            state.count --;
        }
    },
    actions: {
        // increment(context) {
        //     context.commit('increment');
        // }
        asyncIncrement(context) {
            return new Promise(resolve => {
                setTimeout(() => {
                   context.commit('increment');
                   resolve(); 
                }, 1000);
            })
        }
    }
});


// 创建Vue根实例
new Vue({
    el: '#app',
    router: router,
    // 使用vuex
    store: store,
    render: h => h(App)
})
