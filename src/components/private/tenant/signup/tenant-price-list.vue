<template>
  <div class="row">
    <div v-for="plan in plans" :key="plan.planType" class="col-4">
      <TenantPriceCard :selected="selected[plan.planType]"
                       :planType="plan.planType"
                       :name="plan.name"
                       :price="plan.price"
                       :pricePer="plan.pricePer"
                       :disabled="plan.disabled"
                       @click="selectPlan" />
    </div>
  </div>
</template>

<script>
  import TenantPriceCard from '@private/tenant/signup/tenant-price-card'

  export default {
    name: 'TenantPriceList',
    components: {
      TenantPriceCard,
    },
    data: function () {
      return {
        selectedPlanType: null,
        plans: [
          {
            planType: 0,
            name: 'Free',
            price: '0',
            pricePer: 'mo',
            buttonLabel: 'Signup for free',
            disabled: false,
          },
          {
            planType: 1,
            name: 'Standard',
            price: '10',
            pricePer: 'mo',
            buttonLabel: 'Get started',
            disabled: true,
          },
          {
            planType: 2,
            name: 'Enterprise',
            price: '-',
            pricePer: '',
            buttonLabel: 'Contact us',
            disabled: true,
          },
        ],
      };
    },
    computed: {
      selected: function () {
        return this.plans.map(plan => plan.planType === this.selectedPlanType);
      },
    },
    methods: {
      selectPlan: function (payload) {
        this.selectedPlanType = payload.planType;
        const newPayload = this.plans.filter(plan => plan.planType === this.selectedPlanType)[0];
        this.$emit('selected', newPayload);
      },
    },
  };
</script>
