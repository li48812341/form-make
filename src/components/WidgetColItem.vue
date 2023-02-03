<template>
  <div
    class="widget-col widget-view"
    :class="{
      active: selectWidget.key && selectWidget.key == element.key,
      'is_hidden': element.options.hidden
    }"
    @click.stop="handleSelectWidget(index)"
  >
    <el-row 
      :type="element.options.flex ? 'flex' : ''"
      :gutter="element.options.gutter || 0"
      :justify="element.options.justify"
      :align="element.options.align"
      :class="{
        [element.options.customClass]: element.options.customClass?true: false
      }"
    >
    
      <el-col
        class="widget-col-item"
        v-for="(item, i) in element.columns" :key="item.key" 
        :class="{
          active: selectWidget.key && selectWidget.key == item.key,
          [item.options.customClass]: item.options.customClass?true: false
        }"
        @click.stop.native="handleSelectItemWidget(i)"
        :span="getColSpan(item.options)"
        :offset="item.options ? item.options.offset : 0"
        :push="item.options ? item.options.push : 0"
        :pull="item.options ? item.options.pull : 0"
      >
        <draggable
          v-model="item.list"
          v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
          :no-transition-on-drag="true"
          @add="handleWidgetColAdd($event, element, i)"
          @update="handleWidgetColUpdate"
        >
          <transition-group name="fade" tag="div" class="widget-col-list">
            <template v-for="(col, colindex) in item.list" v-if="col && col.key">

              <widget-col-item
                v-if="col.type === 'grid'" 
                :key="col.key" 
                :element="col" 
                :bindDataTable="bindDataTable" :ds="ds" :tableName="tableName"
                :select.sync="selectWidget" 
                :index="colindex" :data="item"
                @select-change="handleSelectChange($event, item)"  
                :platform="platform"
              >
              </widget-col-item>

              <widget-tab-item
                v-else-if="col.type === 'tabs'"
                :key="col.key"
                :element="col"
                :select.sync="selectWidget" 
                :index="colindex" :data="item"
                :bindDataTable="bindDataTable" :ds="ds" :tableName="tableName"
                @select-change="handleSelectChange($event, item)"  
                :platform="platform"
              >
              </widget-tab-item>

              <widget-report
                v-else-if="col.type === 'report'"
                :key="col.key"
                :element="col"
                :select.sync="selectWidget" 
                :index="colindex" :data="item"
                @select-change="handleSelectChange($event, item)" 
                :platform="platform"
              >
              </widget-report>

              <widget-table
                v-else-if="col.type === 'table'"
                :key="col.key"
                :element="col"
                :bindDataTable="bindDataTable" :ds="ds" :tableName="tableName"
                :select.sync="selectWidget" 
                :index="colindex" :data="item"
                @select-change="handleSelectChange($event, item)"  
                :platform="platform"
              >
              </widget-table>

              <widget-form-item 
                v-else
                :key="col.key" 
                :element="col" 
                :select.sync="selectWidget" 
                :index="colindex" :data="item"
                @select-change="handleSelectChange($event, item)"
              >
              </widget-form-item>
            </template>
          </transition-group>
          
        </draggable>

        <div class="widget-view-action widget-col-action" v-if="selectWidget.key == item.key">
          <i class="iconfont icon-icon_clone" @click.stop="handleColItemClone(index, i)" :title="$t('fm.tooltip.clone')"></i>
          <i class="iconfont icon-trash" @click.stop="handleColItemDelete(index, i)" v-if="element.columns.length > 1" :title="$t('fm.tooltip.trash')"></i>
        </div>
      </el-col>
    </el-row>

    <div class="widget-view-action widget-col-action" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-tianjiazengjiajia" @click.stop="handleAddCol(index)" :title="$t('fm.actions.addColumn')"></i>

      <i class="iconfont icon-icon_clone" @click.stop="handleColClone(index)" :title="$t('fm.tooltip.clone')"></i>
      <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)" :title="$t('fm.tooltip.trash')"></i>
    </div>

    <div class="widget-view-drag widget-col-drag" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-drag drag-widget"></i>
    </div>
  </div>
</template>

<script>
import WidgetFormItem from './WidgetFormItem'
import WidgetTable from './WidgetTable'
import WidgetTabItem from './WidgetTabItem'
import Draggable from 'vuedraggable'
import _ from 'lodash'
import { CloneLayout } from '../util/layout-clone.js'
import { EventBus } from '../util/event-bus.js'
import { generateKeyToTD, generateKeyToCol } from '../util'

