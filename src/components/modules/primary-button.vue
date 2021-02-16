<template>
  <BaseButton v-bind="$props"
              buttonColor="#26B29D"
              buttonColorOnHover="#1D8676"
              color="#ACF27E"
              fontWeight="bold"
              @click="onClick"
              :colorOnHover="null">
    <slot></slot>
  </BaseButton>
</template>

<script>
  import BaseButton from '@base/base-button'

  export default {
    name: 'PrimaryButton',
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
