<template>
  <div>
    <template v-if="!sentVerificationCode && !sendingVerificationCode">
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
        <div class="mt-5 mx-auto">
          <PrimaryButton @click="onClick"
                         :disabled="invalid">
            Send Verification Code
          </PrimaryButton>
        </div>
      </validation-observer>
    </template>
    <template v-else-if="sendingVerificationCode">
      <div class="text-center mx-auto">
        <p>Sending verification code to <span class="font-weight-bold">{{ email }}</span>...</p>
      </div>
    </template>
    <template v-else>
      <div class="text-center mx-auto">
        <p>Sent verification code to <span class="font-weight-bold">{{ email }}</span>.</p>
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
      sendEmailVerificationCode: {
        type: Function,
        required: false,
        default: () => {},
      },
    },
    data: function () {
      return {
        email: '',
        message: '',
        sendingVerificationCode: false,
        sentVerificationCode: false,
      };
    },
    methods: {
      onClick: async function () {
        this.sendingVerificationCode = true;
        const res = await this.sendEmailVerificationCode({ email: this.email });
        this.sendingVerificationCode = false;
        this.sentVerificationCode = true;
        return res;
      },
    },
  };
</script>
