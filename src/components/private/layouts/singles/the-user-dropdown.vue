<template>
  <b-dropdown right
              no-caret
              variant="link"
              toggle-class="text-decoration-none"
              ref="dropdown">
    <template v-slot:button-content>
      <BaseImage class="border"
                 :src="getImageUrl"
                 width="36px" height="36px" radius="50%" fit="cover"
                 brightness="100%" brightnessOnHover="70%"
                 cursor="pointer" />
    </template>
    <div class="pt-2 px-4">
      <div class="tenant-name font-weight-bold text-muted">
        {{ tenantName }}
      </div>
    </div>
    <hr>
    <div class="user-info pt-1 px-4">
      <div class="username">
        {{ firstName }} {{ lastName }}
      </div>
      <div class="email">
        <small>{{ email }}</small>
      </div>
    </div>
    <hr>
    <ul class="mb-2">
      <router-link :to="{ name: 'settings', query: { tab: 0 }}">
        <li class="dropdown-item">
          Settings
        </li>
      </router-link>
      <li @click="onSwitchTenant" class="dropdown-item">
        Switch Tenant
      </li>
      <li @click="onLogout" class="dropdown-item">
        Logout
      </li>
    </ul>
  </b-dropdown>
</template>

<script>
  import BaseImage from '@base/base-image'
  import { mapGetters } from 'vuex'

  export default {
    name: 'TheUserDropdown',
    components: {
      BaseImage,
    },
    props: {
      tenantName: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapGetters('user', ['getImageUrl']),
    },
    methods: {
      onSwitchTenant: function () {
        this.$refs.dropdown.hide(true);
        this.$modal.show('switch-tenant');
      },
      onLogout: function () {
        this.$refs.dropdown.hide(true);
        this.$modal.show('logout');
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .dropdown-item
    cursor pointer
    &:hover
      background-color #dddddd

  .user-logo
    height 36px

  .username
    font-weight bold
    color $font-dark-secondary

  .email
    color $font-dark-secondary
</style>
