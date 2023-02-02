<template>
<div>
  <div class="widget-view"
    :class="{
      active: selectWidget.key == element.key, 
      'is_req': element.options.required, 
      'is_hidden': element.options.hidden,
    }"
    @click.stop="handleSelectWidget(index)"
    v-if="element && element.key && element.type != 'divider'"
  >
    <el-form-item 
      :class="{
        [element.options.customClass]: element.options.customClass?true: false
      }"
      :label="element.options.hideLabel ? '' : element.name"
      :label-width="element.options.hideLabel ? '0px' : (element.options.isLabelWidth ? element.options.labelWidth + 'px' : '')"
      
    >
        <widget-element-item :element="element" :is-table="false" :key="element.key"></widget-element-item>

        
        
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
  <div class="widget-view no-put"
    v-if="element && element.key && element.type == 'divider'" 
    :class="{active: selectWidget.key == element.key, 'is_hidden': element.options.hidden}"
    @click.stop="handleSelectWidget(index)"
    style="padding-bottom: 0;"
  >
    <el-divider :content-position="element.options.contentPosition">
      {{element.name}}
    </el-divider>

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
</div>
</template>

<script>
import WidgetElementItem from './WidgetElementItem'
import _ from 'lodash'
import { EventBus } from '../util/event-bus.js'

export default {
  props: ['element', 'select', 'index', 'data'],
  components: {
    WidgetElementItem
  },
  data () {
    return {
      selectWidget: this.select || {}
    }
  },
  mounted () {
  },
  methods: {
    handleSelectWidget (index) {
      this.selectWidget = this.data.list[index]
    },
    handleWidgetDelete (index) {
      if (this.data.list.length == 1) {
        this.$emit('select-change', -1)
      } else {
        if (this.data.list.length - 1 == index) {
          this.$emit('select-change', index - 1)
        } else {
          this.$emit('select-change', index)
        }
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1)

        setTimeout(() => {
          
          EventBus.$emit('on-history-add')
        }, 20)
      })
    },
    handleWidgetClone (index) {
      const key = new Date().getTime() + ''
      let cloneData = {
        ..._.cloneDeep(this.data.list[index]),
        key,
        model: this.data.list[index].type + key,
      }

      this.data.list.splice(index + 1, 0, cloneData)

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1]

        this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
      })
    }
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
