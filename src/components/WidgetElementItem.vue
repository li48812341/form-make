<template>
  <span>
    <template v-if="element.type == 'input'">
      <el-input 
        v-model="element.options.defaultValue"
        :style="{width: isTable ? '100%' : element.options.width}"
        :placeholder="element.options.placeholder"
        :disabled="element.options.disabled"
        :show-password="element.options.showPassword"
      ></el-input>
    </template>

    <template v-if="element.type == 'textarea'">
      <el-input type="textarea" :rows="5"
        v-model="element.options.defaultValue"
        :style="{width: isTable ? '100%' : element.options.width}"
        :disabled="element.options.disabled"
        :placeholder="element.options.placeholder"
      ></el-input>
    </template>

    <template v-if="element.type == 'number'">
      <el-input-number 
        v-model="element.options.defaultValue" 
        :disabled="element.options.disabled"
        :controls-position="element.options.controlsPosition"
        :style="{width: isTable ? '100%' : element.options.width}"
      ></el-input-number>
    </template>

    <template v-if="element.type == 'radio'">
      <el-radio-group 
      v-if="element.options.remote === 3"
      v-model="element.options.defaultValue"
        :style="{width: isTable ? '100%' : element.options.width}"
        :disabled="element.options.disabled"
      >
        <el-radio  
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in $dictUtils.getDictList(element.options.dictType)" :key="item.value + index"
        >
          {{ item.label}}
        </el-radio>

      </el-radio-group>

       <el-radio-group 
       v-else
       v-model="element.options.defaultValue"
        :style="{width: isTable ? '100%' : element.options.width}"
        :disabled="element.options.disabled"
      >
        <el-radio  
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"
        >
          {{element.options.showLabel ? item.label : item.value}}
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="element.type == 'checkbox'">
      <el-checkbox-group 
         v-if="element.options.remote === 3"
      v-model="element.options.defaultValue"
        :style="{width: isTable ? '100%' : element.options.width}"
        :disabled="element.options.disabled"
      >
        <el-checkbox
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"  v-for="(item, index) in $dictUtils.getDictList(element.options.dictType)" :key="item.value + index"
        >
          {{item.label}}
        </el-checkbox>
        
      </el-checkbox-group>


      <el-checkbox-group 
        v-else
      v-model="element.options.defaultValue"
        :style="{width: isTable ? '100%' : element.options.width}"
        :disabled="element.options.disabled"
      >
      
        <el-checkbox
          :style="{display: element.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"
        >
          {{element.options.showLabel ? item.label : item.value}}
        </el-checkbox>
        
      </el-checkbox-group>


    </template>

    <template v-if="element.type == 'time'">
      <el-time-picker 
        :key="elementKey"
        :default-value="element.options.defaultValue"
        v-model="element.options.defaultValue"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :style="{width: isTable ? '100%' : element.options.width}"
        :value-format="element.options.format"
      >
      </el-time-picker>
    </template>

    <template v-if="element.type == 'date'">
      <el-date-picker
        :key="elementKey"
        v-model="element.options.defaultValue"
        :type="element.options.type"
        :is-range="element.options.isRange"
        :placeholder="element.options.placeholder"
        :start-placeholder="element.options.startPlaceholder"
        :end-placeholder="element.options.endPlaceholder"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"
        :editable="element.options.editable"
        :clearable="element.options.clearable"
        :value-format="element.options.timestamp ? 'timestamp' : element.options.format"
        :format="element.options.format"
        :style="{width: isTable ? '100%' : element.options.width}"  
      >
      </el-date-picker>
    </template>

    <template v-if="element.type == 'rate'">
      <el-rate v-model="element.options.defaultValue"
        :max="element.options.max"
        :disabled="element.options.disabled"
        :allow-half="element.options.allowHalf"
        :show-score="element.options.showScore"
      ></el-rate>
    </template>

    <template v-if="element.type == 'color'">
      <el-color-picker 
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :show-alpha="element.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="element.type == 'select'">
      <el-select
        v-if="element.options.remote === 3"
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :multiple="element.options.multiple"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{width: isTable ? '100%' : element.options.width}"
      >
          <el-option
                
                  v-for="item in $dictUtils.getDictList(element.options.dictType)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
           </el-option>
      </el-select>
      <el-select
        v-else
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :multiple="element.options.multiple"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{width: isTable ? '100%' : element.options.width}"
      >
        <el-option   
         v-for="item in element.options.options"
         :key="item.value" :value="item.value" :label="element.options.showLabel?item.label:item.value"></el-option>

      
      </el-select>
    </template>

    <template v-if="element.type=='switch'">
      <el-switch
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
      >
      </el-switch>
    </template>

    <template v-if="element.type=='slider'">
      <el-slider 
        v-model="element.options.defaultValue"
        :min="element.options.min"
        :max="element.options.max"
        :disabled="element.options.disabled"
        :step="element.options.step"
        :show-input="element.options.showInput"
        :range="element.options.range"
        :style="{width: isTable ? '100%' : element.options.width}"
      ></el-slider>
    </template>

    <template v-if="element.type=='imgupload'">
      <fm-upload
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :style="{'width': isTable ? '100%' : element.options.width}"
        :width="element.options.size.width"
        :height="element.options.size.height"
        token="xxx"
        domain="xxx"
      >
        
      </fm-upload>
    </template>

    <template v-if="element.type == 'cascader'">
      <el-cascader
        v-model="element.options.defaultValue"
        :disabled="element.options.disabled"
        :clearable="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{width: isTable ? '100%' : element.options.width}"
        :options="element.options.remote ? [] : element.options.options"
      >

      </el-cascader>
    </template>

    <template v-if="element.type == 'selectTree'">
            <SelectTree 
              :props="{
                  value: 'id',             // ID字段名
                  label: 'name',         // 显示名称
                  children: 'children'    // 子级字段名
                }"

              :disabled="element.options.disabled"
              :placeholder="element.options.placeholder"
              :style="{width: isTable ? '100%' : element.options.width}" 
              :url="`/sys/office/treeData`"
              :clearable="true" 
              :accordion="true"
              :showCheckbox="element.options.checkbox"
              v-model="element.options.defaultValue"
              />
    </template>

    <template v-if="element.type == 'editor'">
      <vue-editor
        v-model="element.options.defaultValue"
        :style="{width: isTable ? '100%' : element.options.width, cursor: element.options.disabled ? 'no-drop' : '', backgroundColor: element.options.disabled ? '#F5F7FA' : ''}"
        :editor-toolbar="element.options.customToolbar"
        class="fm-editor"
        :disabled="element.options.disabled"
      >
      </vue-editor>
    </template>

    <template v-if="element.type=='blank'">
      <div style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;">{{element.model}}</div>
      
    </template>

    <template v-if="element.type == 'component'">
      <component :is="`component-${element.key}`" :key="key" v-model="element.options.defaultValue"></component>
    </template>

    <template v-if="element.type == 'custom'">
      <component  :is="element.el" v-model="element.options.defaultValue"></component>
    </template>

    <template v-if="element.type == 'text'">
      <span>{{element.options.defaultValue}}</span>
    </template>

    <template v-if="element.type == 'html'">
      <span v-html="element.options.defaultValue"></span>
    </template>

    <template v-if="element.type == 'fileupload'">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :style="{width: isTable ? '100%' : element.options.width}"
        :disabled="element.options.disabled"
        :limit="element.options.limit"
      >
        <el-button size="small" type="primary">{{$t('fm.actions.upload')}}</el-button>
        <div v-if="element.options.tip" class="el-upload__tip" slot="tip">{{element.options.tip}}</div>
      </el-upload>
    </template>
    <!--jeeplus定制修改-->
    <template v-if="element.type == 'user'">
      <user-select
        :disabled="element.options.disabled"
        :placeholder="element.options.placeholder"
        :style="{width: isTable ? '100%' : element.options.width}"
      ></user-select>
    </template>
     <template v-if="element.type == 'office'">
            <SelectTree 
              :props="{
                  value: 'id',             // ID字段名
                  label: 'name',         // 显示名称
                  children: 'children'    // 子级字段名
                }"

              :disabled="element.options.disabled"
              :placeholder="element.options.placeholder"
              :style="{width: isTable ? '100%' : element.options.width}" 
              :url="`/sys/office/treeData`"
              :clearable="true" 
              :accordion="true"
              v-model="element.options.defaultValue"
              />
      </template>
      <template v-if="element.type == 'area'">
            <SelectTree 
             :props="{
                value: 'id',             // ID字段名
                label: 'name',         // 显示名称
                children: 'children'    // 子级字段名
              }"
            :disabled="element.options.disabled"
            :placeholder="element.options.placeholder"
            :style="{width: isTable ? '100%' : element.options.width}" 
            :url="`/sys/area/treeData`"
             v-model="element.options.defaultValue"
            :clearable="true" 
            :accordion="true"/>
      </template>

      <template v-if="element.type == 'dict'">
        <el-select
            v-model="element.options.defaultValue"
            :disabled="element.options.disabled"
            :multiple="element.options.multiple"
            :clearable="element.options.clearable"
            :placeholder="element.options.placeholder"
            :style="{width: isTable ? '100%' : element.options.width}"
          >
           <el-option
                  v-for="item in this.$dictUtils.getDictList(element.options.dictType)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
           </el-option>
      </el-select>
      </template>
  </span>
</template>

<script>
import FmUpload from './Upload'
import UserSelect from '@/components/userSelect'
import SelectTree from '@/components/treeSelect/treeSelect.vue'
import Vue from 'vue'
export default {
  components: {
    FmUpload,
    UserSelect,
    SelectTree
  },
  props: ['element', 'isTable'],
  data () {
    return {
      key: new Date().getTime(),
      elementKey: new Date().getTime()
    }
  },
  created () {
    if (this.element.type == 'component') {
      Vue.component(`component-${this.element.key}`, {
        template: `<span>${this.element.options.template}</span>`,
        props: ['dataModel']
      })
    }
  },
  watch: {
    'element.options.template': function (val) {
      Vue.component(`component-${this.element.key}`, {
        template: `<span>${val}</span>`,
        props: ['dataModel']
      })

      this.key = new Date().getTime()
    },
    'element.options.defaultValue': function (val) {
      console.log(val)
      this.elementKey = new Date().getTime()
      
    }
  }
}
</script>
