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
      jsonData: {"list":[{"type":"grid","icon":"icon-RectangleCopy","columns":[{"span":12,"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"requiredMessage":"","dataType":"","dataTypeCheck":false,"dataTypeMessage":"","pattern":"","patternCheck":false,"patternMessage":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1597719915527","remoteOption":"option_1597719915527"},"name":"单行文本","novalid":{},"key":"1597719915527","model":"input_1597719915527","rules":[]}]},{"span":12,"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"requiredMessage":"","dataType":"","dataTypeCheck":false,"dataTypeMessage":"","pattern":"","patternCheck":false,"patternMessage":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1597719917715","remoteOption":"option_1597719917715"},"name":"单行文本","novalid":{},"key":"1597719917715","model":"input_1597719917715","rules":[]}]}],"options":{"gutter":0,"justify":"start","align":"top","customClass":"","hidden":false,"flex":true,"responsive":false,"remoteFunc":"func_1597719911562","remoteOption":"option_1597719911562"},"name":"栅格布局","key":"1597719911562","model":"grid_1597719911562","rules":[]},{"type":"grid","icon":"icon-RectangleCopy","columns":[{"span":12,"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"list":[{"type":"radio","icon":"icon-radio-active","options":{"inline":false,"defaultValue":"","showLabel":false,"options":[{"value":"Option 1","label":"Option 1"},{"value":"Option 2","label":"Option 2"},{"value":"Option 3","label":"Option 3"}],"required":false,"requiredMessage":"","width":"","remote":false,"remoteType":"option","remoteOption":"option_1597719920227","remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_1597719920227","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"disabled":false},"name":"单选框组","novalid":{},"key":"1597719920227","model":"radio_1597719920227","rules":[]}]},{"span":12,"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"list":[{"type":"select","icon":"icon-select","options":{"defaultValue":"","multiple":false,"disabled":false,"clearable":false,"placeholder":"","required":false,"requiredMessage":"","showLabel":false,"width":"","options":[{"value":"Option 1"},{"value":"Option 2"},{"value":"Option 3"}],"remote":false,"remoteType":"option","remoteOption":"option_1597719930364","filterable":false,"remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_1597719930364","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true},"name":"下拉选择框","novalid":{},"key":"1597719930364","model":"select_1597719930364","rules":[]}]}],"options":{"gutter":0,"justify":"start","align":"top","customClass":"","hidden":false,"flex":true,"responsive":false,"remoteFunc":"func_1597719912045","remoteOption":"option_1597719912045"},"name":"栅格布局","key":"1597719912045","model":"grid_1597719912045","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small","customClass":"border-form","ui":"element","layout":"horizontal","labelCol":3,"width":"100%","hideLabel":false,"hideErrorMessage":false}},
      editData: {},
      remoteFuncs: {
        
      },
      dynamicData: {
        
      }
    }
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