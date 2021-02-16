<template>
  <div>
    <validation-observer v-slot="{ invalid }">
      <div class="mb-2">
        <small v-if="error" class="text-danger">{{ error }}</small>
      </div>
      <div class="form-group">
        <label>Email*</label>
        <validation-provider name="email" rules="required|email" v-slot="{ errors }">
          <input type="email"
                 class="form-control"
                 v-model="email"
                 autocomplete="off"
                 placeholder="Enter your email address.">
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>
      <div class="form-group">
        <label>Password*</label>
        <validation-provider name="password" rules="required|min:8" v-slot="{ errors }">
          <input type="password"
                 class="form-control"
                 v-model="password"
                 autocomplete="off"
                 placeholder="Create a password.">
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>
      <div>
        <router-link :to="{ name: 'password-reset' }">
          <small class="text-info font-weight-bold">
            Forgot my password
          </small>
        </router-link>
      </div>
      <div class="mt-3 mx-auto">
        <PrimaryButton @click="onLogin"
                       :disabled="invalid">
          Login
        </PrimaryButton>
      </div>
    </validation-observer>
  </div>
</template>

<script>
  import PrimaryButton from '@modules/primary-button'
  import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
  import { email, min, required } from '@js/validators/rules'

  export default {
    name: 'LoginForm',
    components: {
      PrimaryButton,
      ValidationObserver,
      ValidationProvider,
    },
    props: {
      onLoginImpl: {
        type: Function,
        required: true,
      },
      error: {
        type: String,
        required: true,
      },
    },
    data: function () {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      onLogin: async function () {
        const payload = {
          email: this.email,
          password: this.password,
        };
        await this.onLoginImpl(payload);
      },
    },
  };
</script>

<style lang="stylus" scoped>
</style>
