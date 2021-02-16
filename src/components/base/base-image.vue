<template>
  <div class="crop-container"
       :style="containerStyle"
       @click="onClick"
       @mouseover="hoverIn"
       @mouseout="hoverOut">
    <img class="circular" :style="imageStyle" :src="src" @click="onClick">
  </div>
</template>

<script>
  export default {
    name: 'BaseImage',
    props: {
      brightness: {
        type: String,
        required: false,
        default: '100%',
      },
      brightnessOnHover: {
        type: String,
        required: false,
        default: '80%',
      },
      src: {
        type: String,
        required: false,
        default: '',
      },
      fit: {
        type: String,
        required: false,
        default: 'cover',
      },
      width: {
        type: String,
        required: false,
        default: '48px',
      },
      height: {
        type: String,
        required: false,
        default: '48px',
      },
      radius: {
        type: String,
        required: false,
        default: '50%',
      },
      cursor: {
        type: String,
        requierd: false,
        default: 'default',
      },
    },
    data: function () {
      return {
        currentBrightness: '100%',
      };
    },
    mounted: function () {
      this.currentBrightness = this.brightness
    },
    computed: {
      containerStyle: function () {
        return {
          cursor: this.cursor,
          width: this.width,
          height: this.height,
          'border-radius': this.radius,
        };
      },
      imageStyle: function () {
        return {
          'object-fit': this.fit,
          filter: `brightness(${this.currentBrightness})`,
        };
      },
    },
    methods: {
      onClick: function () {
        this.$emit('click', { src: this.src });
      },
      hoverIn: function () {
        this.currentBrightness = this.brightnessOnHover;
      },
      hoverOut: function () {
        this.currentBrightness = this.brightness;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .crop-container
    overflow hidden
    display flex

  img
    width 100%
</style>
