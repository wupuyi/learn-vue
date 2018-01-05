// index.vue

<template>
    <div>
        <h1>首页</h1>
        <!-- 设置tag属性，可以指定渲染成什么标签 -->
        <!-- replace不会留下History记录，导航后不能用后退键返回上一个页面 -->
        <!-- 跳转方法一 -->
        <router-link to="/about" >跳转到about</router-link>
    </div>
</template>
<script>
    export default {

    }
</script>
