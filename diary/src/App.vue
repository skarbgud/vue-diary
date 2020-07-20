<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style>
html, body {padding: 0; margin: 0; height: 100%; width: 100%; overflow: hidden;}
#app{height: 100%;width: 100%;}
</style>