<template>
  <div class="row">
    <div class="my-auto">
      <b-dropdown right variant="link" toggle-class="text-decoration-none" no-caret>
        <template v-slot:button-content>
          <img class="icon"
               :src="require('@/img/bars.png')"
               :height="height">
        </template>
        <ul>
          <li class="dropdown-item"
              v-for="(item, i) in navItems" :key="i">
            <router-link :to="{ name: item.name }">
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseNavbarCollapsedMenu',
    props: {
      navItems: {
        type: Array,
        required: false,
        default: () => { return []; },
      },
      height: {
        type: String,
        required: false,
        default: '32px',
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .icon
    cursor pointer
    border-radius 10%
    padding 5px
    &:hover
      border 1px solid #3d3d3d

  .dropdown-item
    cursor pointer
    &:hover
      background-color #dddddd
</style>
