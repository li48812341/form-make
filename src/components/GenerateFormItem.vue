<template>
  <div class="fm-form-item" :data-id="widget.model">
    <el-form-item v-if="widget.type != 'divider' && display[widget.model]" :prop="widget.model"
      :class="{
        [widget.options.customClass]: widget.options.customClass?true: false,
        'no-label-form-item': widget.options.isLabelWidth && widget.options.labelWidth == 0
      }"
      :label="widget.options.hideLabel ? '' : widget.name"
      :label-width="widget.options.hideLabel ? '0px' : (widget.options.isLabelWidth ? widget.options.labelWidth + 'px' : '')"
      :key="widget.key"
    >
      <generate-element-item 
        :blanks="blanks" 
        :is-table="false" 
        :widget="widget" 
        :models="dataModels"
        :remote="remote"
        :edit="edit"
        :remote-option="remoteOption"
        :key="widget.key"
        :rules="rules"
        v-model="dataModel"
        :platform="platform"
        :preview="preview"
      >
        
        <template v-slot:[blank.name]="scope" v-for="blank in blanks">
          <slot :name="blank.name" :model="scope.model"></slot>
        </template>
      </generate-element-item>
    </el-form-item>

    <el-divider v-if="widget.type == 'divider' && display[widget.model]"
      :content-position="widget.options.contentPosition"
    >
      {{widget.name}}
    </el-divider>
  </div>
  
</template>

<script>
import GenerateElementItem from './GenerateElementItem'
import { EventBus } from '../util/event-bus.js'

export default {
  components: {
    GenerateElementItem
  },
  props: ['widget', 'models', 'rules', 'remote', 'blanks', 'display', 'edit', 'remoteOption', 'platform', 'preview', 'containerKey'],
  data () {
    return {
      
      dataModel: this.models[this.widget.model],
      dataModels: this.models
    }
  },
  methods: {
  },
  watch: {
    dataModel: {
      deep: true,
      handler (val) {
        EventBus.$emit('on-change', val, this.widget.model, this.containerKey)
      }
    },
    models: {
      deep: true,
      handler (val) {
        this.dataModels = val
        this.dataModel = val[this.widget.model]
      }
    }
  }
}
</script>
