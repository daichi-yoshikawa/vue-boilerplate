<template>
  <div>
    <template v-if="initialized && tenants.length === 0">
      No tenant is found.
    </template>
    <div v-for="tenant in tenants" :key="tenant.domain">
      <div class="my-3">
        <TenantListItem :tenant="tenant"
                        @click="onClick"/>
        <template v-if="tenant.domain !== tenants[tenants.length-1].domain">
          <hr/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import TenantListItem from '@private/tenant/login/tenant-list-item'

  export default {
    name: 'TenantList',
    components: {
      TenantListItem,
    },
    props: {
      tenants: {
        type: Array,
        required: true,
      },
    },
    computed: {
      initialized: function () {
        return (this.$store && this.$store.user && this.$store.user.state
                && this.$store.user.state.initialized === true)
      },
    },
    methods: {
      onClick: function (payload) {
        this.$emit('click', payload);
      },
    },
  };
</script>
