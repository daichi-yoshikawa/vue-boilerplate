<template>
  <SecurityItem :headline="headline">
    <template v-slot:form>
      <validation-observer v-slot="{ invalid }">
        <div class="form-group">
          <div>
            <label>Current Email*</label>
            <validation-provider name="email"
                                 rules="required|email"
                                 v-slot="{ errors }">
              <input :style="inputStyle"
                     type="email"
                     class="form-control"
                     v-model="email"
                     autocomplete="off"
                     placeholder="Enter your current email address."
                     disabled>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </div>
          <div class="mt-3">
            <label>New Email*</label>
            <validation-provider name="new email"
                                 rules="required|email"
                                 v-slot="{ errors }">
              <input :style="inputStyle"
                     type="email"
                     class="form-control"
                     v-model="newEmail"
                     autocomplete="off"
                     placeholder="Enter your new email address.">
              <template v-if="newEmail.length > 0">
                <small class="text-danger">{{ errors[0] }}</small>
              </template>
            </validation-provider>
          </div>
          <div class="mt-3">
            <label>Confirm New Email*</label>
            <validation-provider name="email confirmation"
                                 rules="required|confirmed:new email"
                                 v-slot="{ errors }">
              <input :style="inputStyle"
                     type="email"
                     class="form-control"
                     v-model="newEmailConfirmation"
                     autocomplete="off"
                     placeholder="Confirm new email.">
              <template v-if="newEmailConfirmation.length > 0">
                <small class="text-danger">{{ errors[0] }}</small>
              </template>
            </validation-provider>
          </div>
        </div>
        <div class="mt-4">
          <PrimaryButton minWidth="100px"
                         @click="updateEmail"
                         :disabled="invalid || isSameEmail">
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
  import { confirmed, email, required } from '@js/validators/rules'
  import { mapState } from 'vuex'

  export default {
    name: 'SecurityItemEmail',
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
        newEmail: '',
        newEmailConfirmation: '',
        resultMessage: '',
        resultMessageClass: '',
        resultMessageTimerId: undefined,
      };
    },
    computed: {
      ...mapState({
        email: state => state.user.email,
      }),
      isSameEmail: function () {
        return this.email === this.newEmail;
      },
      inputStyle: function () {
        return {
          'width': this.width,
          'max-width': this.maxWidth,
        };
      },
    },
    methods: {
      updateEmail: async function () {
        try {
          if (this.resultMessageTimerId !== undefined) {
            clearTimeout(this.resultMessageTimerId);
          }
          this.resultMessage = '';
          this.resultMessageClass = '';

          const res = await this.$store.dispatch(
              'user/updateUser', { email: this.newEmail });

          this.newEmail = await '';
          this.newEmailConfirmation = await '';
          this.resultMessage = await 'Successfully updated.';
          this.resultMessageClass = await 'text-success';
          await this.clearResultMessage();
        } catch (error) {
          this.resultMessage = 'Update failed.';
          this.resultMessageClass = 'text-danger';
          this.clearResultMessage();
          console.error(error);
        }
      },
      clearResultMessage: function () {
        this.resultMessageTimerId = setTimeout(() => {
          this.resultMessage = '';
          this.resultMessageClass = '';
        }, 3000);
      },
    },
  };
</script>
