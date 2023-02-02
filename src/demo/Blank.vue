<template>
  <div>
    <fm-generate-form 
      :data="jsonData" 
      :remote="remoteFuncs" 
      :value="editData" 
      :remote-option="dynamicData"
      ref="generateForm"
    >
        <template slot="blank_1597215085870" slot-scope="scope">
          <!-- 自定义区域 -->
          <!-- use v-model="scope.model.blank_1597215085870" to bind data -->
          <el-input v-model="scope.model.blank_1597215085870"></el-input>
        </template>
      
        <template slot="blank_1597215098384" slot-scope="scope">
          <!-- 自定义区域 -->
          <!-- use v-model="scope.model.blank_1597215098384" to bind data -->

          <!-- <custom-component v-model="scope.model.blank_1597215098384"></custom-component> -->
          <el-input v-model="scope.model.blank_1597215098384.w"></el-input>
          <el-input v-model="scope.model.blank_1597215098384.h"></el-input>
        </template>

        <template slot="blank_1597216649510" slot-scope="scope">
          <el-input v-model="scope.model.blank_1597216649510"></el-input>
        </template>
      
    </fm-generate-form>
    <el-button type="primary" @click="handleSubmit">Submit</el-button>
  </div>
</template>

<script>
import CustomComponent from './CustomComponent.vue'

export default {
  components: {
    CustomComponent
  },
  data () {
    return {
      jsonData: {"list":[{"type":"report","icon":"icon-table1","options":{"customClass":"","hidden":false,"borderWidth":1,"borderColor":"#999","remoteFunc":"func_1597215078484","remoteOption":"option_1597215078484"},"rows":[{"columns":[{"type":"td","options":{"customClass":"","colspan":1,"rowspan":1,"align":"left","valign":"top","width":"","height":""},"list":[{"type":"table","icon":"icon-table","options":{"defaultValue":[],"customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"disabled":false,"required":false,"remoteFunc":"func_1597215081375","remoteOption":"option_1597215081375"},"tableColumns":[{"type":"blank","icon":"icon-zidingyishuju","options":{"defaultType":"String","customClass":"","width":"200px","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"remoteFunc":"func_1597215085870","remoteOption":"option_1597215085870","tableColumn":true},"name":"自定义区域","novalid":{},"key":"1597215085870","model":"blank_1597215085870","rules":[]}],"name":"子表单","key":"1597215083082","model":"table_1597215081375","rules":[]}],"key":"hm2qo9fz"}]}],"name":"表格布局","key":"1597215078484","model":"report_1597215078484","rules":[]},{"type":"report","icon":"icon-table1","options":{"customClass":"","hidden":false,"borderWidth":1,"borderColor":"#999","remoteFunc":"func_1597215087823","remoteOption":"option_1597215087823"},"rows":[{"columns":[{"type":"td","options":{"customClass":"","colspan":1,"rowspan":1,"align":"left","valign":"top","width":"","height":""},"list":[{"type":"report","icon":"icon-table1","options":{"customClass":"","hidden":false,"borderWidth":1,"borderColor":"#999","remoteFunc":"func_1597215089940","remoteOption":"option_1597215089940"},"rows":[{"columns":[{"type":"td","options":{"customClass":"","colspan":1,"rowspan":1,"align":"left","valign":"top","width":"","height":""},"list":[{"type":"blank","icon":"icon-zidingyishuju","options":{"defaultType":"Object","customClass":"","width":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"remoteFunc":"func_1597215098384","remoteOption":"option_1597215098384"},"name":"自定义区域","key":"1597216910152","model":"blank_1597215098384","rules":[]}],"key":"xsmeoujp"}]}],"name":"表格布局","key":"1597215089940","model":"report_1597215089940","rules":[]}],"key":"4phleal7"},{"type":"td","list":[],"options":{"customClass":"","colspan":1,"rowspan":1,"align":"left","valign":"top","width":"","height":""},"key":"madi8i5i"}]}],"name":"表格布局","key":"1597215087823","model":"report_1597215087823","rules":[]},{"type":"blank","icon":"icon-zidingyishuju","options":{"defaultType":"String","customClass":"","width":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"remoteFunc":"func_1597216649510","remoteOption":"option_1597216649510"},"name":"自定义区域","key":"1597216649510","model":"blank_1597216649510","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small","customClass":"","ui":"element","layout":"horizontal","labelCol":3,"width":"100%","hideLabel":false,"hideErrorMessage":false}},
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