<template>
  <div class="row">
    <div :class="gridClass" v-for="(email, index) in emails" :key="index">
      <small class="text-muted">{{ email }}</small>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InvitedEmailList',
    props: {
      emails: {
        type: Array,
        required: false,
        default: () => { return []; },
      },
      cols: {
        type: Number,
        required: false,
        default: 3,
      },
    },
    computed: {
      grids: function () {
        return parseInt(12 / this.cols);
      },
      gridClass: function () {
        const grids = this.emails.length < this.grids ? parseInt(12 / this.emails.length) : this.grids;
        return `text-center col-${grids}`;
      },
    },
  }
</script>
