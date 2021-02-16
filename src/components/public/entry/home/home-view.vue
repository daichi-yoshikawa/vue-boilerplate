<template>
  <LayoutMain>
    <div class="my-5 py-5 text-center">
      <h1>{{ $t("message.headline") }}</h1>
    </div>
  </LayoutMain>
</template>

<script>
  import LayoutMain from '@public/layouts/layout-main'

  export default {
    name: 'HomeView',
    components: {
      LayoutMain,
    },
  };
</script>
