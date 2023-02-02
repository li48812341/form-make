<template>
  <div>
    <fm-generate-antd-form 
      :data="jsonData" 
      :remote="remoteFuncs" 
      :value="editData" 
      :remote-option="dynamicData"
      ref="generateForm"
    >
    </fm-generate-antd-form>
    <a-button type="primary" @click="handleSubmit">Submit</a-button>
    <a-button type="primary" @click="handleSetdata">Set data</a-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      jsonData: {"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"requiredMessage":"","dataType":"","dataTypeCheck":false,"dataTypeMessage":"","pattern":"","patternCheck":false,"patternMessage":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1601451903714","remoteOption":"option_1601451903714"},"name":"单行文本","key":"1601451903714","model":"input","rules":[]},{"type":"radio","icon":"icon-radio-active","options":{"inline":false,"defaultValue":"","showLabel":false,"options":[{"value":"Option 1","label":"Option 1"},{"value":"Option 2","label":"Option 2"},{"value":"Option 3","label":"Option 3"}],"required":false,"requiredMessage":"","width":"","remote":false,"remoteType":"option","remoteOption":"option_1601451910109","remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_1601451910109","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"disabled":false},"name":"单选框组","key":"1601451910109","model":"radio","rules":[]},{"type":"checkbox","icon":"icon-check-box","options":{"inline":false,"defaultValue":[],"showLabel":false,"options":[{"value":"Option 1"},{"value":"Option 2"},{"value":"Option 3"}],"required":false,"requiredMessage":"","width":"","remote":false,"remoteType":"option","remoteOption":"option_1601451915009","remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_1601451915009","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"disabled":false},"name":"多选框组","key":"1601451915009","model":"checkbox","rules":[]},{"type":"time","icon":"icon-time","options":{"defaultValue":"","readonly":false,"disabled":false,"editable":true,"clearable":true,"placeholder":"","startPlaceholder":"","endPlaceholder":"","isRange":false,"arrowControl":true,"format":"HH:mm:ss","required":false,"requiredMessage":"","width":"","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"remoteFunc":"func_1601451920287","remoteOption":"option_1601451920287"},"name":"时间选择器","key":"1601451920287","model":"time","rules":[]},{"type":"date","icon":"icon-date","options":{"defaultValue":"","readonly":false,"disabled":false,"editable":true,"clearable":true,"placeholder":"","startPlaceholder":"","endPlaceholder":"","type":"date","format":"yyyy-MM-dd","timestamp":false,"required":false,"requiredMessage":"","width":"","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"remoteFunc":"func_1601451923962","remoteOption":"option_1601451923962"},"name":"日期选择器","key":"1601451923962","model":"date","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small","customClass":"","ui":"antd","layout":"horizontal","labelCol":3,"width":"100%","hideLabel":false,"hideErrorMessage":false}},
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
    },

    handleSetdata () {
      this.$refs.generateForm.setData({
        time: '11:22:44',
        date: '2020-09-30'
      })
    }
  }
}
</script>