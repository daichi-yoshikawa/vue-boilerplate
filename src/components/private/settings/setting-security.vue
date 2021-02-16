<template>
  <div>
    <h3 class="mt-5 mb-4 font-weight-bold">Security & Login</h3>
    <div>
      <SecurityItemEmail headline="Change email address"/>
      <hr class="my-3">
      <SecurityItemPassword headline="Change password"/>
    </div>
  </div>
</template>

<script>
  import SecurityItemEmail from '@private/settings/modules/security-item-email'
  import SecurityItemPassword from '@private/settings/modules/security-item-password'

  export default {
    name: 'SettingSecurity',
    components: {
      SecurityItemEmail,
      SecurityItemPassword,
    },
  };
</script>

<style lang="stylus" scoped>
  .test
    position absolute
    top 0
    right 0
</style>
