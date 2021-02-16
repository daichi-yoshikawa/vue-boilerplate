<template>
  <div class="body">
    <div class="content">
      <slot />
    </div>
    <div class="footer">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LayoutOnboard',
  };
</script>

<style lang="stylus" scoped>
  .body
    min-height 100vh
    display flex
    flex-direction column

  .content
    flex 1

  .footer
    margin-top 48px
</style>
