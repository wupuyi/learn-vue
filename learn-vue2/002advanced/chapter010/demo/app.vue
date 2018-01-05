<template>
    <!-- <div>Hello {{ name }}</div> -->
    <div>
        <v-title title="Vue组件化"></v-title>
        <v-button @click="handleClick">点击按钮</v-button>
        <p>
            <img src="./img/test.jpg" alt="测试">
        </p>
    </div>
</template>

<script>

    // 导入组件
    import vTitle from './title.vue'
    import vButton from './button.vue'

    export default{
        components: {
            //注意定义和标签写法的区别
            //驼峰和加"-"
            vTitle,
            vButton
            // es6写法
            // 等同于
            // {
            //     vTitle: vTitle,
            //     vButton: vButton
            // }
        },
        methods: {
            handleClick(e) {
                console.log(e);
            }
        }
    }
</script>

<style scoped>
    div {
        color: #f60;
        font-size: 24px;
    }
</style>
 