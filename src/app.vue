<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style lang="stylus">
  #app
    font-family $fonts-primary
    font-size $font-size-primary
    color $font-dark-primary
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale

  ul
    list-style none
    padding-left 0

  a
    color $font-dark-primary
    outline 0
    &:hover
      color $font-dark-primary
      text-decoration none
</style>
