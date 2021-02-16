<template>
  <div>
    BasePaginator
  </div>
</template>

<script>
  export default {
    name: 'BasePaginator',
    props: {
      initialPage: {
        type: Number,
        required: false,
        default: 1,
      },
      minPage: {
        type: Number,
        required: false,
        default: 1,
      },
      maxPage: {
        type: Number,
        required: false,
        default: 1,
      },
      size: {
        type: Number,
        required: false,
        default: 5,
      },
    },
    data: function () {
      return {
        selectedPage: 1,
      };
    },
    mounted: function () {
      this.selectedPage = this.initialPage;
    },
    computed: {
      pages: function () {
        return [1, 2, 3];
      },
    }
  };
</script>
