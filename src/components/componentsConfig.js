export const basicComponents = [
  {
    type: 'input',
    icon: 'icon iconfont icon-input',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      requiredMessage: '',
      dataType: '',
      dataTypeCheck: false,
      dataTypeMessage: '',
      pattern: '',
      patternCheck: false,
      patternMessage: '',
      placeholder: '',
      customClass: '',
      disabled: false,
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      showPassword: false,
      isShow:true,
      isSort: true,
      isSearch: true
    }
  },
  {
    type: 'textarea',
    icon: 'icon iconfont icon-diy-com-textarea',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      requiredMessage: '',
      disabled: false,
      pattern: '',
      patternMessage: '',
      placeholder: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:true,
      isSort: true,
      isSearch: false
    }
  },
  {
    type: 'number',
    icon: 'icon iconfont icon-number',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      width: '',
      required: false,
      requiredMessage: '',
      defaultValue: 0,
      min: 0,
      max: 9,
      step: 1,
      disabled: false,
      controlsPosition: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:true,
      isSort: true,
      isSearch: false
    }
  },
  {
    type: 'radio',
    icon: 'icon iconfont icon-radio-active',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      inline: false,
      defaultValue: '',
      showLabel: false,
      options: [
        {
          value: 'Option 1',
          label: 'Option 1'
        },
        {
          value: 'Option 2',
          label: 'Option 2'
        },
        {
          value: 'Option 3',
          label: 'Option 3'
        }
      ],
      required: false,
      requiredMessage: '',
      width: '',
      remote: 1,
      remoteType: 'option',
      remoteOption: '',
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      disabled: false,
      isShow:true,
      isSort: true,
      isSearch: false
    }
  },
  {
    type: 'checkbox',
    icon: 'icon iconfont icon-check-box',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      inline: false,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: 'Option 1'
        },
        {
          value: 'Option 2'
        },
        {
          value: 'Option 3'
        }
      ],
      required: false,
      requiredMessage: '',
      width: '',
      remote: 1,
      remoteType: 'option',
      remoteOption: '',
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      disabled: false,
      isShow:true,
      isSort: true,
      isSearch: false
    }
  },
  {
    type: 'time',
    icon: 'icon iconfont icon-time',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      requiredMessage: '',
      width: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:true,
      isSort: false,
      isSearch: false
    }
  },
  {
    type: 'date',
    icon: 'icon iconfont icon-date',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      requiredMessage: '',
      width: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:true,
      isSort: false,
      isSearch: false
    }
  },
  {
    type: 'rate',
    icon: 'icon iconfont icon-pingfen1',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false,
      requiredMessage: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      showScore: false,
      isShow:true,
      isSort: true,
      isSearch: false
    }
  },
  {
    type: 'color',
    icon: 'icon iconfont icon-color',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false,
      requiredMessage: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:true,
      isSort: false,
      isSearch: false
    }
  },
  {
    type: 'select',
    icon: 'icon iconfont icon-select',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      requiredMessage: '',
      showLabel: false,
      width: '',
      options: [
        {
          value: 'Option 1'
        },
        {
          value: 'Option 2'
        },{
          value: 'Option 3'
        }
      ],
      remote: 1,
      remoteType: 'option',
      remoteOption: '',
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:true,
      isSort: false,
      isSearch: false
    }
  },
  {
    type: 'switch',
    icon: 'icon iconfont icon-switch',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: 'false',
      activeValue: 'true',
      inactiveValue: 'false',
      activeText: '',
      inactiveText: '',
      required: false,
      requiredMessage: '',
      disabled: false,
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:true,
      isSort: true,
      isSearch: false
    }
  },
  {
    type: 'slider',
    icon: 'icon iconfont icon-slider',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      requiredMessage: '',
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:true,
      isSort: false,
      isSearch: false
    }
  },
  {
    type: 'text',
    icon: 'icon iconfont icon-wenzishezhi-',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: 'This is a text',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:true,
      isSort: true,
      isSearch: false
    }
  },
  {
    type: 'html',
    icon: 'icon iconfont icon-html',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: '<b style="color: red;">\n\tThis is a HTML5\n</b>',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:true,
      isSort: false,
      isSearch: false
    }
  }
]

