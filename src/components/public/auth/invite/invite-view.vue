<template>
  <LayoutAuth>
    <div class="container">
      <div class="text-center mx-auto my-4">
        <h3 class="font-weight-bold">Join Invited Tenant</h3>
      </div>
      <div class="card p-5 my-4 mx-auto">
        <h5 class="font-weight-bold mb-3">Login if you already have account</h5>
        <LoginForm :onLoginImpl="onLogin"
                   :error="loginError" />
      </div>
      <div class="position-relative">
        <hr>
        <div class="text-center position-absolute text-on-line">
          OR
        </div>
      </div>
      <div class="card p-5 my-4 mx-auto">
        <h5 class="font-weight-bold mb-3">Sign up if you are new user</h5>
        <SignupForm :initEmail="email"
                    :onSignup="onSignup"
                    :error="signupError" />
        <div class="mt-3">
          <SignupAgreementLinks />
        </div>
      </div>
    </div>
  </LayoutAuth>
</template>

<script>
  import LayoutAuth from '@public/layouts/layout-auth'
  import LoginForm from '@auth/login/login-form'
  import SignupAgreementLinks from '@auth/signup/signup-agreement-links'
  import SignupForm from '@auth/signup/signup-form'

  import client from '@js/client'
  import resources from '@js/resources'

  export default {
    name: 'InviteView',
    components: {
      LayoutAuth,
      LoginForm,
      SignupAgreementLinks,
      SignupForm,
    },
    data: function () {
      return {
        email: '',
        invitationCode: '',
        loginError: '',
        signupError: '',
        tenant: null,
      };
    },
    created: function () {
      this.invitationCode = this.$route.params.invitationCode || '';
      this.email = this.$route.query.email || '';
    },
    methods: {
      fetchTenantByInvitationCode: async function () {
        const res = await client.post(resources.tenantInvited, {
            email: this.email,
            invitation_code: this.invitationCode,
        });
        this.tenant = await res.data;
        return res;
      },
      createInvitedTenantUser: async function () {
        const payload = {
            invitation_code: this.invitationCode,
            tenant_id: this.tenant.id,
            user_id: this.userId,
            title: '',
            description: '',
            disable_email_notification: false,
            role_type: 0,
        };
        const res = await client.post(resources.tenants + `${this.tenant.domain}/users/`, payload);
        return res;
      },
      signupUserByInvitationCode: async function (payload) {
        const res = await client.post(resources.users, {
          ...payload,
          invitation_code: this.invitationCode,
        });
        return res;
      },
      onLogin: async function ({ email, password, }) {
        try {
          await this.$store.dispatch(
              'auth/login', { email: email, password: password, });
          await this.fetchTenantByInvitationCode();
          await this.$store.dispatch('user/getUser');
          await this.createInvitedTenantUser();
          await this.$router.push({ name: 'tenant-login' });
        } catch (error) {
          this.loginError = 'Email or password is wrong.';
          console.error(error);
        }
      },
      onSignup: async function (payload) {
        try {
          console.log('onSignup');
          await this.signupUserByInvitationCode(payload);
          await this.$store.dispatch(
              'auth/login',
              { email: payload.email, password: payload.password, });
          await this.fetchTenantByInvitationCode();
          await this.$store.dispatch('user/getUser');
          await this.createInvitedTenantUser();
          await this.$router.push({ name: 'tenant-login' });
        } catch (error) {
          this.signupError = error;
          console.error(error);
        }
      },
    },
    computed: {
      userId: function () {
        return this.$store.state.user.id;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .container
    max-width 640px

  .text-on-line
    font-size 1.2em
    font-weight bold
    padding 0 20px
    background-color white
    top -50%
    left 50%
    transform translate(-50%, -50%)
</style>
