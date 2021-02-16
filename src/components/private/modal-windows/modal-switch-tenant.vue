<template>
  <ModalConfirmation name="switch-tenant"
                     text="Do you switch tenant?"
                     labelYes="OK"
                     labelNo="Cancel"
                     @yes="switchTenant" />
</template>

<script>
  import ModalConfirmation from '@private/modal-windows/modal-confirmation'

  export default {
    name: 'ModalSwitchTenant',
    components: {
      ModalConfirmation,
    },
    methods: {
      switchTenant: function () {
        this.$store.commit('tenant/clearTenant');
        this.$store.commit('tenantUser/clearTenantUser');
        this.$router.push({ name: 'tenant-login' });
      },
    },
  }
</script>
