<template>
  <div>
    <template v-if="!sentResetCode && !sendingResetCode">
      <validation-observer v-slot="{ invalid }">
        <div class="form-group">
          <label>Email*</label>
          <validation-provider name="email"
                               rules="required|email"
                               v-slot="{ errors }">
            <input type="email"
                   class="form-control"
                   v-model="email"
                   autocomplete="off"
                   placeholder="Enter your email address">
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </div>
        <div class="mt-3 mx-auto">
          <PrimaryButton @click="onClick"
                         :disabled="invalid">
            Reset your password
          </PrimaryButton>
        </div>
      </validation-observer>
    </template>
    <template v-else-if="sendingResetCode">
      <div class="text-center mx-auto">
        <p>Sending password reset link to <span class="font-weight-bold">{{ email }}</span>...</p>
      </div>
    </template>
    <template v-else>
      <div class="text-center mx-auto">
        <p>Sent password reset link to <span class="font-weight-bold">{{ email }}</span>.</p>
      </div>
    </template>
  </div>
</template>

<script>
  import PrimaryButton from '@modules/primary-button'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { email, required } from '@js/validators/rules'

  export default {
    name: 'EmailForm',
    components: {
      PrimaryButton,
      ValidationObserver,
      ValidationProvider,
    },
    props: {
      sendPasswordResetCode: {
        type: Function,
        required: false,
        default: () => {},
      },
    },
    data: function () {
      return {
        email: '',
        message: '',
        sendingResetCode: false,
        sentResetCode: false,
      };
    },
    methods: {
      onClick: async function () {
        this.sendingResetCode = true;
        const res = await this.sendPasswordResetCode({ email: this.email });
        this.sendingResetCode = false;
        this.sentResetCode = true;
        return res;
      },
    },
  };
</script>
