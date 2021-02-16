<template>
  <div class="dropdown">
    <slot name="dropdown"></slot>
    <transition>
      <div class="dropdown-menu">
        <slot name="slot-dropdown-menu"></slot>
      </div>
    </transition>
    <!--
    <div class="dropdown-menu p-0">
      <div class="user-info text-center p-2">
        {{ userName }}<br>{{ email }}
      </div>
      <hr class="m-0 p-0">
      <ul class="mb-2">
        <li class="dropdown-item">
          <router-link to="/settings">ABC</router-link>
        </li>
        <li @click="onLogout" class="dropdown-item">
          Logout
        </li>
      </ul>
    </div>
    -->
  </div>
</template>

<script>
  import client from '@js/client'
  import resources from '@js/resources'

  export default {
    name: 'BaseDropdown',
    data: function () {
      return {
        userName: 'Name Placeholder',
        email: 'Email Placeholder',
      };
    },
    methods: {
      onLogout: async function () {
        try {
          await this.$store.dispatch('auth/logout');
          await this.$router.push({ name: 'entry-home' });
        } catch (error) {
          console.log(error);
        }
      },
    }
  };
</script>

<style lang="stylus" scoped>
  .dropdown
    cursor pointer
    position relative
    display inline-block
    &:hover .dropdown-menu
      display block

  .dropdown-menu
    display none
    position absolute
    right 0
    background-color #f9f9f9
    min-width 160px
    padding 12px 16px
    z-index 1

  .dropdown-item
    cursor pointer
    &:hover
      background-color #dddddd

  .user-logo
    height 36px
</style>
