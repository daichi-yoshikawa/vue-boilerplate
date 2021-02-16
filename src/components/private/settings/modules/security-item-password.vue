<template>
  <SecurityItem :headline="headline">
    <template v-slot:form>
      <validation-observer v-slot="{ invalid }">
        <div class="form-group">
          <div>
            <label>Current Password*</label>
            <validation-provider name="password"
                                 rules="required|min:8"
                                 v-slot="{ errors }">
              <input :style="inputStyle"
                     type="password"
                     class="form-control"
                     v-model="password"
                     autocomplete="off"
                     placeholder="Enter current password.">
              <template v-if="password.length > 0">
                <small class="text-danger">{{ errors[0] }}</small>
              </template>
            </validation-provider>
          </div>
          <div class="mt-3">
            <label>New Password*</label>
            <validation-provider name="new password"
                                 rules="required|min:8"
                                 v-slot="{ errors }">
              <input :style="inputStyle"
                     type="password"
                     class="form-control"
                     v-model="newPassword"
                     autocomplete="off"
                     placeholder="Enter new password.">
              <template v-if="newPassword.length > 0">
                <small class="text-danger">{{ errors[0] }}</small>
              </template>
              <template v-if="isSamePassword">
                <small class="text-danger">
                  New password is the same as current password.
                </small>
              </template>
            </validation-provider>
          </div>
          <div class="mt-3">
            <label>Confirm New Password*</label>
            <validation-provider name="password confirmation"
                                 rules="required|confirmed:new password"
                                 v-slot="{ errors }">
              <input :style="inputStyle"
                     type="password"
                     class="form-control"
                     v-model="newPasswordConfirmation"
                     autocomplete="off"
                     placeholder="Confirm new password.">
              <template v-if="newPasswordConfirmation.length > 0">
                <small class="text-danger">{{ errors[0] }}</small>
              </template>
            </validation-provider>
          </div>
        </div>
        <div class="mt-4">
          <PrimaryButton minWidth="100px"
                         @click="updateNewPassword"
                         :disabled="invalid || isSamePassword">
            Update
          </PrimaryButton>
          <span class="ml-3">
            <small :class="resultMessageClass">{{ resultMessage }}</small>
          </span>
        </div>
      </validation-observer>
    </template>
  </SecurityItem>
</template>

<script>
  import PrimaryButton from '@modules/primary-button'
  import SecurityItem from '@private/settings/modules/security-item'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { confirmed, min, required } from '@js/validators/rules'

  export default {
    name: 'SecurityItemPassword',
    components: {
      PrimaryButton,
      SecurityItem,
      ValidationObserver,
      ValidationProvider,
    },
    props: {
      headline: {
        type: String,
        required: true,
        default: '',
      },
      maxWidth: {
        type: String,
        required: false,
        default: '800px',
      },
      width: {
        type: String,
        required: false,
        default: '100%',
      },
    },
    data: function () {
      return {
        password: '',
        newPassword: '',
        newPasswordConfirmation: '',
        resultMessage: '',
        resultMessageClass: '',
        resultMessageTimerId: undefined,
      };
    },
    computed: {
      isSamePassword: function () {
        if (this.password === '' || this.newPassword === '') {
          return false;
        }
        return this.password === this.newPassword;
      },
      inputStyle: function () {
        return {
          'width': this.width,
          'max-width': this.maxWidth,
        };
      },
    },
    methods: {
      updateNewPassword: async function () {
        try {
          if (this.resultMessageTimerId !== undefined) {
            clearTimeout(this.resultMessageTimerId);
          }
          this.resultMessage = '';
          this.resultMessageClass = '';

          const payload = {
            password: this.password,
            newPassword: this.newPassword,
          };
          const res = await this.$store.dispatch('user/updatePassword', payload);
          this.password = await '';
          this.newPassword = await '';
          this.newPasswordConfirmation = await '';
          this.resultMessage = await 'Successfully updated.';
          this.resultMessageClass = await 'text-success';
          this.setResultMessageTimer();
        } catch (error) {
          this.resultMessage = 'Update failed.';
          this.resultMessageClass = 'text-danger';
          this.setResultMessageTimer();
          console.error(error);
        }
      },
      setResultMessageTimer: function () {
        this.resultMessageTimerId = setTimeout(() => {
          this.resultMessage = '';
          this.resultMessageClass = '';
        }, 3000);
      },
    },
  }
</script>
