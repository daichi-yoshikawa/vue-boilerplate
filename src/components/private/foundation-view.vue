<template>
  <div>
    <router-view />
    <ModalWindows />
  </div>
</template>

<script>
  import ModalWindows from '@private/modal-windows/modal-windows'

  export default {
    name: 'FoundationView',
    components: {
      ModalWindows,
    },
    mounted: async function () {
      try {
        // It's guaranteed that user has already selected tenant
        // by navigation guard.
        await this.$store.dispatch('user/getUser');
        await this.$store.commit('user/initialized');
        await this.$store.dispatch('tenant/getTenant', {
            domain: this.tenantDomain
        });
        await this.$store.dispatch('tenantUser/getTenantUser', {
            tenantDomain: this.tenantDomain,
        });
        await this.$store.dispatch('tenant/getUserTenants');
      } catch (error) {
        console.error(error);
        this.$router.push({ name: 'tenant-login' });
      }
    },
    computed: {
      tenantDomain: function () {
        return this.$store.state.tenant.domain;
      },
    },
  };
</script>
