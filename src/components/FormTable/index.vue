<template>
  <div class="form-table" :class="{'is-disabled': disableddata}">
    <el-table
      :data="tableData"
      border
      size="small"
      :class="{'form-table-pc': !preview}"
      v-show="(preview && platform != 'mobile') || !preview"
    >
      <el-table-column
        label="序号"
        fixed
        width="50">
        <template slot-scope="scope">
          <div class="scope-index">
            <span>{{scope.$index + 1}}</span>
          </div>
          <div class="scope-action">
            <el-button :disabled="disableddata" @click="handleRemove(scope.$index)" type="danger" icon="el-icon-minus" size="mini" circle></el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="columns.length==0"></el-table-column>
      <template v-else>
        <el-table-column 
          v-for="column in columns" 
          v-if="displayFields[column.model]"
          :key="column.key" 
          :label="column.name"
          :width="column.options.width"
          :label-class-name="column.options.required ? 'required' : ''"
        >
          <template slot-scope="scope">
            <el-form-item :prop="`${name}.${scope.$index}.${column.model}`" :rules="rules[`${name}.${column.model}`]">
              <GenerateElementItem :edit="!disableddata" :blanks="blanks" :is-table="true" :widget="column" v-model="scope.row[column.model]" :models="tableData[scope.$index]" :remote="remote" :remote-option="remoteOption">
                <template v-slot:[blank.name]="blankScope" v-for="blank in blanks">
                  <slot :name="blank.name" :model="scope.row"></slot>
                </template>
              </GenerateElementItem>
            </el-form-item>

          </template>
          
        </el-table-column>
      </template>
    </el-table>

    <div class="form-table-mobile"
      v-show="(preview && platform == 'mobile') || !preview"
      :style="{'display': preview ? 'block' : ''}"
    >
      <div class="form-table-mobile-item"
        v-for="(t, index) in tableData"
        :key="index"
      >
        <div class="form-table-mobile-item__top">
          <span># {{index + 1}}</span>
          <el-button :disabled="disableddata" @click="handleRemove(index)" type="danger" icon="el-icon-minus" size="mini" circle></el-button>
        </div>
        <div class="form-table-mobile-item__content">
          <el-form-item 
            v-for="column in columns" 
            v-if="displayFields[column.model]"
            :key="column.key" 
            :label="column.options.hideLabel ? '' : column.name"
            :label-width="column.options.hideLabel ? '0px' : (column.options.isLabelWidth ? column.options.labelWidth + 'px' : '')"
            :prop="`${name}.${index}.${column.model}`" :rules="rules[`${name}.${column.model}`]">
            <GenerateElementItem :edit="!disableddata" :blanks="blanks" :is-table="true" :widget="column" v-model="tableData[index][column.model]" :models="tableData[index]" :remote="remote" :remote-option="remoteOption">
              <template v-slot:[blank.name]="blankScope" v-for="blank in blanks">
                <slot :name="blank.name" :model="tableData[index]"></slot>
              </template>
            </GenerateElementItem>
          </el-form-item>
        </div>
      </div>
    </div>

    <el-button  icon="el-icon-plus" type="text" @click="handleAddRow" v-if="!disableddata">{{$t('fm.actions.add')}}</el-button>
  </div>
</template>

<script>

export default {
  components: {
    GenerateElementItem: () => import('../GenerateElementItem.vue')
  },
  props: ['columns', 'value', 'models', 'remote', 'blanks', 'disableddata', 'rules', 'name', 'remoteOption', 'preview', 'platform'],
  data () {
    return {
      tableData: this.value,
      displayFields: {}
    }
  },
  created () {
    for (let i = 0; i < this.columns.length; i++) {
      this.displayFields[this.columns[i].model] = !this.columns[i].options.hidden
    }
  },
  methods: {
    handleAddRow () {
      let item = {}
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columns[i].type === 'blank') {
          item[this.columns[i].model] = this.columns[i].options.defaultType == 'String' ? '' : (this.columns[i].options.defaultType == 'Object' ? {} : [])
        } else {
          item[this.columns[i].model] = this.columns[i].options.defaultValue
        }
      }

      this.tableData.push(item)
    },

    handleRemove (index) {
      this.tableData.splice(index, 1)
    },
    hide (fields) {
      Object.keys(this.displayFields).forEach(key => {
        
        if (fields.indexOf(key) >= 0) {
          this.$set(this.displayFields, key, false)
        }
      })
      
      this.displayFields = {...this.displayFields}
    },
    display (fields) {
      Object.keys(this.displayFields).forEach(key => {
        if (fields.indexOf(key) >= 0) {
          this.$set(this.displayFields, key, true)
        }
      })
      this.displayFields = {...this.displayFields}
    },
    disabled (fields, disabled) {

      for (let i = 0; i < this.columns.length; i++) {
        if (fields.indexOf(this.columns[i].model) >= 0) {
            
          this.$set(this.columns[i].options, 'disabled', disabled)
        }
      } 
    },
  },
  watch: {
    value (val) {
      this.tableData = val
    }
  }
}
</script>

<style lang="scss">
.form-table{
  position: relative;

  .el-form-item{
    margin-top: 2px;
  }

  .el-table th.required>div::before{
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
    background: transparent;
    vertical-align: top;
  }

  .el-table td{
    padding-bottom: 0;
  }

  .el-table__header-wrapper{
    background: #f5f7fa;

    div,th{
      background: #f5f7fa;
    }
  }

  .el-table__fixed-header-wrapper{
    div,th{
      background: #f5f7fa;
    }
  }

  &.is-disabled{
    background-color: #F5F7FA;
    table::after{
      display: block;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      cursor: no-drop;
    }
  }

  .el-table__empty-block{
    display: none;
  }

  .scope-action{
    display: none;
    margin-bottom: 18px;
  }

  .scope-index{
    display: block;
    margin-bottom: 18px;
  }

  .hover-row{
    .scope-action{
      display: block;
      .el-button{
        padding: 3px;
      }
    }

    .scope-index{
      display: none;
    }
  }

  .form-table-pc{
    display: block;
  }

  .form-table-mobile{
    display: none;

    .form-table-mobile-item{
      border: 1px solid #EBEEF5;
      // background:  #f5f7fa;
      margin-bottom: 10px;

      .form-table-mobile-item__top{
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        background:  #f5f7fa;
        border-bottom: 1px solid #EBEEF5;
        font-weight: 500;

        button{
          float: right;
          margin-top: 4px;
        }
      }

      .form-table-mobile-item__content{
        padding: 8px;
        // background: #fff;
      }

    }
  }
}

@media screen and (max-width: 768px) {
  .form-table{
    .form-table-pc{
      display: none;
    }

    .form-table-mobile{
      display: block;
    }
  }
}
</style>
