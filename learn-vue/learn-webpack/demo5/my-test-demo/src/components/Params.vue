<template>
  <div>
    <h2>{{ msg }}</h2>
    <p>新闻ID：{{ $route.params.newsId }}</p>
    <p>新闻标题：{{ $route.params.newsTitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'params',
  data () {
    return {
      msg: 'params page'
    }
  },
  beforeRouteEnter: (to, from, next) => {
    console.log('准备进入路有模板')
    next()
  },
  beforeRouteLeave: (to, from, next) => {
    console.log('准备离开路有模板')
    next()
  }
}
</script>
