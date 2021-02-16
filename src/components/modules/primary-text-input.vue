<template>
  <BaseTextInput v-bind="$props"
                 :inputData.sync="inputData"
                 :inputType="inputType"
                 :disabled="disabled"/>
</template>

<script>
  import BaseTextInput from '@base/base-text-input'

  export default {
    name: 'PrimaryTextInput',
    components: {
      BaseTextInput,
    },
    props: {
      autocomplete: {
        type: String,
        required: false,
        default: 'off',
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      inputType: {
        type: String,
        required: false,
        default: 'text',
      },
      placeholder: {
        type: String,
        required: false,
        default: '',
      },
      minWidth: {
        type: String,
        required: false,
        default: '100%',
      },
      width: {
        type: String,
        required: false,
        default: '100%',
      },
      inputData: {
        type: String,
        required: false,
        default: '',
      },
    },
  };
</script>
