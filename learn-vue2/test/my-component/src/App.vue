<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <firstcomponent></firstcomponent>
    <router-link to="/first">1111111111</router-link>
    <router-link to="/second">22222222222</router-link>
  </div>
</template>

<script>
import firstcomponent from './components/firstcomponent'
export default {
  name: 'app',
  components: {
    firstcomponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
