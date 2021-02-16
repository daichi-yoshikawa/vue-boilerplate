<template>
  <div class="position-relative" :style="style">
    <template v-if="!isUploading">
      <BaseImageUpload :width="width"
                       :height="height"
                       @selected="fileSelected"
                       @upload="uploadImageFile">
        <template v-slot:selected-image>
          <BaseImage :src="url"
                     :style="{position: 'relative', top: 0,}"
                     :width="width"
                     :height="height"
                     radius="0%"
                     fit="cover"
                     brightness="100%"
                     cursor="default" />
        </template>
        <template v-slot:upload-button>
          <PrimaryButton minWidth="100px">
            Upload
          </PrimaryButton>
        </template>
      </BaseImageUpload>
    </template>
    <template v-else>
      <div class="row h-100">
        <div class="m-auto">
          Uploading {{ fileToUpload }}...
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import BaseImage from '@base/base-image'
  import BaseImageUpload from '@base/base-image-upload'
  import PrimaryButton from '@modules/primary-button'

  export default {
    name: 'ModalUserImageUpload',
    components: {
      BaseImage,
      BaseImageUpload,
      PrimaryButton,
    },
    props: {
      width: {
        type: String,
        required: false,
        default: '320px',
      },
      height: {
        type: String,
        required: false,
        default: '320px',
      },
      url: {
        type: String,
        required: false,
        default: '',
      },
    },
    data: function () {
      return {
        isUploading: false,
        fileToUpload: '',
      };
    },
    computed: {
      style: function () {
        return {
          width: this.width,
          height: this.height,
        };
      },
    },
    methods: {
      fileSelected: function (payload) {
        this.$emit('selected', payload);
      },
      uploadImageFile: async function (payload) {
        const result = { success: true };
        try {
          this.isUploading = true;
          this.fileToUpload = payload.file.name;

          const res = await this.$store.dispatch(
             'user/updateImage', { formData: payload.formData });
        } catch (error) {
          result.success = false;
          console.error(error);
        } finally {
          this.isUploading = false;
          this.$emit('tried', result);
        }
      },
    },
  };
</script>
