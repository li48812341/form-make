<template>
  <div>
    <fm-generate-form
      :data="jsonData"
      :remote="remoteFuncs"
      :value="editData"
      @on-switch_1606187275240-change="switch_1606187275240Change"
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
      jsonData: {'list': [{'type': 'switch', 'icon': 'icon-switch', 'options': {'defaultValue': false, 'required': false, 'requiredMessage': '', 'disabled': false, 'customClass': '', 'labelWidth': 100, 'isLabelWidth': false, 'hidden': false, 'dataBind': true, 'remoteFunc': 'func_1606187275240', 'remoteOption': 'option_1606187275240'}, 'name': '开关', 'key': '1606187275240', 'model': 'switch_1606187275240', 'rules': []}, {'type': 'input', 'icon': 'icon-input', 'options': {'width': '100%', 'defaultValue': '', 'required': false, 'requiredMessage': '', 'dataType': '', 'dataTypeCheck': false, 'dataTypeMessage': '', 'pattern': '', 'patternCheck': false, 'patternMessage': '', 'placeholder': '', 'customClass': '', 'disabled': true, 'labelWidth': 100, 'isLabelWidth': false, 'hidden': true, 'dataBind': true, 'showPassword': false, 'remoteFunc': 'func_1606187282404', 'remoteOption': 'option_1606187282404'}, 'name': '单行文本', 'key': '1606187282404', 'model': 'input_1606187282404', 'rules': []}], 'config': {'labelWidth': 100, 'labelPosition': 'right', 'size': 'small'}},
      editData: {},
      remoteFuncs: {

      },
      dynamicData: {

      }
    }
  },
  methods: {
    switch_1606187275240Change (value) {
      console.log(value)

      setTimeout(() => {
        const { generateForm } = this.$refs
        generateForm[value ? 'display' : 'hide'](['input_1606187282404'])
        value && generateForm.disabled(['input_1606187282404'], false)
      }, 2000)
    },
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