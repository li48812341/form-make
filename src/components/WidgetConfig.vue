<template>
  <div v-if="show">
    <el-form label-position="top" size="small">
      <!-- <el-form-item v-if="bindDataTable" label="所属数据库" >
              <SelectTree
              ref="dataSourceTree"
              :props="{
                  value: 'id',             // ID字段名
                  label: 'label',         // 显示名称
                  children: 'children'    // 子级字段名
                }"
              url="/database/datalink/dataSource/treeData"
              :value="data.dsId"
              :clearable="true"
              :accordion="true"
              @getValue="(id, label, node) => {data.dsId=id, data.enName=node.enName}"/>
      </el-form-item> -->
      <el-form-item v-if="bindDataTable" label="表名" prop="tableName">
        <el-select
          v-if="parent.type !== 'table'"
          v-model="data.tableName"
          style="width: 100%"
          @change="clearModel"
          filterable
          placeholder="请选择表"
        >
          <el-option
            v-for="item in dataTables"
            :key="item.name"
            :label="item.nameAndComments"
            :value="item.name"
          >
          </el-option>
        </el-select>

        <el-select
          v-else
          v-model="parent.tableName"
          :disabled="true"
          style="width: 100%"
          @change="clearModel"
          filterable
          placeholder="请选择表"
        >
          <el-option
            v-for="item in dataTables"
            :key="item.name"
            :label="item.nameAndComments"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-card
        class="box-card"
        v-if="
          bindDataTable &&
          mainTable !== data.tableName &&
          parent.type !== 'table'
        "
      >
        <div slot="header" class="clearfix">
          <span>请配置表关联字段</span>
        </div>
        <el-form-item
          :label="`主表[${mainTable}]:`"
          style="border-bottom: 0px; padding-bottom: 0px"
        >
          <el-select
            v-model="data.primaryKey"
            size="mini"
            filterable
            placeholder="请选择字段"
          >
            <el-option
              v-for="item in mainTableColumns"
              :key="item.name"
              :label="item.nameAndComments"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-tag>等于</el-tag>
        <el-form-item
          :label="`附表[${data.tableName}]:`"
          style="border-bottom: 0px; padding-bottom: 0px"
        >
          <el-select
            v-model="data.foreignKey"
            size="mini"
            filterable
            placeholder="请选择字段"
          >
            <el-option
              v-for="item in dataTableColumns"
              :key="item.name"
              :label="item.nameAndComments"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-card>

      <el-form-item
        :label="$t('fm.config.widget.model')"
        v-if="data.type != 'td' && data.type != 'col'"
      >
        <!--如果是子表，且子表绑定数据库中的附表-->
        <el-input
          v-if="
            bindDataTable &&
            mainTable !== data.tableName &&
            data.type === 'table'
          "
          :disabled="true"
          v-model="data.model"
        ></el-input>

        <!--如果是子表，且绑定主表中的字段-->
        <el-select
          v-else-if="
            bindDataTable &&
            mainTable === data.tableName &&
            data.type === 'table'
          "
          v-model="data.model"
          style="width: 100%"
          clearable
          filterable
          placeholder="请选择字段"
        >
          <el-option
            v-for="item in dataTableColumns"
            :key="item.name"
            :label="item.nameAndComments"
            :value="item.name"
          >
          </el-option>
        </el-select>
        <!--如果子表中的元素，且子表是附表-->
        <el-select
          v-else-if="
            bindDataTable &&
            data.type !== 'table' &&
            parent.type === 'table' &&
            parent.tableColumns
          "
          v-model="data.model"
          style="width: 100%"
          filterable
          clearable
          placeholder="请选择字段"
        >
          <el-option
            v-for="item in parentTableColumns"
            :key="item.name"
            :label="item.nameAndComments"
            :value="item.name"
          >
          </el-option>
        </el-select>
        <!--如果是主表中的元素-->
        <el-select
          v-else-if="bindDataTable && data.type !== 'table'"
          v-model="data.model"
          style="width: 100%"
          filterable
          clearable
          placeholder="请选择字段"
        >
          <el-option
            v-for="item in dataTableColumns"
            :key="item.name"
            :label="item.nameAndComments"
            :value="item.name"
          >
          </el-option>
        </el-select>
        <el-input
          v-else
          :disabled="
            data.type == 'grid' ||
            data.type == 'tabs' ||
            data.type == 'report' ||
            data.type == 'divider'
          "
          v-model="data.model"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.name')"
        v-if="
          data.type != 'grid' &&
          data.type != 'tabs' &&
          data.type != 'report' &&
          data.type != 'td' &&
          data.type != 'col'
        "
      >
        <el-input clearable v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.width')"
        v-if="Object.keys(data.options).indexOf('width') >= 0"
      >
        <el-input clearable v-model="data.options.width"></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('fm.config.widget.height')"
        v-if="Object.keys(data.options).indexOf('height') >= 0"
      >
        <el-input clearable v-model="data.options.height"></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('fm.config.widget.size')"
        v-if="Object.keys(data.options).indexOf('size') >= 0"
      >
        {{ $t("fm.config.widget.width") }}
        <el-input
          clearable
          style="width: 90px"
          type="number"
          v-model.number="data.options.size.width"
        ></el-input>
        {{ $t("fm.config.widget.height") }}
        <el-input
          clearable
          style="width: 90px"
          type="number"
          v-model.number="data.options.size.height"
        ></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('fm.config.widget.labelWidth')"
        v-if="Object.keys(data.options).indexOf('labelWidth') >= 0"
      >
        <el-checkbox
          v-model="data.options.isLabelWidth"
          style="margin-right: 5px"
          >{{ $t("fm.config.widget.custom") }}</el-checkbox
        >
        <el-input-number
          v-model="data.options.labelWidth"
          :disabled="!data.options.isLabelWidth"
          :min="0"
          :max="99999"
          :step="10"
        ></el-input-number>
      </el-form-item>

      <!--hideLabel-->
      <el-form-item
        :label="$t('fm.config.widget.hideLabel')"
        v-if="
          data.type != 'grid' &&
          data.type != 'tabs' &&
          data.type != 'report' &&
          data.type != 'divider' &&
          data.type != 'td' &&
          data.type != 'col'
        "
      >
        <el-switch v-model="data.options.hideLabel"></el-switch>
      </el-form-item>

      <el-form-item
        :label="$t('fm.config.widget.placeholder')"
        v-if="
          Object.keys(data.options).indexOf('placeholder') >= 0 &&
          data.type != 'time' &&
          data.type != 'date'
        "
      >
        <el-input v-model="data.options.placeholder" clearable></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.layout')"
        v-if="Object.keys(data.options).indexOf('inline') >= 0"
      >
        <el-radio-group v-model="data.options.inline">
          <el-radio-button :label="false">{{
            $t("fm.config.widget.block")
          }}</el-radio-button>
          <el-radio-button :label="true">{{
            $t("fm.config.widget.inline")
          }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.contentPosition')"
        v-if="Object.keys(data.options).indexOf('contentPosition') >= 0"
      >
        <el-radio-group v-model="data.options.contentPosition">
          <el-radio-button label="left">{{
            $t("fm.config.widget.left")
          }}</el-radio-button>
          <el-radio-button label="center">{{
            $t("fm.config.widget.center")
          }}</el-radio-button>
          <el-radio-button label="right">{{
            $t("fm.config.widget.right")
          }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.showInput')"
        v-if="Object.keys(data.options).indexOf('showInput') >= 0"
      >
        <el-switch v-model="data.options.showInput"></el-switch>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.min')"
        v-if="Object.keys(data.options).indexOf('min') >= 0"
      >
        <el-input-number v-model="data.options.min" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.max')"
        v-if="Object.keys(data.options).indexOf('max') >= 0"
      >
        <el-input-number v-model="data.options.max" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.step')"
        v-if="Object.keys(data.options).indexOf('step') >= 0"
      >
        <el-input-number
          v-model="data.options.step"
          :min="-99999"
          :max="99999"
          :step="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.dataUrl')"
        v-if="data.type == 'selectTree'"
      >
        <el-input v-model="data.options.dataUrl"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.multiple')"
        v-if="
          data.type == 'select' ||
          data.type == 'imgupload' ||
          data.type == 'fileupload'
        "
      >
        <el-switch
          v-model="data.options.multiple"
          @change="handleSelectMuliple"
        ></el-switch>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.multiple')"
        v-if="data.type == 'selectTree'"
      >
        <el-switch v-model="data.options.checkbox"></el-switch>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.isOnlySelectLeaf')"
        v-if="data.type == 'selectTree'"
      >
        <el-switch v-model="data.options.isOnlySelectLeaf"></el-switch>
      </el-form-item>

      <el-form-item
        :label="$t('fm.config.widget.filterable')"
        v-if="data.type == 'select'"
      >
        <el-switch v-model="data.options.filterable"></el-switch>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.allowHalf')"
        v-if="Object.keys(data.options).indexOf('allowHalf') >= 0"
      >
        <el-switch v-model="data.options.allowHalf"> </el-switch>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.showAlpha')"
        v-if="Object.keys(data.options).indexOf('showAlpha') >= 0"
      >
        <el-switch v-model="data.options.showAlpha"> </el-switch>
      </el-form-item>
      <el-form-item
        :label="$t('fm.config.widget.option')"
        v-if="Object.keys(data.options).indexOf('options') >= 0"
      >
        <el-radio-group
          v-model="data.options.remote"
          size="mini"
          style="margin-bottom: 10px"
        >
          <el-radio-button :label="1">{{
            $t("fm.config.widget.staticData")
          }}</el-radio-button>
          <el-radio-button :label="2">{{
            $t("fm.config.widget.remoteData")
          }}</el-radio-button>
          <el-radio-button :label="3">{{
            $t("fm.config.widget.dictData")
          }}</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote === 2">
          <div>
            <el-radio-group v-model="data.options.remoteType">
              <el-radio label="option">{{
                $t("fm.config.widget.remoteAssigned")
              }}</el-radio>
              <el-radio label="func">{{
                $t("fm.config.widget.remoteFunc")
              }}</el-radio>
            </el-radio-group>
            <el-input
              clearable
              size="mini"
              v-if="data.options.remoteType == 'option'"
              v-model="data.options.remoteOption"
              style="margin-bottom: 5px"
            >
            </el-input>
            <el-input
              clearable
              size="mini"
              v-if="data.options.remoteType == 'func'"
              v-model="data.options.remoteFunc"
              style="margin-bottom: 5px"
            >
            </el-input>
            <el-input clearable size="mini" v-model="data.options.props.value">
              <div style="width: 30px" slot="prepend">
                {{ $t("fm.config.widget.value") }}
              </div>
            </el-input>
            <el-input clearable size="mini" v-model="data.options.props.label">
              <div slot="prepend" style="width: 30px">
                {{ $t("fm.config.widget.label") }}
              </div>
            </el-input>
            <el-input
              clearable
              size="mini"
              v-model="data.options.props.children"
            >
              <template slot="prepend">{{
                $t("fm.config.widget.childrenOption")
              }}</template>
            </el-input>
          </div>
        </template>
        <template v-else-if="data.options.remote === 3">
          <el-form size="small" :inline="true" label-width="70px">
            <el-form-item label="字典类型:" style="border-bottom: 0">
              <el-select
                filterable
                v-model="data.options.dictType"
                placeholder="请选择"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in dictList"
                  :key="index"
                  :label="`${item.remarks}:${item.type}`"
                  :value="item.type"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="默认值:" style="border-bottom: 0">
              <el-checkbox-group
                v-if="data.type == 'checkbox'"
                v-model="data.options.defaultValue"
              >
                <el-checkbox
                  :style="{
                    display: data.options.inline ? 'inline-block' : 'block',
                  }"
                  :label="item.value"
                  v-for="(item, index) in $dictUtils.getDictList(
                    data.options.dictType
                  )"
                  :key="index"
                >
                  {{ item.label }}
                </el-checkbox>
              </el-checkbox-group>

              <el-radio-group
                v-if="data.type == 'radio'"
                v-model="data.options.defaultValue"
                :disabled="data.options.disabled"
              >
                <el-radio
                  :style="{
                    display: data.options.inline ? 'inline-block' : 'block',
                  }"
                  :label="item.value"
                  v-for="(item, index) in $dictUtils.getDictList(
                    data.options.dictType
                  )"
                  :key="item.value + index"
                >
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
              <el-button
                size="mini"
                v-if="data.type == 'radio'"
                @click="data.options.defaultValue = ''"
                >清空</el-button
              >
              <el-select
                v-if="data.type == 'select'"
                v-model="data.options.defaultValue"
                :disabled="data.options.disabled"
                :multiple="data.options.multiple"
                clearable
                :placeholder="data.options.placeholder"
              >
                <el-option
                  v-for="item in $dictUtils.getDictList(data.options.dictType)"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        <template v-else>
          <div v-if="Object.keys(data.options).indexOf('showLabel') >= 0">
            <el-checkbox size="mini" v-model="data.options.showLabel">{{
              $t("fm.config.widget.showLabel")
            }}</el-checkbox>
          </div>
          <template
            v-if="
              data.type == 'radio' ||
              (data.type == 'select' && !data.options.multiple)
            "
          >
            <el-radio-group v-model="data.options.defaultValue">
              <draggable
                tag="ul"
                :list="data.options.options"
                v-bind="{
                  group: { name: 'options' },
                  ghostClass: 'ghost',
                  handle: '.drag-item',
                }"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-radio :label="item.value" style="margin-right: 5px">
                    <el-input
                      clearable
                      :style="{
                        width: data.options.showLabel ? '90px' : '180px',
                      }"
                      size="mini"
                      v-model="item.value"
                    ></el-input>
                    <el-input
                      clearable
                      style="width: 90px"
                      size="mini"
                      v-if="data.options.showLabel"
                      v-model="item.label"
                    ></el-input>
                    <!-- <input v-model="item.value"/> -->
                  </el-radio>
                  <i
                    class="drag-item"
                    style="font-size: 16px; margin: 0 5px; cursor: move"
                    ><i class="iconfont icon-icon_bars"></i
                  ></i>
                  <el-button
                    @click="handleOptionsRemove(index)"
                    circle
                    plain
                    type="danger"
                    size="mini"
                    icon="el-icon-minus"
                    style="padding: 4px; margin-left: 5px"
                  ></el-button>
                </li>
              </draggable>
            </el-radio-group>
          </template>

          <template
            v-if="
              data.type == 'checkbox' ||
              (data.type == 'select' && data.options.multiple)
            "
          >
            <el-checkbox-group v-model="data.options.defaultValue">
              <draggable
                tag="ul"
                :list="data.options.options"
                v-bind="{
                  group: { name: 'options' },
                  ghostClass: 'ghost',
                  handle: '.drag-item',
                }"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-checkbox :label="item.value" style="margin-right: 5px">
                    <el-input
                      clearable
                      :style="{
                        width: data.options.showLabel ? '90px' : '180px',
                      }"
                      size="mini"
                      v-model="item.value"
                    ></el-input>
                    <el-input
                      clearable
                      style="width: 90px"
                      size="mini"
                      v-if="data.options.showLabel"
                      v-model="item.label"
                    ></el-input>
                  </el-checkbox>
                  <i
                    class="drag-item"
                    style="font-size: 16px; margin: 0 5px; cursor: move"
                    ><i class="iconfont icon-icon_bars"></i
                  ></i>
                  <el-button
                    @click="handleOptionsRemove(index)"
                    circle
                    plain
                    type="danger"
                    size="mini"
                    icon="el-icon-minus"
                    style="padding: 4px; margin-left: 5px"
                  ></el-button>
                </li>
              </draggable>
            </el-checkbox-group>
          </template>
          <div style="margin-left: 22px" v-if="data.type != 'cascader'">
            <el-button type="text" @click="handleAddOption">{{
              $t("fm.actions.addOption")
            }}</el-button>
            <el-button type="text" @click="handleClearSelect">{{
              $t("fm.actions.clearSelect")
            }}</el-button>
          </div>
          <template v-if="data.type == 'cascader'">
            <!-- <code-editor :key="data.key" mode="javascript" v-model="data.options.options" height="200px"></code-editor> -->
            <el-button style="width: 100%" @click="handleSetCascader">{{
              $t("fm.config.widget.setting")
            }}</el-button>
          </template>
        </template>
      </el-form-item>

      <el-form-item
        :label="$t('fm.config.widget.remoteData')"
        v-if="data.type == 'cascader'"
      >
        <div>
          <el-radio-group v-model="data.options.remoteType">
            <el-radio label="option">{{
              $t("fm.config.widget.remoteAssigned")
            }}</el-radio>
            <el-radio label="func">{{
              $t("fm.config.widget.remoteFunc")
            }}</el-radio>
          </el-radio-group>
          <el-input
            size="mini"
            v-if="data.options.remoteType == 'option'"
            v-model="data.options.remoteOption"
            style="margin-bottom: 5px"
          >
          </el-input>
          <el-input
            size="mini"
            v-if="data.options.remoteType == 'func'"
            v-model="data.options.remoteFunc"
            style="margin-bottom: 5px"
          >
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.value">
            <template slot="prepend">{{
              $t("fm.config.widget.value")
            }}</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.label">
            <template slot="prepend">{{
              $t("fm.config.widget.label")
            }}</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.children">
            <template slot="prepend">{{
              $t("fm.config.widget.childrenOption")
            }}</template>
          </el-input>
        </div>
      </el-form-item>

      <el-form-item
        :label="$t('fm.config.widget.dictType')"
        v-if="data.type == 'dict'"
      >
        <el-select
          filterable
          v-model="data.options.dictType"
          placeholder="请选择"
          clearable
          style="width: 100%"
        >
          <el-option
            v-for="(item, index) in dictList"
            :key="index"
            :label="`${item.remarks}:${item.type}`"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        :label="$t('fm.config.widget.defaultValue')"
        v-if="
          Object.keys(data.options).indexOf('defaultValue') >= 0 &&
          data.type != 'custom' &&
          data.type != 'imgupload' &&
          data.type != 'fileupload'
        "
      >
        <el-input
          clearable
          v-if="data.type == 'textarea'"
          type="textarea"
          :rows="5"
          v-model="data.options.defaultValue"
        ></el-input>

        <template
          v-if="
            data.type == 'input' ||
            data.type == 'text' ||
            data.type == 'user' ||
            data.type == 'office'
          "
        >
          <template
            v-if="
              data.options.dataType == 'number' ||
              data.options.dataType == 'integer' ||
              data.options.dataType == 'float'
            "
          >
            <el-input
              clearable
              type="number"
              v-model.number="data.options.defaultValue"
            ></el-input>
          </template>
          <template v-else>
            <el-autocomplete
              class="inline-input"
              clearable
              v-model="data.options.defaultValue"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
            ></el-autocomplete>
            <!-- <el-input v-model="data.options.defaultValue"></el-input> -->
          </template>
        </template>

        <el-rate
          v-if="data.type == 'rate'"
          style="display: inline-block; vertical-align: middle"
          :max="data.options.max"
          :allow-half="data.options.allowHalf"
          v-model="data.options.defaultValue"
        ></el-rate>
        <el-button
          type="text"
          v-if="data.type == 'rate'"
          style="
            display: inline-block;
            vertical-align: middle;
            margin-left: 10px;
          "
          @click="data.options.defaultValue = 0"
          >{{ $t("fm.actions.clear") }}</el-button
        >
        <el-color-picker
          v-if="data.type == 'color'"
          v-model="data.options.defaultValue"
          :show-alpha="data.options.showAlpha"
        ></el-color-picker>
        <el-switch
          v-if="data.type == 'switch'"
          v-model="data.options.defaultValue"
        ></el-switch>
        <el-input-number
          v-if="data.type == 'number'"
          v-model="data.options.defaultValue"
          :step="data.options.step"
          :min="data.options.min"
          :max="data.options.max"
        ></el-input-number>

        <template v-if="data.type == 'html'">
          <code-editor
            :key="data.key"
            v-model="data.options.defaultValue"
            height="200px"
          ></code-editor>
        </template>

        <template v-if="data.type == 'cascader'">
          <el-cascader
            v-model="data.options.defaultValue"
            clearable
            :options="data.options.remote ? [] : data.options.options"
            style="width: 100%"
          >
          </el-cascader>
        </template>

        <template v-if="data.type == 'editor'">
          <el-button style="width: 100%" @click="editorVisible = true">{{
            $t("fm.config.widget.setting")
          }}</el-button>
          <cus-dialog
            :visible="editorVisible"
            @on-close="editorVisible = false"
            :width="`calc(${data.options.width || '900px'} + 40px)`"
            form
            :action="false"
            :title="$t('fm.config.widget.defaultValue')"
            close-on-click-modal
          >
            <fm-editor
              v-model="data.options.defaultValue"
              :toolbar="data.options.customToolbar"
              :sty="{ width: data.options.width }"
            >
            </fm-editor>
          </cus-dialog>
        </template>

        <template v-if="data.type == 'table'">
          <el-button style="width: 100%" @click="tableVisible = true">{{
            $t("fm.config.widget.setting")
          }}</el-button>
          <cus-dialog
            :visible="tableVisible"
            @on-close="tableVisible = false"
            :width="`calc(${data.options.width || '900px'} + 40px)`"
            form
            :action="false"
            :title="$t('fm.config.widget.defaultValue')"
            close-on-click-modal
          >
            <fm-form-table
              :value="data.options.defaultValue"
              :columns="data.tableColumns"
              :name="data.model"
              :rules="[]"
            >
            </fm-form-table>
          </cus-dialog>
        </template>
      </el-form-item>

      <template v-if="data.type == 'time' || data.type == 'date'">
        <el-form-item
          :label="$t('fm.config.widget.showType')"
          v-if="data.type == 'date'"
        >
          <el-select v-model="data.options.type">
            <el-option value="year"></el-option>
            <el-option value="month"></el-option>
            <el-option value="date"></el-option>
            <el-option value="dates"></el-option>
            <!-- <el-option value="week"></el-option> -->
            <el-option value="datetime"></el-option>
            <el-option value="datetimerange"></el-option>
            <el-option value="daterange"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.isRange')"
          v-if="data.type == 'time'"
        >
          <el-switch v-model="data.options.isRange"> </el-switch>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.isTimestamp')"
          v-if="data.type == 'date'"
        >
          <el-switch v-model="data.options.timestamp"> </el-switch>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.placeholder')"
          v-if="
            (!data.options.isRange && data.type == 'time') ||
            (data.type != 'time' &&
              data.options.type != 'datetimerange' &&
              data.options.type != 'daterange')
          "
        >
          <el-input clearable v-model="data.options.placeholder"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.startPlaceholder')"
          v-if="
            data.options.isRange ||
            data.options.type == 'datetimerange' ||
            data.options.type == 'daterange'
          "
        >
          <el-input
            clearable
            v-model="data.options.startPlaceholder"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.endPlaceholder')"
          v-if="
            data.options.isRange ||
            data.options.type == 'datetimerange' ||
            data.options.type == 'daterange'
          "
        >
          <el-input clearable v-model="data.options.endPlaceholder"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.format')">
          <el-input clearable v-model="data.options.format"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.defaultValue')"
          v-if="
            data.type == 'time' &&
            Object.keys(data.options).indexOf('isRange') >= 0
          "
        >
          <el-time-picker
            key="1"
            style="width: 100%"
            v-if="!data.options.isRange"
            v-model="data.options.defaultValue"
            :arrowControl="data.options.arrowControl"
            :value-format="data.options.format"
          >
          </el-time-picker>
          <el-time-picker
            key="2"
            v-if="data.options.isRange"
            style="width: 100%"
            v-model="data.options.defaultValue"
            is-range
            :arrowControl="data.options.arrowControl"
            :value-format="data.options.format"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.defaultValue')"
          v-if="data.type == 'date'"
        >
          <el-date-picker
            key="1"
            v-model="data.options.defaultValue"
            :type="data.options.type"
            :clearable="true"
            :value-format="
              data.options.timestamp ? 'timestamp' : data.options.format
            "
            :format="data.options.format"
            style="width: 100%"
            v-if="
              data.options.type == 'datetimerange' ||
              data.options.type == 'daterange'
            "
          >
          </el-date-picker>
          <el-date-picker
            key="2"
            v-model="data.options.defaultValue"
            :type="data.options.type"
            :clearable="true"
            :value-format="
              data.options.timestamp ? 'timestamp' : data.options.format
            "
            :format="data.options.format"
            style="width: 100%"
            v-else
          >
          </el-date-picker>
        </el-form-item>
      </template>

      <template v-if="data.type == 'imgupload' || data.type == 'fileupload'">
        <el-form-item :label="$t('fm.config.widget.limit')">
          <el-input
            clearable
            type="number"
            v-model.number="data.options.limit"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.tip')"
          v-if="Object.keys(data.options).indexOf('tip') >= 0"
        >
          <el-input clearable v-model="data.options.tip"></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.isQiniu')">
          <el-switch v-model="data.options.isQiniu"></el-switch>
        </el-form-item>
        <template v-if="data.options.isQiniu">
          <el-form-item label="Domain" :required="true">
            <el-input clearable v-model="data.options.domain"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('fm.config.widget.tokenFunc')"
            :required="true"
          >
            <el-input clearable v-model="data.options.tokenFunc"></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item :label="$t('fm.config.widget.action')" :required="true">
            <el-input clearable v-model="data.options.action"></el-input>
          </el-form-item>
          <el-form-item :label="$t('fm.config.widget.headers')">
            <ul>
              <li
                v-for="(item, index) in data.options.headers"
                :key="index"
                style="margin-bottom: 5px"
              >
                <el-input
                  type="textarea"
                  clearable
                  :rows="1"
                  placeholder="KEY"
                  size="mini"
                  style="width: 100px; margin-right: 5px"
                  v-model="item.key"
                ></el-input>

                <el-input
                  type="textarea"
                  clearable
                  :rows="1"
                  placeholder="VALUE"
                  size="mini"
                  style="width: 130px"
                  v-model="item.value"
                ></el-input>

                <el-button
                  @click="handleOptionsRemove(index)"
                  circle
                  plain
                  type="danger"
                  size="mini"
                  icon="el-icon-minus"
                  style="padding: 4px; margin-left: 5px"
                ></el-button>
              </li>
            </ul>
            <div>
              <el-button type="text" @click="handleAddHeader">{{
                $t("fm.actions.add")
              }}</el-button>
            </div>
          </el-form-item>
        </template>
      </template>

      <template v-if="data.type == 'blank'">
        <el-form-item :label="$t('fm.config.widget.defaultType')">
          <el-select v-model="data.options.defaultType">
            <el-option
              value="String"
              :label="$t('fm.config.widget.string')"
            ></el-option>
            <el-option
              value="Object"
              :label="$t('fm.config.widget.object')"
            ></el-option>
            <el-option
              value="Array"
              :label="$t('fm.config.widget.array')"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type == 'component'">
        <el-form-item :label="$t('fm.config.widget.customTemplates')">
          <!-- <code-editor :key="data.key" mode="html" v-model="data.options.template" height="200px"></code-editor> -->
          <el-button
            size="small"
            style="width: 100%"
            @click="handleSetTemplate"
            >{{ $t("fm.config.widget.setting") }}</el-button
          >
        </el-form-item>
      </template>

      <template v-if="data.type == 'grid'">
        <el-form-item :label="$t('fm.config.widget.gutter')">
          <el-input
            clearable
            type="number"
            v-model.number="data.options.gutter"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.flex')">
          <el-switch v-model="data.options.flex"></el-switch>
        </el-form-item>
        <!-- responsive -->
        <el-form-item :label="$t('fm.config.widget.responsive')">
          <el-switch v-model="data.options.responsive"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.columnOption')">
          <draggable
            tag="ul"
            :list="data.columns"
            v-bind="{
              group: { name: 'options' },
              ghostClass: 'ghost',
              handle: '.drag-item',
            }"
            handle=".drag-item"
          >
            <li v-for="(item, index) in data.columns" :key="index">
              <i
                class="drag-item"
                style="font-size: 16px; margin: 0 5px; cursor: move"
                ><i class="iconfont icon-icon_bars"></i
              ></i>

              <el-input
                v-if="!data.options.responsive"
                :placeholder="$t('fm.config.widget.span')"
                size="mini"
                style="width: 100px"
                type="number"
                v-model.number="item.span"
              ></el-input>

              <template v-if="data.options.responsive">
                <div style="display: inline-block">
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      margin: 0 10px 10px 10px;
                    "
                  >
                    <span>
                      <span style="width: 25px; display: inline-block"
                        >xs: </span
                      ><el-input
                        placeholder="xs"
                        size="mini"
                        style="width: 100px"
                        type="number"
                        v-model.number="item.xs"
                      ></el-input>
                      <pre
                        style="
                          width: 55px;
                          display: inline;
                          color: #999;
                          margin-left: 5px;
                        "
                        v-html="'<768px'"
                      ></pre>
                    </span>
                    <span>
                      <span style="width: 25px; display: inline-block"
                        >sm: </span
                      ><el-input
                        placeholder="sm"
                        size="mini"
                        style="width: 100px"
                        type="number"
                        v-model.number="item.sm"
                      ></el-input>
                      <pre
                        style="
                          width: 55px;
                          display: inline;
                          color: #999;
                          margin-left: 5px;
                        "
                        v-html="'≥768px'"
                      ></pre>
                    </span>
                    <span>
                      <span style="width: 25px; display: inline-block"
                        >md: </span
                      ><el-input
                        placeholder="md"
                        size="mini"
                        style="width: 100px"
                        type="number"
                        v-model.number="item.md"
                      ></el-input>
                      <pre
                        style="
                          width: 55px;
                          display: inline;
                          color: #999;
                          margin-left: 5px;
                        "
                        v-html="'≥992px'"
                      ></pre>
                    </span>
                    <span>
                      <span style="width: 25px; display: inline-block"
                        >lg: </span
                      ><el-input
                        placeholder="lg"
                        size="mini"
                        style="width: 100px"
                        type="number"
                        v-model.number="item.lg"
                      ></el-input>
                      <pre
                        style="
                          width: 55px;
                          display: inline;
                          color: #999;
                          margin-left: 5px;
                        "
                        v-html="'≥1200px'"
                      ></pre>
                    </span>
                    <span>
                      <span style="width: 25px; display: inline-block"
                        >xl: </span
                      ><el-input
                        placeholder="xl"
                        size="mini"
                        style="width: 100px"
                        type="number"
                        v-model.number="item.xl"
                      ></el-input>
                      <pre
                        style="
                          width: 55px;
                          display: inline;
                          color: #999;
                          margin-left: 5px;
                        "
                        v-html="'≥1920px'"
                      ></pre>
                    </span>
                  </div>
                </div>
              </template>

              <el-button
                @click="handleOptionsRemove(index)"
                circle
                plain
                type="danger"
                size="mini"
                icon="el-icon-minus"
                style="padding: 4px; margin-left: 5px"
              ></el-button>
            </li>
          </draggable>
          <div style="margin-left: 22px">
            <el-button type="text" @click="handleAddColumn">{{
              $t("fm.actions.addColumn")
            }}</el-button>
          </div>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.justify')"
          v-if="data.options.flex"
        >
          <el-select v-model="data.options.justify">
            <el-option
              value="start"
              :label="$t('fm.config.widget.justifyStart')"
            ></el-option>
            <el-option
              value="end"
              :label="$t('fm.config.widget.justifyEnd')"
            ></el-option>
            <el-option
              value="center"
              :label="$t('fm.config.widget.justifyCenter')"
            ></el-option>
            <el-option
              value="space-around"
              :label="$t('fm.config.widget.justifySpaceAround')"
            ></el-option>
            <el-option
              value="space-between"
              :label="$t('fm.config.widget.justifySpaceBetween')"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('fm.config.widget.align')"
          v-if="data.options.flex"
        >
          <el-select v-model="data.options.align">
            <el-option
              value="top"
              :label="$t('fm.config.widget.alignTop')"
            ></el-option>
            <el-option
              value="middle"
              :label="$t('fm.config.widget.alignMiddle')"
            ></el-option>
            <el-option
              value="bottom"
              :label="$t('fm.config.widget.alignBottom')"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type == 'col'">
        <el-form-item :label="$t('fm.config.widget.span')">
          <el-input-number
            v-model="data.options.md"
            :step="1"
            :min="1"
            :max="24"
            v-if="platform == 'pc'"
          ></el-input-number>
          <el-input-number
            v-model="data.options.sm"
            :step="1"
            :min="1"
            :max="24"
            v-if="platform == 'pad'"
          ></el-input-number>
          <el-input-number
            v-model="data.options.xs"
            :step="1"
            :min="1"
            :max="24"
            v-if="platform == 'mobile'"
          ></el-input-number>
        </el-form-item>
        <!-- <el-form-item :label="$t('fm.config.widget.responsiveSpan')">
          <div>
            <span style="width: 25px; display: inline-block;">xs: </span>
            <el-input-number v-model="data.options.xs"  :step="1" :min="1" :max="24" size="mini"></el-input-number>
            <pre style="width: 55px; display: inline; color: #999; margin-left: 5px;" v-html="'<768px'"></pre>
          </div>
          <div>
            <span style="width: 25px; display: inline-block;">sm: </span>
            <el-input-number v-model="data.options.sm"  :step="1" :min="1" :max="24" size="mini"></el-input-number>
            <pre style="width: 55px; display: inline; color: #999; margin-left: 5px;" v-html="'≥768px'"></pre>
          </div>
          <div>
            <span style="width: 25px; display: inline-block;">md: </span>
            <el-input-number v-model="data.options.md"  :step="1" :min="1" :max="24" size="mini"></el-input-number>
            <pre style="width: 55px; display: inline; color: #999; margin-left: 5px;" v-html="'≥992px'"></pre>
          </div>
          <div>
            <span style="width: 25px; display: inline-block;">lg: </span>
            <el-input-number v-model="data.options.lg"  :step="1" :min="1" :max="24" size="mini"></el-input-number>
            <pre style="width: 55px; display: inline; color: #999; margin-left: 5px;" v-html="'≥1200px'"></pre>
          </div>
          <div>
            <span style="width: 25px; display: inline-block;">xl: </span>
            <el-input-number v-model="data.options.xl"  :step="1" :min="1" :max="24" size="mini"></el-input-number>
            <pre style="width: 55px; display: inline; color: #999; margin-left: 5px;" v-html="'≥1920px'"></pre>
          </div>
        </el-form-item> -->
        <el-form-item :label="$t('fm.config.widget.offset')">
          <el-input-number
            v-model="data.options.offset"
            :step="1"
            :min="0"
            :max="24"
          ></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.push')">
          <el-input-number
            v-model="data.options.push"
            :step="1"
            :min="0"
            :max="24"
          ></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.pull')">
          <el-input-number
            v-model="data.options.pull"
            :step="1"
            :min="0"
            :max="24"
          ></el-input-number>
        </el-form-item>
      </template>

      <template v-if="data.type == 'tabs'">
        <el-form-item :label="$t('fm.config.widget.type')">
          <el-radio-group v-model="data.options.type">
            <el-radio-button label="">{{
              $t("fm.config.widget.default")
            }}</el-radio-button>
            <el-radio-button label="card">{{
              $t("fm.config.widget.card")
            }}</el-radio-button>
            <el-radio-button label="border-card">{{
              $t("fm.config.widget.borderCard")
            }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.tabPosition')">
          <el-radio-group v-model="data.options.tabPosition">
            <el-radio-button label="top">{{
              $t("fm.config.widget.top")
            }}</el-radio-button>
            <el-radio-button label="left">{{
              $t("fm.config.widget.left")
            }}</el-radio-button>
            <el-radio-button label="right">{{
              $t("fm.config.widget.right")
            }}</el-radio-button>
            <el-radio-button label="bottom">{{
              $t("fm.config.widget.bottom")
            }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.tabOption')">
          <draggable
            tag="ul"
            :list="data.tabs"
            v-bind="{
              group: { name: 'options' },
              ghostClass: 'ghost',
              handle: '.drag-item',
            }"
            handle=".drag-item"
          >
            <li v-for="(item, index) in data.tabs" :key="index">
              <i
                class="drag-item"
                style="font-size: 16px; margin: 0 5px; cursor: move"
                ><i class="iconfont icon-icon_bars"></i
              ></i>
              <el-input
                clearable
                :placeholder="$t('fm.config.widget.tabName')"
                size="mini"
                style="width: 200px"
                v-model="item.label"
              ></el-input>

              <el-button
                @click="handleOptionsRemove(index)"
                circle
                plain
                type="danger"
                size="mini"
                icon="el-icon-minus"
                style="padding: 4px; margin-left: 5px"
              ></el-button>
            </li>
          </draggable>
          <div style="margin-left: 22px">
            <el-button type="text" @click="handleAddTab">{{
              $t("fm.actions.addTab")
            }}</el-button>
          </div>
        </el-form-item>
      </template>

      <template v-if="data.type == 'report'">
        <el-form-item :label="$t('fm.config.widget.borderWidth')">
          <el-input-number
            v-model="data.options.borderWidth"
            :min="0"
            :step="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('fm.config.widget.borderColor')">
          <el-color-picker v-model="data.options.borderColor"></el-color-picker>
        </el-form-item>
      </template>

      <el-form-item
        :label="$t('fm.config.widget.customClass')"
        v-if="
          Object.keys(data.options).includes('customClass') &&
          !data.options.tableColumn
        "
      >
        <!-- <el-input v-model="data.options.customClass" clearable></el-input> -->
        <el-select
          style="width: 100%"
          v-model="customClassArray"
          multiple
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="item in sheets"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('fm.config.widget.attribute')">
        <el-checkbox
          v-model="data.options.dataBind"
          v-if="
            Object.keys(data.options).indexOf('dataBind') >= 0 &&
            !data.options.tableColumn
          "
          :disabled="data.type != 'blank' && data.type != 'component'"
          >{{ $t("fm.config.widget.dataBind") }}
        </el-checkbox>
        <el-checkbox
          v-model="data.options.hidden"
          v-if="Object.keys(data.options).indexOf('hidden') >= 0"
          >{{ $t("fm.config.widget.hidden") }}
        </el-checkbox>
        <el-checkbox
          v-model="data.options.readonly"
          v-if="Object.keys(data.options).indexOf('readonly') >= 0"
          >{{ $t("fm.config.widget.readonly") }}
        </el-checkbox>
        <el-checkbox
          v-model="data.options.disabled"
          v-if="Object.keys(data.options).indexOf('disabled') >= 0"
          >{{ $t("fm.config.widget.disabled") }}
        </el-checkbox>
        <el-checkbox
          v-model="data.options.editable"
          v-if="Object.keys(data.options).indexOf('editable') >= 0"
          >{{ $t("fm.config.widget.editable") }}
        </el-checkbox>
        <el-checkbox
          v-model="data.options.clearable"
          v-if="Object.keys(data.options).indexOf('clearable') >= 0"
          >{{ $t("fm.config.widget.clearable") }}
        </el-checkbox>
        <el-checkbox
          v-model="data.options.arrowControl"
          v-if="Object.keys(data.options).indexOf('arrowControl') >= 0"
          >{{ $t("fm.config.widget.arrowControl") }}
        </el-checkbox>
        <el-checkbox
          v-model="data.options.isDelete"
          v-if="Object.keys(data.options).indexOf('isDelete') >= 0"
          >{{ $t("fm.config.widget.isDelete") }}
        </el-checkbox>
        <el-checkbox
          v-model="data.options.isEdit"
          v-if="Object.keys(data.options).indexOf('isEdit') >= 0"
          >{{ $t("fm.config.widget.isEdit") }}
        </el-checkbox>
        <el-checkbox
          v-model="data.options.showPassword"
          v-if="Object.keys(data.options).indexOf('showPassword') >= 0"
          >{{ $t("fm.config.widget.showPassword") }}
        </el-checkbox>
        <el-checkbox
          v-model="data.options.showScore"
          v-if="Object.keys(data.options).indexOf('showScore') >= 0"
          >{{ $t("fm.config.widget.showScore") }}
        </el-checkbox>
      </el-form-item>

      <template
        v-if="
          data.type != 'grid' &&
          data.type != 'tabs' &&
          data.type != 'report' &&
          data.type != 'divider' &&
          data.type != 'td' &&
          data.type != 'col'
        "
      >
        <el-form-item :label="$t('fm.config.widget.validate')">
          <div
            class="validate-block"
            v-if="Object.keys(data.options).indexOf('required') >= 0"
          >
            <el-checkbox v-model="data.options.required">{{
              $t("fm.config.widget.required")
            }}</el-checkbox>

            <el-input
              size="mini"
              class="message-input"
              clearable
              v-model="data.options.requiredMessage"
              v-if="data.options.required"
              :placeholder="$t('fm.message.errorTip')"
            ></el-input>
          </div>
          <div
            class="validate-block"
            v-if="Object.keys(data.options).indexOf('dataType') >= 0"
          >
            <el-checkbox
              v-model="data.options.dataTypeCheck"
              style="margin-right: 10px"
            ></el-checkbox>
            <el-select
              :disabled="!data.options.dataTypeCheck"
              v-if="Object.keys(data.options).indexOf('dataType') >= 0"
              v-model="data.options.dataType"
              size="mini"
            >
              <el-option
                value="string"
                :label="$t('fm.config.widget.string')"
              ></el-option>
              <el-option
                value="number"
                :label="$t('fm.config.widget.number')"
              ></el-option>
              <el-option
                value="integer"
                :label="$t('fm.config.widget.integer')"
              ></el-option>
              <el-option
                value="float"
                :label="$t('fm.config.widget.float')"
              ></el-option>
              <el-option
                value="url"
                :label="$t('fm.config.widget.url')"
              ></el-option>
              <el-option
                value="email"
                :label="$t('fm.config.widget.email')"
              ></el-option>
              <el-option
                value="hex"
                :label="$t('fm.config.widget.hex')"
              ></el-option>
            </el-select>

            <el-input
              size="mini"
              class="message-input"
              clearable
              v-model="data.options.dataTypeMessage"
              v-if="data.options.dataTypeCheck"
              :placeholder="$t('fm.message.errorTip')"
            ></el-input>
          </div>

          <div
            class="validate-block"
            v-if="Object.keys(data.options).indexOf('pattern') >= 0"
          >
            <el-checkbox
              v-model="data.options.patternCheck"
              style="margin-right: 10px"
            ></el-checkbox>
            <el-input
              clearable
              :disabled="!data.options.patternCheck"
              size="mini"
              v-model.lazy="data.options.pattern"
              style="width: 239px"
              :placeholder="$t('fm.config.widget.patternPlaceholder')"
            ></el-input>
            <el-input
              size="mini"
              class="message-input"
              clearable
              v-model="data.options.patternMessage"
              v-if="data.options.patternCheck"
              :placeholder="$t('fm.message.errorTip')"
            ></el-input>
          </div>
        </el-form-item>
      </template>
    </el-form>

    <code-dialog
      ref="codeDialog"
      mode="html"
      :title="$t('fm.config.widget.customTemplates')"
      help="https://www.yuque.com/ln7ccx/ntgo8q/zr53m4"
      @on-confirm="handleTemplateConfirm"
    ></code-dialog>

    <code-dialog
      ref="cascaderDialog"
      width="800px"
      code-height="400px"
      mode="javascript"
      :title="$t('fm.config.widget.option')"
      @on-confirm="handleCascaderConfirm"
    ></code-dialog>
  </div>
  <div v-else class="empty">
    {{ $t("fm.description.configEmpty") }}
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import CodeEditor from "../components/CodeEditor";
import CodeDialog from "./CodeDialog";
import FmEditor from "./Editor";
import CusDialog from "./CusDialog";
import FmFormTable from "./FormTable";
import SelectTree from "@/components/treeSelect/treeSelect.vue";
import DictService from "@/api/sys/DictService";
import MakeFormService from "@/api/form/MakeFormService";

export default {
  components: {
    Draggable,
    CodeEditor,
    CodeDialog,
    SelectTree,
    FmEditor,
    CusDialog,
    FmFormTable,
  },
  props: {
    bindDataTable: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
    widgetForm: {
      type: Object,
      default: () => {},
    },
    mainTable: {
      type: String,
      default: "",
    },
    sheets: {
      type: Array,
      default: () => [],
    },
    platform: {
      type: String,
      default: "",
    },
  },
  dictService: null,
  makeFormService: null,
  beforeCreate() {
    this.dictService = new DictService(this);
    this.makeFormService = new MakeFormService(this);
  },
  data() {
    return {
      dictList: [],
      // dataSourceTree: [],
      dataTables: [],
      dataTableColumns: [],
      parentTableColumns: [],
      mainTableColumns: [],
      dataBindFields: [],
      parentWidget: {},
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null,
      },
      editorVisible: false,
      tableVisible: false,
      customClassArray:
        this.data && this.data.options && this.data.options.customClass
          ? this.data.options.customClass.split(" ").filter((item) => item)
          : [],
    };
  },
  computed: {
    show() {
      if (
        this.data &&
        Object.keys(this.data).length > 0 &&
        this.data.key &&
        this.data.options
      ) {
        return true;
      }
      return false;
    },
    parent() {
      if (this.data && Object.keys(this.data).length > 0 && this.data.key) {
        // this.parentWidget = {}
        this._findParentItem(
          this.widgetForm.list,
          this.data.key,
          this.widgetForm
        );
        return this.parentWidget;
      } else {
        return {};
      }
    },
  },
  created() {
    this.validateRequired(
      this.data && this.data.options ? this.data.options.required : false
    );
    this.validateDataType(
      this.data && this.data.options ? this.data.options.dataType : ""
    );
    this.valiatePattern(
      this.data && this.data.options ? this.data.options.pattern : ""
    );
    this.dictService.list({ current: 1, size: -1 }).then(({ data }) => {
      console.log("records-----------------------------------------------");
      console.log(this.dictList);
      this.dictList = data.records;
    });
    if (this.bindDataTable) {
      this.makeFormService
        .getTableList({ "dataSource.enName": this.data?.enName ?? "master" })
        .then(({ data }) => {
          this.dataTables = data.rows;
        });
    }
  },
  methods: {
    clearModel() {
      this.data.model = "";
    },
    querySearch(queryString, cb) {
      // var restaurants = this.restaurants;
      var results = [
        { title: "姓名", value: "${user.name}" },
        { title: "用户id", value: "${user.id}" },
        { title: "登录名", value: "${user.loginName}" },
        { title: "工号", value: "${user.no}" },
        { title: "公司", value: "${user.company.name}" },
        { title: "公司id", value: "${user.company.id}" },
        { title: "部门", value: "${user.office.name}" },
        { title: "部门id", value: "${user.office.id}" },
        { title: "当前日期", value: "${new Date()}" },
      ];
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    _findParentItem(list, key, node) {
      const index = list.findIndex((item) => item.key == key);

      if (index >= 0) {
        this.parentWidget = node;
      } else {
        for (let m = 0; m < list.length; m++) {
          const item = list[m];

          if (item.type === "grid") {
            for (let i = 0; i < item.columns.length; i++) {
              this._findParentItem(item.columns[i].list, key, item);
            }
          }
          if (item.type === "table") {
            this._findParentItem(item.tableColumns, key, item);
          }
          if (item.type === "tabs") {
            for (let i = 0; i < item.tabs.length; i++) {
              this._findParentItem(item.tabs[i].list, key, item);
            }
          }
        }
      }
    },
    generateModel(genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === "grid") {
          genList[i].columns.forEach((item) => {
            this.generateModel(item.list);
          });
        } else if (genList[i].type === "tabs") {
          genList[i].tabs.forEach((item) => {
            this.generateModel(item.list);
          });
        } else if (genList[i].type === "report") {
          genList[i].rows.forEach((row) => {
            row.columns.forEach((column) => {
              this.generateModel(column.list);
            });
          });
        } else {
          // 处理老版本没有dataBind值的情况，默认绑定数据
          if (genList[i].options.dataBind) {
            this.dataBindFields.push({
              model: genList[i].model,
              tableName: genList[i].tableName,
              primaryKey: genList[i].primaryKey,
              foreignKey: genList[i].foreignKey,
            });
          }
        }
      }
      return this.dataBindFields;
    },
    setFK(genList, tableName, primaryKey, foreignKey) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === "grid") {
          genList[i].columns.forEach((item) => {
            this.generateModel(item.list);
          });
        } else if (genList[i].type === "tabs") {
          genList[i].tabs.forEach((item) => {
            this.generateModel(item.list);
          });
        } else if (genList[i].type === "report") {
          genList[i].rows.forEach((row) => {
            row.columns.forEach((column) => {
              this.generateModel(column.list);
            });
          });
        } else {
          // 处理老版本没有dataBind值的情况，默认绑定数据
          if (genList[i].options.dataBind) {
            if (genList[i].tableName === tableName) {
              genList[i].primaryKey = primaryKey;
              genList[i].foreignKey = foreignKey;
            }
          }
        }
      }
      return this.dataBindFields;
    },
    handleOptionsRemove(index) {
      if (this.data.type === "grid") {
        this.data.columns.splice(index, 1);
      } else if (this.data.type === "tabs") {
        this.data.tabs.splice(index, 1);
      } else if (
        this.data.type === "imgupload" ||
        this.data.type === "fileupload"
      ) {
        this.data.options.headers.splice(index, 1);
      } else {
        if (
          !this.data.options.remote &&
          this.data.options.options[index].value
        ) {
          this.data.options.defaultValue =
            typeof this.data.options.defaultValue === "string" ? "" : [];
        }

        this.data.options.options.splice(index, 1);
      }
    },
    handleClearSelect() {
      if (
        this.data.type == "checkbox" ||
        (this.data.type == "select" && this.data.options.multiple)
      ) {
        this.data.options.defaultValue = [];
      } else {
        this.data.options.defaultValue = "";
      }
    },
    handleAddOption() {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          value: this.$t("fm.config.widget.newOption"),
          label: this.$t("fm.config.widget.newOption"),
        });
      } else {
        this.data.options.options.push({
          value: this.$t("fm.config.widget.newOption"),
        });
      }
    },
    handleAddColumn() {
      this.data.columns.push({
        span: "",
        list: [],
      });
    },
    handleAddTab() {
      let length = this.data.tabs.length;

      this.data.tabs.push({
        label: this.$t("fm.config.widget.tab") + (length + 1),
        name: "tab_" + new Date().getTime(),
        list: [],
      });
    },
    handleAddHeader() {
      if ("headers" in this.data.options) {
        this.data.options.headers.push({
          key: "",
          value: "",
        });
      } else {
        this.$set(this.data.options, "headers", [{ key: "", value: "" }]);
      }
    },
    generateRule() {
      if (this.data) {
        this.data.rules = [];
        Object.keys(this.validator).forEach((key) => {
          if (this.validator[key]) {
            this.data.rules.push(this.validator[key]);
          }
        });
      }
    },
    handleSelectMuliple(value) {
      if (this.data.type == "select" || this.data.type == "selectTree") {
        if (value) {
          if (this.data.options.defaultValue) {
            this.data.options.defaultValue = [this.data.options.defaultValue];
          } else {
            this.data.options.defaultValue = [];
          }
        } else {
          if (this.data.options.defaultValue.length > 0) {
            this.data.options.defaultValue = this.data.options.defaultValue[0];
          } else {
            this.data.options.defaultValue = "";
          }
        }
      }
    },

    handleSetTemplate() {
      this.$refs.codeDialog.open(this.data.options.template);
    },

    handleTemplateConfirm(value) {
      this.data.options.template = value;

      this.$refs.codeDialog.close();
    },

    handleSetCascader() {
      this.$refs.cascaderDialog.open(this.data.options.options);
    },

    handleCascaderConfirm(value) {
      if (typeof value == "string") {
        this.data.options.options = Function(
          '"use strict";return (' + value + ")"
        )();
      } else {
        this.data.options.options = value;
      }

      this.$refs.cascaderDialog.close();
    },

    validateRequired(val) {
      if (val) {
        this.validator.required = {
          required: true,
          message: this.data.options.requiredMessage
            ? this.data.options.requiredMessage
            : `${this.$t("fm.config.widget.validatorRequired")}`,
        };
      } else {
        this.validator.required = null;
      }

      this.$nextTick(() => {
        this.generateRule();
      });
    },

    validateDataType(val) {
      if (!this.show) {
        return false;
      }

      if (
        val &&
        (this.data.options.dataTypeCheck ||
          !Object.keys(this.data.options).includes("dataTypeCheck"))
      ) {
        this.validator.type = {
          type: val,
          message: this.data.options.dataTypeMessage
            ? this.data.options.dataTypeMessage
            : this.$t("fm.config.widget.validatorType"),
        };
      } else {
        this.validator.type = null;
      }

      this.generateRule();
    },
    valiatePattern(val) {
      if (!this.show) {
        return false;
      }

      if (
        val &&
        (this.data.options.patternCheck ||
          !Object.keys(this.data.options).includes("patternCheck"))
      ) {
        this.validator.pattern = {
          pattern: val,
          message: this.data.options.patternMessage
            ? this.data.options.patternMessage
            : this.$t("fm.config.widget.validatorPattern"),
        };
      } else {
        this.validator.pattern = null;
      }

      this.generateRule();
    },
  },
  watch: {
    // 'data.dsId': {
    //     handler (newVal) {
    //       if(newVal){
    //         // console.log(this.data)
    //         this.$http({
    //           url: `/form/make/getTableList?name=&dataSource.enName=${this.data.enName}`,
    //           method: 'get'
    //         }).then(({data}) => {
    //           this.dataTables = data.rows
    //         })
    //       }
    //     },
    //     immediate: true,
    //     deep: false
    //   },
    "widgetForm.list": {
      handler(val, oldVal) {
        //  console.log("------------------------new----------------------------")
        //  console.log(val)
        //  console.log(this.data)
        //  console.log("-------------------------old---------------------------")
        //  console.log(oldVal)
        this.generateModel(val);
      },
      immediate: true,
      deep: true,
    },
    dataTables(val) {
      var list = val.filter((table) => {
        return table.name === this.data?.tableName;
      });
      if (list.length === 0 && this.data) {
        this.data.tableName = "";
      }
    },
    "data.primaryKey"(val) {
      if (!val) {
        return;
      }
      if (
        !this.data.tableName ||
        !this.data.primaryKey ||
        !this.data.foreignKey
      ) {
        return;
      }
      this.setFK(
        this.widgetForm.list,
        this.data.tableName,
        this.data.primaryKey,
        this.data.foreignKey
      );
    },
    "data.foreignKey"(val) {
      if (!val) {
        return;
      }
      if (
        !this.data.tableName ||
        !this.data.primaryKey ||
        !this.data.foreignKey
      ) {
        return;
      }

      this.setFK(
        this.widgetForm.list,
        this.data.tableName,
        this.data.primaryKey,
        this.data.foreignKey
      );
    },
    "data.tableName": {
      handler(newVal) {
        if (this.bindDataTable && newVal) {
          if (this.mainTable !== newVal) {
            let fieldArra = this.dataBindFields.filter((field) => {
              if (field.tableName === this.data.tableName) {
                return true;
              } else {
                return false;
              }
            });
            if (
              fieldArra.length > 0 &&
              fieldArra[0].primaryKey &&
              fieldArra[0].foreignKey
            ) {
              this.data.primaryKey = fieldArra[0].primaryKey;
              this.data.foreignKey = fieldArra[0].foreignKey;
            } else {
              this.data.primaryKey = "";
              this.data.foreignKey = "";
            }
            this.makeFormService
              .getTableColumnList({
                name: newVal,
                "dataSource.enName": this.data?.enName ?? "master",
              })
              .then(({ data }) => {
                this.dataTableColumns = data.rows;
                this.dataTableColumns.forEach((column) => {
                  column.name = newVal + "->" + column.name;
                });
                // this.data.model = ''
              });
            if (this.data.type === "table") {
              this.data.model = `childTable->${newVal}`;
            }
          } else {
            this.makeFormService
              .getTableColumnList({
                name: newVal,
                "dataSource.enName": this.data?.enName ?? "master",
              })
              .then(({ data }) => {
                this.dataTableColumns = data.rows;
                // this.data.model = ''
              });
          }
        }
      },
      immediate: true,
      deep: true,
    },
    "parent.tableName": {
      handler(newVal) {
        if (this.bindDataTable && newVal && this.parent.type === "table") {
          if (this.mainTable !== newVal) {
            let fieldArra = this.dataBindFields.filter((field) => {
              if (field.tableName === this.data.tableName) {
                return true;
              } else {
                return false;
              }
            });
            if (
              fieldArra.length > 0 &&
              fieldArra[0].primaryKey &&
              fieldArra[0].foreignKey
            ) {
              this.data.primaryKey = fieldArra[0].primaryKey;
              this.data.foreignKey = fieldArra[0].foreignKey;
            } else {
              this.data.primaryKey = "";
              this.data.foreignKey = "";
            }
            this.makeFormService
              .getTableColumnList({
                name: newVal,
                "dataSource.enName": this.data?.enName ?? "master",
              })
              .then(({ data }) => {
                this.parentTableColumns = data.rows;
                this.parentTableColumns.forEach((column) => {
                  column.name = newVal + "->" + column.name;
                });
                // this.data.model = ''
              });
          } else {
            this.makeFormService
              .getTableColumnList({
                name: newVal,
                "dataSource.enName": this.data?.enName ?? "master",
              })
              .then(({ data }) => {
                this.parentTableColumns = data.rows;
                // this.data.model = ''
              });
          }
        }
      },
      immediate: true,
      deep: true,
    },
    mainTable: {
      handler(newVal) {
        if (this.bindDataTable && newVal) {
          this.makeFormService
            .getTableColumnList({
              name: newVal,
              "dataSource.enName": this.data?.enName ?? "master",
            })
            .then(({ data }) => {
              this.mainTableColumns = data.rows;
              // this.data.model = ''
            });
        }
      },
      immediate: true,
      deep: true,
    },

    // dataTableColumns (val){
    //   if(this.bindDataTable){
    //       let list1 = val.filter((item)=>{
    //         return item.name === this.data.foreignKey
    //       })
    //       let list2 = val.filter((item)=>{
    //         return item.name === this.data.model
    //       })
    //       if(list1.length === 0){
    //         this.data.foreignKey = ''
    //       }
    //       if(list2.length === 0){
    //         this.data.model = ''
    //       }
    //   }
    // },
    "data.options.remote": function (val) {
      if (this.data.type === "select") {
        if (this.data.options.multiple) {
          this.data.options.defaultValue = [];
        } else {
          this.data.options.defaultValue = "";
        }
      }
      if (this.data.type === "radio") {
        this.data.options.defaultValue = "";
      }
      if (this.data.type === "checkbox") {
        this.data.options.defaultValue = [];
      }
    },
    "data.options.isRange": function (val) {
      if (typeof val !== "undefined") {
        if (val) {
          this.data.options.defaultValue = null;
        } else {
          if (Object.keys(this.data.options).indexOf("defaultValue") >= 0)
            this.data.options.defaultValue = "";
        }
      }
    },
    "data.options.type": function (val) {
      if (this.data.type == "date") {
        if (val == "daterange" || val == "datetimerange" || val == "dates") {
          this.data.options.defaultValue = [];
        } else {
          this.data.options.defaultValue = "";
        }
      }
    },
    "data.options.required": function (val) {
      this.validateRequired(val);
    },
    "data.options.requiredMessage": function (val) {
      this.validateRequired(
        this.data && this.data.options ? this.data.options.required : false
      );
    },
    "data.options.dataType": function (val) {
      this.validateDataType(val);
    },
    "data.options.dataTypeCheck": function (val) {
      this.validateDataType(
        this.data && this.data.options ? this.data.options.dataType : ""
      );
    },
    "data.options.dataTypeMessage": function (val) {
      this.validateDataType(
        this.data && this.data.options ? this.data.options.dataType : ""
      );
    },
    "data.options.pattern": function (val) {
      this.valiatePattern(val);
    },
    "data.options.patternCheck": function (val) {
      this.valiatePattern(
        this.data && this.data.options ? this.data.options.pattern : ""
      );
    },
    "data.options.patternMessage": function (val) {
      this.valiatePattern(
        this.data && this.data.options ? this.data.options.pattern : ""
      );
    },
    "data.options.options": {
      deep: true,
      handler(val) {
        if (
          this.data.options &&
          typeof this.data.options.defaultValue == "object" &&
          Array.isArray(this.data.options.defaultValue)
        ) {
          this.data.options.defaultValue =
            this.data.options.defaultValue.filter((item) =>
              val.map((item) => item.value).includes(item)
            );
        }
        if (
          this.data.options &&
          typeof this.data.options.defaultValue == "string"
        ) {
          if (
            typeof val == "object" &&
            !val
              .map((item) => item.value)
              .includes(this.data.options.defaultValue)
          ) {
            this.data.options.defaultValue = "";
          }
        }
      },
    },
    "data.options.customClass": function (val) {
      this.customClassArray =
        this.data && this.data.options && this.data.options.customClass
          ? this.data.options.customClass.split(" ").filter((item) => item)
          : [];
    },
    customClassArray(val) {
      this.data.options.customClass = val.join(" ");
    },
  },
};
</script>
