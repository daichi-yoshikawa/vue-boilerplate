<template>
  <LayoutError>
    <div class="my-5 py-5 text-center">
      <h1>404: Page Not Found.</h1>
    </div>
  </LayoutError>
</template>

<script>
  import LayoutError from '@public/layouts/layout-error'

  export default {
    name: 'NotFoundView',
    components: {
      LayoutError,
    },
  };
</script>
