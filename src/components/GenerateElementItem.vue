<template>
  <span>
    <template v-if="widget.type == 'blank'">
      <div :style="{width: isTable ? '100%' : widget.options.width}">
        <slot :name="widget.model" :model="dataModels"></slot>
      </div>
      
    </template>

    <template v-if="widget.type == 'component'">  
      <div :style="{width: isTable ? '100%' : widget.options.width}">
        <component :is="`component-${widget.key}-${key}`" :key="key" v-model="dataModel" :ref="'fm-'+widget.model"></component>
      </div>
    </template>

    <template v-if="widget.type == 'custom'">  
      <div :style="{width: isTable ? '100%' : widget.options.width}">
        <component 
          :is="widget.el" 
          v-model="dataModel"
          :width="widget.options.width"
          :height="widget.options.height"
          :placeholder="widget.options.placeholder"
          :readonly="widget.options.readonly"
          :disabled="!edit || widget.options.disabled"
          :editable="widget.options.editable"
          :clearable="widget.options.clearable"
          :ref="'fm-'+widget.model"
        ></component>
      </div>
    </template>

    <template v-if="widget.type == 'input'" >
      <el-input 
        v-if="widget.options.dataTypeCheck && (widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float')"
        type="number"
        v-model.number="dataModel"
        :disabled="!edit || widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :show-password="widget.options.showPassword"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :ref="'fm-'+widget.model"
      ></el-input>
      <el-input 
        v-else
        :type="widget.options.dataTypeCheck ? widget.options.dataType : 'text'"
        v-model="dataModel"
        :disabled="!edit || widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :show-password="widget.options.showPassword"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :ref="'fm-'+widget.model"
      ></el-input>
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-input type="textarea" :rows="5"
        v-model="dataModel"
        :disabled="!edit || widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :ref="'fm-'+widget.model"
      ></el-input>
    </template>

    <template v-if="widget.type == 'number'">
      <el-input-number 
        v-model="dataModel" 
        :style="{width: isTable ? '100%' : widget.options.width}"
        :step="widget.options.step"
        controls-position="right"
        :disabled="!edit || widget.options.disabled"
        :min="widget.options.min"
        :max="widget.options.max"
        :ref="'fm-'+widget.model"
      ></el-input-number>
    </template>

    <template v-if="widget.type == 'radio'">
      <el-radio-group v-model="dataModel"
         v-if="widget.options.remote === 2"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :disabled="!edit || widget.options.disabled"
	:ref="'fm-'+widget.model"
      >
        <el-radio
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in   remoteOptions " :key="index"
        >
          {{item.label}}
        </el-radio>
      </el-radio-group>

      <el-radio-group v-model="dataModel"
         v-else-if="widget.options.remote === 3"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :disabled="!edit || widget.options.disabled"
	:ref="'fm-'+widget.model"
      >
        <el-radio
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in  $dictUtils.getDictList(widget.options.dictType)" :key="index"
        >
          {{item.label}}
    
        </el-radio>
      </el-radio-group>

       <el-radio-group v-model="dataModel"
        v-else
        :style="{width: isTable ? '100%' : widget.options.width}"
        :disabled="!edit || widget.options.disabled"
	:ref="'fm-'+widget.model"
      >
        <el-radio
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in   widget.options.options" :key="index"
        >
          {{widget.options.showLabel ? item.label : item.value}}
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group v-model="dataModel"
        v-if="widget.options.remote === 2"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :disabled="!edit || widget.options.disabled"
	:ref="'fm-'+widget.model"
      >
        <el-checkbox
          
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in remoteOptions" :key="index"
        >
          {{item.label}}
        </el-checkbox>
      </el-checkbox-group>

      
      <el-checkbox-group v-model="dataModel"
        v-else-if="widget.options.remote === 3"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :disabled="!edit || widget.options.disabled"
	:ref="'fm-'+widget.model"
      >
        <el-checkbox
          
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in $dictUtils.getDictList(widget.options.dictType)" :key="index"
        >
          {{item.label}}
        </el-checkbox>
      </el-checkbox-group>


      <el-checkbox-group v-model="dataModel"
        v-else
        :style="{width: isTable ? '100%' : widget.options.width}"
        :disabled="!edit || widget.options.disabled"
	:ref="'fm-'+widget.model"
      >
        <el-checkbox
          
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in widget.options.options" :key="index"
        >
          {{widget.options.showLabel ? item.label : item.value}}
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="widget.type == 'time'">
      <el-time-picker 
        v-model="dataModel"
        :is-range="widget.options.isRange"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="!edit || widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :arrowControl="widget.options.arrowControl"
        :value-format="widget.options.format"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :ref="'fm-'+widget.model"
      >
      </el-time-picker>
    </template>

    <template v-if="widget.type=='date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="!edit || widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
        :format="widget.options.format"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :ref="'fm-'+widget.model"
      >
      </el-date-picker>
    </template>

    <template v-if="widget.type =='rate'">
      <el-rate v-model="dataModel"
        :max="widget.options.max"
        :disabled="!edit || widget.options.disabled"
        :allow-half="widget.options.allowHalf"
        :show-score="widget.options.showScore"
        :ref="'fm-'+widget.model"
      ></el-rate>
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker 
        v-model="dataModel"
        :disabled="!edit || widget.options.disabled"
        :show-alpha="widget.options.showAlpha"
        :ref="'fm-'+widget.model"
      ></el-color-picker>
    </template>

    <template v-if="widget.type == 'select'">
      <el-select
       v-if="widget.options.remote === 2"
        v-model="dataModel"
        :disabled="!edit || widget.options.disabled"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :filterable="widget.options.filterable"
	:ref="'fm-'+widget.model"
      >
        <el-option v-for="item in  remoteOptions " :key="item.value" :value="item.value" :label="widget.options.showLabel || item.label"></el-option>
      </el-select>

      <el-select
        v-else-if="widget.options.remote === 3"
        v-model="dataModel"
        :disabled="!edit || widget.options.disabled"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :filterable="widget.options.filterable"
	:ref="'fm-'+widget.model"
      >
        <el-option
          v-for="item in $dictUtils.getDictList(widget.options.dictType)"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select
        v-else
        v-model="dataModel"
        :disabled="!edit || widget.options.disabled"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :filterable="widget.options.filterable"
	:ref="'fm-'+widget.model"
      >
        <el-option v-for="item in widget.options.options" :key="item.value" :value="item.value" :label="widget.options.showLabel || item.value"></el-option>
      </el-select>
    </template>

    <template v-if="widget.type=='switch'">
      <el-switch
        v-model="dataModel"
        :disabled="!edit || widget.options.disabled"
        :ref="'fm-'+widget.model"
      >
      </el-switch>
    </template>

    <template v-if="widget.type=='slider'">
      <el-slider 
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="!edit || widget.options.disabled"
        :step="widget.options.step"
        :show-input="widget.options.showInput"
        :range="widget.options.range"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :ref="'fm-'+widget.model"
      ></el-slider>
    </template>

    <template v-if="widget.type=='imgupload'">
      <fm-upload
        v-model="dataModel"
        :disabled="!edit || widget.options.disabled"
        :readonly="widget.options.readonly"
        :style="{'width': isTable ? '100%' : widget.options.width}"
        :width="widget.options.size.width"
        :height="widget.options.size.height"
        :token="widget.options.token"
        :domain="widget.options.domain"
        :multiple="widget.options.multiple"
        :limit="widget.options.limit"
        :is-qiniu="widget.options.isQiniu"
        :is-delete="widget.options.isDelete"
        :min="widget.options.min"
        :is-edit="widget.options.isEdit"
        :action="widget.options.action"
        :headers="widget.options.headers || []"
        :ref="'fm-'+widget.model"
      >
      </fm-upload>
    </template>

    <template v-if="widget.type == 'editor'">
      <fm-editor
        v-model="dataModel"
        :sty="{width: isTable ? '100%' : widget.options.width, cursor: (!edit || widget.options.disabled) ? 'no-drop' : '', backgroundColor: (!edit || widget.options.disabled) ? '#F5F7FA' : ''}"
        :toolbar="widget.options.customToolbar"
        :disabled="!edit || widget.options.disabled"
        :ref="'fm-'+widget.model"
      >
      </fm-editor>
    </template>

    <template v-if="widget.type == 'cascader'">
      <el-cascader
        v-model="dataModel"
        :disabled="!edit || widget.options.disabled"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: isTable ? '100%' : widget.options.width}"
        :options="widget.options.remote ? remoteOptions : widget.options.options"
        @change="onCascaderChange"
        :ref="'fm-'+widget.model"
      >

      </el-cascader>
    </template>

         <template v-if="widget.type == 'selectTree'">
            <SelectTree 
              :props="{
                  value: 'id',             // ID字段名
                  label: 'name',         // 显示名称
                  children: 'children'    // 子级字段名
                }"
              :disabled="!edit || widget.options.disabled"
              :placeholder="widget.options.placeholder"
              :style="{width: isTable ? '100%' : widget.options.width}"
              :url="widget.options.dataUrl"
              v-model="dataModel"
              :showCheckbox="widget.options.checkbox"
              :isOnlySelectLeaf="widget.options.isOnlySelectLeaf"
              :clearable="true" 
              :accordion="true"
              @getValue="(value) => {dataModel= value}"/>
      </template>

    <template v-if="widget.type == 'text'">
      <span :ref="'fm-'+widget.model">{{dataModel}}</span>
    </template>

    <template v-if="widget.type == 'html'">
      <span v-html="dataModel" :ref="'fm-'+widget.model"></span>
    </template>

    <template v-if="widget.type == 'table'">
      <fm-form-table
        :value="dataModel"
        :columns="widget.tableColumns"
        :models="dataModels"
        :remote="remote"
        :blanks="blanks"
        :disableddata="!edit || widget.options.disabled"
        :rules="rules"
        :name="widget.model"
        :remote-option="remoteOption"
        :ref="'fm-'+widget.model"
        :preview="preview"
        :platform="platform"
      >
        <template v-slot:[blank.name]="scope" v-for="blank in blanks">
          <slot :name="blank.name" :model="scope.model"></slot>
        </template>
      </fm-form-table>
    </template>

    <template v-if="widget.type == 'fileupload'">
 <!--jeeplus--定制-->
      <fm-file-upload
        v-model="dataModel"
        :disabled="!edit || widget.options.disabled"
        :style="{'width': isTable ? '100%' : widget.options.width}"
        :token="widget.options.token"
        :domain="widget.options.domain"
        :multiple="widget.options.multiple"
        :limit="widget.options.limit"
        :is-qiniu="widget.options.isQiniu"
        :min="widget.options.min"
        :action="widget.options.action"
        :tip="widget.options.tip"
        :headers="widget.options.headers || []"
        :ref="'fm-'+widget.model"
      >
      </fm-file-upload>

    </template>
    <!--jeeplus定制修改-->
     <template v-if="widget.type == 'user'">
       <user-select 
      :limit="widget.options.limit"
       :value="dataModel" 
       v-model="dataModel"
        :disabled="!edit || widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: isTable ? '100%' : widget.options.width}"
         @getValue='(value, label) => {dataModel= value}'></user-select>
    </template>
     <template v-if="widget.type == 'office'">
            <SelectTree 
              :props="{
                  value: 'id',             // ID字段名
                  label: 'name',         // 显示名称
                  children: 'children'    // 子级字段名
                }"
              :disabled="!edit || widget.options.disabled"
              :placeholder="widget.options.placeholder"
              :style="{width: isTable ? '100%' : widget.options.width}"
              :url="`/sys/office/treeData`"
              v-model="dataModel"
              :clearable="true" 
              :accordion="true"
              @getValue="(value) => {dataModel= value}"/>
      </template>
       <template v-if="widget.type == 'area'">
            <SelectTree 
             :props="{
                value: 'id',             // ID字段名
                label: 'name',         // 显示名称
                children: 'children'    // 子级字段名
              }"
            :disabled="!edit || widget.options.disabled"
            :placeholder="widget.options.placeholder"
            :style="{width: isTable ? '100%' : widget.options.width}"
            :url="`/sys/area/treeData`"
            v-model="dataModel"
            :clearable="true" 
            :accordion="true"
            @getValue="(value) => {dataModel= value}"/>
      </template>

      <template v-if="widget.type == 'dict'">
        <el-select
                v-model="dataModel"
                :disabled="!edit || widget.options.disabled"
                :multiple="widget.options.multiple"
                :clearable="widget.options.clearable"
                :placeholder="widget.options.placeholder"
                :style="{width: isTable ? '100%' : widget.options.width}"
                :filterable="widget.options.filterable"
              >
                <el-option
                  v-for="item in this.$dictUtils.getDictList(widget.options.dictType)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
                <!-- <el-option v-for="item in (widget.options.remote ? remoteOptions : widget.options.options)" :key="item.value" :value="item.value" :label="widget.options.showLabel || widget.options.remote?item.label:item.value"></el-option> -->
        </el-select>
      </template>
  </span>
