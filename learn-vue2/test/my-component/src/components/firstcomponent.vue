<template>
    <div class="firstcompont">
        <h1>I am a Title.</h1>
        <a>written by {{ author }}</a>
    </div>
</template>

<script>
export default {
  data () {
      return{
          author: "我是世界之王"
      }
  }
}
</script>


<style scoped>

</style>
