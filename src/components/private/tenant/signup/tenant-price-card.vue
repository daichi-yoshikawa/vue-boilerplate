<template>
  <div class="card"
       :class="disabled ? 'text-muted' : ''"
       :disabled="disabled"
       :style="style"
       @click="onClick">
    <div class="card-header text-center">
      <h4>{{ name }}</h4>
    </div>
    <div class="card-body text-center">
      <h4 class="card-title">
        ${{ price }} <small class="text-muted">/ {{ pricePer }}</small>
      </h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TenantPriceCard',
    props: {
      selected: {
        type: Boolean,
        required: false,
        default: false,
      },
      planType: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        requierd: true,
      },
      pricePer: {
        type: String,
        required: true,
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      border: {
        type: String,
        required: false,
        default: 'solid 1px #dddddd',
      },
      borderOnSelect: {
        type: String,
        required: false,
        default: 'solid 4px #ababab',
      },
    },
    computed: {
      style: function () {
        return {
          border: this.selected ? this.borderOnSelect : this.border,
          cursor: this.disabled ? 'not-allowed' : 'pointer',
        };
      },
    },
    methods: {
      onClick: function () {
        if (this.disabled) {
          return;
        }

        const payload = {
          planType: this.planType,
        };
        this.$emit('click', payload);
      },
    },
  };
</script>
