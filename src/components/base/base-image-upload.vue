<template>
  <validation-observer ref="validator">
    <validation-provider :rules="`required|image|size:${maxSize}`"
                         v-slot="ProviderProps">
      <form enctype="multipart/form-data">
        <div class="dropbox"
             :style="dropboxStyle"
             @mouseover="hover = true;"
             @mouseleave="hover = false;">
          <template v-if="!validFileSelected">
            <input type="file"
                   class="input-file"
                   accept="image/*"
                   ref='file'
                   @change="selected(ProviderProps, $event);">
          </template>
          <div class="content text-center">
            <template v-if="!validFileSelected && !file">
              <pre>{{ message }}</pre>
            </template>
            <template v-else-if="!validFileSelected && !!file">
              <span class="text-danger">{{ ProviderProps.errors[0] }}</span>
            </template>
            <template v-else-if="validFileSelected">
              <div class="my-auto border position-relative">
                <slot name="selected-image"></slot>
                <div class="position-absolute div-file-selected"
                     @click="uploadFile">
                  <slot name="upload-button">
                    <button class="btn btn-primary">
                      Upload
                    </button>
                  </slot>
                </div>
              </div>
            </template>
          </div>
        </div>
      </form>
    </validation-provider>
  </validation-observer>
</template>

<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { image, required, size } from '@js/validators/rules'

  export default {
    name: 'BaseImageUpload',
    components: {
      ValidationObserver,
      ValidationProvider,
    },
    props: {
      maxSize: {
        type: Number,
        required: false,
        default: 100,
      },
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
    },
    data: function () {
      return {
        hover: false,
        validFileSelected: false,
        file: undefined,
        url: undefined,
        message: '',
      };
    },
    mounted: function () {
      this.reset();
    },
    computed: {
      dropboxStyle: function () {
        return {
          width: this.width,
          height: this.height,
          background: (this.hover && !this.validFileSelected)? 'lightblue' : 'none',
        };
      },
    },
    methods: {
      selected: function (providerProps, event) {
        return providerProps.validate(event).then(result => {
          if (result.valid) {
            this.handleValidFile(this.$refs.file.files[0]);
          } else {
            this.handleInvalidFile();
          }
        }).catch(error => {
          this.handleInvalidFile();
        });
      },
      reset: function () {
        this.validFileSelected = false;
        this.file = undefined;
        this.url = undefined;
        this.message = `Drag and drop image file here\nor click to browse.\nFile size must be < ${this.maxSize}KB.`;
      },
      handleValidFile: function (file) {
        this.validFileSelected = true;
        this.message = '';
        this.file = file;
        this.url = URL.createObjectURL(file);
        this.$emit('selected', { url: this.url });
      },
      handleInvalidFile: function () {
        this.reset();
        this.message = `Selected file is invalid.\nImage file must be < ${this.maxSize}KB.`
      },
      uploadFile: function () {
        const formData = new FormData();
        formData.append('image', this.file, this.file.name);

        const payload = {
          formData: formData,
          file: this.file,
          url: this.url,
        };
        this.$emit('upload', payload);
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .dropbox
    outline 1px dashed grey
    outline-offset -10px
    background lightcyan
    color dimgray
    padding 10px 10px
    position relative

  .input-file
    opacity 0
    width 100%
    height 100%
    position absolute
    cursor pointer
    z-index 99

  .content
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)

  .div-file-selected
    bottom 10%
    left 50%
    transform translate(-50%, -10%)
</style>
