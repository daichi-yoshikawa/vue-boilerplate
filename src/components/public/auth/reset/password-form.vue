<template>
  <div>
    <validation-observer v-slot="{ invalid }">
      <div class="mb-2">
        <small v-if="error" class="text-danger">{{ error }}</small>
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
      <div class="mt-3 mx-auto">
        <PrimaryButton @click="onSubmit"
                       :disabled="invalid">
          Save
        </PrimaryButton>
      </div>
    </validation-observer>
  </div>
</template>

<script>
  import PrimaryButton from '@modules/primary-button'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { confirmed, min, required } from '@js/validators/rules'

  export default {
    name: 'PasswordForm',
    components: {
      PrimaryButton,
      ValidationObserver,
      ValidationProvider,
    },
    props: {
      email: {
        type: String,
        required: true,
      },
      onSave: {
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
        password: '',
        passwordConfirmation: '',
      };
    },
    methods: {
      onSubmit: function () {
        const payload = {
          email: this.email,
          password: this.password,
        };
        this.$emit('submit', payload);
      },
    },
  };
</script>
