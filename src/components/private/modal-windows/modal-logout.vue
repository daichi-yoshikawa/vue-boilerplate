<template>
  <ModalConfirmation name="logout"
                     text="Do you logout?"
                     labelYes="Logout"
                     labelNo="Cancel"
                     @yes="logout" />
</template>

<script>
  import ModalConfirmation from '@private/modal-windows/modal-confirmation'

  export default {
    name: 'ModalLogout',
    components: {
      ModalConfirmation,
    },
    methods: {
      logout: async function () {
        try {
          await this.$store.dispatch('auth/logout');
          await this.$router.push({ name: 'public-home' });
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
</script>
