<template>
  <LayoutAuth>
    <div class="text-center mx-auto my-4">
      <h3 class="font-weight-bold">Reset your password</h3>
    </div>
    <template v-if="!hasResetCode">
      <div class="card p-5 mb-4 mx-auto">
        <EmailForm :sendPasswordResetCode="sendPasswordResetCode" />
      </div>
    </template>
    <template v-else>
      <div class="card p-5 mb-4 mx-auto">
        <PasswordForm @submit="resetPassword"
                      :email="email"
                      :error="error" />
      </div>
    </template>
  </LayoutAuth>
</template>

<script>
  import HttpStatus from 'http-status-codes'

  import EmailForm from '@auth/reset/email-form'
  import LayoutAuth from '@public/layouts/layout-auth'
  import PasswordForm from '@auth/reset/password-form'

  import publicClient from '@js/public-client'
  import resources from '@js/resources'

  export default {
    name: 'ResetView',
    data: function () {
      return {
        email: '',
        resetCode: '',
        sentCode: false,
        error: '',
      };
    },
    components: {
      EmailForm,
      LayoutAuth,
      PasswordForm,
    },
    mounted: function () {
      this.email = this.$route.query.email || '';
      this.resetCode = this.$route.params.passwordResetCode || '';
    },
    computed: {
      hasResetCode: function () {
        return this.email.length > 0 && this.resetCode.length > 0;
      },
    },
    methods: {
      sendPasswordResetCode: async function (payload) {
        try {
          const res = await publicClient.post(resources.passwordResetCode, payload);
          this.sentCode = true;
        } catch (error) {
          console.error(error);
        }
      },
      resetPassword: async function ({ email, password, }) {
        try {
          this.error = '';
          const payload = {
            email: email,
            reset_code: this.resetCode,
            password: password,
          };
          const res = await publicClient.post(resources.passwordReset, payload);
          this.$router.push({name: 'login'});
        } catch (error) {
          this.error = error;
          console.error(error);
        }
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .card
    max-width 640px
</style>
