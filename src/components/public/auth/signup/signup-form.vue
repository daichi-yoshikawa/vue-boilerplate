<template>
  <div>
    <validation-observer v-slot="{ invalid }">
      <div class="mb-2">
        <small v-if="error" class="text-danger">{{ error }}</small>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-6">
            <label>First Name*</label>
            <validation-provider name="first name"
                                 rules="required|min:1"
                                 v-slot="{ errors }">
              <input type="text"
                     class="form-control"
                     v-model.trim="firstName"
                     autocomplete="off"
                     placeholder="Enter first name."/>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </div>
          <div class="col-6">
            <label>Last Name*</label>
            <validation-provider name="last name"
                                 rules="required|min:1"
                                 v-slot="{ errors }">
              <input type="text"
                     class="form-control"
                     v-model.trim="lastName"
                     autocomplete="off"
                     placeholder="Enter last name."/>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label>Email*</label>
        <validation-provider name="email"
                             rules="required|email"
                             v-slot="{ errors }">
          <input type="email"
                 class="form-control"
                 v-model="email"
                 autocomplete="off"
                 placeholder="Enter your email address."
                 :disabled="emailReadOnly">
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>
      <div class="form-group">
        <label>Password*</label>
        <validation-provider name="password"
                             rules="required|min:8"
                             v-slot="{ errors }">
          <input type="password"
                 class="form-control"
                 v-model="password"
                 autocomplete="off"
                 placeholder="Enter your password.">
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>
      <div class="form-group">
        <label>Confirm Password*</label>
        <validation-provider name="password confirmation"
                             rules="required|confirmed:password"
                             v-slot="{ errors }">
          <input type="password"
                 class="form-control"
                 v-model="passwordConfirmation"
                 autocomplete="off"
                 placeholder="Confirm password.">
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>
      <div class="mt-5 mx-auto">
        <PrimaryButton @click="onClick"
                       :disabled="invalid">
          Sign Up
        </PrimaryButton>
      </div>
    </validation-observer>
  </div>
</template>

<script>
  import PrimaryButton from '@modules/primary-button'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { confirmed, email, min, required } from '@js/validators/rules'

  export default {
    name: 'SignupForm',
    components: {
      PrimaryButton,
      ValidationObserver,
      ValidationProvider,
    },
    props: {
      initEmail: {
        type: String,
        required: true,
      },
      onSignup: {
        type: Function,
        requierd: true,
      },
      error: {
        type: String,
        required: true,
      },
    },
    data: function () {
      return {
        emailReadOnly: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        languageCode: 'en',
        timezoneCode: 'America/Los_Angeles',
        disablePromotion: false,
      };
    },
    mounted: function () {
      this.email = this.initEmail;
      this.emailReadOnly = this.email.length > 0;
    },
    methods: {
      onClick: async function () {
        const payload = {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password,
          language_code: this.languageCode,
          timezone_code: this.timezoneCode,
          disable_promotion: this.disablePromotion,
        };
        await this.onSignup(payload);
      },
    },
  };
</script>

<style lang="stylus" scoped>
</style>
