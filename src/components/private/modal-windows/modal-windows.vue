<template>
  <div>
    <ModalLogout />
    <ModalSwitchTenant />
  </div>
</template>

<script>
  import ModalLogout from '@private/modal-windows/modal-logout'
  import ModalSwitchTenant from '@private/modal-windows/modal-switch-tenant'

  export default {
    name: 'ModalWindows',
    components: {
      ModalLogout,
      ModalSwitchTenant,
    },
  };
</script>
