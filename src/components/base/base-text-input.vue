<template>
  <input v-model="inputData"
         @keyup="$emit('update', inputData);"
         :type="inputType"
         :style="style"
         :disabled="disabled"
         :placeholder="placeholder">
</template>

<script>
  export default {
    name: 'BaseTextInput',
    props: {
      autocomplete: {
        type: String,
        required: false,
        default: 'off',
      },
      disabled: {
        type: Boolean,
        requierd: false,
        default: false,
      },
      inputType: {
        type: String,
        required: false,
        default: 'text',
      },
      minWidth: {
        type: String,
        required: false,
        default: '100%',
      },
      placeholder: {
        type: String,
        required: false,
        default: '',
      },
      width: {
        type: String,
        required: false,
        default: '100%',
      },
      color: {
        type: String,
        required: false,
        default: '#353535',
      },
      fontWeight: {
        type: String,
        required: false,
        default: 'normal',
      },
      backgroundColor: {
        type: String,
        required: false,
        default: '#DDDDDD'
      },
      backgroundColorOnDisabled: {
        type: String,
        required: false,
        default: null,
      },
      backgroundColorOnActive: {
        type: String,
        required: false,
        default: null,
      },
      border: {
        type: String,
        required: false,
        default: 'none',
      },
      borderOnDisabled: {
        type: String,
        required: false,
        default: 'none',
      },
      borderOnActive: {
        type: String,
        required: false,
        default: 'none',
      },
    },
    data: function () {
      return {
        inputData: '',
        morestyle: {
          'width': this.width,
          'min-width': this.minWidth,
          'color': this.color,
          'font-weight': this.fontWeight,
          'border': this.border,
          'background-color': this.backgroundColor,
        },
      };
    },
    computed: {
      style: function () {
        return {
          'width': this.width,
          'min-width': this.minWidth,
        };
      },
    },
  };
</script>

<style lang="stylus" scoped>

</style>