export default {
  name: 'widget-col-item',
  components: {
    Draggable,
    WidgetFormItem,
    WidgetTable,
    WidgetTabItem,
    WidgetReport: () => import('./WidgetReport.vue')
  },
  props: ['element', 'select', 'index', 'data', 'ds', 'bindDataTable', 'tableName', 'platform'],
  data () {
    return {
      selectWidget: this.select || {},
      selectIndex: -1
    }
  },
  methods: {
    getColSpan (options) {
      
      if (this.platform == 'pc') {
        return options.md
      }
      if (this.platform == 'pad') {
        return options.sm
      }
      if (this.platform == 'mobile') {
        return options.xs
      }
    },
    handleSelectWidget (index) {
      this.selectWidget = this.data.list[index]
    },
    handleSelectItemWidget (i) {
      this.selectWidget = this.data.list[this.index].columns[i]

      this.selectIndex = i
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
      
      this.data.list.splice(index, 1)

      setTimeout(() => {
        EventBus.$emit('on-history-add')
      }, 20)
    },

    handleColItemDelete (index, i) {
      this.data.list[index].columns.splice(i, 1)

      if (i == 0) {
        this.selectWidget = this.data.list[index].columns[0]
      } else {
        this.selectWidget = this.data.list[index].columns[i - 1]
      }

      setTimeout(() => {
        EventBus.$emit('on-history-add')
      }, 20)
    },

    handleAddCol (index) {
      this.data.list[index].columns.push({
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
        list: [],
        key: Math.random().toString(36).slice(-8)
      })

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },

    handleColClone (index) {
      let cloneData = _.cloneDeep(this.data.list[index])

      this.data.list.splice(index + 1, 0, CloneLayout(cloneData))

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1]

        this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
      })
    },

    handleColItemClone (index, i) {
      let cloneData = _.cloneDeep(this.data.list[index].columns[i])

      this.data.list[index].columns.splice(i + 1, 0, CloneLayout(cloneData))

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index].columns[i + 1]

        this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
      })
    },

    handleWidgetColUpdate (evt) {
      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },

    handleWidgetColAdd ($event, row, colIndex) {
      const newIndex = $event.newIndex
      this.$set(row.columns[colIndex].list, newIndex, _.cloneDeep(row.columns[colIndex].list[newIndex]))
      
      const key = new Date().getTime() + ''
      if(this.bindDataTable){
          this.$set(row.columns[colIndex].list, newIndex, {
            ...row.columns[colIndex].list[newIndex],
            options: {
              ...row.columns[colIndex].list[newIndex].options,
              remoteFunc: row.columns[colIndex].list[newIndex].options.remoteFunc || 'func_'+key,
              remoteOption: row.columns[colIndex].list[newIndex].options.remoteOption || 'option_'+key
            },
            novalid: {
              ...row.columns[colIndex].list[newIndex].novalid,
            },
   	    key: row.columns[colIndex].list[newIndex].key ? row.columns[colIndex].list[newIndex].key : key,
            dsId: this?.ds?.id??'master',
            enName: this?.ds?.enName??'master',
            tableName: this?.tableName??'',
            model: '',
            rules: row.columns[colIndex].list[newIndex].rules ? [...row.columns[colIndex].list[newIndex].rules] : []
          })
      }else{
          this.$set(row.columns[colIndex].list, newIndex, {
            ...row.columns[colIndex].list[newIndex],
            options: {
              ...row.columns[colIndex].list[newIndex].options,
              remoteFunc: row.columns[colIndex].list[newIndex].options.remoteFunc || 'func_'+key,
              remoteOption: row.columns[colIndex].list[newIndex].options.remoteOption || 'option_'+key
            },
            novalid: {
              ...row.columns[colIndex].list[newIndex].novalid,
            },
            key: row.columns[colIndex].list[newIndex].key ? row.columns[colIndex].list[newIndex].key : key,
            model: row.columns[colIndex].list[newIndex].model ? row.columns[colIndex].list[newIndex].model : row.columns[colIndex].list[newIndex].type + '_' + key,
            rules: row.columns[colIndex].list[newIndex].rules ? [...row.columns[colIndex].list[newIndex].rules] : []
          })
      }

      if (row.columns[colIndex].list[newIndex].type == 'report') {
        row.columns[colIndex].list[newIndex].rows = generateKeyToTD(row.columns[colIndex].list[newIndex].rows)
      }

      if (row.columns[colIndex].list[newIndex].type == 'grid') {
        row.columns[colIndex].list[newIndex].columns = generateKeyToCol(row.columns[colIndex].list[newIndex].columns)
      }


      this.selectWidget = row.columns[colIndex].list[newIndex]

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },
    handleSelectChange (index, item) {
      setTimeout(() => {
        index >=0 ? (this.selectWidget = item.list[index]) : (this.selectWidget = {})
      })
    }
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      deep: true,
      handler (val) {
        this.$emit('update:select', val)
      }
    },
  }
}
</script>
