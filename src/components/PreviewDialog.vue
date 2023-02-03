<template>
  <cus-dialog
    :visible="previewVisible"
    @on-close="previewVisible = false"
    ref="widgetPreview"
    form
    :title="$t('fm.actions.preview')"
    fullscreen
    class="fm-generate-preview-container"
  >

    <div class="fm-generate-preview" :class="`${platform}`">
      <generate-form preview :platform="platform" id="export-id" :edit="formEdit" style="margin: 0 auto;" insite="true" v-if="previewVisible && (previewForm.config.ui == 'element' || !previewForm.config.ui)" :data="previewForm" :value="widgetModels" :remote="remoteFuncs" ref="generateForm">

        <template v-slot:blank="scope">
          Width<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
          Height：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
        </template>
      </generate-form>

      <antd-generate-form preview :platform="platform" :edit="formEdit" style="margin: 0 auto;" insite="true" v-if="previewVisible && previewForm.config.ui == 'antd'" :data="previewForm" :value="widgetModels" :remote="remoteFuncs" ref="generateAntForm">
        <template v-slot:blank="scope">
          <a-input 
            v-decorator="[
              'blank',
              {
                initialValue: scope.model.blank
              }
            ]"
          style="width: 100px"></a-input>
        </template>
      </antd-generate-form>
    </div>

    <template slot="action">
      <el-button type="primary" @click="handleTest">{{$t('fm.actions.getData')}}</el-button>
      <el-button @click="handleReset">{{$t('fm.actions.reset')}}</el-button>
      <el-button @click="formEdit = false" v-if="formEdit">{{$t('fm.actions.disabledEdit')}}</el-button>
      <el-button @click="formEdit = true" v-else>{{$t('fm.actions.enabledEdit')}}</el-button>
      <el-button @click="previewVisible = false">{{$t('fm.actions.close')}}</el-button>
      <!-- <el-button @click="handleExportWord">导出Word</el-button> -->
    </template>
  </cus-dialog>
</template>

<script>
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
// import AntdGenerateForm from './AntdvGenerator/GenerateForm'
import request from '../util/request.js'

export default {
  components: {
    CusDialog,
    GenerateForm
    // AntdGenerateForm
  },
  props: {
  },
  data () {
    return {
      previewVisible: false,
      formEdit: true,
      previewForm: {},
      widgetModels: {},
      remoteFuncs: {
        func_test (resolve) {
          setTimeout(() => {
            const options = [
              {id: '1', name: '1111'},
              {id: '2', name: '2222'},
              {id: '3', name: '3333'}
            ]

            resolve(options)
          }, 2000)
        },
        funcGetToken (resolve) {
          request.get('http://tools-server.making.link/api/uptoken').then(res => {
            resolve(res.uptoken)
          })
        },
        upload_callback (response, file, fileList) {
          console.log('callback', response, file, fileList)
        },
      },
      platform: 'pc'
    }
  },
  methods: {
    preview (data, platform) {
      this.previewForm = data
      this.previewVisible = true

      this.platform = platform
    },
    handleTest () {
      const $form = this.previewForm.config.ui == 'element' ?
        this.$refs.generateForm : this.$refs.generateAntForm

      $form.getData().then(data => {
        this.$emit('get-data-success', data)
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$message.error(e)
        this.$refs.widgetPreview.end()
      })
    },
    handleReset () {
      const $form = this.previewForm.config.ui == 'element' ?
        this.$refs.generateForm : this.$refs.generateAntForm

      $form.reset()
    },
    handleExportWord () {
     var rules = "",
          ss = document.styleSheets;
      for (var i = 0; i < ss.length; ++i) {
          for (var x = 0; x < ss[i].cssRules.length; ++x) {
              rules += ss[i].cssRules[x].cssText;
          }
      }

      var header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title>
      <style>${rules}</style>
      </head><body>`;
 
      var footer = "</body></html>";
  
      var html = header+document.getElementById('export-id').innerHTML+footer;
  
      var blob = new Blob(['\ufeff', html], {
          type: 'application/msword'
      });
      
      // Specify link url
      var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
      
      // Specify file name
      let filename = filename?filename+'.doc':'document.doc';
      
      // Create download link element
      var downloadLink = document.createElement("a");
  
      document.body.appendChild(downloadLink);
      
      if(navigator.msSaveOrOpenBlob ){
          navigator.msSaveOrOpenBlob(blob, filename);
      }else{
          // Create a link to the file
          downloadLink.href = url;
          
          // Setting the file name
          downloadLink.download = filename;
          
          //triggering the function
          downloadLink.click();
      }
      
      document.body.removeChild(downloadLink);
    },
  }
}
</script>