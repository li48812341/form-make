<template>
  <div class="widget-form-container"
    :class="`${platform}`"
  >
    <el-form  
      :size="data.config.size" 
      :label-position="data.config.labelPosition" 
      :label-width="data.config.labelWidth + 'px'"
      :class="{
        [data.config && data.config.customClass]:  (data.config && data.config.customClass) ? true : false,
      }"
      :style="{width: data.config.width, margin: 'auto'}"
    >
      <div v-if="data.list.length == 0" class="form-empty">{{$t('fm.description.containerEmpty')}}</div>
      <draggable class="" 
        v-model="data.list" 
        v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
        
        @add="handleWidgetAdd"
        @update="handleWidgetUpdate"
      >

        <transition-group name="fade" tag="div" class="widget-form-list" >

          <template v-for="(element, index) in data.list" v-if="element && element.key">

            <widget-table
              v-if="element.type === 'table'"
              :key="element.key"
              :element="element"
              :bindDataTable="bindDataTable" :ds="ds" :tableName="tableName"
              :select.sync="selectWidget" 
              :index="index" :data="data"
              @select-change="handleSelectChange"  
              :platform="platform"
            >
            </widget-table>

            <widget-tab-item
              v-else-if="element.type === 'tabs'"
              :key="element.key"
              :element="element"
              :bindDataTable="bindDataTable" :ds="ds" :tableName="tableName"
              :select.sync="selectWidget" 
              :index="index" :data="data"
              @select-change="handleSelectChange"  
              :platform="platform"
            >
            </widget-tab-item>

            <widget-report
              v-else-if="element.type === 'report'"
              :key="element.key"
              :element="element"
              :select.sync="selectWidget" 
              :index="index" :data="data"
              @select-change="handleSelectChange" 
              :platform="platform" 
            >
            </widget-report>

            <widget-form-item 
              v-else-if="element.type !== 'grid'" 
              :key="element.key" 
              :element="element" 
              :select.sync="selectWidget" 
              :index="index" :data="data"
              @select-change="handleSelectChange"  
            >
            </widget-form-item>

            <widget-col-item
              v-else
              :key="element.key" 
              :bindDataTable="bindDataTable" :ds="ds" :tableName="tableName"
              :element="element" 
              :select.sync="selectWidget" 
              :index="index" :data="data"
              @select-change="handleSelectChange"  
              :platform="platform"
            >
            </widget-col-item>
          </template>
        </transition-group>
            
      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetFormItem from './WidgetFormItem'
import WidgetColItem from './WidgetColItem'
import WidgetTable from './WidgetTable'
import WidgetTabItem from './WidgetTabItem'
import WidgetReport from './WidgetReport'
import { EventBus } from '../util/event-bus.js'
import { generateKeyToTD, generateKeyToCol } from '../util'
import _ from 'lodash'

