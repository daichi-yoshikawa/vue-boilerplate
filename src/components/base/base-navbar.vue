<template>
  <div class="header-container row m-0" :style="headerContainerStyle">
    <div class="navbar-container mx-auto"
         :style="navbarContainerStyle">
      <div class="left row m-0 p-0 h-100">
        <slot name="logo" />
        <template v-if="navItemsLeft && !collapse && navItems.length > 0">
          <div class="d-flex my-auto">
            <BaseNavbarItems :navItems="navItems"
                             :color="fontColor"
                             :size="fontSize"
                             :weight="fontWeight" />
          </div>
        </template>
        <template v-else-if="navItemsLeft && collapse">
          <BaseNavbarCollapsedMenu :navItems="navItems"
                                   :height="collapseIconHeight" />
        </template>
      </div>
      <div class="right row m-0 p-0 h-100">
        <template v-if="!navItemsLeft && !collapse">
          <div class="d-flex my-auto">
            <BaseNavbarItems :navItems="navItems"
                             :color="fontColor"
                             :size="fontSize"
                             :weight="fontWeight" />
          </div>
        </template>
        <template v-else-if="!navItemsLeft && collapse && navItems.length > 0">
          <BaseNavbarCollapsedMenu :navItems="navItems"
                                   :height="collapseIconHeight" />
        </template>
        <div class="d-flex my-auto">
          <slot name="user-icon"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseNavbarCollapsedMenu from '@base/base-navbar-collapsed-menu'
  import BaseNavbarItems from '@base/base-navbar-items'
  import { mapState } from 'vuex'

  export default {
    name: 'BaseNavbar',
    components: {
      BaseNavbarCollapsedMenu,
      BaseNavbarItems,
    },
    props: {
      padding: {
        type: String,
        required: false,
        default: '10px',
      },
      collapseIconHeight: {
        type: String,
        required: false,
        default: '32px',
      },
      navItemsLeft: {
        type: Boolean,
        required: false,
        default: false,
      },
      navItems: {
        type: Array,
        required: false,
        default: () => { return []; },
      },
      color: {
        type: String,
        required: false,
        default: '#535353',
      },
      fontColor: {
        type: String,
        required: false,
        default: '#dddddd',
      },
      height: {
        type: String,
        required: false,
        default: '72px',
      },
      maxWidth: {
        type: String,
        required: false,
        default: '1400px',
      },
      collapsePixel: {
        type: Number,
        required: false,
        default: 900,
      },
      fontSize: {
        type: String,
        required: false,
        default: '1.2rem',
      },
      fontWeight: {
        type: String,
        required: false,
        default: 'normal',
      },
    },
    data: function () {
      return {
        collapse: false,
      };
    },
    mounted: function () {
      this.collapse = this.windowWidth < this.collapsePixel;
    },
    computed: {
      ...mapState({
        windowWidth: state => state.window.width,
        windowHeight: state => state.window.height,
      }),
      headerContainerStyle: function () {
        return {
          padding: this.padding,
          height: this.height,
          'background-color': this.color,
        };
      },
      navbarContainerStyle: function () {
        return {
          'max-width': this.maxWidth,
        };
      },
      navItemStyle: function () {
        return {
          color: this.fontColor,
          'font-size': this.fontSize,
          'font-weight': this.fontWeight,
        };
      },
    },
    watch: {
      windowWidth (newWindowWidth, oldWindowWidth) {
        this.collapse = this.windowWidth < this.collapsePixel;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .left
    left 0
    position absolute

  .right
    right 0
    position absolute

  .header-container
    width 100%
    background-color $navbar-light

  .navbar-container
    width 100%
    position relative

  .collapse-icon
    cursor pointer
    border-radius 10%
    padding 5px
    &:hover
      border 1px solid black
</style>
