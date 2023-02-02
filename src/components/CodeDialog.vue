<template>
  <cus-dialog
    :visible="templateVisible"
    @on-close="templateVisible = false"
    ref="templateDialog"
    :width="width"
    form
    :title="title"
    @on-submit="handleSubmit"
    class="code-dialog-container"
  >

    <code-editor :height="codeHeight" :mode="this.mode" v-model="templ"></code-editor>
    <div class="code-dialog-help" v-if="help">
      <el-button type="text" @click="handleHelp">帮助<i class="el-icon-question el-icon--right"></i></el-button>
    </div>
  </cus-dialog>
</template>

<script>
import CusDialog from './CusDialog'
import CodeEditor from './CodeEditor'

export default {
  components: {
    CusDialog,
    CodeEditor
  },
  props: {
    mode: {
      type: String,
      default: 'xml'
    },
    title: {
      type: String,
      default: ''
    },
    help: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '900px'
    },
    codeHeight: {
      type: String,
      default: '460px'
    }
  },
  data () {
    return {
      templateVisible: false,
      templ: ''
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('on-confirm', this.templ)
    },

    open (val) {
      this.templ = val

      this.templateVisible = true
    },

    close () {
      this.templateVisible = false
    },

    handleHelp () {
      window.open(this.help)
    }
  }
}
</script>

<style lang="scss">
@media screen and (max-width: 1000px) {
  .code-dialog-container{
    .el-dialog{
      width: 100% !important;
    }
  }
}
</style>