</template>

<script>
import FmUpload from './Upload'
import FmFormTable from './FormTable'
import FmFileUpload from './Upload/file'
import FmEditor from './Editor'
import Vue from 'vue'
import { EventBus } from '../util/event-bus'
import UserSelect from '@/components/userSelect'
import SelectTree from '@/components/treeSelect/treeSelect.vue'
export default {
  name: 'generate-element-item',
  components: {
    FmUpload,
    FmFormTable,
    UserSelect,
    SelectTree,
    FmFileUpload,
    FmEditor
  },
  props: ['widget', 'value', 'models', 'remote', 'isTable', 'blanks', 'disabled', 'edit', 'remoteOption', 'rules', 'platform', 'preview'],
  data () {
    return {
      dataModel: this.value,
      dataModels: this.models,
      remoteOptions: [],
      key: new Date().getTime(),
      modelName: this.widget.model
    }
  },
  created () {
    this.remoteOptions = []

    if (this.widget.options.remote 
      && (Object.keys(this.widget.options).indexOf('remoteType') >= 0 ? this.widget.options.remoteType == 'func' : true)
      && this.remote[this.widget.options.remoteFunc]) {

      this.remote[this.widget.options.remoteFunc]((data) => {
        this.loadOptions(data)
      })
    }

    if (this.widget.options.remote 
      && this.widget.options.remoteType == 'option' 
      && this.remoteOption[this.widget.options.remoteOption]) {
      
      this.loadOptions(this.remoteOption[this.widget.options.remoteOption])
    }

    if ((this.widget.type === 'imgupload' || this.widget.type === 'fileupload') && this.widget.options.isQiniu) {
      
      !this.widget.options.token && this.remote[this.widget.options.tokenFunc]((data) => {
        this.widget.options.token = data
      })
    }

    if (this.widget.type == 'component') {

      Vue.component(`component-${this.widget.key}-${this.key}`, {
        template: `${this.widget.options.template}`,
        props: ['value'],
        data: () => ({
          dataModel: this.value
        }),
        watch: {
          dataModel (val) {

            if (this.ui == 'antd') {
              EventBus.$emit('on-field-change', this.$attrs.id, val)
            } else {
              this.$emit('input', val)
            }
          },
          value (val) {
            this.dataModel = val
          }
        }
      })
    }
  },
  methods: {
    loadOptions (data) {
      this.remoteOptions = data.map(item => {
        
        if (this.widget.options.props.children && this.widget.options.props.children.length && Object.keys(item).includes(this.widget.options.props.children)) {
          return {
            value: item[this.widget.options.props.value],
            label: item[this.widget.options.props.label],
            children: this.processRemoteProps(item[this.widget.options.props.children], this.widget.options.props)
          }
        } else {
          return {
            value: item[this.widget.options.props.value],
            label: item[this.widget.options.props.label]
          }
        }
        
      })
    },
    processRemoteProps (children, props) {
      if (children && children.length) {
        return children.map(item => {
          if (this.processRemoteProps(item[props.children], props).length) {
            return {
              value: item[props.value],
              label: item[props.label],
              children: this.processRemoteProps(item[props.children], props)
            }
          } else{
            return {
              value: item[props.value],
              label: item[props.label],
            }
          }
        })
      } else {
        return []
      }
    },
    onCascaderChange (value) {
      console.log(value)
      this.$nextTick(() => {
        this.$parent && this.$parent.$parent && this.$parent.$parent.$refs.generateFormItem && this.$parent.$parent.$refs.generateFormItem.clearValidate()
      })
    }
  },
  watch: {
    value (val) {
      this.dataModel = val
    },

    dataModel (val) {
      this.$emit('input', val)
    },
    'remoteOption': {
      deep: 'true',
      handler: function (val) {
        if (Object.keys(this.remoteOption).indexOf(this.widget.options.remoteOption) >= 0
          && this.widget.options.remote 
          && this.widget.options.remoteType == 'option' 
        ) {
          this.loadOptions(this.remoteOption[this.widget.options.remoteOption])
        }
      }
    }
  }
}
</script>
