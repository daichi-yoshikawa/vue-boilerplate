<template>
  <validation-observer v-slot="{ invalid }">
    <div class="form-group">
      <div class="row">
        <div class="col-6">
          <label>First Name*</label>
          <validation-provider name="first name"
                               rules="required|min:1"
                               v-slot="{ errors }">
            <input type="text"
                   class="form-control"
                   v-model="firstName"
                   autocomplete="off"
                   placeholder="Enter first name."
                   :disabled="!editing"/>
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
                   v-model="lastName"
                   autocomplete="off"
                   placeholder="Enter last name."
                   :disabled="!editing"/>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </div>
      </div>
    </div>
    <div class="mt-3 mx-auto">
      <PrimaryButton class="mr-3"
                     minWidth="120px"
                     @click="switchEditMode">
        {{ editButtonLabel }}
      </PrimaryButton>
      <PrimaryButton minWidth="120px"
                     @click="updateProfile"
                     :disabled="invalid || !editing">
        Update
      </PrimaryButton>
      <span class="ml-3">
        <small :class="resultMessageClass">{{ resultMessage }}</small>
      </span>
    </div>
  </validation-observer>
</template>

<script>
  import PrimaryButton from '@modules/primary-button'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { min, required } from '@js/validators/rules'
  import { mapState } from 'vuex'

  export default {
    name: 'UserProfile',
    components: {
      PrimaryButton,
      ValidationObserver,
      ValidationProvider,
    },
    data: function () {
      return {
        editing: false,
        editButtonLabel: 'Edit',
        firstName: '',
        lastName: '',
        resultMessage: '',
        resultMessageClass: '',
        resultMessageTimerId: undefined,
      };
    },
    mounted: function () {
      this.firstName = this.stateFirstName;
      this.lastName = this.stateLastName;
    },
    computed: {
      ...mapState({
        stateFirstName: state => state.user.firstName,
        stateLastName: state => state.user.lastName,
      }),
    },
    methods: {
      isSameProfile: function () {
        if (this.firstName === this.stateFirstName
            && this.lastName === this.stateLastName) {
          return true;
        }
        return false;
      },
      updateProfile: async function () {
        try {
          if (this.resultMessageTimerId !== undefined) {
            clearTimeout(this.resultMessageTimerId);
          }
          this.resultMessage = '';
          this.resultMessageClass = '';

          const payload = {
            firstName: this.firstName,
            lastName: this.lastName,
          };
          if (!this.isSameProfile()) {
            const res = await this.$store.dispatch('user/updateUser', payload);
          }

          this.resultMessage = await 'Successfully updated.';
          this.resultMessageClass = await 'text-success';
          await this.clearResultMessage();
        } catch (error) {
          this.resultMessage = 'Update failed.';
          this.resultMessageClass = 'text-danger';
          this.clearResultMessage();
          console.error(error);
        }
        this.switchEditMode();
      },
      switchEditMode: function () {
        this.editing = !this.editing;
        this.editButtonLabel = this.editing ? 'Cancel' : 'Edit';
      },
      clearResultMessage: function () {
        this.resultMessageTimerId = setTimeout(() => {
          this.resultMessage = '';
          this.resultMessageClass = '';
        }, 3000);
      },
    },
    watch: {
      stateFirstName (newFirstName, oldFirstName) {
        this.firstName = newFirstName;
      },
      stateLastName (newLastName, oldLastName) {
        this.lastName = newLastName;
      },
    },
  };
</script>
