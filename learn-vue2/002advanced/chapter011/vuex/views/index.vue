// index.vue

<template>
    <div>
        <h1>首页</h1>
        {{ count }}
        <!-- 设置tag属性，可以指定渲染成什么标签 -->
        <!-- replace不会留下History记录，导航后不能用后退键返回上一个页面 -->
        <!-- 跳转方法一 -->
        <router-link to="/about" >跳转到about</router-link>
        <button @click="handleIncremet">+1</button>
        <button @click="handleDecrease">-1</button>
        <div>{{ list }}</div>
        <div>{{ listCount }}</div>

        <button @click="handleAsyncIncrement">action +1</button>
    </div>
</template>
<script>
    export default {
        computed: {
            count() {
                // 组件内，只能读取，不能手动修改
                // 改变store中数据的唯一途径就是显示地提交mutations
                return this.$store.state.count;
            },
            list() {
                // return this.$store.state.list.filter(item => item < 10);
                // store getters方法使用
                return this.$store.getters.filteredList;
            },
            listCount() {
                return this.$store.getters.listCount;
            }
        },
        methods: {
            handleIncremet() {
                // 组件内通过this.$store.commit 方法来执行mutations
                this.$store.commit({
                    type: 'increment',
                    count: 10
                });
            },
            handleDecrease() {
                this.$store.commit('decrease');
            },
            handleActionIncrement() {
                this.$store.dispatch('increment');
            },
            handleAsyncIncrement() {
                this.$store.dispatch('asyncIncrement').then(() => {
                    console.log(this.$store.state.count); //1
                });
            }
        }
    }
</script>