export const advanceComponents = [
  {
    type: 'blank',
    icon: 'icon iconfont icon-zidingyishuju',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultType: 'String',
      customClass: '',
      width: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:true,
      isSort: false,
      isSearch: false
    }
  },
    {
    type: 'component',
    icon: 'icon iconfont icon-component',
    options: {
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      template: '<p>自定义内容</p>',
      required: false,
      isShow:true,
      isSort: false,
      isSearch: false
    }
  },
  {
    type: 'fileupload',
    icon: 'icon iconfont icon-wenjianshangchuan',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: [],
      width: '',
      tokenFunc: '',
      token: '',
      domain: '',
      disabled: false,
      tip: '',
      action: '',
      customClass: '',
      disabled: false,
      required: false,
      limit: 9,
      multiple: false,
      isQiniu: false,
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      headers: [],
      isShow:true,
      isSort: false
    }
  },
  {
    type: 'imgupload',
    icon: 'icon iconfont icon-tupian',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: '',
      tokenFunc: 'funcGetToken',
      token: '',
      domain: '',
      disabled: false,
      readonly: false,
      required: false,
      limit: 8,
      multiple: false,
      isQiniu: false,
      isDelete: true,
      min: 0,
      isEdit: true,
      action: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      headers: [],
      isShow:true,
      isSort: false
    }
  },
  {
    type: 'editor',
    icon: 'icon iconfont icon-fuwenbenkuang',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: '',
      width: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      customToolbar: [
        [ 'bold', 'italic', 'underline', 'strike', 
          { 'color': [] }, 
          { 'background': [] }, 
          { 'align': [] },
          { 'list': 'ordered'}, 
          { 'list': 'bullet' },
          { 'indent': '-1'}, 
          { 'indent': '+1' }
        ], 
        [{ 'font': [] },{ 'header': [1, 2, 3, 4, 5, 6, false] }],               
        [{ 'script': 'sub'}, { 'script': 'super' }],  
        ['link', 'image','blockquote', 'code-block'],
        [{ 'direction': 'rtl' }], 
        ['clean'] 
      ],
      disabled: false,
      required: false,
      isShow:true,
      isSort: true,
      isSearch: false
    }
  },
  {
    type: 'cascader',
    icon: 'icon iconfont icon-jilianxuanze',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      disabled: false,
      required: false,
      clearable: false,
      options: [
        {
          value: 'Option 1',
          label: 'Option 1',
          children: [
            {value: 'Option 1 - children', label: 'Option 1 - children'}
          ]
        },
        {
          value: 'Option 2',
          label: 'Option 2',
          children: [
            {value: 'Option 2 - children', label: 'Option 2 - children'}
          ]
        },{
          value: 'Option 3',
          label: 'Option 3'
        }
      ],
      remote: false,
      remoteType: 'option',
      remoteOption: '',
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:true,
      isSort: false,
      isSearch: false
    }
  },
  {
    type: 'selectTree',
    icon: 'icon iconfont fa fa-tree',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: '',
      width: '',
      placeholder: '',
      disabled: false,
      required: false,
      clearable: false,
      remote: true,
      checkbox: false,
      isOnlySelectLeaf: false,
      dataUrl: '',
      remoteType: 'option',
      remoteOption: '',
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: '',
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:true,
      isSort: false,
      isSearch: false
    }
  },
  {
    type: 'table',
    icon: 'icon iconfont icon-table',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultValue: [],
      customClass: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      isShow:false,
      disabled: false,
      required: false
    },
    tableColumns: []
  } ,{
    type: 'user',
    icon: 'icon fa fa-user',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultType: 'String',
      customClass: '',
      defaultValue: '',
      width: '',
      limit: 1,
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      required: false,
      disabled: false,
      isShow:true,
      isSort: true,
      isSearch: false
    }
  },{
    type: 'office',
    icon: 'icon fa fa-bank',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultType: 'String',
      customClass: '',
      defaultValue: '',
      width: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      required: false,
      disabled: false,
      isShow:true,
      isSort: true,
      isSearch: false
    }
  }, {
    type: 'area',
    icon: 'icon fa fa-map',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultType: 'String',
      customClass: '',
      width: '',
      labelWidth: 100,
      isLabelWidth: false,
      hidden: false,
      dataBind: true,
      required: false,
      disabled: false,
      isShow:true,
      isSort: true,
      isSearch: false
    }
  }, {
    type: 'dict',
    icon: 'icon fa fa-font',
    dsId: '',
    tableName: '',
    primaryKey: '',
    foreignKey: '',
    options: {
      defaultType: 'String',
      customClass: '',
      width: '',
      labelWidth: 100,
      isLabelWidth: false,
      dictType: '',
      hidden: false,
      dataBind: true,
      required: false,
      disabled: false,
      isShow:true,
      isSort: true,
      isSearch: false
    }
  }
]

export const layoutComponents = [
  {
    type: 'grid',
    icon: 'icon iconfont icon-RectangleCopy',
    columns: [
      {
        type: 'col',
        options: {
          span: 24,
          offset: 0,
          push: 0,
          pull: 0,
          xs: 24,
          sm: 24,
          md: 24,
          lg: 24,
          xl: 24,
          customClass: ''
        },
        list: []
      },
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top',
      customClass: '',
      hidden: false,
      flex: true,
      responsive: true
    }
  },
  {
    type: 'report',
    icon: 'icon iconfont icon-table1',
    options: {
      customClass: '',
      hidden: false,
      borderWidth: 1,
      borderColor: '#999',
      width: '100%'
    },
    rows: [
      {
        columns: [
          {
            type: 'td',
            options: {
              customClass: '',
              colspan: 1,
              rowspan: 1,
              align: 'left',
              valign: 'top',
              width: '',
              height: ''
            },
            list: []
          }
        ]
      }
    ]
  },
  {
    type: 'tabs',
    icon: 'icon iconfont icon-tabs',
    tabs: [
      {
        label: 'Tab 1',
        name: 'tab_1',
        list: []
      }
    ],
    options: {
      type: '',
      tabPosition: 'top',
      customClass: '',
      hidden: false,
    }
  },
  {
    type: 'divider',
    icon: 'icon iconfont icon-fengexian',
    options: {
      hidden: false,
      contentPosition: 'left'
    }
  }
]
