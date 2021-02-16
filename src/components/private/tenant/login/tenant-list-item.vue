<template>
  <div class="row h-100 m-0 p-0">
    <div class="d-inline-flex my-auto">
      <BaseImage class="border"
                 :src="tenant.imageUrl"
                 width="40px" height="40px" radius="15%" fit="cover"
                 brightness="100%" />
    </div>
    <div class="d-inline-flex my-auto ml-2 ">
      <span class="tenant-name">
        {{ tenant.name }}
      </span>
    </div>
    <div class="d-inline-flex my-auto ml-4">
      ABCDEFGHIJOJK:FLKDJL:KJFL:<br>
      sda;flkja;sdfk
    </div>
    <div class="d-inline-flex my-auto ml-auto">
      <PrimaryButton @click="onClick">
        Select
      </PrimaryButton>
    </div>
  </div>
</template>

<script>
  import BaseImage from '@base/base-image'
  import PrimaryButton from '@modules/primary-button'

  export default {
    name: 'TenantListItem',
    components: {
      BaseImage,
      PrimaryButton,
    },
    props: {
      tenant: {
        type: Object,
        required: true,
      },
    },
    methods: {
      onClick: function () {
        const payload = {
          tenant: this.tenant,
        };
        this.$emit('click', payload);
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .tenant-name
    font-size 1.2em
    font-weight bold

  .tenant-description-container
    max-width 200px

  .tenant-description
    font-size 1.0em
</style>
