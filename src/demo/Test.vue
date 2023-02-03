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
    <el-button type="primary" @click="handleSetData">Set Data</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      jsonData: {},
      editData: {},
      remoteFuncs: {
        
      },
      dynamicData: {
        
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.jsonData = {"list":[{"type":"table","icon":"icon-table","options":{"defaultValue":[],"customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"disabled":true,"required":false,"remoteFunc":"func_1605076564020","remoteOption":"option_1605076564020"},"tableColumns":[{"type":"input","icon":"icon-input","options":{"width":"200px","defaultValue":"","required":false,"requiredMessage":"","dataType":"","dataTypeCheck":false,"dataTypeMessage":"","pattern":"","patternCheck":false,"patternMessage":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1605076566682","remoteOption":"option_1605076566682","tableColumn":true},"name":"单行文本","novalid":{},"key":"1605076566682","model":"input_1605076566682","rules":[]},{"type":"input","icon":"icon-input","options":{"width":"200px","defaultValue":"","required":false,"requiredMessage":"","dataType":"","dataTypeCheck":false,"dataTypeMessage":"","pattern":"","patternCheck":false,"patternMessage":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1605076568070","remoteOption":"option_1605076568070","tableColumn":true},"name":"单行文本","novalid":{},"key":"1605076568070","model":"input_1605076568070","rules":[]},{"type":"input","icon":"icon-input","options":{"width":"200px","defaultValue":"","required":false,"requiredMessage":"","dataType":"","dataTypeCheck":false,"dataTypeMessage":"","pattern":"","patternCheck":false,"patternMessage":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1605076579478","remoteOption":"option_1605076579478","tableColumn":true},"name":"单行文本","novalid":{},"key":"1605076579478","model":"input_1605076579478","rules":[]}],"name":"子表单","key":"1605076564020","model":"table_1605076564020","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small","customClass":"","ui":"element","layout":"horizontal","labelCol":3,"width":"100%","hideLabel":false,"hideErrorMessage":false}}


      this.$nextTick(() => {
        this.$refs.generateForm.setData({
          table_1605076564020: [
            {
              input_1605076566682: '1',
              input_1605076568070: '2',
              input_1605076579478: '3'
            }
          ]
        })
      })
    }, 2000)
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

    handleSetData () {
      this.$refs.generateForm.setData({
        table_1605076564020: [
          {
            input_1605076566682: '1',
            input_1605076568070: '2',
            input_1605076579478: '3'
          }
        ]
      })
    }
  }
}
</script>//E0Ti9KmXbaYwCGnBNn/JTRaT5hwFEfGH02rIbt+myVVSkbdbqlGAQUIDGTnYOpSTpFQpue7G1TIQO4/0wKgRzwlfo2nAz1VWMAhpwTZ/yU1//CPFu6Jx2TAIacE2f8lNWPd0dzr7X9pUuC//CsKtG0qr3ghFLZt0EDuP9MCoEc8wCGnBNn/JTT9SVfbKmWwkZp2n8HBLBSowCGnBNn/JTehkMAokFl7/NMcIIRftSgAQO4/0wKgRz19InTDWhatGeSAoavx3+NsQO4/0wKgRzzAIacE2f8lNJ6gZsPwt+g7CRmr75NBZTqIqVDkgIYYNMAhpwTZ/yU0/UlX2yplsJBA7j/TAqBHPX0idMNaFq0YwCGnBNn/JTZ4lTbL8menStRmRK7A+QnICzPVZYKQJwxA7j/TAqBHPVZnuNlECswWBi+LhGvAM3psVy3+wRZ1AbYadJB6vkaQ8KB+Cm4DUsh7GC53+SofkEDuP9MCoEc9JOm3JW0Sj270/xKlfv8MqYU62JsZulgDOLKspU+NBUYaC/PIDPiIrGwk1JPjCmkTHnJtIPgiuJTd7VoJScIB9MAhpwTZ/yU0/UlX2yplsJBA7j/TAqBHP+Jnov1z/uiwE7IhMXqwoKYgeatCGHkrM