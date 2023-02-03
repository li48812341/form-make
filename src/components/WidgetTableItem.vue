<template>
<div
  v-if="element && element.key"
  class="widget-table-view" 
  :class="{
    active: selectWidget.key == element.key, 
    'is_req': element.options.required,
    'is_hidden': element.options.hidden,
    'mobile': platform == 'mobile'
  }"
  @click.stop="handleSelectWidget(index)"
  :style="{width: platform != 'mobile' ? (!element.options.width || element.options.width == '100%' ? '200px' : element.options.width) : ''}"
>
  <el-table
    v-if="platform != 'mobile'"
    row-class-name="widget-table-row"
    :data="[{}]">
    <el-table-column :label="element.name" :label-class-name="element.options.required ? 'required' : ''">
      <widget-element-item :element="element" :is-table="true"></widget-element-item>
    </el-table-column>
  </el-table>

  <el-form-item v-if="platform == 'mobile'"
    :label="element.options.hideLabel ? '' : element.name"
    :label-width="element.options.hideLabel ? '0px' : (element.options.isLabelWidth ? element.options.labelWidth + 'px' : '')"
  >
    <widget-element-item :element="element" :is-table="true"></widget-element-item>
  </el-form-item>

  <div class="widget-view-action" v-if="selectWidget.key == element.key">
    <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)" :title="$t('fm.tooltip.clone')"></i>
    <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)" :title="$t('fm.tooltip.trash')"></i>
  </div>
  <div class="widget-view-drag" v-if="selectWidget.key == element.key">
    <i class="iconfont icon-drag drag-widget"></i>
  </div>

  <div class="widget-view-model" v-if="element.options.dataBind">
    <span>{{element.model}}</span>
  </div>
</div>
</template>

<script>
import WidgetElementItem from './WidgetElementItem'
import _ from 'lodash'
import { EventBus } from '../util/event-bus.js'

export default {
  components: {
    WidgetElementItem
  },
  props: ['element', 'select', 'index', 'data', 'platform'],
  data () {
    return {
      selectWidget: this.select || {}
    }
  },
  methods: {
    handleSelectWidget (index) {
      this.selectWidget = this.data[index]
    },
    handleWidgetDelete (index) {
      if (this.data.length == 1) {
        this.$emit('select-change', -1)
      } else {
        if (this.data.length - 1 == index) {
          this.$emit('select-change', index - 1)
        } else {
          this.$emit('select-change', index)
        }
      }

      this.$nextTick(() => {
        this.data.splice(index, 1)

        setTimeout(() => {
          EventBus.$emit('on-history-add')
        }, 20)
      })
    },
    handleWidgetClone (index) {
      const key = new Date().getTime() + ''
      let cloneData = {
        ..._.cloneDeep(this.data[index]),
        key,
        model: this.data[index].type + key,
      }

      this.data.splice(index + 1, 0, cloneData)

      this.$nextTick(() => {
        this.selectWidget = this.data[index + 1]

        this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
      })
    },
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  }
}
</script>
