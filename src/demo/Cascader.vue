<template>
  <div>
    <fm-generate-form 
      :data="jsonData" 
      :remote="remoteFuncs" 
      :value="editData" 
      :remote-option="dynamicData"
      ref="generateForm"
    >
    </fm-generate-form>
    <el-button type="primary" @click="handleSubmit">Submit</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      jsonData: {"list":[{"type":"select","icon":"icon-select","options":{"defaultValue":"","multiple":false,"disabled":false,"clearable":true,"placeholder":"","required":true,"requiredMessage":"","showLabel":false,"width":"","options":[{"value":"Option 1"},{"value":"Option 2"},{"value":"Option 3"}],"remote":true,"remoteType":"option","remoteOption":"option_cascader","filterable":false,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_1600354310595","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true},"name":"下拉选择框","key":"1600354310595","model":"select_1600354310595","rules":[{"required":true,"message":"必须填写"}]},{"type":"grid","icon":"icon-RectangleCopy","columns":[{"span":12,"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"list":[{"type":"cascader","icon":"icon-jilianxuanze","options":{"defaultValue":[],"width":"","placeholder":"","disabled":false,"clearable":true,"remote":true,"remoteType":"option","remoteOption":"option_cascader","remoteOptions":[],"props":{"value":"value","label":"label","children":"children"},"remoteFunc":"func_1600301978192","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"required":true},"name":"级联选择器","key":"1600361034184","model":"cascader_1600301978192","rules":[{"required":true,"message":"必须填写"}],"novalid":{}}]},{"span":12,"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"list":[]}],"options":{"gutter":0,"justify":"start","align":"top","customClass":"","hidden":false,"flex":true,"responsive":false,"remoteFunc":"func_1600361031848","remoteOption":"option_1600361031848"},"name":"栅格布局","key":"1600361031848","model":"grid_1600361031848","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small","customClass":"","ui":"element","layout":"horizontal","labelCol":3,"width":"100%","hideLabel":false,"hideErrorMessage":false}},
      editData: {
          value: ''
      },
      remoteFuncs: {
        
      },
      dynamicData: {
        
          option_cascader : [], // 级联选择器 option data
    
      },
    }
  },
  mounted () {
    this.dynamicData.option_cascader = [{
            value: 'cexiangdaohang',
            label: '侧向导航',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
        }, {
            value: 'dingbudaohang',
            label: '顶部导航'
        }]
  },
  methods: {
    handleSubmit () {
      this.$refs.generateForm.getData().then(data => {
        // Data verification succeeded
        alert(JSON.stringify(data))
      }).catch(e => {
        // Data verification failed
      })
    }
  }
}
</script>