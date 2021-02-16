<template>
  <div class="body">
    <div>
      <TheHeader />
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="footer">
      <TheFooter />
    </div>
  </div>
</template>

<script>
  import TheHeader from '@public/layouts/singles/the-header'
  import TheFooter from '@public/layouts/singles/the-footer'

  export default {
    name: 'LayoutMain',
    components: {
      TheHeader,
      TheFooter,
    },
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
