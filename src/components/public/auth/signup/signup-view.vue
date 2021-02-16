<template>
  <LayoutAuth>
    <div class="text-center mx-auto my-4">
      <h3 class="font-weight-bold">Create your account</h3>
    </div>
    <template v-if="!fromVerificationUrl()">
      <div class="card p-5 mb-4 mx-auto">
        <EmailForm :sendEmailVerificationCode="sendEmailVerificationCode" />
        <template v-if="(!sendingCode) && (!sentCode)">
          <div class="mt-3">
            <SignupAgreementLinks />
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <div class="card p-5 mb-4 mx-auto">
        <SignupForm :initEmail="email"
                    :onSignup="onSignup"
                    :error="error" />
        <div class="mt-3">
          <SignupAgreementLinks />
        </div>
      </div>
    </template>
    <template v-if="!fromVerificationUrl()">
      <div class="text-center my-3">
        OR
      </div>
      <div class="text-center">
        <router-link :to="{ name: 'tenant-signup' }" class="font-weight-bold">
          <span class="text-primary">Create new tenant</span>
        </router-link>
      </div>
    </template>
  </LayoutAuth>
</template>

<script>
  import HttpStatus from 'http-status-codes'

  import EmailForm from '@auth/signup/email-form'
  import LayoutAuth from '@public/layouts/layout-auth'
  import SignupAgreementLinks from '@auth/signup/signup-agreement-links'
  import SignupForm from '@auth/signup/signup-form'

  import client from '@js/public-client'
  import resources from '@js/resources'

  export default {
    name: 'SignupView',
    data: function () {
      return {
        email: '',
        code: '',
        sendingCode: false,
        sentCode: false,
        error: '',
      };
    },
    components: {
      EmailForm,
      LayoutAuth,
      SignupAgreementLinks,
      SignupForm,
    },
    created: function () {
      this.code = this.$route.params.emailVerificationCode || '';
      this.email = this.$route.query.email || '';
    },
    methods: {
      fromVerificationUrl: function () {
        const hasCode = this.code !== '' && this.code.length > 0;
        const hasEmail = this.email !== '' && this.email.length > 0;
        return hasCode && hasEmail;
      },
      onSignup: async function (payload) {
        try {
          this.error = '';
          payload = {
            ...payload,
            verification_code: this.code
          };

          const res = await client.post(resources.users, payload);
          if (res.status != HttpStatus.CREATED) {
            throw 'Email is already registered.'
          }

          this.$router.push({name: 'login'});
        } catch (error) {
          this.error = error;
          console.error(error);
        }
      },
      sendEmailVerificationCode: async function (payload) {
        try {
          this.sendingCode = true;
          const res = await client.post(resources.emailSignupVerification, payload);
          this.sendingCode = await false;
          this.sentCode = await true;
        } catch (error) {
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
