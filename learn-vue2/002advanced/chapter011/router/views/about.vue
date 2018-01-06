// about.vue

<template>
    <div>
        <!-- 跳转方法二 -->
        <h1>介绍页</h1>
        <button @click="handleRouter">跳转到user</button>
        <button @click="handleMsg">跳转到message</button>
    </div>
</template>

<script>
    export default {
        methods: {
            handleRouter() {
                // console.log(this.$router);
                this.$router.push('/user/123');
                //不想history添加新纪录
                // this.$router.replace('/user/123');
                // 后退一页
                // this.$router.go(-1);
                // 前进2页
                // this.$router.go(2);
            },
            handleMsg() {
                this.$router.push('/message');
                // console.log(1111111111);
            }
        }
    }
</script>
