<template>
  <LayoutMain>
    <slot />
  </LayoutMain>
</template>

<script>
  import LayoutMain from '@public/layouts/layout-main'

  export default {
    name: 'LayoutAuth',
    components: {
      LayoutMain,
    },
  };
</script>
