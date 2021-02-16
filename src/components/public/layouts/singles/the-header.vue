<template>
  <div>
    <BaseNavbar padding="0 24px 0 36px"
                :navItems="navItems"
                :navItemsLeft="false">
      <template v-slot:logo>
        <router-link :to="{ name: 'public-home' }">
          <div class="d-flex h-100">
            <div class="my-auto">
              <img class="app-logo" :src="require('@/img/logo-placeholder.png')">
            </div>
            <div class="my-auto">
              <span class="app-title ml-3 mr-4">{{ appName }}</span>
            </div>
          </div>
        </router-link>
      </template>
      <template v-slot:user-icon>
        <router-link to="/auth/login">
          <button class="btn login mr-2">Login</button>
        </router-link>
        <button class="btn signup" @click="goToSignup">Sign Up</button>
      </template>
    </BaseNavbar>
  </div>
</template>

<script>
  import BaseNavbar from '@base/base-navbar'
  import { appName } from '@router/routes'

  export default {
    name: 'TheHeader',
    components: {
      BaseNavbar,
    },
    data: function () {
      return {
        navItems: [],
      };
    },
    computed: {
      appName: function () {
        return appName;
      },
    },
    methods: {
      goToSignup: function () {
        if (this.$route.name === 'signup') {
          this.$router.go();
        } else {
          this.$router.replace({ name: 'signup' });
        }
      },
    },
  };
</script>

<style scoped lang="stylus">
  .app-logo
    height 40px

  .app-title
    color $navbar-font-color
    font-weight bold
    font-size 1.6em

  .login
    font-weight bold
    font-size 0.8em
    color $font-light-primary
    border 1px solid $font-light-primary
    border-radius 4px

  .signup
    font-weight bold
    font-size 0.8em
    color $font-light-primary
    background-color $navbar-dark
    border 1px solid $navbar-dark
    border-radius 4px
</style>
