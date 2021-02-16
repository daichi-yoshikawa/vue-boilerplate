<template>
  <button class="button"
          v-bind="$props"
          :style="[style, morestyle]"
          @click.prevent="onClick"
          @mouseover="onMouseOver"
          @mouseleave="onMouseLeave">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'BaseButton',
    props: {
      minWidth: {
        type: String,
        required: false,
        default: '100px',
      },
      radius: {
        type: String,
        required: false,
        default: '15px',
      },
      border: {
        type: String,
        required: false,
        default: 'none',
      },
      color: {
        type: String,
        required: false,
        default: '#ACF27E',
      },
      colorOnHover: {
        type: String,
        required: false,
        default: null,
      },
      fontWeight: {
        type: String,
        required: false,
        default: 'normal',
      },
      buttonColor: {
        type: String,
        required: false,
        default: '#26B29D',
      },
      buttonColorOnHover: {
        type: String,
        required: false,
        default: null,
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      colorOnDisabled: {
        type: String,
        required: false,
        default: '#353535',
      },
      buttonColorOnDisabled: {
        type: String,
        required: false,
        default: '#dddddd',
      },
    },
    data: function () {
      return {
        curColor: this.color,
        curButtonColor: this.buttonColor,
        morestyle: {
          'border': this.border,
          'border-radius': this.radius,
          'font-weight': this.fontWeight,
          'min-width': this.minWidth,
        },
      };
    },
    computed: {
      style: function () {
        return {
          'background-color': this.disabled ? this.buttonColorOnDisabled : this.curButtonColor,
          'color': this.disabled ? this.colorOnDisabled : this.curColor,
        };
      },
    },
    methods: {
      onClick: function () {
        if (this.disabled) {
          return;
        }
        this.$emit('click');
      },
      onMouseOver: function () {
        if (this.colorOnHover) {
          this.curColor = this.colorOnHover;
        }
        if (this.buttonColorOnHover) {
          this.curButtonColor = this.buttonColorOnHover;
        }
      },
      onMouseLeave: function () {
        this.curColor = this.color;
        this.curButtonColor = this.buttonColor;
      },
      disable: function () {
        this.curColor = this.colorOnDisabled;
        this.curButtonColor = this.buttonColorOnDisabled;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .button
    font-size .9em
    cursor pointer
    outline none
    padding 5px 20px
    &:hover
      outline none
</style>
