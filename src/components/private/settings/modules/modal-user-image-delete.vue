<template>
  <div class="row m-0 p-0 h-100 w-100">
    <div class="m-auto w-100">
      <template v-if="!isDeleting">
        <p class="text-center">Do you really delete photo?</p>
        <div class="row m-0 p-0">
          <div class="col-6 row m-0 p-0">
            <div class="mx-auto pl-4">
              <PrimaryButton minWidth="100px"
                             @click="cancelDeletingImageFile">
                Cancel
              </PrimaryButton>
            </div>
          </div>
          <div class="col-6 row m-0 p-0">
            <div class="mx-auto pr-4">
              <QuietButton minWidth="100px"
                           @click="deletingImageFile">
                Delete
              </QuietButton>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="text-center">Deleting ...</p>
      </template>
    </div>
  </div>
</template>

<script>
  import QuietButton from '@modules/quiet-button'
  import PrimaryButton from '@modules/primary-button'

  export default {
    name: 'ModalUserImageDelete',
    components: {
      PrimaryButton,
      QuietButton,
    },
    data: function () {
      return {
        isDeleting: false,
      };
    },
    methods: {
      cancelDeletingImageFile: function () {
        this.$emit('cancel');
      },
      deletingImageFile: async function () {
        const result = { success: true };
        try {
          this.isDeleting = true;
          const res = await this.$store.dispatch('user/deleteUserImage');
        } catch (error) {
          result.success = false;
          console.error(error);
        } finally {
          this.isDeleting = false;
          this.$emit('tried', result);
        }
      },
    },
  };
</script>
