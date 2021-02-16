<template>
  <div>
    <BaseNavbar padding="0 24px 0 36px"
                :navItems="navItems"
                :navItemsLeft="false">
      <template v-slot:logo>
        <router-link :to="{ name: 'private-home' }">
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
        <TheUserDropdown :tenantName="tenantName"
                      :firstName="firstName"
                      :lastName="lastName"
                      :email="email"/>
      </template>
    </BaseNavbar>
  </div>
</template>

<script>
  import BaseNavbar from '@base/base-navbar'
  import TheUserDropdown from '@private/layouts/singles/the-user-dropdown'
  import { appName } from '@router/routes'
  import { mapState } from 'vuex'

  export default {
    name: 'TheHeader',
    components: {
      BaseNavbar,
      TheUserDropdown,
    },
    data: function () {
      return {
        navItems: [
          {
            label: 'Home',
            name: 'private-home',
          },
          {
            label: 'Workspace',
            name: 'micro-learning',
          },
        ],
      };
    },
    computed: {
      ...mapState({
        tenantName: state => state.tenant.name,
        firstName: state => state.user.firstName,
        lastName: state => state.user.lastName,
        email: state => state.user.email,
      }),
      appName: function () {
        return appName;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .app-logo
    height 40px

  .app-title
    color $navbar-font-color
    font-weight bold
    font-size 1.6em
</style>
