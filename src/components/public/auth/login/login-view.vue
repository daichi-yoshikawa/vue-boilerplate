<template>
  <LayoutAuth>
    <div class="text-center mx-auto my-4">
      <h3 class="font-weight-bold">Login</h3>
    </div>
    <div class="card p-5 my-4 mx-auto">
      <LoginForm :onLoginImpl="onLoginImpl" :error="error" />
    </div>
  </LayoutAuth>
</template>

<script>
  import LayoutAuth from '@public/layouts/layout-auth'
  import LoginForm from '@auth/login/login-form'

  export default {
    name: 'LoginView',
    data: function () {
      return {
        error: '',
      };
    },
    components: {
      LayoutAuth,
      LoginForm,
    },
    methods: {
      onLoginImpl: async function (input) {
        try {
          this.error = '';
          const res = await this.$store.dispatch('auth/login', input);
          await this.$router.push({ name: 'tenant-login' });
        } catch (error) {
          this.error = 'Email or password is wrong.';
          console.error(error.response);
        }
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .card
    max-width 640px
</style>
