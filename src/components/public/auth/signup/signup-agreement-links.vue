<template>
  <div class="mx-auto small">
    By signing up, you're agreeing to our
    <router-link to="/legal/tos" class="font-weight-bold">
      Terms of Service
    </router-link>
    and
    <router-link to="/legal/privacy" class="font-weight-bold">
      Privacy Policy
    </router-link>.
  </div>
</template>

<script>
  export default {
    name: 'SignupAgreementLinks',
  };
</script>
