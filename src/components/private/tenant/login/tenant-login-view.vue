<template>
  <LayoutOnboard>
    <div class="text-center mx-auto my-4 pt-5">
      <h3 class="font-weight-bold">Select your workspace.</h3>
    </div>
    <div class="container p-5 my-4 mx-auto">
      <div class="card">
        <div class="tenant-list-container mx-auto">
          <TenantList :tenants="tenants"
                      @click="selectTenant"/>
        </div>
      </div>
      <div class="text-center my-3">
        OR
      </div>
      <div class="text-center">
        <router-link :to="{ name: 'tenant-signup' }" class="font-weight-bold">
          <span class="text-primary">Create new tenant</span>
        </router-link>
      </div>
    </div>
  </LayoutOnboard>
</template>

<script>
  import LayoutOnboard from '@private/layouts/layout-onboard'
  import TenantList from '@private/tenant/login/tenant-list'

  export default {
    name: 'TenantLoginView',
    components: {
      LayoutOnboard,
      TenantList,
    },
    mounted: async function () {
      await this.$store.dispatch('user/getUser');
      await this.$store.dispatch('tenant/getUserTenants');
    },
    computed: {
      tenants: function () {
        return this.$store.state.tenant.tenants;
      },
    },
    methods: {
      selectTenant: async function (payload) {
        await this.$store.commit('tenant/selectTenant', payload.tenant);
        await this.$router.push({ name: 'private-home' });
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .container
    max-width 800px

  .tenant-list-container
    width 100%
    max-width 640px
</style>
