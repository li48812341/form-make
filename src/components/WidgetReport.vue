<template>
  <div
    class="widget-report widget-view fm-report-table"
    :class="{
      active: selectWidget.key && selectWidget.key == element.key,
      'is_hidden': element.options.hidden
    }"
    @click.stop="handleSelectWidget(index)"
  >
    <div>
      <table class="fm-report-table__table" :style="{
          'border-top-width': element.options.borderWidth + 'px',
          'border-top-color': element.options.borderColor,
          'border-left-width': element.options.borderWidth + 'px',
          'border-left-color': element.options.borderColor,
          'width': element.options.width || '100%'
        }"
        :class="{
          [element.options.customClass]: element.options.customClass ? true : false
        }"
      >
        <tr :key="rowIndex" v-for="(row, rowIndex) in element.rows">
          <td :style="{
              'border-right-width': element.options.borderWidth + 'px',
              'border-right-color': element.options.borderColor,
              'border-bottom-width': element.options.borderWidth + 'px',
              'border-bottom-color': element.options.borderColor,
              'width': column.options.width,
              'height': column.options.height
            }"
            v-for="(column, i) in row.columns" :key="rowIndex + '-' + i"
            v-if="!column.options.invisible"
            :colspan="column.options.colspan"
            :rowspan="column.options.rowspan"
            class="widget-report-item fm-report-table__td"
            :class="{
              active: selectWidget.key && selectWidget.key == column.key,
              [column.options.customClass]: column.options.customClass?true: false
            }"
            @click.stop="handleSelectItemWidget(rowIndex, i)"
            valign="top"
          >
            <draggable
              v-model="column.list"
              v-bind="{group: 'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
              :no-transition-on-drag="true"
              @add="handleWidgetItemAdd($event, element, rowIndex, i)"
              @update="handleWidgetItemUpdate"
            >

              <transition-group name="fade" tag="div" class="widget-col-list">
                <template v-for="(c, cindex) in column.list" v-if="c && c.key">
                  <widget-tab-item
                    v-if="c.type === 'tabs'"
                    :key="c.key"
                    :element="c"
                    :select.sync="selectWidget" 
                    :index="cindex" :data="column"
                    @select-change="handleSelectChange($event, column)" 
                    :platform="platform" 
                  >
                  </widget-tab-item>

                  <widget-table
                    v-else-if="c.type === 'table'"
                    :key="c.key"
                    :element="c"
                    :select.sync="selectWidget" 
                    :index="cindex" :data="column"
                    @select-change="handleSelectChange($event, column)"
                    :platform="platform"
                  >
                  </widget-table>

                  <widget-report
                    v-else-if="c.type === 'report'"
                    :key="c.key"
                    :element="c"
                    :select.sync="selectWidget" 
                    :index="cindex" :data="column"
                    @select-change="handleSelectChange($event, column)" 
                    :platform="platform" 
                  >
                  </widget-report>

                  <widget-form-item 
                    v-else-if="c.type !== 'grid'" 
                    :key="c.key" 
                    :element="c" 
                    :select.sync="selectWidget" 
                    :index="cindex" :data="column"
                    @select-change="handleSelectChange($event, column)"
                  >
                  </widget-form-item>

                  <widget-col-item
                    v-else
                    :key="c.key" 
                    :element="c" 
                    :select.sync="selectWidget" 
                    :index="cindex" :data="column"
                    @select-change="handleSelectChange($event, column)" 
                    :platform="platform" 
                  >
                  </widget-col-item>  
                </template>
              </transition-group>
              
            </draggable>
            <div class="widget-view-action widget-col-action" v-if="selectWidget.key == column.key">
              <el-dropdown size="small" trigger="click">
                <span class="el-dropdown-link">
                  <i class="iconfont icon-biaogeshezhi"  :title="$t('fm.tooltip.cellsetting')"></i> 
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="insertleft" @click.native.stop="handleInsertLeft">{{$t('fm.tooltip.insertcolumnleft')}}</el-dropdown-item>
                  <el-dropdown-item command="insertright" @click.native.stop="handleInsertRight">{{$t('fm.tooltip.insertcolumnright')}}</el-dropdown-item>
                  <el-dropdown-item command="insertbefore" @click.native.stop="handleInserBefore">{{$t('fm.tooltip.insertrowbefore')}}</el-dropdown-item>
                  <el-dropdown-item command="insertafter" @click.native.stop="handleInserAfter">{{$t('fm.tooltip.insertrowafter')}}</el-dropdown-item>
                  <el-dropdown-item command="right" @click.native.stop="handleRight(column)" :disabled="!showRight" divided>{{$t('fm.tooltip.mergeright')}}</el-dropdown-item>
                  <el-dropdown-item command="bottom" @click.native.stop="handleBottom(column)" :disabled="!showBottom">{{$t('fm.tooltip.mergedown')}}</el-dropdown-item>
                  <el-dropdown-item command="splitcolumns" @click.native.stop="handleSplitColumn" divided :disabled="!showSplitColumn">{{$t('fm.tooltip.splitcolumns')}}</el-dropdown-item>
                  <el-dropdown-item command="splitrows" @click.native.stop="handleSplitRow" :disabled="!showSplitRow">{{$t('fm.tooltip.splitrows')}}</el-dropdown-item>
                  <el-dropdown-item command="removecolumn" @click.native.stop="handleRemoveColumn" :disabled="!showRemoveColumn" divided>{{$t('fm.tooltip.deletecolumn')}}</el-dropdown-item>
                  <el-dropdown-item command="removerow" @click.native.stop="handleRemoveRow" :disabled="!showRemoveRow" >{{$t('fm.tooltip.deleterow')}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div class="widget-view-action widget-col-action" v-if="selectWidget.key == element.key">
      <i class="iconfont icon--charuhang" @click.stop="handleAddRow(index)" :title="$t('fm.tooltip.addrow')"></i>
      <i class="iconfont icon--charulie" @click.stop="handleAddColumns(index)" :title="$t('fm.tooltip.addcolumn')"></i>
      <i class="iconfont icon-icon_clone" @click.stop="handleReportClone(index)" :title="$t('fm.tooltip.clone')"></i>
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
import Draggable from 'vuedraggable'
import _ from 'lodash'
import { CloneLayout } from '../util/layout-clone.js'
import { EventBus } from '../util/event-bus.js'
import { generateKeyToTD, generateKeyToCol } from '../util'

export default {
  name: 'widget-report',
  components: {
    Draggable,
    WidgetFormItem,
    WidgetTable,
    WidgetColItem: () => import('./WidgetColItem.vue'),
    WidgetTabItem: () => import('./WidgetTabItem.vue')
  },
  props: ['element', 'select', 'index', 'data', 'platform'],
  data () {
    return {
      selectWidget: this.select || {},
      selectR: -1,
      selectC: -1,
    }
  },
  computed: {
    showRight () {
      const currentRowspan = this.element.rows[this.selectR].columns[this.selectC].options.rowspan
      const currentColspan = this.element.rows[this.selectR].columns[this.selectC].options.colspan

      if (this.selectC + currentColspan < this.element.rows[this.selectR].columns.length) {
        const nextColumn = this.element.rows[this.selectR].columns[currentColspan + this.selectC]

        if (!nextColumn.options.invisible && currentRowspan == nextColumn.options.rowspan) {
          return true
        }
      }

      return false
    },
    showBottom () {
      const currentRowspan = this.element.rows[this.selectR].columns[this.selectC].options.rowspan
      const currentColspan = this.element.rows[this.selectR].columns[this.selectC].options.colspan

      if (currentRowspan + this.selectR < this.element.rows.length) {
        const nextColumn = this.element.rows[currentRowspan + this.selectR].columns[this.selectC]

        if (!nextColumn.options.invisible && currentColspan == nextColumn.options.colspan) {
          return true
        }
      }

      return false
    },

    showRemoveRow () {
      if (this.element.rows.length > 1) {
        const currentRowspan = this.element.rows[this.selectR].columns[this.selectC].options.rowspan
        if (currentRowspan == 1) {
          return true
        } else {
          let i = 0
          for (; i < this.element.rows[this.selectR].columns.length; i++) {
            if (currentRowspan != this.element.rows[this.selectR].columns[i].options.rowspan || this.element.rows[this.selectR].columns[i].options.invisible) {
              return false
            }
          }

          if (this.element.rows[this.selectR].columns.length == i) {
            return true
          }
        }
      }
      return false
    },

    showRemoveColumn () {
      if (this.element.rows[this.selectR].columns.length > 1) {
        const currentColspan = this.element.rows[this.selectR].columns[this.selectC].options.colspan
        if (currentColspan == 1) {
          return true
        } else {
          let i = 0;
          for (; i < this.element.rows.length; i++) {
            if (currentColspan != this.element.rows[i].columns[this.selectC].options.colspan || this.element.rows[i].columns[this.selectC].options.invisible) {
              return false
            }
          }

          if (this.element.rows.length == i) {
            return true
          }
        }
      }

      return false
    },

    showSplitColumn () {
      return this.element.rows[this.selectR].columns[this.selectC].options.colspan > 1
    },

    showSplitRow () {
      return this.element.rows[this.selectR].columns[this.selectC].options.rowspan > 1
    }
  },
  methods: {
    handlePut (a, b, c) {
      
      if (c.className.indexOf('widget-col') >=0 || 
        c.className.indexOf('widget-table') >= 0 || 
        c.className.indexOf('widget-tab') >= 0 ||
        c.className.indexOf('no-put') >= 0 || 
        c.children[0].className.indexOf('no-put') >= 0) {
        return false
      }
      return true
    },
    handleSelectWidget (index) {
      this.selectWidget = this.data.list[index]
    },
    handleSelectItemWidget (rowIndex, colIndex) {
      
      this.selectWidget = this.data.list[this.index].rows[rowIndex].columns[colIndex]
      this.selectR = rowIndex
      this.selectC = colIndex
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
    handleWidgetItemAdd ($event, element, rowIndex, colIndex) {
      const newIndex = $event.newIndex

      const key = new Date().getTime() + ''

      this.$set(element.rows[rowIndex].columns[colIndex].list, newIndex, _.cloneDeep(element.rows[rowIndex].columns[colIndex].list[newIndex]))

      this.$set(element.rows[rowIndex].columns[colIndex].list, newIndex, {
        ...element.rows[rowIndex].columns[colIndex].list[newIndex],
        options: {
          ...element.rows[rowIndex].columns[colIndex].list[newIndex].options,
          remoteFunc: element.rows[rowIndex].columns[colIndex].list[newIndex].options.remoteFunc || 'func_'+key,
          remoteOption: element.rows[rowIndex].columns[colIndex].list[newIndex].options.remoteOption || 'option_'+key,
        },
        key: element.rows[rowIndex].columns[colIndex].list[newIndex].key ? element.rows[rowIndex].columns[colIndex].list[newIndex].key : key,
        model: element.rows[rowIndex].columns[colIndex].list[newIndex].model ? element.rows[rowIndex].columns[colIndex].list[newIndex].model : element.rows[rowIndex].columns[colIndex].list[newIndex].type + '_' + key,
        rules: element.rows[rowIndex].columns[colIndex].list[newIndex].rules ? [...element.rows[rowIndex].columns[colIndex].list[newIndex].rules] : []
      })

      if (element.rows[rowIndex].columns[colIndex].list[newIndex].type == 'report') {
        element.rows[rowIndex].columns[colIndex].list[newIndex].rows = generateKeyToTD(element.rows[rowIndex].columns[colIndex].list[newIndex].rows)
      }

      if (element.rows[rowIndex].columns[colIndex].list[newIndex].type == 'grid') {
        element.rows[rowIndex].columns[colIndex].list[newIndex].columns = generateKeyToCol(element.rows[rowIndex].columns[colIndex].list[newIndex].columns)
      }

      this.selectWidget = element.rows[rowIndex].columns[colIndex].list[newIndex]

      // this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
      EventBus.$emit('on-history-add')
    },
    handleWidgetItemUpdate () {
      // this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
      EventBus.$emit('on-history-add')
    },
    handleReportClone (index) {
      let cloneData = _.cloneDeep(this.data.list[index])

      this.data.list.splice(index + 1, 0, CloneLayout(cloneData))

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1]

        this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
      })
    },
    handleAddRow (index) {
      const columns = this.data.list[index].rows[this.data.list[index].rows.length - 1].columns.length

      this.data.list[index].rows.push({
        columns: Array.from({length: columns}, _ => {
          return {
            type: 'td',
            list: [],
            options: {
              customClass: '',
              colspan: 1,
              rowspan: 1,
              align: 'left',
              valign: 'top',
              width: '',
              height: '',
            },
            key: Math.random().toString(36).slice(-8)
          }
        })
      })

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },
    handleAddColumns (index) {
      this.data.list[index].rows.forEach(item => {
        item.columns.push({
          type: 'td',
          list: [],
          options: {
            customClass: '',
            colspan: 1,
            rowspan: 1,
            align: 'left',
            valign: 'top',
            width: '',
            height: '',
          },
          key: Math.random().toString(36).slice(-8)
        })
      })

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },
    insertColumns (insertIndex) {
      for (let i = 0; i < this.element.rows.length; i++) {
        const prevIndex = this.findPrevColIndex(i, insertIndex)

        if (prevIndex != insertIndex && this.element.rows[i].columns[insertIndex].options.invisible) {
          this.element.rows[i].columns.splice(insertIndex, 0, {
            type: 'td',
            list: [],
            options: {
              customClass: '',
              colspan: 1,
              rowspan: 1,
              align: 'left',
              valign: 'top',
              width: '',
              height: '',
              invisible: true
            },
            key: Math.random().toString(36).slice(-8)
          })

          // ???????????????????????????????????????
          const beforeColspan = this.element.rows[i].columns[prevIndex].options.colspan

          this.element.rows[i].columns[prevIndex].options.colspan = beforeColspan + 1

          for (let j = 0; j < beforeColspan + 1; j++) {
            this.element.rows[i].columns[prevIndex + j].options.markCol = j
          }
        } else {
          this.element.rows[i].columns.splice(insertIndex, 0, {
            type: 'td',
            list: [],
            options: {
              customClass: '',
              colspan: 1,
              rowspan: 1,
              align: 'left',
              valign: 'top',
              width: '',
              height: '',
            },
            key: Math.random().toString(36).slice(-8)
          })
        }
      }
    },
    insertRow (insertIndex) {
      const rowArray = []

      for (let i = 0; i < this.element.rows[0].columns.length; i++) {
        const prevIndex = this.findPrevRowIndex(insertIndex, i)

        if (prevIndex != insertIndex && this.element.rows[insertIndex].columns[i].options.invisible) {
          rowArray.push({
            type: 'td',
            list: [],
            options: {
              customClass: '',
              colspan: 1,
              rowspan: 1,
              align: 'left',
              valign: 'top',
              width: '',
              height: '',
              invisible: true
            },
            key: Math.random().toString(36).slice(-8)
          })

          this.element.rows[prevIndex].columns[i].options.rowspan = this.element.rows[prevIndex].columns[i].options.rowspan + 1
        } else {
          rowArray.push({
            type: 'td',
            list: [],
            options: {
              customClass: '',
              colspan: 1,
              rowspan: 1,
              align: 'left',
              valign: 'top',
              width: '',
              height: '',
            },
            key: Math.random().toString(36).slice(-8)
          })
        }
      }

      this.element.rows.splice(insertIndex, 0, {
        columns: rowArray
      })

      // ?????????????????????????????????
      this.$nextTick(() => {
        for (let i = 0; i < this.element.rows[insertIndex].columns.length; i++) {
          if (this.element.rows[insertIndex].columns[i].options.invisible) {
            const prevIndex = this.findPrevRowIndex(insertIndex - 1, i)

            if (!this.element.rows[prevIndex].columns[i].options.invisible) {
              this.markTableItem(prevIndex, i)
            }
          }
        }
      })
    },
    handleInsertLeft () {
      const insertIndex = this.selectC

      this.insertColumns(insertIndex)

      this.selectC =  this.selectC++

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },
    handleInsertRight () {
      const insertColIndex = this.element.rows[this.selectR].columns[this.selectC].options.colspan > 1 
        ? this.findNextColIndex(this.selectR, this.selectC + 1) : this.selectC + 1

      this.insertColumns(insertColIndex)

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },
    handleInserBefore () {
      const insertIndex = this.selectR

      this.insertRow(insertIndex)

      this.selectR = this.selectR++

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },
    handleInserAfter () {
      const insertRowIndex = this.element.rows[this.selectR].columns[this.selectC].options.rowspan > 1
        ? this.findNextRowIndex(this.selectR + 1, this.selectC) : this.selectR + 1

      this.insertRow(insertRowIndex)

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },
    // ???????????????????????????
    markTableItem (R, C) {
      const colspan = this.element.rows[R].columns[C].options.colspan
      const rowspan = this.element.rows[R].columns[C].options.rowspan

      for (let i = 0; i < rowspan; i++) {
        for (let j = 0; j < colspan; j++) {
          this.element.rows[R + i].columns[C + j].options.markCol = j
          this.element.rows[R + i].columns[C + j].options.markRow = i
        }
      }
    },

    handleRight (column) {
      const currentColspan = column.options.colspan
      const nextC = this.selectC + currentColspan
      const nextColspan = this.element.rows[this.selectR].columns[nextC].options.colspan

      this.$set(column.options, 'colspan', currentColspan + nextColspan) // ????????????colspan

      this.element.rows[this.selectR].columns[nextC].options.invisible = true // ?????????????????????

      // ?????????????????????

      const tempList = [...this.element.rows[this.selectR].columns[nextC].list] 

      this.element.rows[this.selectR].columns[nextC].list = []

      column.list = column.list.concat(tempList)

      // ??????????????????????????????
      this.markTableItem(this.selectR, this.selectC)

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },

    handleBottom (column) {
      const currentRowspan = column.options.rowspan
      const nextR = this.selectR + currentRowspan
      const nextRowspan = this.element.rows[nextR].columns[this.selectC].options.rowspan

      this.$set(column.options, 'rowspan', currentRowspan + nextRowspan)

      this.element.rows[nextR].columns[this.selectC].options.invisible = true

      const tempList = [...this.element.rows[nextR].columns[this.selectC].list]

      this.element.rows[nextR].columns[this.selectC].list = []

      column.list = column.list.concat(tempList)

      // ??????????????????????????????
      this.markTableItem(this.selectR, this.selectC)

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },

    handleSplitColumn () {
      const currentColspan = this.element.rows[this.selectR].columns[this.selectC].options.colspan
      const currentRowspan = this.element.rows[this.selectR].columns[this.selectC].options.rowspan

      for (let i = 0; i < currentColspan; i++) {
        this.element.rows[this.selectR].columns[this.selectC + i].options.invisible = false
        this.element.rows[this.selectR].columns[this.selectC + i].options.colspan = 1
        this.element.rows[this.selectR].columns[this.selectC + i].options.rowspan = currentRowspan

        this.markTableItem(this.selectR, this.selectC + i)
      }

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },

    handleSplitRow () {
      const currentColspan = this.element.rows[this.selectR].columns[this.selectC].options.colspan
      const currentRowspan = this.element.rows[this.selectR].columns[this.selectC].options.rowspan

      for (let i = 0; i < currentRowspan; i++) {
        this.element.rows[this.selectR + i].columns[this.selectC].options.invisible = false
        this.element.rows[this.selectR + i].columns[this.selectC].options.rowspan = 1
        this.element.rows[this.selectR + i].columns[this.selectC].options.colspan = currentColspan
        
        this.markTableItem(this.selectR, this.selectC + i)
      }

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },

    findPrevRowIndex (rowIndex, colIndex) {
      if (rowIndex >=  this.element.rows.length || !this.element.rows[rowIndex].columns[colIndex].options.markRow) {
        return rowIndex
      } else {
        return this.findPrevRowIndex(rowIndex - 1, colIndex)
      }
    },

    findPrevColIndex (rowIndex, colIndex) {

      if (colIndex >= this.element.rows[rowIndex].columns.length || !this.element.rows[rowIndex].columns[colIndex].options.markCol) {
        return colIndex
      } else {
        return this.findPrevColIndex(rowIndex, colIndex - 1)
      }
    },

    findNextColIndex (rowIndex, colIndex) {
      if (colIndex >= this.element.rows[rowIndex].columns.length || !this.element.rows[rowIndex].columns[colIndex].options.markCol) {
        return colIndex
      } else {
        return this.findNextColIndex(rowIndex, colIndex + 1)
      }
    },

    findNextRowIndex (rowIndex, colIndex) {
      if (rowIndex >= this.element.rows.length || !this.element.rows[rowIndex].columns[colIndex].options.markRow) {
        return rowIndex
      } else {
        return this.findNextRowIndex(rowIndex + 1, colIndex)
      }
    },

    handleRemoveRow () {
      for (let j = 0; j < this.element.rows[this.selectR].columns.length; j++) {
        const currentRowspan = this.element.rows[this.selectR].columns[j].options.rowspan
        const currentcolspan = this.element.rows[this.selectR].columns[j].options.colspan
        const invisible = this.element.rows[this.selectR].columns[j].options.invisible

        if (invisible) {

          const prevIndex = this.findPrevRowIndex(this.selectR, j)

          if (prevIndex != this.selectR && this.element.rows[prevIndex].columns[j].options.rowspan > 1) {
            this.element.rows[prevIndex].columns[j].options.rowspan = this.element.rows[prevIndex].columns[j].options.rowspan - 1
          }

        } else if (currentRowspan > 1) {
          this.element.rows[this.selectR + 1].columns[j].list = [...this.element.rows[this.selectR].columns[j].list]
          this.element.rows[this.selectR + 1].columns[j].options.invisible = false
          this.element.rows[this.selectR + 1].columns[j].options.rowspan = currentRowspan - 1
          this.element.rows[this.selectR + 1].columns[j].options.colspan = currentcolspan

          // ??????????????????
          this.markTableItem(this.selectR + 1, j)
        } else {
          
        }
      }

      this.element.rows.splice(this.selectR, 1)

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },

    handleRemoveColumn () {
      for (let i = 0; i < this.element.rows.length; i++) {
        
        const currentColspan = this.element.rows[i].columns[this.selectC].options.colspan
        const currentRowspan = this.element.rows[i].columns[this.selectC].options.rowspan
        const invisible = this.element.rows[i].columns[this.selectC].options.invisible

        if (invisible) {
          const prevIndex = this.findPrevColIndex(i, this.selectC)

          if (prevIndex != this.selectC && this.element.rows[i].columns[prevIndex].options.colspan > 1) {
            this.element.rows[i].columns[prevIndex].options.colspan = this.element.rows[i].columns[prevIndex].options.colspan - 1
          }
        } else if (currentColspan > 1) {
          this.element.rows[i].columns[this.selectC + 1].list = [...this.element.rows[i].columns[this.selectC].list]
          this.element.rows[i].columns[this.selectC + 1].options.invisible = false
          this.element.rows[i].columns[this.selectC + 1].options.colspan = currentColspan - 1
          this.element.rows[i].columns[this.selectC + 1].options.rowspan = currentRowspan

          // ??????????????????
          this.markTableItem(i, this.selectC + 1)
        } else {
        }

        this.element.rows[i].columns.splice(this.selectC, 1)
      }

      this.$nextTick(() => {         EventBus.$emit('on-history-add')       })
    },

    handleSelectChange (index, item) {
      setTimeout(() => {
        index >=0 ? (this.selectWidget = item.list[index]) : (this.selectWidget = this.data.list[this.index])
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