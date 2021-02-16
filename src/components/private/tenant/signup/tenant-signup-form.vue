<template>
  <validation-observer v-slot="{ invalid }">
    <div>
      <small v-if="error" class="text-danger">{{ error }}</small>
    </div>
    <div class="form-group">
      <label>Workspace name*</label>
      <validation-provider name="tenant name"
                           rules="required|min:4"
                           v-slot="{ errors }">
        <input type="text"
               class="form-control"
               v-model.trim="tenantName"
               autocomplete="off"
               placeholder="Enter workspace name.">
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea class="form-control"
                rows="4"
                v-model.trim="tenantDescription"/>
      <template v-if="tenantDescriptionIsTooLong">
        <small class="text-danger">Description must be less than {{ maxDescriptionLength }} letters.</small>
      </template>
    </div>
    <div>
      <TenantPriceList @selected="selectedPlan"/>
    </div>
    <div class="mt-3">
      <PrimaryButton @click="submitForm"
                     :disabled="invalid || tenantDescriptionIsTooLong || planNotSelected">
        Create New Tenant
      </PrimaryButton>
    </div>
  </validation-observer>
</template>

<script>
  import client from '@js/client'
  import resources from '@js/resources'
  import PrimaryButton from '@modules/primary-button'
  import TenantPriceList from '@private/tenant/signup/tenant-price-list'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { confirmed, min, required } from '@js/validators/rules'

  export default {
    name: 'TenantSignupForm',
    components: {
      PrimaryButton,
      TenantPriceList,
      ValidationObserver,
      ValidationProvider,
    },
    data: function () {
      return {
        error: '',
        tenantName: '',
        tenantDescription: '',
        maxDescriptionLength: 255,
        planType: null,
        planExpiredAt: '2999-12-31 00:00:00.00+00',
      };
    },
    computed: {
      tenantDescriptionIsTooLong: function () {
        return this.tenantDescription.length > this.maxDescriptionLength;
      },
      planNotSelected: function () {
        return this.planType == null;
      },
    },
    methods: {
      selectedPlan: function (payload) {
        this.planType = payload.planType;
      },
      submitForm: async function () {
        try {
          const payload = {
            name: this.tenantName,
            description: this.tenantDescription,
            'plan_type': this.planType,
            'plan_expired_at': this.planExpiredAt,
          };
          const res = await client.post(resources.tenants, payload);
          await this.$router.push({ name: 'tenant-login' });
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
</script>
