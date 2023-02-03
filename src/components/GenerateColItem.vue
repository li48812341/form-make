<template>
  <el-row
    :class="{
      [element.options.customClass]: element.options.customClass?true: false
    }"
    :type="element.options.flex ? 'flex' : ''"
    :gutter="element.options.gutter || 0"
    :justify="element.options.justify"
    :align="element.options.align"
    v-if="display[element.model]"
  >

    <el-col v-for="(item, index) in element.columns" :key="index"
      :xs="item.options ? getColXS(item.options) : item.span"
      :sm="item.options ? getColSM(item.options) : item.span"
      :md="item.options ? getColMD(item.options) : item.span"
      :offset="item.options ? item.options.offset : 0"
      :push="item.options ? item.options.push : 0"
      :pull="item.options ? item.options.pull : 0"
      :class="{
        [item.options.customClass]: item.options.customClass?true: false
      }"
    >
      <template v-for="col in item.list">
        <generate-col-item
          v-if="col.type == 'grid'"
          :key="col.key"
          :model="dataModels"
          :rules="rules"
          :element="col"
          :remote="remote"
          :blanks="blanks"
          :display="display"
          :edit="edit"
          :remote-option="remoteOption"
          :platform="platform"
          :preview="preview"
          :container-key="containerKey"
        >
          <template v-slot:[blank.name]="scope" v-for="blank in blanks">
            <slot :name="blank.name" :model="scope.model"></slot>
          </template>
        </generate-col-item>

        <generate-tab-item
          v-else-if="col.type == 'tabs'"
          :key="col.key"
          :model="dataModels"
          :rules="rules"
          :element="col"
          :remote="remote"
          :blanks="blanks"
          :display="display"
          :edit="edit"
          :remote-option="remoteOption"
          :platform="platform"
          :preview="preview"
        >
          <template v-slot:[blank.name]="scope" v-for="blank in blanks">
            <slot :name="blank.name" :model="scope.model"></slot>
          </template>
        </generate-tab-item>

        <generate-report
          v-else-if="col.type == 'report'"
          :key="col.key"
          :model="dataModels"
          :rules="rules"
          :element="col"
          :remote="remote"
          :blanks="blanks"
          :display="display"
          :edit="edit"
          :remote-option="remoteOption"
          :platform="platform"
          :preview="preview"
          :container-key="containerKey"
        >
          <template v-slot:[blank.name]="scope" v-for="blank in blanks">
            <slot :name="blank.name" :model="scope.model"></slot>
          </template>
        </generate-report>

        <generate-form-item
          v-else
          :key="col.key"
          :models="dataModels"
          :rules="rules"
          :widget="col"
          :remote="remote"
          :blanks="blanks"
          :display="display"
          :edit="edit"
          :remote-option="remoteOption"
          :platform="platform"
          :preview="preview"
          :container-key="containerKey"
        >
          <template v-slot:[blank.name]="scope" v-for="blank in blanks">
            <slot :name="blank.name" :model="scope.model"></slot>
          </template>
        </generate-form-item>
      </template>
    </el-col>
  </el-row>
</template>

<script>
import GenerateFormItem from './GenerateFormItem'
import GenerateTabItem from './GenerateTabItem'

export default {
  name: 'generate-col-item',
  components: {
    GenerateFormItem,
    GenerateTabItem,
    GenerateReport: () => import('./GenerateReport.vue')
  },
  props: ['element', 'model', 'rules', 'remote', 'blanks', 'display', 'edit', 'remoteOption', 'platform', 'preview', 'containerKey'],
  data () {
    return {
      dataModels: this.model
    }
  },
  methods: {
    getColXS (options) {
      if (this.preview) {
        if (this.platform == 'pc') {
          return options.md
        }
        if (this.platform == 'pad') {
          return options.sm
        }
        if (this.platform == 'mobile') {
          return options.xs
        }
      } else {
        return options.xs
      }
    },
    getColSM (options) {
      if (this.preview) {
        if (this.platform == 'pc') {
          return options.md
        }
        if (this.platform == 'pad') {
          return options.sm
        }
        if (this.platform == 'mobile') {
          return options.xs
        }
      } else {
        return options.sm
      }
    },
    getColMD (options) {
      if (this.preview) {
        if (this.platform == 'pc') {
          return options.md
        }
        if (this.platform == 'pad') {
          return options.sm
        }
        if (this.platform == 'mobile') {
          return options.xs
        }
      } else {
        return options.md
      }
    }
  },
  watch: {
    model: {
      deep: true,
      handler (val) {
        this.dataModels = val
      }
    }
  }
}
</script>
