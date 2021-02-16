<template>
  <div class="form-group">
    <div class="d-flex">
      <div>
        <BaseImage class="border"
                   :src="getImageUrl"
                   width="128px" height="128px" radius="50%" fit="cover"
                   brightness="100%" brightnessOnHover="70%"
                   cursor="pointer"
                   @click="showModalToUploadImageFile" />
      </div>
      <div class="position-relative ml-2">
        <div class="position-absolute delete-button-container">
          <QuietButton minWidth="120px"
                       @click="showModalToDeleteImageFile">
            Delete photo
          </QuietButton>
        </div>
      </div>
    </div>
    <modal name="user-image"
           :resizable=false
           :adaptive=true
           :draggable=false
           width="320px"
           height="320px">
      <ModalUserImageUpload width="320px"
                            height="320px"
                            :url="url"
                            @selected="fileSelected"
                            @tried="triedImageFileUpload" />
    </modal>
    <modal name="delete-image"
           :resizable=false
           :adaptive=true
           :draggable=false
           :width="modalWidth"
           height="150px">
      <ModalUserImageDelete @cancel="cancelDeletingImageFile"
                            @tried="triedImageFileDeletion"/>
    </modal>
  </div>
</template>

<script>
  import BaseImage from '@base/base-image'
  import ModalUserImageDelete from '@private/settings/modules/modal-user-image-delete'
  import ModalUserImageUpload from '@private/settings/modules/modal-user-image-upload'
  import QuietButton from '@modules/quiet-button'
  import { mapGetters } from 'vuex'

  export default {
    name: 'UserImage',
    components: {
      BaseImage,
      ModalUserImageDelete,
      ModalUserImageUpload,
      QuietButton,
    },
    props: {
      modalWidth: {
        type: String,
        required: false,
        default: '320px',
      },
      modalHeight: {
        type: String,
        requierd: false,
        default: '320px',
      },
    },
    data: function () {
      return {
        url: '',
        uploadedFileName: '',
      };
    },
    computed: {
      ...mapGetters('user', ['getImageUrl']),
      modalContainerStyle: function () {
        return {
          width: this.modalWidth,
          height: this.modalHeight,
        };
      },
      dropboxWidth: function () {
        return this.modalWidth;
      },
      dropboxHeight: function () {
        return this.modalHeight;
      },
    },
    methods: {
      showModalToUploadImageFile: function () {
        this.$modal.show('user-image');
      },
      showModalToDeleteImageFile: async function () {
        this.$modal.show('delete-image');
      },
      cancelDeletingImageFile: function () {
        this.$modal.hide('delete-image');
      },
      triedImageFileDeletion: function () {
        this.$modal.hide('delete-image');
      },
      fileSelected: function (payload) {
        this.url = payload.url;
      },
      triedImageFileUpload: function () {
        this.$modal.hide('user-image');
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .delete-button-container
    bottom 0
</style>
