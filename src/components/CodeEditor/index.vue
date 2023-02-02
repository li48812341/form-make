<template>
  <div :id="id" v-loading="loading" class="fm-code-editor" :style="{width: width, height: height}">{{codeValue}}</div>
</template>

<script>
import {loadJs} from '../../util'

export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    mode: {
      type: String,
      default: 'xml'
    },
    value: {
      type: [String, Object, Array]
    }
  },
  data () {
    return {
      id: 'code_' + Math.random().toString(36).slice(-8),
      codeValue: this.value,
      loading: true
    }
  },
  computed: {
    aceMode () {
      switch (this.mode) {
        case 'xml':
          return 'ace/mode/xml'
        case 'html':
          return 'ace/mode/html'
        case 'json':
          return 'ace/mode/json'
        case 'css':
          return 'ace/mode/css'
        case 'javascript':
          return 'ace/mode/javascript'
        default:
          return 'ace/mode/xml'
      }
    }
  },
  mounted () {
    
    setTimeout(() => {
      // if (window.ace) {
      //   this.loadEditor()
      // } else {
        loadJs('http://form.making.link/public/lib/ace/ace.js').then(() => {
          loadJs('http://form.making.link/public/lib/ace/ext-language_tools.js').then(() => {
            this.loadEditor()
          })
        })
      // }
    }, 0)
  },
  methods: {
    loadEditor () {
      this.loading = false

      ace.require("ace/ext/language_tools")

      const editor = ace.edit(this.id)

      // const beautify = ace.require("ace/ext/beautify")
      
      editor.session.setMode(this.aceMode)
      editor.setFontSize(13)
      editor.getSession().setTabSize(2)
      editor.setShowPrintMargin(false)
      // editor.setReadOnly(true)

      editor.setOptions({
        enableBasicAutoCompletion : true,
        enableSnippets : true,
        enableLiveAutocompletion : true
      });

      editor.commands.addCommand({

          name: 'myCommand',

          bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},

          exec: function(editor) {

              const currentCursor = editor.selection.getCursor();

              editor.selection.moveCursorLineEnd()

              editor.selection.moveTo(editor.selection.getCursor().row, editor.selection.getCursor().column)

              editor.session.insert(editor.getCursorPosition(), '\n')
          }

      });

      editor.on('change', (e) => {
        this.codeValue = editor.getValue()
      })
    }
  },
  watch: {
    value (val) {
      this.codeValue =  val
    },
    codeValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
.fm-code-editor{
  border: 1px solid #DCDFE6;
}
</style>
