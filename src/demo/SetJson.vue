<template>
  <fm-making-form 
    ref="makingform" 
    style="height: 500px;" 
    preview 
    generate-code 
    generate-json
  >
    <template slot="action">
    </template>
  </fm-making-form>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    setTimeout(() => {
      this.$refs.makingform.setJSON({"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"requiredMessage":"","dataType":"","dataTypeCheck":false,"dataTypeMessage":"","pattern":"","patternCheck":false,"patternMessage":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1598495328900","remoteOption":"option_1598495328900"},"name":"单行文本","key":"1598495328900","model":"input_1598495328900","rules":[]},{"type":"textarea","icon":"icon-diy-com-textarea","options":{"width":"100%","defaultValue":"","required":false,"requiredMessage":"","disabled":false,"pattern":"","patternMessage":"","placeholder":"","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"remoteFunc":"func_1598495329774","remoteOption":"option_1598495329774"},"name":"多行文本","key":"1598495329774","model":"textarea_1598495329774","rules":[]},{"type":"radio","icon":"icon-radio-active","options":{"inline":false,"defaultValue":"","showLabel":false,"options":[{"value":"Option 1","label":"Option 1"},{"value":"Option 2","label":"Option 2"},{"value":"Option 3","label":"Option 3"}],"required":false,"requiredMessage":"","width":"","remote":false,"remoteType":"option","remoteOption":"option_1598495330234","remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_1598495330234","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"disabled":false},"name":"单选框组","key":"1598495330234","model":"radio_1598495330234","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small","customClass":"","ui":"element","layout":"horizontal","labelCol":3,"width":"100%","hideLabel":false,"hideErrorMessage":false}})
    }, 200)

    // this.$nextTick(() => {
    //   this.$refs.makingform.setJSON({"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"requiredMessage":"","dataType":"","dataTypeCheck":false,"dataTypeMessage":"","pattern":"","patternCheck":false,"patternMessage":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1598495328900","remoteOption":"option_1598495328900"},"name":"单行文本","key":"1598495328900","model":"input_1598495328900","rules":[]},{"type":"textarea","icon":"icon-diy-com-textarea","options":{"width":"100%","defaultValue":"","required":false,"requiredMessage":"","disabled":false,"pattern":"","patternMessage":"","placeholder":"","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"remoteFunc":"func_1598495329774","remoteOption":"option_1598495329774"},"name":"多行文本","key":"1598495329774","model":"textarea_1598495329774","rules":[]},{"type":"radio","icon":"icon-radio-active","options":{"inline":false,"defaultValue":"","showLabel":false,"options":[{"value":"Option 1","label":"Option 1"},{"value":"Option 2","label":"Option 2"},{"value":"Option 3","label":"Option 3"}],"required":false,"requiredMessage":"","width":"","remote":false,"remoteType":"option","remoteOption":"option_1598495330234","remoteOptions":[],"props":{"value":"value","label":"label"},"remoteFunc":"func_1598495330234","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"disabled":false},"name":"单选框组","key":"1598495330234","model":"radio_1598495330234","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small","customClass":"","ui":"element","layout":"horizontal","labelCol":3,"width":"100%","hideLabel":false,"hideErrorMessage":false}})
    // })
  },
  methods: {
  }
}
</script>