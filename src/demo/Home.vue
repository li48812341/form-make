<template>
  <fm-making-form ref="makingForm" clearable upload preview generate-code generate-json
    :custom-fields="customFields"
    :global-config="globalConfig"
  >
  </fm-making-form>
</template>

<script>
export default {
  data() {
    return {
      customFields: [
        {
          name: '自定义组件',
          el: 'custom-width-height',
          options: {
            defaultValue: {},
            customClass: '',
            labelWidth: 100,
            isLabelWidth: false,
            hidden: false,
            dataBind: true,
            required: false,
            pattern: '',
          }
        },{
          name: '图表示例',
          el: 'custom-chart',
          options: {
            defaultValue: [
              { year: '1951 年', sales: 38 },
              { year: '1952 年', sales: 52 },
              { year: '1956 年', sales: 61 },
              { year: '1957 年', sales: 145 },
              { year: '1958 年', sales: 48 },
              { year: '1959 年', sales: 38 },
              { year: '1960 年', sales: 38 },
              { year: '1962 年', sales: 38 },
            ],
            customClass: '',
            labelWidth: 100,
            isLabelWidth: false,
            hidden: false,
            dataBind: true,
            required: false,
            pattern: '',
          }
        },
        {
          name: 'vant时间选择',
          el: 'custom-vant-field',
          options: {
            defaultValue: '',
            customClass: '',
            labelWidth: 100,
            isLabelWidth: false,
            hidden: false,
            dataBind: true,
            required: false,
            pattern: '',
          }
        }
      ],
      globalConfig: {
        // styleSheets: '.a .el-form-item__label{color: red;}'
      }
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
