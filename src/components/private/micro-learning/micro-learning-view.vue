<template>
  <LayoutMain>
    <div class="container">
      Micro Learning Page.
      <CollaborationTable />
    </div>
  </LayoutMain>
</template>

<script>
  import CollaborationTable from '@private/micro-learning/collaboration-table'
  import LayoutMain from '@private/layouts/layout-main'

  export default {
    name: 'MicroLearningView',
    components: {
      CollaborationTable,
      LayoutMain,
    },
  };
</script>

<style lang="stylus" scoped>
  .container
    max-width $max-width-primary
</style>
