<template>
  <LayoutOnboard>
    <div class="text-center mx-auto my-4 pt-5">
      <h3 class="font-weight-bold">Sign up new workspace.</h3>
    </div>
    <div class="container p-5 my-4 mx-auto">
      <div class="card p-4 mb-4 mx-auto">
        <div class="form-container mx-auto">
          <TenantSignupForm />
        </div>
      </div>
    </div>
  </LayoutOnboard>
</template>

<script>
  import LayoutOnboard from '@private/layouts/layout-onboard'
  import TenantSignupForm from '@private/tenant/signup/tenant-signup-form'

  export default {
    name: 'TenantSignupView',
    components: {
      LayoutOnboard,
      TenantSignupForm,
    },
  };
</script>

<style lang="stylus" scoped>
  .container
    max-width 800px

  .form-container
    width 100%
    max-width 640px
</style>
