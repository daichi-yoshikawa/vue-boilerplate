<template>
  <BaseButton v-bind="$props"
              border="solid 1px #CDCDCD"
              buttonColor="#FFFFFF"
              buttonColorOnHover="#F7F7F7"
              color="#CDCDCD"
              fontWeight="light"
              @click="onClick"
              :colorOnHover="null">
    <slot></slot>
  </BaseButton>
</template>

<script>
  import BaseButton from '@base/base-button'

  export default {
    name: 'QuietButton',
    components: {
      BaseButton,
    },
    props: {
      minWidth: {
        type: String,
        required: false,
        default: '100px',
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    methods: {
      onClick: function () {
        this.$emit('click');
      },
    },
  };
</script>