export default {
  components: {
    Draggable,
    WidgetFormItem,
    WidgetColItem,
    WidgetTable,
    WidgetTabItem,
    WidgetReport
  },
  props: {
      select: {
        type: Object,
       default: () => {}
      },
      ds: {
        type: Object,
       default: () => {}
      },
      tableName: {
        type: String,
        default: ''
      },
      platform: {
        type: String,
        default: ''
      },
      data: {
        type: Object,
       default: () => {}
      },
     bindDataTable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectWidget: this.select || {}
    }
  },
  mounted () {
    document.body.ondrop = function (event) {
      let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
      if (isFirefox) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    EventBus.$on('on-field-add', item => {
      // console.log('.....')
      // console.log(item, this.data, this.select)
      const key = new Date().getTime() + ''
      let widgetItem = {}
      if(this.bindDataTable){
        widgetItem = _.cloneDeep({
          ...item,
          options: {
            ...item.options,
            remoteFunc: 'func_' + key,
            remoteOption: 'option_' + key
          },
          key,
          model: '',
          dsId: this?.ds?.id??'master',
          enName: this?.ds?.enName??'master',
          tableName: this?.tableName??'',
          rules: []
        })

      }else{
        widgetItem = _.cloneDeep({
          ...item,
          options: {
            ...item.options,
            remoteFunc: 'func_' + key,
            remoteOption: 'option_' + key
          },
          key,
          model: item.type + '_' + key,
          rules: []
        })
      } 
      if (widgetItem.type == 'report') {
        widgetItem.rows = generateKeyToTD(widgetItem.rows)
      }

      if (widgetItem.type == 'grid') {
        widgetItem.columns = generateKeyToCol(widgetItem.columns)
      }
      this._addWidget(this.data.list, widgetItem)
    })
  },
  beforeDestroy () {
    EventBus.$off('on-field-add')
  },
  methods: {
    _addWidget (list, widget, isTable = false) {
      
      if (isTable 
        && (widget.type == 'grid' || widget.type == 'table' || widget.type == 'tabs' || widget.type == 'divider' || widget.type == 'report')) {
        this.$message.warning(this.$t('fm.message.noPut'))
        return 'table'
      }

      if (this.selectWidget && this.selectWidget.key) {
        const index = list.findIndex(item => item.key == this.selectWidget.key)

        if (index >= 0) {
          list.splice(index + 1, 0, widget)

          this.selectWidget = list[index + 1]

          this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
        } else {
          for (let l = 0; l < list.length; l++) {
            let item = list[l]

            if (item.type === 'grid') {
              item.columns.forEach(column => {
                this._addWidget(column.list, widget)
              })
            }
            if (item.type === 'table') {
              if ('table' == this._addWidget(item.tableColumns, widget, true)) {
                return 'table'
              }
            }
            if (item.type === 'tabs') {
              item.tabs.forEach(tab => {
                this._addWidget(tab.list, widget)
              })
            }
            if (item.type === 'report') {

              for (let i = 0; i < item.rows.length; i++) {
                for (let j = 0; j < item.rows[i].columns.length; j++) {
                  if ('table' == this._addWidget(item.rows[i].columns[j].list, widget, false)){
                    return 'table'
                  }
                }
              }
            }
          }
        }
      } else {
        list.push(widget)

        this.selectWidget = list[list.length - 1]

        this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
      }
    },
    handleWidgetUpdate (evt) {
      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },
    handleWidgetAdd (evt) {
      
      const newIndex = evt.newIndex
      const to = evt.to

      this.$set(this.data.list, newIndex, _.cloneDeep(this.data.list[newIndex]))
      
      //为拖拽到容器的元素添加唯一 key
      const key = new Date().getTime() + ''
      if(this.bindDataTable){
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options,
            remoteFunc: this.data.list[newIndex].options.remoteFunc || 'func_' + key,
            remoteOption: this.data.list[newIndex].options.remoteOption || 'option_' + key,
          },
          key: this.data.list[newIndex].key ? this.data.list[newIndex].key : key,
          // 绑定键值
          model: '',
          dsId: this.ds.id,
          enName: this.ds.enName,
          tableName: this.tableName,
          rules: this.data.list[newIndex].rules ? [...this.data.list[newIndex].rules] : []
        })

      }else{
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options,
            remoteFunc: this.data.list[newIndex].options.remoteFunc || 'func_' + key,
            remoteOption: this.data.list[newIndex].options.remoteOption || 'option_' + key,
          },
          key: this.data.list[newIndex].key ? this.data.list[newIndex].key : key,
          // 绑定键值
          model: this.data.list[newIndex].model ? this.data.list[newIndex].model : this.data.list[newIndex].type + '_' + key,
          rules: this.data.list[newIndex].rules ? [...this.data.list[newIndex].rules] : []
        })
      }

      if (this.data.list[newIndex].type == 'report') {
        this.data.list[newIndex].rows = generateKeyToTD(this.data.list[newIndex].rows)
      }

      if (this.data.list[newIndex].type == 'grid') {
        this.data.list[newIndex].columns = generateKeyToCol(this.data.list[newIndex].columns)
      }

      this.selectWidget = this.data.list[newIndex]

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },
    handleWidgetDelete (index) {
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index - 1]
        }
      } else {
        this.selectWidget = this.data.list[index + 1]
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1)

        this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
      })
    },
    handleSelectChange (index) {
      // console.log('select-change', index)
      setTimeout(() => {
        index >=0 ? (this.selectWidget = this.data.list[index]) : (this.selectWidget = {})
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

<style lang="scss">
// .fade-enter-active, .fade-leave-active {
//   transition: opacity .3s;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
// }
</style>
