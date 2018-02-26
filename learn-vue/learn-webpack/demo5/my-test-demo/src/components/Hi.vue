<template>
  <div class="hi">
    <h1>{{ msg }}</h1>
    <p>{{ $route.params.id }}</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: 'Hi, I am Puyi Wu'
    }
  }
}
</script>
