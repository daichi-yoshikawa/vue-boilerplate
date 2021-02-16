<template>
  <modal :name="name"
         :resizable=false
         :adaptive=true
         :draggable=false
         :width="width"
         :height="height">
    <div class="m-5">
      <div class="text-center lead">
        <small>{{ text }}</small>
      </div>
      <div class="row mt-5">
        <div class="col-6">
          <PrimaryButton @click="onYes">
            {{ labelYes }}
          </PrimaryButton>
        </div>
        <div class="col-6">
          <PrimaryButton @click="onNo">
            {{ labelNo }}
          </PrimaryButton>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
  import PrimaryButton from '@modules/primary-button'

  export default {
    name: 'ModalConfirmation',
    components: {
      PrimaryButton,
    },
    props: {
      name: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: false,
        default: '',
      },
      width: {
        type: String,
        required: false,
        default: '360px',
      },
      height: {
        type: String,
        required: false,
        default: '200px',
      },
      labelYes: {
        type: String,
        reuqired: false,
        default: 'OK',
      },
      labelNo: {
        type: String,
        required: false,
        default: 'Cancel',
      },
      minWidthYesButton: {
        type: String,
        required: false,
        default: '100px',
      },
      minWidthNoButton: {
        type: String,
        required: false,
        default: '100px',
      },
    },
    methods: {
      onYes: function () {
        this.$emit('yes');
        this.$modal.hide(this.name);
      },
      onNo: function () {
        this.$emit('no');
        this.$modal.hide(this.name);
      },
    },
  };
</script>
