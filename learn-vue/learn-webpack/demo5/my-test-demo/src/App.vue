<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>111{{ $route.name }}</p>
    <p>导航：
      <router-link to="/">首页</router-link>|
      <router-link to="/hi">Hi页面</router-link>|
      <router-link to="/hi/hi1">-Hi页面1</router-link>|
      <router-link to="/params/1988/puyiwu is very good">新闻新闻</router-link>|
      <!-- <router-link to="/hi/hi2">-Hi页面2</router-link> -->
      <router-link :to="{name: 'hi2', params: {id: 'abc'}}">Hi+id</router-link>
    </p>
    <!-- <router-view/> -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <router-view name="left" style="float:left;width:50%;background-color:#ccc;height:300px;"></router-view>
    <router-view name="right" style="float:right;width:50%;background-color:#c0c;height:300px;"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
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
.fade-enter {
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity .5s;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity .5s;
}
</style>
