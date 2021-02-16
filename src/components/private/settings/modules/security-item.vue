<template>
  <div>
    <div class="position-relative">
      <span class="h4">{{ headline }}</span>
      <div class="edit-button">
        <PrimaryButton minWidth="100px"
                       @click="showForm">
          {{ buttonLabel }}
        </PrimaryButton>
      </div>
    </div>
    <div class="mt-3">
      <template v-if="showingForm">
        <slot name="form"></slot>
      </template>
    </div>
  </div>
</template>

<script>
  import PrimaryButton from '@modules/primary-button'

  export default {
    name: 'SecurityItem',
    components: {
      PrimaryButton,
    },
    props: {
      headline: {
        type: String,
        required: true,
        default: '',
      },
    },
    data: function () {
      return {
        showingForm: false,
        disabled: false,
      };
    },
    computed: {
      buttonLabel: function () {
        return this.showingForm ? 'Close' : 'Change';
      },
    },
    methods: {
      showForm: function () {
        this.showingForm = !this.showingForm;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .headline
    position absolute
    top 0
    left 0
    transform translate(0, 0)

  .edit-button
    position absolute
    top 50%
    right 0
    transform translate(0, -50%)
</style>
