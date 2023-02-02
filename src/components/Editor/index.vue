<template>
  <vue-editor
    useCustomImageHandler
    @image-added="handleImageAdded"
    v-model="dataModel"
    :style="sty"
    :editor-toolbar="toolbar"
    class="fm-editor"
    :disabled="disabled"
  >
  </vue-editor>
</template>

<script>
import { EventBus } from '../../util/event-bus.js'
import FileService from '@/api/sys/FileService'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    sty: {
      type: Object,
      default: () => ({})
    },
    toolbar: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    ui: {
      type: String,
      default: 'element'
    }
  },
  fileService: null,
  created () {
    this.fileService = new FileService(this)
  },
  data () {
    return {
      dataModel: this.value
    }
  },
  methods: {
        handleImageAdded (file, Editor, cursorLocation, resetUploader) {//jeeplus定制
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)
        var formData = new FormData();
        formData.append("file", file);
        this.fileService.uploadFile(formData, '/vueEditor')
        //  this.$http({
        //   url: "/sys/file/webupload/upload?uploadPath=/vueEditor",
        //   method: "POST",
        //   data: formData,
        //   headers: { "Content-Type": "multipart/form-data" },
        // })
          .then(result => {
            let url = result.data.url; // Get url from response
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
          })
          .catch(err => {
            console.log(err);
          });
    }
  },
  watch: {
    dataModel (val) {

      if (this.ui == 'antd') {
        EventBus.$emit('on-field-change', this.$attrs.id, val)
      } else {
        this.$emit('input', val)
      }
    },
    value (val) {
      this.dataModel = val
    }
  }
}
</script>
