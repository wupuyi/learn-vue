<template>
    <div>{{ $route.params.id }}</div>
</template>

<script>
    export default {
        mounted () {
            /* 在组件中使用$route会使之与其对应路由形成高度耦合，
            从而使组件只能在某些特定的url上使用，限制了其灵活性。 */
            console.log(this.$route.params.id);
        }
    }
</script>
